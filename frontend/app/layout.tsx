import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/json-ld'
import { LanguageProvider } from '@/lib/i18n/language'
import { createOrganizationSchema, createTravelAgencySchema, createWebsiteSchema } from '@/lib/seo/schemas'
import { siteConfig } from '@/lib/seo/site-config'
import { ChatWidgetLoader } from '@/features/assistant/components/chat-widget-loader'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Ethiopia Tour Company`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [
    {
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ],

  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: '/',
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Ethiopia Tour Company`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.defaultOgImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Ethiopia tours`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | Ethiopia Tour Company`,
    description: siteConfig.description,
    images: [siteConfig.defaultOgImage],
  },
  robots: siteConfig.publicIndexingAllowed
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-image-preview': 'large',
          'max-snippet': -1,
          'max-video-preview': -1,
        },
      }
    : {
        index: false,
        follow: false,
      },
  category: 'travel',
  icons: {
    icon: [
      { url: '/favicon.ico?v=20260701', sizes: 'any', type: 'image/x-icon' },
      { url: '/ethio-origin-favicon-transparent-2026.png?v=20260701', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico?v=20260701'],
    apple: [{ url: '/ethio-origin-apple-icon-transparent-2026.png?v=20260701', sizes: '512x512', type: 'image/png' }],
  },
  manifest: '/manifest.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        <LanguageProvider>
          <JsonLd data={createOrganizationSchema()} />
          <JsonLd data={createTravelAgencySchema()} />
          <JsonLd data={createWebsiteSchema()} />
          {children}
          <ChatWidgetLoader />
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </LanguageProvider>
      </body>
    </html>
  )
}
