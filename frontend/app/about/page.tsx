import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowDown,
  ArrowUpRight,
  MapPin,
} from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { SiteFooter } from '@/components/layout/site-footer'
import { FinalCta } from '@/components/shared/final-cta'
import { createMetadata } from '@/lib/seo/create-metadata'
import { cloudinaryImage, cloudinaryTransforms } from '@/lib/images/cloudinary'

const heroImage =
  'https://res.cloudinary.com/divimnzxa/image/upload/v1782246561/40462096650629206_q68ntv.jpg'

const founderImage = '/images/asfaw-adane-ali-founder.png'

export const metadata: Metadata = createMetadata({
  title: 'About Our Local Ethiopia Tour Company',
  description:
    'Meet Ethio Origins Tour and founder Asfaw Adane Ali. Discover our local expertise, genuine Ethiopian hospitality, and passion for meaningful journeys.',
  canonicalPath: '/about',
  primaryKeyword: 'About Ethio Origins Tour',
  secondaryKeywords: [
    'Asfaw Adane Ali',
    'Local Tour Guides in Ethiopia',
    'Ethiopia Travel Experts',
    'Trusted Ethiopian Tour Operator',
  ],
  ogImage: heroImage,
  ogImageAlt: 'Travelers exploring the Ethiopian highlands with a local guide',
})

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      <Navbar />

      <section className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-coffee text-cream">
        <Image
          src={cloudinaryImage(heroImage, cloudinaryTransforms.hero)}
          alt="A local guide leading travelers through the Ethiopian highlands"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,30,22,0.96)_0%,rgba(18,45,34,0.78)_48%,rgba(15,29,23,0.35)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-52 bg-gradient-to-t from-coffee/90 to-transparent" />

        <div className="mx-auto grid w-full max-w-7xl items-end gap-12 px-6 pb-16 pt-40 md:px-8 md:pb-24 lg:grid-cols-[1fr_auto]">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-gold" />
              <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold">
                Our story
              </p>
            </div>
            <h1 className="mt-7 text-balance font-serif text-5xl font-medium leading-[0.94] sm:text-6xl md:text-8xl">
              Discover the heart
              <span className="block italic text-gold">of Ethiopia.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-pretty font-sans text-base leading-relaxed text-cream/78 md:text-lg">
              Authentic journeys, deep local knowledge, and genuine hospitality—
              thoughtfully brought together by people who call Ethiopia home.
            </p>
          </div>

          <a
            href="#our-story"
            aria-label="Continue to our story"
            className="hidden size-16 items-center justify-center rounded-full border border-cream/25 text-gold transition-colors hover:border-gold hover:bg-gold hover:text-coffee lg:flex"
          >
            <ArrowDown className="size-5" />
          </a>
        </div>
      </section>

      <section id="our-story" className="relative bg-background py-24 md:py-32">
        <div className="pointer-events-none absolute right-0 top-0 font-serif text-[10rem] leading-none text-forest/[0.035] md:text-[18rem]">
          13
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 md:px-8 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <p className="font-sans text-xs uppercase tracking-[0.28em] text-gold-dark">
              About Ethio Origins Tour
            </p>
            <h2 className="mt-5 text-balance font-serif text-4xl font-medium leading-tight text-forest md:text-5xl">
              Travel should leave you with more than photographs.
            </h2>
            <div className="mt-8 h-px w-24 bg-gold" />
          </div>

          <div className="space-y-6 font-sans text-base leading-[1.9] text-muted-foreground md:text-lg lg:col-span-8 lg:pt-12">
            <p className="text-xl leading-relaxed text-foreground md:text-2xl">
              At <strong className="font-semibold text-forest">Ethio Origins Tour</strong>,
              we believe travel is more than visiting destinations—it&apos;s about
              experiencing the stories, cultures, and traditions that make Ethiopia
              one of the world&apos;s most extraordinary countries.
            </p>
            <p>
              Founded with a deep passion for Ethiopian heritage, our mission is to
              create authentic, immersive, and unforgettable journeys that connect
              travelers with the true spirit of Ethiopia. Every itinerary is
              thoughtfully designed to showcase the country&apos;s remarkable history,
              breathtaking landscapes, vibrant cultures, and warm hospitality.
            </p>
            <p>
              Whether you&apos;re seeking history, culture, adventure, photography,
              wildlife, trekking, or tailor-made private tours, our experienced team
              is committed to delivering exceptional service with professionalism,
              local expertise, and genuine Ethiopian hospitality.
            </p>
            <blockquote className="border-l-2 border-gold py-2 pl-7 font-serif text-2xl italic leading-relaxed text-forest md:text-3xl">
              Our goal is simple: to help every traveler discover Ethiopia not just
              as a destination, but as an unforgettable experience.
            </blockquote>
          </div>
        </div>
      </section>

      <section id="founder" className="relative bg-background py-24 md:py-36">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 md:px-8 lg:grid-cols-12 lg:gap-20">
          <div className="relative lg:col-span-5">
            <div className="absolute -left-5 -top-5 h-full w-full border border-gold/50" />
            <div className="relative aspect-[4/5] overflow-hidden bg-stone shadow-2xl shadow-coffee/15">
              <Image
                src={founderImage}
                alt="Asfaw Adane Ali, founder and CEO of Ethio Origins Tour"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-coffee/75 to-transparent px-7 pb-7 pt-24 text-cream">
                <p className="font-serif text-3xl">Asfaw Adane Ali</p>
                <p className="mt-1 font-sans text-[0.68rem] uppercase tracking-[0.24em] text-gold">
                  Founder &amp; CEO
                </p>
              </div>
            </div>
            <div className="absolute -bottom-7 -right-3 flex size-24 items-center justify-center rounded-full bg-gold text-center font-sans text-[0.58rem] font-bold uppercase leading-relaxed tracking-[0.16em] text-coffee md:-right-8">
              Born in<br />Lalibela
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-gold" />
              <p className="font-sans text-xs uppercase tracking-[0.28em] text-gold-dark">
                Meet our founder
              </p>
            </div>
            <h2 className="mt-6 font-serif text-5xl font-medium leading-none text-forest md:text-7xl">
              Asfaw Adane Ali
            </h2>
            <p className="mt-3 font-sans text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
              Founder &amp; CEO
            </p>

            <div className="mt-9 space-y-5 font-sans text-base leading-[1.85] text-muted-foreground">
              <p>
                Ethio Origins Tour was founded by <strong className="text-foreground">Asfaw Adane Ali</strong>, a
                passionate tourism professional whose journey began in the historic
                town of <strong className="text-foreground">Lalibela</strong>, one of Ethiopia&apos;s most treasured
                UNESCO World Heritage Sites. Growing up surrounded by centuries of
                history, remarkable architecture, and vibrant cultural traditions
                inspired a lifelong passion for sharing Ethiopia&apos;s heritage with the world.
              </p>
              <p>
                After moving to <strong className="text-foreground">Addis Ababa</strong>, Asfaw pursued a degree in
                <strong className="text-foreground"> Tourism Management</strong>, combining academic knowledge with
                hands-on industry experience. Over the years, he has worked as a
                professional tour guide, leading travelers across Ethiopia and
                introducing them to the country&apos;s extraordinary historical landmarks,
                breathtaking landscapes, and diverse cultural communities.
              </p>
              <p>
                With years of guiding experience throughout Lalibela, Axum, Gondar,
                the Simien Mountains, the Danakil Depression, the Omo Valley, Bale
                Mountains, Lake Tana, and many other remarkable locations, Asfaw has
                built a reputation for delivering authentic, well-organized, and
                memorable travel experiences.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-7xl px-6 md:px-8">
          <div className="grid overflow-hidden bg-stone lg:grid-cols-[0.75fr_1.25fr]">
            <div className="relative min-h-64 bg-forest p-9 text-cream md:p-12">
              <MapPin className="size-8 text-gold" strokeWidth={1.4} />
              <p className="mt-10 font-serif text-3xl italic leading-snug md:text-4xl">
                “A childhood dream, built into journeys worth remembering.”
              </p>
              <div className="absolute -bottom-20 -right-20 size-64 rounded-full border border-gold/15" />
            </div>
            <div id="responsible-tourism" className="p-9 md:p-12">
              <p className="font-sans text-base leading-[1.85] text-muted-foreground">
                Ethio Origins Tour was born from his childhood dream of creating a
                company that would present Ethiopia through local knowledge, genuine
                hospitality, and meaningful cultural experiences rather than ordinary
                sightseeing.
              </p>
              <p className="mt-5 font-sans text-base leading-[1.85] text-muted-foreground">
                Today, under his leadership, Ethio Origins Tour has grown into a
                trusted travel company built on professionalism, integrity,
                personalized service, and a deep commitment to showcasing the very
                best of Ethiopia. Every journey reflects his vision of creating
                unforgettable memories while helping travelers experience the
                country&apos;s rich history, diverse cultures, and extraordinary natural
                beauty in the most authentic way possible.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-3 border-b border-gold pb-2 font-sans text-xs font-bold uppercase tracking-[0.18em] text-forest transition-colors hover:text-gold-dark"
              >
                Plan a journey with us
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FinalCta primaryHref="/tours" primaryLabel="Explore Tours" />
      <SiteFooter />
    </main>
  )
}
