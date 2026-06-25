import type { AssistantResponse } from '../types'

export async function sendChatMessage(
  message: string,
  conversationId?: string,
): Promise<AssistantResponse> {
  const res = await fetch('/api/v1/assistant/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, conversationId }),
  })

  const payload = await res.json()

  if (!res.ok || !payload.success) {
    throw new Error(payload.message || 'Chat request failed')
  }

  return payload.data as AssistantResponse
}
