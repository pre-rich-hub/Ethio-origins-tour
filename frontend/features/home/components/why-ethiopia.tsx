'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Reveal } from '@/components/shared/reveal'
import { useLanguage } from '@/lib/i18n/language'
import { cloudinaryImage, cloudinaryTransforms } from '@/lib/images/cloudinary'

const facts = [
  { value: 'Ancient', label: 'History' },
  { value: 'Living', label: 'Cultures' },
  { value: 'Epic', label: 'Landscapes' },
  { value: 'Local', label: 'Experiences' },
]

export function WhyEthiopia() {
  const { t } = useLanguage()
  const translatedFacts = facts.map((fact, index) => ({
    value: t.why.facts[index]?.[0] ?? fact.value,
    label: t.why.facts[index]?.[1] ?? fact.label,
  }))

  return (
    <section id="about" className="bg-coffee py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative h-[420px] overflow-hidden rounded-md md:h-[560px]">
            <Image
              src={cloudinaryImage(
                'https://res.cloudinary.com/divimnzxa/image/upload/v1782244137/adiss_ababa_Ethiopia_wj8emk.jpg',
                cloudinaryTransforms.portrait,
              )}
              alt="Ethiopian Orthodox priest holding an ornate cross"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-coffee/40 to-transparent" />
          </div>
        </Reveal>

        <div>
          <p className="mb-3 font-sans text-xs uppercase tracking-luxe text-gold">
            {t.why.eyebrow}
          </p>
          <h2 className="text-balance font-serif text-3xl font-medium leading-tight text-cream md:text-5xl">
            {t.why.title}
          </h2>
          <p className="mt-4 max-w-md text-pretty font-sans text-base font-light leading-relaxed text-cream/75">
            {t.why.description}
          </p>

          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3">
            {translatedFacts.map((f, i) => (
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
