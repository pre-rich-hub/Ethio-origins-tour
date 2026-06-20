import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CalendarDays } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'

const posts = [
  {
    title: 'How to Experience Ethiopia Beyond the Highlights',
    category: 'Travel Insight',
    date: 'June 2026',
    image: '/images/exp-northern.png',
    excerpt:
      'A thoughtful guide to pairing iconic landmarks with slower, more personal cultural encounters.',
  },
  {
    title: 'The Art of Planning a Private Ethiopian Journey',
    category: 'Private Travel',
    date: 'June 2026',
    image: '/images/gallery-coffee.png',
    excerpt:
      'What makes a tailor-made itinerary feel seamless, meaningful, and deeply connected to place.',
  },
  {
    title: 'Landscapes That Shape the Ethiopian Story',
    category: 'Nature & Culture',
    date: 'June 2026',
    image: '/images/exp-simien.png',
    excerpt:
      'From highland escarpments to volcanic terrain, Ethiopia rewards travelers who look closely.',
  },
]

export const metadata: Metadata = {
  title: 'Blog | Ethio Origins Tours',
  description:
    'Travel insights, destination notes, and private journey inspiration from Ethio Origins Tours.',
}

export default function BlogPage() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />

      <section className="relative isolate overflow-hidden bg-forest pt-28 text-cream md:pt-36">
        <img
          src="/images/gallery-market.png"
          alt="Vibrant Ethiopian highland market"
          className="absolute inset-0 z-0 size-full object-cover"
        />
        <div className="absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(24,55,43,0.96),rgba(24,55,43,0.78)_48%,rgba(0,0,0,0.35))]" />
        <div className="absolute inset-x-0 bottom-0 z-0 h-40 bg-gradient-to-t from-background to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 md:px-8 md:pb-24">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-cream/75 transition-colors hover:text-gold"
          >
            <ArrowLeft className="size-4" />
            Back Home
          </Link>

          <div className="mt-16 max-w-4xl">
            <p className="font-sans text-xs uppercase tracking-luxe text-gold md:text-sm">
              Ethio Origins Journal
            </p>
            <h1 className="mt-5 text-balance font-serif text-5xl font-medium leading-[0.95] text-cream sm:text-6xl md:text-7xl">
              Stories, Notes, and Travel Inspiration
            </h1>
            <p className="mt-7 max-w-2xl font-sans text-base font-light leading-relaxed text-cream/82 md:text-lg">
              Refined guides and field notes for travelers planning meaningful
              journeys across Ethiopia.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.title}
                className="group overflow-hidden border border-border bg-card shadow-xl shadow-coffee/5"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-coffee">
                  <img
                    src={post.image}
                    alt=""
                    className="size-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-transparent to-transparent" />
                  <p className="absolute bottom-5 left-5 font-sans text-[0.62rem] font-bold uppercase tracking-[0.24em] text-gold">
                    {post.category}
                  </p>
                </div>
                <div className="p-6">
                  <p className="flex items-center gap-2 font-sans text-[0.68rem] uppercase tracking-widest text-muted-foreground">
                    <CalendarDays className="size-3.5 text-gold" />
                    {post.date}
                  </p>
                  <h2 className="mt-4 font-serif text-3xl font-medium leading-none text-foreground">
                    {post.title}
                  </h2>
                  <p className="mt-4 font-sans text-sm font-light leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <Link
                    href="/contact"
                    className="mt-6 inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest text-forest transition-colors hover:text-gold"
                  >
                    Plan with this insight
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
