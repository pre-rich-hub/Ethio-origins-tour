import { FloatingContact } from '@/components/layout/floating-contact'
import { Navbar } from '@/components/layout/navbar'
import { SiteFooter } from '@/components/layout/site-footer'
import { createMetadata } from '@/lib/seo/create-metadata'
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

export const metadata = createMetadata({
  title: 'Ethiopia Tour Company & Local Travel Experts',
  description:
    'Explore Ethiopia with experienced local guides. Discover cultural, historical, adventure, trekking and customized tour packages with Ethio Origins Tour.',
  canonicalPath: '/',
  primaryKeyword: 'Ethiopia Tour Company',
  secondaryKeywords: [
    'Ethiopia Travel Agency',
    'Best Tour Operator in Ethiopia',
    'Trusted Ethiopian Tour Operator',
    'Ethiopia Travel Experts',
    'Ethiopia Travel Services',
    'Ethiopia Tourism Company',
  ],
  ogImage: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782244137/Ancient_Wonders_The_Monolithic_Rock-Cut_Church_of_Lalibela_Ethiopia_gh7iwx.jpg',
  ogImageAlt: 'Ethiopian landscape with mountain light',
})

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
