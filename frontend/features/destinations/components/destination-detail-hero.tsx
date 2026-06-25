import Image from 'next/image'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  Compass,
  MapPin,
} from 'lucide-react'
import type { Destination } from '../types/destination'

export function DestinationDetailHero({
  destination,
}: {
  destination: Destination
}) {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-coffee pt-28 text-cream">
      <Image
        src={destination.image}
        alt={destination.imageAlt}
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 z-0 size-full scale-105 object-cover"
      />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(12,17,14,0.96)_0%,rgba(29,25,20,0.76)_48%,rgba(12,17,14,0.3)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 z-0 h-1/2 bg-gradient-to-t from-background via-background/45 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-7rem)] max-w-7xl flex-col justify-end px-4 pb-10 sm:px-6 md:px-8 md:pb-16">
        <a
          href="/destinations"
          className="mb-auto inline-flex w-fit items-center gap-2 font-sans text-[0.68rem] uppercase tracking-[0.16em] text-cream/75 transition-colors hover:text-gold sm:text-xs sm:tracking-widest"
        >
          <ArrowLeft className="size-4" />
          Back to Destinations
        </a>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end">
          <div className="max-w-5xl">
            <p className="inline-flex items-center gap-3 border border-cream/18 bg-black/20 px-4 py-2 font-sans text-[0.68rem] uppercase tracking-[0.16em] text-gold backdrop-blur-md sm:text-xs sm:tracking-luxe md:text-sm">
              <MapPin className="size-4" />
              {destination.categoryLabel} · {destination.region}
            </p>
            <h1 className="mt-6 max-w-5xl text-balance font-serif text-5xl font-medium leading-[0.92] text-cream sm:text-7xl md:text-8xl lg:text-9xl">
              {destination.name}
            </h1>
            <p className="mt-7 max-w-2xl text-pretty font-sans text-base font-light leading-relaxed text-cream/86 md:text-lg">
              {destination.intro}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-sm bg-gold px-7 font-sans text-xs uppercase tracking-widest text-coffee transition-transform hover:-translate-y-0.5 md:text-sm"
              >
                Plan This Trip
                <ArrowRight className="size-4" />
              </a>
              <a
                href="#sample-flow"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-sm border border-cream/45 px-7 font-sans text-xs uppercase tracking-widest text-cream transition-colors hover:bg-cream/10 md:text-sm"
              >
                View Sample Flow
              </a>
            </div>
          </div>

          <aside className="border border-cream/18 bg-black/28 p-5 shadow-2xl shadow-black/25 backdrop-blur-xl md:p-7">
            <p className="font-sans text-xs uppercase tracking-[0.22em] text-gold">
              Journey Snapshot
            </p>
            <div className="mt-6 grid gap-px overflow-hidden border border-cream/12 bg-cream/12">
              <div className="flex items-start gap-3 bg-black/18 p-4">
                <Clock className="mt-1 size-5 text-gold" />
                <div>
                  <p className="font-sans text-[0.65rem] uppercase tracking-widest text-cream/55">
                    Planning
                  </p>
                  <p className="mt-1 font-serif text-2xl font-medium leading-none text-cream">
                    {destination.duration}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-black/18 p-4">
                <Compass className="mt-1 size-5 text-gold" />
                <div>
                  <p className="font-sans text-[0.65rem] uppercase tracking-widest text-cream/55">
                    Region
                  </p>
                  <p className="mt-1 font-sans text-sm font-light leading-relaxed text-cream/85">
                    {destination.region}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-black/18 p-4">
                <CalendarDays className="mt-1 size-5 text-gold" />
                <div>
                  <p className="font-sans text-[0.65rem] uppercase tracking-widest text-cream/55">
                    Travel Style
                  </p>
                  <p className="mt-1 font-sans text-sm font-light leading-relaxed text-cream/85">
                    Private, flexible, locally guided, and tailored around
                    your pace.
                  </p>
                </div>
              </div>
            </div>
            <a
              href="/contact"
              className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-sm border border-gold/70 px-5 font-sans text-xs uppercase tracking-widest text-gold transition-colors hover:bg-gold hover:text-coffee"
            >
              Request Proposal
            </a>
          </aside>
        </div>
      </div>
    </section>
  )
}
