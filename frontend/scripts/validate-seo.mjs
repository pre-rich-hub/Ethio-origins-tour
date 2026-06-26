import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import ts from 'typescript'

const ROOT = path.resolve(new URL('..', import.meta.url).pathname)
const PROD_ORIGIN = 'https://ethiooriginstour.com'
const APPROVED_TOUR_TITLES = new Set([
  '12-Day Historic North & Omo Valley Cultural Adventure',
  '4-Day Danakil Depression & Erta Ale Volcano Adventure',
  '3-Day Lalibela Christmas (Genna) Festival Tour',
  '20-Day Ethiopia Historical & Cultural Adventure',
  '6-Day Ethiopia Holiday Package Tour',
  '1-Day Debre Libanos Monastery & Portuguese Bridge Excursion',
  '5-Day Lalibela & Danakil Depression Adventure',
  '3-Day Harar Cultural & Historical Tour',
  'Addis Ababa Full-Day City Tour',
  'Wonchi Crater Lake Day Tour',
  '5-Day Ethiopia Historic Route Tour',
  '10-Day Omo Valley & Bale Mountains Cultural Adventure',
  '8-Day Omo Valley Cultural Discovery Tour',
  '27-Day Ethiopian Adventure: History, Nature & Culture',
  '14-Day Ethiopia Historic Route & Danakil Depression Tour',
])

const moduleCache = new Map()
const warnings = []
const info = []

process.env.VERCEL_ENV = 'production'
process.env.NEXT_PUBLIC_SITE_URL = PROD_ORIGIN
process.env.NEXT_PUBLIC_API_BASE_URL = 'https://api.ethiooriginstour.com'

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

function warn(message) {
  warnings.push(message)
}

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8')
}

function toModulePath(request, fromFile) {
  if (request.startsWith('@/')) {
    return path.join(ROOT, `${request.slice(2)}.ts`)
  }

  if (request.startsWith('.')) {
    const candidate = path.resolve(path.dirname(fromFile), request)
    for (const extension of ['.ts', '.tsx', '.js', '.mjs']) {
      if (fs.existsSync(`${candidate}${extension}`)) return `${candidate}${extension}`
    }
    if (fs.existsSync(candidate)) return candidate
  }

  return null
}

function loadTs(relativePath) {
  const absolutePath = path.join(ROOT, relativePath)
  if (moduleCache.has(absolutePath)) return moduleCache.get(absolutePath)

  const source = fs.readFileSync(absolutePath, 'utf8')
  const code = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
  }).outputText
  const cjsModule = { exports: {} }
  const sandbox = {
    module: cjsModule,
    exports: cjsModule.exports,
    process,
    console,
    URL,
    require: (request) => {
      if (request === 'next/navigation' || request === 'next') return {}
      if (request.startsWith('node:')) return awaitlessRequire(request)
      const resolved = toModulePath(request, absolutePath)
      if (resolved) {
        return loadTs(path.relative(ROOT, resolved))
      }
      throw new Error(`Unexpected import in ${relativePath}: ${request}`)
    },
  }

  sandbox.exports = cjsModule.exports
  vm.runInNewContext(code, sandbox, { filename: relativePath })
  moduleCache.set(absolutePath, cjsModule.exports)
  return cjsModule.exports
}

function awaitlessRequire(request) {
  if (request === 'node:path') return path
  if (request === 'node:fs') return fs
  throw new Error(`Unsupported node import: ${request}`)
}

function unique(values, label) {
  const seen = new Set()
  for (const value of values) {
    assert(!seen.has(value), `${label} must be unique: ${value}`)
    seen.add(value)
  }
}

function durationDays(duration) {
  const value = Number.parseInt(duration, 10)
  return Number.isNaN(value) ? 1 : value
}

function absolute(route) {
  return `${PROD_ORIGIN}${route === '/' ? '/' : route}`
}

function publicRouteSet({ tours, destinations, tourCategories, posts, isPublishedCompletePost }) {
  return new Set([
    '/',
    '/about',
    '/blog',
    '/contact',
    '/destinations',
    '/gallery',
    '/tours',
    '/login',
    '/admin',
    '/admin/documents',
    ...tours.map((tour) => `/tours/${tour.slug}`),
    ...tourCategories.map((category) => `/tours/${category.slug}`),
    ...destinations.map((destination) => `/destinations/${destination.slug}`),
    ...posts.filter(isPublishedCompletePost).map((post) => `/blog/${post.slug}`),
  ])
}

function getRedirects() {
  const source = read('next.config.mjs')
  const redirectBlock = source.match(/async redirects\(\) \{[\s\S]*?return \[([\s\S]*?)\n\s*\]\n\s*\}/)?.[1] || ''
  const matches = [...redirectBlock.matchAll(/source: '([^']+)'[\s\S]*?destination: '([^']+)'[\s\S]*?permanent: (true|false)/g)]
  return matches.map((match) => ({
    source: match[1],
    destination: match[2],
    permanent: match[3] === 'true',
  }))
}

function collectLiteralInternalLinks() {
  const files = []
  function walk(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const fullPath = path.join(directory, entry.name)
      if (entry.isDirectory()) walk(fullPath)
      else if (/\.(tsx|ts)$/.test(entry.name)) files.push(fullPath)
    }
  }
  walk(path.join(ROOT, 'app'))
  walk(path.join(ROOT, 'components'))
  walk(path.join(ROOT, 'features'))

  const links = []
  for (const file of files) {
    const source = fs.readFileSync(file, 'utf8')
    for (const match of source.matchAll(/href=["'](\/[^"']*)["']/g)) {
      const href = match[1]
      if (href.startsWith('//')) {
        links.push({ file, href, route: href, malformed: true })
        continue
      }
      const route = href.split('#')[0].split('?')[0] || '/'
      links.push({ file, href, route, malformed: false })
    }
  }
  return links
}

const { tours } = loadTs('features/tours/data/tours.ts')
const { tourCategories } = loadTs('features/tours/data/tour-categories.ts')
const { destinations } = loadTs('features/destinations/data/destinations.ts')
const { posts, isPublishedCompletePost } = loadTs('features/blog/data/posts.ts')
const { contentKeywordTargets } = loadTs('lib/seo/content-keyword-map.ts')
const schemas = loadTs('lib/seo/schemas.ts')
const { validateJsonLd } = loadTs('lib/seo/validate-json-ld.ts')
const { getPublicEnv } = loadTs('lib/env.ts')

assert(tours.length === 15, 'Exactly 15 approved tours must exist.')
assert(tours.every((tour) => APPROVED_TOUR_TITLES.has(tour.title)), 'All tour titles must match the approved list.')
unique(tours.map((tour) => tour.id), 'Tour IDs')
unique(tours.map((tour) => tour.slug), 'Tour slugs')

const destinationSlugs = new Set(destinations.map((destination) => destination.slug))
const categorySlugs = new Set(tourCategories.map((category) => category.slug))
for (const tour of tours) {
  assert(tour.title.trim(), `Tour title is required for ${tour.slug}.`)
  assert(tour.duration.trim(), `Tour duration is required for ${tour.slug}.`)
  assert(tour.itinerary.length === durationDays(tour.duration), `Tour itinerary day count mismatch for ${tour.slug}.`)
  assert(tour.seo?.canonicalPath === `/tours/${tour.slug}`, `Tour canonical mismatch for ${tour.slug}.`)
  assert(!tour.seo.noIndex, `Approved tour must not be noindexed: ${tour.slug}.`)
  for (const slug of tour.destinationSlugs) assert(destinationSlugs.has(slug), `Invalid destination slug ${slug} in ${tour.slug}.`)
  for (const slug of tour.categorySlugs) assert(categorySlugs.has(slug), `Invalid category slug ${slug} in ${tour.slug}.`)
}

assert(destinations.length === 73, 'Exactly 73 destination records must exist.')
if (destinations.every((destination) => !('id' in destination))) {
  info.push('Destination records are slug-backed and do not expose IDs; unique destination ID validation is not applicable.')
} else {
  unique(destinations.map((destination) => destination.id), 'Destination IDs')
}
unique(destinations.map((destination) => destination.slug), 'Destination slugs')
for (const destination of destinations) {
  assert(destination.seo.canonicalPath === `/destinations/${destination.slug}`, `Destination canonical mismatch for ${destination.slug}.`)
  for (const slug of destination.relatedTourSlugs || []) assert(tours.some((tour) => tour.slug === slug), `Invalid related tour ${slug} in ${destination.slug}.`)
  for (const slug of destination.relatedDestinationSlugs || []) assert(destinationSlugs.has(slug), `Invalid related destination ${slug} in ${destination.slug}.`)
  if (destination.contentStatus === 'complete') assert(destination.indexable, `Complete destination must be indexable: ${destination.slug}.`)
  if (destination.contentStatus === 'thin') assert(!destination.indexable, `Thin destination must be noindex: ${destination.slug}.`)
  if (destination.contentStatus === 'partial') assert(!destination.indexable, `Partial destination must follow current noindex policy: ${destination.slug}.`)
}

assert(tourCategories.length === 21, 'Exactly 21 tour category records must exist.')
unique(tourCategories.map((category) => category.slug), 'Tour category slugs')
for (const category of tourCategories) {
  const count = tours.filter((tour) => tour.categorySlugs.includes(category.slug)).length
  assert(category.seo.canonicalPath === `/tours/${category.slug}`, `Category canonical mismatch for ${category.slug}.`)
  if (category.contentStatus === 'empty' || category.contentStatus === 'thin') assert(!category.indexable, `Empty/thin category must be noindex: ${category.slug}.`)
  if (count === 0) assert(!category.indexable, `Zero-tour category must not be indexable: ${category.slug}.`)
  assert(category.seo.noIndex === !category.indexable, `Category seo.noIndex must mirror indexability for ${category.slug}.`)
}

assert(posts.filter(isPublishedCompletePost).length === 0, 'No blog posts should be published/indexable yet.')
for (const post of posts) {
  if (post.status === 'draft' || post.contentStatus !== 'complete') {
    assert(!isPublishedCompletePost(post), `Draft or incomplete post must not be indexable: ${post.slug}.`)
  }
}
assert(!read('features/blog/components/blog-posts-section.tsx').includes('href={`/blog/${post.slug}`}') || read('features/blog/components/blog-posts-section.tsx').includes('isCompletePost'), 'Blog listing must not link to incomplete detail posts.')

const mainRoutes = ['/', '/about', '/blog', '/contact', '/destinations', '/gallery', '/tours']
const sitemapUrls = new Set([
  ...mainRoutes.map(absolute),
  ...destinations.filter((destination) => destination.indexable).map((destination) => absolute(destination.seo.canonicalPath)),
  ...tourCategories.filter((category) => category.indexable).map((category) => absolute(category.seo.canonicalPath)),
  ...tours.map((tour) => absolute(tour.seo.canonicalPath)),
  ...posts.filter(isPublishedCompletePost).map((post) => absolute(`/blog/${post.slug}`)),
])
unique([...sitemapUrls], 'Sitemap URLs')
assert(![...sitemapUrls].some((url) => /localhost|vercel\.app|\/admin|\/login|\/api/.test(url)), 'Sitemap must not contain localhost, preview, admin, login, or API URLs.')
for (const tour of tours) assert(sitemapUrls.has(absolute(tour.seo.canonicalPath)), `Sitemap missing tour ${tour.slug}.`)
for (const destination of destinations) {
  assert(sitemapUrls.has(absolute(destination.seo.canonicalPath)) === destination.indexable, `Destination sitemap inclusion mismatch for ${destination.slug}.`)
}
for (const category of tourCategories) {
  assert(sitemapUrls.has(absolute(category.seo.canonicalPath)) === category.indexable, `Category sitemap inclusion mismatch for ${category.slug}.`)
}

const redirects = getRedirects()
unique(redirects.map((redirect) => redirect.source), 'Redirect sources')
const routeSet = publicRouteSet({ tours, destinations, tourCategories, posts, isPublishedCompletePost })
const redirectSources = new Set(redirects.map((redirect) => redirect.source))
for (const redirect of redirects) {
  assert(redirect.permanent, `Legacy redirect should be permanent: ${redirect.source}.`)
  assert(routeSet.has(redirect.destination), `Redirect destination must exist: ${redirect.source} -> ${redirect.destination}.`)
  assert(!redirectSources.has(redirect.destination), `Redirect chain detected: ${redirect.source} -> ${redirect.destination}.`)
  assert(redirect.source !== redirect.destination, `Redirect loop detected: ${redirect.source}.`)
  assert(!sitemapUrls.has(absolute(redirect.source)), `Redirect alias must not be in sitemap: ${redirect.source}.`)
}

for (const link of collectLiteralInternalLinks()) {
  assert(!link.malformed, `Malformed internal link ${link.href} in ${path.relative(ROOT, link.file)}.`)
  assert(!/localhost|vercel\.app/.test(link.href), `Internal link must not use local/preview host: ${link.href}.`)
  assert(!redirectSources.has(link.route), `Internal link points to redirect alias ${link.route} in ${path.relative(ROOT, link.file)}.`)
  assert(routeSet.has(link.route) || link.route.startsWith('/#'), `Internal link points to unknown route ${link.route} in ${path.relative(ROOT, link.file)}.`)
}

const noindexRoutes = new Set([
  ...destinations.filter((destination) => !destination.indexable).map((destination) => `/destinations/${destination.slug}`),
  ...tourCategories.filter((category) => !category.indexable).map((category) => `/tours/${category.slug}`),
])
for (const link of collectLiteralInternalLinks()) {
  if (noindexRoutes.has(link.route)) warn(`Internal link to noindex route retained for user navigation: ${link.route}`)
}

const metadataRecords = [
  { route: '/', title: 'Ethiopia Tour Company & Local Travel Experts', description: 'Explore Ethiopia with experienced local guides. Discover cultural, historical, adventure, trekking and customized tour packages with Ethio Origins Tour.', primaryKeyword: 'Ethiopia Tour Company', indexable: true },
  { route: '/tours', title: 'Ethiopia Tour Packages & Guided Tours', description: 'Browse Ethiopia tour packages for cultural journeys, historical routes, trekking, wildlife, coffee experiences, private tours and group adventures.', primaryKeyword: 'Ethiopia Tour Packages', indexable: true },
  { route: '/destinations', title: 'Ethiopia Travel Destinations & Places to Visit', description: "Discover Ethiopia's leading travel destinations, including Lalibela, Omo Valley, Danakil Depression, Bale Mountains, Wenchi Crater Lake, Awash National Park, festivals and adventure experiences.", primaryKeyword: 'Ethiopia Travel Destinations', indexable: true },
  { route: '/about', title: 'About Our Local Ethiopia Tour Company', description: 'Learn about Ethio Origins Tour, our local guides, travel expertise, values and commitment to responsible, memorable journeys across Ethiopia.', primaryKeyword: 'About Ethio Origins Tour', indexable: true },
  { route: '/contact', title: 'Contact Us to Plan Your Ethiopia Tour', description: 'Contact Ethio Origins Tour to plan a private, group or customized Ethiopia journey. Share your dates, interests and preferred destinations with our local team.', primaryKeyword: 'Contact Ethio Origins Tour', indexable: true },
  { route: '/gallery', title: 'Ethiopia Travel Gallery', description: "Explore photographs of Ethiopia's landscapes, historical sites, cultural experiences, wildlife and destinations featured in our guided tours.", primaryKeyword: 'Ethiopia Travel Gallery', indexable: true },
  { route: '/blog', title: 'Ethiopia Travel Guide, Tips & Inspiration', description: 'Follow the Ethio Origins Tour journal for Ethiopia travel planning notes, destination context and future guide articles as they are published.', primaryKeyword: 'Ethiopia Travel Guide', indexable: true },
  ...tours.map((tour) => ({ route: `/tours/${tour.slug}`, ...tour.seo, indexable: true })),
  ...tourCategories.map((category) => ({ route: `/tours/${category.slug}`, ...category.seo, indexable: category.indexable })),
  ...destinations.map((destination) => ({ route: `/destinations/${destination.slug}`, ...destination.seo, indexable: destination.indexable })),
]
unique(metadataRecords.map((record) => record.route), 'Metadata routes')
unique(metadataRecords.map((record) => record.canonicalPath || record.route), 'Canonical URLs')
for (const record of metadataRecords) {
  const canonical = absolute(record.canonicalPath || record.route)
  assert(record.title?.trim(), `Missing SEO title for ${record.route}.`)
  assert(record.description?.trim(), `Missing SEO description for ${record.route}.`)
  assert(!/localhost|vercel\.app/.test(canonical), `Canonical contains invalid host for ${record.route}.`)
  assert(canonical === absolute(record.route), `Canonical route mismatch for ${record.route}.`)
  assert(!/internal review|placeholder|coming soon/i.test(`${record.title} ${record.description}`), `Metadata leaks internal/placeholder text for ${record.route}.`)
  if (record.indexable) assert(!record.noIndex, `Indexable route accidentally noindexed: ${record.route}.`)
  if (!record.indexable) assert(record.noIndex, `Noindex route missing metadata noIndex: ${record.route}.`)
  if (record.description.length < 50) warn(`Short meta description on ${record.route}.`)
  if (record.title.length > 70) warn(`Long SEO title on ${record.route}.`)
  if (record.description.length > 170) warn(`Long meta description on ${record.route}.`)
}

for (const key of ['title', 'description', 'primaryKeyword']) {
  const byValue = new Map()
  for (const record of metadataRecords.filter((record) => record.indexable)) {
    const value = record[key]
    if (!value) continue
    byValue.set(value, [...(byValue.get(value) || []), record.route])
  }
  for (const [value, routes] of byValue) {
    if (routes.length > 1) warn(`Duplicate ${key} among indexable pages: ${value} (${routes.join(', ')})`)
  }
}

const keywordRoutes = new Set(contentKeywordTargets.filter((target) => target.indexable).map((target) => target.route))
for (const route of [
  ...mainRoutes,
  ...tours.map((tour) => `/tours/${tour.slug}`),
  ...tourCategories.filter((category) => category.indexable).map((category) => `/tours/${category.slug}`),
  ...destinations.filter((destination) => destination.indexable).map((destination) => `/destinations/${destination.slug}`),
]) {
  assert(keywordRoutes.has(route), `Keyword map missing indexable route: ${route}.`)
}
for (const target of contentKeywordTargets) {
  assert(routeSet.has(target.route), `Keyword target route does not exist: ${target.route}.`)
  if (!target.indexable) assert(!sitemapUrls.has(absolute(target.route)), `Noindex keyword target must not be in sitemap: ${target.route}.`)
}

const schemasToValidate = [
  schemas.createOrganizationSchema(),
  schemas.createWebsiteSchema(),
  schemas.createBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Tours', path: '/tours' },
  ]),
  ...tours.slice(0, 3).map((tour) =>
    schemas.createTourSchema({
      name: tour.title,
      description: tour.description,
      image: tour.image,
      path: `/tours/${tour.slug}`,
    }),
  ),
  ...destinations.filter((destination) => destination.indexable).slice(0, 3).map((destination) =>
    schemas.createDestinationSchema({
      name: destination.name,
      description: destination.description,
      image: destination.image,
      path: `/destinations/${destination.slug}`,
    }),
  ),
]
for (const schema of schemasToValidate) {
  const result = validateJsonLd(schema)
  assert(result.valid, `Invalid JSON-LD: ${JSON.stringify(result.issues)}`)
  assert(!('price' in schema), 'Tour schema must not contain fake price.')
  assert(!('aggregateRating' in schema), 'Tour schema must not contain fake ratings.')
  assert(!('review' in schema), 'Tour schema must not contain fake reviews.')
}
assert(
  !read('app/blog/[slug]/page.tsx').includes('createArticleSchema'),
  'Incomplete blog posts must not emit Article schema.',
)

const env = getPublicEnv()
assert(env.publicIndexingAllowed, 'Production env should allow public indexing with valid URLs.')
for (const [siteUrl, apiUrl, message] of [
  ['http://localhost:3000', 'https://api.example.com', 'Localhost production site URL must fail.'],
  ['https://example.vercel.app', 'https://api.example.com', 'Preview production site URL must fail.'],
  ['not-a-url', 'https://api.example.com', 'Invalid production site URL must fail.'],
  [PROD_ORIGIN, 'http://localhost:5000', 'Localhost production API URL must fail.'],
]) {
  const previous = { ...process.env }
  process.env.VERCEL_ENV = 'production'
  process.env.NEXT_PUBLIC_SITE_URL = siteUrl
  process.env.NEXT_PUBLIC_API_BASE_URL = apiUrl
  assertThrows(() => loadFreshEnv(), message)
  process.env = previous
}

const apiClient = read('lib/api/client.ts')
assert(apiClient.includes('DEFAULT_TIMEOUT_MS'), 'API client must define a request timeout.')
assert(apiClient.includes('readJson'), 'API client must safely parse JSON responses.')
assert(apiClient.includes('response.status === 204'), 'API client must support 204 responses.')

const securityText = [
  read('next.config.mjs'),
  read('components/seo/json-ld.tsx'),
  read('lib/i18n/language.tsx'),
].join('\n')
assert(securityText.includes('X-Content-Type-Options'), 'Security headers must include nosniff.')
assert(!read('components/seo/json-ld.tsx').includes('eval('), 'JSON-LD component must not use eval.')

function loadFreshEnv() {
  moduleCache.clear()
  return loadTs('lib/env.ts').getPublicEnv()
}

function assertThrows(fn, message) {
  let threw = false
  try {
    fn()
  } catch {
    threw = true
  }
  assert(threw, message)
}

console.log(`P1 SEO validation passed. Sitemap URLs: ${sitemapUrls.size}.`)
for (const entry of info) console.log(`INFO: ${entry}`)
for (const entry of warnings) console.log(`WARN: ${entry}`)
