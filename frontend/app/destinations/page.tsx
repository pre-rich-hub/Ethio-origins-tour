import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { SiteFooter } from '@/components/layout/site-footer'
import { DestinationsGrid, DestinationsHero } from '@/features/destinations'

export const metadata: Metadata = {
  title: 'Destinations | Ethio Origins Tours',
  description:
    'Explore dedicated Ethiopian destination pages for historic routes, Omo Valley, Danakil, Bale Mountains, Wonchi, Awash, and the Rift Valley.',
}

export default function DestinationsPage() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <DestinationsHero />
      <DestinationsGrid />
      <SiteFooter />
    </main>
  )
}
