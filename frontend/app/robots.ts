import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/seo/site-config'

export default function robots(): MetadataRoute.Robots {
  if (!siteConfig.publicIndexingAllowed) {
    return {
      rules: [
        {
          userAgent: '*',
          disallow: '/',
        },
      ],
      sitemap: `${siteConfig.url}/sitemap.xml`,
      host: siteConfig.url,
    }
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/api/admin/',
          '/api/auth/',
          '/admin/',
          '/dashboard/',
          '/preview/',
          '/*?gclid=',
          '/*?utm_',
        ],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  }
}
