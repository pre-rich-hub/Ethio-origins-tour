export type SupportedProviderKind = "openai" | "gemini" | "anthropic" | "grok";

export interface ProviderAdapterSpec<TOptions> {
  kind: SupportedProviderKind;
  create(options: TOptions): import("./types.js").LLMProvider;
}
