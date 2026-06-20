import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { SiteFooter } from '@/components/layout/site-footer'
import { BlogHero, BlogPostsSection } from '@/features/blog'
import { createMetadata } from '@/lib/seo/create-metadata'

export const metadata: Metadata = createMetadata({
  title: 'Ethiopia Travel Guide, Tips & Inspiration',
  description:
    'Plan your journey with practical Ethiopia travel guides, destination advice, cultural insights, trekking tips and itinerary ideas.',
  canonicalPath: '/blog',
  primaryKeyword: 'Ethiopia Travel Guide',
  secondaryKeywords: [
    'Ethiopia Travel Tips',
    'Ethiopia Travel Planning',
    'Ethiopia Holiday Planner',
    'Ethiopia Destination Guides',
  ],
  ogImage: '/images/gallery-market.png',
  ogImageAlt: 'Vibrant Ethiopian market for travel inspiration',
})

export default function BlogPage() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <BlogHero />
      <BlogPostsSection />
      <SiteFooter />
    </main>
  )
}
