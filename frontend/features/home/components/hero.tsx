'use client'

import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { trackSeoEvent } from '@/lib/analytics/events'
import { useLanguage } from '@/lib/i18n/language'
import { cloudinaryImage, cloudinaryTransforms } from '@/lib/images/cloudinary'

const MotionImage = motion(Image)

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
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const [loadAnimatedSlides, setLoadAnimatedSlides] = useState(false)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.62, 0.86])

  useEffect(() => {
    if (reduceMotion) return

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(
        () => setLoadAnimatedSlides(true),
        { timeout: 2500 },
      )

      return () => window.cancelIdleCallback(idleId)
    }

    const timeout = globalThis.setTimeout(() => setLoadAnimatedSlides(true), 1800)
    return () => globalThis.clearTimeout(timeout)
  }, [reduceMotion])

  return (
    <section
      ref={ref}
      id="home"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-forest pt-24 sm:pt-28"
    >
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <Image
          src={cloudinaryImage(heroFrames[0].src, cloudinaryTransforms.hero)}
          alt={heroFrames[0].alt}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 size-full scale-110 object-cover object-center"
        />
        {loadAnimatedSlides &&
          !reduceMotion &&
          heroFrames.slice(1).map((frame, i) => (
            <MotionImage
              key={frame.src}
              src={cloudinaryImage(frame.src, cloudinaryTransforms.hero)}
              alt=""
              aria-hidden="true"
              fill
              sizes="100vw"
              initial={{
                opacity: 0,
                scale: 1.08,
                x: i % 2 === 0 ? '-1.5%' : '1.5%',
              }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [1.08, 1.16],
                x: i % 2 === 0 ? ['-1.5%', '1.5%'] : ['1.5%', '-1.5%'],
              }}
              transition={{
                opacity: {
                  duration: 24,
                  repeat: Infinity,
                  delay: i * 6 + 1,
                  times: [0, 0.12, 0.34, 0.48],
                },
                scale: {
                  duration: 24,
                  repeat: Infinity,
                  delay: i * 6 + 1,
                  ease: 'linear',
                },
                x: {
                  duration: 24,
                  repeat: Infinity,
                  delay: i * 6 + 1,
                  ease: 'linear',
                },
              }}
              className="absolute inset-0 size-full object-cover object-center"
            />
          ))}
      </motion.div>
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(13,23,18,0.92)_0%,rgba(24,24,20,0.78)_48%,rgba(13,23,18,0.82)_100%)] sm:bg-[linear-gradient(90deg,rgba(13,23,18,0.94)_0%,rgba(24,24,20,0.76)_42%,rgba(18,23,20,0.32)_100%)]"
      />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_72%_40%,rgba(255,255,255,0.08)_0,transparent_30%,rgba(0,0,0,0.58)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-1/2 bg-gradient-to-t from-black/70 via-black/24 to-transparent" />
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          animate={{ opacity: [0.08, 0.18, 0.08], x: ['-8%', '8%'] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute inset-0 z-[4] bg-[linear-gradient(112deg,transparent_0%,rgba(255,255,255,0.13)_42%,transparent_58%)] mix-blend-soft-light"
        />
      )}

      <div className="relative z-10 mx-auto flex w-full max-w-5xl justify-center px-4 py-20 text-center sm:px-6 md:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mb-5 flex items-center justify-center gap-2 font-sans text-[0.66rem] uppercase tracking-[0.2em] text-gold sm:gap-3 sm:text-xs sm:tracking-luxe md:text-sm"
          >
            <span className="h-px w-7 bg-gold/80 sm:w-10" />
            {t.hero.eyebrow}
            <span className="h-px w-7 bg-gold/80 sm:w-10" />
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35 }}
            className="mx-auto max-w-[22rem] text-balance font-serif text-4xl font-medium leading-[0.98] text-cream min-[380px]:text-5xl sm:max-w-none sm:text-6xl md:text-7xl lg:text-8xl"
          >
            {t.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="mx-auto mt-5 max-w-[21rem] text-pretty font-sans text-sm font-light leading-relaxed text-cream/86 sm:mt-7 sm:max-w-2xl sm:text-base md:text-lg"
          >
            {t.hero.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8 }}
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
          </motion.div>
        </div>
      </div>

      <motion.a
        href="/#trust"
        aria-label={t.hero.scroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.2, duration: 0.8 },
          y: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
        }}
        className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 text-cream/80 sm:bottom-8"
      >
        <ChevronDown className="size-7" />
      </motion.a>
    </section>
  )
}
