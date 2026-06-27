import { siteConfig } from './site-config'
import { absoluteUrl } from './urls'

type BreadcrumbItem = {
  name: string
  path: string
}

function compactObject<T extends Record<string, unknown>>(value: T) {
  return Object.fromEntries(
    Object.entries(value).filter(([, entry]) => {
      if (Array.isArray(entry)) {
        return entry.length > 0
      }

      return entry !== undefined && entry !== null && entry !== ''
    }),
  )
}

export function createOrganizationSchema() {
  const sameAs = Object.values(siteConfig.social).filter(Boolean)

  return compactObject({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': absoluteUrl('/#organization'),
    name: siteConfig.name,
    alternateName: siteConfig.alternateNames,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.logo),
    description: siteConfig.description,
    telephone: siteConfig.contact.phones,
    email: siteConfig.contact.email,
    address: siteConfig.contact.address,
    sameAs,
  })
}

export function createTravelAgencySchema() {
  const sameAs = Object.values(siteConfig.social).filter(Boolean)

  return compactObject({
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': absoluteUrl('/#travel-agency'),
    name: siteConfig.name,
    alternateName: siteConfig.alternateNames,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.logo),
    description: siteConfig.description,
    telephone: siteConfig.contact.phones,
    email: siteConfig.contact.email,
    address: siteConfig.contact.address,
    sameAs,
    parentOrganization: { '@id': absoluteUrl('/#organization') },
  })
}

export function createWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    alternateName: siteConfig.alternateNames,
    url: siteConfig.url,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
  }
}

export function createFaqSchema(items: readonly { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function createBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function createTourSchema({
  description,
  image,
  name,
  path,
}: {
  description: string
  image: string
  name: string
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name,
    description,
    image: absoluteUrl(image),
    url: absoluteUrl(path),
    provider: {
      '@type': 'TravelAgency',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  }
}

export function createDestinationSchema({
  description,
  image,
  name,
  path,
}: {
  description: string
  image: string
  name: string
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name,
    description,
    image: absoluteUrl(image),
    url: absoluteUrl(path),
  }
}
