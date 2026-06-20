import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  MapPin,
  Users,
} from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { getTour, tours } from '@/lib/tours'

type TourPageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }))
}

export async function generateMetadata({
  params,
}: TourPageProps): Promise<Metadata> {
  const { slug } = await params
  const tour = getTour(slug)

  if (!tour) {
    return {
      title: 'Tour Not Found | Ethio Origins Tours',
    }
  }

  return {
    title: `${tour.title} | Ethio Origins Tours`,
    description: tour.description,
  }
}

export default async function TourPage({ params }: TourPageProps) {
  const { slug } = await params
  const tour = getTour(slug)

  if (!tour) {
    notFound()
  }

  const gallery = tour.gallery?.length ? tour.gallery : [tour.image]
  const relatedTours = tours
    .filter((item) => item.slug !== tour.slug)
    .slice(0, 3)

  return (
    <main className="bg-stone text-foreground">
      <Navbar />

      <section className="relative isolate overflow-hidden bg-coffee pt-28 text-cream md:pt-36">
        <img
          src={tour.image}
          alt={tour.title}
          className="absolute inset-0 z-0 size-full object-cover"
        />
        <div className="absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(12,18,15,0.96)_0%,rgba(24,55,43,0.84)_48%,rgba(0,0,0,0.32)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 z-0 h-56 bg-gradient-to-t from-stone to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-12 sm:px-6 md:px-8 md:pb-16">
          <a
            href="/tours"
            className="inline-flex items-center gap-2 font-sans text-[0.68rem] uppercase tracking-[0.16em] text-cream/78 transition-colors hover:text-gold sm:text-xs sm:tracking-widest"
          >
            <ArrowLeft className="size-4" />
            Back to Tours
          </a>

          <div className="grid min-h-[620px] gap-10 py-14 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end lg:py-20">
            <div className="max-w-4xl">
              <p className="font-sans text-xs uppercase tracking-luxe text-gold">
                Private Tour Package
              </p>
              <h1 className="mt-5 text-balance font-serif text-5xl font-medium leading-[0.92] text-cream sm:text-6xl md:text-7xl">
                {tour.title}
              </h1>
              <p className="mt-7 max-w-2xl font-sans text-base font-light leading-relaxed text-cream/84 md:text-lg">
                {tour.intro}
              </p>

              <div className="mt-9 grid gap-3 sm:grid-cols-3">
                <div className="border border-cream/16 bg-cream/10 p-4 backdrop-blur-sm">
                  <Clock className="size-5 text-gold" />
                  <p className="mt-3 font-sans text-[0.62rem] uppercase tracking-widest text-cream/58">
                    Duration
                  </p>
                  <p className="mt-1 font-serif text-2xl text-cream">
                    {tour.duration}
                  </p>
                </div>
                <div className="border border-cream/16 bg-cream/10 p-4 backdrop-blur-sm">
                  <MapPin className="size-5 text-gold" />
                  <p className="mt-3 font-sans text-[0.62rem] uppercase tracking-widest text-cream/58">
                    Region
                  </p>
                  <p className="mt-1 font-serif text-2xl text-cream">
                    {tour.destination}
                  </p>
                </div>
                <div className="border border-cream/16 bg-cream/10 p-4 backdrop-blur-sm">
                  <Users className="size-5 text-gold" />
                  <p className="mt-3 font-sans text-[0.62rem] uppercase tracking-widest text-cream/58">
                    Style
                  </p>
                  <p className="mt-1 font-serif text-2xl text-cream">
                    Private
                  </p>
                </div>
              </div>
            </div>

            <aside className="border border-cream/18 bg-cream/10 p-5 shadow-2xl shadow-black/25 backdrop-blur-md">
              <p className="font-sans text-xs uppercase tracking-luxe text-gold">
                Selected Package
              </p>
              <h2 className="mt-4 font-serif text-3xl font-medium leading-tight text-cream">
                {tour.duration} crafted around your dates.
              </h2>
              <p className="mt-4 font-sans text-sm font-light leading-relaxed text-cream/72">
                {tour.bestFor}
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {gallery.slice(0, 4).map((image, index) => (
                  <figure
                    key={image + index}
                    className="relative aspect-[4/3] overflow-hidden border border-cream/12 bg-black"
                  >
                    <img
                      src={image}
                      alt=""
                      className="size-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </figure>
                ))}
              </div>

              <a
                href="/contact"
                className="mt-6 inline-flex h-14 w-full items-center justify-center gap-3 bg-gold px-6 font-sans text-sm uppercase tracking-widest text-coffee transition-transform hover:-translate-y-0.5"
              >
                Book This Tour
                <ArrowRight className="size-5" />
              </a>
            </aside>
          </div>
        </div>
      </section>

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

      <SiteFooter />
    </main>
  )
}
