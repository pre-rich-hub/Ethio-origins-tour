'use client'

import { track } from '@vercel/analytics'

export type SeoConversionEvent =
  | 'contact_submit_started'
  | 'contact_submit_success'
  | 'contact_submit_failed'
  | 'newsletter_submit_success'
  | 'newsletter_submit_failed'
  | 'tour_inquiry_clicked'
  | 'tour_card_clicked'
  | 'destination_card_clicked'
  | 'main_contact_cta_clicked'

type EventProperties = {
  route?: string
  tourSlug?: string
  destinationSlug?: string
  categorySlug?: string
  ctaLocation?: string
  resultCode?: string
}

export function trackSeoEvent(
  event: SeoConversionEvent,
  properties: EventProperties = {},
) {
  try {
    track(event, properties)
  } catch {
    // Analytics must never affect user flows.
  }
}
