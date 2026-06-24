'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language'
import { getLocalizedDestinations } from '../lib/destination-localization'
import type { Destination } from '../types/destination'

export function RelatedDestinations({
  relatedDestinations,
}: {
  relatedDestinations: Destination[]
}) {
  const { language, t } = useLanguage()
  const localizedDestinations = getLocalizedDestinations(
    relatedDestinations,
    language,
  )

  return (
    <section className="py-14 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="font-sans text-xs uppercase tracking-[0.18em] text-gold sm:tracking-luxe">
              {t.destinationsPage.continueExploring}
            </p>
            <h2 className="mt-4 font-serif text-3xl font-medium leading-tight text-foreground sm:text-4xl md:text-5xl">
              {t.destinationsPage.moreDestinations}
            </h2>
          </div>
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 font-sans text-[0.68rem] uppercase tracking-[0.16em] text-forest transition-colors hover:text-gold sm:text-xs sm:tracking-widest"
          >
            {t.destinationsPage.allDestinations}
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {localizedDestinations.map((item) => (
            <Link
              key={item.slug}
              href={`/destinations/${item.slug}`}
              aria-label={`${t.destinationsPage.openPage} ${item.name}`}
              className="group relative flex min-h-[430px] cursor-pointer touch-manipulation overflow-hidden border border-cream/18 bg-coffee shadow-xl shadow-black/10 transition-shadow hover:shadow-coffee/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:min-h-[480px]"
            >
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/28 to-black/10" />
              <span className="absolute right-5 top-5 font-sans text-[0.66rem] font-bold uppercase tracking-[0.14em] text-cream drop-shadow sm:right-6 sm:top-6 sm:text-[0.68rem] sm:tracking-[0.16em]">
                {item.duration}
              </span>
              <div className="relative z-10 mt-auto flex min-h-[54%] flex-col justify-end p-5 text-cream sm:min-h-[48%] sm:p-7">
                <p className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.2em] text-gold sm:text-[0.64rem] sm:tracking-[0.32em]">
                  {item.place}
                </p>
                <h3 className="mt-3 max-w-[18rem] font-sans text-base font-bold uppercase leading-snug tracking-[0.1em] text-cream sm:mt-4 sm:tracking-[0.18em] md:text-lg">
                  {item.name}
                </h3>
                <p className="mt-3 max-w-[20rem] font-sans text-sm font-light leading-relaxed text-cream/80">
                  {item.description}
                </p>
                <span className="mt-6 inline-flex h-12 w-full items-center justify-center border border-cream/90 px-5 font-sans text-[0.64rem] font-bold uppercase tracking-[0.16em] text-cream transition-colors group-hover:bg-cream group-hover:text-coffee sm:mt-8 sm:h-14 sm:w-40 sm:text-[0.66rem] sm:tracking-[0.22em]">
                  {t.destinationsPage.exploreTrip}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
