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
      ogImage: '/images/exp-omo.png',
      ogImageAlt: 'Omo Valley cultural travel experience',
    },
  },
  {
    slug: 'omo-valley-tours',
    name: 'Omo Valley Tours',
    description:
      'Responsible Omo Valley cultural tours through southern Ethiopia communities, river landscapes, markets and local heritage routes.',
    seo: {
      title: 'Omo Valley Tours & Cultural Adventures',
      description:
        'Explore Omo Valley tours featuring Mursi, Hamer, Karo, Dassanech, Ari and other Southern Ethiopia cultural experiences.',
      canonicalPath: '/tours/omo-valley-tours',
      primaryKeyword: 'Omo Valley Tours',
      secondaryKeywords: [
        'Omo Valley Cultural Tour',
        'Mursi Hamer Karo Tour',
        'Southern Ethiopia Tour',
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
      ogImage: '/images/client/custom/lalibela.jpg',
      ogImageAlt: 'Lalibela heritage site in northern Ethiopia',
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
      ogImage: '/images/exp-danakil.png',
      ogImageAlt: 'Danakil Depression adventure landscape',
    },
  },
  {
    slug: 'southern-ethiopia-tours',
    name: 'Southern Ethiopia Tours',
    description:
      'Southern Ethiopia journeys combining Omo Valley cultures, Rift Valley lakes, Dorze villages, Konso heritage and Bale Mountains wildlife.',
    seo: {
      title: 'Southern Ethiopia Tours',
      description:
        'Plan Southern Ethiopia tours through the Omo Valley, Konso, Dorze, Hawassa, Rift Valley landscapes and Bale Mountains National Park.',
      canonicalPath: '/tours/southern-ethiopia-tours',
      primaryKeyword: 'Southern Ethiopia Tour',
      secondaryKeywords: [
        'Omo Valley and Bale Mountains Adventure',
        'Ethiopia Tribal and Wildlife Tour',
        'Ethiopia Cultural Adventure Tour',
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
      ogImage: '/images/exp-simien.png',
      ogImageAlt: 'Simien Mountains trekking landscape',
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
      ogImage: '/images/exp-bale.png',
      ogImageAlt: 'Bale Mountains wildlife route',
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
      ogImage: '/images/gallery-coffee.png',
      ogImageAlt: 'Traditional Ethiopian coffee ceremony',
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
      ogImage: '/images/exp-omo.png',
      ogImageAlt: 'Omo Valley photography route',
    },
  },
  {
    slug: 'birdwatching-tours',
    name: 'Ethiopia Birdwatching Tours',
    description:
      'Guided birdwatching tours and nature excursions featuring lakes, highland habitats, endemic species and photography-friendly routes.',
    seo: {
      title: 'Ethiopia Birdwatching Tours',
      description:
        'Explore Ethiopia birdwatching tours featuring highland lakes, nature day trips, endemic birdlife and guided scenic routes.',
      canonicalPath: '/tours/birdwatching-tours',
      primaryKeyword: 'Ethiopia Birdwatching Tours',
      secondaryKeywords: [
        'Ethiopia Birding Tours',
        'Wonchi Birdwatching Tour',
        'Ethiopia Nature Tours',
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
      ogImage: '/images/gallery-market.png',
      ogImageAlt: 'Addis Ababa market and city culture',
    },
  },
  {
    slug: 'addis-ababa-excursions',
    name: 'Addis Ababa Excursions',
    description:
      'Private excursions from Addis Ababa to nearby nature, culture, history and scenic highland destinations.',
    seo: {
      title: 'Addis Ababa Excursions & Day Trips',
      description:
        'Plan Addis Ababa excursions and private day trips to nearby crater lakes, monasteries, historic sites and scenic highland landscapes.',
      canonicalPath: '/tours/addis-ababa-excursions',
      primaryKeyword: 'Addis Ababa Excursions',
      secondaryKeywords: [
        'Addis Ababa Day Trips',
        'Wonchi Day Trip from Addis Ababa',
        'Addis Ababa Nature Day Tour',
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
    slug: 'ethiopia-historic-route-tours',
    name: 'Ethiopia Historic Route Tours',
    description:
      'Northern Ethiopia heritage tours linking Bahir Dar, Lake Tana, Gondar, Lalibela, Aksum and other historic route highlights.',
    seo: {
      title: 'Ethiopia Historic Route Tours',
      description:
        'Explore Ethiopia historic route tours through Bahir Dar, Lake Tana, Gondar, Lalibela, Aksum and northern UNESCO heritage sites.',
      canonicalPath: '/tours/ethiopia-historic-route-tours',
      primaryKeyword: 'Ethiopia Historic Route Tour',
      secondaryKeywords: [
        'Northern Ethiopia Historical Tour',
        'Bahir Dar Gondar Lalibela Axum Tour',
        'Ethiopia UNESCO Heritage Tour',
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
      ogImage: '/images/custom.png',
      ogImageAlt: 'Customized Ethiopia private journey',
    },
  },
]
