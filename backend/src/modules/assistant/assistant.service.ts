import { env } from "../../config/env.js";
import { logger } from "../../config/pino.js";
import { Assistant } from "./engine/assistant.js";
import type { AssistantResponse } from "./engine/assistant.js";
import type { LLMProvider } from "./providers/types.js";
import { createGeminiProvider } from "./providers/gemini.js";
import { createOpenAIProvider } from "./providers/openai.js";
import { createAnthropicProvider } from "./providers/anthropic.js";
import { createGrokProvider } from "./providers/grok.js";
import { createTourConnector } from "./connectors/tours.js";
import { createDestinationConnector } from "./connectors/destinations.js";
import { createTestimonialConnector } from "./connectors/testimonials.js";
import { assistantConfig } from "./assistant.config.js";
import {
  createConversation,
  getConversation,
  updateConversation,
} from "./conversation.service.js";

const connectors = [
  createTourConnector(),
  createDestinationConnector(),
  createTestimonialConnector(),
];

function createProvider(): LLMProvider {
  switch (env.ASSISTANT_PROVIDER) {
    case "gemini": {
      if (!env.GEMINI_API_KEY) {
        throw new Error(
          "GEMINI_API_KEY is required when ASSISTANT_PROVIDER=gemini",
        );
      }
      return createGeminiProvider({
        apiKey: env.GEMINI_API_KEY,
        model: env.ASSISTANT_MODEL,
      });
    }
    case "openai": {
      if (!env.OPENAI_API_KEY) {
        throw new Error(
          "OPENAI_API_KEY is required when ASSISTANT_PROVIDER=openai",
        );
      }
      return createOpenAIProvider({
        apiKey: env.OPENAI_API_KEY,
        model: env.ASSISTANT_MODEL,
      });
    }
    case "anthropic": {
      if (!env.ANTHROPIC_API_KEY) {
        throw new Error(
          "ANTHROPIC_API_KEY is required when ASSISTANT_PROVIDER=anthropic",
        );
      }
      return createAnthropicProvider({
        apiKey: env.ANTHROPIC_API_KEY,
        model: env.ASSISTANT_MODEL,
      });
    }
    case "grok": {
      if (!env.GROK_API_KEY) {
        throw new Error(
          "GROK_API_KEY is required when ASSISTANT_PROVIDER=grok",
        );
      }
      return createGrokProvider({
        apiKey: env.GROK_API_KEY,
        model: env.ASSISTANT_MODEL,
      });
    }
    default: {
      throw new Error(`Unknown ASSISTANT_PROVIDER: ${env.ASSISTANT_PROVIDER}`);
    }
  }
}

let provider: LLMProvider;

try {
  provider = createProvider();
  logger.info(
    { provider: env.ASSISTANT_PROVIDER, model: env.ASSISTANT_MODEL },
    "AI assistant provider initialized",
  );
} catch (err) {
  logger.error({ err }, "Failed to initialize AI assistant provider");
  throw err;
}

export async function handleChat(
  message: string,
  conversationId?: string,
): Promise<{ response: AssistantResponse; conversationId: string }> {
  const id = conversationId ?? (await createConversation());
  const conversation = await getConversation(id);

  const assistant = new Assistant(
    assistantConfig,
    provider,
    connectors,
    conversation?.history ?? [],
  );

  const response = await assistant.chat(message);

  await updateConversation(id, {
    history: assistant.getHistory(),
    lead: response.lead,
    handoffRequested: response.shouldHandoff || (conversation?.handoffRequested ?? false),
  });

  return { response, conversationId: id };
}

export async function getConversationHistory(conversationId: string) {
  return getConversation(conversationId);
}
