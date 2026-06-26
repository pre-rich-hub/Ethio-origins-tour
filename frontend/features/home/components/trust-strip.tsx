'use client'

import { Reveal } from '@/components/shared/reveal'
import { useLanguage } from '@/lib/i18n/language'

const stats = [
  { value: '20+', label: 'Travelers Hosted' },
  { value: '5+', label: 'Curated Experiences' },
  { value: '98%', label: 'Guest Satisfaction' },
  { value: '100%', label: 'Local Expertise' },
]

export function TrustStrip() {
  const { t } = useLanguage()
  const translatedStats = stats.map((stat, index) => ({
    ...stat,
    label: t.trust[index] ?? stat.label,
  }))

  return (
    <section id="trust" className="bg-forest py-16 md:py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-6 lg:grid-cols-4">
        {translatedStats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i}
            className="flex flex-col items-center text-center"
          >
            <span className="font-serif text-4xl font-medium text-gold md:text-5xl">
              {s.value}
            </span>
            <span className="mt-2 font-sans text-xs uppercase tracking-widest text-cream/70 md:text-sm">
              {s.label}
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
