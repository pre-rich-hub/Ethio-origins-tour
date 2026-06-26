'use client'

import { useState, type FormEvent } from 'react'
import { Send } from 'lucide-react'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-forest/10 bg-cream p-3.5">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ask about tours, destinations..."
        disabled={disabled}
        className="min-w-0 flex-1 rounded-full border border-forest/15 bg-white px-4 py-2.5 font-sans text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="flex size-11 shrink-0 items-center justify-center rounded-full bg-forest text-cream shadow-sm transition-colors hover:bg-coffee disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Send className="size-4" />
      </button>
    </form>
  )
}
