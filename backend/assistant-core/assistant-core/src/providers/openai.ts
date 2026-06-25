import { LLMMessage, LLMProvider } from "./types.js";
import { ProviderResponseError, ProviderError } from "./errors.js";
import { FetchLike, getFetch, isRecord, normalizeTextContent, readResponseBody } from "./shared.js";

export interface OpenAIProviderOptions {
  apiKey: string;
  model: string;
  baseUrl?: string;
  organization?: string;
  project?: string;
  fetchImpl?: FetchLike;
}

export class OpenAIChatCompletionsProvider implements LLMProvider {
  private readonly apiKey: string;
  private readonly model: string;
  private readonly baseUrl: string;
  private readonly organization?: string;
  private readonly project?: string;
  private readonly fetchImpl: FetchLike;

  constructor(options: OpenAIProviderOptions) {
    if (options.apiKey.trim().length === 0) {
      throw new ProviderError("openai", "apiKey is required");
    }

    if (options.model.trim().length === 0) {
      throw new ProviderError("openai", "model is required");
    }

    this.apiKey = options.apiKey;
    this.model = options.model;
    this.baseUrl = options.baseUrl ?? "https://api.openai.com/v1";
    this.organization = options.organization;
    this.project = options.project;
    this.fetchImpl = getFetch(options.fetchImpl);
  }

  async complete(messages: LLMMessage[]): Promise<string> {
    const response = await this.fetchImpl(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: this.buildHeaders(),
      body: JSON.stringify({
        model: this.model,
        messages,
      }),
    });

    const responseBody = await readResponseBody(response);
    if (!response.ok) {
      throw new ProviderResponseError(
        "openai",
        response.status,
        "chat completions request failed",
        responseBody,
      );
    }

    const parsed = safeParseJson(responseBody);
    const reply = extractOpenAIReply(parsed);
    if (reply === null) {
      throw new ProviderError("openai", "response did not contain a reply", parsed);
    }

    return reply;
  }

  private buildHeaders(): HeadersInit {
    const headers: HeadersInit = {
      Authorization: `Bearer ${this.apiKey}`,
      "Content-Type": "application/json",
    };

    if (this.organization) {
      headers["OpenAI-Organization"] = this.organization;
    }

    if (this.project) {
      headers["OpenAI-Project"] = this.project;
    }

    return headers;
  }
}

export function createOpenAIProvider(options: OpenAIProviderOptions): OpenAIChatCompletionsProvider {
  return new OpenAIChatCompletionsProvider(options);
}

function safeParseJson(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function extractOpenAIReply(payload: unknown): string | null {
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
