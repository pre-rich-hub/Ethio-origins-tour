import type { Metadata } from 'next'
import {
  TourDetailPage,
  getTour,
  tours,
  type TourPageProps,
} from '@/features/tours'

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

export default TourDetailPage
