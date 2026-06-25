import { env } from "../config/env.js";
import { logger } from "../config/pino.js";

export interface EmbeddingProvider {
  embed(text: string): Promise<number[]>;
  embedMany(texts: string[]): Promise<number[][]>;
}

class GeminiEmbeddingProvider implements EmbeddingProvider {
  private readonly apiKey: string;
  private readonly model: string;

  constructor(apiKey: string, model: string) {
    this.apiKey = apiKey;
    this.model = model;
  }

  private get modelPath(): string {
    return `models/${this.model}`;
  }

  async embed(text: string): Promise<number[]> {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/${this.modelPath}:embedContent?key=${this.apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: this.modelPath,
          content: { parts: [{ text }] },
        }),
      },
    );

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Gemini embedding error (${res.status}): ${body}`);
    }

    const data = (await res.json()) as { embedding: { values: number[] } };
    return data.embedding.values;
  }

  async embedMany(texts: string[]): Promise<number[][]> {
    return Promise.all(texts.map((text) => this.embed(text)));
  }
}

class OpenAIEmbeddingProvider implements EmbeddingProvider {
  private readonly apiKey: string;
  private readonly model: string;

  constructor(apiKey: string, model: string) {
    this.apiKey = apiKey;
    this.model = model;
  }

  async embed(text: string): Promise<number[]> {
    return (await this.embedMany([text]))[0];
  }

  async embedMany(texts: string[]): Promise<number[][]> {
    const res = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        input: texts,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`OpenAI embedding error (${res.status}): ${body}`);
    }

    const data = (await res.json()) as {
      data: { embedding: number[]; index: number }[];
    };

    data.data.sort((a, b) => a.index - b.index);
    return data.data.map((d) => d.embedding);
  }
}

let provider: EmbeddingProvider | null = null;

export function getEmbeddingProvider(): EmbeddingProvider {
  if (provider) return provider;

  switch (env.ASSISTANT_PROVIDER) {
    case "gemini": {
      if (!env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is required for embedding when ASSISTANT_PROVIDER=gemini");
      }
      provider = new GeminiEmbeddingProvider(env.GEMINI_API_KEY, env.EMBEDDING_MODEL);
      break;
    }
    case "openai": {
      if (!env.OPENAI_API_KEY) {
        throw new Error("OPENAI_API_KEY is required for embedding when ASSISTANT_PROVIDER=openai");
      }
      provider = new OpenAIEmbeddingProvider(env.OPENAI_API_KEY, env.EMBEDDING_MODEL);
      break;
    }
    default: {
      throw new Error(
        `Embedding not supported for provider "${env.ASSISTANT_PROVIDER}". Use "gemini" or "openai" for ASSISTANT_PROVIDER, or set ASSISTANT_PROVIDER accordingly.`,
      );
    }
  }

  logger.info(
    { provider: env.ASSISTANT_PROVIDER, model: env.EMBEDDING_MODEL },
    "Embedding provider initialized",
  );

  return provider;
}
