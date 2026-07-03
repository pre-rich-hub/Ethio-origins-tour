'use client'

import { useEffect, useRef, useState } from 'react'
import { Star } from 'lucide-react'

const TRUSTINDEX_WIDGET_ID = '8ae29ed755ee75313f7683d02b5'
const TRUSTINDEX_LOADER = `https://cdn.trustindex.io/loader.js?${TRUSTINDEX_WIDGET_ID}`

export function TrustindexReviews() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [requested, setRequested] = useState(false)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount || requested) return

    const loadWidget = () => {
      if (requested || mount.querySelector('script')) return

      const script = document.createElement('script')
      script.src = TRUSTINDEX_LOADER
      script.async = true
      script.defer = true
      script.dataset.trustindexWidget = TRUSTINDEX_WIDGET_ID
      mount.appendChild(script)
      setRequested(true)
    }

    if (!('IntersectionObserver' in window)) {
      loadWidget()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        loadWidget()
      },
      { rootMargin: '500px 0px' },
    )

    observer.observe(mount)
    return () => observer.disconnect()
  }, [requested])

  return (
    <>
      <section id="traveler-reviews" className="relative overflow-hidden bg-cream py-20 md:py-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        <div className="pointer-events-none absolute -right-28 top-12 size-80 rounded-full bg-gold/8 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-sans text-xs uppercase tracking-luxe text-gold-dark">
              Google &amp; TripAdvisor reviews
            </p>
            <h2 className="mt-4 text-balance font-serif text-4xl font-medium leading-tight text-foreground md:text-5xl">
              Trusted by travelers who explored Ethiopia with us
            </h2>
            <p className="mx-auto mt-5 max-w-2xl font-sans text-base font-light leading-relaxed text-muted-foreground md:text-lg">
              Read recent, independently published experiences from guests of Ethio Origins Tour.
            </p>
          </div>

          <div className="mt-10 rounded-2xl border border-coffee/10 bg-white px-4 py-7 shadow-[0_24px_70px_-36px_rgba(24,55,43,0.35)] sm:px-7 md:mt-14 md:p-10">
            <div
              ref={mountRef}
              className="min-h-[340px] w-full md:min-h-[300px]"
              aria-label="Live traveler reviews from Google and TripAdvisor"
            >
              {!requested && (
                <div className="grid min-h-[300px] animate-pulse gap-5 md:grid-cols-3" aria-hidden="true">
                  {[0, 1, 2].map((item) => (
                    <div key={item} className="rounded-xl border border-coffee/8 bg-stone/45 p-6">
                      <div className="h-4 w-28 rounded bg-coffee/10" />
                      <div className="mt-6 h-3 w-full rounded bg-coffee/8" />
                      <div className="mt-3 h-3 w-5/6 rounded bg-coffee/8" />
                      <div className="mt-3 h-3 w-2/3 rounded bg-coffee/8" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <a
        href="#traveler-reviews"
        aria-label="View Ethio Origins Tour reviews"
        className="fixed bottom-5 left-4 z-40 flex items-center gap-3 rounded-full border border-gold/45 bg-coffee/95 px-4 py-3 text-cream shadow-xl shadow-black/20 backdrop-blur transition hover:-translate-y-0.5 hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 sm:bottom-6 sm:left-6"
      >
        <span className="flex size-9 items-center justify-center rounded-full bg-gold text-coffee" aria-hidden="true">
          <Star className="size-4 fill-current" />
        </span>
        <span className="leading-none">
          <span className="block font-sans text-sm font-semibold">4.9 Excellent</span>
          <span className="mt-1 block font-sans text-[10px] uppercase tracking-[0.14em] text-cream/70">
            Verified reviews
          </span>
        </span>
      </a>
    </>
  )
}
