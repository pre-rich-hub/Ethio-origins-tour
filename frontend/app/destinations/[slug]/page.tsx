import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/navbar'
import { SiteFooter } from '@/components/layout/site-footer'
import { Breadcrumbs } from '@/components/seo/breadcrumbs'
import { JsonLd } from '@/components/seo/json-ld'
import {
  DestinationCta,
  DestinationDetailHero,
  DestinationOverview,
  DestinationPersonalization,
  DestinationSampleFlow,
  RelatedDestinationTours,
  RelatedDestinations,
  destinations,
  getDestination,
} from '@/features/destinations'
import { createMetadata } from '@/lib/seo/create-metadata'
import {
  createBreadcrumbSchema,
  createDestinationSchema,
} from '@/lib/seo/schemas'

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
      title: 'Destination Not Found',
      description: 'The requested Ethiopia destination page could not be found.',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  return createMetadata(destination.seo)
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
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 md:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Destinations', href: '/destinations' },
            { label: destination.name, href: `/destinations/${destination.slug}` },
          ]}
        />
      </div>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Destinations', path: '/destinations' },
          { name: destination.name, path: `/destinations/${destination.slug}` },
        ])}
      />
      <JsonLd
        data={createDestinationSchema({
          description: destination.description,
          image: destination.image,
          name: destination.name,
          path: `/destinations/${destination.slug}`,
        })}
      />
      <DestinationDetailHero destination={destination} />
      <DestinationOverview destination={destination} />
      <DestinationSampleFlow destination={destination} />
      <DestinationPersonalization destination={destination} />
      <RelatedDestinationTours destination={destination} />
      <RelatedDestinations relatedDestinations={relatedDestinations} />
      <DestinationCta destination={destination} />
      <SiteFooter />
    </main>
  )
}
