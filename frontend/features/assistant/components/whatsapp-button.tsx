import { MessageCircle } from 'lucide-react'
import { createWhatsAppUrl } from '@/lib/whatsapp'

export function WhatsAppButton() {
  return (
    <a
      href={createWhatsAppUrl('Hello Ethio Origins Tour, I would like help planning my Ethiopia trip.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Ethio Origins Tour on WhatsApp"
      className="flex size-12 items-center justify-center rounded-full border border-white/30 bg-[#25D366] text-white shadow-lg backdrop-blur-md transition-transform hover:scale-105"
    >
      <MessageCircle className="size-6" />
    </a>
  )
}
