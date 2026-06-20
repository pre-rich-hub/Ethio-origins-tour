import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { SiteFooter } from '@/components/layout/site-footer'
import {
  ContactFormSection,
  ContactHero,
  ContactPlanningSteps,
} from '@/features/contact'

export const metadata: Metadata = {
  title: 'Contact Us | Ethio Origins Tours',
  description:
    'Plan a private Ethiopian journey with Ethio Origins Tours. Contact our travel designers for bespoke cultural, nature, and heritage itineraries.',
}

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
