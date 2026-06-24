'use client'

import { useLanguage } from '@/lib/i18n/language'
import {
  getLocalizedTopAdventureExperiences,
  getLocalizedTopFestivals,
} from '../lib/destination-extras-localization'

export function DestinationExtrasSection() {
  const { language, t } = useLanguage()
  const topFestivals = getLocalizedTopFestivals(language)
  const topAdventureExperiences =
    getLocalizedTopAdventureExperiences(language)

  return (
    <section className="bg-stone py-14 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="max-w-3xl">
          <p className="font-sans text-xs uppercase tracking-luxe text-gold">
            {t.destinationsPage.extrasEyebrow}
          </p>
          <h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-foreground md:text-5xl">
            {t.destinationsPage.extrasTitle}
          </h2>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <article className="border border-border bg-card p-6 md:p-8">
            <p className="font-sans text-xs uppercase tracking-luxe text-gold">
              {t.destinationsPage.topFestivals}
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {topFestivals.map((festival, index) => (
                <p
                  key={festival.slug}
                  className="border border-border bg-background p-4 font-sans text-sm uppercase tracking-wider text-foreground"
                >
                  {index + 1}. {festival.name}
                </p>
              ))}
            </div>
          </article>

          <article className="border border-border bg-card p-6 md:p-8">
            <p className="font-sans text-xs uppercase tracking-luxe text-gold">
              {t.destinationsPage.topAdventure}
            </p>
            <div className="mt-5 grid gap-3">
              {topAdventureExperiences.map((experience, index) => (
                <p
                  key={experience.slug}
                  className="border border-border bg-background p-4 font-sans text-sm uppercase tracking-wider text-foreground"
                >
                  {index + 1}. {experience.name}
                </p>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
