'use client'

import { motion } from 'framer-motion'

export function FinalCta() {
  return (
    <section
      id="contact"
      className="relative isolate flex min-h-[80vh] items-center justify-center overflow-hidden bg-coffee py-24"
    >
      <div className="absolute inset-0 z-0">
        <img
          src="/images/cta.png"
          alt="A traveler overlooking endless Ethiopian mountain ranges at sunset"
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
          Begin the Journey
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-balance font-serif text-4xl font-medium leading-tight text-cream md:text-6xl"
        >
          Your Ethiopian Story Starts Here
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mx-auto mt-5 max-w-xl text-pretty font-sans text-base font-light leading-relaxed text-cream/85"
        >
          Whether you&apos;re seeking adventure, culture, wildlife, or history,
          we&apos;ll create a journey you&apos;ll never forget.
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
            Plan Your Journey
          </a>
          <a
            href="/contact"
            className="w-full rounded-sm border border-cream/50 px-8 py-4 font-sans text-sm uppercase tracking-widest text-cream backdrop-blur-sm transition-colors hover:bg-cream/10 sm:w-auto"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  )
}
