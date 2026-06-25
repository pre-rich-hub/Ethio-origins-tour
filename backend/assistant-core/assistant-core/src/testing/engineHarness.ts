import { Assistant, type AssistantResponse } from "../engine/assistant.js";
import { type AssistantConfig } from "../config/types.js";
import { type DataConnector } from "../connectors/types.js";
import { type LLMMessage, type LLMProvider } from "../providers/types.js";

export class RecordingProvider implements LLMProvider {
  public readonly calls: LLMMessage[][] = [];

  constructor(private readonly response: string | ((messages: LLMMessage[]) => string | Promise<string>)) {}

  async complete(messages: LLMMessage[]): Promise<string> {
    this.calls.push(messages.map((message) => ({ ...message })));
    return typeof this.response === "function" ? await this.response(messages) : this.response;
  }
}

export class RecordingConnector<T> implements DataConnector<T> {
  public readonly searchQueries: string[] = [];
  public getAllCalls = 0;

  constructor(
    private readonly searchResults: T[],
    private readonly allResults: T[],
  ) {}

  async search(query: string): Promise<T[]> {
    this.searchQueries.push(query);
    return [...this.searchResults];
  }

  async getAll(): Promise<T[]> {
    this.getAllCalls += 1;
    return [...this.allResults];
  }
}

export interface EngineHarness<T> {
  assistant: Assistant;
  provider: RecordingProvider;
  connectors: RecordingConnector<T>[];
  run(userMessage: string): Promise<AssistantResponse>;
}

export function createEngineHarness<T>(options: {
  config: AssistantConfig;
  providerResponse: string | ((messages: LLMMessage[]) => string | Promise<string>);
  connectors: Array<{
    searchResults: T[];
    allResults: T[];
  }>;
  history?: LLMMessage[];
}): EngineHarness<T> {
  const provider = new RecordingProvider(options.providerResponse);
  const connectors = options.connectors.map(
    (connector) => new RecordingConnector<T>(connector.searchResults, connector.allResults),
  );
  const assistant = new Assistant(options.config, provider, connectors, options.history ?? []);

  return {
    assistant,
    provider,
    connectors,
    run(userMessage: string): Promise<AssistantResponse> {
      return assistant.chat(userMessage);
    },
  };
}
