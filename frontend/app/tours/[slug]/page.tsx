import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/navbar'
import { SiteFooter } from '@/components/layout/site-footer'
import {
  RelatedTours,
  TourDetailContent,
  TourDetailHero,
  getTour,
  tours,
} from '@/features/tours'

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
      <TourDetailHero gallery={gallery} tour={tour} />
      <TourDetailContent tour={tour} />
      <RelatedTours relatedTours={relatedTours} />
      <SiteFooter />
    </main>
  )
}
