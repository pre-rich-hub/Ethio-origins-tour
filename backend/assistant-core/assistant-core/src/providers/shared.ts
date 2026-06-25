import { LLMMessage } from "./types.js";

export type FetchLike = (input: string | URL, init?: RequestInit) => Promise<Response>;

export interface ProviderMessageGroup {
  system: string | null;
  conversation: Array<Exclude<LLMMessage, { role: "system" }>>;
}

export function splitSystemMessages(messages: LLMMessage[]): ProviderMessageGroup {
  const systemMessages: string[] = [];
  const conversation: Array<Exclude<LLMMessage, { role: "system" }>> = [];

  for (const message of messages) {
    if (message.role === "system") {
      systemMessages.push(message.content);
      continue;
    }

    conversation.push(message);
  }

  return {
    system: systemMessages.length > 0 ? systemMessages.join("\n\n") : null,
    conversation,
  };
}

export async function readResponseBody(response: Response): Promise<string> {
  try {
    return await response.text();
  } catch {
    return "";
  }
}

export function getFetch(fetchImpl?: FetchLike): FetchLike {
  return fetchImpl ?? fetch;
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function normalizeTextContent(content: unknown): string | null {
  if (typeof content === "string") {
    return content.trim().length > 0 ? content : null;
  }

  if (!Array.isArray(content)) {
    return null;
  }

  const texts: string[] = [];
  for (const part of content) {
    if (!isRecord(part)) {
      continue;
    }

    if (typeof part.text === "string" && part.text.trim().length > 0) {
      texts.push(part.text);
    }
  }

  return texts.length > 0 ? texts.join("") : null;
}

export function joinTextParts(parts: unknown): string | null {
  if (!Array.isArray(parts)) {
    return null;
  }

  const texts: string[] = [];
  for (const part of parts) {
    if (!isRecord(part)) {
      continue;
    }

    if (typeof part.text === "string" && part.text.trim().length > 0) {
      texts.push(part.text);
    }
  }

  return texts.length > 0 ? texts.join("") : null;
}
