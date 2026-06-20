import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { SiteFooter } from '@/components/layout/site-footer'
import { BlogHero, BlogPostsSection } from '@/features/blog'

export const metadata: Metadata = {
  title: 'Blog | Ethio Origins Tours',
  description:
    'Travel insights, destination notes, and private journey inspiration from Ethio Origins Tours.',
}

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
