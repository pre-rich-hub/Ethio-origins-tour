import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { SiteFooter } from '@/components/layout/site-footer'
import {
  GalleryCollection,
  GalleryCta,
  GalleryHero,
  GalleryStoryStrip,
} from '@/features/gallery'
import { getGalleryImages } from '@/lib/api/cms'
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
  ogImage: '/images/exp-northern.png',
  ogImageAlt: 'Rock-hewn church of Lalibela in warm light',
})

export default async function GalleryPage() {
  const images = await getGalleryImages()

  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <GalleryHero />
      <GalleryStoryStrip />
      <GalleryCollection items={images} />
      <GalleryCta />
      <SiteFooter />
    </main>
  )
}
