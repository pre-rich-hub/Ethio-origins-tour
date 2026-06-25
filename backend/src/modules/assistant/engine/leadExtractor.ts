import type { LeadField } from "./types.js";

interface AssistantPayload {
  reply: string;
  lead: Partial<Record<string, string | number>> | null;
  shouldHandoff: boolean;
}

export function parseAssistantPayload(
  rawResponse: string,
  leadFields: LeadField[],
): AssistantPayload | null {
  try {
    const parsed = JSON.parse(rawResponse) as AssistantPayload;

    if (typeof parsed.reply !== "string") return null;
    if (typeof parsed.shouldHandoff !== "boolean") return null;

    if (parsed.lead !== null && typeof parsed.lead !== "object") return null;

    if (parsed.lead !== null) {
      const allowedKeys = new Set(leadFields.map((f) => f.key));
      const requiredKeys = new Set(
        leadFields.filter((f) => f.required).map((f) => f.key),
      );

      for (const key of Object.keys(parsed.lead)) {
        if (!allowedKeys.has(key)) return null;

        const value = parsed.lead[key];
        if (typeof value !== "string" && typeof value !== "number") return null;
      }

      for (const key of requiredKeys) {
        if (parsed.lead[key] === undefined || parsed.lead[key] === null) return null;
      }
    }

    return parsed;
  } catch {
    return null;
  }
}
