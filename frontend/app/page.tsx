import { Navbar } from '@/components/layout/navbar'
import { SiteFooter } from '@/components/layout/site-footer'
import { createMetadata } from '@/lib/seo/create-metadata'
import {
  getFeaturedDestinations,
  getGalleryImages,
  getTestimonials,
} from '@/lib/api/cms'
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
import { tours } from '@/features/tours'

export const metadata = createMetadata({
  title: 'Ethiopia Tour Company for International Travelers',
  description:
    'Explore Ethiopia with trusted destination experts. Discover cultural, historical, adventure, trekking and customized tour packages with Ethio Origins Tour.',
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

export default async function Page() {
  const [featuredDestinations, galleryImages, testimonials] = await Promise.all([
    getFeaturedDestinations(),
    getGalleryImages(),
    getTestimonials(),
  ])
  const featuredTours = tours.slice(0, 6).map((tour) => ({
    title: tour.title,
    slug: tour.slug,
    image: tour.image,
    duration: tour.duration,
    highlights: tour.highlights,
    description: tour.description,
  }))

  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <TrustStrip />
      <Experiences items={featuredTours} />
      <FeaturedDestinations items={featuredDestinations} />
      <WhyEthiopia />
      <CustomJourneys />
      <HomeGallery items={galleryImages.slice(0, 6)} />
      <HomeTestimonials items={testimonials} />
      <BrandStory />
      <SiteFooter />
    </main>
  )
}
