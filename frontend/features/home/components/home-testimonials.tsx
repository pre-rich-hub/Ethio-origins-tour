'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { SectionHeading } from '@/components/shared/section-heading'
import { useLanguage } from '@/lib/i18n/language'
import { cloudinaryImage, cloudinaryTransforms } from '@/lib/images/cloudinary'

const testimonials = [
  {
    quote:
      'The most profound trip of my life. Every detail was flawless, and our guide felt like family by the end.',
    name: 'Eleanor Whitfield',
    country: 'United Kingdom',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782422861/IMG-20260511-WA0023_l9w0jc.jpg',
    experience: 'Historic Northern Route',
  },
  {
    quote:
      'Ethio Origins gave us access and stories no other operator could. The Omo Valley left us speechless.',
    name: 'Marcus Lindqvist',
    country: 'Sweden',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782422777/IMG-20251228-WA0011_zov7pu.jpg',
    experience: 'Omo Valley Discovery',
  },
  {
    quote:
      'From the Simien sunrises to the coffee ceremonies, it was cinematic, authentic, and deeply moving.',
    name: 'Aisha Rahman',
    country: 'United Arab Emirates',
    image: 'https://res.cloudinary.com/divimnzxa/image/upload/v1782422851/IMG-20260511-WA0028_i3o8fm.jpg',
    experience: 'Simien Mountains Expedition',
  },
]

export function HomeTestimonials() {
  const { t } = useLanguage()
  const translatedTestimonials = testimonials.map((testimonial, index) => ({
    ...testimonial,
    quote: t.testimonials.items[index] ?? testimonial.quote,
  }))

  return (
    <section className="bg-sand py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow={t.testimonials.eyebrow}
          title={t.testimonials.title}
          description={t.testimonials.description}
        />

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {translatedTestimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="flex flex-col rounded-md border border-coffee/10 bg-cream p-8 shadow-sm"
            >
              <Quote className="size-8 text-gold" strokeWidth={1.5} />
              <blockquote className="mt-5 flex-1 text-pretty font-serif text-xl font-medium italic leading-relaxed text-foreground">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-4 border-t border-coffee/10 pt-6">
                <Image
                  src={cloudinaryImage(t.image || '/placeholder.svg', cloudinaryTransforms.thumbnail)}
                  alt={t.name}
                  width={48}
                  height={48}
                  className="size-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-sans text-sm font-semibold text-foreground">
                    {t.name}
                  </div>
                  <div className="font-sans text-xs text-muted-foreground">
                    {t.country} · {t.experience}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
