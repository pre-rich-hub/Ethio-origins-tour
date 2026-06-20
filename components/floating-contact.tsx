'use client'

import { motion } from 'framer-motion'
import { Bot, MessageCircle } from 'lucide-react'

export function FloatingContact() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.4, duration: 0.5 }}
      className="fixed bottom-5 right-5 z-40 flex flex-col gap-3"
    >
      <a
        href="https://wa.me/251900000000"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex size-12 items-center justify-center rounded-full border border-cream/30 bg-forest/80 text-cream shadow-lg backdrop-blur-md transition-transform hover:scale-105 hover:text-gold"
      >
        <MessageCircle className="size-5" />
      </a>
      <a
        href="#ai-assistant"
        aria-label="Open AI assistant"
        className="flex size-12 items-center justify-center rounded-full border border-cream/30 bg-gold/90 text-coffee shadow-lg backdrop-blur-md transition-transform hover:scale-105"
      >
        <Bot className="size-5" />
      </a>
    </motion.div>
  )
}
