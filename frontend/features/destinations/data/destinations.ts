import type { Destination } from '../types/destination'

export const destinations: Destination[] = [
  {
    slug: 'lalibela-and-the-north',
    name: 'Lalibela & The Northern Route',
    place: 'Amhara Highlands',
    duration: '8 days',
    description:
      'Rock-hewn churches, ancient royal cities, monastic traditions, and highland landscapes shaped by centuries of faith and craft.',
    intro:
      'Follow Ethiopia’s historic northern route through sacred architecture, imperial cities, mountain views, and intimate cultural encounters.',
    image: '/images/dest-gondar.png',
    highlights: [
      'Private guided visit to Lalibela’s rock-hewn churches',
      'Gondar castle complex and royal heritage',
      'Highland viewpoints, monasteries, and slow cultural stops',
      'Flexible pacing for photography, food, and local craft',
    ],
    bestFor: 'History, architecture, faith heritage, and highland culture',
    itinerary: ['Addis Ababa arrival', 'Lalibela churches', 'Gondar heritage', 'Highland village time'],
  },
  {
    slug: 'omo-valley-cultures',
    name: 'Omo Valley Cultural Journey',
    place: 'Southern Ethiopia',
    duration: '10 days',
    description:
      'A respectful, guided immersion into living cultures, market towns, river valleys, and community-led travel experiences.',
    intro:
      'Travel south with expert local guidance for a careful, respectful journey through Omo Valley communities and landscapes.',
    image: '/images/exp-omo.png',
    highlights: [
      'Community-led visits with local interpreters',
      'Market days and river-valley routes',
      'Photography guidance built around consent',
      'Comfortable lodges and flexible overland pacing',
    ],
    bestFor: 'Cultural immersion, photography, markets, and overland travel',
    itinerary: ['Fly to Jinka', 'Omo Valley communities', 'Market and river routes', 'Return through Arba Minch'],
  },
  {
    slug: 'danakil-depression',
    name: 'Danakil Expedition',
    place: 'Afar Region',
    duration: '5 days',
    description:
      'Otherworldly salt flats, volcanic color fields, desert caravans, and one of the most dramatic geological landscapes on earth.',
    intro:
      'A highly supported expedition through the Afar desert, designed for travelers who want raw landscape with careful logistics.',
    image: '/images/exp-danakil.png',
    highlights: [
      'Dallol geothermal color fields',
      'Salt flats and camel caravan routes',
      'Afar-guided desert logistics',
      'Sunrise and sunset landscape timing',
    ],
    bestFor: 'Expedition travel, geology, desert landscapes, and photography',
    itinerary: ['Mekelle briefing', 'Salt flats', 'Dallol landscapes', 'Desert return'],
  },
  {
    slug: 'bale-mountains',
    name: 'Bale Mountains Escape',
    place: 'Oromia Highlands',
    duration: '6 days',
    description:
      'Cloud forests, endemic wildlife, alpine plateaus, quiet lodges, and slow days in Ethiopia’s wild southeast.',
    intro:
      'A nature-forward highland escape through Bale’s forests, plateaus, wildlife corridors, and peaceful mountain lodges.',
    image: '/images/exp-bale.png',
    highlights: [
      'Sanetti Plateau wildlife drives',
      'Harenna Forest walks',
      'Endemic species and birding routes',
      'Quiet lodge stays and mountain air',
    ],
    bestFor: 'Wildlife, soft adventure, birding, and highland scenery',
    itinerary: ['Drive to Bale', 'Forest walks', 'Sanetti Plateau', 'Return through Rift Valley'],
  },
  {
    slug: 'wonchi-crater-lake',
    name: 'Wonchi Crater Retreat',
    place: 'Central Ethiopia',
    duration: '3 days',
    description:
      'A restorative crater-lake journey with horseback trails, island monasteries, warm hospitality, and gentle highland views.',
    intro:
      'Slow down near Addis Ababa with a short retreat around Wonchi’s crater lake, village trails, and island monastery.',
    image: '/images/dest-wonchi.png',
    highlights: [
      'Horseback or walking trails',
      'Boat ride across the crater lake',
      'Island monastery visit',
      'Short itinerary close to Addis Ababa',
    ],
    bestFor: 'Short escapes, families, gentle nature, and lake views',
    itinerary: ['Depart Addis', 'Crater rim walk', 'Lake and monastery', 'Return to Addis'],
  },
  {
    slug: 'awash-and-rift-valley',
    name: 'Awash & Rift Valley',
    place: 'Great Rift Valley',
    duration: '4 days',
    description:
      'Savanna wildlife, hot springs, dramatic escarpments, lake country, and accessible wilderness close to Addis Ababa.',
    intro:
      'Pair classic Rift Valley scenery with Awash wildlife, hot springs, and relaxed wilderness stops within reach of the capital.',
    image: '/images/dest-awash.png',
    highlights: [
      'Awash National Park game drives',
      'Hot springs and dramatic escarpments',
      'Rift Valley lake stops',
      'Accessible wilderness route from Addis',
    ],
    bestFor: 'Wildlife, scenery, short safaris, and first-time Ethiopia trips',
    itinerary: ['Drive to Awash', 'Game drive and falls', 'Hot springs', 'Rift Valley return'],
  },
]
