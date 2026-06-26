'use client'

import { Bot, User } from 'lucide-react'
import type { ChatMessage } from '../types'

interface ChatMessageProps {
  message: ChatMessage
}

export function ChatMessageBubble({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div
        className={`flex size-9 shrink-0 items-center justify-center rounded-full shadow-sm ${
          isUser
            ? 'bg-forest text-cream'
            : 'bg-gold text-coffee'
        }`}
      >
        {isUser ? <User className="size-4" /> : <Bot className="size-4" />}
      </div>
      <div
        className={`max-w-[82%] rounded-2xl px-4 py-3 font-sans text-sm leading-relaxed shadow-sm ${
          isUser
            ? 'rounded-tr-sm bg-forest text-cream'
            : 'rounded-tl-sm border border-forest/8 bg-white text-foreground'
        }`}
      >
        {message.content}
      </div>
    </div>
  )
}
