'use client'

import { useState } from 'react'
import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react'
import Image from 'next/image'
import { trackSeoEvent } from '@/lib/analytics/events'
import { validateNewsletterEmail } from '@/lib/forms/validation'
import { useLanguage } from '@/lib/i18n/language'
import { siteConfig } from '@/lib/seo/site-config'

const partnerLinks: Array<{
  label: string
  href: string
  brand: 'viator' | 'safari-bookings' | 'get-your-guide' | 'tourist' | 'tripadvisor'
}> = [
  {
    label: 'Viator',
    href: 'https://www.viator.com/',
    brand: 'viator',
  },
  {
    label: 'SafariBookings',
    href: 'https://www.safaribookings.com/',
    brand: 'safari-bookings',
  },
  {
    label: 'GetYourGuide',
    href: 'https://www.getyourguide.com/',
    brand: 'get-your-guide',
  },
  {
    label: 'Tourist',
    href: siteConfig.social.tourist,
    brand: 'tourist',
  },
  {
    label: 'Tripadvisor',
    href: siteConfig.social.tripadvisor,
    brand: 'tripadvisor',
  },
]

const socialLinks: Array<{
  label: string
  href: string
  color: string
  icon: string
}> = [
  {
    label: 'Instagram',
    href: siteConfig.social.instagram,
    color: '#E8B4CC',
    icon: 'instagram',
  },
  {
    label: 'Facebook',
    href: siteConfig.social.facebook,
    color: '#8AB4F8',
    icon: 'facebook',
  },
  {
    label: 'LinkedIn',
    href: siteConfig.social.linkedin,
    color: '#8CC8FF',
    icon: 'linkedin',
  },
  {
    label: 'YouTube',
    href: siteConfig.social.youtube,
    color: '#FF6B6B',
    icon: 'youtube',
  },
  {
    label: 'TikTok',
    href: siteConfig.social.tiktok,
    color: '#69F0E5',
    icon: 'tiktok',
  },
]

function SocialLogo({ icon }: { icon: string }) {
  if (icon === 'facebook') {
    return (
      <svg viewBox="0 0 24 24" className="size-4.5" aria-hidden="true">
        <path
          fill="currentColor"
          d="M15.12 8.14h2.64l-.39 3.08h-2.25V21h-3.56v-9.78H9.14V8.14h2.42V6.18c0-2.67 1.59-4.18 4.05-4.18 1.18 0 2.19.09 2.49.13v2.88h-1.71c-1.29 0-1.27.61-1.27 1.51v1.62Z"
        />
      </svg>
    )
  }

  if (icon === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" className="size-4.5" aria-hidden="true">
        <rect
          width="16"
          height="16"
          x="4"
          y="4"
          rx="4.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle
          cx="12"
          cy="12"
          r="3.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="16.9" cy="7.1" r="1.15" fill="currentColor" />
      </svg>
    )
  }

  if (icon === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
        <path fill="currentColor" d="M5.3 7.6H2.2V21h3.1V7.6ZM3.75 2A1.82 1.82 0 1 0 3.75 5.64 1.82 1.82 0 0 0 3.75 2ZM21.8 13.3c0-4.05-2.16-5.94-5.05-5.94a4.36 4.36 0 0 0-3.95 2.17V7.6H9.7V21h3.1v-6.63c0-1.75.33-3.44 2.5-3.44 2.14 0 2.17 2 2.17 3.55V21h3.1l1.23-7.7Z" />
      </svg>
    )
  }

  if (icon === 'youtube') {
    return (
      <svg viewBox="0 0 24 24" className="size-4.5" aria-hidden="true">
        <path fill="currentColor" d="M22.3 7.1a2.7 2.7 0 0 0-1.9-1.91C18.73 4.74 12 4.74 12 4.74s-6.73 0-8.4.45A2.7 2.7 0 0 0 1.7 7.1 28.4 28.4 0 0 0 1.25 12c0 1.64.15 3.27.45 4.9a2.7 2.7 0 0 0 1.9 1.91c1.67.45 8.4.45 8.4.45s6.73 0 8.4-.45a2.7 2.7 0 0 0 1.9-1.91c.3-1.63.45-3.26.45-4.9s-.15-3.27-.45-4.9ZM9.85 15.1V8.9L15.45 12l-5.6 3.1Z" />
      </svg>
    )
  }

  if (icon === 'tiktok') {
    return (
      <svg viewBox="0 0 24 24" className="size-4.5" aria-hidden="true">
        <path fill="currentColor" d="M16.9 2c.2 1.72 1.16 3.2 2.58 4.12A7.2 7.2 0 0 0 22 7.15v3.18a10.35 10.35 0 0 1-5.08-1.37v6.52A6.52 6.52 0 1 1 11.3 9v3.28a3.33 3.33 0 1 0 2.43 3.2V2h3.17Z" />
      </svg>
    )
  }

  if (icon === 'tourist') {
    return (
      <span className="flex items-center gap-1.5">
        <span className="flex size-5 items-center justify-center rounded-md bg-[#08BFA9] text-white">
          <svg viewBox="0 0 24 24" className="size-3" aria-hidden="true">
            <path fill="currentColor" d="M6.2 5.2c5.4-1.1 10.5 2.5 11.6 7.8.4 2-.1 4-1.2 5.7-5.4 1.1-10.5-2.5-11.6-7.8-.4-2 .1-4 1.2-5.7Zm3.2 3.1c.2 3.4 2.5 6.2 5.8 7.1-.2-3.4-2.5-6.2-5.8-7.1Z" />
          </svg>
        </span>
        <span className="font-sans text-xs font-black lowercase tracking-[-0.04em]">tourist</span>
      </span>
    )
  }

  if (icon === 'tripadvisor') {
    return (
      <span className="flex items-center gap-1.5">
        <span className="relative inline-flex h-5 w-7 items-center justify-center">
          <span className="absolute left-0 size-4 rounded-full border-2 border-current" />
          <span className="absolute right-0 size-4 rounded-full border-2 border-current" />
          <span className="absolute bottom-0 left-1/2 size-1.5 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-current" />
        </span>
        <span className="font-sans text-xs font-black tracking-[-0.05em]">Tripadvisor</span>
      </span>
    )
  }

  if (icon === 'telegram') {
    return (
      <svg viewBox="0 0 24 24" className="size-4.5" aria-hidden="true">
        <path
          fill="currentColor"
          d="M21.88 4.37 18.7 19.32c-.24 1.06-.86 1.32-1.75.82l-4.82-3.55-2.33 2.24c-.26.26-.47.47-.97.47l.35-4.9 8.91-8.05c.39-.35-.08-.54-.6-.2L6.47 13.08l-4.75-1.49c-1.03-.32-1.05-1.03.22-1.53l18.57-7.16c.86-.32 1.61.2 1.37 1.47Z"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="size-4.5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12.03 2a9.92 9.92 0 0 0-8.47 15.1L2.35 21.5l4.52-1.18A9.93 9.93 0 1 0 12.03 2Zm0 18.2a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-2.68.7.72-2.62-.2-.32a8.18 8.18 0 1 1 6.64 3.57Zm4.5-6.13c-.25-.13-1.47-.72-1.7-.8-.23-.08-.4-.13-.57.13-.17.25-.65.8-.8.96-.15.17-.3.19-.55.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.25-1.49-1.4-1.74-.15-.25-.02-.39.11-.52.12-.12.25-.3.38-.45.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.57-1.37-.78-1.88-.2-.49-.41-.42-.57-.43h-.49c-.17 0-.45.06-.68.32-.23.25-.89.87-.89 2.12s.91 2.46 1.04 2.63c.13.17 1.8 2.75 4.36 3.85.61.26 1.08.42 1.45.54.61.19 1.16.16 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.29Z"
      />
    </svg>
  )
}

function PartnerLogo({ brand }: { brand: (typeof partnerLinks)[number]['brand'] }) {
  if (brand === 'viator') {
    return (
      <span className="relative font-sans text-[1.65rem] font-black leading-none tracking-[-0.08em] text-[#087E9B]">
        viator<span className="absolute -top-1 left-[2.18rem] size-2 rounded-full bg-[#F58220]" />
      </span>
    )
  }

  if (brand === 'safari-bookings') {
    return (
      <span className="flex items-center gap-2 text-[#8D0808]">
        <svg viewBox="0 0 32 32" className="size-7" aria-hidden="true">
          <path d="M7 23c3-5 2-9 7-12 1 4 5 3 7 7 2 4-1 8-5 9-4 1-7-1-9-4Zm8-15c1-2 1-4 0-6m5 9c3-3 3-6 2-8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <span className="text-center font-serif text-[0.78rem] font-semibold uppercase leading-[0.9] tracking-wide">
          Safari<br />Bookings
        </span>
      </span>
    )
  }

  if (brand === 'get-your-guide') {
    return (
      <span className="font-sans text-[0.9rem] font-black uppercase leading-[0.78] tracking-[-0.06em] text-[#FF5533]">
        Get<br />Your<br />Guide
      </span>
    )
  }

  if (brand === 'tourist') {
    return (
      <span className="flex items-center gap-2 text-[#202428]">
        <span className="flex size-8 items-center justify-center rounded-lg bg-[#08BFA9] text-white">
          <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
            <path fill="currentColor" d="M6.2 5.2c5.4-1.1 10.5 2.5 11.6 7.8.4 2-.1 4-1.2 5.7-5.4 1.1-10.5-2.5-11.6-7.8-.4-2 .1-4 1.2-5.7Zm3.2 3.1c.2 3.4 2.5 6.2 5.8 7.1-.2-3.4-2.5-6.2-5.8-7.1Z" />
          </svg>
        </span>
        <span className="font-sans text-lg font-black lowercase tracking-[-0.06em]">tourist</span>
      </span>
    )
  }

  return (
    <span className="flex items-center gap-2 text-[#111]">
      <span className="relative inline-flex h-7 w-10 items-center justify-center">
        <span className="absolute left-0 size-6 rounded-full border-[3px] border-current" />
        <span className="absolute right-0 size-6 rounded-full border-[3px] border-current" />
        <span className="absolute bottom-0 left-1/2 size-2 -translate-x-1/2 rotate-45 border-b-[3px] border-r-[3px] border-current" />
      </span>
      <span className="font-sans text-base font-black tracking-[-0.06em]">Tripadvisor</span>
    </span>
  )
}

function PaymentLogo({ brand }: { brand: 'paypal' | 'mastercard' | 'visa' | 'amex' }) {
  if (brand === 'paypal') return <span className="font-sans text-sm font-black italic tracking-tight text-white">PayPal</span>
  if (brand === 'visa') {
    return (
      <span className="relative font-sans text-base font-black italic tracking-[-0.06em] text-white">
        <span className="absolute -left-1 top-0 h-1 w-3 -skew-x-12 bg-[#F7A600]" />VISA
      </span>
    )
  }
  if (brand === 'amex') {
    return (
      <span className="border-y border-white px-0.5 text-center font-sans text-[0.58rem] font-black uppercase leading-[0.85] tracking-[-0.04em] text-white">
        American<br />Express
      </span>
    )
  }

  return (
    <span className="flex items-center gap-1.5">
      <span className="relative h-6 w-9">
        <span className="absolute left-0 top-0 size-6 rounded-full bg-[#EB001B]" />
        <span className="absolute right-0 top-0 size-6 rounded-full bg-[#F79E1B]" />
        <span className="absolute left-1/2 top-0 size-6 -translate-x-1/2 rounded-full bg-[#FF5F00] opacity-90" />
      </span>
    </span>
  )
}

export function SiteFooter() {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')
  const [emailError, setEmailError] = useState('')
  const [renderedAt, setRenderedAt] = useState(() => Date.now())

  async function handleSubscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'loading') return
    setStatus('loading')
    setFeedback('')
    setEmailError('')

    const formData = new FormData(event.currentTarget)
    const honeypot = String(formData.get('subscriberCompany') || '')
    const validation = validateNewsletterEmail(
      email,
      honeypot,
      Date.now() - renderedAt,
    )

    if (!validation.success) {
      setStatus('error')
      setEmailError(validation.errors.email || '')
      setFeedback(validation.errors.form || 'Please enter a valid email address.')
      trackSeoEvent('newsletter_submit_failed', {
        ctaLocation: 'site_footer',
        resultCode: validation.errors.form ? 'spam_or_timing' : 'validation_error',
      })
      return
    }

    try {
      const response = await fetch('/api/v1/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })

      const payload = (await response.json()) as { success?: boolean }

      if (!response.ok || !payload.success) {
        throw new Error('Subscription failed')
      }

      setEmail('')
      setRenderedAt(Date.now())
      setStatus('success')
      setFeedback('Thanks! You are now subscribed to our newsletter.')
      trackSeoEvent('newsletter_submit_success', {
        ctaLocation: 'site_footer',
      })
    } catch {
      setStatus('error')
      setFeedback('We could not subscribe you right now. Please try again later.')
      trackSeoEvent('newsletter_submit_failed', {
        ctaLocation: 'site_footer',
        resultCode: 'server_or_network_error',
      })
    }
  }
  const columns = [
    {
      title: t.footer.journeys,
      links: [
        { label: t.footer.allTours, href: '/tours' },
        { label: t.footer.signatureJourneys, href: '/tours' },
        { label: t.footer.privateTrips, href: '/contact' },
        { label: t.footer.plan, href: '/contact' },
      ],
    },
    {
      title: t.footer.destinations,
      links: [
        { label: t.footer.allDestinations, href: '/destinations' },
        { label: t.footer.historicNorth, href: '/destinations/lalibela' },
        { label: t.footer.omoValley, href: '/destinations/omo-valley' },
        { label: t.footer.danakil, href: '/destinations/danakil-depression' },
      ],
    },
    {
      title: t.footer.company,
      links: [
        { label: t.footer.about, href: '/about' },
        { label: t.footer.philosophy, href: '/about#philosophy' },
        { label: t.footer.responsibleTourism, href: '/about#responsible-tourism' },
        { label: t.footer.gallery, href: '/gallery' },
        { label: t.footer.contact, href: '/contact' },
      ],
    },
  ]

  return (
    <footer className="bg-forest pt-10 text-cream">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 pb-9 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Image
              src="/brand/ethio-origin-logo-dark-transparent-2026.webp"
              alt="Ethio Origins Ethiopia Tours"
              width={420}
              height={223}
              className="h-24 w-auto object-contain"
            />
            <p className="mt-4 max-w-xs font-sans text-sm font-light leading-relaxed text-cream/70">
              {t.footer.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  className="flex size-9 items-center justify-center rounded-full border border-cream/20 bg-cream/5 transition-transform hover:-translate-y-0.5 hover:border-cream/40"
                  style={{ color: link.color }}
                >
                  <SocialLogo icon={link.icon} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h3 className="font-sans text-xs uppercase tracking-widest text-gold">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-sans text-sm font-light text-cream/70 transition-colors hover:text-cream"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-2">
            <h3 className="font-sans text-xs uppercase tracking-widest text-gold">
              {t.footer.contact}
            </h3>
            <ul className="mt-4 space-y-2.5 font-sans text-sm font-light text-cream/70">
              <li>
                <a
                  href="https://maps.app.goo.gl/HSzn7PiL5KWzdWD99"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-2 transition-colors hover:text-cream"
                >
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                Bole Road, Addis Ababa, Ethiopia
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-gold" />
                <a href="mailto:info@ethiooriginstour.com" className="transition-colors hover:text-cream">
                  info@ethiooriginstour.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-gold" />
                <a href="tel:+251935257197" className="transition-colors hover:text-cream">
                  +251 93 525 7197
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-gold" />
                <a href="tel:+251707990306" className="transition-colors hover:text-cream">
                  +251 70 799 0306
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/10 py-8">
          <form onSubmit={handleSubscribe} className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <label htmlFor="footer-email" className="sr-only">
              Your email address
            </label>
            <label className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
              Company
              <input
                name="subscriberCompany"
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
            <input
              id="footer-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.footer.response}
              required
              maxLength={120}
              aria-invalid={Boolean(emailError)}
              aria-describedby={emailError ? 'footer-email-error' : undefined}
              className="h-14 w-full border border-cream/18 bg-cream/10 px-5 font-sans text-sm text-cream outline-none transition-colors placeholder:text-cream/50 focus:border-gold"
            />
            <div className="flex flex-col gap-1">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex h-14 items-center justify-center gap-3 bg-gold px-8 font-sans text-sm font-semibold uppercase tracking-widest text-coffee transition-colors hover:bg-cream disabled:opacity-50"
              >
                <ArrowRight className="size-4" />
                {status === 'loading' ? t.footer.subscribing || 'Subscribing...' : t.footer.subscribe}
              </button>
              {emailError ? (
                <p id="footer-email-error" className="font-sans text-xs text-red-400">
                  {emailError}
                </p>
              ) : null}
              {feedback ? (
                <p
                  role={status === 'error' ? 'alert' : 'status'}
                  aria-live={status === 'error' ? 'assertive' : 'polite'}
                  className={`font-sans text-xs ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}
                >
                  {feedback}
                </p>
              ) : null}
            </div>
          </form>
        </div>

        {partnerLinks.length ? (
        <div className="border-t border-cream/10 py-6">
          <div className="relative overflow-hidden rounded-xl border border-cream/12 bg-[linear-gradient(135deg,rgba(250,246,236,0.08),rgba(250,246,236,0.025))] p-5 shadow-2xl shadow-black/10 backdrop-blur-sm md:p-6">
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
            <div className="grid gap-6 lg:grid-cols-[0.72fr_1.65fr] lg:items-center">
              <div>
                <p className="font-sans text-[0.66rem] uppercase tracking-[0.28em] text-gold">
                  {t.footer.platforms}
                </p>
                <h3 className="mt-2 max-w-md font-serif text-xl font-medium leading-tight text-cream md:text-2xl">
                  {t.footer.platformTitle}
                </h3>
                <p className="mt-2 max-w-xl font-sans text-xs font-light leading-relaxed text-cream/62">
                  {t.footer.platformDescription}
                </p>
              </div>

              <div>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 xl:grid-cols-5">
                  {partnerLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`View Ethio Origins on ${link.label}`}
                      className="flex h-16 items-center justify-center rounded-lg border border-white/80 bg-white px-3 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-gold hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold"
                    >
                      <PartnerLogo brand={link.brand} />
                    </a>
                  ))}
                </div>

                <div className="mt-5 flex flex-col gap-3 border-t border-cream/10 pt-4 sm:flex-row sm:items-center">
                  <p className="shrink-0 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-cream/65">
                    We accept
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(['paypal', 'visa', 'mastercard', 'amex'] as const).map((brand) => (
                      <span
                        key={brand}
                        className={`flex h-11 w-[4.5rem] items-center justify-center rounded-md border border-white/15 px-2 shadow-sm ${
                          brand === 'paypal'
                            ? 'bg-[#253B80]'
                            : brand === 'visa'
                              ? 'bg-[#0878BE]'
                              : brand === 'mastercard'
                                ? 'bg-[#364556]'
                                : 'bg-[#0877C9]'
                        }`}
                      >
                        <PaymentLogo brand={brand} />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        ) : null}

        <div className="flex flex-col items-center justify-between gap-4 border-t border-cream/10 py-5 sm:flex-row">
          <p className="font-sans text-xs text-cream/50">
            © {new Date().getFullYear()} Ethio Origins Tours. {t.footer.rights}
          </p>
          <div className="flex gap-6">
            <a href="/terms" className="font-sans text-sm text-cream/60 transition-colors hover:text-cream">
              {t.footer.terms}
            </a>
            <a href="/privacy" className="font-sans text-sm text-cream/60 transition-colors hover:text-cream">
              {t.footer.privacy}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
