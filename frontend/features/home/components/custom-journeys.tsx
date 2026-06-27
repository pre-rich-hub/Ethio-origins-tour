'use client'

import Image from 'next/image'
import {
  Compass,
  Handshake,
  MapPinned,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language'
import { cloudinaryImage, cloudinaryTransforms } from '@/lib/images/cloudinary'

const features = [
  {
    icon: ShieldCheck,
    stat: '3+',
    title: 'Years Local Expertise',
    text: 'Deep regional knowledge shaped by years of planning and guiding journeys across Ethiopia.',
  },
  {
    icon: Compass,
    stat: '100%',
    title: 'Tailor-Made Journeys',
    text: 'Every itinerary is carefully designed around your pace, interests, comfort, and travel style.',
  },
  {
    icon: UserRound,
    stat: 'Expert',
    title: 'Guides Across Ethiopia',
    text: 'Travel with knowledgeable local guides who bring history, culture, and landscapes to life.',
  },
  {
    icon: Handshake,
    stat: 'Authentic',
    title: 'Cultural Access',
    text: 'Meaningful encounters with communities, traditions, and stories beyond ordinary sightseeing.',
  },
]

export function CustomJourneys() {
  const { t } = useLanguage()
  const translatedFeatures = features.map((feature, index) => ({
    ...feature,
    stat: t.custom.features[index]?.[0] ?? feature.stat,
    title: t.custom.features[index]?.[1] ?? feature.title,
    text: t.custom.features[index]?.[2] ?? feature.text,
  }))

  return (
    <section
      id="responsible-tourism"
      className="relative isolate overflow-hidden bg-coffee py-20 text-cream md:py-28"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={cloudinaryImage(
            'https://res.cloudinary.com/divimnzxa/image/upload/v1782244137/Ethiopia_h1whvn.jpg',
            cloudinaryTransforms.hero,
          )}
          alt="Luxury safari camp overlooking the Ethiopian highlands at dusk"
          fill
          sizes="100vw"
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(24,55,43,0.96),rgba(31,77,58,0.82)_48%,rgba(0,0,0,0.42))]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-coffee/80 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div className="max-w-2xl">
            <p className="mb-3 font-sans text-xs uppercase tracking-luxe text-gold">
              {t.custom.eyebrow}
            </p>
            <h2 className="text-balance font-serif text-4xl font-medium leading-tight text-cream md:text-6xl">
              {t.custom.title}
            </h2>
          </div>

          <p className="max-w-2xl text-pretty font-sans text-lg font-light leading-relaxed text-cream/82 md:text-xl">
            {t.custom.description}
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {translatedFeatures.map((f) => (
            <article
              key={f.title}
              className="group min-h-[310px] border border-cream/16 bg-cream/8 p-7 shadow-2xl shadow-black/10 backdrop-blur-sm transition-colors hover:border-gold/60 hover:bg-cream/12"
            >
              <div className="flex items-start justify-between gap-5">
                <f.icon className="size-8 text-gold" strokeWidth={1.4} />
                <MapPinned className="size-5 text-cream/30 transition-colors group-hover:text-gold" />
              </div>

              <p className="mt-12 font-serif text-5xl font-medium leading-none text-cream">
                {f.stat}
              </p>
              <h3 className="mt-4 font-serif text-2xl font-medium leading-none text-cream">
                {f.title}
              </h3>
              <p className="mt-4 font-sans text-sm font-light leading-relaxed text-cream/70">
                {f.text}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 border-l border-gold pl-6 md:max-w-3xl">
          <p className="mb-3 font-sans text-xs uppercase tracking-luxe text-gold">
            {t.custom.promiseEyebrow}
          </p>
          <p className="font-serif text-3xl font-medium leading-tight text-cream md:text-4xl">
            {t.custom.promise}
          </p>
        </div>
      </div>
    </section>
  )
}
