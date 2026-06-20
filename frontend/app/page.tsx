import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { TrustStrip } from '@/components/trust-strip'
import { Experiences } from '@/components/experiences'
import { Destinations } from '@/components/destinations'
import { WhyEthiopia } from '@/components/why-ethiopia'
import { CustomJourneys } from '@/components/custom-journeys'
import { Gallery } from '@/components/gallery'
import { Testimonials } from '@/components/testimonials'
import { BrandStory } from '@/components/brand-story'
import { SiteFooter } from '@/components/site-footer'
import { FloatingContact } from '@/components/floating-contact'

export default function Page() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <TrustStrip />
      <Experiences />
      <Destinations />
      <WhyEthiopia />
      <CustomJourneys />
      <Gallery />
      <Testimonials />
      <BrandStory />
      <SiteFooter />
      <FloatingContact />
    </main>
  )
}
