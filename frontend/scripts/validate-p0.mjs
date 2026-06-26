import fs from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

function read(path) {
  return fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
}

function loadTs(path) {
  const source = read(path)
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
    require: (id) => {
      if (id.startsWith('@/') || id.startsWith('../types')) return {}
      throw new Error(`Unexpected import in validation script: ${id}`)
    },
  }

  sandbox.exports = cjsModule.exports
  vm.runInNewContext(code, sandbox, { filename: path })
  return cjsModule.exports
}

const nextConfig = read('next.config.mjs')
assert(!nextConfig.includes('ignoreBuildErrors'), 'next.config.mjs must not ignore TypeScript build errors.')

const loginPage = read('app/login/page.tsx')
const adminLayout = read('app/admin/layout.tsx')
const adminPage = read('app/admin/page.tsx')
const adminDocumentsPage = read('app/admin/documents/page.tsx')
for (const [label, source] of [
  ['/login', loginPage],
  ['/admin layout', adminLayout],
  ['/admin', adminPage],
  ['/admin/documents', adminDocumentsPage],
]) {
  assert(source.includes('index: false'), `${label} must be noindex.`)
  assert(source.includes('follow: false'), `${label} must be nofollow.`)
}

const { tourCategories } = loadTs('features/tours/data/tour-categories.ts')
const { tours } = loadTs('features/tours/data/tours.ts')
const sitemapSource = read('app/sitemap.ts')
assert(
  sitemapSource.includes('.filter((category) => category.indexable)'),
  'sitemap must filter tour categories by indexable status.',
)
assert(
  tourCategories.some((category) => category.slug === 'coffee-tours' && !category.indexable),
  'coffee-tours must be noindex while empty.',
)
assert(
  tourCategories.every((category) => category.indexable !== Boolean(category.seo.noIndex)),
  'category seo.noIndex must mirror indexable.',
)
assert(tours.length === 15, 'all 15 approved tours must remain present.')

const previousEnv = { ...process.env }
try {
  const envModule = loadTs('lib/env.ts')
  process.env.VERCEL_ENV = 'production'
  process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000'
  process.env.NEXT_PUBLIC_API_BASE_URL = 'https://api.example.com'
  assertThrows(() => envModule.getPublicEnv(), 'localhost site URL must fail in production.')

  process.env.NEXT_PUBLIC_SITE_URL = 'https://example.vercel.app'
  assertThrows(() => envModule.getPublicEnv(), 'vercel.app site URL must fail in production.')

  process.env.NEXT_PUBLIC_SITE_URL = 'https://ethiooriginstour.com'
  process.env.NEXT_PUBLIC_API_BASE_URL = 'http://localhost:5000'
  assertThrows(() => envModule.getPublicEnv(), 'localhost API URL must fail in production.')

  process.env.VERCEL_ENV = 'preview'
  process.env.NEXT_PUBLIC_API_BASE_URL = 'http://localhost:5000'
  const previewEnv = envModule.getPublicEnv()
  assert(previewEnv.publicIndexingAllowed === false, 'preview deployments must not allow indexing.')
} finally {
  process.env = previousEnv
}

const validation = loadTs('lib/forms/validation.ts')
assert(
  validation.validateContactInquiry({
    name: 'A',
    email: 'bad',
    phone: '',
    preferredMonth: '',
    message: 'short',
    honeypot: '',
    elapsedMs: 2000,
  }).success === false,
  'contact validation must reject invalid inquiries.',
)
assert(
  validation.validateNewsletterEmail('not-an-email').success === false,
  'newsletter validation must reject invalid emails.',
)

function assertThrows(fn, message) {
  let threw = false
  try {
    fn()
  } catch {
    threw = true
  }

  assert(threw, message)
}

console.log('P0 validation passed.')
