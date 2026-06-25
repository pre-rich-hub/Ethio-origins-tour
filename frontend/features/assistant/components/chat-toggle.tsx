'use client'

import { Bot, X } from 'lucide-react'

interface ChatToggleProps {
  isOpen: boolean
  onClick: () => void
}

export function ChatToggle({ isOpen, onClick }: ChatToggleProps) {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? 'Close AI assistant' : 'Open AI assistant'}
      className={`flex size-12 items-center justify-center rounded-full border shadow-lg backdrop-blur-md transition-all hover:scale-105 ${
        isOpen
          ? 'border-cream/30 bg-forest/90 text-cream'
          : 'border-cream/30 bg-gold/90 text-coffee'
      }`}
    >
      {isOpen ? <X className="size-5" /> : <Bot className="size-5" />}
    </button>
  )
}
