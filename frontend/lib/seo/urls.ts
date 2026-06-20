import { siteConfig } from './site-config'

export function absoluteUrl(path = '/') {
  if (/^https?:\/\//.test(path)) {
    return path
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${siteConfig.url}${normalizedPath}`
}
