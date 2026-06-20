import { ArrowRight } from 'lucide-react'
import type { Tour } from '../types/tour'

export function RelatedTours({ relatedTours }: { relatedTours: Tour[] }) {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-sans text-xs uppercase tracking-luxe text-gold">
              More Private Packages
            </p>
            <h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-foreground md:text-5xl">
              Other journeys you may like
            </h2>
          </div>
          <a
            href="/tours"
            className="inline-flex items-center gap-3 font-sans text-xs font-bold uppercase tracking-widest text-forest transition-colors hover:text-gold"
          >
            View All Tours
            <ArrowRight className="size-4" />
          </a>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {relatedTours.map((item) => (
            <a
              key={item.slug}
              href={`/tours/${item.slug}`}
              className="group overflow-hidden border border-border bg-card shadow-xl shadow-coffee/5 transition-transform duration-500 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-coffee">
                <img
                  src={item.image}
                  alt={item.title}
                  className="size-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/12 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
                  <p className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.22em] text-gold">
                    {item.duration}
                  </p>
                  <h3 className="mt-2 font-serif text-3xl font-medium leading-none">
                    {item.title}
                  </h3>
                </div>
              </div>
              <div className="p-5">
                <p className="font-sans text-sm font-light leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <span className="font-sans text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                    {item.destination}
                  </span>
                  <ArrowRight className="size-4 text-gold transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
