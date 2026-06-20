import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { SiteFooter } from '@/components/layout/site-footer'
import {
  GalleryCollection,
  GalleryCta,
  GalleryHero,
  GalleryStoryStrip,
} from '@/features/gallery'

export const metadata: Metadata = {
  title: 'Gallery | Ethio Origins Tours',
  description:
    'A visual diary of Ethiopian landscapes, traditions, wildlife, architecture, and human connections.',
}

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
