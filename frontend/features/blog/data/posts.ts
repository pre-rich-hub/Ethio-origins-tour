export type BlogContentBlock =
  | {
      type: 'paragraph'
      text: string
    }
  | {
      type: 'heading'
      text: string
    }
  | {
      type: 'list'
      items: string[]
    }

export type BlogPost = {
  slug: string
  title: string
  category: string
  date: string
  image: string
  excerpt: string
  status: 'draft' | 'published'
  contentStatus: 'excerpt-only' | 'complete'
  body?: BlogContentBlock[]
  author?: {
    name: string
    role?: string
  }
  publishedAt?: string
  updatedAt?: string
  relatedTourSlugs?: string[]
  relatedDestinationSlugs?: string[]
}

export const posts: BlogPost[] = [
  {
    slug: 'beyond-the-highlights',
    title: 'How to Experience Ethiopia Beyond the Highlights',
    category: 'Travel Insight',
    date: 'June 2026',
    image: '/images/exp-northern.png',
    excerpt:
      'A thoughtful guide to pairing iconic landmarks with slower, more personal cultural encounters.',
    status: 'draft',
    contentStatus: 'excerpt-only',
    relatedTourSlugs: ['12-day-historic-north-omo-valley-tour'],
    relatedDestinationSlugs: ['lalibela', 'omo-valley'],
  },
  {
    slug: 'private-ethiopian-journey',
    title: 'The Art of Planning a Private Ethiopian Journey',
    category: 'Private Travel',
    date: 'June 2026',
    image: '/images/gallery-coffee.png',
    excerpt:
      'What makes a tailor-made itinerary feel seamless, meaningful, and deeply connected to place.',
    status: 'draft',
    contentStatus: 'excerpt-only',
    relatedTourSlugs: ['27-day-ethiopian-history-nature-culture-adventure'],
    relatedDestinationSlugs: ['addis-ababa'],
  },
  {
    slug: 'landscapes-shape-ethiopian-story',
    title: 'Landscapes That Shape the Ethiopian Story',
    category: 'Nature & Culture',
    date: 'June 2026',
    image: '/images/exp-simien.png',
    excerpt:
      'From highland escarpments to volcanic terrain, Ethiopia rewards travelers who look closely.',
    status: 'draft',
    contentStatus: 'excerpt-only',
    relatedTourSlugs: ['4-day-danakil-depression-erta-ale-tour'],
    relatedDestinationSlugs: ['simien-mountains-national-park', 'danakil-depression'],
  },
]

export function isPublishedCompletePost(post: BlogPost) {
  return post.status === 'published' && post.contentStatus === 'complete' && Boolean(post.body?.length)
}
