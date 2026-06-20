import { Check, MapPin } from 'lucide-react'
import type { Tour } from '../types/tour'

export function TourDetailContent({ tour }: { tour: Tour }) {
  return (
    <section className="pb-20 pt-16 md:pb-28 md:pt-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 md:px-8 lg:grid-cols-[minmax(0,1fr)_376px]">
        <div className="border border-border bg-card">
          <div className="flex flex-wrap border-b border-border px-6 font-sans text-xs uppercase tracking-luxe text-muted-foreground">
            <a
              href="#overview"
              className="border-b-2 border-forest px-3 py-5 text-forest"
            >
              Overview
            </a>
            <a href="#itinerary" className="px-3 py-5 hover:text-forest">
              Itinerary
            </a>
            <a href="#practical-info" className="px-3 py-5 hover:text-forest">
              Practical Info
            </a>
          </div>

          <div className="space-y-16 p-6 md:p-10">
            <section id="overview">
              <p className="font-sans text-xs uppercase tracking-luxe text-gold">
                {tour.duration} Private Journey
              </p>
              <h1 className="mt-4 text-balance font-serif text-4xl font-medium leading-tight text-foreground md:text-6xl">
                {tour.title}
              </h1>
              <p className="mt-6 max-w-3xl font-sans text-base font-light leading-relaxed text-muted-foreground md:text-lg">
                {tour.intro}
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {tour.moments.map((moment) => (
                  <div key={moment} className="flex gap-3 bg-stone/70 p-5">
                    <Check className="mt-1 size-5 shrink-0 text-gold" />
                    <p className="font-sans text-sm font-light leading-relaxed text-foreground">
                      {moment}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section id="itinerary">
              <p className="font-sans text-xs uppercase tracking-luxe text-gold">
                Itinerary
              </p>
              <h2 className="mt-4 font-serif text-4xl font-medium text-foreground">
                A polished sample route
              </h2>
              <div className="mt-8 space-y-5">
                {tour.itinerary.map((item, index) => (
                  <article
                    key={`${item.day}-${item.title}`}
                    className="grid gap-4 border-l border-gold/70 pl-5 md:grid-cols-[96px_1fr]"
                  >
                    <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground">
                      Day {item.day ?? index + 1}
                    </p>
                    <div>
                      <p className="font-serif text-2xl font-medium leading-snug text-foreground">
                        {item.title}
                      </p>
                      <p className="mt-3 font-sans text-sm font-light leading-relaxed text-muted-foreground">
                        {item.activities}
                      </p>
                      <p className="mt-3 font-sans text-xs uppercase tracking-widest text-gold">
                        Overnight: {item.overnight}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section id="practical-info">
              <p className="font-sans text-xs uppercase tracking-luxe text-gold">
                Practical Info
              </p>
              <h2 className="mt-4 font-serif text-4xl font-medium text-foreground">
                What is included
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {tour.included.map((item) => (
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
              Built around your dates, pace, and comfort level.
            </p>
            <p className="mt-4 font-sans text-sm font-light leading-relaxed text-muted-foreground">
              {tour.description} We refine the route after learning how you
              want the journey to feel.
            </p>
            <a
              href="/contact"
              className="mt-7 inline-flex h-12 w-full items-center justify-center bg-forest px-5 font-sans text-xs uppercase tracking-widest text-cream transition-colors hover:bg-coffee"
            >
              Request Proposal
            </a>
          </div>
        </aside>
      </div>
    </section>
  )
}
