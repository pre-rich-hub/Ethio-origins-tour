'use client'

import Image from 'next/image'
import { Sparkles } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language'
import { getLocalizedDestination } from '../lib/destination-localization'
import type { Destination } from '../types/destination'

export function DestinationPersonalization({
  destination,
}: {
  destination: Destination
}) {
  const { language, t } = useLanguage()
  const localizedDestination = getLocalizedDestination(destination, language)

  return (
    <section className="relative isolate overflow-hidden bg-coffee py-16 text-cream md:py-28">
      <Image
        src={localizedDestination.image}
        alt=""
        fill
        sizes="100vw"
        className="absolute inset-0 z-0 size-full object-cover"
      />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(12,17,14,0.94),rgba(31,24,18,0.84),rgba(12,17,14,0.62))]" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <Sparkles className="size-9 text-gold" />
          <p className="mt-6 font-sans text-xs uppercase tracking-[0.2em] text-gold sm:tracking-luxe">
            {t.destinationsPage.designedEyebrow}
          </p>
          <h2 className="mt-4 font-serif text-4xl font-medium leading-tight md:text-5xl">
            {t.destinationsPage.designedTitle}
          </h2>
        </div>
        <div className="grid gap-px border border-cream/16 bg-cream/16 md:grid-cols-3">
          {t.destinationsPage.personalizationItems.map(
            (item) => (
              <div key={item} className="bg-black/24 p-6 backdrop-blur-sm">
                <p className="font-serif text-2xl font-medium">{item}</p>
                <p className="mt-3 font-sans text-sm font-light leading-relaxed text-cream/70">
                  {t.destinationsPage.personalizationText}
                </p>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  )
}
