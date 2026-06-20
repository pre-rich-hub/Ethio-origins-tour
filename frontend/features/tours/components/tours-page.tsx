import Link from 'next/link'
import { ArrowLeft, ArrowRight, Clock, MapPin } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { SiteFooter } from '@/components/layout/site-footer'
import { tours } from '../data/tours'

export function ToursPage() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />

      <section className="relative isolate overflow-hidden bg-coffee pt-28 text-cream md:pt-40">
        <img
          src="/images/client/custom/omo-valley.jpg"
          alt="Ethiopian cultural journey"
          className="absolute inset-0 z-0 size-full object-cover"
        />
        <div className="absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(18,27,21,0.92)_0%,rgba(47,36,26,0.74)_48%,rgba(18,27,21,0.45)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 z-0 h-28 bg-gradient-to-t from-background to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 sm:px-6 md:px-8 md:pb-28">
          <a
            href="/"
            className="inline-flex items-center gap-2 font-sans text-[0.68rem] uppercase tracking-[0.16em] text-cream/75 transition-colors hover:text-gold sm:text-xs sm:tracking-widest"
          >
            <ArrowLeft className="size-4" />
            Back Home
          </a>
          <div className="mt-10 max-w-4xl md:mt-14">
            <p className="font-sans text-xs uppercase tracking-[0.18em] text-gold sm:tracking-luxe md:text-sm">
              Dedicated Tours
            </p>
            <h1 className="mt-5 text-balance font-serif text-4xl font-medium leading-[1.02] sm:text-6xl md:text-7xl">
              Choose the journey that fits your pace.
            </h1>
            <p className="mt-7 max-w-2xl text-pretty font-sans text-base font-light leading-relaxed text-cream/82 md:text-lg">
              Every tour below opens its own dedicated page with route details,
              highlights, sample itinerary, and private planning options.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tours.map((tour) => (
              <Link
                key={tour.slug}
                href={`/tours/${tour.slug}`}
                aria-label={`Open dedicated page for ${tour.title}`}
                className="group relative flex min-h-[440px] cursor-pointer touch-manipulation overflow-hidden border border-cream/18 bg-coffee shadow-2xl shadow-black/20 transition-shadow hover:shadow-coffee/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:min-h-[500px] md:min-h-[520px]"
              >
                <img
                  src={tour.image || '/placeholder.svg'}
                  alt={tour.title}
                  className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
                <div className="absolute inset-0 bg-coffee/0 transition-colors duration-500 group-hover:bg-coffee/10" />
                <span className="absolute right-5 top-5 inline-flex items-center gap-2 font-sans text-[0.66rem] font-bold uppercase tracking-[0.14em] text-cream drop-shadow sm:right-6 sm:top-6 sm:text-[0.68rem] sm:tracking-[0.16em]">
                  <Clock className="size-3.5" />
                  {tour.duration}
                </span>
                <div className="relative z-10 mt-auto flex min-h-[54%] flex-col justify-end p-5 text-cream sm:min-h-[48%] sm:p-7 md:p-8">
                  <p className="flex items-center gap-2 font-sans text-[0.62rem] font-bold uppercase tracking-[0.2em] text-gold sm:text-[0.64rem] sm:tracking-[0.32em]">
                    <MapPin className="size-3.5" />
                    {tour.destination}
                  </p>
                  <h2 className="mt-3 max-w-[20rem] font-sans text-base font-bold uppercase leading-snug tracking-[0.1em] text-cream sm:mt-4 sm:tracking-[0.18em] md:text-lg">
                    {tour.title}
                  </h2>
                  <p className="mt-3 max-w-[22rem] font-sans text-sm font-light leading-relaxed text-cream/80">
                    {tour.description}
                  </p>
                  <span className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 border border-cream/90 px-5 font-sans text-[0.64rem] font-bold uppercase tracking-[0.14em] text-cream transition-colors group-hover:bg-cream group-hover:text-coffee sm:mt-8 sm:h-14 sm:w-48 sm:text-[0.66rem] sm:tracking-[0.22em]">
                    Open tour page
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
