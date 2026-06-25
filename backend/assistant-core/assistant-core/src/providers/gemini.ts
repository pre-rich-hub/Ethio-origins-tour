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

export interface GeminiProviderOptions {
  apiKey: string;
  model: string;
  baseUrl?: string;
  fetchImpl?: FetchLike;
}

export class GeminiGenerateContentProvider implements LLMProvider {
  private readonly apiKey: string;
  private readonly model: string;
  private readonly baseUrl: string;
  private readonly fetchImpl: FetchLike;

  constructor(options: GeminiProviderOptions) {
    if (options.apiKey.trim().length === 0) {
      throw new ProviderError("gemini", "apiKey is required");
    }

    if (options.model.trim().length === 0) {
      throw new ProviderError("gemini", "model is required");
    }

    this.apiKey = options.apiKey;
    this.model = options.model;
    this.baseUrl = options.baseUrl ?? "https://generativelanguage.googleapis.com/v1beta";
    this.fetchImpl = getFetch(options.fetchImpl);
  }

  async complete(messages: LLMMessage[]): Promise<string> {
    const grouped = splitSystemMessages(messages);
    const body: Record<string, unknown> = {
      contents: grouped.conversation.map((message) => ({
        role: message.role === "assistant" ? "model" : "user",
        parts: [{ text: message.content }],
      })),
    };

    if (grouped.system !== null) {
      body.systemInstruction = {
        parts: [{ text: grouped.system }],
      };
    }

    const response = await this.fetchImpl(
      `${this.baseUrl}/models/${encodeURIComponent(this.model)}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": this.apiKey,
        },
        body: JSON.stringify(body),
      },
    );

    const responseBody = await readResponseBody(response);
    if (!response.ok) {
      throw new ProviderResponseError(
        "gemini",
        response.status,
        "generateContent request failed",
        responseBody,
      );
    }

    const parsed = safeParseJson(responseBody);
    const reply = extractGeminiReply(parsed);
    if (reply === null) {
      throw new ProviderError("gemini", "response did not contain a reply", parsed);
    }

    return reply;
  }
}

export function createGeminiProvider(options: GeminiProviderOptions): GeminiGenerateContentProvider {
  return new GeminiGenerateContentProvider(options);
}

function safeParseJson(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function extractGeminiReply(payload: unknown): string | null {
  if (!isRecord(payload)) {
    return null;
  }

  const candidates = payload.candidates;
  if (!Array.isArray(candidates) || candidates.length === 0) {
    return null;
  }

  const firstCandidate = candidates[0];
  if (!isRecord(firstCandidate)) {
    return null;
  }

  const content = firstCandidate.content;
  if (!isRecord(content)) {
    return null;
  }

  return joinTextParts(content.parts);
}
