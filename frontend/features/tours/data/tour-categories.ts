import type { SeoData } from '@/lib/seo/seo-types'

export type TourCategory = {
  slug: string
  name: string
  description: string
  seo: SeoData
}

export const tourCategories: TourCategory[] = [
  {
    slug: 'cultural-tours',
    name: 'Ethiopia Cultural Tours',
    description:
      'Cultural journeys focused on local communities, markets, living traditions, food, music and heritage encounters.',
    seo: {
      title: 'Ethiopia Cultural Tours & Local Experiences',
      description:
        'Discover Ethiopia cultural tours featuring local communities, markets, festivals, traditional food and meaningful heritage experiences.',
      canonicalPath: '/tours/cultural-tours',
      primaryKeyword: 'Ethiopia Cultural Tours',
      secondaryKeywords: [
        'Ethiopia Cultural Experiences',
        'Omo Valley Cultural Tours',
        'Ethiopia Heritage Tours',
      ],
    },
  },
  {
    slug: 'historical-tours',
    name: 'Ethiopia Historical Tours',
    description:
      'Heritage packages through ancient cities, sacred architecture, rock-hewn churches and northern historical routes.',
    seo: {
      title: 'Ethiopia Historical Tours & Heritage Packages',
      description:
        "Explore Ethiopia's ancient kingdoms, historic cities, rock-hewn churches and heritage sites through locally guided historical tour packages.",
      canonicalPath: '/tours/historical-tours',
      primaryKeyword: 'Ethiopia Historical Tours',
      secondaryKeywords: [
        'Ethiopia Heritage Tours',
        'Historic Route Ethiopia',
        'Historical Tour Packages Ethiopia',
      ],
    },
  },
  {
    slug: 'nature-adventure-tours',
    name: 'Ethiopia Adventure Tours',
    description:
      'Active nature trips across mountains, volcanic landscapes, national parks, wildlife areas and outdoor routes.',
    seo: {
      title: 'Ethiopia Adventure Tours & Nature Experiences',
      description:
        'Explore Ethiopia adventure tours featuring volcanic landscapes, mountain trekking, national parks, wildlife and active outdoor journeys.',
      canonicalPath: '/tours/nature-adventure-tours',
      primaryKeyword: 'Ethiopia Adventure Tours',
      secondaryKeywords: [
        'Ethiopia Nature Tours',
        'Ethiopian Adventure Travel',
        'Explore Ethiopia Tours',
      ],
    },
  },
  {
    slug: 'trekking-hiking-tours',
    name: 'Ethiopia Trekking & Hiking Tours',
    description:
      'Guided trekking and hiking routes in Ethiopia’s highlands, mountains and scenic national parks.',
    seo: {
      title: 'Ethiopia Trekking & Hiking Tours',
      description:
        'Explore Ethiopia trekking tours in the Simien and Bale Mountains with guided routes, dramatic landscapes and multi-day hiking experiences.',
      canonicalPath: '/tours/trekking-hiking-tours',
      primaryKeyword: 'Ethiopia Trekking Tours',
      secondaryKeywords: [
        'Ethiopia Hiking Tours',
        'Simien Mountains Trekking',
        'Bale Mountains Trekking',
      ],
    },
  },
  {
    slug: 'wildlife-tours',
    name: 'Ethiopia Wildlife Tours',
    description:
      'Nature-focused journeys featuring endemic wildlife, birdlife, national parks and mountain habitats.',
    seo: {
      title: 'Ethiopia Wildlife Tours & Nature Experiences',
      description:
        "Discover Ethiopia's endemic wildlife, national parks, mountain landscapes and birdlife through guided wildlife and nature tours.",
      canonicalPath: '/tours/wildlife-tours',
      primaryKeyword: 'Ethiopia Wildlife Tours',
      secondaryKeywords: [
        'Ethiopia Nature Tours',
        'Ethiopia Wildlife Safaris',
        'Endemic Wildlife Ethiopia',
      ],
    },
  },
  {
    slug: 'coffee-tours',
    name: 'Ethiopia Coffee Tours',
    description:
      'Coffee-origin journeys with ceremonies, farming communities, regional food and Ethiopia’s coffee heritage.',
    seo: {
      title: 'Ethiopia Coffee Tours & Origin Experiences',
      description:
        'Discover the origin of Ethiopian coffee through farm visits, local traditions, coffee ceremonies and guided cultural tour packages.',
      canonicalPath: '/tours/coffee-tours',
      primaryKeyword: 'Ethiopia Coffee Tour',
      secondaryKeywords: [
        'Ethiopia Coffee Tour Package',
        'Ethiopian Coffee Origin Tour',
        'Ethiopia Coffee Experiences',
      ],
    },
  },
  {
    slug: 'photography-tours',
    name: 'Ethiopia Photography Tours',
    description:
      'Photography-aware routes for landscapes, heritage sites, wildlife and consent-first cultural storytelling.',
    seo: {
      title: 'Ethiopia Photography Tours & Photo Trips',
      description:
        'Join guided Ethiopia photography tours featuring landscapes, heritage sites, wildlife and cultural experiences with carefully planned shooting opportunities.',
      canonicalPath: '/tours/photography-tours',
      primaryKeyword: 'Ethiopia Photography Tours',
      secondaryKeywords: [
        'Ethiopia Photo Tours',
        'Omo Valley Photography Tours',
        'Ethiopia Landscape Photography Tours',
      ],
    },
  },
  {
    slug: 'city-tours',
    name: 'Ethiopia City Tours',
    description:
      'Guided city experiences featuring museums, markets, historic landmarks, coffee and local food.',
    seo: {
      title: 'Ethiopia City Tours & Sightseeing Experiences',
      description:
        "Discover Ethiopia's cities through guided sightseeing tours featuring museums, markets, historic landmarks, local food and cultural attractions.",
      canonicalPath: '/tours/city-tours',
      primaryKeyword: 'Ethiopia Sightseeing Tours',
      secondaryKeywords: [
        'Ethiopia City Tours',
        'Addis Ababa City Tours',
        'Ethiopia Guided City Tours',
      ],
    },
  },
  {
    slug: 'private-customized-tours',
    name: 'Private & Customized Tours in Ethiopia',
    description:
      'Private and tailor-made Ethiopia tours designed around traveler dates, pace, interests and comfort level.',
    seo: {
      title: 'Private & Customized Tours in Ethiopia',
      description:
        'Plan a private Ethiopia tour designed around your dates, interests, travel style and preferred destinations with support from local travel experts.',
      canonicalPath: '/tours/private-customized-tours',
      primaryKeyword: 'Private Tours Ethiopia',
      secondaryKeywords: [
        'Ethiopia Customized Tours',
        'Tailor-Made Ethiopia Tours',
        'Ethiopia Travel Planner',
        'Ethiopia Holiday Planner',
      ],
    },
  },
]
