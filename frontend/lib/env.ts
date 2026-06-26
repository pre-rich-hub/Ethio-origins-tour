type PublicEnv = {
  siteUrl: string
  apiBaseUrl: string
  isProductionDeployment: boolean
  isPreviewDeployment: boolean
  publicIndexingAllowed: boolean
}

const DEFAULT_SITE_URL = 'https://ethiooriginstour.com'
const DEFAULT_LOCAL_API_BASE_URL = 'http://localhost:5000'

function normalizeUrl(value: string) {
  return value.replace(/\/+$/, '')
}

function parseUrl(value: string, label: string) {
  try {
    const url = new URL(value)

    if (!['http:', 'https:'].includes(url.protocol)) {
      throw new Error(`${label} must use http or https.`)
    }

    return url
  } catch (error) {
    throw new Error(
      `${label} must be a valid absolute URL.${error instanceof Error ? ` ${error.message}` : ''}`,
    )
  }
}

function isLocalhost(url: URL) {
  return ['localhost', '127.0.0.1', '0.0.0.0', '::1'].includes(url.hostname)
}

function isPreviewLikeUrl(url: URL) {
  const hostname = url.hostname.toLowerCase()

  return (
    hostname.endsWith('.vercel.app') ||
    hostname.includes('staging') ||
    hostname.includes('preview')
  )
}

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
  const siteUrl = parseUrl(normalizeUrl(rawSiteUrl), 'NEXT_PUBLIC_SITE_URL')

  if (productionDeployment) {
    if (!process.env.NEXT_PUBLIC_SITE_URL) {
      throw new Error('NEXT_PUBLIC_SITE_URL is required for production deployments.')
    }

    if (isLocalhost(siteUrl)) {
      throw new Error('NEXT_PUBLIC_SITE_URL cannot be localhost in production.')
    }

    if (isPreviewLikeUrl(siteUrl)) {
      throw new Error(
        'NEXT_PUBLIC_SITE_URL cannot be a preview or staging URL in production.',
      )
    }
  }

  const rawApiBaseUrl =
    process.env.API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    DEFAULT_LOCAL_API_BASE_URL
  const apiBaseUrl = parseUrl(normalizeUrl(rawApiBaseUrl), 'API base URL')

  if (productionDeployment) {
    if (!process.env.API_BASE_URL && !process.env.NEXT_PUBLIC_API_BASE_URL) {
      throw new Error('API_BASE_URL or NEXT_PUBLIC_API_BASE_URL is required in production.')
    }

    if (isLocalhost(apiBaseUrl)) {
      throw new Error('API base URL cannot be localhost in production.')
    }
  }

  return {
    siteUrl: normalizeUrl(siteUrl.toString()),
    apiBaseUrl: normalizeUrl(apiBaseUrl.toString()),
    isProductionDeployment: productionDeployment,
    isPreviewDeployment: previewDeployment,
    publicIndexingAllowed: productionDeployment && !previewDeployment,
  }
}
