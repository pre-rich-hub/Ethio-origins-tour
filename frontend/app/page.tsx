import { FloatingContact } from '@/components/layout/floating-contact'
import { Navbar } from '@/components/layout/navbar'
import { SiteFooter } from '@/components/layout/site-footer'
import {
  BrandStory,
  CustomJourneys,
  Experiences,
  FeaturedDestinations,
  Hero,
  HomeGallery,
  HomeTestimonials,
  TrustStrip,
  WhyEthiopia,
} from '@/features/home'

export default function Page() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <TrustStrip />
      <Experiences />
      <FeaturedDestinations />
      <WhyEthiopia />
      <CustomJourneys />
      <HomeGallery />
      <HomeTestimonials />
      <BrandStory />
      <SiteFooter />
      <FloatingContact />
    </main>
  )
}
