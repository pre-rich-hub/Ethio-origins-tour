export interface LLMMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface LLMProvider {
  complete(messages: LLMMessage[]): Promise<string>;
}
