'use client'

import { useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import { SectionHeading } from '@/components/shared/section-heading'
import { useLanguage } from '@/lib/i18n/language'
import { cloudinaryImage, cloudinaryTransforms } from '@/lib/images/cloudinary'
import type { CmsTestimonial } from '@/lib/api/cms'

type HomeTestimonialsProps = {
  items?: CmsTestimonial[]
}

export function HomeTestimonials({ items = [] }: HomeTestimonialsProps) {
  const { t } = useLanguage()
  const scrollerRef = useRef<HTMLDivElement>(null)
  const autoScrollPausedRef = useRef(false)
  const visibleTestimonials = items.map((testimonial) => ({
    ...testimonial,
    key: `cms-${testimonial.id}`,
    country: '',
    image: '',
  }))

  const scrollTestimonials = useCallback((direction: 'previous' | 'next') => {
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
    if (visibleTestimonials.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const interval = window.setInterval(() => {
      if (!autoScrollPausedRef.current && !document.hidden) {
        scrollTestimonials('next')
      }
    }, 4500)

    return () => window.clearInterval(interval)
  }, [scrollTestimonials, visibleTestimonials.length])

  if (visibleTestimonials.length === 0) return null

  return (
    <section className="bg-sand py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow={t.testimonials.eyebrow}
          title={t.testimonials.title}
          description={t.testimonials.description}
        />

        <div className="mt-8 flex items-center justify-end gap-3" aria-label="Testimonial carousel controls">
          <button
            type="button"
            onClick={() => scrollTestimonials('previous')}
            className="group flex size-11 items-center justify-center rounded-full border border-coffee/15 bg-cream text-forest shadow-sm transition hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-sand"
            aria-label="Previous testimonial"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
          </button>
          <button
            type="button"
            onClick={() => scrollTestimonials('next')}
            className="group flex size-11 items-center justify-center rounded-full border border-coffee/15 bg-forest text-cream shadow-sm transition hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-sand"
            aria-label="Next testimonial"
          >
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        <div
          ref={scrollerRef}
          className="mt-5 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onMouseEnter={() => { autoScrollPausedRef.current = true }}
          onMouseLeave={() => { autoScrollPausedRef.current = false }}
          onTouchStart={() => { autoScrollPausedRef.current = true }}
          onTouchEnd={() => { autoScrollPausedRef.current = false }}
          onFocusCapture={() => { autoScrollPausedRef.current = true }}
          onBlurCapture={() => { autoScrollPausedRef.current = false }}
          aria-label="Traveler testimonials"
        >
          {visibleTestimonials.map((t) => (
            <figure
              key={t.key}
              className="flex w-[88%] flex-none snap-start flex-col rounded-xl border border-coffee/10 bg-cream p-7 shadow-sm transition-shadow hover:shadow-md sm:w-[calc((100%-1.5rem)/2)] md:p-8 lg:w-[calc((100%-3rem)/3)]"
            >
              <Quote className="size-8 text-gold-dark" strokeWidth={1.5} />
              <blockquote className="mt-5 flex-1 text-pretty font-serif text-xl font-medium italic leading-relaxed text-foreground">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-4 border-t border-coffee/10 pt-6">
                {t.image ? (
                  <Image
                    src={cloudinaryImage(t.image, cloudinaryTransforms.thumbnail)}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="size-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-forest font-serif text-lg font-semibold text-cream" aria-hidden="true">
                    {t.name.trim().charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <div className="font-sans text-sm font-semibold text-foreground">
                    {t.name}
                  </div>
                  <div className="font-sans text-xs text-muted-foreground">
                    {[t.country, t.experience].filter(Boolean).join(' · ')}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
