export type SeoData = {
  title: string
  description: string
  canonicalPath: string
  primaryKeyword: string
  secondaryKeywords?: readonly string[]
  ogImage?: string
  ogImageAlt?: string
  noIndex?: boolean
}
