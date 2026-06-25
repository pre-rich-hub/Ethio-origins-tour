import { type AssistantResponse, type LeadField } from "../../assistant-core/index.js";

export interface LeadCaptureSummary {
  capturedFields: Partial<Record<string, string | number>>;
  missingRequiredFields: string[];
  shouldEscalate: boolean;
  reply: string;
}

export function buildLeadCaptureSummary(
  response: AssistantResponse,
  leadFields: LeadField[],
): LeadCaptureSummary {
  const capturedFields = response.lead ?? {};
  const missingRequiredFields = leadFields
    .filter((field) => field.required)
    .filter((field) => capturedFields[field.key] === undefined || capturedFields[field.key] === null)
    .map((field) => field.key);

  return {
    capturedFields,
    missingRequiredFields,
    shouldEscalate: response.shouldHandoff || missingRequiredFields.length > 0,
    reply: response.reply,
  };
}

export function formatLeadCaptureSummary(summary: LeadCaptureSummary): string {
  const missing = summary.missingRequiredFields.length > 0
    ? summary.missingRequiredFields.join(", ")
    : "none";

  return [
    `Reply: ${summary.reply}`,
    `Captured fields: ${JSON.stringify(summary.capturedFields)}`,
    `Missing required fields: ${missing}`,
    `Escalate: ${summary.shouldEscalate ? "yes" : "no"}`,
  ].join("\n");
}

export function shouldEscalateBooking(summary: LeadCaptureSummary): boolean {
  return summary.shouldEscalate;
}
