'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ArrowRight, Clock, MapPin } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language'
import { destinations } from '../data/destinations'
import { getLocalizedDestinations } from '../lib/destination-localization'
import type { Destination, DestinationCategory } from '../types/destination'

type DestinationFilter = 'all' | DestinationCategory

const destinationFilters: { label: string; value: DestinationFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Historical & Religious', value: 'historical-religious' },
  { label: 'Lakes & Scenic', value: 'lakes-scenic' },
  { label: 'Mountains & Wildlife', value: 'mountains-wildlife' },
  { label: 'Adventure & Geological', value: 'adventure-geological' },
  { label: 'Tribal & Cultural', value: 'tribal-cultural' },
]

export function DestinationsGrid({
  items = destinations,
}: {
  items?: Destination[]
}) {
  const { language, t } = useLanguage()
  const [activeFilter, setActiveFilter] = useState<DestinationFilter>('all')
  const localizedItems = useMemo(
    () => getLocalizedDestinations(items, language),
    [items, language],
  )
  const translatedFilters = destinationFilters.map((filter, index) => ({
    ...filter,
    label: t.destinationsPage.filters[index] ?? filter.label,
  }))

  const filteredDestinations = useMemo(() => {
    if (activeFilter === 'all') {
      return localizedItems
    }

    return localizedItems.filter(
      (destination) => destination.category === activeFilter,
    )
  }, [activeFilter, localizedItems])

  return (
    <section className="py-14 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {translatedFilters.map((filter) => {
            const isActive = filter.value === activeFilter

            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
                aria-pressed={isActive}
                className={`border px-4 py-2 font-sans text-[0.66rem] font-bold uppercase tracking-[0.14em] transition-colors sm:text-xs ${
                  isActive
                    ? 'border-forest bg-forest text-cream'
                    : 'border-border bg-card text-muted-foreground hover:border-gold hover:text-forest'
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
                aria-label={`${t.destinationsPage.openPage} ${destination.name}`}
                className="group relative flex min-h-[440px] cursor-pointer touch-manipulation overflow-hidden border border-cream/18 bg-coffee shadow-2xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-coffee/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:min-h-[500px] md:min-h-[520px]"
              >
                <Image
                  src={destination.image}
                  alt={destination.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/28 to-black/10" />
                <div className="absolute inset-0 bg-coffee/0 transition-colors duration-500 group-hover:bg-coffee/10" />
                <span className="absolute right-5 top-5 inline-flex items-center gap-2 font-sans text-[0.66rem] font-bold uppercase tracking-[0.14em] text-cream drop-shadow sm:right-6 sm:top-6 sm:text-[0.68rem] sm:tracking-[0.16em]">
                  <Clock className="size-3.5" />
                  {destination.duration}
                </span>
                <div className="relative z-10 mt-auto flex min-h-[54%] flex-col justify-end p-5 text-cream sm:min-h-[48%] sm:p-7 md:p-8">
                  <p className="flex items-center gap-2 font-sans text-[0.62rem] font-bold uppercase tracking-[0.2em] text-gold sm:text-[0.64rem] sm:tracking-[0.32em]">
                    <MapPin className="size-3.5" />
                    {destination.place}
                  </p>
                  <h2 className="mt-3 max-w-[18rem] font-sans text-base font-bold uppercase leading-snug tracking-[0.1em] text-cream sm:mt-4 sm:tracking-[0.18em] md:text-lg">
                    {destination.name}
                  </h2>
                  <p className="mt-3 max-w-[20rem] font-sans text-sm font-light leading-relaxed text-cream/80">
                    {destination.description}
                  </p>
                  <span className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 border border-cream/90 px-5 font-sans text-[0.64rem] font-bold uppercase tracking-[0.14em] text-cream transition-colors group-hover:bg-cream group-hover:text-coffee sm:mt-8 sm:h-14 sm:w-48 sm:text-[0.66rem] sm:tracking-[0.22em]">
                    {t.destinationsPage.openPage}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
