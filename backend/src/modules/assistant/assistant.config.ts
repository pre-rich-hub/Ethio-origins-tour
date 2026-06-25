import type { AssistantConfig } from "./engine/types.js";

export const assistantConfig: AssistantConfig = {
  name: "Ethio Origins",
  brandTone: "friendly",
  systemPrompt:
    "You are Ethio Origins' travel assistant. Help customers explore Ethiopia, plan trips, answer questions about tours, destinations, and travel logistics. Keep responses warm, practical, and concise. Highlight the unique cultural and natural heritage of Ethiopia.",
  escalationPhrase: "talk to a human",
  fallbackMessage:
    "I'm not sure I can answer that right now, but I can connect you with our travel team.",
  language: "en",
  maxTurns: 20,
  leadFields: [
    { key: "name", label: "Full name", required: true },
    { key: "email", label: "Email address", required: true },
    { key: "phone", label: "Phone number", required: false },
    { key: "travelDates", label: "Preferred travel dates", required: false },
    { key: "destination", label: "Destination of interest", required: false },
  ],
};
