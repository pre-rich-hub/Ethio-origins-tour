import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { SiteFooter } from '@/components/layout/site-footer'
import {
  DestinationExtrasSection,
  DestinationsGrid,
  DestinationsHero,
} from '@/features/destinations'
import { getDestinations } from '@/lib/api/cms'
import { createMetadata } from '@/lib/seo/create-metadata'

export const metadata: Metadata = createMetadata({
  title: 'Ethiopia Travel Destinations & Places to Visit',
  description:
    "Discover Ethiopia's leading travel destinations, including Lalibela, Omo Valley, Danakil Depression, Bale Mountains, Wenchi Crater Lake, Awash National Park, festivals and adventure experiences.",
  canonicalPath: '/destinations',
  primaryKeyword: 'Ethiopia Travel Destinations',
  secondaryKeywords: [
    'Places to Visit in Ethiopia',
    'Explore Ethiopia',
    'Ethiopia Sightseeing Destinations',
    'Best Ethiopia Destinations',
  ],
  ogImage: '/images/hero.png',
  ogImageAlt: 'Ethiopian highland travel destination landscape',
})

export default async function DestinationsPage() {
  const destinations = await getDestinations()

  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <DestinationsHero />
      <DestinationsGrid items={destinations} />
      <DestinationExtrasSection />
      <SiteFooter />
    </main>
  )
}
