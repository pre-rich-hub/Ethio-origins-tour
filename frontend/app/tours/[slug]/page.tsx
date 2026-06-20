import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/navbar'
import { SiteFooter } from '@/components/layout/site-footer'
import { Breadcrumbs } from '@/components/seo/breadcrumbs'
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
  getTour,
  tours,
} from '@/features/tours'
import { createMetadata } from '@/lib/seo/create-metadata'
import { createBreadcrumbSchema, createTourSchema } from '@/lib/seo/schemas'

type TourPageProps = {
  params: Promise<{
    slug: string
  }>
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
  const tour = getTour(slug)
  const category = getTourCategory(slug)

  if (!tour && !category) {
    return {
      title: 'Tour Not Found',
      description: 'The requested Ethiopia tour page could not be found.',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  return createMetadata((tour || category)!.seo)
}

export default async function TourPage({ params }: TourPageProps) {
  const { slug } = await params
  const tour = getTour(slug)
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
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Tours', href: '/tours' },
              { label: category.name, href: `/tours/${category.slug}` },
            ]}
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
  const relatedTours = tours
    .filter((item) => item.slug !== tour.slug)
    .slice(0, 3)

  return (
    <main className="bg-stone text-foreground">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 md:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tours', href: '/tours' },
            { label: tour.title, href: `/tours/${tour.slug}` },
          ]}
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
