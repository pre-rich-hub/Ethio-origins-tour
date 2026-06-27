import type { AssistantResponse } from '../types'

interface ApiPayload {
  success?: boolean
  message?: string
  data?: AssistantResponse
}

export async function sendChatMessage(
  message: string,
  conversationId?: string,
): Promise<AssistantResponse> {
  const res = await fetch('/api/v1/assistant/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, conversationId }),
  })

  const responseText = await res.text()
  let payload: ApiPayload | null = null

  if (responseText) {
    try {
      payload = JSON.parse(responseText) as ApiPayload
    } catch {
      // Next.js returns a non-JSON response when its backend rewrite cannot be reached.
    }
  }

  if (!res.ok || !payload?.success) {
    if (payload?.message) {
      throw new Error(payload.message)
    }

    if (res.status >= 500 || !payload) {
      throw new Error('The assistant service is unavailable. Make sure the backend is running and try again.')
    }

    throw new Error('Chat request failed')
  }

  if (!payload.data) {
    throw new Error('The assistant returned an invalid response. Please try again.')
  }

  return payload.data
}
