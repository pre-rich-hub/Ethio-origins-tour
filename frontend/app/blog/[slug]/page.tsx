import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CalendarDays } from 'lucide-react'
import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { SiteFooter } from '@/components/layout/site-footer'
import { getBlogPostBySlug } from '@/lib/api/cms'
import { createMetadata } from '@/lib/seo/create-metadata'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return createMetadata({
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
      canonicalPath: `/blog/${slug}`,
      primaryKeyword: 'Ethiopia Travel',
      noIndex: true,
    })
  }

  return createMetadata({
    title: `${post.title} — Ethio Origins Tour Blog`,
    description: post.excerpt,
    canonicalPath: `/blog/${slug}`,
    primaryKeyword: 'Ethiopia Travel Guide',
    ogImage: post.image,
    type: 'article',
  })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="bg-background text-foreground">
      <Navbar />

      <section className="relative isolate overflow-hidden bg-forest pt-28 text-cream md:pt-36">
        <img
          src={post.image}
          alt=""
          className="absolute inset-0 z-0 size-full object-cover"
        />
        <div className="absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(24,55,43,0.96),rgba(24,55,43,0.78)_48%,rgba(0,0,0,0.35))]" />
        <div className="absolute inset-x-0 bottom-0 z-0 h-40 bg-gradient-to-t from-background to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 md:px-8 md:pb-28">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-cream/75 transition-colors hover:text-gold"
          >
            <ArrowLeft className="size-4" />
            Back to Blog
          </Link>

          <div className="mt-16 max-w-4xl">
            {post.category && (
              <p className="font-sans text-xs uppercase tracking-luxe text-gold md:text-sm">
                {post.category}
              </p>
            )}
            <h1 className="mt-5 text-balance font-serif text-4xl font-medium leading-[0.95] text-cream sm:text-5xl md:text-6xl">
              {post.title}
            </h1>
            {post.date && (
              <p className="mt-5 flex items-center gap-2 font-sans text-sm uppercase tracking-widest text-cream/75">
                <CalendarDays className="size-4 text-gold" />
                {post.date}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:font-sans prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-forest prose-a:no-underline hover:prose-a:underline">
            {post.description ? (
              post.description.split('\n').map((paragraph: string, i: number) => (
                <p key={i}>{paragraph}</p>
              ))
            ) : (
              <p className="text-muted-foreground">Content coming soon.</p>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
