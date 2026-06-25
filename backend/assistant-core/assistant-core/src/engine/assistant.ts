import { AssistantConfig } from "../config/types.js";
import { LLMProvider, LLMMessage } from "../providers/types.js";
import { DataConnector } from "../connectors/types.js";
import { AssistantConfigSchema } from "../config/types.js";
import { buildEnginePromptMessages, buildRuntimeContextMessage } from "./prompts.js";
import { parseAssistantPayload } from "./leadExtractor.js";
import { containsHandoffPhrase } from "./handoff.js";
import { logTurn } from "../middleware/logger.js";

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
    this.config = AssistantConfigSchema.parse(config);
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

    logTurn(userMessage, reply, shouldHandoff, lead !== null, this.history);

    return {
      reply,
      lead,
      shouldHandoff,
    };
  }

  private async collectConnectorData(userMessage: string): Promise<unknown[]> {
    const searchQuery = buildSearchQuery(userMessage);
    const results: unknown[] = [];
    const seen = new Set<string>();

    for (const connector of this.connectors) {
      const searchResults = await connector.search(searchQuery);
      const data = searchResults.length > 0 ? searchResults : await connector.getAll();

      for (const item of data) {
        const serialized = serializeValue(item);
        if (seen.has(serialized)) {
          continue;
        }

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
