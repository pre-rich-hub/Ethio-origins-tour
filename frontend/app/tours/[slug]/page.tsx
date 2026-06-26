import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { Navbar } from '@/components/layout/navbar'
import { SiteFooter } from '@/components/layout/site-footer'
import { JsonLd } from '@/components/seo/json-ld'
import {
  RelatedTours,
  TourCategoryHero,
  TourCategoryTours,
  TourContextLinks,
  TourDetailContent,
  TourDetailHero,
  getTourCategory,
  tourCategories,
  tours,
} from '@/features/tours'
import { getTourByRoute } from '@/lib/api/cms'
import {
  createMetadata,
  createNotFoundMetadata,
} from '@/lib/seo/create-metadata'
import { createBreadcrumbSchema, createTourSchema } from '@/lib/seo/schemas'
import { TourBreadcrumbs } from './tour-breadcrumbs'

type TourPageProps = {
  params: Promise<{
    slug: string
  }>
}

const tourRedirects: Record<string, string> = {
  '13-days-southern-ethiopia-cultural-nature-adventure': '10-day-omo-valley-bale-mountains-cultural-adventure',
  '12-days-ethiopia-grand-circuit': '20-day-ethiopia-historical-cultural-adventure',
  '6-days-simien-mountains-trekking': '6-day-ethiopia-holiday-package',
  '3-days-addis-ababa-cultural-city-break': '1-day-debre-libanos-portuguese-bridge-tour',
  '5-days-awash-wildlife-and-hot-springs': '5-day-lalibela-danakil-depression-tour',
  '9-days-coffee-heritage-and-highlands': '3-day-harar-cultural-historical-tour',
  '5-days-danakil-depression-expedition': '4-day-danakil-depression-erta-ale-tour',
  '8-days-historic-northern-route': '3-day-lalibela-genna-festival-tour',
}

function getDurationDays(duration: string) {
  const value = Number.parseInt(duration, 10)
  return Number.isNaN(value) ? 1 : value
}

function getRelatedTours(tour: (typeof tours)[number]) {
  const currentDestinations = new Set(tour.destinationSlugs)
  const currentCategories = new Set(tour.categorySlugs)
  const currentRegions = new Set(
    tour.region
      .split(',')
      .map((region) => region.trim().toLowerCase())
      .filter(Boolean),
  )
  const currentDays = getDurationDays(tour.duration)

  return tours
    .filter((item) => item.slug !== tour.slug)
    .map((item) => {
      const sharedDestinations = item.destinationSlugs.filter((slug) =>
        currentDestinations.has(slug),
      ).length
      const sharedCategories = item.categorySlugs.filter((slug) =>
        currentCategories.has(slug),
      ).length
      const sharedRegions = item.region
        .split(',')
        .map((region) => region.trim().toLowerCase())
        .filter((region) => currentRegions.has(region)).length
      const durationDelta = Math.abs(getDurationDays(item.duration) - currentDays)

      return {
        item,
        score:
          sharedDestinations * 10 +
          sharedCategories * 4 +
          sharedRegions * 2 +
          Math.max(0, 3 - durationDelta),
      }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return a.item.slug.localeCompare(b.item.slug)
    })
    .slice(0, 3)
    .map(({ item }) => item)
}

export function generateStaticParams() {
  return [
    ...tours.map((tour) => ({ slug: tour.slug })),
    ...tourCategories.map((category) => ({ slug: category.slug })),
  ]
}

export async function generateMetadata({
  params,
}: TourPageProps): Promise<Metadata> {
  const { slug } = await params

  if (tourRedirects[slug]) {
    permanentRedirect(`/tours/${tourRedirects[slug]}`)
  }

  const tour = await getTourByRoute(slug)
  const category = getTourCategory(slug)

  if (!tour && !category) {
    return createNotFoundMetadata('Tour Not Found')
  }

  return createMetadata((tour || category)!.seo)
}

export default async function TourPage({ params }: TourPageProps) {
  const { slug } = await params

  if (tourRedirects[slug]) {
    permanentRedirect(`/tours/${tourRedirects[slug]}`)
  }

  const tour = await getTourByRoute(slug)
  const category = getTourCategory(slug)

  if (!tour && !category) {
    notFound()
  }

  if (category) {
    const categoryTours = tours.filter((item) =>
      item.categorySlugs.includes(category.slug),
    )

    return (
      <main className="bg-background text-foreground">
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 md:px-8">
          <TourBreadcrumbs
            category={category}
            currentHref={`/tours/${category.slug}`}
          />
        </div>
        <JsonLd
          data={createBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Tours', path: '/tours' },
            { name: category.name, path: `/tours/${category.slug}` },
          ])}
        />
        <TourCategoryHero category={category} />
        <TourCategoryTours category={category} categoryTours={categoryTours} />
        <SiteFooter />
      </main>
    )
  }

  if (!tour) {
    notFound()
  }

  const gallery = tour.gallery?.length ? tour.gallery : [tour.image]
  const relatedTours = getRelatedTours(tour)

  return (
    <main className="bg-stone text-foreground">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 md:px-8">
        <TourBreadcrumbs
          currentHref={`/tours/${tour.slug}`}
          tour={tour}
        />
      </div>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Tours', path: '/tours' },
          { name: tour.title, path: `/tours/${tour.slug}` },
        ])}
      />
      <JsonLd
        data={createTourSchema({
          description: tour.description,
          image: tour.image,
          name: tour.title,
          path: `/tours/${tour.slug}`,
        })}
      />
      <TourDetailHero gallery={gallery} tour={tour} />
      <TourDetailContent tour={tour} />
      <TourContextLinks tour={tour} />
      <RelatedTours relatedTours={relatedTours} />
      <SiteFooter />
    </main>
  )
}
