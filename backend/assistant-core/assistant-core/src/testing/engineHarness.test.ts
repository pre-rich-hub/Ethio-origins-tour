import { describe, expect, it } from "vitest";
import { AssistantConfigSchema } from "../config/types.js";
import { createEngineHarness } from "./engineHarness.js";

const config = AssistantConfigSchema.parse({
  name: "Harness Demo",
  brandTone: "friendly",
  systemPrompt: "You are a controlled test assistant for the engine harness.",
  escalationPhrase: "talk to a human",
  fallbackMessage: "Fallback reply.",
  language: "en",
  maxTurns: 10,
  leadFields: [
    { key: "name", label: "Full name", required: true },
    { key: "email", label: "Email", required: true },
  ],
});

describe("engine harness", () => {
  it("builds a ready-to-run assistant with recording hooks", async () => {
    const harness = createEngineHarness({
      config,
      providerResponse: JSON.stringify({
        reply: "Harness response.",
        lead: { name: "Jordan", email: "jordan@example.com" },
        shouldHandoff: false,
      }),
      connectors: [
        {
          searchResults: [{ id: "faq-1", title: "Cancellation policy" }],
          allResults: [{ id: "faq-1", title: "Cancellation policy" }],
        },
      ],
    });

    const response = await harness.run("I need help with cancellation");

    expect(response.reply).toBe("Harness response.");
    expect(harness.provider.calls).toHaveLength(1);
    expect(harness.connectors[0]!.searchQueries).toEqual(["need help with cancellation"]);
    expect(harness.connectors[0]!.getAllCalls).toBe(0);
  });
});
