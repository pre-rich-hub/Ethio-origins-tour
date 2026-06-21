import type { MetadataRoute } from 'next'
import { destinations } from '@/features/destinations'
import { tourCategories, tours } from '@/features/tours'
import { absoluteUrl } from '@/lib/seo/urls'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl('/'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: absoluteUrl('/destinations'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/tours'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/about'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: absoluteUrl('/blog'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: absoluteUrl('/contact'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: absoluteUrl('/gallery'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  const destinationPages: MetadataRoute.Sitemap = destinations.map((destination) => ({
    url: absoluteUrl(destination.seo.canonicalPath),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const categoryPages: MetadataRoute.Sitemap = tourCategories.map((category) => ({
    url: absoluteUrl(category.seo.canonicalPath),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const tourPages: MetadataRoute.Sitemap = tours.map((tour) => ({
    url: absoluteUrl(tour.seo.canonicalPath),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    ...staticPages,
    ...destinationPages,
    ...categoryPages,
    ...tourPages,
  ]
}
