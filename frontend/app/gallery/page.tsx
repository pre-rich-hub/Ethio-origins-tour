import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { SiteFooter } from '@/components/layout/site-footer'
import {
  GalleryCollection,
  GalleryCta,
  GalleryHero,
  GalleryStoryStrip,
} from '@/features/gallery'
import { createMetadata } from '@/lib/seo/create-metadata'

export const metadata: Metadata = createMetadata({
  title: 'Ethiopia Travel Gallery',
  description:
    "Explore photographs of Ethiopia's landscapes, historical sites, cultural experiences, wildlife and destinations featured in our guided tours.",
  canonicalPath: '/gallery',
  primaryKeyword: 'Ethiopia Travel Gallery',
  secondaryKeywords: [
    'Ethiopia Tour Photos',
    'Ethiopia Destination Photography',
    'Explore Ethiopia Photos',
  ],
  ogImage: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782247186/Bet_Giyorgis_Rock-Hewn_Church_at_Lalibela___qffnvp.jpg',
  ogImageAlt: 'Rock-hewn church of Lalibela in warm light',
})

export default function GalleryPage() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <GalleryHero />
      <GalleryStoryStrip />
      <GalleryCollection />
      <GalleryCta />
      <SiteFooter />
    </main>
  )
}
