'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { tours } from '@/features/tours/data/tours'
import { getLocalizedTours } from '@/features/tours/lib/tour-localization'
import { useLanguage } from '@/lib/i18n/language'
import { getLocalizedDestination } from '../lib/destination-localization'
import type { Destination } from '../types/destination'

export function RelatedDestinationTours({
  destination,
}: {
  destination: Destination
}) {
  const { language, t } = useLanguage()
  const localizedDestination = getLocalizedDestination(destination, language)
  const relatedTours = tours.filter((tour) => {
    if (destination.relatedTourSlugs.length) {
      return destination.relatedTourSlugs.includes(tour.slug)
    }

    return tour.destinationSlugs.includes(destination.slug)
  }).slice(0, 3)

  const localizedTours = getLocalizedTours(relatedTours, language)

  if (!localizedTours.length) {
    return null
  }

  return (
    <section className="bg-stone py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-sans text-xs uppercase tracking-luxe text-gold">
              {t.destinationsPage.relatedToursEyebrow}
            </p>
            <h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-foreground md:text-5xl">
              {t.destinationsPage.toursFeaturing} {localizedDestination.place}
            </h2>
          </div>
          <Link
            href="/tours"
            className="inline-flex items-center gap-3 font-sans text-xs font-bold uppercase tracking-widest text-forest transition-colors hover:text-gold"
          >
            {t.destinationsPage.viewAllTours}
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {localizedTours.map((tour) => (
            <Link
              key={tour.slug}
              href={`/tours/${tour.slug}`}
              className="group overflow-hidden border border-border bg-card shadow-xl shadow-coffee/5 transition-transform duration-500 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-coffee">
                <Image
                  src={tour.image}
                  alt={tour.imageAlt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="size-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/12 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
                  <p className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.22em] text-gold">
                    {tour.duration}
                  </p>
                  <h3 className="mt-2 font-serif text-3xl font-medium leading-none">
                    {tour.title}
                  </h3>
                </div>
              </div>
              <div className="p-5">
                <p className="font-sans text-sm font-light leading-relaxed text-muted-foreground">
                  {tour.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
