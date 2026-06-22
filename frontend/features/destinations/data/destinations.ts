import type { Destination, DestinationCategory } from '../types/destination'

const PENDING_OVERVIEW = 'Detailed destination information will be added soon.'

// Pending client assets: used only when no approved destination-specific image exists yet.
const TEMPORARY_DESTINATION_IMAGE = '/images/hero.png'

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
  seoTitle?: string
  seoDescription?: string
  primaryKeyword?: string
  secondaryKeywords?: string[]
}

const destinationSeeds: DestinationSeed[] = [
  {
    name: 'Addis Ababa',
    slug: 'addis-ababa',
    category: 'historical-religious',
    categoryLabel: 'Historical and Religious Destinations',
    region: 'Central Ethiopia',
    image: '/images/gallery-market.png',
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
    primaryKeyword: 'Addis Ababa City Tours',
  },
  {
    name: 'Lalibela Rock-Hewn Churches',
    slug: 'lalibela',
    category: 'historical-religious',
    categoryLabel: 'Historical and Religious Destinations',
    region: 'Amhara Highlands',
    image: '/images/dest-gondar.png',
    imageAlt: 'Historic northern Ethiopia landscape representing Lalibela heritage routes',
    shortDescription:
      'Rock-hewn churches, monastic traditions, and highland landscapes shaped by centuries of faith and craft.',
    overview:
      'Follow Ethiopia\'s historic northern route through sacred architecture, mountain views, and intimate cultural encounters around Lalibela.',
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
    seoDescription:
      'Explore Lalibela rock-hewn churches with local guides on historical northern Ethiopia tours featuring highland culture and sacred heritage.',
    primaryKeyword: 'Lalibela Tours',
    secondaryKeywords: [
      'Lalibela Tour Packages',
      'Lalibela Historical Tours',
      'Lalibela Guided Tours',
      'Lalibela Ethiopia Travel',
    ],
  },
  { name: 'Gondar', slug: 'gondar', category: 'historical-religious', categoryLabel: 'Historical and Religious Destinations', region: 'Amhara Highlands', image: '/images/dest-gondar.png', imageAlt: 'Gondar heritage route in northern Ethiopia', relatedTourSlugs: ['20-day-ethiopia-historical-cultural-adventure', '6-day-ethiopia-holiday-package', '5-day-ethiopia-historic-route-tour', '12-day-historic-north-omo-valley-tour'], primaryKeyword: 'Gondar Historical Tours' },
  { name: 'Aksum', slug: 'aksum', category: 'historical-religious', categoryLabel: 'Historical and Religious Destinations', region: 'Tigray', relatedTourSlugs: ['20-day-ethiopia-historical-cultural-adventure', '5-day-ethiopia-historic-route-tour'], primaryKeyword: 'Aksum Tours Ethiopia' },
  { name: 'Harar', slug: 'harar', category: 'historical-religious', categoryLabel: 'Historical and Religious Destinations', region: 'Eastern Ethiopia', relatedTourSlugs: ['20-day-ethiopia-historical-cultural-adventure', '3-day-harar-cultural-historical-tour'] },
  { name: 'Tiya', slug: 'tiya', category: 'historical-religious', categoryLabel: 'Historical and Religious Destinations', region: 'Central Ethiopia', relatedTourSlugs: ['10-day-omo-valley-bale-mountains-cultural-adventure'] },
  { name: 'Konso Cultural Landscape', slug: 'konso-cultural-landscape', category: 'historical-religious', categoryLabel: 'Historical and Religious Destinations', region: 'Southern Ethiopia' },
  { name: 'Yeha Temple', slug: 'yeha-temple', category: 'historical-religious', categoryLabel: 'Historical and Religious Destinations', region: 'Tigray', relatedTourSlugs: ['20-day-ethiopia-historical-cultural-adventure'] },
  { name: 'Debre Damo Monastery', slug: 'debre-damo-monastery', category: 'historical-religious', categoryLabel: 'Historical and Religious Destinations', region: 'Tigray' },
  { name: 'Abuna Yemata Guh', slug: 'abuna-yemata-guh', category: 'historical-religious', categoryLabel: 'Historical and Religious Destinations', region: 'Tigray' },
  { name: 'Fasil Ghebbi', slug: 'fasil-ghebbi', category: 'historical-religious', categoryLabel: 'Historical and Religious Destinations', region: 'Gondar', image: '/images/dest-gondar.png', imageAlt: 'Fasil Ghebbi and Gondar heritage route in Ethiopia', relatedTourSlugs: ['20-day-ethiopia-historical-cultural-adventure'] },
  { name: 'Holy Trinity Cathedral', slug: 'holy-trinity-cathedral', category: 'historical-religious', categoryLabel: 'Historical and Religious Destinations', region: 'Addis Ababa', image: '/images/gallery-market.png', imageAlt: 'Addis Ababa city culture near Holy Trinity Cathedral', relatedTourSlugs: ['addis-ababa-full-day-city-tour'] },
  { name: 'National Museum of Ethiopia', slug: 'national-museum-of-ethiopia', category: 'historical-religious', categoryLabel: 'Historical and Religious Destinations', region: 'Addis Ababa', image: '/images/gallery-market.png', imageAlt: 'Addis Ababa city culture near the National Museum of Ethiopia', relatedTourSlugs: ['addis-ababa-full-day-city-tour'] },
  { name: 'St. George Church', slug: 'st-george-church', category: 'historical-religious', categoryLabel: 'Historical and Religious Destinations', region: 'Lalibela', image: '/images/dest-gondar.png', imageAlt: 'Lalibela heritage route including St. George Church', relatedTourSlugs: ['3-day-lalibela-genna-festival-tour'] },
  { name: 'Medhane Alem Church', slug: 'medhane-alem-church', category: 'historical-religious', categoryLabel: 'Historical and Religious Destinations', region: 'Lalibela', image: '/images/dest-gondar.png', imageAlt: 'Lalibela heritage route including Medhane Alem Church', relatedTourSlugs: ['3-day-lalibela-genna-festival-tour'] },
  { name: 'Lake Tana', slug: 'lake-tana', category: 'lakes-scenic', categoryLabel: 'Lakes, Waterfalls, and Scenic Destinations', region: 'Bahir Dar', relatedTourSlugs: ['20-day-ethiopia-historical-cultural-adventure', '6-day-ethiopia-holiday-package', '5-day-ethiopia-historic-route-tour', '12-day-historic-north-omo-valley-tour'] },
  { name: 'Blue Nile Falls', slug: 'blue-nile-falls', category: 'lakes-scenic', categoryLabel: 'Lakes, Waterfalls, and Scenic Destinations', region: 'Bahir Dar', primaryKeyword: 'Blue Nile Falls Tours', relatedTourSlugs: ['20-day-ethiopia-historical-cultural-adventure', '6-day-ethiopia-holiday-package', '12-day-historic-north-omo-valley-tour'] },
  { name: 'Lake Langano', slug: 'lake-langano', category: 'lakes-scenic', categoryLabel: 'Lakes, Waterfalls, and Scenic Destinations', region: 'Great Rift Valley', image: '/images/exp-rift.png', imageAlt: 'Rift Valley lake landscape in Ethiopia', relatedTourSlugs: ['12-day-historic-north-omo-valley-tour'] },
  {
    name: 'Wenchi Crater Lake',
    slug: 'wenchi-crater-lake',
    category: 'lakes-scenic',
    categoryLabel: 'Lakes, Waterfalls, and Scenic Destinations',
    region: 'Central Ethiopia',
    image: '/images/dest-wonchi.png',
    imageAlt: 'Wenchi Crater Lake highland retreat near Addis Ababa',
    shortDescription:
      'A restorative crater-lake journey with horseback trails, island monasteries, warm hospitality, and gentle highland views.',
    overview:
      'Slow down near Addis Ababa with a short retreat around Wenchi Crater Lake, village trails, and island monastery.',
    highlights: [
      'Horseback or walking trails',
      'Boat ride across the crater lake',
      'Island monastery visit',
      'Short itinerary close to Addis Ababa',
    ],
    itinerary: ['Depart Addis', 'Crater rim walk', 'Lake and monastery', 'Return to Addis'],
    bestFor: 'Short escapes, families, gentle nature, and lake views',
    relatedTourSlugs: ['wonchi-crater-lake-day-tour'],
    seoTitle: 'Wenchi Crater Lake Tours & Retreats',
    seoDescription:
      'Plan a Wenchi Crater Lake retreat with guided walks, lake views, village trails and a short highland escape close to Addis Ababa.',
    primaryKeyword: 'Wenchi Crater Lake Tours',
    secondaryKeywords: [
      'Wenchi Tours',
      'Ethiopia Crater Lake Tours',
      'Ethiopia Lake Tours',
      'Addis Ababa Short Trips',
    ],
  },
  { name: 'Lake Abaya', slug: 'lake-abaya', category: 'lakes-scenic', categoryLabel: 'Lakes, Waterfalls, and Scenic Destinations', region: 'Southern Ethiopia', image: '/images/client/custom/arbaminch.jpg', imageAlt: 'Arba Minch and southern Ethiopia lake route' },
  { name: 'Lake Chamo', slug: 'lake-chamo', category: 'lakes-scenic', categoryLabel: 'Lakes, Waterfalls, and Scenic Destinations', region: 'Arba Minch', image: '/images/client/custom/arbaminch.jpg', imageAlt: 'Lake Chamo route near Arba Minch', relatedTourSlugs: ['10-day-omo-valley-bale-mountains-cultural-adventure', '12-day-historic-north-omo-valley-tour'] },
  { name: 'Lake Ziway', slug: 'lake-ziway', category: 'lakes-scenic', categoryLabel: 'Lakes, Waterfalls, and Scenic Destinations', region: 'Great Rift Valley', image: '/images/exp-rift.png', imageAlt: 'Lake Ziway and Rift Valley route in Ethiopia', relatedTourSlugs: ['12-day-historic-north-omo-valley-tour'] },
  { name: 'Lake Hawassa', slug: 'lake-hawassa', category: 'lakes-scenic', categoryLabel: 'Lakes, Waterfalls, and Scenic Destinations', region: 'Hawassa', image: '/images/client/custom/hawassa.jpg', imageAlt: 'Lake Hawassa and southern Ethiopia route', relatedTourSlugs: ['10-day-omo-valley-bale-mountains-cultural-adventure'] },
  { name: 'Lake Shalla', slug: 'lake-shalla', category: 'lakes-scenic', categoryLabel: 'Lakes, Waterfalls, and Scenic Destinations', region: 'Great Rift Valley', image: '/images/exp-rift.png', imageAlt: 'Rift Valley lake landscape for Lake Shalla' },
  { name: 'Lake Abijatta', slug: 'lake-abijatta', category: 'lakes-scenic', categoryLabel: 'Lakes, Waterfalls, and Scenic Destinations', region: 'Great Rift Valley', image: '/images/exp-rift.png', imageAlt: 'Rift Valley lake landscape for Lake Abijatta' },
  { name: 'Simien Mountains National Park', slug: 'simien-mountains-national-park', category: 'mountains-wildlife', categoryLabel: 'Mountains, Parks, and Wildlife', region: 'Northern Ethiopia', image: '/images/exp-simien.png', imageAlt: 'Simien Mountains trekking landscape in Ethiopia', relatedTourSlugs: ['20-day-ethiopia-historical-cultural-adventure', '12-day-historic-north-omo-valley-tour'], primaryKeyword: 'Simien Mountains Tours' },
  {
    name: 'Bale Mountains National Park',
    slug: 'bale-mountains-national-park',
    category: 'mountains-wildlife',
    categoryLabel: 'Mountains, Parks, and Wildlife',
    region: 'Oromia Highlands',
    image: '/images/exp-bale.png',
    imageAlt: 'Bale Mountains highland nature and wildlife landscape',
    shortDescription:
      'Cloud forests, endemic wildlife, alpine plateaus, quiet lodges, and slow days in Ethiopia\'s wild southeast.',
    overview:
      'A nature-forward highland escape through Bale\'s forests, plateaus, wildlife corridors, and peaceful mountain lodges.',
    highlights: [
      'Sanetti Plateau wildlife drives',
      'Harenna Forest walks',
      'Endemic species and birding routes',
      'Quiet lodge stays and mountain air',
    ],
    itinerary: ['Drive to Bale', 'Forest walks', 'Sanetti Plateau', 'Return through Rift Valley'],
    bestFor: 'Wildlife, soft adventure, birding, and highland scenery',
    relatedTourSlugs: ['10-day-omo-valley-bale-mountains-cultural-adventure'],
    seoTitle: 'Bale Mountains Tours, Trekking & Wildlife',
    seoDescription:
      'Explore Bale Mountains tours featuring trekking, wildlife, bird watching and dramatic highland landscapes in one of Ethiopia\'s major national parks.',
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
    image: '/images/dest-awash.png',
    imageAlt: 'Awash National Park wilderness landscape in Ethiopia',
    shortDescription:
      'Savanna wildlife, hot springs, dramatic escarpments, and accessible wilderness close to Addis Ababa.',
    overview:
      'Pair classic Awash National Park scenery with wildlife, hot springs, and relaxed wilderness stops within reach of the capital.',
    highlights: [
      'Awash National Park game drives',
      'Hot springs and dramatic escarpments',
      'Scenic stops en route from Addis Ababa',
      'Accessible wilderness route from Addis',
    ],
    itinerary: ['Drive to Awash', 'Game drive and falls', 'Hot springs', 'Return to Addis'],
    bestFor: 'Wildlife, scenery, short safaris, and first-time Ethiopia trips',
    relatedTourSlugs: ['20-day-ethiopia-historical-cultural-adventure'],
    seoTitle: 'Awash National Park Tours',
    seoDescription:
      'Explore Awash National Park tours with wildlife drives, hot springs and accessible wilderness routes from Addis Ababa.',
    primaryKeyword: 'Awash National Park Tours',
    secondaryKeywords: [
      'Ethiopia Wildlife Tours',
      'Rift Valley Ethiopia Tours',
      'Awash Wildlife Tours',
    ],
  },
  { name: 'Nech Sar National Park', slug: 'nech-sar-national-park', category: 'mountains-wildlife', categoryLabel: 'Mountains, Parks, and Wildlife', region: 'Arba Minch', image: '/images/client/custom/arbaminch.jpg', imageAlt: 'Arba Minch route near Nech Sar National Park' },
  { name: 'Mago National Park', slug: 'mago-national-park', category: 'mountains-wildlife', categoryLabel: 'Mountains, Parks, and Wildlife', region: 'Omo Valley', image: '/images/exp-omo.png', imageAlt: 'Omo Valley route near Mago National Park', relatedTourSlugs: ['10-day-omo-valley-bale-mountains-cultural-adventure'] },
  { name: 'Yangudi Rassa National Park', slug: 'yangudi-rassa-national-park', category: 'mountains-wildlife', categoryLabel: 'Mountains, Parks, and Wildlife', region: 'Afar Region' },
  { name: 'Chebera Churchura National Park', slug: 'chebera-churchura-national-park', category: 'mountains-wildlife', categoryLabel: 'Mountains, Parks, and Wildlife', region: 'Southwestern Ethiopia' },
  { name: 'Kafta Sheraro National Park', slug: 'kafta-sheraro-national-park', category: 'mountains-wildlife', categoryLabel: 'Mountains, Parks, and Wildlife', region: 'Tigray' },
  { name: 'Ras Dashen', slug: 'ras-dashen', category: 'mountains-wildlife', categoryLabel: 'Mountains, Parks, and Wildlife', region: 'Simien Mountains', image: '/images/exp-simien.png', imageAlt: 'Simien Mountains trekking landscape near Ras Dashen' },
  { name: 'Mount Chilalo', slug: 'mount-chilalo', category: 'mountains-wildlife', categoryLabel: 'Mountains, Parks, and Wildlife', region: 'Oromia Highlands' },
  {
    name: 'Danakil Depression',
    slug: 'danakil-depression',
    category: 'adventure-geological',
    categoryLabel: 'Adventure and Geological Wonders',
    region: 'Afar Region',
    image: '/images/exp-danakil.png',
    imageAlt: 'Danakil Depression desert and volcanic landscape',
    shortDescription:
      'Otherworldly salt flats, volcanic color fields, desert caravans, and one of the most dramatic geological landscapes on earth.',
    overview:
      'A highly supported expedition through the Afar desert, designed for travelers who want raw landscape with careful logistics.',
    highlights: [
      'Dallol geothermal color fields',
      'Salt flats and camel caravan routes',
      'Afar-guided desert logistics',
      'Sunrise and sunset landscape timing',
    ],
    itinerary: ['Mekele briefing', 'Salt flats', 'Dallol landscapes', 'Desert return'],
    bestFor: 'Expedition travel, geology, desert landscapes, and photography',
    relatedTourSlugs: [
      '4-day-danakil-depression-erta-ale-tour',
      '5-day-lalibela-danakil-depression-tour',
    ],
    seoTitle: 'Danakil Depression Tours & Adventure Packages',
    seoDescription:
      'Explore Danakil Depression tours featuring volcanic landscapes, salt flats, Dallol and Afar desert routes with experienced guides.',
    primaryKeyword: 'Danakil Depression Tours',
    secondaryKeywords: [
      'Danakil Tour Packages',
      'Danakil Adventure Tours',
      'Erta Ale Tours',
      'Afar Danakil Tours',
    ],
  },
  { name: 'Erta Ale', slug: 'erta-ale', category: 'adventure-geological', categoryLabel: 'Adventure and Geological Wonders', region: 'Afar Region', image: '/images/exp-danakil.png', imageAlt: 'Danakil Depression route for Erta Ale', relatedTourSlugs: ['4-day-danakil-depression-erta-ale-tour', '5-day-lalibela-danakil-depression-tour'] },
  { name: 'Dallol', slug: 'dallol', category: 'adventure-geological', categoryLabel: 'Adventure and Geological Wonders', region: 'Afar Region', image: '/images/exp-danakil.png', imageAlt: 'Danakil Depression route for Dallol', relatedTourSlugs: ['4-day-danakil-depression-erta-ale-tour', '5-day-lalibela-danakil-depression-tour'] },
  { name: 'Sof Omar Caves', slug: 'sof-omar-caves', category: 'adventure-geological', categoryLabel: 'Adventure and Geological Wonders', region: 'Bale Zone' },
  { name: 'Babille Elephant Sanctuary', slug: 'babille-elephant-sanctuary', category: 'adventure-geological', categoryLabel: 'Adventure and Geological Wonders', region: 'Eastern Ethiopia' },
  {
    name: 'Omo Valley',
    slug: 'omo-valley',
    category: 'tribal-cultural',
    categoryLabel: 'Tribal and Cultural Destinations',
    region: 'Southern Ethiopia',
    image: '/images/exp-omo.png',
    imageAlt: 'Omo Valley cultural journey in southern Ethiopia',
    shortDescription:
      'A respectful, guided immersion into living cultures, market towns, river valleys, and community-led travel experiences.',
    overview:
      'Travel south with expert local guidance for a careful, respectful journey through Omo Valley communities and landscapes.',
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
    seoDescription:
      'Discover Omo Valley tours with experienced local guides. Explore southern Ethiopia landscapes, markets and cultural experiences through responsible journeys.',
    primaryKeyword: 'Omo Valley Tours',
    secondaryKeywords: [
      'Omo Valley Tour Packages',
      'Omo Valley Cultural Tours',
      'Southern Ethiopia Tours',
      'Omo Valley Cultural Experiences',
    ],
  },
  { name: 'Jinka', slug: 'jinka', category: 'tribal-cultural', categoryLabel: 'Tribal and Cultural Destinations', region: 'Omo Valley', image: '/images/exp-omo.png', imageAlt: 'Omo Valley route through Jinka', relatedTourSlugs: ['10-day-omo-valley-bale-mountains-cultural-adventure', '12-day-historic-north-omo-valley-tour'] },
  { name: 'Turmi', slug: 'turmi', category: 'tribal-cultural', categoryLabel: 'Tribal and Cultural Destinations', region: 'Omo Valley', image: '/images/exp-omo.png', imageAlt: 'Omo Valley route through Turmi', relatedTourSlugs: ['10-day-omo-valley-bale-mountains-cultural-adventure', '12-day-historic-north-omo-valley-tour'] },
  { name: 'Arba Minch', slug: 'arba-minch', category: 'tribal-cultural', categoryLabel: 'Tribal and Cultural Destinations', region: 'Southern Ethiopia', image: '/images/client/custom/arbaminch.jpg', imageAlt: 'Arba Minch route in southern Ethiopia', relatedTourSlugs: ['10-day-omo-valley-bale-mountains-cultural-adventure', '12-day-historic-north-omo-valley-tour'] },
  { name: 'Dorze', slug: 'dorze', category: 'tribal-cultural', categoryLabel: 'Tribal and Cultural Destinations', region: 'Southern Ethiopia', image: '/images/client/custom/dorze-village.jpg', imageAlt: 'Dorze cultural village route in Southern Ethiopia', relatedTourSlugs: ['10-day-omo-valley-bale-mountains-cultural-adventure', '12-day-historic-north-omo-valley-tour'] },
  { name: 'Konso', slug: 'konso', category: 'tribal-cultural', categoryLabel: 'Tribal and Cultural Destinations', region: 'Southern Ethiopia', image: '/images/exp-omo.png', imageAlt: 'Southern Ethiopia cultural route through Konso', relatedTourSlugs: ['10-day-omo-valley-bale-mountains-cultural-adventure', '12-day-historic-north-omo-valley-tour'] },
  { name: 'Chencha', slug: 'chencha', category: 'tribal-cultural', categoryLabel: 'Tribal and Cultural Destinations', region: 'Southern Ethiopia', image: '/images/client/custom/dorze-village.jpg', imageAlt: 'Southern Ethiopia route through Chencha and Dorze' },
  { name: 'Debark', slug: 'debark', category: 'tribal-cultural', categoryLabel: 'Tribal and Cultural Destinations', region: 'Northern Ethiopia', image: '/images/exp-simien.png', imageAlt: 'Simien Mountains route near Debark' },
  { name: 'Bahir Dar', slug: 'bahir-dar', category: 'tribal-cultural', categoryLabel: 'Tribal and Cultural Destinations', region: 'Amhara Region', relatedTourSlugs: ['20-day-ethiopia-historical-cultural-adventure', '6-day-ethiopia-holiday-package', '5-day-ethiopia-historic-route-tour', '12-day-historic-north-omo-valley-tour'] },
  { name: 'Mekele', slug: 'mekele', category: 'tribal-cultural', categoryLabel: 'Tribal and Cultural Destinations', region: 'Tigray', relatedTourSlugs: ['4-day-danakil-depression-erta-ale-tour', '20-day-ethiopia-historical-cultural-adventure', '5-day-lalibela-danakil-depression-tour'] },
  { name: 'Debre Markos', slug: 'debre-markos', category: 'historical-religious', categoryLabel: 'Historical and Religious Destinations', region: 'Amhara Region', relatedTourSlugs: ['20-day-ethiopia-historical-cultural-adventure'] },
  { name: 'Gheralta', slug: 'gheralta', category: 'historical-religious', categoryLabel: 'Historical and Religious Destinations', region: 'Tigray', relatedTourSlugs: ['20-day-ethiopia-historical-cultural-adventure'] },
  { name: 'Kombolcha', slug: 'kombolcha', category: 'tribal-cultural', categoryLabel: 'Tribal and Cultural Destinations', region: 'Amhara Region', relatedTourSlugs: ['20-day-ethiopia-historical-cultural-adventure'] },
  { name: 'Awra Amba', slug: 'awra-amba', category: 'tribal-cultural', categoryLabel: 'Tribal and Cultural Destinations', region: 'Amhara Region', relatedTourSlugs: ['6-day-ethiopia-holiday-package'] },
  { name: 'Debre Libanos Monastery', slug: 'debre-libanos-monastery', category: 'historical-religious', categoryLabel: 'Historical and Religious Destinations', region: 'North Shewa', relatedTourSlugs: ['1-day-debre-libanos-portuguese-bridge-tour'] },
  { name: 'Portuguese Bridge', slug: 'portuguese-bridge', category: 'historical-religious', categoryLabel: 'Historical and Religious Destinations', region: 'North Shewa', relatedTourSlugs: ['1-day-debre-libanos-portuguese-bridge-tour'] },
  { name: 'Jemma River Gorge', slug: 'jemma-river-gorge', category: 'mountains-wildlife', categoryLabel: 'Mountains, Parks, and Wildlife', region: 'North Shewa', relatedTourSlugs: ['1-day-debre-libanos-portuguese-bridge-tour'] },
  { name: 'Semera', slug: 'semera', category: 'adventure-geological', categoryLabel: 'Adventure and Geological Wonders', region: 'Afar Region', relatedTourSlugs: ['5-day-lalibela-danakil-depression-tour'] },
  { name: 'Hamed Ela', slug: 'hamed-ela', category: 'adventure-geological', categoryLabel: 'Adventure and Geological Wonders', region: 'Afar Region', relatedTourSlugs: ['4-day-danakil-depression-erta-ale-tour', '5-day-lalibela-danakil-depression-tour'] },
  { name: 'Dire Dawa', slug: 'dire-dawa', category: 'historical-religious', categoryLabel: 'Historical and Religious Destinations', region: 'Eastern Ethiopia', relatedTourSlugs: ['3-day-harar-cultural-historical-tour'] },
  { name: 'Aweday', slug: 'aweday', category: 'tribal-cultural', categoryLabel: 'Tribal and Cultural Destinations', region: 'Eastern Ethiopia', relatedTourSlugs: ['3-day-harar-cultural-historical-tour'] },
  { name: 'Mount Entoto', slug: 'mount-entoto', category: 'historical-religious', categoryLabel: 'Historical and Religious Destinations', region: 'Addis Ababa', image: '/images/gallery-market.png', imageAlt: 'Addis Ababa city view from Mount Entoto', relatedTourSlugs: ['addis-ababa-full-day-city-tour'] },
  { name: 'Ethnological Museum', slug: 'ethnological-museum', category: 'historical-religious', categoryLabel: 'Historical and Religious Destinations', region: 'Addis Ababa', image: '/images/gallery-market.png', imageAlt: 'Addis Ababa cultural museum route', relatedTourSlugs: ['addis-ababa-full-day-city-tour'] },
  { name: 'St. George Cathedral', slug: 'st-george-cathedral', category: 'historical-religious', categoryLabel: 'Historical and Religious Destinations', region: 'Addis Ababa', image: '/images/gallery-market.png', imageAlt: 'Addis Ababa route including St. George Cathedral', relatedTourSlugs: ['addis-ababa-full-day-city-tour'] },
  { name: 'Mount Wonchi', slug: 'mount-wonchi', category: 'lakes-scenic', categoryLabel: 'Lakes, Waterfalls, and Scenic Destinations', region: 'Oromia Highlands', image: '/images/dest-wonchi.png', imageAlt: 'Mount Wonchi and crater lake landscape', relatedTourSlugs: ['wonchi-crater-lake-day-tour'] },
  { name: 'Cherkos Monastery', slug: 'cherkos-monastery', category: 'historical-religious', categoryLabel: 'Historical and Religious Destinations', region: 'Wonchi Crater Lake', image: '/images/dest-wonchi.png', imageAlt: 'Wonchi Crater Lake route to Cherkos Monastery', relatedTourSlugs: ['wonchi-crater-lake-day-tour'] },
  { name: 'Melka Kunture', slug: 'melka-kunture', category: 'historical-religious', categoryLabel: 'Historical and Religious Destinations', region: 'Central Ethiopia', relatedTourSlugs: ['10-day-omo-valley-bale-mountains-cultural-adventure'] },
  { name: 'Adadi Maryam', slug: 'adadi-maryam', category: 'historical-religious', categoryLabel: 'Historical and Religious Destinations', region: 'Central Ethiopia', relatedTourSlugs: ['10-day-omo-valley-bale-mountains-cultural-adventure'] },
  { name: 'Karo', slug: 'karo', category: 'tribal-cultural', categoryLabel: 'Tribal and Cultural Destinations', region: 'Omo Valley', image: '/images/exp-omo.png', imageAlt: 'Omo Valley route through Karo villages', relatedTourSlugs: ['10-day-omo-valley-bale-mountains-cultural-adventure', '12-day-historic-north-omo-valley-tour'] },
  { name: 'Nyangatom', slug: 'nyangatom', category: 'tribal-cultural', categoryLabel: 'Tribal and Cultural Destinations', region: 'Omo Valley', image: '/images/exp-omo.png', imageAlt: 'Omo Valley route through Nyangatom communities', relatedTourSlugs: ['10-day-omo-valley-bale-mountains-cultural-adventure'] },
  { name: 'Omorate', slug: 'omorate', category: 'tribal-cultural', categoryLabel: 'Tribal and Cultural Destinations', region: 'Omo Valley', image: '/images/exp-omo.png', imageAlt: 'Omo River route near Omorate', relatedTourSlugs: ['10-day-omo-valley-bale-mountains-cultural-adventure'] },
  { name: 'Dassanech', slug: 'dassanech', category: 'tribal-cultural', categoryLabel: 'Tribal and Cultural Destinations', region: 'Omo Valley', image: '/images/exp-omo.png', imageAlt: 'Omo Valley route through Dassanech communities', relatedTourSlugs: ['10-day-omo-valley-bale-mountains-cultural-adventure'] },
  { name: 'Hawassa', slug: 'hawassa', category: 'lakes-scenic', categoryLabel: 'Lakes, Waterfalls, and Scenic Destinations', region: 'Great Rift Valley', image: '/images/client/custom/hawassa.jpg', imageAlt: 'Hawassa lake region in Southern Ethiopia', relatedTourSlugs: ['10-day-omo-valley-bale-mountains-cultural-adventure'] },
]

function createPendingHighlights(name: string) {
  return [
    name,
    'Category and region confirmed from the client destination list',
    'Detailed destination information will be added soon',
  ]
}

function createPendingItinerary(name: string) {
  return [
    `Plan around ${name}`,
    'Add verified route details',
    'Confirm timing with the client',
  ]
}

function buildDestination(seed: DestinationSeed): Destination {
  const shortDescription = seed.shortDescription || PENDING_OVERVIEW
  const overview = seed.overview || PENDING_OVERVIEW
  const image = seed.image || TEMPORARY_DESTINATION_IMAGE
  const primaryKeyword = seed.primaryKeyword || `${seed.name} Tours`
  const title = seed.seoTitle || `${seed.name} Tours`
  const description =
    seed.seoDescription ||
    `Plan a visit to ${seed.name}, part of Ethiopia's ${seed.categoryLabel.toLowerCase()}. Detailed destination information will be added soon.`
  const highlights = seed.highlights || createPendingHighlights(seed.name)
  const itinerary = seed.itinerary || createPendingItinerary(seed.name)

  return {
    slug: seed.slug,
    name: seed.name,
    category: seed.category,
    categoryLabel: seed.categoryLabel,
    region: seed.region,
    shortDescription,
    overview,
    relatedTourSlugs: seed.relatedTourSlugs || [],
    gallery: seed.image ? [image] : [],
    place: seed.region,
    duration: 'Custom',
    description: shortDescription,
    intro: overview,
    image,
    highlights,
    bestFor: seed.bestFor || seed.categoryLabel,
    itinerary,
    imageAlt:
      seed.imageAlt ||
      `${seed.name} destination in Ethiopia - temporary image pending client assets`,
    seo: {
      title,
      description,
      canonicalPath: `/destinations/${seed.slug}`,
      primaryKeyword,
      secondaryKeywords: seed.secondaryKeywords || [
        seed.name,
        seed.categoryLabel,
        'Ethiopia Destinations',
      ],
      ogImage: image,
      ogImageAlt:
        seed.imageAlt ||
        `${seed.name} destination in Ethiopia - temporary image pending client assets`,
    },
  }
}

export const destinations: Destination[] = destinationSeeds.map(buildDestination)
