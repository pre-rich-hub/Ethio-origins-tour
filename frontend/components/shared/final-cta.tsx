'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/i18n/language'

export function FinalCta() {
  const { t } = useLanguage()

  return (
    <section
      id="contact"
      className="relative isolate flex min-h-[80vh] items-center justify-center overflow-hidden bg-coffee py-24"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/divimnzxa/image/upload/v1782305234/Debre_Libanos_anvjli.jpg"
          alt="A traveler overlooking endless Ethiopian mountain ranges at sunset"
          fill
          sizes="100vw"
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-coffee/70 via-forest/70 to-forest/90" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-4 font-sans text-xs uppercase tracking-luxe text-gold"
        >
          {t.finalCta.eyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-balance font-serif text-4xl font-medium leading-tight text-cream md:text-6xl"
        >
          {t.finalCta.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mx-auto mt-5 max-w-xl text-pretty font-sans text-base font-light leading-relaxed text-cream/85"
        >
          {t.finalCta.description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="/contact"
            className="w-full rounded-sm bg-gold px-8 py-4 font-sans text-sm uppercase tracking-widest text-coffee transition-transform hover:-translate-y-0.5 sm:w-auto"
          >
            {t.finalCta.primary}
          </a>
          <a
            href="/contact"
            className="w-full rounded-sm border border-cream/50 px-8 py-4 font-sans text-sm uppercase tracking-widest text-cream backdrop-blur-sm transition-colors hover:bg-cream/10 sm:w-auto"
          >
            {t.finalCta.secondary}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
