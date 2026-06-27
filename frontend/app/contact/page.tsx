import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { SiteFooter } from '@/components/layout/site-footer'
import {
  ContactFormSection,
  ContactHero,
  ContactPlanningSteps,
} from '@/features/contact'
import { createMetadata } from '@/lib/seo/create-metadata'

export const metadata: Metadata = createMetadata({
  title: 'Customized Ethiopia Tours & Private Travel Planning',
  description:
    'Plan private and customized Ethiopia tours with local travel experts. Share your dates, interests and preferred destinations for a tailored itinerary.',
  canonicalPath: '/contact',
  primaryKeyword: 'Ethiopia Customized Tours',
  secondaryKeywords: [
    'Ethiopia Tour Booking',
    'Plan an Ethiopia Tour',
    'Ethiopia Travel Planner',
    'Custom Ethiopia Tour Inquiry',
    'Ethiopia Travel Planner',
    'Private Tours Ethiopia',
    'Ethiopia Travel Services',
  ],
  ogImage: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782305234/Debre_Libanos_anvjli.jpg',
  ogImageAlt: 'Ethiopian mountain landscape for private trip planning',
})

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ tour?: string }>
}) {
  const { tour } = await searchParams

  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <ContactHero />
      <ContactFormSection selectedTour={tour?.slice(0, 200)} />
      <ContactPlanningSteps />
      <SiteFooter />
    </main>
  )
}
