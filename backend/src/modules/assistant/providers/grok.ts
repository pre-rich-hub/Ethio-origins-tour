import type { LLMMessage, LLMProvider } from "./types.js";

interface GrokResponse {
  choices?: {
    message?: {
      content?: string | null;
    };
  }[];
}

export class GrokProvider implements LLMProvider {
  private apiKey: string;
  private model: string;
  private baseUrl: string;

  constructor(options: { apiKey: string; model: string; baseUrl?: string }) {
    this.apiKey = options.apiKey;
    this.model = options.model;
    this.baseUrl = options.baseUrl ?? "https://api.x.ai/v1";
  }

  async complete(messages: LLMMessage[]): Promise<string> {
    const url = `${this.baseUrl}/chat/completions`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => "");
      throw new Error(
        `Grok API error: ${response.status} ${response.statusText} — ${errorBody}`,
      );
    }

    const data = (await response.json()) as GrokResponse;
    return data.choices?.[0]?.message?.content ?? "";
  }
}

export function createGrokProvider(options: {
  apiKey: string;
  model: string;
  baseUrl?: string;
}): GrokProvider {
  return new GrokProvider(options);
}
