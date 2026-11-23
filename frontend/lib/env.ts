import {
  isPreviewLikeUrl,
  normalizeAbsoluteUrl,
  normalizeUrl,
  resolveApiBaseUrl,
} from './url-normalize.mjs'

type PublicEnv = {
  siteUrl: string
  apiBaseUrl: string
  isProductionDeployment: boolean
  isPreviewDeployment: boolean
  publicIndexingAllowed: boolean
}

const DEFAULT_SITE_URL = 'https://ethiooriginstour.com'

export function isProductionDeployment() {
  return (
    process.env.VERCEL_ENV === 'production' ||
    process.env.NEXT_PUBLIC_DEPLOYMENT_ENV === 'production' ||
    process.env.DEPLOYMENT_ENV === 'production'
  )
}

export function isPreviewDeployment() {
  return (
    process.env.VERCEL_ENV === 'preview' ||
    process.env.NEXT_PUBLIC_DEPLOYMENT_ENV === 'preview' ||
    process.env.DEPLOYMENT_ENV === 'preview'
  )
}

export function getPublicEnv(): PublicEnv {
  const productionDeployment = isProductionDeployment()
  const previewDeployment = isPreviewDeployment()
  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL

  if (productionDeployment && !process.env.NEXT_PUBLIC_SITE_URL) {
    throw new Error('NEXT_PUBLIC_SITE_URL is required for production deployments.')
  }

  const siteUrl = normalizeAbsoluteUrl(rawSiteUrl, 'NEXT_PUBLIC_SITE_URL', {
    production: productionDeployment,
  })

  if (productionDeployment && isPreviewLikeUrl(siteUrl)) {
    throw new Error(
      `NEXT_PUBLIC_SITE_URL cannot be a preview or staging URL in production (received ${JSON.stringify(rawSiteUrl)}).`,
    )
  }

  const apiBaseUrl = resolveApiBaseUrl(
    process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL,
    siteUrl,
    {
      production: productionDeployment,
      warn: (message) => console.warn(`[env] ${message}`),
    },
  )

  return {
    siteUrl: normalizeUrl(siteUrl.toString()),
    apiBaseUrl: normalizeUrl(apiBaseUrl.toString()),
    isProductionDeployment: productionDeployment,
    isPreviewDeployment: previewDeployment,
    // Localhost is not publicly crawlable, so emitting index/follow locally is
    // safe and lets Lighthouse validate the same directives as production.
    // Explicit preview/staging deployments remain protected from indexing.
    publicIndexingAllowed: !previewDeployment && !isPreviewLikeUrl(siteUrl),
  }
}
