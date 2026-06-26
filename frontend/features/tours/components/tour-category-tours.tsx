'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock, MapPin } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language'
import { cloudinaryImage, cloudinaryTransforms } from '@/lib/images/cloudinary'
import {
  getLocalizedTourCategory,
  getLocalizedTours,
} from '../lib/tour-localization'
import type { TourCategory } from '../data/tour-categories'
import type { Tour } from '../types/tour'

export function TourCategoryTours({
  category,
  categoryTours,
}: {
  category: TourCategory
  categoryTours: Tour[]
}) {
  const { language, t } = useLanguage()
  const localizedCategory = getLocalizedTourCategory(category, language)
  const localizedTours = getLocalizedTours(categoryTours, language)

  return (
    <section className="py-14 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="font-sans text-xs uppercase tracking-luxe text-gold">
              {t.toursPage.relatedPackages}
            </p>
            <h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-foreground md:text-5xl">
              {t.toursPage.planPrefix} {localizedCategory.name}
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 font-sans text-xs font-bold uppercase tracking-widest text-forest transition-colors hover:text-gold"
          >
            {t.toursPage.requestCustomTour}
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {localizedTours.map((tour) => (
            <Link
              key={tour.slug}
              href={`/tours/${tour.slug}`}
              aria-label={`${t.toursPage.openDedicatedPageFor} ${tour.title}`}
              className="group relative flex min-h-[440px] cursor-pointer touch-manipulation overflow-hidden border border-cream/18 bg-coffee shadow-2xl shadow-black/20 transition-shadow hover:shadow-coffee/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:min-h-[500px] md:min-h-[520px]"
            >
              <Image
                src={cloudinaryImage(tour.image || '/placeholder.svg', cloudinaryTransforms.card)}
                alt={tour.imageAlt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
              <span className="absolute right-5 top-5 inline-flex items-center gap-2 font-sans text-[0.66rem] font-bold uppercase tracking-[0.14em] text-cream drop-shadow sm:right-6 sm:top-6 sm:text-[0.68rem] sm:tracking-[0.16em]">
                <Clock className="size-3.5" />
                {tour.duration}
              </span>
              <div className="relative z-10 mt-auto flex min-h-[54%] flex-col justify-end p-5 text-cream sm:min-h-[48%] sm:p-7 md:p-8">
                <p className="flex items-center gap-2 font-sans text-[0.62rem] font-bold uppercase tracking-[0.2em] text-gold sm:text-[0.64rem] sm:tracking-[0.32em]">
                  <MapPin className="size-3.5" />
                  {tour.destination}
                </p>
                <h2 className="mt-3 max-w-[20rem] font-sans text-base font-bold uppercase leading-snug tracking-[0.1em] text-cream sm:mt-4 sm:tracking-[0.18em] md:text-lg">
                  {tour.title}
                </h2>
                <p className="mt-3 max-w-[22rem] font-sans text-sm font-light leading-relaxed text-cream/80">
                  {tour.description}
                </p>
                <span className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 border border-cream/90 px-5 font-sans text-[0.64rem] font-bold uppercase tracking-[0.14em] text-cream transition-colors group-hover:bg-cream group-hover:text-coffee sm:mt-8 sm:h-14 sm:w-48 sm:text-[0.66rem] sm:tracking-[0.22em]">
                  {t.toursPage.openTourPage}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
