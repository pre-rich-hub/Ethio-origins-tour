'use client'

import Link from 'next/link'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="flex min-h-screen items-center py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="font-sans text-xs uppercase tracking-luxe text-gold">
            Something Went Wrong
          </p>
          <h1 className="mt-4 font-serif text-5xl font-medium leading-tight md:text-7xl">
            We could not load this page.
          </h1>
          <p className="mx-auto mt-6 max-w-xl font-sans text-base font-light leading-relaxed text-muted-foreground">
            Please try again, or continue exploring Ethiopia tours and
            destinations from the main pages.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={reset}
              className="inline-flex h-12 items-center justify-center bg-forest px-6 font-sans text-xs uppercase tracking-widest text-cream transition-colors hover:bg-coffee"
            >
              Try Again
            </button>
            <Link
              href="/tours"
              className="inline-flex h-12 items-center justify-center border border-forest px-6 font-sans text-xs uppercase tracking-widest text-forest transition-colors hover:bg-forest hover:text-cream"
            >
              View Tours
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center border border-forest px-6 font-sans text-xs uppercase tracking-widest text-forest transition-colors hover:bg-forest hover:text-cream"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
