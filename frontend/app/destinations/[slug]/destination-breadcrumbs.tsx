'use client'

import { Breadcrumbs } from '@/components/seo/breadcrumbs'
import { getLocalizedDestination } from '@/features/destinations/lib/destination-localization'
import { useLanguage } from '@/lib/i18n/language'
import type { Destination } from '@/features/destinations'

export function DestinationBreadcrumbs({
  destination,
}: {
  destination: Destination
}) {
  const { language, t } = useLanguage()
  const localizedDestination = getLocalizedDestination(destination, language)

  return (
    <div className="mx-auto max-w-7xl px-4 pb-5 pt-28 sm:px-6 md:px-8 md:pt-32">
      <Breadcrumbs
        items={[
          { label: t.destinationsPage.breadcrumbsHome, href: '/' },
          {
            label: t.destinationsPage.breadcrumbsDestinations,
            href: '/destinations',
          },
          {
            label: localizedDestination.name,
            href: `/destinations/${destination.slug}`,
          },
        ]}
      />
    </div>
  )
}
