export const WHATSAPP_PHONE_DISPLAY = '+251 93 525 7197'
export const WHATSAPP_PHONE = '251935257197'
export const SECONDARY_PHONE_DISPLAY = '+251 70 799 0306'
export const SECONDARY_PHONE = '251707990306'

export function createWhatsAppUrl(message = '') {
  const url = new URL(`https://wa.me/${WHATSAPP_PHONE}`)

  if (message.trim()) {
    url.searchParams.set('text', message.trim())
  }

  return url.toString()
}
