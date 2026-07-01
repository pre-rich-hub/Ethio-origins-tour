import { CalendarDays, MapPinned, Sparkles } from 'lucide-react'
import type { Destination } from '../types/destination'

export function DestinationTravelGuide({
  destination,
}: {
  destination: Destination
}) {
  return (
    <section className="bg-stone py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="max-w-3xl">
          <p className="font-sans text-xs uppercase tracking-luxe text-gold-dark">
            Know before you go
          </p>
          <h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-forest md:text-5xl">
            About {destination.name}
          </h2>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <article className="border border-border bg-card p-7 md:p-9 lg:col-span-2">
            <MapPinned className="size-7 text-gold-dark" strokeWidth={1.5} />
            <h3 className="mt-6 font-serif text-3xl font-medium text-foreground">
              The place in detail
            </h3>
            <p className="mt-4 max-w-5xl font-sans text-base font-light leading-8 text-muted-foreground md:text-lg md:leading-9">
              {destination.intro}
            </p>
          </article>

          <article className="border border-border bg-card p-7 md:p-9">
            <CalendarDays className="size-7 text-gold-dark" strokeWidth={1.5} />
            <h3 className="mt-6 font-serif text-3xl font-medium text-foreground">
              Best time to visit
            </h3>
            <p className="mt-4 font-sans text-base font-light leading-8 text-muted-foreground">
              {destination.bestTimeToVisit}
            </p>
          </article>

          <article className="border border-border bg-coffee p-7 text-cream md:p-9">
            <Sparkles className="size-7 text-gold" strokeWidth={1.5} />
            <h3 className="mt-6 font-serif text-3xl font-medium">
              Events &amp; seasonal moments
            </h3>
            <ul className="mt-5 space-y-4">
              {destination.events.map((event) => (
                <li
                  key={event}
                  className="border-l border-gold/60 pl-4 font-sans text-base font-light leading-7 text-cream/78"
                >
                  {event}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}
