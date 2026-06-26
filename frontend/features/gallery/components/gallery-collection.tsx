import Image from 'next/image'
import { MapPin, Sparkles } from 'lucide-react'
import { cloudinaryImage, cloudinaryTransforms } from '@/lib/images/cloudinary'
import { galleryImages } from '../data/gallery-images'

type GalleryImage = (typeof galleryImages)[number]

export function GalleryCollection({ items = galleryImages }: { items?: GalleryImage[] }) {
  return (
    <section id="collection" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.75fr_1fr] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-luxe text-gold">
              <Sparkles className="size-4" />
              Curated Collection
            </p>
            <h2 className="mt-4 font-serif text-5xl font-medium leading-none text-foreground md:text-6xl">
              Ethiopia in Frames
            </h2>
          </div>
          <p className="max-w-2xl font-sans text-sm font-light leading-relaxed text-muted-foreground md:text-base">
            From quiet rituals to monumental landscapes, each image is chosen
            to feel intentional, spacious, and alive, like a private archive
            opened for travelers who look closely.
          </p>
        </div>

        <div className="grid auto-rows-[220px] gap-4 sm:auto-rows-[240px] md:grid-cols-6 md:gap-5">
          {items.map((image, index) => {
            const spanClass =
              index % 7 === 0
                ? 'md:col-span-3 md:row-span-2'
                : index % 5 === 0
                  ? 'md:col-span-3'
                  : 'md:col-span-2'

            return (
              <figure
                key={image.src + index}
                className={`group relative overflow-hidden bg-coffee shadow-xl shadow-coffee/10 transition-transform duration-700 hover:-translate-y-1 ${spanClass}`}
              >
                <Image
                  src={cloudinaryImage(image.src, cloudinaryTransforms.gallery)}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/86 via-black/18 to-transparent" />
                <figcaption className="relative z-10 flex h-full flex-col justify-between p-5 text-cream md:p-7">
                  <span className="inline-flex w-fit items-center gap-2 border border-cream/16 bg-black/20 px-3 py-2 font-sans text-[0.58rem] uppercase tracking-[0.18em] text-cream/70 backdrop-blur-sm">
                    <MapPin className="size-3 text-gold" />
                    {image.place}
                  </span>
                  <div>
                    <p className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.24em] text-gold">
                      Frame {String(index + 1).padStart(2, '0')}
                    </p>
                    <h2 className="mt-2 font-serif text-3xl font-medium leading-none text-cream">
                      {image.title}
                    </h2>
                  </div>
                </figcaption>
              </figure>
            )
          })}
        </div>
      </div>
    </section>
  )
}
