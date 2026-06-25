'use client'

import { Breadcrumbs } from '@/components/seo/breadcrumbs'
import { useLanguage } from '@/lib/i18n/language'
import type { TourCategory } from '@/features/tours/data/tour-categories'
import {
  getLocalizedTour,
  getLocalizedTourCategory,
} from '@/features/tours/lib/tour-localization'
import type { Tour } from '@/features/tours/types/tour'

type TourBreadcrumbsProps = {
  currentHref: string
} & (
  | {
      category: TourCategory
      tour?: never
    }
  | {
      category?: never
      tour: Tour
    }
)

export function TourBreadcrumbs({
  category,
  currentHref,
  tour,
}: TourBreadcrumbsProps) {
  const { language, t } = useLanguage()
  const currentLabel = category
    ? getLocalizedTourCategory(category, language).name
    : getLocalizedTour(tour, language).title

  return (
    <Breadcrumbs
      items={[
        { label: t.toursPage.breadcrumbsHome, href: '/' },
        { label: t.toursPage.breadcrumbsTours, href: '/tours' },
        { label: currentLabel, href: currentHref },
      ]}
    />
  )
}
