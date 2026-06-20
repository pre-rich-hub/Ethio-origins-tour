'use client'

import { Reveal } from '@/components/shared/reveal'

export function BrandStory() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="overflow-hidden rounded-md">
            <img
              src="/images/story.png"
              alt="A local guide and travelers walking an Ethiopian highland ridge at golden hour"
              className="h-[400px] w-full object-cover md:h-[540px]"
            />
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <p className="mb-3 font-sans text-xs uppercase tracking-luxe text-gold">
            Our Story
          </p>
          <h2 className="text-balance font-serif text-3xl font-medium leading-tight text-foreground md:text-5xl">
            Travel With Purpose
          </h2>
          <div className="mt-6 space-y-5 font-sans text-base font-light leading-relaxed text-muted-foreground">
            <Reveal delay={0.5}>
              <p>
                Ethio Origins Tours was founded with a simple mission: to share
                the richness of Ethiopia with the world through authentic,
                responsible, and unforgettable travel experiences.
              </p>
            </Reveal>
            <Reveal delay={1}>
              <p>
                Our team combines local knowledge, professional expertise, and
                a genuine passion for Ethiopian culture, history, and nature. We
                go beyond sightseeing to create journeys that foster connection,
                understanding, and discovery.
              </p>
            </Reveal>
            <Reveal delay={1.25}>
              <p>
                Our journeys support local businesses, promote cultural
                preservation, encourage responsible travel practices, and
                contribute to sustainable tourism development across Ethiopia.
              </p>
            </Reveal>
            <Reveal delay={1.5}>
              <p className="border-l-2 border-gold pl-5 font-serif text-2xl italic text-foreground">
                &ldquo;We don&apos;t just guide journeys. We create meaningful
                connections between travelers and the soul of Ethiopia.&rdquo;
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
