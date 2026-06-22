import type { SeoData } from '@/lib/seo/seo-types'

export type TourCategory = {
  slug: string
  name: string
  description: string
  seo: SeoData
}

export const tourCategories: TourCategory[] = [
  {
    slug: 'day-tours',
    name: 'Ethiopia Day Tours',
    description:
      'Short guided day tours and excursions from Addis Ababa and other gateways, focused on culture, history, nature and nearby landmarks.',
    seo: {
      title: 'Ethiopia Day Tours & Excursions',
      description:
        'Explore Ethiopia day tours and guided excursions from Addis Ababa featuring monasteries, historic bridges, landscapes and local culture.',
      canonicalPath: '/tours/day-tours',
      primaryKeyword: 'Ethiopia Day Tours',
      secondaryKeywords: [
        'Addis Ababa Day Tour',
        'Ethiopia Day Trips',
        'Debre Libanos Day Tour',
      ],
    },
  },
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
    slug: 'religious-pilgrimage-tours',
    name: 'Religious & Pilgrimage Tours',
    description:
      'Faith-focused journeys through sacred sites, pilgrimage routes, Orthodox traditions and religious heritage experiences.',
    seo: {
      title: 'Ethiopia Religious & Pilgrimage Tours',
      description:
        'Explore Ethiopia religious and pilgrimage tours featuring sacred sites, Orthodox traditions, Lalibela churches and spiritual heritage experiences.',
      canonicalPath: '/tours/religious-pilgrimage-tours',
      primaryKeyword: 'Ethiopia Religious Tours',
      secondaryKeywords: [
        'Ethiopia Pilgrimage Tours',
        'Lalibela Pilgrimage Tour',
        'Ethiopia Religious Festival Tour',
      ],
    },
  },
  {
    slug: 'ethiopia-holiday-packages',
    name: 'Ethiopia Holiday Packages',
    description:
      'Curated Ethiopia holiday packages combining history, culture, religious heritage, scenic landscapes and private travel support.',
    seo: {
      title: 'Ethiopia Holiday Packages & Vacation Tours',
      description:
        'Explore Ethiopia holiday packages featuring Addis Ababa, Bahir Dar, Gondar, Lalibela and guided cultural vacation routes.',
      canonicalPath: '/tours/ethiopia-holiday-packages',
      primaryKeyword: 'Ethiopia Holiday Packages',
      secondaryKeywords: [
        'Ethiopia Vacation Package',
        'Northern Ethiopia Tour',
        'Ethiopia Cultural Holiday',
      ],
    },
  },
  {
    slug: 'festival-tours',
    name: 'Ethiopia Festival Tours',
    description:
      'Festival journeys centered on cultural celebrations, religious ceremonies, seasonal gatherings and living traditions.',
    seo: {
      title: 'Ethiopia Festival Tours & Cultural Celebrations',
      description:
        'Discover Ethiopia festival tours featuring Genna, Timkat, Meskel and cultural celebrations with locally guided experiences.',
      canonicalPath: '/tours/festival-tours',
      primaryKeyword: 'Ethiopia Festival Tours',
      secondaryKeywords: [
        'Lalibela Genna Festival Tour',
        'Ethiopian Christmas Tour',
        'Ethiopia Cultural Festivals',
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
    slug: 'nature-tours',
    name: 'Ethiopia Nature Tours',
    description:
      'Nature-focused Ethiopia tours featuring highland landscapes, gorges, waterfalls, birdlife, wildlife viewpoints and scenic walking routes.',
    seo: {
      title: 'Ethiopia Nature Tours & Scenic Trips',
      description:
        'Explore Ethiopia nature tours featuring scenic highlands, gorges, waterfalls, birdlife, wildlife viewpoints and guided outdoor routes.',
      canonicalPath: '/tours/nature-tours',
      primaryKeyword: 'Ethiopia Nature Tours',
      secondaryKeywords: [
        'Jemma River Gorge Tour',
        'Ethiopia Wildlife Day Trip',
        'Ethiopia Scenic Tours',
      ],
    },
  },
  {
    slug: 'nature-geological-tours',
    name: 'Nature and Geological Tours',
    description:
      'Guided Ethiopia tours focused on geological wonders, volcanic landscapes, geothermal fields, salt flats and dramatic natural formations.',
    seo: {
      title: 'Ethiopia Nature and Geological Tours',
      description:
        'Explore Ethiopia nature and geological tours featuring Danakil Depression, Erta Ale, Dallol, salt flats and volcanic landscapes.',
      canonicalPath: '/tours/nature-geological-tours',
      primaryKeyword: 'Ethiopia Geological Tours',
      secondaryKeywords: [
        'Danakil Depression Tours',
        'Erta Ale Volcano Tour',
        'Dallol Tour Ethiopia',
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
    slug: 'unesco-heritage-tours',
    name: 'UNESCO Heritage Tours',
    description:
      'Ethiopia tours centered on UNESCO World Heritage Sites, historic cities, sacred monuments, cultural landscapes and preserved living traditions.',
    seo: {
      title: 'Ethiopia UNESCO Heritage Tours',
      description:
        'Explore Ethiopia UNESCO heritage tours featuring Harar Jugol, Lalibela, Gondar, Aksum and guided historical cultural routes.',
      canonicalPath: '/tours/unesco-heritage-tours',
      primaryKeyword: 'Ethiopia UNESCO Heritage Tours',
      secondaryKeywords: [
        'Harar UNESCO Tour',
        'Ethiopia Heritage Tours',
        'Historic Ethiopia Tours',
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
