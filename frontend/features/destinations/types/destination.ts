import type { SeoData } from '@/lib/seo/seo-types'

export type Destination = {
  slug: string
  name: string
  place: string
  duration: string
  description: string
  intro: string
  image: string
  highlights: string[]
  bestFor: string
  itinerary: string[]
  imageAlt: string
  seo: SeoData
}
