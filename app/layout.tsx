import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: "Ethio Origins Tours — Journey Through Ethiopia's Living Heritage",
  description:
    "Expertly crafted Ethiopian journeys connecting travelers with ancient civilizations, breathtaking landscapes, vibrant cultures, and authentic local experiences.",
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#1F4D3A',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
