'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, MessageCircle } from 'lucide-react'
import { ChatMessageBubble } from './chat-message'
import { ChatInput } from './chat-input'
import { ChatToggle } from './chat-toggle'
import { sendChatMessage } from '../data/assistant-api'
import type { ChatMessage } from '../types'

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
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
            className="fixed bottom-28 right-5 z-50 flex w-80 flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-2xl sm:w-96"
            style={{ maxHeight: 'min(600px, calc(100vh - 140px))' }}
          >
            {/* Header */}
            <div className="flex items-center gap-2 bg-forest px-4 py-3 text-cream">
              <Bot className="size-5" />
              <span className="font-serif text-sm font-semibold">Ethio Origins Assistant</span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-4">
              <div className="flex flex-col gap-3">
                {messages.map((msg) => (
                  <ChatMessageBubble key={msg.id} message={msg} />
                ))}
                {isLoading && (
                  <div className="flex items-start gap-2">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold text-coffee">
                      <Bot className="size-4" />
                    </div>
                    <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-stone px-4 py-2.5">
                      <div className="flex gap-1">
                        <span className="size-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: '0ms' }} />
                        <span className="size-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: '150ms' }} />
                        <span className="size-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                {error && (
                  <div className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">
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

      {/* Toggle buttons — AI on top, WhatsApp below (rendered after panel to stay on top) */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-center gap-3">
        <ChatToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        <a
          href="https://wa.me/251900000000"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex size-12 items-center justify-center rounded-full border border-cream/30 bg-forest/80 text-cream shadow-lg backdrop-blur-md transition-transform hover:scale-105 hover:text-gold"
        >
          <MessageCircle className="size-5" />
        </a>
      </div>
    </>
  )
}
