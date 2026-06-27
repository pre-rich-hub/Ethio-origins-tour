import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import {
  createWhatsAppUrl,
  SECONDARY_PHONE,
  SECONDARY_PHONE_DISPLAY,
  WHATSAPP_PHONE_DISPLAY,
} from '@/lib/whatsapp'

export const contactMethods = [
  {
    icon: MessageCircle,
    label: 'Call or WhatsApp',
    value: WHATSAPP_PHONE_DISPLAY,
    href: createWhatsAppUrl('Hello Ethio Origins Tour, I would like to plan a trip.'),
  },
  {
    icon: Phone,
    label: 'Phone',
    value: SECONDARY_PHONE_DISPLAY,
    href: `tel:+${SECONDARY_PHONE}`,
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@ethiooriginstour.com',
    href: 'mailto:info@ethiooriginstour.com',
  },
  {
    icon: MapPin,
    label: 'Office',
    value: 'Bole Road, Addis Ababa',
    href: 'https://maps.app.goo.gl/HSzn7PiL5KWzdWD99',
  },
]
