import Link from 'next/link'
import { ArrowLeft, ArrowRight, Camera, MapPin, Sparkles } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { SiteFooter } from '@/components/layout/site-footer'

const galleryImages = [
  {
    src: '/images/gallery-coffee.png',
    alt: 'Traditional Ethiopian coffee ceremony',
    title: 'Coffee Ceremony',
    place: 'Highland Homes',
  },
  {
    src: '/images/exp-simien.png',
    alt: 'Gelada monkeys in the Simien Mountains',
    title: 'Simien Light',
    place: 'Northern Escarpments',
  },
  {
    src: '/images/gallery-dance.png',
    alt: 'Ethiopian dancers in traditional dress',
    title: 'Ceremonial Rhythm',
    place: 'Cultural Evenings',
  },
  {
    src: '/images/exp-danakil.png',
    alt: 'The surreal Danakil Depression',
    title: 'Danakil Glow',
    place: 'Afar Triangle',
  },
  {
    src: '/images/gallery-market.png',
    alt: 'A vibrant Ethiopian highland market',
    title: 'Market Color',
    place: 'Highland Towns',
  },
  {
    src: '/images/exp-northern.png',
    alt: 'Rock-hewn church of Lalibela',
    title: 'Sacred Stone',
    place: 'Lalibela',
  },
  {
    src: '/images/dest-wonchi.png',
    alt: 'Wonchi Crater Lake',
    title: 'Crater Stillness',
    place: 'Wonchi',
  },
  {
    src: '/images/exp-omo.png',
    alt: 'Omo Valley community member',
    title: 'Living Heritage',
    place: 'Omo Valley',
  },
  {
    src: '/images/client/custom/lalibela.jpg',
    alt: 'Lalibela heritage site',
    title: 'Heritage Light',
    place: 'Lalibela',
  },
  {
    src: '/images/client/custom/arbaminch.jpg',
    alt: 'Arba Minch landscape',
    title: 'Southern Vista',
    place: 'Arba Minch',
  },
  {
    src: '/images/client/custom/dankil-depression.jpg',
    alt: 'Danakil Depression terrain',
    title: 'Desert Texture',
    place: 'Danakil',
  },
  {
    src: '/images/client/custom/omo-valley.jpg',
    alt: 'Omo Valley portrait',
    title: 'Human Story',
    place: 'Omo Valley',
  },
]

const galleryStories = [
  {
    label: 'Heritage',
    title: 'Sacred Architecture',
    text: 'Rock-hewn churches, ancient routes, and places where devotion still shapes daily life.',
    image: galleryImages[5],
  },
  {
    label: 'Culture',
    title: 'Living Traditions',
    text: 'Markets, ceremonies, music, and human encounters framed with respect and care.',
    image: galleryImages[2],
  },
  {
    label: 'Nature',
    title: 'Wild Landscapes',
    text: 'Highlands, crater lakes, volcanic terrain, and rare wildlife across dramatic regions.',
    image: galleryImages[1],
  },
]

export function GalleryPage() {
  const featuredImages = [galleryImages[0], galleryImages[5], galleryImages[3]]

  return (
    <main className="bg-background text-foreground">
      <Navbar />

      <section className="relative isolate overflow-hidden bg-coffee pt-28 text-cream md:pt-36">
        <img
          src="/images/exp-northern.png"
          alt="Rock-hewn church of Lalibela in warm light"
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
                Moments That Define Ethiopia
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
                  <img
                    src={image.src}
                    alt={image.alt}
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

      <section className="border-y border-border bg-stone py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-3 md:px-8">
          {galleryStories.map((story) => (
            <article
              key={story.title}
              className="grid gap-5 border-l border-gold/50 pl-5 md:pl-6"
            >
              <div>
                <p className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.24em] text-gold">
                  {story.label}
                </p>
                <h2 className="mt-3 font-serif text-3xl font-medium leading-none text-foreground">
                  {story.title}
                </h2>
              </div>
              <p className="font-sans text-sm font-light leading-relaxed text-muted-foreground">
                {story.text}
              </p>
            </article>
          ))}
        </div>
      </section>

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
            {galleryImages.map((image, index) => {
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
                  <img
                    src={image.src}
                    alt={image.alt}
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

      <section className="bg-forest py-16 text-cream md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:px-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="font-sans text-xs font-bold uppercase tracking-luxe text-gold">
              Travel Through the Image
            </p>
            <h2 className="mt-4 max-w-3xl font-serif text-4xl font-medium leading-tight md:text-5xl">
              See a place you want to experience in person?
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-3 bg-gold px-8 py-4 font-sans text-[0.72rem] font-bold uppercase tracking-[0.18em] text-forest transition-colors hover:bg-cream"
          >
            Design My Journey
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
