import { describe, it, expect } from "vitest";
import { AssistantConfigSchema } from "./types.js";

describe("AssistantConfig", () => {
  const valid = {
    name: "Atlas Travel",
    brandTone: "friendly",
    systemPrompt: "You are a helpful travel assistant.",
    escalationPhrase: "let me connect you with our team",
    fallbackMessage: "Let me check on that.",
    leadFields: [
      { key: "name", label: "Full name", required: true },
      { key: "destination", label: "Destination", required: true },
    ],
  };

  it("passes with valid config", () => {
    expect(AssistantConfigSchema.safeParse(valid).success).toBe(true);
  });

  it("fails with missing escalationPhrase", () => {
    const { escalationPhrase: _, ...rest } = valid;
    expect(AssistantConfigSchema.safeParse(rest).success).toBe(false);
  });

  it("fails with invalid brandTone", () => {
    expect(
      AssistantConfigSchema.safeParse({ ...valid, brandTone: "aggressive" }).success
    ).toBe(false);
  });

  it("applies default maxTurns of 20", () => {
    const result = AssistantConfigSchema.safeParse(valid);
    expect(result.success && result.data.maxTurns).toBe(20);
  });

  it("applies default language of en", () => {
    const result = AssistantConfigSchema.safeParse(valid);
    expect(result.success && result.data.language).toBe("en");
  });

  it("rejects duplicate lead field keys", () => {
    expect(
      AssistantConfigSchema.safeParse({
        ...valid,
        leadFields: [
          { key: "name", label: "Name", required: true },
          { key: "name", label: "Name Again", required: false },
        ],
      }).success
    ).toBe(false);
  });
});
