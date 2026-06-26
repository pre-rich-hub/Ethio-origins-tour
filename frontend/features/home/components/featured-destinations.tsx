'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { SectionHeading } from '@/components/shared/section-heading'
import { destinations } from '@/features/destinations'
import type { Destination } from '@/features/destinations'
import { useLanguage } from '@/lib/i18n/language'

const featuredDestinationSlugs = [
  'lalibela',
  'omo-valley',
  'danakil-depression',
  'bale-mountains-national-park',
  'wenchi-crater-lake',
  'awash-national-park',
]

export function FeaturedDestinations({ items = destinations }: { items?: Destination[] }) {
  const { t } = useLanguage()
  const availableDestinations = [...items, ...destinations]
  const visibleDestinations = [
    ...featuredDestinationSlugs
      .map((slug) =>
        availableDestinations.find((destination) => destination.slug === slug),
      )
      .filter((destination): destination is Destination => Boolean(destination)),
    ...availableDestinations,
  ].filter(
    (destination, index, allDestinations) =>
      allDestinations.findIndex((item) => item.slug === destination.slug) === index,
  ).slice(0, 6)

  return (
    <section
      id="destinations"
      className="overflow-hidden bg-[linear-gradient(115deg,oklch(0.18_0.03_150),oklch(0.22_0.035_55)_48%,oklch(0.13_0.025_50))] py-16 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={t.destinations.eyebrow}
          title={t.destinations.title}
          description={t.destinations.description}
          tone="light"
        />

        <div className="mt-6 text-center">
          <Link
            href="/destinations"
            className="inline-flex max-w-full items-center justify-center border border-cream/30 px-4 py-3 text-center font-sans text-[0.68rem] uppercase tracking-[0.16em] text-cream transition-colors hover:border-gold hover:text-gold sm:px-5 sm:text-xs sm:tracking-widest"
          >
            {t.destinations.exploreDestinations}
          </Link>
        </div>

        <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6 [scrollbar-width:thin] [scrollbar-color:rgba(250,246,236,0.35)_transparent] md:mt-14 md:gap-6">
          {visibleDestinations.map((d, i) => (
            <Link
              key={d.name}
              href={`/destinations/${d.slug}`}
              aria-label={`Open dedicated page for ${d.name}`}
              className="group block h-[450px] min-w-[calc(100vw-2rem)] snap-center cursor-pointer touch-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:h-[520px] sm:min-w-[390px] lg:h-[580px] lg:min-w-[390px] xl:min-w-[420px]"
            >
              <motion.article
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="relative flex size-full overflow-hidden rounded-none border border-cream/18 bg-coffee shadow-2xl shadow-black/25"
              >
                <Image
                  src={d.image || '/placeholder.svg'}
                  alt={d.name}
                  fill
                  sizes="(max-width: 640px) calc(100vw - 2rem), 420px"
                  className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/24 to-black/10" />
                <div className="absolute inset-0 bg-coffee/0 transition-colors duration-500 group-hover:bg-coffee/10" />
                <p className="absolute right-5 top-6 font-sans text-[0.66rem] font-bold uppercase tracking-[0.14em] text-cream drop-shadow sm:right-6 sm:top-8 sm:text-[0.68rem] sm:tracking-[0.16em]">
                  {d.duration}
                </p>
                <div className="relative z-10 mt-auto flex min-h-[52%] flex-col justify-end p-5 text-cream sm:min-h-[46%] sm:p-7 md:p-8">
                  <p className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.2em] text-cream/90 sm:text-[0.64rem] sm:tracking-[0.32em]">
                    {d.place}
                  </p>
                  <h3 className="mt-3 max-w-[18rem] font-sans text-base font-bold uppercase leading-snug tracking-[0.1em] text-cream sm:mt-4 sm:tracking-[0.18em] md:text-lg">
                    {d.name}
                  </h3>
                  <p className="mt-3 max-w-[20rem] font-sans text-sm font-light leading-relaxed text-cream/80">
                    {d.description}
                  </p>
                  <span className="mt-6 inline-flex h-12 w-full items-center justify-center border border-cream/90 px-5 font-sans text-[0.64rem] font-bold uppercase tracking-[0.16em] text-cream transition-colors group-hover:bg-cream group-hover:text-coffee sm:mt-8 sm:h-14 sm:w-40 sm:text-[0.66rem] sm:tracking-[0.22em]">
                    {t.destinations.exploreTrip}
                  </span>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center md:mt-8">
          <Link
            href="/destinations"
            className="inline-flex h-12 w-full max-w-xs items-center justify-center border border-cream/80 px-6 font-sans text-[0.68rem] font-bold uppercase tracking-[0.18em] text-cream transition-colors hover:bg-cream hover:text-coffee focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:h-14 sm:w-auto sm:max-w-none sm:text-xs sm:tracking-widest"
          >
            {t.destinations.exploreMore}
          </Link>
        </div>
      </div>
    </section>
  )
}
