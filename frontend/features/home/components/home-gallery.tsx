'use client'

import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { Pause, Play, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { galleryImages } from '@/features/gallery/data/gallery-images'
import { useLanguage } from '@/lib/i18n/language'

const images = [
  galleryImages[6],
  galleryImages[14],
  galleryImages[3],
  galleryImages[20],
  galleryImages[9],
  galleryImages[25],
  galleryImages[1],
  galleryImages[28],
]

type HomeGalleryImage = (typeof images)[number]

export function HomeGallery({ items = images }: { items?: Partial<HomeGalleryImage>[] }) {
  const { t } = useLanguage()
  const galleryItems = items.length
    ? items.map((item, index) => ({
        src: item.src ?? images[index % images.length].src,
        alt: item.alt ?? images[index % images.length].alt,
        title: item.title ?? images[index % images.length].title,
        place: item.place ?? images[index % images.length].place,
      }))
    : images
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const activeImage = galleryItems[activeIndex] ?? galleryItems[0]

  useEffect(() => {
    if (!isPlaying) {
      return
    }

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % galleryItems.length)
    }, 3600)

    return () => window.clearInterval(timer)
  }, [isPlaying, galleryItems.length])

  return (
    <section
      id="gallery"
      className="overflow-hidden bg-coffee py-16 text-cream md:py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden border border-cream/15 bg-[#101a15] shadow-2xl shadow-black/30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(201,162,39,0.18),transparent_34%),linear-gradient(135deg,rgba(31,77,58,0.9),rgba(16,26,21,0.96)_54%,rgba(0,0,0,0.86))]" />
          <div className="relative grid gap-8 p-4 md:p-6 lg:grid-cols-[1.25fr_0.75fr] lg:p-8">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7 }}
              className="relative min-h-[420px] overflow-hidden border border-cream/15 bg-black sm:min-h-[520px] lg:min-h-[620px]"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage.src}
                  src={activeImage.src}
                  alt={activeImage.alt}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="absolute inset-0 size-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/16 to-black/20" />
              <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-cream/10 bg-black/20 px-4 py-3 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-red-500" />
                  <span className="size-2 rounded-full bg-gold" />
                  <span className="size-2 rounded-full bg-cream/60" />
                </div>
                <p className="font-sans text-[0.58rem] font-bold uppercase tracking-[0.24em] text-cream/70">
                  {t.gallery.reel}
                </p>
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <div className="mb-5 h-1 overflow-hidden bg-cream/15">
                  <motion.div
                    key={`${activeImage.src}-${isPlaying}`}
                    className="h-full bg-gold"
                    initial={{ width: '0%' }}
                    animate={{ width: isPlaying ? '100%' : '0%' }}
                    transition={{ duration: 3.6, ease: 'linear' }}
                  />
                </div>
                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.28em] text-gold">
                      {activeImage.place}
                    </p>
                    <h3 className="mt-2 max-w-xl font-serif text-4xl font-medium leading-none text-cream sm:text-6xl">
                      {activeImage.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsPlaying((value) => !value)}
                    className="inline-flex size-14 shrink-0 items-center justify-center rounded-full border border-cream/35 bg-cream/10 text-cream backdrop-blur-sm transition-colors hover:border-gold hover:bg-gold hover:text-forest"
                    aria-label={isPlaying ? t.gallery.pause : t.gallery.play}
                  >
                    {isPlaying ? (
                      <Pause className="size-5" aria-hidden="true" />
                    ) : (
                      <Play className="ml-0.5 size-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </figcaption>
            </motion.div>

            <div className="flex flex-col justify-between gap-7">
              <div className="max-w-xl">
                <p className="flex items-center gap-2 font-sans text-[0.68rem] font-bold uppercase tracking-[0.28em] text-gold">
                  <Sparkles className="size-4" aria-hidden="true" />
                  {t.gallery.eyebrow}
                </p>
                <h2 className="mt-4 text-balance font-serif text-4xl font-medium leading-none text-cream md:text-5xl">
                  {t.gallery.title}
                </h2>
                <p className="mt-5 font-sans text-sm font-light leading-relaxed text-cream/72 md:text-base">
                  {t.gallery.description}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {t.gallery.notes.map((note) => (
                  <div key={note} className="flex items-center gap-3">
                    <span className="h-px w-10 bg-gold" />
                    <p className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.22em] text-cream/70">
                      {note}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-4 gap-3 sm:grid-cols-8 lg:grid-cols-4">
                {galleryItems.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => {
                      setActiveIndex(index)
                      setIsPlaying(false)
                    }}
                    className={`group relative aspect-video overflow-hidden border transition-all duration-300 ${
                      activeIndex === index
                        ? 'border-gold opacity-100'
                        : 'border-cream/15 opacity-55 hover:border-cream/45 hover:opacity-100'
                    }`}
                    aria-label={`${t.gallery.show} ${image.title}`}
                  >
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 25vw, (max-width: 1024px) 12.5vw, 25vw"
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <span className="absolute inset-0 bg-black/20" />
                  </button>
                ))}
              </div>

              <Link
                href="/gallery"
                className="inline-flex w-full items-center justify-center border border-gold bg-gold px-7 py-4 font-sans text-[0.7rem] font-bold uppercase tracking-[0.18em] text-forest transition-colors hover:bg-cream hover:text-forest sm:w-fit"
              >
                {t.gallery.view}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
