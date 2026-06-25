import { z } from "zod";
import { LeadField } from "../config/types.js";
import { Lead } from "./assistant.js";

const AssistantPayloadSchema = z
  .object({
    reply: z.string().trim().min(1),
    lead: z.unknown().nullable().optional(),
    shouldHandoff: z.boolean().default(false),
  })
  .strict();

export interface ParsedAssistantPayload {
  reply: string;
  lead: Partial<Lead> | null;
  shouldHandoff: boolean;
}

export function parseAssistantPayload(
  rawPayload: string,
  leadFields: LeadField[],
): ParsedAssistantPayload | null {
  const parsedJson = safeParseJson(rawPayload);
  if (parsedJson === null) {
    return null;
  }

  const payloadResult = AssistantPayloadSchema.safeParse(parsedJson);
  if (!payloadResult.success) {
    return null;
  }

  const lead = parseLead(payloadResult.data.lead, leadFields);
  if (payloadResult.data.lead !== null && payloadResult.data.lead !== undefined && lead === null) {
    return null;
  }

  return {
    reply: payloadResult.data.reply,
    lead,
    shouldHandoff: payloadResult.data.shouldHandoff,
  };
}

function parseLead(
  candidate: unknown,
  leadFields: LeadField[],
): Partial<Lead> | null {
  if (candidate === null || candidate === undefined) {
    return null;
  }

  if (typeof candidate !== "object" || Array.isArray(candidate)) {
    return null;
  }

  const leadRecord = candidate as Record<string, unknown>;
  const allowedKeys = new Set(leadFields.map((field) => field.key));
  const requiredKeys = new Set(
    leadFields.filter((field) => field.required).map((field) => field.key),
  );
  const extracted: Partial<Lead> = {};

  for (const key of Object.keys(leadRecord)) {
    if (!allowedKeys.has(key)) {
      return null;
    }
  }

  for (const field of leadFields) {
    if (!(field.key in leadRecord)) {
      if (requiredKeys.has(field.key)) {
        return null;
      }
      continue;
    }

    const value = leadRecord[field.key];
    if (typeof value !== "string" && typeof value !== "number") {
      return null;
    }

    extracted[field.key] = value;
  }

  return extracted;
}

function safeParseJson(rawPayload: string): unknown | null {
  try {
    return JSON.parse(rawPayload);
  } catch {
    return null;
  }
}
