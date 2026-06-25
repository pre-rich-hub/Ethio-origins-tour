import { randomUUID } from "node:crypto";
import { redis } from "../../config/redis.js";
import type { LLMMessage } from "./providers/types.js";

const CONVERSATION_TTL = 60 * 60 * 24; // 24 hours
const CONVERSATION_PREFIX = "assistant:conv:";

interface StoredConversation {
  history: LLMMessage[];
  lead: Partial<Record<string, string | number>> | null;
  handoffRequested: boolean;
  createdAt: string;
}

export async function createConversation(): Promise<string> {
  const id = randomUUID();
  const conversation: StoredConversation = {
    history: [],
    lead: null,
    handoffRequested: false,
    createdAt: new Date().toISOString(),
  };

  await redis!.set(
    `${CONVERSATION_PREFIX}${id}`,
    JSON.stringify(conversation),
    "EX",
    CONVERSATION_TTL,
  );

  return id;
}

export async function getConversation(
  id: string,
): Promise<StoredConversation | null> {
  const raw = await redis!.get(`${CONVERSATION_PREFIX}${id}`);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as StoredConversation;
  } catch {
    return null;
  }
}

export async function updateConversation(
  id: string,
  updates: Partial<StoredConversation>,
): Promise<void> {
  const existing = await getConversation(id);
  if (!existing) return;

  const updated: StoredConversation = {
    ...existing,
    ...updates,
  };

  await redis!.set(
    `${CONVERSATION_PREFIX}${id}`,
    JSON.stringify(updated),
    "EX",
    CONVERSATION_TTL,
  );
}

export async function listConversations(): Promise<
  { id: string; createdAt: string; lead: Partial<Record<string, string | number>> | null }[]
> {
  const keys = await redis!.keys(`${CONVERSATION_PREFIX}*`);

  const results = await Promise.all(
    keys.map(async (key) => {
      const id = key.replace(CONVERSATION_PREFIX, "");
      const raw = await redis!.get(key);
      if (!raw) return null;

      try {
        const conv = JSON.parse(raw) as StoredConversation;
        return { id, createdAt: conv.createdAt, lead: conv.lead };
      } catch {
        return null;
      }
    }),
  );

  return results
    .filter(<T>(item: T | null): item is T => item !== null)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
}
