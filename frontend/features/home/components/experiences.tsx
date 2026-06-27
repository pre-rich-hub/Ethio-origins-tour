'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { SectionHeading } from '@/components/shared/section-heading'
import { useLanguage } from '@/lib/i18n/language'
import { cloudinaryImage, cloudinaryTransforms } from '@/lib/images/cloudinary'

export type ExperienceCard = {
  title: string
  slug: string
  image: string
  duration: string
  highlights: string
  description: string
}

export function Experiences({ items }: { items: ExperienceCard[] }) {
  const { t } = useLanguage()

  return (
    <section id="experiences" className="bg-background py-16 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={t.experiences.eyebrow}
          title={t.experiences.title}
          description={t.experiences.description}
        />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {items.map((exp) => (
            <div
              key={exp.title}
              className="h-[430px] sm:h-[460px]"
            >
              <Link
                href={`/tours/${exp.slug}`}
                aria-label={`Open dedicated page for ${exp.title}`}
                className="group relative flex size-full cursor-pointer touch-manipulation overflow-hidden rounded-md border border-border bg-card shadow-sm transition-shadow hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                <Image
                  src={cloudinaryImage(exp.image || '/placeholder.svg', cloudinaryTransforms.card)}
                  alt={exp.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-coffee/18 to-transparent transition-colors duration-500 group-hover:from-black/88 group-hover:via-coffee/28" />
                <span className="absolute left-5 top-5 flex items-center gap-1.5 rounded-sm bg-cream/88 px-3 py-1.5 font-sans text-[0.68rem] uppercase tracking-wider text-coffee shadow-sm backdrop-blur-md sm:left-6 sm:top-6 sm:text-xs">
                  <Clock className="size-3.5" />
                  {exp.duration}
                </span>

                <div className="absolute inset-x-0 bottom-0 bg-transparent p-5 text-cream sm:p-6">
                  <div className="transition-transform duration-500 ease-out group-hover:-translate-y-1 group-focus-visible:-translate-y-1">
                    <h3 className="font-serif text-[1.55rem] font-medium leading-tight text-cream drop-shadow sm:text-2xl">
                      {exp.title}
                    </h3>
                    <p className="mt-2 font-sans text-xs uppercase tracking-wider text-gold drop-shadow">
                      {exp.highlights}
                    </p>
                  </div>

                  <div className="mt-4 overflow-hidden opacity-100 transition-opacity duration-500 ease-out sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
                    <p className="font-sans text-sm font-light leading-relaxed text-cream/86">
                      {exp.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 font-sans text-sm uppercase tracking-wider text-cream transition-colors group-hover:text-gold group-focus-visible:text-gold sm:mt-6">
                      {t.experiences.discover}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/tours"
            className="inline-flex h-12 w-full max-w-xs items-center justify-center border border-forest px-6 font-sans text-[0.68rem] font-bold uppercase tracking-[0.18em] text-forest transition-colors hover:bg-forest hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:h-14 sm:w-auto sm:max-w-none sm:text-xs sm:tracking-widest"
          >
            {t.experiences.exploreMore}
          </Link>
        </div>
      </div>
    </section>
  )
}
