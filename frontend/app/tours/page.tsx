import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { SiteFooter } from '@/components/layout/site-footer'
import { ToursGrid, ToursHero } from '@/features/tours'

export const metadata: Metadata = {
  title: 'Tours | Ethio Origins Tours',
  description:
    'Explore dedicated Ethiopian tour pages for cultural journeys, historic routes, wildlife escapes, volcanic landscapes, and private tailor-made itineraries.',
}

export default function ToursPage() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <ToursHero />
      <ToursGrid />
      <SiteFooter />
    </main>
  )
}
