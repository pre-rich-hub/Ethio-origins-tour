import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { TourCategory } from '../data/tour-categories'

export function TourCategoryHero({ category }: { category: TourCategory }) {
  return (
    <section className="relative isolate overflow-hidden bg-coffee pt-28 text-cream md:pt-40">
      <img
        src="/images/hero.png"
        alt=""
        className="absolute inset-0 z-0 size-full object-cover"
      />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(18,27,21,0.92)_0%,rgba(47,36,26,0.74)_48%,rgba(18,27,21,0.45)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 z-0 h-28 bg-gradient-to-t from-background to-transparent" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 sm:px-6 md:px-8 md:pb-28">
        <Link
          href="/tours"
          className="inline-flex items-center gap-2 font-sans text-[0.68rem] uppercase tracking-[0.16em] text-cream/75 transition-colors hover:text-gold sm:text-xs sm:tracking-widest"
        >
          <ArrowLeft className="size-4" />
          Back to Tours
        </Link>
        <div className="mt-10 max-w-4xl md:mt-14">
          <p className="font-sans text-xs uppercase tracking-[0.18em] text-gold sm:tracking-luxe md:text-sm">
            Tour Category
          </p>
          <h1 className="mt-5 text-balance font-serif text-4xl font-medium leading-[1.02] sm:text-6xl md:text-7xl">
            {category.name}
          </h1>
          <p className="mt-7 max-w-2xl text-pretty font-sans text-base font-light leading-relaxed text-cream/82 md:text-lg">
            {category.description}
          </p>
        </div>
      </div>
    </section>
  )
}
