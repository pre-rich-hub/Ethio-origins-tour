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
  title: 'Contact Us to Plan Your Ethiopia Tour',
  description:
    'Contact Ethio Origins Tour to plan a private, group or customized Ethiopia journey. Share your dates, interests and preferred destinations with our local team.',
  canonicalPath: '/contact',
  primaryKeyword: 'Contact Ethio Origins Tour',
  secondaryKeywords: [
    'Ethiopia Tour Booking',
    'Plan an Ethiopia Tour',
    'Ethiopia Travel Planner',
    'Custom Ethiopia Tour Inquiry',
  ],
  ogImage: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782305234/Debre_Libanos_anvjli.jpg',
  ogImageAlt: 'Ethiopian mountain landscape for private trip planning',
})

export default function ContactPage() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <ContactHero />
      <ContactFormSection />
      <ContactPlanningSteps />
      <SiteFooter />
    </main>
  )
}
