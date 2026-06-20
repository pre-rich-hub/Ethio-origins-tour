import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function GalleryCta() {
  return (
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
  )
}
