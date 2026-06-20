import Link from 'next/link'
import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { SiteFooter } from '@/components/layout/site-footer'

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <section className="flex min-h-[70vh] items-center py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="font-sans text-xs uppercase tracking-luxe text-gold">
            Page Not Found
          </p>
          <h1 className="mt-4 font-serif text-5xl font-medium leading-tight text-foreground md:text-7xl">
            We could not find that page.
          </h1>
          <p className="mx-auto mt-6 max-w-xl font-sans text-base font-light leading-relaxed text-muted-foreground">
            The page may have moved, or the link may no longer exist. Continue
            exploring Ethiopian tours, destinations, or return home.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center bg-forest px-6 font-sans text-xs uppercase tracking-widest text-cream transition-colors hover:bg-coffee"
            >
              Go Home
            </Link>
            <Link
              href="/tours"
              className="inline-flex h-12 items-center justify-center border border-forest px-6 font-sans text-xs uppercase tracking-widest text-forest transition-colors hover:bg-forest hover:text-cream"
            >
              View Tours
            </Link>
            <Link
              href="/destinations"
              className="inline-flex h-12 items-center justify-center border border-forest px-6 font-sans text-xs uppercase tracking-widest text-forest transition-colors hover:bg-forest hover:text-cream"
            >
              View Destinations
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
