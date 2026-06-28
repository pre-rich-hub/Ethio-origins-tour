import type { LLMMessage, LLMProvider } from "./types.js";

interface NvidiaResponse {
  choices?: {
    message?: {
      content?: string | null;
    };
  }[];
}

export class NvidiaProvider implements LLMProvider {
  private apiKey: string;
  private model: string;
  private baseUrl: string;

  constructor(options: { apiKey: string; model: string; baseUrl?: string }) {
    this.apiKey = options.apiKey;
    this.model = options.model;
    this.baseUrl = options.baseUrl ?? "https://integrate.api.nvidia.com/v1";
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
        `NVIDIA API error: ${response.status} ${response.statusText} — ${errorBody}`,
      );
    }

    const data = (await response.json()) as NvidiaResponse;
    return data.choices?.[0]?.message?.content ?? "";
  }
}

export function createNvidiaProvider(options: {
  apiKey: string;
  model: string;
  baseUrl?: string;
}): NvidiaProvider {
  return new NvidiaProvider(options);
}
