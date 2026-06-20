import { Mail, MapPin, Phone } from 'lucide-react'

export const contactMethods = [
  {
    icon: Phone,
    label: 'Call or WhatsApp',
    value: '+251 900 000 000',
    href: 'https://wa.me/251900000000',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@ethioorigins.com',
    href: 'mailto:hello@ethioorigins.com',
  },
  {
    icon: MapPin,
    label: 'Office',
    value: 'Bole Road, Addis Ababa',
    href: 'https://maps.google.com/?q=Bole%20Road%20Addis%20Ababa',
  },
]
