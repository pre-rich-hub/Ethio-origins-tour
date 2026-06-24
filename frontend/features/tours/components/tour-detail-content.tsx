'use client'

import { AlertCircle, Check, MapPin, Plane } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language'
import { getLocalizedTour } from '../lib/tour-localization'
import type { Tour } from '../types/tour'

export function TourDetailContent({ tour }: { tour: Tour }) {
  const { language, t } = useLanguage()
  const localizedTour = getLocalizedTour(tour, language)
  const arrivalInfo =
    'arrivalInfo' in localizedTour && Array.isArray(localizedTour.arrivalInfo)
      ? localizedTour.arrivalInfo
      : []
  const importantNote =
    'importantNote' in localizedTour &&
    typeof localizedTour.importantNote === 'string'
      ? localizedTour.importantNote
      : undefined

  return (
    <section className="pb-20 pt-16 md:pb-28 md:pt-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 md:px-8 lg:grid-cols-[minmax(0,1fr)_376px]">
        <div className="border border-border bg-card">
          <div className="flex flex-wrap border-b border-border px-6 font-sans text-xs uppercase tracking-luxe text-muted-foreground">
            <a
              href="#overview"
              className="border-b-2 border-forest px-3 py-5 text-forest"
            >
              {t.toursPage.overview}
            </a>
            <a href="#itinerary" className="px-3 py-5 hover:text-forest">
              {t.toursPage.itinerary}
            </a>
            <a href="#practical-info" className="px-3 py-5 hover:text-forest">
              {t.toursPage.practicalInfo}
            </a>
          </div>

          <div className="space-y-16 p-6 md:p-10">
            <section id="overview">
              <p className="font-sans text-xs uppercase tracking-luxe text-gold">
                {localizedTour.duration} {t.toursPage.privateJourney}
              </p>
              <h2 className="mt-4 text-balance font-serif text-4xl font-medium leading-tight text-foreground md:text-6xl">
                {localizedTour.title}
              </h2>
              <p className="mt-6 max-w-3xl font-sans text-base font-light leading-relaxed text-muted-foreground md:text-lg">
                {localizedTour.intro}
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {localizedTour.moments.map((moment) => (
                  <div key={moment} className="flex gap-3 bg-stone/70 p-5">
                    <Check className="mt-1 size-5 shrink-0 text-gold" />
                    <p className="font-sans text-sm font-light leading-relaxed text-foreground">
                      {moment}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {arrivalInfo.length > 0 ? (
              <section id="arrival">
                <p className="font-sans text-xs uppercase tracking-luxe text-gold">
                  {t.toursPage.arrival}
                </p>
                <h2 className="mt-4 font-serif text-4xl font-medium text-foreground">
                  {t.toursPage.beforeDayOne}
                </h2>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {arrivalInfo.map((item) => (
                    <div key={item} className="flex gap-3 border border-border p-5">
                      <Plane className="mt-1 size-5 shrink-0 text-gold" />
                      <p className="font-sans text-sm font-light leading-relaxed text-muted-foreground">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {importantNote ? (
              <section aria-label="Important tour note">
                <div className="border border-gold/50 bg-gold/10 p-5 md:p-6">
                  <div className="flex gap-3">
                    <AlertCircle className="mt-1 size-5 shrink-0 text-gold" />
                    <div>
                      <p className="font-sans text-xs uppercase tracking-luxe text-gold">
                        {t.toursPage.importantNote}
                      </p>
                      <p className="mt-3 font-sans text-sm font-light leading-relaxed text-muted-foreground">
                        {importantNote}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            ) : null}

            <section id="itinerary">
              <p className="font-sans text-xs uppercase tracking-luxe text-gold">
                {t.toursPage.itinerary}
              </p>
              <h2 className="mt-4 font-serif text-4xl font-medium text-foreground">
                {t.toursPage.sampleRouteTitle}
              </h2>
              <div className="mt-8 space-y-5">
                {localizedTour.itinerary.map((item, index) => (
                  <article
                    key={`${item.day}-${item.title}`}
                    className="grid gap-4 border-l border-gold/70 pl-5 md:grid-cols-[96px_1fr]"
                  >
                    <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground">
                      {t.toursPage.day} {item.day ?? index + 1}
                    </p>
                    <div>
                      <p className="font-serif text-2xl font-medium leading-snug text-foreground">
                        {item.title}
                      </p>
                      <p className="mt-3 font-sans text-sm font-light leading-relaxed text-muted-foreground">
                        {item.activities}
                      </p>
                      <p className="mt-3 font-sans text-xs uppercase tracking-widest text-gold">
                        {t.toursPage.overnight}: {item.overnight}
                      </p>
                      {'meals' in item && item.meals ? (
                        <p className="mt-2 font-sans text-xs uppercase tracking-widest text-gold">
                          {t.toursPage.meals}: {item.meals}
                        </p>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section id="practical-info">
              <p className="font-sans text-xs uppercase tracking-luxe text-gold">
                {t.toursPage.practicalInfo}
              </p>
              <h2 className="mt-4 font-serif text-4xl font-medium text-foreground">
                {t.toursPage.includedTitle}
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {localizedTour.included.map((item) => (
                  <div key={item} className="border border-border p-5">
                    <p className="font-sans text-sm font-light leading-relaxed text-muted-foreground">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className="border border-border bg-background p-7">
            <MapPin className="size-8 text-gold" />
            <p className="mt-6 font-serif text-3xl font-medium leading-tight text-foreground">
              {t.toursPage.asideTitle}
            </p>
            <p className="mt-4 font-sans text-sm font-light leading-relaxed text-muted-foreground">
              {localizedTour.description} {t.toursPage.asideDescription}
            </p>
            <a
              href="/contact"
              className="mt-7 inline-flex h-12 w-full items-center justify-center bg-forest px-5 font-sans text-xs uppercase tracking-widest text-cream transition-colors hover:bg-coffee"
            >
              {t.toursPage.requestProposal}
            </a>
          </div>
        </aside>
      </div>
    </section>
  )
}
