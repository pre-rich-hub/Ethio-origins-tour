import type { AssistantConfig } from "./types.js";
import type { LLMMessage } from "../providers/types.js";

export function buildEnginePromptMessages(config: AssistantConfig): LLMMessage[] {
  return [
    {
      role: "system",
      content: config.systemPrompt,
    },
    {
      role: "system",
      content: [
        `You are ${config.name}. Respond in a ${config.brandTone} tone.`,
        `Keep the conversation in ${config.language}.`,
      ].join("\n"),
    },
    {
      role: "system",
      content: [
        `Return a strict JSON object only.`,
        `Shape: { "reply": string, "lead": object | null, "shouldHandoff": boolean }.`,
        `Do not wrap the JSON in markdown or add extra text.`,
      ].join("\n"),
    },
    {
      role: "system",
      content: [
        `Capture lead data only when the user provides it explicitly.`,
        `Populate the lead object with configured keys only.`,
        `Configured lead fields: ${config.leadFields.map((f) => `${f.key}:${f.label}${f.required ? " (required)" : ""}`).join(", ")}`,
      ].join("\n"),
    },
    {
      role: "system",
      content: [
        `If escalation is needed, include the configured handoff phrase in the reply.`,
        `Configured handoff phrase: ${config.escalationPhrase}.`,
        `The runtime will detect that phrase and set shouldHandoff.`,
      ].join("\n"),
    },
  ];
}

export function buildRuntimeContextMessage(
  config: AssistantConfig,
  runtimeData: unknown[],
): LLMMessage {
  const dataJson = JSON.stringify(runtimeData, null, 2);

  return {
    role: "system",
    content: [
      `Runtime context for ${config.name}.`,
      `Tone: ${config.brandTone}.`,
      `Language: ${config.language}.`,
      `Fallback message: ${config.fallbackMessage}.`,
      `Retrieved data: ${dataJson}`,
    ].join("\n"),
  };
}
