'use client'

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-background text-foreground">
          <section className="flex min-h-screen items-center py-24">
            <div className="mx-auto max-w-3xl px-6 text-center">
              <p className="font-sans text-xs uppercase tracking-luxe text-gold">
                Application Error
              </p>
              <h1 className="mt-4 font-serif text-5xl font-medium leading-tight md:text-7xl">
                We could not load the site.
              </h1>
              <p className="mx-auto mt-6 max-w-xl font-sans text-base font-light leading-relaxed text-muted-foreground">
                Please refresh the page or try again in a moment.
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-9 inline-flex h-12 items-center justify-center bg-forest px-6 font-sans text-xs uppercase tracking-widest text-cream transition-colors hover:bg-coffee"
              >
                Try Again
              </button>
            </div>
          </section>
        </main>
      </body>
    </html>
  )
}
