import { ArrowRight, Clock } from 'lucide-react'
import type { ReactNode } from 'react'
import { contactMethods } from '../data/contact-methods'
import { tripStyles } from '../data/trip-styles'

const inputClass =
  'w-full border border-border bg-cream px-4 py-3.5 font-sans text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-gold'

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <span className="mb-2 block font-sans text-[0.68rem] font-semibold uppercase tracking-widest text-muted-foreground">
      {children}
    </span>
  )
}

export function ContactFormSection() {
  return (
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
  )
}
