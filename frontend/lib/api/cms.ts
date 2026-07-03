import { isPublishedCompletePost, posts } from '@/features/blog/data/posts'
import { destinations as fallbackDestinations } from '@/features/destinations/data/destinations'
import type { Destination } from '@/features/destinations/types/destination'
import { galleryImages } from '@/features/gallery/data/gallery-images'
import { tours as fallbackTours } from '@/features/tours/data/tours'
import type { Tour } from '@/features/tours/types/tour'
import { apiFetch, getPublicApiBaseUrl, isApiError } from './client'

type Paginated<T> = {
  items: T[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

type ApiDestination = {
  id: number
  name: string
  description: string | null
  imageUrl: string | null
  tourCount?: number
  tours?: ApiTour[]
}

type ApiGalleryImage = {
  id: number
  imageUrl: string | null
  tourId: number | null
}

type ApiTour = {
  id: number
  name: string
  description: string | null
  overview: string | null
  adultPrice: number | null
  childPrice: number | null
  rating: number | null
  noOfRates: number | null
  mainImage: string | null
  destination: ApiDestination | null
  categories: { id: number; name: string }[]
  gallery: ApiGalleryImage[]
  durationDays?: number
  included?: string[]
  excluded?: string[]
  itinerary?: unknown[]
  journeyMap?: string | null
  relatedTours?: ApiTour[]
  canonical?: { suggestedPath?: string; id?: number; slug?: string | null }
}

type ApiBlogPost = {
  id: number
  slug: string
  title: string
  description: string | null
  imageUrl: string | null
  category: { id: number; name: string; slug: string } | null
  createdAt: string | null
}

type ApiBlogCategory = {
  id: number
  name: string
  slug: string
  postCount: number
}

type ApiTestimonial = {
  id: number
  message: string
  reviewerName: string
  profession: string | null
}

export type CmsTestimonial = {
  id: number
  quote: string
  name: string
  experience: string
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function imageUrl(value: string | null | undefined, fallback: string) {
  if (!value) return fallback
  if (value.startsWith('http')) {
    try {
      const url = new URL(value)
      if (url.pathname.startsWith('/assets/')) {
        return `${url.pathname}${url.search}`
      }
    } catch {
      return fallback
    }

    return value
  }
  if (value.startsWith('/')) return value
  return `${getPublicApiBaseUrl()}/${value.replace(/^\/+/, '')}`
}

function mapApiBlogPost(post: ApiBlogPost) {
  const title = post.title?.trim()
  const slug = post.slug?.trim()
  const description = post.description?.trim()

  if (!title || !slug || !description) return null

  const paragraphs = description
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
  const excerpt = description.length > 180
    ? `${description.slice(0, 177).trimEnd()}...`
    : description
  const date = post.createdAt
    ? new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
      }).format(new Date(post.createdAt))
    : 'Travel Guide'

  return {
    slug,
    title,
    category: post.category?.name || 'Travel Insight',
    date,
    image: imageUrl(post.imageUrl, '/images/gallery-market.png'),
    excerpt,
    description,
    status: 'published' as const,
    contentStatus: 'complete' as const,
    body: paragraphs.map((text) => ({
      type: 'paragraph' as const,
      text,
    })),
    publishedAt: post.createdAt ?? undefined,
  }
}

function positivePrice(
  ...values: Array<number | null | undefined>
): number {
  for (const value of values) {
    const price = Number(value)
    if (Number.isFinite(price) && price > 0) return price
  }

  return 0
}

function findFallbackTour(apiTour: ApiTour) {
  const canonicalSlug = apiTour.canonical?.slug || apiTour.canonical?.suggestedPath?.split('/').filter(Boolean).at(-1)
  return (
    fallbackTours.find((tour) => tour.slug === canonicalSlug) ||
    fallbackTours.find((tour) => tour.title.toLowerCase() === apiTour.name.toLowerCase())
  )
}

function findFallbackDestination(apiDestination: ApiDestination) {
  return (
    fallbackDestinations.find((destination) => destination.name.toLowerCase() === apiDestination.name.toLowerCase()) ||
    fallbackDestinations.find((destination) => destination.slug === slugify(apiDestination.name))
  )
}

function normalizeItineraryItem(item: unknown, index: number) {
  if (typeof item === 'string') {
    return {
      day: index + 1,
      title: `Day ${index + 1}`,
      activities: item,
      overnight: 'Route plan detail',
    }
  }

  if (item && typeof item === 'object') {
    const value = item as Record<string, unknown>
    return {
      day: Number(value.day ?? index + 1),
      title: String(value.title ?? `Day ${index + 1}`),
      activities: String(value.activities ?? value.description ?? ''),
      overnight: String(value.overnight ?? 'Route plan detail'),
      meals: value.meals ? String(value.meals) : undefined,
    }
  }

  return {
    day: index + 1,
    title: `Day ${index + 1}`,
    activities: '',
    overnight: 'Route plan detail',
  }
}

export function mapApiTour(apiTour: ApiTour): Tour {
  const matchedFallback = findFallbackTour(apiTour)
  const template = matchedFallback ?? fallbackTours[0]
  const slug =
    apiTour.canonical?.slug ||
    apiTour.canonical?.suggestedPath?.split('/').filter(Boolean).at(-1) ||
    slugify(apiTour.name) ||
    String(apiTour.id)
  const gallery = apiTour.gallery
    .map((image) => imageUrl(image.imageUrl, ''))
    .filter(Boolean)
  const itinerary = apiTour.itinerary?.length
    ? apiTour.itinerary.map(normalizeItineraryItem)
    : matchedFallback?.itinerary ?? template.itinerary
  const durationDays = apiTour.durationDays || itinerary.length
  const destination = apiTour.destination?.name ?? matchedFallback?.destination ?? 'Ethiopia'
  const categorySlugs = apiTour.categories.map((category) => slugify(category.name)).filter(Boolean)
  const description = apiTour.description || apiTour.overview || matchedFallback?.description || `Explore ${destination} with Ethio Origins Tour.`
  const moments = itinerary.map((day) => day.title).filter(Boolean)
  const highlights = apiTour.categories.map((category) => category.name).filter(Boolean).join(' · ') || destination

  return {
    ...template,
    id: apiTour.id,
    slug,
    title: apiTour.name,
    image: imageUrl(apiTour.mainImage, template.image),
    imageAlt: `${apiTour.name} in ${destination}`,
    gallery: gallery.length ? gallery : template.gallery,
    duration: durationDays > 0 ? `${durationDays} Day${durationDays === 1 ? '' : 's'}` : 'Custom itinerary',
    region: destination,
    highlights,
    description,
    intro: apiTour.overview || description,
    adultPrice: positivePrice(apiTour.adultPrice, matchedFallback?.adultPrice),
    childPrice: positivePrice(apiTour.childPrice, matchedFallback?.childPrice),
    rating: apiTour.rating ?? 0,
    reviewCount: apiTour.noOfRates ?? 0,
    destination,
    bestFor: highlights,
    moments: moments.length ? moments : [destination, ...apiTour.categories.map((category) => category.name)],
    included: apiTour.included ?? matchedFallback?.included ?? [],
    excluded: apiTour.excluded ?? matchedFallback?.excluded ?? [],
    itinerary,
    journeyMap: apiTour.journeyMap ?? matchedFallback?.journeyMap,
    destinationSlugs: apiTour.destination ? [slugify(apiTour.destination.name)] : [],
    categorySlugs,
    seo: {
      ...template.seo,
      title: apiTour.name,
      description,
      canonicalPath: `/tours/${slug}`,
      noIndex: false,
    },
  } as unknown as Tour
}

export function mapApiDestination(apiDestination: ApiDestination): Destination {
  const fallback = findFallbackDestination(apiDestination) ?? fallbackDestinations[0]
  const description = (apiDestination.description || fallback.description).replace(
    /\bAksum\b/g,
    'Axum',
  )
  const name = apiDestination.name.replace(/\bAksum\b/g, 'Axum')

  return {
    ...fallback,
    slug: fallback?.slug ?? String(apiDestination.id),
    name,
    image: imageUrl(apiDestination.imageUrl, fallback.image),
    shortDescription: description,
    overview: description,
    description,
    intro: description,
  }
}

function safeMapApiTour(apiTour: ApiTour): Tour | null {
  try {
    return mapApiTour(apiTour)
  } catch {
    return null
  }
}

export async function getTours() {
  const data = await apiFetch<Paginated<ApiTour> | ApiTour[] | null>(
    '/api/v1/tours?limit=100',
    {
      fallback: null,
      timeoutMs: 15000,
      next: { revalidate: 0 },
    },
  )
  const items = Array.isArray(data)
    ? data
    : Array.isArray(data?.items)
      ? data.items
      : []
  const apiTours = items
    .map(safeMapApiTour)
    .filter((tour): tour is Tour => tour !== null)

  return data === null ? fallbackTours : apiTours
}

export async function getFeaturedTours() {
  const data = await apiFetch<ApiTour[] | null>('/api/v1/tours/featured', {
    fallback: null,
    timeoutMs: 15000,
    next: { revalidate: 0 },
  })
  const apiTours = (Array.isArray(data) ? data : [])
    .map(safeMapApiTour)
    .filter((tour): tour is Tour => tour !== null)

  return data === null ? fallbackTours.slice(0, 6) : apiTours.slice(0, 6)
}

export async function getTourByRoute(route: string) {
  const fallback = fallbackTours.find((tour) => tour.slug === route)
  const id = Number(route)
  const path = !Number.isNaN(id)
    ? `/api/v1/tours/${id}`
    : `/api/v1/tours/slug/${route}`

  try {
    const data = await apiFetch<ApiTour | null>(path, {
      timeoutMs: 15000,
      next: { revalidate: 0 },
    })
    return data ? safeMapApiTour(data) ?? fallback : undefined
  } catch (error) {
    if (isApiError(error) && error.code === 'not_found') return undefined
    return fallback
  }
}

export async function getDestinations() {
  const data = await apiFetch<ApiDestination[]>('/api/destinations', { fallback: [] })
  return data.length ? data.map(mapApiDestination) : fallbackDestinations
}

export async function getFeaturedDestinations() {
  const data = await apiFetch<ApiDestination[]>('/api/destinations/featured', {
    fallback: [],
  })
  const apiDestinations = data.map(mapApiDestination)

  return [...apiDestinations, ...fallbackDestinations]
    .filter(
      (destination, index, allDestinations) =>
        allDestinations.findIndex((item) => item.slug === destination.slug) ===
        index,
    )
    .slice(0, 12)
}

export async function getDestinationByRoute(route: string) {
  const fallback = fallbackDestinations.find((destination) => destination.slug === route)
  const id = Number(route)

  if (!Number.isNaN(id)) {
    const data = await apiFetch<ApiDestination | null>(`/api/destinations/${id}`, {
      fallback: null,
    })
    return data ? mapApiDestination(data) : fallback
  }

  return fallback
}

export async function getGalleryImages() {
  const data = await apiFetch<ApiGalleryImage[]>('/api/gallery', { fallback: [] })

  if (!data.length) {
    return galleryImages
  }

  const apiImages = data.map((image, index) => ({
    src: imageUrl(image.imageUrl, galleryImages[index % galleryImages.length].src),
    alt: `Ethio Origins tour gallery image ${index + 1}`,
    title: `Travel Moment ${index + 1}`,
    place: 'Ethiopia',
  }))

  return [...apiImages, ...galleryImages].filter(
    (image, index, allImages) =>
      allImages.findIndex((item) => item.src === image.src) === index,
  )
}

export async function getTestimonials(): Promise<CmsTestimonial[]> {
  const data = await apiFetch<ApiTestimonial[]>('/api/v1/testimonials', {
    fallback: [],
    next: { revalidate: 0 },
  })

  return data.map((testimonial) => ({
    id: testimonial.id,
    quote: testimonial.message,
    name: testimonial.reviewerName,
    experience: testimonial.profession || 'Guest traveler',
  }))
}

export async function getBlogPosts() {
  const data = await apiFetch<Paginated<ApiBlogPost> | ApiBlogPost[] | null>(
    '/api/v1/blog?limit=100',
    {
      fallback: null,
      timeoutMs: 15000,
      next: { revalidate: 0 },
    },
  )
  const items = Array.isArray(data)
    ? data
    : Array.isArray(data?.items)
      ? data.items
      : []
  const apiPosts = items
    .map(mapApiBlogPost)
    .filter((post): post is NonNullable<ReturnType<typeof mapApiBlogPost>> =>
      post !== null,
    )

  if (data === null) return posts

  return [...apiPosts, ...posts].filter(
    (post, index, allPosts) =>
      allPosts.findIndex((item) => item.slug === post.slug) === index,
  )
}

export async function getBlogPostBySlug(slug: string) {
  const fallback = posts.find(
    (post) => post.slug === slug && isPublishedCompletePost(post),
  )

  try {
    const data = await apiFetch<ApiBlogPost | null>(`/api/v1/blog/slug/${slug}`, {
      timeoutMs: 15000,
      next: { revalidate: 0 },
    })
    return data ? mapApiBlogPost(data) : null
  } catch (error) {
    if (isApiError(error) && error.code === 'not_found') return null
    if (!fallback) return null

    return {
      slug: fallback.slug,
      title: fallback.title,
      category: fallback.category,
      date: fallback.date,
      image: fallback.image,
      excerpt: fallback.excerpt,
      description: fallback.body?.map((block) => {
        if (block.type === 'list') return block.items.join('\n')
        return block.text
      }).join('\n\n') || fallback.excerpt,
      body: fallback.body,
      author: fallback.author,
      publishedAt: fallback.publishedAt,
      updatedAt: fallback.updatedAt,
    }
  }
}

export async function getBlogCategories() {
  const data = await apiFetch<ApiBlogCategory[]>('/api/blog/categories', { fallback: [] })
  return data
}
