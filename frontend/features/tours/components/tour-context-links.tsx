import Link from 'next/link'
import { destinations } from '@/features/destinations/data/destinations'
import { tourCategories } from '../data/tour-categories'
import type { Tour } from '../types/tour'

export function TourContextLinks({ tour }: { tour: Tour }) {
  const relatedDestinations = destinations.filter((destination) =>
    tour.destinationSlugs.includes(destination.slug),
  )
  const relatedCategories = tourCategories.filter((category) =>
    tour.categorySlugs.includes(category.slug),
  )

  if (!relatedDestinations.length && !relatedCategories.length) {
    return null
  }

  return (
    <section className="bg-stone py-12 md:py-16">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2 md:px-8">
        {relatedDestinations.length > 0 && (
          <div>
            <p className="font-sans text-xs uppercase tracking-luxe text-gold">
              Related Destinations
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {relatedDestinations.map((destination) => (
                <Link
                  key={destination.slug}
                  href={`/destinations/${destination.slug}`}
                  className="border border-border bg-card px-4 py-3 font-sans text-xs uppercase tracking-widest text-forest transition-colors hover:border-gold hover:text-gold"
                >
                  {destination.name}
                </Link>
              ))}
            </div>
          </div>
        )}
        {relatedCategories.length > 0 && (
          <div>
            <p className="font-sans text-xs uppercase tracking-luxe text-gold">
              Related Tour Styles
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {relatedCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/tours/${category.slug}`}
                  className="border border-border bg-card px-4 py-3 font-sans text-xs uppercase tracking-widest text-forest transition-colors hover:border-gold hover:text-gold"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
