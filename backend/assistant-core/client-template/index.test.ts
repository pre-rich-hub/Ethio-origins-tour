import { describe, expect, it } from "vitest";
import {
  createClientAssistant,
  createClientRuntime,
  config as clientAssistantConfig,
  formatLeadCaptureSummary,
} from "./index.js";
import { type LLMMessage, type LLMProvider } from "../assistant-core/index.js";

class MockProvider implements LLMProvider {
  public messages: LLMMessage[] = [];

  constructor(private readonly response: string) {}

  async complete(messages: LLMMessage[]): Promise<string> {
    this.messages = messages;
    return this.response;
  }
}

describe("client-template wiring", () => {
  it("creates an assistant with client config and data connectors", async () => {
    const provider = new MockProvider(
      JSON.stringify({
        reply: "Here is your Rome package.",
        lead: {
          name: "Amina",
          email: "amina@example.com",
        },
        shouldHandoff: false,
      }),
    );

    const assistant = createClientAssistant(provider);
    const response = await assistant.chat("Tell me about a Rome weekend package");

    expect(response.reply).toBe("Here is your Rome package.");
    expect(response.lead).toEqual({
      name: "Amina",
      email: "amina@example.com",
    });
    expect(provider.messages[0]!.content).toBe(clientAssistantConfig.systemPrompt);
    expect(provider.messages.some((message) => message.content.includes("Rome Weekend Escape"))).toBe(true);
    expect(provider.messages.some((message) => message.content.includes("checked baggage"))).toBe(true);
  });

  it("builds lead capture summaries from assistant results", async () => {
    const runtime = createClientRuntime(
      new MockProvider(
        JSON.stringify({
          reply: "I can help with that.",
          lead: { name: "Amina" },
          shouldHandoff: false,
        }),
      ),
    );

    const summary = runtime.leadCapture.buildSummary({
      reply: "I can help with that.",
      lead: { name: "Amina" },
      shouldHandoff: false,
    });

    expect(summary.missingRequiredFields).toEqual(["email"]);
    expect(summary.shouldEscalate).toBe(true);
    expect(formatLeadCaptureSummary(summary)).toContain("Missing required fields: email");
  });
});
