import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

export function DestinationsHero() {
  return (
    <section className="relative isolate overflow-hidden bg-coffee pt-28 text-cream md:pt-40">
      <Image
        src="/images/hero.png"
        alt="Ethiopian landscape"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 z-0 size-full object-cover"
      />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(18,27,21,0.9)_0%,rgba(47,36,26,0.72)_48%,rgba(18,27,21,0.45)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 z-0 h-28 bg-gradient-to-t from-background to-transparent" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 sm:px-6 md:px-8 md:pb-28">
        <a
          href="/"
          className="inline-flex items-center gap-2 font-sans text-[0.68rem] uppercase tracking-[0.16em] text-cream/75 transition-colors hover:text-gold sm:text-xs sm:tracking-widest"
        >
          <ArrowLeft className="size-4" />
          Back Home
        </a>
        <div className="mt-10 max-w-4xl md:mt-14">
          <p className="font-sans text-xs uppercase tracking-[0.18em] text-gold sm:tracking-luxe md:text-sm">
            Dedicated Destinations
          </p>
          <h1 className="mt-5 text-balance font-serif text-4xl font-medium leading-[1.02] sm:text-6xl md:text-7xl">
            Explore Ethiopia&apos;s Top Travel Destinations
          </h1>
          <p className="mt-7 max-w-2xl text-pretty font-sans text-base font-light leading-relaxed text-cream/82 md:text-lg">
            Every destination below opens its own dedicated page with a
            premium overview, highlights, sample flow, and private planning
            options.
          </p>
        </div>
      </div>
    </section>
  )
}
