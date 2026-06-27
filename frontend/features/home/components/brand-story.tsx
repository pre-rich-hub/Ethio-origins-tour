'use client'

import Image from 'next/image'
import { Reveal } from '@/components/shared/reveal'
import { useLanguage } from '@/lib/i18n/language'
import { cloudinaryImage, cloudinaryTransforms } from '@/lib/images/cloudinary'

export function BrandStory() {
  const { t } = useLanguage()

  return (
    <section id="philosophy" className="bg-background py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="relative h-[400px] overflow-hidden rounded-md md:h-[540px]">
            <Image
              src={cloudinaryImage(
                'https://res.cloudinary.com/divimnzxa/image/upload/v1782422779/IMG-20251228-WA0007_sef2nn.jpg',
                cloudinaryTransforms.portrait,
              )}
              alt="A local guide and travelers walking an Ethiopian highland ridge at golden hour"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <p className="mb-3 font-sans text-xs uppercase tracking-luxe text-gold-dark">
            {t.story.eyebrow}
          </p>
          <h2 className="text-balance font-serif text-3xl font-medium leading-tight text-foreground md:text-5xl">
            {t.story.title}
          </h2>
          <div className="mt-6 space-y-5 font-sans text-base font-light leading-relaxed text-muted-foreground">
            <Reveal delay={0.5}>
              <p>
                {t.story.paragraphs[0]}
              </p>
            </Reveal>
            <Reveal delay={1}>
              <p>
                {t.story.paragraphs[1]}
              </p>
            </Reveal>
            <Reveal delay={1.25}>
              <p>
                {t.story.paragraphs[2]}
              </p>
            </Reveal>
            <Reveal delay={1.5}>
              <p className="border-l-2 border-gold pl-5 font-serif text-2xl italic text-foreground">
                &ldquo;{t.story.quote}&rdquo;
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
