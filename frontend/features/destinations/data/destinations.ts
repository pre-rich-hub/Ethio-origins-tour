import type { Destination, DestinationCategory } from '../types/destination'

// Fallback asset used only when no approved destination-specific image exists yet.
const TEMPORARY_DESTINATION_IMAGE =
  'https://res.cloudinary.com/divimnzxa/image/upload/v1782244137/Ancient_Wonders_The_Monolithic_Rock-Cut_Church_of_Lalibela_Ethiopia_gh7iwx.jpg'

type DestinationSeed = {
  name: string
  slug: string
  category: DestinationCategory
  categoryLabel: string
  region: string
  image?: string
  imageAlt?: string
  shortDescription?: string
  overview?: string
  highlights?: string[]
  itinerary?: string[]
  bestFor?: string
  relatedTourSlugs?: string[]
  relatedDestinationSlugs?: string[]
  travelTips?: string[]
  culturalNotes?: string[]
  faq?: Array<{
    question: string
    answer: string
  }>
  seoTitle?: string
  seoDescription?: string
  primaryKeyword?: string
  secondaryKeywords?: string[]
  contentStatus?: 'complete' | 'partial' | 'thin'
  indexable?: boolean
}

const destinationCopyByCategory: Record<
  DestinationCategory,
  {
    shortDescription: (name: string, region: string) => string
    overview: (name: string, region: string) => string
    highlights: (name: string, region: string) => string[]
    itinerary: (name: string, region: string) => string[]
    bestFor: string
  }
> = {
  'historical-religious': {
    shortDescription: (name, region) =>
      `${name} is a meaningful heritage stop in ${region}, shaped by Ethiopia's faith traditions, historic routes, architecture, and local memory.`,
    overview: (name, region) =>
      `Explore ${name} with context-rich guiding that connects the site to ${region}'s religious heritage, royal history, local communities, and wider Ethiopian travel routes.`,
    highlights: (name, region) => [
      `Guided interpretation of ${name}'s history, faith, and cultural importance`,
      `Time for photography, quiet observation, and respectful local encounters in ${region}`,
      'Flexible pacing that works as a focused visit or part of a longer historic route',
      'Practical support with timing, access, local etiquette, and onward travel planning',
    ],
    itinerary: (name, region) => [
      `Arrive in ${region} and meet your local guide`,
      `Visit ${name} with historical and cultural interpretation`,
      'Pause for photos, nearby viewpoints, or local community stops',
      'Continue to the next heritage site or return to your base',
    ],
    bestFor: 'History lovers, faith heritage, architecture, photography, and cultural context',
  },
  'lakes-scenic': {
    shortDescription: (name, region) =>
      `${name} offers a calm scenic break in ${region}, with lake views, open landscapes, birdlife, and relaxed nature-focused travel moments.`,
    overview: (name, region) =>
      `Plan ${name} as a gentle nature stop where travelers can slow down, enjoy ${region}'s scenery, add short walks or boat experiences where available, and connect the route with nearby towns or cultural sites.`,
    highlights: (name, region) => [
      `Scenic viewpoints and relaxed time around ${name}`,
      `Nature-focused travel through ${region}'s lake and highland landscapes`,
      'Good opportunities for photography, birdlife, fresh air, and slow pacing',
      'Easy pairing with nearby towns, cultural visits, or longer southern routes',
    ],
    itinerary: (name, region) => [
      `Travel through ${region} toward ${name}`,
      'Stop at the best viewpoints and lakeside areas',
      'Add a walk, boat ride, market stop, or nearby cultural visit when available',
      'Continue onward or return at an easy pace',
    ],
    bestFor: 'Scenic drives, soft nature, photography, birding, families, and relaxed itineraries',
  },
  'mountains-wildlife': {
    shortDescription: (name, region) =>
      `${name} brings travelers into ${region}'s wilder side, with mountain scenery, national-park landscapes, wildlife habitat, and fresh outdoor air.`,
    overview: (name, region) =>
      `Visit ${name} for a nature-forward journey through ${region}, balancing scenic drives, guided walks, wildlife viewing possibilities, and flexible outdoor time suited to the season and route conditions.`,
    highlights: (name, region) => [
      `Mountain, park, or wilderness scenery around ${name}`,
      `Guided nature time adapted to ${region}'s terrain and season`,
      'Wildlife, birding, viewpoints, and landscape photography where conditions allow',
      'Careful planning around access, permits, driving times, and comfort level',
    ],
    itinerary: (name, region) => [
      `Enter ${region} and continue toward ${name}`,
      'Meet local guides or park staff where required',
      'Enjoy viewpoints, nature walks, game drives, or wildlife stops',
      'Return to the main route or continue deeper into the highlands',
    ],
    bestFor: 'Nature, wildlife, trekking, birding, mountain scenery, and outdoor photography',
  },
  'adventure-geological': {
    shortDescription: (name, region) =>
      `${name} is an adventurous geological destination in ${region}, known for dramatic terrain, unusual landscapes, and expedition-style travel.`,
    overview: (name, region) =>
      `Experience ${name} with careful logistics, local support, and realistic pacing through ${region}'s rugged environment, making room for geology, desert scenery, caves, volcanic features, or remote landscapes as the route allows.`,
    highlights: (name, region) => [
      `Distinctive geological scenery and adventure travel around ${name}`,
      `Locally supported logistics across ${region}'s remote or rugged terrain`,
      'Strong photo opportunities during cooler hours and key landscape stops',
      'Route planning that prioritizes safety, timing, permits, and conditions',
    ],
    itinerary: (name, region) => [
      `Briefing and departure toward ${name} in ${region}`,
      'Travel with local support through the main access route',
      'Explore the key geological, desert, cave, or wildlife features',
      'Return safely or continue to the next expedition stop',
    ],
    bestFor: 'Adventure travel, geology, remote landscapes, photography, and expedition routes',
  },
  'tribal-cultural': {
    shortDescription: (name, region) =>
      `${name} is a cultural gateway in ${region}, offering respectful community encounters, market life, local traditions, and regional travel connections.`,
    overview: (name, region) =>
      `Travel to ${name} with local guidance that centers respect, consent, and cultural context while connecting travelers with ${region}'s communities, landscapes, markets, and daily life.`,
    highlights: (name, region) => [
      `Respectful cultural encounters connected to ${name}`,
      `Market, village, craft, or community experiences shaped by ${region}'s local rhythm`,
      'Guidance on etiquette, photography consent, and meaningful interaction',
      'Flexible overland pacing that links naturally with nearby southern or regional routes',
    ],
    itinerary: (name, region) => [
      `Arrive in ${region} and continue toward ${name}`,
      'Meet local guides or community hosts where appropriate',
      'Visit markets, villages, viewpoints, or cultural sites with respectful pacing',
      'Continue to the next cultural stop or return to your lodge',
    ],
    bestFor: 'Cultural immersion, markets, community visits, photography, and overland journeys',
  },
}

const destinationSeeds: DestinationSeed[] = [
  {
    name: 'Addis Ababa',
    slug: 'addis-ababa',
    primaryKeyword: 'Addis Ababa City Tours',
    secondaryKeywords: ['Addis Ababa Sightseeing Tours', 'Ethiopia City Tours'],
    category: 'historical-religious',
    categoryLabel: 'Historical and Religious Destinations',
    region: 'Central Ethiopia',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782309635/Ethiopian_Museum_of_Science_ugmsqk.jpg',
    imageAlt: 'Addis Ababa market and city culture',
    relatedTourSlugs: [
      '3-day-lalibela-genna-festival-tour',
      '20-day-ethiopia-historical-cultural-adventure',
      '6-day-ethiopia-holiday-package',
      '1-day-debre-libanos-portuguese-bridge-tour',
      '5-day-lalibela-danakil-depression-tour',
      '3-day-harar-cultural-historical-tour',
      'addis-ababa-full-day-city-tour',
      'wonchi-crater-lake-day-tour',
      '5-day-ethiopia-historic-route-tour',
      '10-day-omo-valley-bale-mountains-cultural-adventure',
      '12-day-historic-north-omo-valley-tour',
    ],
  },
  {
    name: 'Lalibela Rock-Hewn Churches',
    slug: 'lalibela',
    category: 'historical-religious',
    categoryLabel: 'Historical and Religious Destinations',
    region: 'Amhara Highlands',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782247186/Bet_Giyorgis_Rock-Hewn_Church_at_Lalibela___qffnvp.jpg',
    imageAlt: 'Historic northern Ethiopia landscape representing Lalibela heritage routes',
    shortDescription: 'Rock-hewn churches, monastic traditions, and highland landscapes shaped by centuries of faith and craft.',
    overview: 'Follow Ethiopia\'s historic northern route through sacred architecture, mountain views, and intimate cultural encounters around Lalibela.',
    highlights: [
      'Private guided visit to Lalibela Rock-Hewn Churches',
      'St. George Church and Medhane Alem Church',
      'Highland viewpoints, monasteries, and slow cultural stops',
      'Flexible pacing for photography, food, and local craft',
    ],
    itinerary: [
      'Addis Ababa arrival',
      'Lalibela churches',
      'Highland village time',
      'Return or northern extension',
    ],
    bestFor: 'History, architecture, faith heritage, and highland culture',
    relatedTourSlugs: [
      '3-day-lalibela-genna-festival-tour',
      '20-day-ethiopia-historical-cultural-adventure',
      '6-day-ethiopia-holiday-package',
      '5-day-lalibela-danakil-depression-tour',
      '5-day-ethiopia-historic-route-tour',
      '12-day-historic-north-omo-valley-tour',
    ],
    seoTitle: 'Lalibela Tours & Rock-Hewn Churches',
    seoDescription: 'Explore Lalibela rock-hewn churches with local guides on historical northern Ethiopia tours featuring highland culture and sacred heritage.',
    primaryKeyword: 'Lalibela Tour Packages',
    secondaryKeywords: [
      'Lalibela Tours',
      'Lalibela Tour Packages',
      'Lalibela Historical Tours',
      'Lalibela Guided Tours',
      'Lalibela Ethiopia Travel',
    ],
  },
  {
    name: 'Gondar',
    slug: 'gondar',
    primaryKeyword: 'Gondar Historical Tours',
    secondaryKeywords: ['Gondar Castle Tour', 'Northern Ethiopia Historical Tours'],
    category: 'historical-religious',
    categoryLabel: 'Historical and Religious Destinations',
    region: 'Amhara Highlands',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782308427/Gondar_Ethiopia_guosib.jpg',
    imageAlt: 'Gondar heritage route in northern Ethiopia',
    relatedTourSlugs: [
      '20-day-ethiopia-historical-cultural-adventure',
      '6-day-ethiopia-holiday-package',
      '5-day-ethiopia-historic-route-tour',
      '12-day-historic-north-omo-valley-tour',
    ],
  },
  {
    name: 'Aksum',
    slug: 'aksum',
    primaryKeyword: 'Axum Tours Ethiopia',
    secondaryKeywords: ['Aksum Historical Tours', 'Northern Ethiopia Heritage Tours'],
    category: 'historical-religious',
    categoryLabel: 'Historical and Religious Destinations',
    region: 'Tigray',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782247185/Ethiopia_Axum_ytphij.jpg',
    relatedTourSlugs: [
      '20-day-ethiopia-historical-cultural-adventure',
      '5-day-ethiopia-historic-route-tour',
    ],
  },
  {
    name: 'Harar',
    slug: 'harar',
    category: 'historical-religious',
    categoryLabel: 'Historical and Religious Destinations',
    region: 'Eastern Ethiopia',
    image:'https://res.cloudinary.com/divimnzxa/image/upload/v1782306410/Feeding_Wild_Hyenas_in_Harar_kciiku.jpg',
    relatedTourSlugs: [
      '20-day-ethiopia-historical-cultural-adventure',
      '3-day-harar-cultural-historical-tour',
    ],
  },
  {
    name: 'Tiya',
    slug: 'tiya',
    category: 'historical-religious',
    categoryLabel: 'Historical and Religious Destinations',
    region: 'Central Ethiopia',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782365607/Tiya_World_Heritage_Site_1_mskicc.jpg',
    relatedTourSlugs: [
      '10-day-omo-valley-bale-mountains-cultural-adventure',
    ],
  },
  {
    name: 'Konso Cultural Landscape',
    slug: 'konso-cultural-landscape',
    category: 'historical-religious',
    categoryLabel: 'Historical and Religious Destinations',
    region: 'Southern Ethiopia',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782365606/East_African_UNESCO_World_Heritage_Sites_2_kekg1b.jpg'
  },
  {
    name: 'Yeha Temple',
    slug: 'yeha-temple',
    category: 'historical-religious',
    categoryLabel: 'Historical and Religious Destinations',
    region: 'Tigray',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782365606/At_Yeha_Ethiopia__Temple_of_the_moon_e8wtsk.jpg',
    relatedTourSlugs: [
      '20-day-ethiopia-historical-cultural-adventure',
    ],
  },
  {
    name: 'Debre Damo Monastery',
    slug: 'debre-damo-monastery',
    category: 'historical-religious',
    categoryLabel: 'Historical and Religious Destinations',
    region: 'Tigray',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782367798/Debre_Damo_Monastery_1_stbkmb.jpg'
  },
  {
    name: 'Abuna Yemata Guh',
    slug: 'abuna-yemata-guh',
    category: 'historical-religious',
    categoryLabel: 'Historical and Religious Destinations',
    region: 'Tigray',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782365606/Abune_Yemata_Guh_Tigray_Ethiopia_jsubf3.jpg'
  },
  {
    name: 'Fasil Ghebbi',
    slug: 'fasil-ghebbi',
    category: 'historical-religious',
    categoryLabel: 'Historical and Religious Destinations',
    region: 'Gondar',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782367798/Site_-_Fasil_Ghebbi_-_Gondar_1_ailinf.jpg',
    imageAlt: 'Fasil Ghebbi and Gondar heritage route in Ethiopia',
    relatedTourSlugs: [
      '20-day-ethiopia-historical-cultural-adventure',
    ],
  },
  {
    name: 'Holy Trinity Cathedral',
    slug: 'holy-trinity-cathedral',
    category: 'historical-religious',
    categoryLabel: 'Historical and Religious Destinations',
    region: 'Addis Ababa',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782365605/Holy_Trinity_Cathedral_in_Addis_Ababa_Ethiopia_1_vz6gls.jpg',
    imageAlt: 'Addis Ababa city culture near Holy Trinity Cathedral',
    relatedTourSlugs: [
      'addis-ababa-full-day-city-tour',
    ],
  },
  {
    name: 'National Museum of Ethiopia',
    slug: 'national-museum-of-ethiopia',
    category: 'historical-religious',
    categoryLabel: 'Historical and Religious Destinations',
    region: 'Addis Ababa',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782309635/Ethiopian_Museum_of_Science_ugmsqk.jpg',
    imageAlt: 'Addis Ababa city culture near the National Museum of Ethiopia',
    relatedTourSlugs: [
      'addis-ababa-full-day-city-tour',
    ],
  },
  {
    name: 'St. George Church',
    slug: 'st-george-church',
    category: 'historical-religious',
    categoryLabel: 'Historical and Religious Destinations',
    region: 'Lalibela',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782365606/Africa___Church_of_St_George__Lalibela_Ethiopia_1_yw8f4i.jpg',
    imageAlt: 'Lalibela heritage route including St. George Church',
    relatedTourSlugs: [
      '3-day-lalibela-genna-festival-tour',
    ],
  },
  {
    name: 'Medhane Alem Church',
    slug: 'medhane-alem-church',
    category: 'historical-religious',
    categoryLabel: 'Historical and Religious Destinations',
    region: 'Lalibela',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782365605/Bole_Medhani_Alem_Saviour_of_the_world_Church__jkbj2f.jpg',
    imageAlt: 'Lalibela heritage route including Medhane Alem Church',
    relatedTourSlugs: [
      '3-day-lalibela-genna-festival-tour',
    ],
  },
  {
    name: 'Lake Tana',
    slug: 'lake-tana',
    category: 'lakes-scenic',
    categoryLabel: 'Lakes, Waterfalls, and Scenic Destinations',
    region: 'Bahir Dar',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782365605/Island_in_Lake_Tana_containing_monestary_Ethiopia_1_fufjqr.jpg',
    relatedTourSlugs: [
      '20-day-ethiopia-historical-cultural-adventure',
      '6-day-ethiopia-holiday-package',
      '5-day-ethiopia-historic-route-tour',
      '12-day-historic-north-omo-valley-tour',
    ],
  },
  {
    name: 'Blue Nile Falls',
    slug: 'blue-nile-falls',
    category: 'lakes-scenic',
    categoryLabel: 'Lakes, Waterfalls, and Scenic Destinations',
    region: 'Bahir Dar',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782365605/Blue_Nile_falls_-_Amhara_Region_-_Ethiopia_1_umv9ph.jpg',
    primaryKeyword: 'Blue Nile Falls Tours',
    relatedTourSlugs: [
      '20-day-ethiopia-historical-cultural-adventure',
      '6-day-ethiopia-holiday-package',
      '12-day-historic-north-omo-valley-tour',
    ],
  },
  {
    name: 'Lake Langano',
    slug: 'lake-langano',
    category: 'lakes-scenic',
    categoryLabel: 'Lakes, Waterfalls, and Scenic Destinations',
    region: 'Great Rift Valley',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782365607/At_Sabana_Lodge_Lake_Langano_Ethiopia_mjndgz.jpg',
    imageAlt: 'Rift Valley lake landscape in Ethiopia',
    relatedTourSlugs: [
      '12-day-historic-north-omo-valley-tour',
    ],
  },
  {
    name: 'Wenchi Crater Lake',
    slug: 'wenchi-crater-lake',
    category: 'lakes-scenic',
    categoryLabel: 'Lakes, Waterfalls, and Scenic Destinations',
    region: 'Central Ethiopia',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782311076/Crater_Lake_National_Park_Oregon_USA_a99k8d.jpg',
    imageAlt: 'Wenchi Crater Lake highland retreat near Addis Ababa',
    shortDescription: 'A restorative crater-lake journey with horseback trails, island monasteries, warm hospitality, and gentle highland views.',
    overview: 'Slow down near Addis Ababa with a short retreat around Wenchi Crater Lake, village trails, and island monastery.',
    highlights: [
      'Horseback or walking trails',
      'Boat ride across the crater lake',
      'Island monastery visit',
      'Short itinerary close to Addis Ababa',
    ],
    itinerary: [
      'Depart Addis',
      'Crater rim walk',
      'Lake and monastery',
      'Return to Addis',
    ],
    bestFor: 'Short escapes, families, gentle nature, and lake views',
    relatedTourSlugs: [
      'wonchi-crater-lake-day-tour',
    ],
    seoTitle: 'Wenchi Crater Lake Tours & Retreats',
    seoDescription: 'Plan a Wenchi Crater Lake retreat with guided walks, lake views, village trails and a short highland escape close to Addis Ababa.',
    primaryKeyword: 'Wenchi Crater Lake Tours',
    secondaryKeywords: [
      'Wenchi Tours',
      'Ethiopia Crater Lake Tours',
      'Ethiopia Lake Tours',
      'Addis Ababa Short Trips',
    ],
  },
  {
    name: 'Lake Abaya',
    slug: 'lake-abaya',
    category: 'lakes-scenic',
    categoryLabel: 'Lakes, Waterfalls, and Scenic Destinations',
    region: 'Southern Ethiopia',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782373033/Art_Print__Su_s_Abaya_Lake_at_sunrise_Arbaminch_Ethiopia_36x24in__kgs2br.jpg',
    imageAlt: 'Arba Minch and southern Ethiopia lake route',
  },
  {
    name: 'Lake Chamo',
    slug: 'lake-chamo',
    category: 'lakes-scenic',
    categoryLabel: 'Lakes, Waterfalls, and Scenic Destinations',
    region: 'Arba Minch',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782373033/Art_Print__Su_s_Abaya_Lake_at_sunrise_Arbaminch_Ethiopia_36x24in__kgs2br.jpg',
    imageAlt: 'Lake Chamo route near Arba Minch',
    relatedTourSlugs: [
      '10-day-omo-valley-bale-mountains-cultural-adventure',
      '12-day-historic-north-omo-valley-tour',
    ],
  },
  {
    name: 'Lake Ziway',
    slug: 'lake-ziway',
    category: 'lakes-scenic',
    categoryLabel: 'Lakes, Waterfalls, and Scenic Destinations',
    region: 'Great Rift Valley',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782373033/The___jfvjz0.jpg',
    imageAlt: 'Lake Ziway and Rift Valley route in Ethiopia',
    relatedTourSlugs: [
      '12-day-historic-north-omo-valley-tour',
    ],
  },
  {
    name: 'Lake Hawassa',
    slug: 'lake-hawassa',
    category: 'lakes-scenic',
    categoryLabel: 'Lakes, Waterfalls, and Scenic Destinations',
    region: 'Hawassa',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782373033/lake_hawassa_gqzntl.jpg',
    imageAlt: 'Lake Hawassa and southern Ethiopia route',
    relatedTourSlugs: [
      '10-day-omo-valley-bale-mountains-cultural-adventure',
    ],
  },
  {
    name: 'Lake Shalla',
    slug: 'lake-shalla',
    category: 'lakes-scenic',
    categoryLabel: 'Lakes, Waterfalls, and Scenic Destinations',
    region: 'Great Rift Valley',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782373033/The_Lake_bxxwzm.jpg',
    imageAlt: 'Rift Valley lake landscape for Lake Shalla',
  },
  {
    name: 'Lake Abijatta',
    slug: 'lake-abijatta',
    category: 'lakes-scenic',
    categoryLabel: 'Lakes, Waterfalls, and Scenic Destinations',
    region: 'Great Rift Valley',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782373033/Lake_Abijatta_yawxp5.jpg',
    imageAlt: 'Rift Valley lake landscape for Lake Abijatta',
  },
  {
    name: 'Simien Mountains National Park',
    slug: 'simien-mountains-national-park',
    primaryKeyword: 'Simien Mountains Tours',
    secondaryKeywords: ['Simien Mountains Trekking', 'Ethiopia Trekking Tours'],
    category: 'mountains-wildlife',
    categoryLabel: 'Mountains, Parks, and Wildlife',
    region: 'Northern Ethiopia',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782373760/Day_trek_to_Simien_Mountain_m7u1xw.jpg',
    imageAlt: 'Simien Mountains trekking landscape in Ethiopia',
    relatedTourSlugs: [
      '20-day-ethiopia-historical-cultural-adventure',
      '12-day-historic-north-omo-valley-tour',
    ],
  },
  {
    name: 'Bale Mountains National Park',
    slug: 'bale-mountains-national-park',
    category: 'mountains-wildlife',
    categoryLabel: 'Mountains, Parks, and Wildlife',
    region: 'Oromia Highlands',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782373759/Trekking_at_Bale_Mountains_3_Days_konkwz.jpg',
    imageAlt: 'Bale Mountains highland nature and wildlife landscape',
    shortDescription: 'Cloud forests, endemic wildlife, alpine plateaus, quiet lodges, and slow days in Ethiopia\'s wild southeast.',
    overview: 'A nature-forward highland escape through Bale\'s forests, plateaus, wildlife corridors, and peaceful mountain lodges.',
    highlights: [
      'Sanetti Plateau wildlife drives',
      'Harenna Forest walks',
      'Endemic species and birding routes',
      'Quiet lodge stays and mountain air',
    ],
    itinerary: [
      'Drive to Bale',
      'Forest walks',
      'Sanetti Plateau',
      'Return through Rift Valley',
    ],
    bestFor: 'Wildlife, soft adventure, birding, and highland scenery',
    relatedTourSlugs: [
      '10-day-omo-valley-bale-mountains-cultural-adventure',
    ],
    seoTitle: 'Bale Mountains Tours, Trekking & Wildlife',
    seoDescription: 'Explore Bale Mountains tours featuring trekking, wildlife, bird watching and dramatic highland landscapes in one of Ethiopia\'s major national parks.',
    primaryKeyword: 'Bale Mountains Tours',
    secondaryKeywords: [
      'Bale Mountains Trekking',
      'Bale Mountains Wildlife Tours',
      'Ethiopia Nature Tours',
      'Bale Mountains National Park Tour',
    ],
  },
  {
    name: 'Awash National Park',
    slug: 'awash-national-park',
    category: 'mountains-wildlife',
    categoryLabel: 'Mountains, Parks, and Wildlife',
    region: 'Afar and Oromia',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782373759/Oryx_in_the_savanna_Awash_national_park_Ethiopia_x1esoo.jpg',
    imageAlt: 'Awash National Park wilderness landscape in Ethiopia',
    shortDescription: 'Savanna wildlife, hot springs, dramatic escarpments, and accessible wilderness close to Addis Ababa.',
    overview: 'Pair classic Awash National Park scenery with wildlife, hot springs, and relaxed wilderness stops within reach of the capital.',
    highlights: [
      'Awash National Park game drives',
      'Hot springs and dramatic escarpments',
      'Scenic stops en route from Addis Ababa',
      'Accessible wilderness route from Addis',
    ],
    itinerary: [
      'Drive to Awash',
      'Game drive and falls',
      'Hot springs',
      'Return to Addis',
    ],
    bestFor: 'Wildlife, scenery, short safaris, and first-time Ethiopia trips',
    relatedTourSlugs: [
      '20-day-ethiopia-historical-cultural-adventure',
    ],
    seoTitle: 'Awash National Park Tours',
    seoDescription: 'Explore Awash National Park tours with wildlife drives, hot springs and accessible wilderness routes from Addis Ababa.',
    primaryKeyword: 'Awash National Park Tours',
    secondaryKeywords: [
      'Ethiopia Wildlife Tours',
      'Rift Valley Ethiopia Tours',
      'Awash Wildlife Tours',
    ],
  },
  {
    name: 'Nech Sar National Park',
    slug: 'nech-sar-national-park',
    category: 'mountains-wildlife',
    categoryLabel: 'Mountains, Parks, and Wildlife',
    region: 'Arba Minch',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782373760/Three_in_a_row_-_Ethiopia_kvkeqy.jpg',
    imageAlt: 'Arba Minch route near Nech Sar National Park',
  },
  {
    name: 'Mago National Park',
    slug: 'mago-national-park',
    category: 'mountains-wildlife',
    categoryLabel: 'Mountains, Parks, and Wildlife',
    region: 'Omo Valley',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782373760/Discover_the_Untamed_Beauty_of_Mkomazi_National_oeptox.jpg',
    imageAlt: 'Omo Valley route near Mago National Park',
    relatedTourSlugs: [
      '10-day-omo-valley-bale-mountains-cultural-adventure',
    ],
  },
  {
    name: 'Yangudi Rassa National Park',
    slug: 'yangudi-rassa-national-park',
    category: 'mountains-wildlife',
    categoryLabel: 'Mountains, Parks, and Wildlife',
    region: 'Afar Region',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782374557/547961479677797854_lpx530.jpg'
  },
  {
    name: 'Chebera Churchura National Park',
    slug: 'chebera-churchura-national-park',
    category: 'mountains-wildlife',
    categoryLabel: 'Mountains, Parks, and Wildlife',
    region: 'Southwestern Ethiopia',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782374618/A_picture_of_Waterfall_at_Chebera_Churchura_National_Park_qweoqu.jpg'
  },
  {
    name: 'Kafta Sheraro National Park',
    slug: 'kafta-sheraro-national-park',
    category: 'mountains-wildlife',
    categoryLabel: 'Mountains, Parks, and Wildlife',
    region: 'Tigray',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782374618/images_18_jdjnxk.jpg'
  },
  {
    name: 'Ras Dashen',
    slug: 'ras-dashen',
    category: 'mountains-wildlife',
    categoryLabel: 'Mountains, Parks, and Wildlife',
    region: 'Simien Mountains',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782374556/Ras_Dashen_Highest_Peak_In_Ethiopia_nq4awa.jpg',
    imageAlt: 'Simien Mountains trekking landscape near Ras Dashen',
  },
  {
    name: 'Mount Chilalo',
    slug: 'mount-chilalo',
    category: 'mountains-wildlife',
    categoryLabel: 'Mountains, Parks, and Wildlife',
    region: 'Oromia Highlands',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782374558/At_the_cutting_edge_of_8_000_feet_vyksnw.jpg'
  },
  {
    name: 'Danakil Depression',
    slug: 'danakil-depression',
    category: 'adventure-geological',
    categoryLabel: 'Adventure and Geological Wonders',
    region: 'Afar Region',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782248872/4996249580453896_lrt6x7.jpg',
    imageAlt: 'Danakil Depression desert and volcanic landscape',
    shortDescription: 'Otherworldly salt flats, volcanic color fields, desert caravans, and one of the most dramatic geological landscapes on earth.',
    overview: 'A highly supported expedition through the Afar desert, designed for travelers who want raw landscape with careful logistics.',
    highlights: [
      'Dallol geothermal color fields',
      'Salt flats and camel caravan routes',
      'Afar-guided desert logistics',
      'Sunrise and sunset landscape timing',
    ],
    itinerary: [
      'Mekele briefing',
      'Salt flats',
      'Dallol landscapes',
      'Desert return',
    ],
    bestFor: 'Expedition travel, geology, desert landscapes, and photography',
    relatedTourSlugs: [
      '4-day-danakil-depression-erta-ale-tour',
      '5-day-lalibela-danakil-depression-tour',
    ],
    seoTitle: 'Danakil Depression Tours & Adventure Packages',
    seoDescription: 'Explore Danakil Depression tours featuring volcanic landscapes, salt flats, Dallol and Afar desert routes with experienced guides.',
    primaryKeyword: 'Danakil Depression Tours',
    secondaryKeywords: [
      'Danakil Tour Packages',
      'Danakil Adventure Tours',
      'Erta Ale Tours',
      'Afar Danakil Tours',
    ],
  },
  {
    name: 'Erta Ale',
    slug: 'erta-ale',
    category: 'adventure-geological',
    categoryLabel: 'Adventure and Geological Wonders',
    region: 'Afar Region',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782248878/Reasons_to_Visit_the_Danakil_Depression_Ethiopia_xnvaap.jpg',
    imageAlt: 'Danakil Depression route for Erta Ale',
    relatedTourSlugs: [
      '4-day-danakil-depression-erta-ale-tour',
      '5-day-lalibela-danakil-depression-tour',
    ],
  },
  {
    name: 'Dallol',
    slug: 'dallol',
    category: 'adventure-geological',
    categoryLabel: 'Adventure and Geological Wonders',
    region: 'Afar Region',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782248873/Dallol_Ethiopia___%CC%97%CC%80__%E0%A9%88_z78ix6.jpg',
    imageAlt: 'Danakil Depression route for Dallol',
    relatedTourSlugs: [
      '4-day-danakil-depression-erta-ale-tour',
      '5-day-lalibela-danakil-depression-tour',
    ],
  },
  {
    name: 'Sof Omar Caves',
    slug: 'sof-omar-caves',
    category: 'adventure-geological',
    categoryLabel: 'Adventure and Geological Wonders',
    region: 'Bale Zone',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782375172/121667627429376236_nlva6g.jpg'
  },
  {
    name: 'Babille Elephant Sanctuary',
    slug: 'babille-elephant-sanctuary',
    category: 'adventure-geological',
    categoryLabel: 'Adventure and Geological Wonders',
    region: 'Eastern Ethiopia',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782375171/BABILE_ELEPHANT_SANCTUARY_d36cdg.jpg'
  },
  {
    name: 'Omo Valley',
    slug: 'omo-valley',
    category: 'tribal-cultural',
    categoryLabel: 'Tribal and Cultural Destinations',
    region: 'Southern Ethiopia',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782246561/Private_Omo_Valley_Tours_From_Addis_Ababa_xvpppa.jpg',
    imageAlt: 'Omo Valley cultural journey in southern Ethiopia',
    shortDescription: 'A respectful, guided immersion into living cultures, market towns, river valleys, and community-led travel experiences.',
    overview: 'Travel south with expert local guidance for a careful, respectful journey through Omo Valley communities and landscapes.',
    highlights: [
      'Community-led visits with local interpreters',
      'Market days and river-valley routes',
      'Photography guidance built around consent',
      'Comfortable lodges and flexible overland pacing',
    ],
    itinerary: [
      'Fly to Jinka',
      'Omo Valley communities',
      'Market and river routes',
      'Return through Arba Minch',
    ],
    bestFor: 'Cultural immersion, photography, markets, and overland travel',
    relatedTourSlugs: [
      '10-day-omo-valley-bale-mountains-cultural-adventure',
      '12-day-historic-north-omo-valley-tour',
    ],
    seoTitle: 'Omo Valley Tours & Cultural Experiences',
    seoDescription: 'Discover Omo Valley tours with experienced local guides. Explore southern Ethiopia landscapes, markets and cultural experiences through responsible journeys.',
    primaryKeyword: 'Omo Valley Tours',
    secondaryKeywords: [
      'Omo Valley Tour Packages',
      'Omo Valley Cultural Tours',
      'Southern Ethiopia Tours',
      'Omo Valley Cultural Experiences',
    ],
  },
  {
    name: 'Jinka',
    slug: 'jinka',
    category: 'tribal-cultural',
    categoryLabel: 'Tribal and Cultural Destinations',
    region: 'Omo Valley',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782375190/Jinka_Ethiopia_zbbipi.jpg',
    imageAlt: 'Omo Valley route through Jinka',
    relatedTourSlugs: [
      '10-day-omo-valley-bale-mountains-cultural-adventure',
      '12-day-historic-north-omo-valley-tour',
    ],
  },
  {
    name: 'Turmi',
    slug: 'turmi',
    category: 'tribal-cultural',
    categoryLabel: 'Tribal and Cultural Destinations',
    region: 'Omo Valley',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782375172/Hamer_man_at_a_bull_jumping_ceremony_near_Turmi_in_the_Omo_Valley_Ethiopia__zskgzu.jpg',
    imageAlt: 'Omo Valley route through Turmi',
    relatedTourSlugs: [
      '10-day-omo-valley-bale-mountains-cultural-adventure',
      '12-day-historic-north-omo-valley-tour',
    ],
  },
  {
    name: 'Arba Minch',
    slug: 'arba-minch',
    category: 'tribal-cultural',
    categoryLabel: 'Tribal and Cultural Destinations',
    region: 'Southern Ethiopia',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782375171/535083999491885120_o3th1x.jpg',
    imageAlt: 'Arba Minch route in southern Ethiopia',
    relatedTourSlugs: [
      '10-day-omo-valley-bale-mountains-cultural-adventure',
      '12-day-historic-north-omo-valley-tour',
    ],
  },
  {
    name: 'Dorze',
    slug: 'dorze',
    category: 'tribal-cultural',
    categoryLabel: 'Tribal and Cultural Destinations',
    region: 'Southern Ethiopia',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782375795/Dorze_Tribe_Ethiopia_ppus8s.jpg',
    imageAlt: 'Dorze cultural village route in Southern Ethiopia',
    relatedTourSlugs: [
      '10-day-omo-valley-bale-mountains-cultural-adventure',
      '12-day-historic-north-omo-valley-tour',
    ],
  },
  {
    name: 'Konso',
    slug: 'konso',
    category: 'tribal-cultural',
    categoryLabel: 'Tribal and Cultural Destinations',
    region: 'Southern Ethiopia',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782375795/Konso_Cultural_Landscape_pyrj7x.jpg',
    imageAlt: 'Southern Ethiopia cultural route through Konso',
    relatedTourSlugs: [
      '10-day-omo-valley-bale-mountains-cultural-adventure',
      '12-day-historic-north-omo-valley-tour',
    ],
  },
  {
    name: 'Chencha',
    slug: 'chencha',
    category: 'tribal-cultural',
    categoryLabel: 'Tribal and Cultural Destinations',
    region: 'Southern Ethiopia',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782375761/House_in_Chencha_Gamo_Gofa_Province_Ethiopia_oasg2l.jpg',
    imageAlt: 'Southern Ethiopia route through Chencha and Dorze',
  },
  {
    name: 'Debark',
    slug: 'debark',
    category: 'tribal-cultural',
    categoryLabel: 'Tribal and Cultural Destinations',
    region: 'Northern Ethiopia',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782375793/ethiopia_landscape_urv0z0.jpg',
    imageAlt: 'Simien Mountains route near Debark',
  },
  {
    name: 'Bahir Dar',
    slug: 'bahir-dar',
    category: 'tribal-cultural',
    categoryLabel: 'Tribal and Cultural Destinations',
    region: 'Amhara Region',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782409308/Blue_Nile_Ethiopia_xi94qy.jpg',
    relatedTourSlugs: [
      '20-day-ethiopia-historical-cultural-adventure',
      '6-day-ethiopia-holiday-package',
      '5-day-ethiopia-historic-route-tour',
      '12-day-historic-north-omo-valley-tour',
    ],
  },
  {
    name: 'Mekele',
    slug: 'mekele',
    category: 'tribal-cultural',
    categoryLabel: 'Tribal and Cultural Destinations',
    region: 'Tigray',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782409307/ethiopia_-_afar_danakil_and_tigray_s72fy4.jpg',
    relatedTourSlugs: [
      '4-day-danakil-depression-erta-ale-tour',
      '20-day-ethiopia-historical-cultural-adventure',
      '5-day-lalibela-danakil-depression-tour',
    ],
  },
  {
    name: 'Debre Markos',
    slug: 'debre-markos',
    category: 'historical-religious',
    categoryLabel: 'Historical and Religious Destinations',
    region: 'Amhara Region',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782409307/Debre_Markos_gsqbsn.jpg',
    relatedTourSlugs: [
      '20-day-ethiopia-historical-cultural-adventure',
    ],
  },
  {
    name: 'Gheralta',
    slug: 'gheralta',
    category: 'historical-religious',
    categoryLabel: 'Historical and Religious Destinations',
    region: 'Tigray',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782409308/Connaisez-vous_ce_lieu___iywh6c.jpg',
    relatedTourSlugs: [
      '20-day-ethiopia-historical-cultural-adventure',
    ],
  },
  {
    name: 'Kombolcha',
    slug: 'kombolcha',
    category: 'tribal-cultural',
    categoryLabel: 'Tribal and Cultural Destinations',
    region: 'Amhara Region',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782409308/Kombolcha_Ethiopia_bhzjqt.jpg',
    relatedTourSlugs: [
      '20-day-ethiopia-historical-cultural-adventure',
    ],
  },
  {
    name: 'Awra Amba',
    slug: 'awra-amba',
    category: 'tribal-cultural',
    categoryLabel: 'Tribal and Cultural Destinations',
    region: 'Amhara Region',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782409309/%E1%8A%A0%E1%8B%8D%E1%88%AB%E1%89%A3_%E1%89%A0%E1%88%81%E1%88%88%E1%89%B5_%E1%8C%88%E1%8C%BF_%E1%8A%A0%E1%88%AB%E1%89%A3_%E1%8B%AD%E1%88%8F%E1%89%BD%E1%8A%8B%E1%88%8D_%E1%8B%AD%E1%88%85_%E1%8A%90%E1%8B%8D_AWRA_AMBA_IS_AN_u8j7l6.jpg',
    relatedTourSlugs: [
      '6-day-ethiopia-holiday-package',
    ],
  },
  {
    name: 'Debre Libanos Monastery',
    slug: 'debre-libanos-monastery',
    category: 'historical-religious',
    categoryLabel: 'Historical and Religious Destinations',
    region: 'North Shewa',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782367798/Debre_Damo_Monastery_1_stbkmb.jpg',
    relatedTourSlugs: [
      '1-day-debre-libanos-portuguese-bridge-tour',
    ],
  },
  {
    name: 'Portuguese Bridge',
    slug: 'portuguese-bridge',
    category: 'historical-religious',
    categoryLabel: 'Historical and Religious Destinations',
    region: 'North Shewa',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782305237/Portuguese_bridge_in_Ethiopia_lcrpjy.jpg',
    relatedTourSlugs: [
      '1-day-debre-libanos-portuguese-bridge-tour',
    ],
  },
  {
    name: 'Jemma River Gorge',
    slug: 'jemma-river-gorge',
    category: 'mountains-wildlife',
    categoryLabel: 'Mountains, Parks, and Wildlife',
    region: 'North Shewa',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782420837/b1d1ef428ec22c684bfb91f85e21bdcc_ofk69q.jpg',
    relatedTourSlugs: [
      '1-day-debre-libanos-portuguese-bridge-tour',
    ],
  },
  {
    name: 'Semera',
    slug: 'semera',
    category: 'adventure-geological',
    categoryLabel: 'Adventure and Geological Wonders',
    region: 'Afar Region',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782420786/8aebaa31ba3242656bcd71a29bfed6f7_ppa48t.jpg',
    relatedTourSlugs: [
      '5-day-lalibela-danakil-depression-tour',
    ],
  },
  {
    name: 'Hamed Ela',
    slug: 'hamed-ela',
    category: 'adventure-geological',
    categoryLabel: 'Adventure and Geological Wonders',
    region: 'Afar Region',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782420786/images_21_us8g4j.jpg',
    relatedTourSlugs: [
      '4-day-danakil-depression-erta-ale-tour',
      '5-day-lalibela-danakil-depression-tour',
    ],
  },
  {
    name: 'Dire Dawa',
    slug: 'dire-dawa',
    category: 'historical-religious',
    categoryLabel: 'Historical and Religious Destinations',
    region: 'Eastern Ethiopia',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782420786/0171081f43c070fcdd428eecac6a9981_1_uqyx3j.jpg',
    relatedTourSlugs: [
      '3-day-harar-cultural-historical-tour',
    ],
  },
  {
    name: 'Aweday',
    slug: 'aweday',
    category: 'tribal-cultural',
    categoryLabel: 'Tribal and Cultural Destinations',
    region: 'Eastern Ethiopia',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782420785/images_22_vstagn.jpg',
    relatedTourSlugs: [
      '3-day-harar-cultural-historical-tour',
    ],
  },
  {
    name: 'Mount Entoto',
    slug: 'mount-entoto',
    category: 'historical-religious',
    categoryLabel: 'Historical and Religious Destinations',
    region: 'Addis Ababa',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782418812/e69c67638ad625242b725d4cf0222d38_ioi74i.jpg',
    imageAlt: 'Addis Ababa city view from Mount Entoto',
    relatedTourSlugs: [
      'addis-ababa-full-day-city-tour',
    ],
  },
  {
    name: 'Ethnological Museum',
    slug: 'ethnological-museum',
    category: 'historical-religious',
    categoryLabel: 'Historical and Religious Destinations',
    region: 'Addis Ababa',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782418812/34983b89a312ab272b5a6733cb4b4f9d_xl5owx.jpg',
    imageAlt: 'Addis Ababa cultural museum route',
    relatedTourSlugs: [
      'addis-ababa-full-day-city-tour',
    ],
  },
  {
    name: 'St. George Cathedral',
    slug: 'st-george-cathedral',
    category: 'historical-religious',
    categoryLabel: 'Historical and Religious Destinations',
    region: 'Addis Ababa',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782418812/c96f1342ee770fbd542da8d001037d25_j5q9dt.jpg',
    imageAlt: 'Addis Ababa route including St. George Cathedral',
    relatedTourSlugs: [
      'addis-ababa-full-day-city-tour',
    ],
  },
  {
    name: 'Mount Wonchi',
    slug: 'mount-wonchi',
    category: 'lakes-scenic',
    categoryLabel: 'Lakes, Waterfalls, and Scenic Destinations',
    region: 'Oromia Highlands',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782418811/db8f09af81bff25c06392061279cbad0_hj2i7w.jpg',
    imageAlt: 'Mount Wonchi and crater lake landscape',
    relatedTourSlugs: [
      'wonchi-crater-lake-day-tour',
    ],
  },
  {
    name: 'Cherkos Monastery',
    slug: 'cherkos-monastery',
    category: 'historical-religious',
    categoryLabel: 'Historical and Religious Destinations',
    region: 'Wonchi Crater Lake',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782418812/a5e2a36f8228bed26dd787f4391e6c97_ay3bzk.jpg',
    imageAlt: 'Wonchi Crater Lake route to Cherkos Monastery',
    relatedTourSlugs: [
      'wonchi-crater-lake-day-tour',
    ],
  },
  {
    name: 'Melka Kunture',
    slug: 'melka-kunture',
    category: 'historical-religious',
    categoryLabel: 'Historical and Religious Destinations',
    region: 'Central Ethiopia',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782418812/images_19_tbsm7z.jpg',
    relatedTourSlugs: [
      '10-day-omo-valley-bale-mountains-cultural-adventure',
    ],
  },

  {
    name: 'Adadi Maryam',
    slug: 'adadi-maryam',
    category: 'historical-religious',
    categoryLabel: 'Historical and Religious Destinations',
    region: 'Central Ethiopia',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782418810/b7629a45b4fddb499922b561f6d9e452_q7rlwp.jpg',
    relatedTourSlugs: [
      '10-day-omo-valley-bale-mountains-cultural-adventure',
    ],
  },
  {
    name: 'Karo',
    slug: 'karo',
    category: 'tribal-cultural',
    categoryLabel: 'Tribal and Cultural Destinations',
    region: 'Omo Valley',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782418810/28dc268081262da536816558cda045b7_ptzzb1.jpg',
    imageAlt: 'Omo Valley route through Karo villages',
    relatedTourSlugs: [
      '10-day-omo-valley-bale-mountains-cultural-adventure',
      '12-day-historic-north-omo-valley-tour',
    ],
  },
  {

    name: 'Nyangatom',
    slug: 'nyangatom',
    category: 'tribal-cultural',
    categoryLabel: 'Tribal and Cultural Destinations',
    region: 'Omo Valley',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782418810/b80708fa1e01b9c8a27a17cfa98d399d_wteen9.jpg',
    imageAlt: 'Omo Valley route through Nyangatom communities',
    relatedTourSlugs: [
      '10-day-omo-valley-bale-mountains-cultural-adventure',
    ],
  },
  {
    name: 'Omorate',
    slug: 'omorate',
    category: 'tribal-cultural',
    categoryLabel: 'Tribal and Cultural Destinations',
    region: 'Omo Valley',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782418810/f07270bdea82c893b67f1591a22ad452_vfxody.jpg',
    imageAlt: 'Omo River route near Omorate',
    relatedTourSlugs: [
      '10-day-omo-valley-bale-mountains-cultural-adventure',
    ],
  },
  {
    name: 'Dassanech',
    slug: 'dassanech',
    category: 'tribal-cultural',
    categoryLabel: 'Tribal and Cultural Destinations',
    region: 'Omo Valley',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782418810/ef68c3f54e3e53cc5c577c5861481054_i9vh0f.jpg',
    imageAlt: 'Omo Valley route through Dassanech communities',
    relatedTourSlugs: [
      '10-day-omo-valley-bale-mountains-cultural-adventure',
    ],
  },
  {
    name: 'Hawassa',
    slug: 'hawassa',
    category: 'lakes-scenic',
    categoryLabel: 'Lakes, Waterfalls, and Scenic Destinations',
    region: 'Great Rift Valley',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782418811/1e495d865c921ec714a6292880d7a338_rjokov.jpg',
    imageAlt: 'Hawassa lake region in Southern Ethiopia',
    relatedTourSlugs: [
      '10-day-omo-valley-bale-mountains-cultural-adventure',
    ],
  },
]

const completeDestinationSlugs = new Set([
  'addis-ababa',
  'lalibela',
  'gondar',
  'aksum',
  'simien-mountains-national-park',
  'wenchi-crater-lake',
  'bale-mountains-national-park',
  'awash-national-park',
  'danakil-depression',
  'omo-valley',
])

const destinationContentOverrides: Record<string, Partial<DestinationSeed>> = {
  'addis-ababa': {
    shortDescription:
      'Addis Ababa is the main arrival gateway for Ethio Origins Tour journeys and a natural starting point for museums, markets, churches, Entoto views, and onward routes.',
    overview:
      'Use Addis Ababa as a practical and cultural introduction to Ethiopia before continuing to historic, southern, eastern, or nature-focused itineraries. Approved tour routes include city sightseeing around Mount Entoto, the National Museum, Ethnological Museum, Holy Trinity Cathedral, St. George Cathedral, Merkato, coffee, food, and final departure logistics.',
    highlights: [
      'Mount Entoto viewpoints and city context',
      'National Museum and Ethnological Museum visits in approved city routes',
      'Holy Trinity Cathedral, St. George Cathedral, Merkato, and traditional food experiences',
      'Flexible arrival, departure, and connecting-day planning for private Ethiopia tours',
    ],
    itinerary: [
      'Begin with airport arrival or hotel pickup in Addis Ababa',
      'Visit museums, churches, Entoto viewpoints, markets, or food stops based on timing',
      'Connect onward to northern, southern, eastern, Danakil, or day-trip routes',
      'Return for shopping, rest, a cultural dinner, or international departure',
    ],
    seoTitle: 'Addis Ababa Travel Guide & City Tours',
    seoDescription:
      'Plan Addis Ababa city touring with museums, Entoto views, churches, Merkato, food stops and private Ethiopia tour connections.',
    primaryKeyword: 'Addis Ababa Travel Guide',
    secondaryKeywords: ['Addis Ababa City Tours', 'Addis Ababa Sightseeing Tour'],
    contentStatus: 'partial',
  },
  gondar: {
    shortDescription:
      'Gondar anchors northern Ethiopia historic routes with royal castles, church art, and onward access to the Simien Mountains.',
    overview:
      'Approved historic-route itineraries use Gondar for Fasil Ghebbi, Fasilides Castle, palace compounds, Debre Birhan Selassie Church, Kuskuam Palace, and connections between Bahir Dar, Lake Tana, Simien Mountains, Lalibela, and Aksum.',
    highlights: [
      'Royal Enclosure and Fasil Ghebbi visits in historic-route tours',
      'Debre Birhan Selassie Church and Gondar heritage interpretation',
      'Useful connection point for Bahir Dar, Simien Mountains, and Lalibela routes',
      'Private pacing for castle, church, and northern heritage touring',
    ],
    itinerary: [
      'Arrive from Bahir Dar, Simien Mountains, or another northern route point',
      'Tour Gondar castles, churches, and palace sites with local interpretation',
      'Continue toward Simien Mountains, Lalibela, or Aksum depending on itinerary',
      'Use Gondar as an overnight base for northern Ethiopia touring',
    ],
    seoTitle: 'Gondar Castles and Historical Tours',
    seoDescription:
      'Explore Gondar castles, Fasil Ghebbi, Debre Birhan Selassie Church and northern Ethiopia historic-route connections.',
    primaryKeyword: 'Gondar Historical Tours',
    contentStatus: 'partial',
  },
  aksum: {
    shortDescription:
      'Aksum is a northern Ethiopia heritage stop focused on stelae fields, archaeological sites, and ancient kingdom history.',
    overview:
      'Approved historic-route tours include Aksum for the Northern Stelae Field, archaeological museum, royal tombs, Queen of Sheba palace ruins, Ezana inscriptions, and St. Mary of Zion Church, with onward links to Tigray, Mekele, Lalibela, and Addis Ababa.',
    highlights: [
      'Ancient stelae fields and archaeological interpretation',
      'Royal tombs, inscriptions, palace ruins, and church heritage',
      'Northern-route links with Tigray churches, Mekele, Lalibela, and Gondar',
      'Strong fit for historical, religious, and UNESCO-heritage themed journeys',
    ],
    itinerary: [
      'Fly or travel into Aksum as part of a northern route',
      'Visit stelae fields, museum sites, tombs, inscriptions, and church landmarks',
      'Continue toward Tigray, Mekele, Lalibela, or Addis Ababa',
      'Pair Aksum with Gondar, Bahir Dar, and Lalibela for a complete historic route',
    ],
    seoTitle: 'Aksum Archaeological and Heritage Tours',
    seoDescription:
      'Plan Aksum heritage touring with stelae fields, archaeological sites, royal history and northern Ethiopia route connections.',
    primaryKeyword: 'Aksum Tours Ethiopia',
    contentStatus: 'partial',
  },
  harar: {
    shortDescription:
      'Harar is an eastern Ethiopia cultural and historical destination known in approved tours for Jugol, markets, museums, traditional homes, and the Hyena Feeding Ceremony.',
    overview:
      'Ethio Origins Tour routes feature Harar Old Town, Harari homes, Arthur Rimbaud House, Ras Mekonnen House, Harari Museum, Aweday Market, Dire Dawa connections, and the evening Hyena Feeding Ceremony.',
    highlights: [
      'Harar Jugol and traditional Harari home visits',
      'Aweday Market, museums, city heritage, and Dire Dawa routing',
      'Evening Hyena Feeding Ceremony where included by itinerary',
      'Useful eastern Ethiopia pairing with historical and cultural tours',
    ],
    itinerary: [
      'Travel via Dire Dawa or overland route toward Harar',
      'Visit Old Town, markets, museums, and traditional Harari homes',
      'Join the evening Hyena Feeding Ceremony when scheduled',
      'Return toward Addis Ababa or continue through eastern Ethiopia routes',
    ],
    seoTitle: 'Harar Cultural Tours and Old City Guide',
    seoDescription:
      'Explore Harar cultural tours featuring Jugol, Harari homes, markets, museums, Dire Dawa and the Hyena Feeding Ceremony.',
    primaryKeyword: 'Harar Cultural Tours',
    contentStatus: 'partial',
  },
  'lake-tana': {
    shortDescription:
      'Lake Tana is a northern Ethiopia route highlight for monastery boat trips, lakeside stays, and Bahir Dar connections.',
    overview:
      'Approved itineraries visit Lake Tana from Bahir Dar for boat excursions to selected monasteries such as Ura Kidane Mehret, Azwa Maryam, Mehal Zege Giorgis, or Bete Maryam depending on timing and access.',
    highlights: [
      'Boat excursions from Bahir Dar to selected Lake Tana monasteries',
      'Painted church interiors, manuscripts, sacred treasures, and lakeside context',
      'Pairs naturally with Blue Nile Falls, Gondar, and northern historic routes',
      'Flexible access based on local timing and route conditions',
    ],
    itinerary: [
      'Base in Bahir Dar or a lakeside hotel',
      'Take a boat excursion to selected Lake Tana monasteries',
      'Add Blue Nile viewpoints or Bezawit Hill where the itinerary supports it',
      'Continue toward Gondar, Lalibela, or another northern route stop',
    ],
    seoTitle: 'Lake Tana Monasteries and Boat Tours',
    seoDescription:
      'Plan Lake Tana boat tours from Bahir Dar with monastery visits and northern Ethiopia historic-route connections.',
    primaryKeyword: 'Lake Tana Monastery Tours',
    contentStatus: 'partial',
  },
  'blue-nile-falls': {
    shortDescription:
      'Blue Nile Falls is a Bahir Dar-area nature and heritage stop included in northern Ethiopia historic routes.',
    overview:
      'Approved tours use Blue Nile Falls as a countryside walk and scenic stop before continuing to Gondar or other northern-route destinations, often paired with Lake Tana and Bahir Dar.',
    highlights: [
      'Countryside walk and waterfall viewpoints near Bahir Dar',
      'Natural break within northern Ethiopia heritage itineraries',
      'Pairs with Lake Tana, Bezawit Hill, Gondar, and Bahir Dar stays',
      'Flexible timing according to the wider route plan',
    ],
    itinerary: [
      'Depart from Bahir Dar toward Blue Nile Falls',
      'Walk through countryside sections and visit waterfall viewpoints',
      'Return for lunch or continue toward Gondar based on itinerary',
      'Combine with Lake Tana monastery touring where scheduled',
    ],
    seoTitle: 'Blue Nile Falls Tours from Bahir Dar',
    seoDescription:
      'Visit Blue Nile Falls from Bahir Dar as part of northern Ethiopia tours with Lake Tana and Gondar route connections.',
    primaryKeyword: 'Blue Nile Falls Tours',
    contentStatus: 'partial',
  },
  'simien-mountains-national-park': {
    shortDescription:
      'Simien Mountains National Park adds highland scenery, guided hikes, and wildlife viewing to northern Ethiopia itineraries.',
    overview:
      'Approved routes include Simien Mountains excursions or overnight stops for dramatic cliffs, valleys, escarpments, Gelada Baboons, Walia Ibex where conditions allow, birdlife, and scenic highland walking.',
    highlights: [
      'Guided hikes through cliffs, valleys, and escarpments',
      'Gelada Baboon and highland wildlife viewing opportunities',
      'Pairs with Gondar, Aksum, and northern Ethiopia heritage routes',
      'Suitable for nature, photography, trekking, and historic-route extensions',
    ],
    itinerary: [
      'Travel from Gondar or another northern base toward the park',
      'Meet local guide or park support where required',
      'Walk viewpoints and wildlife areas according to conditions',
      'Return to Gondar or continue through the northern route',
    ],
    seoTitle: 'Simien Mountains Trekking and Wildlife Tours',
    seoDescription:
      'Plan Simien Mountains tours with guided highland walks, wildlife viewing and northern Ethiopia route connections.',
    primaryKeyword: 'Simien Mountains Tours',
    contentStatus: 'partial',
  },
  'erta-ale': {
    shortDescription:
      'Erta Ale is the volcanic highlight of Danakil-focused expeditions in approved Ethio Origins Tour routes.',
    overview:
      'Approved Danakil itineraries connect Erta Ale with Semera, Hamed Ela, Dallol, salt flats, Afar cultural context, and expedition-style logistics. It should only be visited through properly supported routes.',
    highlights: [
      'Volcanic landscape focus within Danakil Depression expeditions',
      'Pairs with Dallol, salt flats, Hamed Ela, and Afar desert routing',
      'Requires careful timing, local support, and realistic expedition pacing',
      'Best suited to adventure and geological tour intent',
    ],
    itinerary: [
      'Travel with local support through the approved Danakil route',
      'Continue toward Erta Ale according to timing and safety conditions',
      'Pair with Dallol, salt formations, and Hamed Ela where scheduled',
      'Return toward Mekele, Semera, or onward route points',
    ],
    seoTitle: 'Erta Ale Volcano Tours in the Danakil Depression',
    seoDescription:
      'Plan Erta Ale volcano touring as part of supported Danakil Depression expeditions with Dallol and Afar desert routes.',
    primaryKeyword: 'Erta Ale Volcano Tour',
    contentStatus: 'partial',
  },
  dallol: {
    shortDescription:
      'Dallol is a Danakil Depression geological stop known in approved tours for colorful mineral formations, salt landscapes, and Afar desert routing.',
    overview:
      'Approved Danakil itineraries feature Dallol alongside salt flats, salt extraction areas, camel caravans, Afar community context, Hamed Ela, Erta Ale, and Mekele or Semera logistics.',
    highlights: [
      'Colorful sulfur, mineral, salt, and geothermal landscapes in approved routes',
      'Salt extraction sites and camel caravan context where scheduled',
      'Pairs naturally with Erta Ale, Hamed Ela, and wider Danakil expeditions',
      'Requires supported logistics, timing, and route planning',
    ],
    itinerary: [
      'Travel into the Danakil route with local support',
      'Visit Dallol formations, salt areas, and viewpoints according to conditions',
      'Continue toward Hamed Ela, Erta Ale, Mekele, or Semera as scheduled',
      'Keep timing flexible around heat, access, and safety conditions',
    ],
    seoTitle: 'Dallol Tours and Danakil Depression Landscapes',
    seoDescription:
      'Explore Dallol as part of supported Danakil Depression tours with salt flats, mineral formations and Afar desert routes.',
    primaryKeyword: 'Dallol Tour Ethiopia',
    contentStatus: 'partial',
  },
  jinka: {
    shortDescription:
      'Jinka is a Southern Ethiopia cultural route base used for Omo Valley Museum visits, Ari village time, and access to Mago National Park.',
    overview:
      'Approved Omo Valley tours travel through Jinka for Ari village visits, regional museum context, and routes into Mago National Park for Mursi community visits.',
    highlights: [
      'Omo Valley Museum context in approved cultural itineraries',
      'Ari village visits near Jinka where scheduled',
      'Access point for Mago National Park and Mursi community visits',
      'Useful overnight base for Southern Ethiopia overland routes',
    ],
    itinerary: [
      'Arrive in Jinka through Arba Minch, Konso, or southern route points',
      'Visit nearby Ari community or Omo Valley Museum according to itinerary',
      'Continue into Mago National Park where scheduled',
      'Travel onward to Turmi, Konso, or another Omo Valley stop',
    ],
    seoTitle: 'Jinka Omo Valley Cultural Tours',
    seoDescription:
      'Plan Jinka travel within Omo Valley tours including Ari village visits, Omo Valley Museum and Mago National Park access.',
    primaryKeyword: 'Jinka Omo Valley Tours',
    contentStatus: 'partial',
  },
  turmi: {
    shortDescription:
      'Turmi is an Omo Valley base for Hamer cultural experiences and excursions toward Karo, Nyangatom, Omorate, and Dassanech communities.',
    overview:
      'Approved Southern Ethiopia tours use Turmi for Hamer village visits, optional cultural events when available, and day excursions to Karo, Nyangatom, Omorate, and Dassanech areas.',
    highlights: [
      'Hamer village visits and cultural context in approved itineraries',
      'Excursions toward Karo, Nyangatom, Omorate, and Dassanech communities',
      'Important base for Omo Valley overland routing',
      'Flexible scheduling around local events, markets, and lodge availability',
    ],
    itinerary: [
      'Arrive in Turmi from Jinka or another Omo Valley route point',
      'Visit Hamer community experiences according to the itinerary',
      'Use Turmi as a base for Karo, Nyangatom, Omorate, or Dassanech excursions',
      'Continue toward Konso or another Southern Ethiopia stop',
    ],
    seoTitle: 'Turmi Omo Valley Cultural Tours',
    seoDescription:
      'Plan Turmi visits within Omo Valley cultural tours featuring Hamer experiences and excursions to nearby communities.',
    primaryKeyword: 'Turmi Omo Valley Tours',
    contentStatus: 'partial',
  },
  'bahir-dar': {
    shortDescription:
      'Bahir Dar is a northern Ethiopia base for Lake Tana monastery trips, Blue Nile Falls, and onward historic-route travel to Gondar.',
    overview:
      'Approved itineraries use Bahir Dar for lakeside stays, Lake Tana boat excursions, selected monastery visits, Bezawit Hill, Blue Nile Falls, and onward drives toward Gondar.',
    highlights: [
      'Lake Tana boat excursions and monastery visits',
      'Blue Nile Falls and Bezawit Hill where included by itinerary',
      'Natural connection between Addis Ababa, Lake Tana, and Gondar',
      'Strong fit for historic route and cultural heritage tours',
    ],
    itinerary: [
      'Arrive in Bahir Dar by road or flight according to route',
      'Take Lake Tana monastery boat excursions where scheduled',
      'Visit Blue Nile Falls or nearby viewpoints as itinerary allows',
      'Continue toward Gondar, Lalibela, or another northern route stop',
    ],
    seoTitle: 'Bahir Dar Lake Tana and Blue Nile Falls Tours',
    seoDescription:
      'Plan Bahir Dar touring with Lake Tana monasteries, Blue Nile Falls and northern Ethiopia historic-route connections.',
    primaryKeyword: 'Bahir Dar Tours',
    contentStatus: 'partial',
  },
  'arba-minch': {
    shortDescription:
      'Arba Minch is a Southern Ethiopia route stop for Lake Chamo boat trips and onward travel toward Dorze, Konso, Jinka, and the Omo Valley.',
    overview:
      'Approved Omo Valley tours use Arba Minch for overnight routing, Lake Chamo boat excursions, crocodile and hippo viewing opportunities, and connections toward Dorze, Konso, and Jinka.',
    highlights: [
      'Lake Chamo boat excursions in approved Southern Ethiopia routes',
      'Connection point for Dorze, Konso, Jinka, and Omo Valley travel',
      'Wildlife and birdlife viewing around Lake Chamo where conditions allow',
      'Useful pacing stop on private overland journeys',
    ],
    itinerary: [
      'Travel south from Addis Ababa or arrive from nearby route points',
      'Use Arba Minch as an overnight base for Lake Chamo or Dorze routing',
      'Continue toward Jinka, Konso, Turmi, or Hawassa',
      'Adjust pacing to the wider Southern Ethiopia itinerary',
    ],
    seoTitle: 'Arba Minch and Lake Chamo Tours',
    seoDescription:
      'Plan Arba Minch travel within Southern Ethiopia tours including Lake Chamo, Dorze, Konso, Jinka and Omo Valley routes.',
    primaryKeyword: 'Arba Minch Tours',
    contentStatus: 'partial',
  },
}

function buildDestination(seed: DestinationSeed): Destination {
  const mergedSeed = {
    ...seed,
    ...destinationContentOverrides[seed.slug],
  }
  const categoryCopy = destinationCopyByCategory[mergedSeed.category]
  const hasUniqueBody = Boolean(
    mergedSeed.shortDescription &&
      mergedSeed.overview &&
      mergedSeed.highlights?.length &&
      mergedSeed.itinerary?.length,
  )
  const contentStatus =
    mergedSeed.contentStatus ||
    (completeDestinationSlugs.has(mergedSeed.slug)
      ? 'complete'
      : hasUniqueBody
        ? 'partial'
        : 'thin')
  const indexable = mergedSeed.indexable ?? contentStatus === 'complete'
  const shortDescription =
    mergedSeed.shortDescription || categoryCopy.shortDescription(mergedSeed.name, mergedSeed.region)
  const overview = mergedSeed.overview || categoryCopy.overview(mergedSeed.name, mergedSeed.region)
  const image = mergedSeed.image || TEMPORARY_DESTINATION_IMAGE
  const primaryKeyword = mergedSeed.primaryKeyword || `${mergedSeed.name} Tours`
  const title = mergedSeed.seoTitle || `${mergedSeed.name} Travel Information`
  const description =
    mergedSeed.seoDescription ||
    `${shortDescription} This page is available for itinerary context while detailed destination content is being reviewed.`
  const highlights =
    mergedSeed.highlights || categoryCopy.highlights(mergedSeed.name, mergedSeed.region)
  const itinerary =
    mergedSeed.itinerary || categoryCopy.itinerary(mergedSeed.name, mergedSeed.region)

  return {
    slug: mergedSeed.slug,
    name: mergedSeed.name,
    category: mergedSeed.category,
    categoryLabel: mergedSeed.categoryLabel,
    region: mergedSeed.region,
    shortDescription,
    overview,
    relatedTourSlugs: mergedSeed.relatedTourSlugs || [],
    relatedDestinationSlugs: mergedSeed.relatedDestinationSlugs || [],
    travelTips: mergedSeed.travelTips || [],
    culturalNotes: mergedSeed.culturalNotes || [],
    faq: mergedSeed.faq || [],
    gallery: mergedSeed.image ? [image] : [],
    place: mergedSeed.region,
    duration: 'Custom',
    description: shortDescription,
    intro: overview,
    image,
    highlights,
    bestFor: mergedSeed.bestFor || categoryCopy.bestFor,
    itinerary,
    contentStatus,
    indexable,
    imageAlt:
      mergedSeed.imageAlt ||
      `${mergedSeed.name} destination in Ethiopia`,
    seo: {
      title,
      description,
      canonicalPath: `/destinations/${mergedSeed.slug}`,
      primaryKeyword,
      secondaryKeywords: mergedSeed.secondaryKeywords || [
        mergedSeed.name,
        mergedSeed.categoryLabel,
        'Ethiopia Destinations',
      ],
      noIndex: !indexable,
      ogImage: image,
      ogImageAlt:
        mergedSeed.imageAlt ||
        `${mergedSeed.name} destination in Ethiopia`,
    },
  }
}

export const destinations: Destination[] = destinationSeeds.map(buildDestination)
