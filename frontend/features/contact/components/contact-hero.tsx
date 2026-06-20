import { ArrowLeft } from 'lucide-react'

export function ContactHero() {
  return (
    <section className="relative isolate flex min-h-[620px] items-end overflow-hidden bg-coffee pt-28 md:min-h-[680px]">
      <img
        src="/images/cta.png"
        alt="Ethiopian mountain landscape at sunset"
        className="absolute inset-0 z-0 size-full object-cover"
      />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(24,55,43,0.96)_0%,rgba(31,77,58,0.82)_46%,rgba(26,26,26,0.42)_100%)]" />
      <div className="absolute inset-x-0 top-0 z-0 h-40 bg-gradient-to-b from-black/45 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-0 h-44 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 md:px-8 md:pb-20">
        <a
          href="/"
          className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-cream/75 transition-colors hover:text-gold"
        >
          <ArrowLeft className="size-4" />
          Back Home
        </a>
        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div className="max-w-4xl">
            <p className="font-sans text-xs uppercase tracking-luxe text-gold md:text-sm">
              Contact Us
            </p>
            <h1 className="mt-5 text-balance font-serif text-5xl font-medium leading-[0.98] text-cream sm:text-6xl md:text-7xl">
              Plan Your Ethiopian Journey
            </h1>
            <p className="mt-7 max-w-2xl text-pretty font-sans text-base font-light leading-relaxed text-cream/85 md:text-lg">
              Speak with our Addis Ababa-based travel designers about private
              cultural routes, nature escapes, heritage journeys, and fully
              bespoke itineraries across Ethiopia.
            </p>
          </div>

          <div className="border border-cream/18 bg-cream/10 p-5 text-cream shadow-2xl shadow-black/25 backdrop-blur-md">
            <p className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.24em] text-gold">
              Private Planning
            </p>
            <div className="mt-5 grid grid-cols-2 gap-4 border-t border-cream/15 pt-5">
              <div>
                <p className="font-serif text-3xl leading-none">24h</p>
                <p className="mt-2 font-sans text-[0.65rem] uppercase tracking-widest text-cream/62">
                  Reply Window
                </p>
              </div>
              <div>
                <p className="font-serif text-3xl leading-none">100%</p>
                <p className="mt-2 font-sans text-[0.65rem] uppercase tracking-widest text-cream/62">
                  Tailor Made
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
