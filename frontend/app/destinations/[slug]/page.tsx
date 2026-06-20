import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock,
  Compass,
  MapPin,
  Sparkles,
} from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { destinations, getDestination } from '@/lib/destinations'

type DestinationPageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return destinations.map((destination) => ({ slug: destination.slug }))
}

export async function generateMetadata({
  params,
}: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params
  const destination = getDestination(slug)

  if (!destination) {
    return {
      title: 'Destination Not Found | Ethio Origins Tours',
    }
  }

  return {
    title: `${destination.name} | Ethio Origins Tours`,
    description: destination.description,
  }
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { slug } = await params
  const destination = getDestination(slug)

  if (!destination) {
    notFound()
  }

  const relatedDestinations = destinations
    .filter((item) => item.slug !== destination.slug)
    .slice(0, 3)

  return (
    <main className="bg-background text-foreground">
      <Navbar />

      <section className="relative isolate min-h-screen overflow-hidden bg-coffee pt-28 text-cream">
        <img
          src={destination.image}
          alt={destination.name}
          className="absolute inset-0 z-0 size-full scale-105 object-cover"
        />
        <div className="absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(12,17,14,0.96)_0%,rgba(29,25,20,0.76)_48%,rgba(12,17,14,0.3)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 z-0 h-1/2 bg-gradient-to-t from-background via-background/45 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-7rem)] max-w-7xl flex-col justify-end px-4 pb-10 sm:px-6 md:px-8 md:pb-16">
          <a
            href="/destinations"
            className="mb-auto inline-flex w-fit items-center gap-2 font-sans text-[0.68rem] uppercase tracking-[0.16em] text-cream/75 transition-colors hover:text-gold sm:text-xs sm:tracking-widest"
          >
            <ArrowLeft className="size-4" />
            Back to Destinations
          </a>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end">
            <div className="max-w-5xl">
              <p className="inline-flex items-center gap-3 border border-cream/18 bg-black/20 px-4 py-2 font-sans text-[0.68rem] uppercase tracking-[0.16em] text-gold backdrop-blur-md sm:text-xs sm:tracking-luxe md:text-sm">
                <MapPin className="size-4" />
                {destination.place}
              </p>
              <h1 className="mt-6 max-w-5xl text-balance font-serif text-5xl font-medium leading-[0.92] text-cream sm:text-7xl md:text-8xl lg:text-9xl">
                {destination.name}
              </h1>
              <p className="mt-7 max-w-2xl text-pretty font-sans text-base font-light leading-relaxed text-cream/86 md:text-lg">
                {destination.intro}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/contact"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-sm bg-gold px-7 font-sans text-xs uppercase tracking-widest text-coffee transition-transform hover:-translate-y-0.5 md:text-sm"
                >
                  Plan This Trip
                  <ArrowRight className="size-4" />
                </a>
                <a
                  href="#sample-flow"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-sm border border-cream/45 px-7 font-sans text-xs uppercase tracking-widest text-cream transition-colors hover:bg-cream/10 md:text-sm"
                >
                  View Sample Flow
                </a>
              </div>
            </div>

            <aside className="border border-cream/18 bg-black/28 p-5 shadow-2xl shadow-black/25 backdrop-blur-xl md:p-7">
              <p className="font-sans text-xs uppercase tracking-[0.22em] text-gold">
                Journey Snapshot
              </p>
              <div className="mt-6 grid gap-px overflow-hidden border border-cream/12 bg-cream/12">
                <div className="flex items-start gap-3 bg-black/18 p-4">
                  <Clock className="mt-1 size-5 text-gold" />
                  <div>
                    <p className="font-sans text-[0.65rem] uppercase tracking-widest text-cream/55">
                      Duration
                    </p>
                    <p className="mt-1 font-serif text-2xl font-medium leading-none text-cream">
                      {destination.duration}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/18 p-4">
                  <Compass className="mt-1 size-5 text-gold" />
                  <div>
                    <p className="font-sans text-[0.65rem] uppercase tracking-widest text-cream/55">
                      Best For
                    </p>
                    <p className="mt-1 font-sans text-sm font-light leading-relaxed text-cream/85">
                      {destination.bestFor}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/18 p-4">
                  <CalendarDays className="mt-1 size-5 text-gold" />
                  <div>
                    <p className="font-sans text-[0.65rem] uppercase tracking-widest text-cream/55">
                      Travel Style
                    </p>
                    <p className="mt-1 font-sans text-sm font-light leading-relaxed text-cream/85">
                      Private, flexible, locally guided, and tailored around
                      your pace.
                    </p>
                  </div>
                </div>
              </div>
              <a
                href="/contact"
                className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-sm border border-gold/70 px-5 font-sans text-xs uppercase tracking-widest text-gold transition-colors hover:bg-gold hover:text-coffee"
              >
                Request Proposal
              </a>
            </aside>
          </div>
        </div>
      </section>

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

      <section className="relative isolate overflow-hidden bg-coffee py-16 text-cream md:py-28">
        <img
          src={destination.image}
          alt=""
          className="absolute inset-0 z-0 size-full object-cover"
        />
        <div className="absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(12,17,14,0.94),rgba(31,24,18,0.84),rgba(12,17,14,0.62))]" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <Sparkles className="size-9 text-gold" />
            <p className="mt-6 font-sans text-xs uppercase tracking-[0.2em] text-gold sm:tracking-luxe">
              Designed Around You
            </p>
            <h2 className="mt-4 font-serif text-4xl font-medium leading-tight md:text-5xl">
              Make this destination your own.
            </h2>
          </div>
          <div className="grid gap-px border border-cream/16 bg-cream/16 md:grid-cols-3">
            {['Private guides', 'Flexible lodges', 'Seasonal timing'].map(
              (item) => (
                <div key={item} className="bg-black/24 p-6 backdrop-blur-sm">
                  <p className="font-serif text-2xl font-medium">{item}</p>
                  <p className="mt-3 font-sans text-sm font-light leading-relaxed text-cream/70">
                    Selected and adjusted after we understand how you want the
                    journey to feel.
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="font-sans text-xs uppercase tracking-[0.18em] text-gold sm:tracking-luxe">
                Continue Exploring
              </p>
              <h2 className="mt-4 font-serif text-3xl font-medium leading-tight text-foreground sm:text-4xl md:text-5xl">
                More destinations to consider
              </h2>
            </div>
            <a
              href="/destinations"
              className="inline-flex items-center gap-2 font-sans text-[0.68rem] uppercase tracking-[0.16em] text-forest transition-colors hover:text-gold sm:text-xs sm:tracking-widest"
            >
              All destinations
              <ArrowRight className="size-4" />
            </a>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {relatedDestinations.map((item) => (
              <Link
                key={item.slug}
                href={`/destinations/${item.slug}`}
                aria-label={`Open dedicated page for ${item.name}`}
                className="group relative flex min-h-[430px] cursor-pointer touch-manipulation overflow-hidden border border-cream/18 bg-coffee shadow-xl shadow-black/10 transition-shadow hover:shadow-coffee/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:min-h-[480px]"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/28 to-black/10" />
                <span className="absolute right-5 top-5 font-sans text-[0.66rem] font-bold uppercase tracking-[0.14em] text-cream drop-shadow sm:right-6 sm:top-6 sm:text-[0.68rem] sm:tracking-[0.16em]">
                  {item.duration}
                </span>
                <div className="relative z-10 mt-auto flex min-h-[54%] flex-col justify-end p-5 text-cream sm:min-h-[48%] sm:p-7">
                  <p className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.2em] text-gold sm:text-[0.64rem] sm:tracking-[0.32em]">
                    {item.place}
                  </p>
                  <h3 className="mt-3 max-w-[18rem] font-sans text-base font-bold uppercase leading-snug tracking-[0.1em] text-cream sm:mt-4 sm:tracking-[0.18em] md:text-lg">
                    {item.name}
                  </h3>
                  <p className="mt-3 max-w-[20rem] font-sans text-sm font-light leading-relaxed text-cream/80">
                    {item.description}
                  </p>
                  <span className="mt-6 inline-flex h-12 w-full items-center justify-center border border-cream/90 px-5 font-sans text-[0.64rem] font-bold uppercase tracking-[0.16em] text-cream transition-colors group-hover:bg-cream group-hover:text-coffee sm:mt-8 sm:h-14 sm:w-40 sm:text-[0.66rem] sm:tracking-[0.22em]">
                    Explore Trip
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden py-16 md:py-28">
        <img
          src="/images/cta.png"
          alt=""
          className="absolute inset-0 z-0 size-full object-cover"
        />
        <div className="absolute inset-0 z-0 bg-black/70" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 md:px-8">
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold sm:tracking-luxe">
            Begin Planning
          </p>
          <h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-cream md:text-6xl">
            Let us shape the right route for {destination.place}.
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-sans text-base font-light leading-relaxed text-cream/75">
            Tell us your dates, interests, comfort level, and pace. We will
            design a private itinerary around the way you want to travel.
          </p>
          <a
            href="/contact"
            className="mt-9 inline-flex h-14 items-center justify-center gap-2 rounded-sm bg-gold px-8 font-sans text-sm uppercase tracking-widest text-coffee transition-transform hover:-translate-y-0.5"
          >
            Start a Private Journey
            <ArrowRight className="size-4" />
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
