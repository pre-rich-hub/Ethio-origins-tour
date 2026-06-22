import type { SeoData } from '@/lib/seo/seo-types'

export type DestinationCategory =
  | 'historical-religious'
  | 'lakes-scenic'
  | 'mountains-wildlife'
  | 'adventure-geological'
  | 'tribal-cultural'

export type Destination = {
  slug: string
  name: string
  category: DestinationCategory
  categoryLabel: string
  region: string
  shortDescription: string
  overview: string
  relatedTourSlugs: string[]
  gallery?: string[]
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
