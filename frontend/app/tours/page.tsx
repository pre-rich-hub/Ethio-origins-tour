import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { SiteFooter } from '@/components/layout/site-footer'
import { TourCategoryNav, ToursGrid, ToursHero } from '@/features/tours'
import { TourSearchGuide } from '@/features/tours/components/tour-search-guide'
import { TourFaq } from '@/features/tours/components/tour-faq'
import { tourFaqs } from '@/features/tours/data/tour-faqs'
import { JsonLd } from '@/components/seo/json-ld'
import { createFaqSchema } from '@/lib/seo/schemas'
import { getTours } from '@/lib/api/cms'
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
    'Explore Ethiopia Tours',
    'Visit Ethiopia Packages',
    'Ethiopia Tour Booking',
  ],
  ogImage: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782375172/121667627429376236_nlva6g.jpg',
  ogImageAlt: 'Guided Ethiopia tour package experience',
})

export default async function ToursPage() {
  const tours = await getTours()

  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <JsonLd data={createFaqSchema(tourFaqs)} />
      <ToursHero />
      <TourSearchGuide />
      <TourCategoryNav />
      <ToursGrid items={tours} />
      <TourFaq />
      <SiteFooter />
    </main>
  )
}
