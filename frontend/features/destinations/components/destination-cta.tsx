'use client'

import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language'
import { getLocalizedDestination } from '../lib/destination-localization'
import type { Destination } from '../types/destination'

export function DestinationCta({ destination }: { destination: Destination }) {
  const { language, t } = useLanguage()
  const localizedDestination = getLocalizedDestination(destination, language)

  return (
    <section className="relative isolate overflow-hidden py-16 md:py-28">
      <img
        src="/images/cta.png"
        alt=""
        className="absolute inset-0 z-0 size-full object-cover"
      />
      <div className="absolute inset-0 z-0 bg-black/70" />
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 md:px-8">
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold sm:tracking-luxe">
          {t.destinationsPage.ctaEyebrow}
        </p>
        <h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-cream md:text-6xl">
          {t.destinationsPage.ctaTitlePrefix} {localizedDestination.place}.
        </h2>
        <p className="mx-auto mt-5 max-w-xl font-sans text-base font-light leading-relaxed text-cream/75">
          {t.destinationsPage.ctaDescription}
        </p>
        <a
          href="/contact"
          className="mt-9 inline-flex h-14 items-center justify-center gap-2 rounded-sm bg-gold px-8 font-sans text-sm uppercase tracking-widest text-coffee transition-transform hover:-translate-y-0.5"
        >
          {t.destinationsPage.ctaButton}
          <ArrowRight className="size-4" />
        </a>
      </div>
    </section>
  )
}
