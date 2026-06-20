import { Check } from 'lucide-react'
import type { Destination } from '../types/destination'

export function DestinationOverview({
  destination,
}: {
  destination: Destination
}) {
  return (
    <section className="py-16 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 md:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.5fr)] lg:items-start">
        <div>
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold sm:tracking-luxe">
            Destination Overview
          </p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl font-medium leading-tight text-foreground md:text-6xl">
            A journey shaped around place, pace, and story.
          </h2>
          <p className="mt-7 max-w-3xl font-sans text-base font-light leading-relaxed text-muted-foreground md:text-lg">
            {destination.description} Every route is refined around season,
            access, travel style, and the level of comfort you want on the
            road.
          </p>

          <div className="mt-12 border-y border-border">
            {destination.highlights.map((highlight, index) => (
              <div
                key={highlight}
                className="grid gap-4 border-b border-border py-6 last:border-b-0 sm:grid-cols-[72px_1fr]"
              >
                <span className="font-sans text-xs uppercase tracking-widest text-gold">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex gap-3">
                  <Check className="mt-1 size-5 shrink-0 text-gold" />
                  <p className="font-sans text-base font-light leading-relaxed text-foreground">
                    {highlight}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="sticky top-28">
          <div className="relative overflow-hidden border border-border bg-coffee text-cream shadow-2xl shadow-coffee/10">
            <img
              src={destination.image}
              alt=""
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/18 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
              <p className="font-sans text-xs uppercase tracking-[0.22em] text-gold">
                Curator Note
              </p>
              <p className="mt-4 font-serif text-2xl font-medium leading-tight text-cream">
                Leave room for light, local rhythm, and the unexpected.
              </p>
              <p className="mt-4 font-sans text-sm font-light leading-relaxed text-cream/76">
                We build space for markets, roadside coffee, shifting weather,
                and personal introductions that make Ethiopia feel intimate.
              </p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-px border border-border bg-border">
            <div className="bg-card p-5">
              <p className="font-sans text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                Pace
              </p>
              <p className="mt-2 font-serif text-2xl font-medium text-foreground">
                Private
              </p>
            </div>
            <div className="bg-card p-5">
              <p className="font-sans text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                Route
              </p>
              <p className="mt-2 font-serif text-2xl font-medium text-foreground">
                Tailored
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
