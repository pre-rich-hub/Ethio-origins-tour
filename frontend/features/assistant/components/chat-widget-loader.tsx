'use client'

import dynamic from 'next/dynamic'
import { Bot } from 'lucide-react'
import { useState } from 'react'
import { WhatsAppButton } from './whatsapp-button'

const ChatWidget = dynamic(
  () => import('./chat-widget').then((mod) => mod.ChatWidget),
  { ssr: false },
)

export function ChatWidgetLoader() {
  const [enabled, setEnabled] = useState(false)

  if (enabled) {
    return <ChatWidget defaultOpen />
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-center gap-3">
      <WhatsAppButton />
      <button
        type="button"
        onClick={() => setEnabled(true)}
        aria-label="Open AI assistant"
        className="flex size-12 items-center justify-center rounded-full border border-cream/30 bg-gold/90 text-coffee shadow-lg backdrop-blur-md transition-transform hover:scale-105"
      >
        <Bot className="size-5" />
      </button>
    </div>
  )
}
