import { LLMMessage, LLMProvider } from "./types.js";
import { ProviderError, ProviderResponseError } from "./errors.js";
import {
  FetchLike,
  getFetch,
  isRecord,
  joinTextParts,
  readResponseBody,
  splitSystemMessages,
} from "./shared.js";

export interface AnthropicProviderOptions {
  apiKey: string;
  model: string;
  maxTokens?: number;
  baseUrl?: string;
  version?: string;
  fetchImpl?: FetchLike;
}

export class AnthropicMessagesProvider implements LLMProvider {
  private readonly apiKey: string;
  private readonly model: string;
  private readonly maxTokens: number;
  private readonly baseUrl: string;
  private readonly version: string;
  private readonly fetchImpl: FetchLike;

  constructor(options: AnthropicProviderOptions) {
    if (options.apiKey.trim().length === 0) {
      throw new ProviderError("anthropic", "apiKey is required");
    }

    if (options.model.trim().length === 0) {
      throw new ProviderError("anthropic", "model is required");
    }

    this.apiKey = options.apiKey;
    this.model = options.model;
    this.maxTokens = options.maxTokens ?? 1024;
    this.baseUrl = options.baseUrl ?? "https://api.anthropic.com/v1";
    this.version = options.version ?? "2023-06-01";
    this.fetchImpl = getFetch(options.fetchImpl);
  }

  async complete(messages: LLMMessage[]): Promise<string> {
    const grouped = splitSystemMessages(messages);
    const body: Record<string, unknown> = {
      model: this.model,
      max_tokens: this.maxTokens,
      messages: grouped.conversation.map((message) => ({
        role: message.role === "assistant" ? "assistant" : "user",
        content: [{ type: "text", text: message.content }],
      })),
    };

    if (grouped.system !== null) {
      body.system = grouped.system;
    }

    const response = await this.fetchImpl(`${this.baseUrl}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "anthropic-version": this.version,
        "x-api-key": this.apiKey,
      },
      body: JSON.stringify(body),
    });

    const responseBody = await readResponseBody(response);
    if (!response.ok) {
      throw new ProviderResponseError(
        "anthropic",
        response.status,
        "messages request failed",
        responseBody,
      );
    }

    const parsed = safeParseJson(responseBody);
    const reply = extractAnthropicReply(parsed);
    if (reply === null) {
      throw new ProviderError("anthropic", "response did not contain a reply", parsed);
    }

    return reply;
  }
}

export function createAnthropicProvider(options: AnthropicProviderOptions): AnthropicMessagesProvider {
  return new AnthropicMessagesProvider(options);
}

function safeParseJson(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function extractAnthropicReply(payload: unknown): string | null {
  if (!isRecord(payload)) {
    return null;
  }

  const content = payload.content;
  if (!Array.isArray(content)) {
    return null;
  }

  const texts: string[] = [];
  for (const part of content) {
    if (!isRecord(part)) {
      continue;
    }

    if (part.type !== "text" || typeof part.text !== "string" || part.text.trim().length === 0) {
      continue;
    }

    texts.push(part.text);
  }

  return texts.length > 0 ? texts.join("") : null;
}
