import type { Metadata } from 'next'
import {
  DestinationDetailPage,
  destinations,
  getDestination,
  type DestinationPageProps,
} from '@/features/destinations'

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

export default DestinationDetailPage
