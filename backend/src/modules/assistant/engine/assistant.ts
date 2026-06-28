import type { AssistantConfig } from "./types.js";
import type { LLMProvider, LLMMessage } from "../providers/types.js";
import type { DataConnector } from "../connectors/types.js";
import { buildEnginePromptMessages, buildRuntimeContextMessage } from "./prompts.js";
import { parseAssistantPayload } from "./leadExtractor.js";
import { containsHandoffPhrase } from "./handoff.js";

export type Lead = Record<string, string | number>;

export interface AssistantResponse {
  reply: string;
  lead: Partial<Lead> | null;
  shouldHandoff: boolean;
}

export class Assistant {
  private readonly config: AssistantConfig;
  private history: LLMMessage[];

  constructor(
    config: AssistantConfig,
    private provider: LLMProvider,
    private connectors: DataConnector<unknown>[],
    history: LLMMessage[] = [],
  ) {
    this.config = config;
    this.history = [...history];
  }

  async chat(userMessage: string): Promise<AssistantResponse> {
    const runtimeData = await this.collectConnectorData(userMessage);
    const messages: LLMMessage[] = [
      ...buildEnginePromptMessages(this.config),
      buildRuntimeContextMessage(this.config, runtimeData),
      ...this.history,
      { role: "user", content: userMessage },
    ];
    const rawResponse = await this.provider.complete(messages);
    const parsedResponse = parseAssistantPayload(
      rawResponse,
      this.config.leadFields,
    );
    const reply = parsedResponse?.reply ?? this.config.fallbackMessage;
    const lead = parsedResponse?.lead ?? null;
    const shouldHandoff =
      (parsedResponse?.shouldHandoff ?? false) ||
      containsHandoffPhrase(reply, this.config.escalationPhrase) ||
      containsHandoffPhrase(rawResponse, this.config.escalationPhrase);

    this.history.push(
      { role: "user", content: userMessage },
      { role: "assistant", content: reply },
    );
    this.trimHistory(this.config.maxTurns);

    return {
      reply,
      lead,
      shouldHandoff,
    };
  }

  getHistory(): LLMMessage[] {
    return [...this.history];
  }

  private async collectConnectorData(userMessage: string): Promise<unknown[]> {
    const searchQuery = buildSearchQuery(userMessage);
    const results: unknown[] = [];
    const seen = new Set<string>();

    const connectorResults = await Promise.all(
      this.connectors.map((connector) => connector.search(searchQuery)),
    );

    for (const data of connectorResults) {
      for (const item of data) {
        const serialized = serializeValue(item);
        if (seen.has(serialized)) continue;
        seen.add(serialized);
        results.push(item);
      }
    }

    return results;
  }

  private trimHistory(maxTurns: number): void {
    const maxMessages = maxTurns * 2;
    if (this.history.length > maxMessages) {
      this.history = this.history.slice(this.history.length - maxMessages);
    }
  }
}

function buildSearchQuery(message: string): string {
  const tokens = message.toLowerCase().match(/[a-z0-9]+/g) ?? [];
  const uniqueTokens = Array.from(new Set(tokens)).filter((token) => token.length >= 3);

  if (uniqueTokens.length > 0) {
    return uniqueTokens.slice(0, 8).join(" ");
  }

  return message.trim();
}

function serializeValue(value: unknown): string {
  try {
    const serialized = JSON.stringify(value);
    return serialized ?? String(value);
  } catch {
    return String(value);
  }
}
