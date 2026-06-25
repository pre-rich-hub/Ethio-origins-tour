import type { LLMMessage, LLMProvider } from "./types.js";

interface AnthropicContentBlock {
  type: string;
  text?: string;
}

interface AnthropicResponse {
  content?: AnthropicContentBlock[];
}

export class AnthropicProvider implements LLMProvider {
  private apiKey: string;
  private model: string;
  private baseUrl: string;
  private version: string;
  private maxTokens: number;

  constructor(options: {
    apiKey: string;
    model: string;
    baseUrl?: string;
    version?: string;
    maxTokens?: number;
  }) {
    this.apiKey = options.apiKey;
    this.model = options.model;
    this.baseUrl = options.baseUrl ?? "https://api.anthropic.com/v1";
    this.version = options.version ?? "2023-06-01";
    this.maxTokens = options.maxTokens ?? 1024;
  }

  async complete(messages: LLMMessage[]): Promise<string> {
    const system = messages
      .filter((m) => m.role === "system")
      .map((m) => m.content)
      .join("\n");

    const conversationMessages = messages
      .filter((m) => m.role !== "system")
      .map((m) => ({
        role: m.role as "user" | "assistant",
        content: [{ type: "text" as const, text: m.content }],
      }));

    const url = `${this.baseUrl}/messages`;
    const body: Record<string, unknown> = {
      model: this.model,
      max_tokens: this.maxTokens,
      messages: conversationMessages,
    };

    if (system) {
      body.system = system;
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
        "anthropic-version": this.version,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => "");
      throw new Error(
        `Anthropic API error: ${response.status} ${response.statusText} — ${errorBody}`,
      );
    }

    const data = (await response.json()) as AnthropicResponse;

    return (
      data.content
        ?.filter((block) => block.type === "text")
        .map((block) => block.text ?? "")
        .join("") ?? ""
    );
  }
}

export function createAnthropicProvider(options: {
  apiKey: string;
  model: string;
  baseUrl?: string;
  version?: string;
  maxTokens?: number;
}): AnthropicProvider {
  return new AnthropicProvider(options);
}
