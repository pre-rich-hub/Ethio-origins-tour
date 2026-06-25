import { LLMMessage, LLMProvider } from "./types.js";
import { ProviderResponseError, ProviderError } from "./errors.js";
import { FetchLike, getFetch, isRecord, normalizeTextContent, readResponseBody } from "./shared.js";

export interface GrokProviderOptions {
  apiKey: string;
  model: string;
  baseUrl?: string;
  fetchImpl?: FetchLike;
}

export class GrokChatCompletionsProvider implements LLMProvider {
  private readonly apiKey: string;
  private readonly model: string;
  private readonly baseUrl: string;
  private readonly fetchImpl: FetchLike;

  constructor(options: GrokProviderOptions) {
    if (options.apiKey.trim().length === 0) {
      throw new ProviderError("grok", "apiKey is required");
    }

    if (options.model.trim().length === 0) {
      throw new ProviderError("grok", "model is required");
    }

    this.apiKey = options.apiKey;
    this.model = options.model;
    this.baseUrl = options.baseUrl ?? "https://api.x.ai/v1";
    this.fetchImpl = getFetch(options.fetchImpl);
  }

  async complete(messages: LLMMessage[]): Promise<string> {
    const response = await this.fetchImpl(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: this.model,
        messages,
      }),
    });

    const responseBody = await readResponseBody(response);
    if (!response.ok) {
      throw new ProviderResponseError(
        "grok",
        response.status,
        "chat completions request failed",
        responseBody,
      );
    }

    const parsed = safeParseJson(responseBody);
    const reply = extractGrokReply(parsed);
    if (reply === null) {
      throw new ProviderError("grok", "response did not contain a reply", parsed);
    }

    return reply;
  }
}

export function createGrokProvider(options: GrokProviderOptions): GrokChatCompletionsProvider {
  return new GrokChatCompletionsProvider(options);
}

function safeParseJson(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function extractGrokReply(payload: unknown): string | null {
  if (!isRecord(payload)) {
    return null;
  }

  const choices = payload.choices;
  if (!Array.isArray(choices) || choices.length === 0) {
    return null;
  }

  const firstChoice = choices[0];
  if (!isRecord(firstChoice)) {
    return null;
  }

  const message = firstChoice.message;
  if (!isRecord(message)) {
    return null;
  }

  return normalizeTextContent(message.content);
}
