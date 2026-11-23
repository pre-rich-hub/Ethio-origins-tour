import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import ts from 'typescript'

const ROOT = new URL('..', import.meta.url).pathname
const moduleCache = new Map()

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

function read(relativePath) {
  return fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), 'utf8')
}

function resolveModule(request, fromFile) {
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

  const source = read(relativePath)
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
      const resolved = resolveModule(id, absolutePath)
      if (resolved) {
        return loadTs(path.relative(ROOT, resolved))
      }
      throw new Error(`Unexpected import in validation script: ${id}`)
    },
  }

  sandbox.exports = cjsModule.exports
  vm.runInNewContext(code, sandbox, { filename: relativePath })
  moduleCache.set(absolutePath, cjsModule.exports)
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

const newTourAdmin = read('app/admin/tours/new/tour-new-client.tsx')
const editTourAdmin = read('app/admin/tours/[id]/tour-edit-client.tsx')
for (const [label, source] of [
  ['new tour form', newTourAdmin],
  ['edit tour form', editTourAdmin],
]) {
  assert(
    !source.includes("formData.delete('tourImages')"),
    `${label} must preserve the native multipart image payload.`,
  )
  assert(
    source.includes('adminRequest('),
    `${label} must surface structured admin API errors.`,
  )
}

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
  const fallbackEnv = envModule.getPublicEnv()
  assert(
    fallbackEnv.apiBaseUrl === 'https://api.ethiooriginstour.com',
    'invalid API URL must fall back to the derived production origin.',
  )

  process.env.NEXT_PUBLIC_API_BASE_URL = 'https://api.example.com'
  const explicitEnv = envModule.getPublicEnv()
  assert(
    explicitEnv.apiBaseUrl === 'https://api.example.com',
    'valid API URL must win over the derived origin.',
  )

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
