import { AssistantConfigSchema, type AssistantConfig, type LeadField } from "../assistant-core/index.js";

export const clientBrand = {
  name: "Atlas Travel",
  tone: "friendly" as const,
  language: "en",
};

export const clientLeadFields: LeadField[] = [
  { key: "name", label: "Full name", required: true },
  { key: "email", label: "Email address", required: true },
  { key: "phone", label: "Phone number", required: false },
  { key: "travelDates", label: "Preferred travel dates", required: false },
];

export const clientAssistantConfig = AssistantConfigSchema.parse({
  name: clientBrand.name,
  brandTone: clientBrand.tone,
  systemPrompt:
    "You are Atlas Travel's assistant. Help customers plan trips, answer FAQ questions, and keep the tone warm, practical, and concise.",
  escalationPhrase: "talk to a travel specialist",
  fallbackMessage: "I cannot confirm that right now, but I can connect you with our team.",
  language: clientBrand.language,
  maxTurns: 20,
  leadFields: clientLeadFields,
});

export type ClientAssistantConfig = AssistantConfig;
