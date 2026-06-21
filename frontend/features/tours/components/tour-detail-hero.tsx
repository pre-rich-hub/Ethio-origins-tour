import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Clock, MapPin, Users } from 'lucide-react'
import type { Tour } from '../types/tour'

type TourDetailHeroProps = {
  gallery: string[]
  tour: Tour
}

export function TourDetailHero({ gallery, tour }: TourDetailHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-coffee pt-28 text-cream md:pt-36">
      <Image
        src={tour.image}
        alt={tour.imageAlt}
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 z-0 size-full object-cover"
      />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(12,18,15,0.96)_0%,rgba(24,55,43,0.84)_48%,rgba(0,0,0,0.32)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 z-0 h-56 bg-gradient-to-t from-stone to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-12 sm:px-6 md:px-8 md:pb-16">
        <Link
          href="/tours"
          className="inline-flex items-center gap-2 font-sans text-[0.68rem] uppercase tracking-[0.16em] text-cream/78 transition-colors hover:text-gold sm:text-xs sm:tracking-widest"
        >
          <ArrowLeft className="size-4" />
          Back to Tours
        </Link>

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
                <p className="mt-1 font-serif text-2xl text-cream">Private</p>
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
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 180px, 50vw"
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
  )
}
