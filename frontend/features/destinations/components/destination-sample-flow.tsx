import type { Destination } from '../types/destination'

export function DestinationSampleFlow({
  destination,
}: {
  destination: Destination
}) {
  return (
    <section id="sample-flow" className="bg-stone py-16 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="grid gap-8 md:grid-cols-[0.4fr_0.6fr] md:items-end">
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold sm:tracking-luxe">
              Sample Flow
            </p>
            <h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-foreground md:text-5xl">
              A polished route with room to breathe
            </h2>
          </div>
          <p className="max-w-2xl font-sans text-base font-light leading-relaxed text-muted-foreground">
            The order below is a sample framework. We adjust timing, lodges,
            driving rhythm, and special access after we understand the season
            and your travel style.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {destination.itinerary.map((item, index) => (
            <article
              key={item}
              className="relative border border-border bg-card p-6 shadow-sm md:p-7"
            >
              <span className="inline-flex size-10 items-center justify-center border border-gold/45 font-sans text-xs uppercase tracking-widest text-gold">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="mt-7 font-serif text-2xl font-medium leading-snug text-foreground">
                {item}
              </p>
              <p className="mt-4 font-sans text-sm font-light leading-relaxed text-muted-foreground">
                The exact timing is adjusted around weather, local access,
                your interests, and the rhythm of the route.
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
