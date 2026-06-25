import { randomUUID } from "node:crypto";
import { redis } from "../../config/redis.js";
import type { LLMMessage } from "./providers/types.js";

const CONVERSATION_TTL = 60 * 60 * 24;
const CONVERSATION_PREFIX = "assistant:conv:";

interface StoredConversation {
  history: LLMMessage[];
  lead: Partial<Record<string, string | number>> | null;
  handoffRequested: boolean;
  createdAt: string;
}

const memoryStore = new Map<string, StoredConversation>();

function isRedisAvailable(): boolean {
  return redis !== null && redis.status === "ready";
}

export async function createConversation(): Promise<string> {
  const id = randomUUID();
  const conversation: StoredConversation = {
    history: [],
    lead: null,
    handoffRequested: false,
    createdAt: new Date().toISOString(),
  };

  if (isRedisAvailable()) {
    await redis!.set(
      `${CONVERSATION_PREFIX}${id}`,
      JSON.stringify(conversation),
      "EX",
      CONVERSATION_TTL,
    );
  } else {
    memoryStore.set(id, conversation);
  }

  return id;
}

export async function getConversation(
  id: string,
): Promise<StoredConversation | null> {
  if (isRedisAvailable()) {
    const raw = await redis!.get(`${CONVERSATION_PREFIX}${id}`);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as StoredConversation;
    } catch {
      return null;
    }
  }

  return memoryStore.get(id) ?? null;
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

  if (isRedisAvailable()) {
    await redis!.set(
      `${CONVERSATION_PREFIX}${id}`,
      JSON.stringify(updated),
      "EX",
      CONVERSATION_TTL,
    );
  } else {
    memoryStore.set(id, updated);
  }
}

export async function listConversations(): Promise<
  { id: string; createdAt: string; lead: Partial<Record<string, string | number>> | null }[]
> {
  if (isRedisAvailable()) {
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

  return Array.from(memoryStore.entries())
    .map(([id, conv]) => ({ id, createdAt: conv.createdAt, lead: conv.lead }))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}
