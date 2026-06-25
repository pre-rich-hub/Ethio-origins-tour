'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { destinations } from '../data/destinations'
import type { DestinationCategory } from '../types/destination'

type DestinationFilter = 'all' | DestinationCategory

const destinationFilters: { label: string; value: DestinationFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Historical & Religious', value: 'historical-religious' },
  { label: 'Lakes & Scenic', value: 'lakes-scenic' },
  { label: 'Mountains & Wildlife', value: 'mountains-wildlife' },
  { label: 'Adventure & Geological', value: 'adventure-geological' },
  { label: 'Tribal & Cultural', value: 'tribal-cultural' },
]

export function DestinationsGrid() {
  const [activeFilter, setActiveFilter] = useState<DestinationFilter>('all')

  const filteredDestinations = useMemo(() => {
    if (activeFilter === 'all') {
      return destinations
    }

    return destinations.filter((destination) => destination.category === activeFilter)
  }, [activeFilter])

  return (
    <section className="py-14 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="font-sans text-xs uppercase tracking-luxe text-gold">
            Destination Finder
          </p>
          <h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-foreground md:text-5xl">
            Explore the client destination list
          </h2>
          <p className="mt-5 font-sans text-base font-light leading-relaxed text-muted-foreground">
            Filter Ethiopia destinations by travel style, then open any card
            for its dedicated planning page.
          </p>
        </div>

        <div className="mb-9 flex flex-wrap gap-2">
          {destinationFilters.map((filter) => {
            const isActive = filter.value === activeFilter

            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
                aria-pressed={isActive}
                className={`inline-flex h-11 items-center justify-center border px-4 font-sans text-[0.66rem] font-bold uppercase tracking-[0.14em] transition-colors sm:text-xs ${
                  isActive
                    ? 'border-forest bg-forest text-cream'
                    : 'border-border bg-card text-forest hover:border-gold hover:text-gold'
                }`}
              >
                {filter.label}
              </button>
            )
          })}
        </div>

        {filteredDestinations.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredDestinations.map((destination) => (
              <Link
                key={destination.slug}
                href={`/destinations/${destination.slug}`}
                aria-label={`Open dedicated page for ${destination.name}`}
                className="group relative flex min-h-[440px] cursor-pointer touch-manipulation overflow-hidden border border-cream/18 bg-coffee shadow-2xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-coffee/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:min-h-[500px] md:min-h-[520px]"
              >
                <Image
                  src={destination.image}
                  alt={destination.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/28 to-black/10" />
                <div className="absolute inset-0 bg-coffee/0 transition-colors duration-500 group-hover:bg-coffee/10" />
                <span className="absolute right-5 top-5 max-w-[75%] text-right font-sans text-[0.62rem] font-bold uppercase tracking-[0.14em] text-cream drop-shadow sm:right-6 sm:top-6">
                  {destination.categoryLabel}
                </span>
                <div className="relative z-10 mt-auto flex min-h-[54%] flex-col justify-end p-5 text-cream sm:min-h-[48%] sm:p-7 md:p-8">
                  <p className="flex items-center gap-2 font-sans text-[0.62rem] font-bold uppercase tracking-[0.2em] text-gold sm:text-[0.64rem] sm:tracking-[0.32em]">
                    <MapPin className="size-3.5" />
                    {destination.region}
                  </p>
                  <h2 className="mt-3 max-w-[18rem] font-sans text-base font-bold uppercase leading-snug tracking-[0.1em] text-cream sm:mt-4 sm:tracking-[0.18em] md:text-lg">
                    {destination.name}
                  </h2>
                  <p className="mt-3 max-w-[20rem] font-sans text-sm font-light leading-relaxed text-cream/80">
                    {destination.shortDescription}
                  </p>
                  <span className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 border border-cream/90 px-5 font-sans text-[0.64rem] font-bold uppercase tracking-[0.14em] text-cream transition-colors group-hover:bg-cream group-hover:text-coffee sm:mt-8 sm:h-14 sm:w-48 sm:text-[0.66rem] sm:tracking-[0.22em]">
                    Open destination page
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="border border-border bg-card p-8 text-center">
            <p className="font-serif text-2xl font-medium text-foreground">
              No destinations found for this filter.
            </p>
            <p className="mt-3 font-sans text-sm font-light text-muted-foreground">
              Try another destination category or return to All destinations.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
