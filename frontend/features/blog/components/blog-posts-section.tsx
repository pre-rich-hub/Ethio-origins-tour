'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CalendarDays } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language'
import { cloudinaryImage, cloudinaryTransforms } from '@/lib/images/cloudinary'
import { posts, type BlogPost } from '../data/posts'

export function BlogPostsSection({ items = posts }: { items?: BlogPost[] }) {
  const { t } = useLanguage()

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {!items.length ? (
          <div className="mx-auto max-w-3xl border border-border bg-card p-8 text-center shadow-xl shadow-coffee/5 md:p-12">
            <p className="font-sans text-xs uppercase tracking-luxe text-gold">
              Ethiopia Travel Guide
            </p>
            <h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-foreground">
              Field notes are being prepared for publication
            </h2>
            <p className="mt-5 font-sans text-base font-light leading-relaxed text-muted-foreground">
              The journal will publish complete Ethiopia travel guides only after
              full article content is ready. Explore current tour packages or
              contact the team for route planning support.
            </p>
            <Link
              href="/tours"
              className="mt-7 inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest text-forest transition-colors hover:text-gold"
            >
              View Ethiopia tour packages
              <ArrowRight className="size-4" />
            </Link>
          </div>
        ) : null}
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((post) => {
            const isCompletePost =
              post.status === 'published' &&
              post.contentStatus === 'complete' &&
              Boolean(post.body?.length)
            const localizedPost =
              t.blogPage.posts[post.title as keyof typeof t.blogPage.posts]
            const category =
              localizedPost?.category ??
              (post.category === 'Travel Insight'
                ? t.blogPage.fallbackCategory
                : post.category)
            const date =
              localizedPost?.date ??
              (post.date === 'Travel Guide'
                ? t.blogPage.fallbackDate
                : post.date)
            const excerpt =
              localizedPost?.excerpt ??
              (post.excerpt === 'Read the latest Ethio Origins travel insight.'
                ? t.blogPage.fallbackExcerpt
                : post.excerpt)

            return (
              <article
                key={post.title}
                className="overflow-hidden border border-border bg-card shadow-xl shadow-coffee/5"
              >
                <div className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-coffee">
                    <Image
                      src={cloudinaryImage(post.image, cloudinaryTransforms.card)}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="size-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-transparent to-transparent" />
                    <p className="absolute bottom-5 left-5 font-sans text-[0.62rem] font-bold uppercase tracking-[0.24em] text-gold">
                      {category}
                    </p>
                  </div>
                  <div className="p-6">
                    <p className="flex items-center gap-2 font-sans text-[0.68rem] uppercase tracking-widest text-muted-foreground">
                      <CalendarDays className="size-3.5 text-gold" />
                      {date}
                    </p>
                    <h3 className="mt-4 font-serif text-3xl font-medium leading-none text-foreground transition-colors group-hover:text-gold">
                      {isCompletePost ? (
                        <Link href={`/blog/${post.slug}`}>
                          {localizedPost?.title ?? post.title}
                        </Link>
                      ) : (
                        localizedPost?.title ?? post.title
                      )}
                    </h3>
                    <p className="mt-4 font-sans text-sm font-light leading-relaxed text-muted-foreground">
                      {excerpt}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest text-forest transition-colors hover:text-gold"
                  >
                    {t.blogPage.cta}
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
