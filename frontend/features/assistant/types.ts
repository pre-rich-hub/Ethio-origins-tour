export interface AssistantResponse {
  reply: string
  lead: Record<string, string | number> | null
  shouldHandoff: boolean
  conversationId: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}
