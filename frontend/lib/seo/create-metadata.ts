import type { Metadata } from 'next'
import { siteConfig } from './site-config'
import type { SeoData } from './seo-types'
import { absoluteUrl } from './urls'

type CreateMetadataInput = SeoData & {
  type?: 'website' | 'article'
}

export function createMetadata({
  title,
  description,
  canonicalPath,
  ogImage,
  ogImageAlt,
  noIndex,
  type = 'website',
}: CreateMetadataInput): Metadata {
  const image = ogImage || siteConfig.defaultOgImage

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type,
      locale: siteConfig.locale,
      url: absoluteUrl(canonicalPath),
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: ogImageAlt || `${siteConfig.name} travel experience in Ethiopia`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
    },
  }
}

export function createNotFoundMetadata(title = 'Page Not Found'): Metadata {
  const description =
    'The requested Ethio Origins Tour page could not be found.'

  return {
    title,
    description,
    alternates: {
      canonical: '/404',
    },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale,
      url: absoluteUrl('/404'),
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: siteConfig.defaultOgImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} Ethiopia tours`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteConfig.defaultOgImage],
    },
    robots: {
      index: false,
      follow: false,
    },
  }
}
