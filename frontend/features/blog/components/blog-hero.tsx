import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export function BlogHero() {
  return (
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
  )
}
