import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Camera } from 'lucide-react'
import { galleryImages } from '../data/gallery-images'

export function GalleryHero() {
  const featuredImages = [galleryImages[0], galleryImages[5], galleryImages[3]]

  return (
    <section className="relative isolate overflow-hidden bg-coffee pt-28 text-cream md:pt-36">
      <Image
        src="https://res.cloudinary.com/divimnzxa/image/upload/v1782247186/Bet_Giyorgis_Rock-Hewn_Church_at_Lalibela___qffnvp.jpg"
        alt="Rock-hewn church of Lalibela in warm light"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 z-0 size-full object-cover"
      />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(12,18,15,0.96)_0%,rgba(24,55,43,0.82)_42%,rgba(0,0,0,0.28)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 z-0 h-48 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-14 sm:px-6 md:px-8 md:pb-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-sans text-[0.68rem] uppercase tracking-[0.16em] text-cream/75 transition-colors hover:text-gold sm:text-xs sm:tracking-widest"
        >
          <ArrowLeft className="size-4" />
          Back Home
        </Link>

        <div className="grid min-h-[calc(100vh-12rem)] gap-10 py-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-end lg:py-20">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-3 font-sans text-xs uppercase tracking-luxe text-gold md:text-sm">
              <Camera className="size-4" />
              A Visual Diary
            </p>
            <h1 className="mt-5 text-balance font-serif text-6xl font-medium leading-[0.88] text-cream sm:text-7xl md:text-8xl">
              Discover Ethiopia Through Our Gallery
            </h1>
            <p className="mt-7 max-w-2xl text-pretty font-sans text-base font-light leading-relaxed text-cream/84 md:text-lg">
              A cinematic collection of landscapes, traditions, wildlife,
              architecture, and human connections photographed across
              Ethiopia&apos;s most extraordinary regions.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#collection"
                className="inline-flex items-center justify-center gap-3 bg-gold px-7 py-4 font-sans text-[0.7rem] font-bold uppercase tracking-[0.18em] text-forest transition-colors hover:bg-cream"
              >
                Explore Frames
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-cream/30 px-7 py-4 font-sans text-[0.7rem] font-bold uppercase tracking-[0.18em] text-cream transition-colors hover:border-gold hover:text-gold"
              >
                Plan This Journey
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:gap-4">
            {featuredImages.map((image, index) => (
              <figure
                key={image.src}
                className={`group relative min-h-[280px] overflow-hidden border border-cream/16 bg-black shadow-2xl shadow-black/35 sm:min-h-[360px] ${
                  index === 1 ? 'lg:-translate-y-10' : 'lg:translate-y-5'
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 18vw"
                  className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/10 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-sans text-[0.58rem] font-bold uppercase tracking-[0.22em] text-gold">
                    {image.place}
                  </p>
                  <h2 className="mt-2 font-serif text-2xl font-medium leading-none text-cream">
                    {image.title}
                  </h2>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
