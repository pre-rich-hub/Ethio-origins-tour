'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Sparkles, X } from 'lucide-react'
import { ChatMessageBubble } from './chat-message'
import { ChatInput } from './chat-input'
import { ChatToggle } from './chat-toggle'
import { sendChatMessage } from '../data/assistant-api'
import type { ChatMessage } from '../types'
import { WhatsAppButton } from './whatsapp-button'

export function ChatWidget({ defaultOpen = false }: { defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "👋 Hi! I'm the Ethio Origins assistant. Ask me about our tours, destinations, or anything about traveling in Ethiopia!",
      timestamp: new Date(),
    },
  ])
  const [conversationId, setConversationId] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  const handleSend = useCallback(async (text: string) => {
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMsg])
    setIsLoading(true)
    setError(null)

    try {
      const response = await sendChatMessage(text, conversationId)

      setConversationId(response.conversationId)

      const assistantMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response.reply,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMsg])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [conversationId])

  return (
    <>
      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 z-50 flex w-[calc(100vw-2rem)] max-w-[22rem] flex-col overflow-hidden rounded-md border border-cream/30 bg-cream shadow-2xl shadow-black/20 sm:bottom-28 sm:right-5 sm:max-w-[24rem]"
            style={{ maxHeight: 'min(600px, calc(100vh - 140px))' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 bg-forest px-4 py-3.5 text-cream">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-cream/20 bg-cream/10">
                  <Sparkles className="size-4 text-gold" />
                </span>
                <div className="min-w-0">
                  <p className="truncate font-sans text-sm font-bold">
                    Ethio Origins Assistant
                  </p>
                  <p className="font-sans text-[0.68rem] uppercase tracking-[0.18em] text-cream/65">
                    International traveler support
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close AI assistant"
                className="flex size-9 shrink-0 items-center justify-center rounded-full border border-cream/15 bg-cream/10 text-cream transition-colors hover:border-gold/70 hover:text-gold"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-[linear-gradient(180deg,#faf8f4,#f1eadf)] px-4 py-5">
              <div className="flex flex-col gap-4">
                {messages.map((msg) => (
                  <ChatMessageBubble key={msg.id} message={msg} />
                ))}
                {isLoading && (
                  <div className="flex items-start gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold text-coffee shadow-sm">
                      <Bot className="size-4" />
                    </div>
                    <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-forest/8 bg-white px-4 py-3 shadow-sm">
                      <div className="flex gap-1.5">
                        <span className="size-2 animate-bounce rounded-full bg-forest/45" style={{ animationDelay: '0ms' }} />
                        <span className="size-2 animate-bounce rounded-full bg-forest/45" style={{ animationDelay: '150ms' }} />
                        <span className="size-2 animate-bounce rounded-full bg-forest/45" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                {error && (
                  <div className="rounded-md border border-destructive/15 bg-destructive/10 px-3 py-2 text-xs leading-relaxed text-destructive">
                    {error}
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            </div>

            {/* Input */}
            <ChatInput onSend={handleSend} disabled={isLoading} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button rendered after panel to stay on top. */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-center gap-3">
        <WhatsAppButton />
        {!isOpen && <ChatToggle isOpen={isOpen} onClick={() => setIsOpen(true)} />}
      </div>
    </>
  )
}
