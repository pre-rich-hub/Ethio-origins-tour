'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { trackSeoEvent } from '@/lib/analytics/events'
import { useLanguage } from '@/lib/i18n/language'
import { cloudinaryImage, cloudinaryTransforms } from '@/lib/images/cloudinary'

const heroFrames = [
  {
    src: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782244137/Ancient_Wonders_The_Monolithic_Rock-Cut_Church_of_Lalibela_Ethiopia_gh7iwx.jpg',
    alt: 'Sunrise over the Simien Mountains in Ethiopia',
  },
  {
    src: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782244137/Simien_Mountains_Ethiopia_kly2ho.jpg',
    alt: 'Simien Mountains escarpment in Ethiopia',
  },
  {
    src: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782244137/Ethiopia_h1whvn.jpg',
    alt: 'Danakil Depression landscape in Ethiopia',
  },
  {
    src: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782244137/adiss_ababa_Ethiopia_wj8emk.jpg',
    alt: 'Omo Valley landscape in Ethiopia',
  },
]

export function Hero() {
  const { t } = useLanguage()

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-forest pt-24 sm:pt-28"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={cloudinaryImage(heroFrames[0].src, cloudinaryTransforms.hero)}
          alt={heroFrames[0].alt}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 size-full scale-110 object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(13,23,18,0.92)_0%,rgba(24,24,20,0.78)_48%,rgba(13,23,18,0.82)_100%)] sm:bg-[linear-gradient(90deg,rgba(13,23,18,0.94)_0%,rgba(24,24,20,0.76)_42%,rgba(18,23,20,0.32)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_72%_40%,rgba(255,255,255,0.08)_0,transparent_30%,rgba(0,0,0,0.58)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-1/2 bg-gradient-to-t from-black/70 via-black/24 to-transparent" />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl justify-center px-4 py-20 text-center sm:px-6 md:px-8">
        <div className="mx-auto max-w-4xl">
          <p
            className="mb-5 flex items-center justify-center gap-2 font-sans text-[0.66rem] uppercase tracking-[0.2em] text-gold sm:gap-3 sm:text-xs sm:tracking-luxe md:text-sm"
          >
            <span className="h-px w-7 bg-gold/80 sm:w-10" />
            {t.hero.eyebrow}
            <span className="h-px w-7 bg-gold/80 sm:w-10" />
          </p>
          <h1
            className="mx-auto max-w-[22rem] text-balance font-serif text-4xl font-medium leading-[0.98] text-cream min-[380px]:text-5xl sm:max-w-none sm:text-6xl md:text-7xl lg:text-8xl"
          >
            {t.hero.title}
          </h1>
          <p
            className="mx-auto mt-5 max-w-[21rem] text-pretty font-sans text-sm font-light leading-relaxed text-cream/86 sm:mt-7 sm:max-w-2xl sm:text-base md:text-lg"
          >
            {t.hero.description}
          </p>
          <div
            className="mt-8 flex flex-col justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4"
          >
            <Link
              href="/tours"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-sm bg-gold px-6 font-sans text-xs uppercase tracking-widest text-coffee transition-transform hover:-translate-y-0.5 sm:h-14 sm:w-auto sm:px-7 sm:text-sm"
            >
              {t.hero.primaryCta}
              <ArrowRight className="size-4" />
            </Link>
            <a
              href="/contact"
              onClick={() =>
                trackSeoEvent('main_contact_cta_clicked', {
                  route: '/',
                  ctaLocation: 'homepage_hero',
                })
              }
              className="inline-flex h-12 w-full items-center justify-center rounded-sm border border-cream/55 px-6 font-sans text-xs uppercase tracking-widest text-cream backdrop-blur-sm transition-colors hover:bg-cream/10 sm:h-14 sm:w-auto sm:px-7 sm:text-sm"
            >
              {t.hero.secondaryCta}
            </a>
          </div>
        </div>
      </div>

      <a
        href="/#trust"
        aria-label={t.hero.scroll}
        className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 text-cream/80 sm:bottom-8"
      >
        <ChevronDown className="size-7" />
      </a>
    </section>
  )
}
