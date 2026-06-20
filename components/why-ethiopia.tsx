'use client'

import { motion } from 'framer-motion'
import { Reveal } from './reveal'

const facts = [
  { value: 'Ancient', label: 'History' },
  { value: 'Living', label: 'Cultures' },
  { value: 'Epic', label: 'Landscapes' },
  { value: 'Local', label: 'Experiences' },
]

export function WhyEthiopia() {
  return (
    <section id="about" className="bg-coffee py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-md">
            <img
              src="/images/why-ethiopia.png"
              alt="Ethiopian Orthodox priest holding an ornate cross"
              className="h-[420px] w-full object-cover md:h-[560px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-coffee/40 to-transparent" />
          </div>
        </Reveal>

        <div>
          <p className="mb-3 font-sans text-xs uppercase tracking-luxe text-gold">
            Why Ethiopia
          </p>
          <h2 className="text-balance font-serif text-3xl font-medium leading-tight text-cream md:text-5xl">
            Why Ethiopia Captivates Travelers
          </h2>
          <p className="mt-4 max-w-md text-pretty font-sans text-base font-light leading-relaxed text-cream/75">
            Few destinations offer such a remarkable blend of history, culture,
            nature, and authenticity. Ethiopia is home to ancient civilizations,
            UNESCO World Heritage Sites, unique wildlife, vibrant traditions,
            and some of Africa&apos;s most spectacular landscapes.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3">
            {facts.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="font-serif text-3xl font-medium text-gold md:text-4xl">
                  {f.value}
                </div>
                <div className="mt-1 font-sans text-xs uppercase tracking-wider text-cream/70">
                  {f.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
