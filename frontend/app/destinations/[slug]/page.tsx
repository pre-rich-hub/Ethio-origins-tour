import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { Navbar } from '@/components/layout/navbar'
import { SiteFooter } from '@/components/layout/site-footer'
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
} from '@/features/destinations'
import { getDestinationByRoute } from '@/lib/api/cms'
import {
  createMetadata,
  createNotFoundMetadata,
} from '@/lib/seo/create-metadata'
import {
  createBreadcrumbSchema,
  createDestinationSchema,
} from '@/lib/seo/schemas'
import { DestinationBreadcrumbs } from './destination-breadcrumbs'

type DestinationPageProps = {
  params: Promise<{
    slug: string
  }>
}

const destinationRedirects: Record<string, string> = {
  'lalibela-and-the-north': 'lalibela',
  'lalibela-rock-hewn-church': 'lalibela',
  'lalibela-rock-hewn-churches': 'lalibela',
  'lalibela-rock-hewn-churches-ethiopia': 'lalibela',
  'omo-valley-cultures': 'omo-valley',
  'wonchi-crater-lake': 'wenchi-crater-lake',
  'awash-and-rift-valley': 'awash-national-park',
  'bale-mountains': 'bale-mountains-national-park',
}

export function generateStaticParams() {
  return destinations.map((destination) => ({ slug: destination.slug }))
}

export async function generateMetadata({
  params,
}: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params

  if (destinationRedirects[slug]) {
    permanentRedirect(`/destinations/${destinationRedirects[slug]}`)
  }

  const destination = await getDestinationByRoute(slug)

  if (!destination) {
    return createNotFoundMetadata('Destination Not Found')
  }

  return createMetadata(destination.seo)
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { slug } = await params

  if (destinationRedirects[slug]) {
    permanentRedirect(`/destinations/${destinationRedirects[slug]}`)
  }

  const destination = await getDestinationByRoute(slug)

  if (!destination) {
    notFound()
  }

  const relatedDestinations = destinations
    .filter((item) => item.slug !== destination.slug)
    .sort((a, b) => {
      if (a.category === destination.category && b.category !== destination.category) {
        return -1
      }

      if (a.category !== destination.category && b.category === destination.category) {
        return 1
      }

      return 0
    })
    .slice(0, 3)

  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <DestinationBreadcrumbs destination={destination} />
      <JsonLd
        data={createBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Destinations', path: '/destinations' },
          { name: destination.name, path: `/destinations/${destination.slug}` },
        ])}
      />
      {destination.indexable ? (
        <JsonLd
          data={createDestinationSchema({
            description: destination.description,
            image: destination.image,
            name: destination.name,
            path: `/destinations/${destination.slug}`,
          })}
        />
      ) : null}
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
