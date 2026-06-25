import { AssistantConfig } from "../config/types.js";
import { LLMMessage } from "../providers/types.js";

export function buildEnginePromptMessages(config: AssistantConfig): LLMMessage[] {
  return [
    {
      role: "system",
      content: config.systemPrompt,
    },
    {
      role: "system",
      content: buildIdentityPrompt(config),
    },
    {
      role: "system",
      content: [
        "Return a strict JSON object only.",
        'Shape: {"reply": string, "lead": object | null, "shouldHandoff": boolean}.',
        "Do not wrap the JSON in markdown or add extra text.",
      ].join(" "),
    },
    {
      role: "system",
      content: buildLeadPrompt(config),
    },
    {
      role: "system",
      content: buildHandoffPrompt(config),
    },
  ];
}

export function buildRuntimeContextMessage(
  config: AssistantConfig,
  runtimeData: unknown[],
): LLMMessage {
  return {
    role: "system",
    content: [
      `Runtime context for ${config.name}.`,
      `Tone: ${config.brandTone}.`,
      `Language: ${config.language}.`,
      `Fallback message: ${config.fallbackMessage}.`,
      `Retrieved data: ${JSON.stringify(runtimeData, null, 2)}`,
    ].join("\n"),
  };
}

function buildIdentityPrompt(config: AssistantConfig): string {
  return [
    `You are ${config.name}.`,
    `Respond in a ${config.brandTone} tone.`,
    `Keep the conversation in ${config.language}.`,
  ].join(" ");
}

function buildLeadPrompt(config: AssistantConfig): string {
  const fields = config.leadFields
    .map((field) => `${field.key}:${field.label}${field.required ? " (required)" : ""}`)
    .join(", ");

  return [
    "Capture lead data only when the user provides it explicitly.",
    "Populate the lead object with configured keys only.",
    fields.length > 0 ? `Configured lead fields: ${fields}.` : "No lead fields are configured.",
  ].join(" ");
}

function buildHandoffPrompt(config: AssistantConfig): string {
  return [
    "If escalation is needed, include the configured handoff phrase in the reply.",
    `Configured handoff phrase: ${config.escalationPhrase}.`,
    "The runtime will detect that phrase and set shouldHandoff.",
  ].join(" ");
}
