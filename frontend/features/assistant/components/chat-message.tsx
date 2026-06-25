'use client'

import { Bot, User } from 'lucide-react'
import type { ChatMessage } from '../types'

interface ChatMessageProps {
  message: ChatMessage
}

export function ChatMessageBubble({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div
        className={`flex size-8 shrink-0 items-center justify-center rounded-full ${
          isUser
            ? 'bg-forest text-cream'
            : 'bg-gold text-coffee'
        }`}
      >
        {isUser ? <User className="size-4" /> : <Bot className="size-4" />}
      </div>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'bg-forest text-cream rounded-tr-sm'
            : 'bg-stone text-foreground rounded-tl-sm'
        }`}
      >
        {message.content}
      </div>
    </div>
  )
}
