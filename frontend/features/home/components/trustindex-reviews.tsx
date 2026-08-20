'use client'

import { useCallback, useEffect, useRef } from 'react'
import { ArrowLeft, ArrowRight, BadgeCheck, ExternalLink, Star } from 'lucide-react'
import { siteConfig } from '@/lib/seo/site-config'

type TripadvisorReview = {
  id: string
  author: string
  location: string
  title: string
  tripType: string
  date: string
  excerpt: string
}

const tripadvisorReviews: TripadvisorReview[] = [
  {
    id: 'iliyanna-n',
    author: 'Iliyana N',
    location: 'Yeoju-si, South Korea',
    title: 'The Perfect Introduction to Addis Ababa',
    tripType: 'Couples',
    date: 'July 2026',
    excerpt:
      'A thoughtful Addis Ababa introduction with history, culture, daily life, Lucy, Holy Trinity Cathedral, city viewpoints, and a guide who kept the day flexible.',
  },
  {
    id: 'hyun-k',
    author: 'Hyun K',
    location: 'South Korea',
    title: 'Trust and choose the best choice',
    tripType: 'Couples',
    date: 'July 2026',
    excerpt:
      'A smooth Ethiopia journey across Danakil, Erta Ale, Lalibela, and Addis Ababa, with practical care before and during the trip.',
  },
  {
    id: 'vacationfixation',
    author: 'vacationfixation',
    location: 'Brooklyn, New York',
    title: 'An unforgettable Ethiopia tour',
    tripType: 'Solo',
    date: 'July 2026',
    excerpt:
      'A passionate, professional Addis Ababa guide brought the National Museum to life and helped the guest discover excellent local honey.',
  },
  {
    id: 'goh-l',
    author: 'Goh L',
    location: 'Tripadvisor traveler',
    title: 'Well done',
    tripType: 'Traveler',
    date: 'June 2026',
    excerpt:
      'Experienced, friendly, knowledgeable guiding with clear English and steady support throughout the visit.',
  },
  {
    id: 'tourist20479391952',
    author: 'Tourist20479391952',
    location: 'Tripadvisor traveler',
    title: 'Great time, will recommend',
    tripType: 'Traveler',
    date: 'June 2026',
    excerpt:
      'A culturally rich tour led by a knowledgeable guide who kept the experience comfortable, thoughtful, and well paced.',
  },
  {
    id: 'amon-g',
    author: 'Amon G',
    location: 'Tripadvisor traveler',
    title: 'Great experience',
    tripType: 'Friends',
    date: 'June 2026',
    excerpt:
      'A warm day trip with Asfaw, whose local expertise helped the group feel looked after from start to finish.',
  },
]

function TripadvisorMark() {
  return (
    <span className="inline-flex items-center gap-2 font-sans font-black text-foreground" aria-label="Tripadvisor">
      <span className="relative flex size-8 items-center justify-center rounded-full bg-[#00aa6c]" aria-hidden="true">
        <span className="absolute left-1.5 top-2 size-2.5 rounded-full border-2 border-white" />
        <span className="absolute right-1.5 top-2 size-2.5 rounded-full border-2 border-white" />
        <span className="absolute bottom-1.5 size-1.5 rounded-full bg-white" />
      </span>
      <span>Tripadvisor</span>
    </span>
  )
}

function RatingBubbles({ size = 'default' }: { size?: 'default' | 'small' }) {
  const bubbleClass = size === 'small' ? 'size-3.5 border-[3px]' : 'size-5 border-[4px]'

  return (
    <span className="flex items-center gap-1" aria-label="5 out of 5 Tripadvisor rating">
      {[0, 1, 2, 3, 4].map((item) => (
        <span key={item} className={`${bubbleClass} rounded-full border-[#00aa6c] bg-white`} />
      ))}
    </span>
  )
}

function ReviewAvatar({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')

  return (
    <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-forest font-sans text-sm font-bold text-cream shadow-inner">
      {initials}
    </span>
  )
}

export function TrustindexReviews() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const autoScrollPausedRef = useRef(false)

  const scrollReviews = useCallback((direction: 'previous' | 'next') => {
    const scroller = scrollerRef.current
    const firstCard = scroller?.firstElementChild as HTMLElement | null
    if (!scroller || !firstCard) return

    const gap = Number.parseFloat(getComputedStyle(scroller).columnGap) || 24
    const distance = firstCard.offsetWidth + gap
    const isAtStart = scroller.scrollLeft <= 8
    const isAtEnd = scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 8

    if (direction === 'next' && isAtEnd) {
      scroller.scrollTo({ left: 0, behavior: 'smooth' })
    } else if (direction === 'previous' && isAtStart) {
      scroller.scrollTo({ left: scroller.scrollWidth, behavior: 'smooth' })
    } else {
      scroller.scrollBy({ left: direction === 'next' ? distance : -distance, behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const interval = window.setInterval(() => {
      if (!autoScrollPausedRef.current && !document.hidden) {
        scrollReviews('next')
      }
    }, 5200)

    return () => window.clearInterval(interval)
  }, [scrollReviews])

  return (
    <>
      <section
        id="traveler-reviews"
        className="relative overflow-hidden bg-[linear-gradient(180deg,#faf8f4_0%,#f5ecdd_100%)] py-20 md:py-28"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/55 to-transparent" />

        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[18rem_minmax(0,1fr)] lg:items-center">
          <aside className="relative">
            <div className="max-w-sm rounded-[2rem] rounded-tr-[4.5rem] border border-gold/20 bg-cream/55 p-6 shadow-[0_26px_70px_-42px_rgba(24,55,43,0.55)] backdrop-blur">
              <p className="font-sans text-2xl font-black uppercase leading-none text-foreground">
                Excellent
              </p>
              <div className="mt-4">
                <RatingBubbles />
              </div>
              <p className="mt-4 font-sans text-base text-foreground">
                Based on <span className="font-black">9 Tripadvisor reviews</span>
              </p>
              <a
                href={siteConfig.social.tripadvisor}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground underline decoration-[#00aa6c]/50 underline-offset-4 transition hover:text-[#007a55]"
              >
                <TripadvisorMark />
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            </div>
          </aside>

          <div className="relative min-w-0">
            <button
              type="button"
              onClick={() => scrollReviews('previous')}
              className="absolute left-0 top-1/2 z-10 hidden size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-coffee/10 bg-white text-foreground shadow-[0_18px_45px_-24px_rgba(24,55,43,0.6)] transition hover:-translate-x-[55%] hover:border-[#00aa6c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00aa6c] lg:flex"
              aria-label="Previous Tripadvisor review"
            >
              <ArrowLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollReviews('next')}
              className="absolute right-0 top-1/2 z-10 hidden size-12 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-coffee/10 bg-foreground text-cream shadow-[0_18px_45px_-24px_rgba(24,55,43,0.6)] transition hover:translate-x-[55%] hover:border-[#00aa6c] hover:bg-[#00aa6c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00aa6c] lg:flex"
              aria-label="Next Tripadvisor review"
            >
              <ArrowRight className="size-5" />
            </button>

            <div
              ref={scrollerRef}
              className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              onMouseEnter={() => { autoScrollPausedRef.current = true }}
              onMouseLeave={() => { autoScrollPausedRef.current = false }}
              onTouchStart={() => { autoScrollPausedRef.current = true }}
              onTouchEnd={() => { autoScrollPausedRef.current = false }}
              onFocusCapture={() => { autoScrollPausedRef.current = true }}
              onBlurCapture={() => { autoScrollPausedRef.current = false }}
              aria-label="Tripadvisor review carousel"
            >
              {tripadvisorReviews.map((review) => (
                <article
                  key={review.id}
                  className="flex min-h-[19rem] w-[86%] flex-none snap-start flex-col rounded-[2rem] rounded-tr-[5rem] border border-gold/20 bg-cream/55 p-7 shadow-[0_28px_78px_-50px_rgba(24,55,43,0.68)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-cream/70 hover:shadow-[0_34px_90px_-48px_rgba(24,55,43,0.72)] sm:w-[calc((100%-1.25rem)/2)] xl:w-[calc((100%-2.5rem)/3)]"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <ReviewAvatar name={review.author} />
                    <div className="min-w-0">
                      <h3 className="truncate font-sans text-xl font-black uppercase leading-none text-foreground">
                        {review.author}
                      </h3>
                      <p className="mt-2 truncate font-sans text-sm text-muted-foreground">
                        {review.location}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-3">
                    <RatingBubbles />
                    <span
                      className="inline-flex size-6 items-center justify-center rounded-full bg-[#2f80ed] text-white shadow-sm"
                      aria-label="Verified on Tripadvisor"
                      title="Verified on Tripadvisor"
                    >
                      <BadgeCheck className="size-4" aria-hidden="true" />
                    </span>
                  </div>

                  <p className="mt-5 font-sans text-sm font-bold text-foreground">
                    {review.title}
                  </p>
                  <p className="mt-3 flex-1 text-pretty font-sans text-base leading-relaxed text-foreground/82">
                    {review.excerpt}
                  </p>

                  <a
                    href={siteConfig.social.tripadvisor}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex w-fit items-center gap-3 font-sans text-sm font-black text-foreground underline decoration-[#00aa6c]/40 underline-offset-4 transition hover:text-[#007a55]"
                    aria-label={`Read more of ${review.author}'s Tripadvisor review`}
                  >
                    <span className="relative flex size-9 items-center justify-center rounded-full bg-[#00aa6c] text-white" aria-hidden="true">
                      <span className="absolute left-2 top-2.5 size-2.5 rounded-full border-2 border-white" />
                      <span className="absolute right-2 top-2.5 size-2.5 rounded-full border-2 border-white" />
                      <span className="absolute bottom-2 size-1.5 rounded-full bg-white" />
                    </span>
                    Read more
                    <ExternalLink className="size-4" aria-hidden="true" />
                  </a>

                  <footer className="mt-6 flex items-center justify-between font-sans text-sm text-muted-foreground">
                    <span>{review.tripType}</span>
                    <span>{review.date}</span>
                  </footer>
                </article>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-end gap-3 lg:hidden">
              <button
                type="button"
                onClick={() => scrollReviews('previous')}
                className="flex size-11 items-center justify-center rounded-full border border-coffee/15 bg-white text-foreground shadow-sm transition hover:border-[#00aa6c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00aa6c]"
                aria-label="Previous Tripadvisor review"
              >
                <ArrowLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollReviews('next')}
                className="flex size-11 items-center justify-center rounded-full border border-coffee/15 bg-foreground text-cream shadow-sm transition hover:border-[#00aa6c] hover:bg-[#00aa6c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00aa6c]"
                aria-label="Next Tripadvisor review"
              >
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <a
        href="#traveler-reviews"
        aria-label="View Ethio Origins Tour Tripadvisor reviews"
        className="fixed bottom-5 left-4 z-40 flex items-center gap-3 rounded-full border border-[#00aa6c]/40 bg-white/95 px-4 py-3 text-foreground shadow-xl shadow-black/15 backdrop-blur transition hover:-translate-y-0.5 hover:border-[#00aa6c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00aa6c] focus-visible:ring-offset-2 sm:bottom-6 sm:left-6"
      >
        <span className="flex size-9 items-center justify-center rounded-full bg-[#00aa6c] text-white" aria-hidden="true">
          <Star className="size-4 fill-current" />
        </span>
        <span className="leading-none">
          <span className="block font-sans text-sm font-black">5.0 Excellent</span>
          <span className="mt-1 block font-sans text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            Tripadvisor
          </span>
        </span>
      </a>

    </>
  )
}
