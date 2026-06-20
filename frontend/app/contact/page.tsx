import type { Metadata } from 'next'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Contact Us | Ethio Origins Tours',
  description:
    'Plan a private Ethiopian journey with Ethio Origins Tours. Contact our travel designers for bespoke cultural, nature, and heritage itineraries.',
}

const tripStyles = [
  'Historic North',
  'Omo Valley Culture',
  'Danakil Expedition',
  'Bale Mountains',
  'Rift Valley',
  'Custom Journey',
]

const planningSteps = [
  {
    icon: MessageCircle,
    title: 'Share the Dream',
    text: 'Tell us when you want to travel, who is coming, and what kind of Ethiopia you want to experience.',
  },
  {
    icon: CalendarDays,
    title: 'Shape the Route',
    text: 'We refine pacing, regions, guides, lodging style, and meaningful cultural access around your priorities.',
  },
  {
    icon: ShieldCheck,
    title: 'Travel With Care',
    text: 'Your private guide, driver, local hosts, and support team stay close from arrival to departure.',
  },
]

const contactMethods = [
  {
    icon: Phone,
    label: 'Call or WhatsApp',
    value: '+251 900 000 000',
    href: 'https://wa.me/251900000000',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@ethioorigins.com',
    href: 'mailto:hello@ethioorigins.com',
  },
  {
    icon: MapPin,
    label: 'Office',
    value: 'Bole Road, Addis Ababa',
    href: 'https://maps.google.com/?q=Bole%20Road%20Addis%20Ababa',
  },
]

const inputClass =
  'w-full border border-border bg-cream px-4 py-3.5 font-sans text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-gold'

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-2 block font-sans text-[0.68rem] font-semibold uppercase tracking-widest text-muted-foreground">
      {children}
    </span>
  )
}

export default function ContactPage() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />

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

      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:px-8 lg:grid-cols-[minmax(0,1fr)_410px]">
          <form className="border border-border bg-card p-6 shadow-xl shadow-coffee/5 md:p-10">
            <div className="grid gap-5 md:grid-cols-2">
              <label>
                <FieldLabel>Full Name</FieldLabel>
                <input className={inputClass} placeholder="Your name" />
              </label>
              <label>
                <FieldLabel>Email Address</FieldLabel>
                <input
                  className={inputClass}
                  type="email"
                  placeholder="you@example.com"
                />
              </label>
              <label>
                <FieldLabel>Phone or WhatsApp</FieldLabel>
                <input className={inputClass} placeholder="+1 000 000 0000" />
              </label>
              <label>
                <FieldLabel>Preferred Month</FieldLabel>
                <input className={inputClass} placeholder="October 2026" />
              </label>
            </div>

            <div className="mt-7">
              <FieldLabel>Journey Style</FieldLabel>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {tripStyles.map((style) => (
                  <label
                    key={style}
                    className="flex items-center gap-3 border border-border bg-stone/60 px-4 py-3 font-sans text-sm text-foreground"
                  >
                    <input
                      type="checkbox"
                      className="size-4 accent-[var(--gold)]"
                    />
                    {style}
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <label>
                <FieldLabel>Travelers</FieldLabel>
                <select className={inputClass} defaultValue="">
                  <option value="" disabled>
                    Select group size
                  </option>
                  <option>Solo traveler</option>
                  <option>2 travelers</option>
                  <option>3-5 travelers</option>
                  <option>6+ travelers</option>
                </select>
              </label>
              <label>
                <FieldLabel>Trip Length</FieldLabel>
                <select className={inputClass} defaultValue="">
                  <option value="" disabled>
                    Select duration
                  </option>
                  <option>3-5 days</option>
                  <option>6-9 days</option>
                  <option>10-14 days</option>
                  <option>15+ days</option>
                </select>
              </label>
            </div>

            <label className="mt-7 block">
              <FieldLabel>Tell Us What You Imagine</FieldLabel>
              <textarea
                className={inputClass}
                rows={6}
                placeholder="Interests, comfort level, must-see places, dietary needs, celebration details, or anything else we should know."
              />
            </label>

            <button
              type="submit"
              className="mt-8 inline-flex h-14 w-full items-center justify-center gap-3 bg-forest px-7 font-sans text-sm uppercase tracking-widest text-cream transition-colors hover:bg-coffee sm:w-auto"
            >
              Send Inquiry
              <ArrowRight className="size-4" />
            </button>
          </form>

          <aside className="space-y-6">
            <div className="border border-border bg-forest p-7 text-cream">
              <p className="font-sans text-xs uppercase tracking-luxe text-gold">
                Direct Contact
              </p>
              <h2 className="mt-4 font-serif text-3xl font-medium leading-tight">
                Prefer to speak now?
              </h2>
              <p className="mt-4 font-sans text-sm font-light leading-relaxed text-cream/72">
                Our team responds quickly during Ethiopia business hours and
                follows up with a clear next step.
              </p>
              <div className="mt-7 space-y-3">
                {contactMethods.map((method) => (
                  <a
                    key={method.label}
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : undefined}
                    rel={
                      method.href.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    className="flex items-start gap-3 border border-cream/12 bg-cream/5 p-4 transition-colors hover:border-gold/60"
                  >
                    <method.icon className="mt-0.5 size-5 shrink-0 text-gold" />
                    <span>
                      <span className="block font-sans text-[0.66rem] uppercase tracking-widest text-cream/55">
                        {method.label}
                      </span>
                      <span className="mt-1 block font-sans text-sm text-cream">
                        {method.value}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="border border-border bg-card p-7">
              <Clock className="size-8 text-gold" />
              <h3 className="mt-5 font-serif text-2xl font-medium text-foreground">
                Response Time
              </h3>
              <p className="mt-3 font-sans text-sm font-light leading-relaxed text-muted-foreground">
                New inquiries receive a personal response within one business
                day. Urgent travelers can reach us by WhatsApp.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-stone py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="max-w-2xl">
            <p className="font-sans text-xs uppercase tracking-luxe text-gold">
              How Planning Works
            </p>
            <h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-foreground md:text-5xl">
              From first note to final route
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {planningSteps.map((step, index) => (
              <article key={step.title} className="border border-border bg-card p-7">
                <step.icon className="size-8 text-gold" strokeWidth={1.5} />
                <p className="mt-7 font-sans text-xs uppercase tracking-widest text-muted-foreground">
                  Step {index + 1}
                </p>
                <h3 className="mt-3 font-serif text-2xl font-medium text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 font-sans text-sm font-light leading-relaxed text-muted-foreground">
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
