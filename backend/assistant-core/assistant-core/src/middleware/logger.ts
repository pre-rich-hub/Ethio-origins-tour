import { LLMMessage } from "../providers/types.js";

export interface LogEntry {
  timestamp: string;
  userMessage: string;
  reply: string;
  shouldHandoff: boolean;
  leadFound: boolean;
  messageCount: number;
}

export function logTurn(
  userMessage: string,
  reply: string,
  shouldHandoff: boolean,
  leadFound: boolean,
  history: LLMMessage[]
): LogEntry {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    userMessage,
    reply,
    shouldHandoff,
    leadFound,
    messageCount: history.length,
  };
  console.log("[assistant]", JSON.stringify(entry, null, 2));
  return entry;
}
