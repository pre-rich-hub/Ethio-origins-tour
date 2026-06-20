import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/navbar'
import { SiteFooter } from '@/components/layout/site-footer'
import {
  DestinationCta,
  DestinationDetailHero,
  DestinationOverview,
  DestinationPersonalization,
  DestinationSampleFlow,
  RelatedDestinations,
  destinations,
  getDestination,
} from '@/features/destinations'

type DestinationPageProps = {
  params: Promise<{
    slug: string
  }>
}

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

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { slug } = await params
  const destination = getDestination(slug)

  if (!destination) {
    notFound()
  }

  const relatedDestinations = destinations
    .filter((item) => item.slug !== destination.slug)
    .slice(0, 3)

  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <DestinationDetailHero destination={destination} />
      <DestinationOverview destination={destination} />
      <DestinationSampleFlow destination={destination} />
      <DestinationPersonalization destination={destination} />
      <RelatedDestinations relatedDestinations={relatedDestinations} />
      <DestinationCta destination={destination} />
      <SiteFooter />
    </main>
  )
}
