import { describe, expect, it, vi } from "vitest";
import { Assistant, AssistantConfigSchema, type LLMMessage } from "../../index.js";
import { DataConnector } from "../connectors/types.js";
import { LLMProvider } from "../providers/types.js";

type RecordData = Record<string, unknown>;

class MockProvider implements LLMProvider {
  public messages: LLMMessage[] = [];

  constructor(private readonly response: string) {}

  async complete(messages: LLMMessage[]): Promise<string> {
    this.messages = messages;
    return this.response;
  }
}

class MockConnector implements DataConnector<RecordData> {
  constructor(
    private readonly searchResults: RecordData[],
    private readonly allResults: RecordData[],
  ) {}

  public readonly searchSpy = vi.fn(async (_query: string) => this.searchResults);
  public readonly getAllSpy = vi.fn(async () => this.allResults);

  search(query: string): Promise<RecordData[]> {
    return this.searchSpy(query);
  }

  getAll(): Promise<RecordData[]> {
    return this.getAllSpy();
  }
}

const validConfig = AssistantConfigSchema.parse({
  name: "Atlas Travel",
  brandTone: "friendly",
  systemPrompt: "You help customers plan travel safely and quickly.",
  escalationPhrase: "talk to a human",
  fallbackMessage: "I am having trouble right now.",
  language: "en",
  maxTurns: 10,
  leadFields: [
    { key: "name", label: "Full name", required: true },
    { key: "email", label: "Email", required: true },
    { key: "tripDate", label: "Trip date", required: false },
  ],
});

describe("Assistant config validation", () => {
  it("rejects missing branding", () => {
    expect(() =>
      AssistantConfigSchema.parse({
        brandTone: "friendly",
        systemPrompt: "You help customers plan travel safely and quickly.",
        escalationPhrase: "talk to a human",
        fallbackMessage: "I am having trouble right now.",
        language: "en",
        maxTurns: 10,
        leadFields: [],
      }),
    ).toThrow();
  });

  it("rejects an invalid escalation phrase", () => {
    expect(() =>
      AssistantConfigSchema.parse({
        ...validConfig,
        escalationPhrase: "  ",
      }),
    ).toThrow();
  });

  it("rejects malformed lead field definitions", () => {
    expect(() =>
      AssistantConfigSchema.parse({
        ...validConfig,
        leadFields: [{ key: "", label: "Email", required: true }],
      }),
    ).toThrow();
  });
});

describe("Assistant engine", () => {
  it("assembles prompts, injects runtime data, and parses a valid payload", async () => {
    const provider = new MockProvider(
      JSON.stringify({
        reply: "Here is your trip summary.",
        lead: {
          name: "Jordan",
          email: "jordan@example.com",
        },
        shouldHandoff: false,
      }),
    );
    const connector = new MockConnector(
      [{ id: "package-1", title: "Rome weekend" }],
      [{ id: "package-1", title: "Rome weekend" }],
    );
    const assistant = new Assistant(validConfig, provider, [connector]);

    const response = await assistant.chat("Need a Rome package for next month");

    expect(response).toEqual({
      reply: "Here is your trip summary.",
      lead: {
        name: "Jordan",
        email: "jordan@example.com",
      },
      shouldHandoff: false,
    });
    const messages = provider.messages;
    expect(messages).toHaveLength(7);
    expect(messages[0]!.content).toBe(validConfig.systemPrompt);
    expect(messages[1]!.content).toContain("Atlas Travel");
    expect(messages[2]!.content).toContain("Return a strict JSON object only.");
    expect(messages[3]!.content).toContain("Configured lead fields");
    expect(messages[4]!.content).toContain("Configured handoff phrase");
    expect(messages[5]!.content).toContain("Rome weekend");
    expect(messages[6]!.role).toBe("user");
    expect(provider.messages.some((message) => message.content.includes("Rome weekend"))).toBe(true);
    expect(connector.searchSpy).toHaveBeenCalledWith("need rome package for next month");
    expect(connector.getAllSpy).not.toHaveBeenCalled();
  });

  it("falls back when the provider payload is malformed", async () => {
    const provider = new MockProvider("not json");
    const assistant = new Assistant(validConfig, provider, []);

    const response = await assistant.chat("I need help");

    expect(response).toEqual({
      reply: validConfig.fallbackMessage,
      lead: null,
      shouldHandoff: false,
    });
  });

  it("detects the handoff phrase in the reply", async () => {
    const provider = new MockProvider(
      JSON.stringify({
        reply: "I can help with this, but talk to a human for final approval.",
        lead: null,
        shouldHandoff: false,
      }),
    );
    const assistant = new Assistant(validConfig, provider, []);

    const response = await assistant.chat("Please book this");

    expect(response.shouldHandoff).toBe(true);
  });

  it("rejects missing required lead fields and falls back", async () => {
    const provider = new MockProvider(
      JSON.stringify({
        reply: "Booking updated.",
        lead: {
          name: "Jordan",
        },
        shouldHandoff: false,
      }),
    );
    const assistant = new Assistant(validConfig, provider, []);

    const response = await assistant.chat("Update my booking");

    expect(response).toEqual({
      reply: validConfig.fallbackMessage,
      lead: null,
      shouldHandoff: false,
    });
  });

  it("aggregates data across multiple connectors", async () => {
    const provider = new MockProvider(
      JSON.stringify({
        reply: "Aggregated response.",
        lead: null,
        shouldHandoff: false,
      }),
    );
    const first = new MockConnector(
      [{ source: "first", label: "FAQ item" }],
      [{ source: "first", label: "FAQ item" }],
    );
    const second = new MockConnector(
      [{ source: "second", label: "Package item" }],
      [{ source: "second", label: "Package item" }],
    );
    const assistant = new Assistant(validConfig, provider, [first, second]);

    await assistant.chat("Tell me about package and FAQ details");

    expect(provider.messages.some((message) => message.content.includes("FAQ item"))).toBe(true);
    expect(provider.messages.some((message) => message.content.includes("Package item"))).toBe(true);
  });
});
