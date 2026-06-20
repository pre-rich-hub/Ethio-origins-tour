import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

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
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
