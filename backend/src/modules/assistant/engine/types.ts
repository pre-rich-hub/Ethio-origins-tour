export interface LeadField {
  key: string;
  label: string;
  required: boolean;
}

export interface AssistantConfig {
  name: string;
  brandTone: "formal" | "casual" | "friendly";
  systemPrompt: string;
  escalationPhrase: string;
  fallbackMessage: string;
  language: string;
  maxTurns: number;
  leadFields: LeadField[];
}
