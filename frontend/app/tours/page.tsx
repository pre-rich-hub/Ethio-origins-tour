import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { SiteFooter } from '@/components/layout/site-footer'
import { TourCategoryNav, ToursGrid, ToursHero } from '@/features/tours'
import { createMetadata } from '@/lib/seo/create-metadata'

export const metadata: Metadata = createMetadata({
  title: 'Ethiopia Tour Packages & Guided Tours',
  description:
    'Browse Ethiopia tour packages for cultural journeys, historical routes, trekking, wildlife, coffee experiences, private tours and group adventures.',
  canonicalPath: '/tours',
  primaryKeyword: 'Ethiopia Tour Packages',
  secondaryKeywords: [
    'Ethiopia Vacation Packages',
    'Ethiopia Travel Packages',
    'Ethiopia Holiday Packages',
    'Ethiopia Guided Tours',
    'Ethiopia Tour Booking',
  ],
  ogImage: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782375172/121667627429376236_nlva6g.jpg',
  ogImageAlt: 'Guided Ethiopia tour package experience',
})

export default function ToursPage() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <ToursHero />
      <TourCategoryNav />
      <ToursGrid />
      <SiteFooter />
    </main>
  )
}
