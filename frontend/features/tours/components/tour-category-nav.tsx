import Link from 'next/link'
import { tourCategories } from '../data/tour-categories'

export function TourCategoryNav() {
  return (
    <section className="border-y border-border bg-stone py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <p className="font-sans text-xs uppercase tracking-luxe text-gold">
          Tour Categories
        </p>
        <div className="mt-5 flex gap-3 overflow-x-auto pb-2">
          {tourCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/tours/${category.slug}`}
              className="inline-flex shrink-0 border border-border bg-card px-4 py-3 font-sans text-[0.68rem] font-bold uppercase tracking-[0.16em] text-forest transition-colors hover:border-gold hover:text-gold"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
