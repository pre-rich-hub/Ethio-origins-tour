import {
  ArrowRight,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react'

const columns = [
  {
    title: 'Journeys',
    links: [
      { label: 'All Tours', href: '/tours' },
      { label: 'Signature Journeys', href: '/tours' },
      { label: 'Private Custom Trips', href: '/contact' },
      { label: 'Plan Your Journey', href: '/contact' },
    ],
  },
  {
    title: 'Destinations',
    links: [
      { label: 'All Destinations', href: '/destinations' },
      { label: 'Historic North', href: '/destinations/lalibela' },
      { label: 'Omo Valley', href: '/destinations/omo-valley' },
      { label: 'Danakil & Rift Valley', href: '/destinations/danakil-depression' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/#about' },
      { label: 'Our Philosophy', href: '/#about' },
      { label: 'Responsible Tourism', href: '/#about' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Contact', href: '/contact' },
    ],
  },
]

const partnerLinks = [
  {
    label: 'Tripadvisor',
    href: 'https://www.tripadvisor.com',
    meta: 'Recommended on',
    color: '#34E0A1',
    textColor: '#001A12',
    mark: 'owl',
  },
  {
    label: 'Viator',
    href: 'https://www.viator.com',
    meta: 'Listed on',
    color: '#00A680',
    textColor: '#001F18',
    mark: 'V',
  },
  {
    label: 'Booking.com',
    href: 'https://www.booking.com',
    meta: 'Book with',
    color: '#006CE4',
    textColor: '#FFFFFF',
    mark: 'B',
  },
  {
    label: 'TouristLink',
    href: 'https://www.touristlink.com',
    meta: 'Featured on',
    color: '#1B75BB',
    textColor: '#FFFFFF',
    mark: 'TL',
  },
]

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com',
    color: '#1877F2',
    icon: 'facebook',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com',
    color: '#E4405F',
    icon: 'instagram',
  },
  {
    label: 'Telegram',
    href: 'https://t.me',
    color: '#26A5E4',
    icon: 'telegram',
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/251900000000',
    color: '#25D366',
    icon: 'whatsapp',
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

export function SiteFooter() {
  return (
    <footer className="bg-forest pt-10 text-cream">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 pb-9 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex flex-col leading-none">
              <span className="font-serif text-2xl font-semibold">
                Ethio Origins
              </span>
              <span className="font-sans text-[0.6rem] uppercase tracking-luxe text-gold">
                Tours
              </span>
            </div>
            <p className="mt-4 max-w-xs font-sans text-sm font-light leading-relaxed text-cream/70">
              Expertly crafted Ethiopian journeys inspired by culture,
              heritage, nature, and discovery. Creating meaningful travel
              experiences through authentic local expertise and responsible
              tourism.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  className="flex size-10 items-center justify-center rounded-full border border-cream/20 bg-cream/5 transition-transform hover:-translate-y-0.5"
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
              Contact
            </h3>
            <ul className="mt-4 space-y-2.5 font-sans text-sm font-light text-cream/70">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                Bole Road, Addis Ababa, Ethiopia
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-gold" />
                +251 900 000 000
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-gold" />
                hello@ethioorigins.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/10 py-8">
          <form className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <label htmlFor="footer-email" className="sr-only">
              Your email address
            </label>
            <input
              id="footer-email"
              type="email"
              placeholder="Your email address"
              className="h-14 w-full border border-cream/18 bg-cream/10 px-5 font-sans text-sm text-cream outline-none transition-colors placeholder:text-cream/50 focus:border-gold"
            />
            <button
              type="submit"
              className="inline-flex h-14 items-center justify-center gap-3 bg-gold px-8 font-sans text-sm font-semibold uppercase tracking-widest text-coffee transition-colors hover:bg-cream"
            >
              <ArrowRight className="size-4" />
              Subscribe
            </button>
          </form>
        </div>

        <div className="border-t border-cream/10 py-6">
          <div className="relative overflow-hidden border border-cream/12 bg-[linear-gradient(135deg,rgba(250,246,236,0.08),rgba(250,246,236,0.025))] p-4 shadow-2xl shadow-black/10 backdrop-blur-sm md:p-5">
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
            <div className="grid gap-5 lg:grid-cols-[0.75fr_1.5fr] lg:items-center">
              <div>
                <p className="font-sans text-[0.66rem] uppercase tracking-[0.28em] text-gold">
                  Trusted Travel Platforms
                </p>
                <h3 className="mt-2 max-w-md font-serif text-2xl font-medium leading-tight text-cream md:text-3xl">
                  Find us where discerning travelers plan.
                </h3>
                <p className="mt-3 max-w-xl font-sans text-sm font-light leading-relaxed text-cream/62">
                  Explore our presence across selected global travel platforms
                  for reviews, curated experiences, stays, and planning
                  inspiration.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {partnerLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group overflow-hidden border bg-cream shadow-lg shadow-black/15 transition-transform duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                    style={{
                      borderColor: link.color,
                      outlineColor: link.color,
                    }}
                  >
                    <div
                      className="px-4 py-5 text-center"
                      style={{
                        backgroundColor: link.color,
                        color: link.textColor,
                      }}
                    >
                      <p className="font-sans text-lg font-extrabold uppercase leading-none tracking-[0.03em]">
                        {link.meta}
                      </p>
                      <div className="mt-4 flex items-center justify-center gap-2">
                        {link.mark === 'owl' ? (
                          <span className="relative inline-flex h-6 w-9 items-center justify-center">
                            <span className="absolute left-0 size-5 rounded-full border-[3px] border-current" />
                            <span className="absolute right-0 size-5 rounded-full border-[3px] border-current" />
                            <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b-[3px] border-r-[3px] border-current" />
                          </span>
                        ) : (
                          <span className="inline-flex size-7 items-center justify-center rounded-full bg-current/15 font-sans text-sm font-black">
                            {link.mark}
                          </span>
                        )}
                        <span className="font-sans text-xl font-black tracking-tight">
                          {link.label}
                        </span>
                      </div>
                    </div>
                    <div className="bg-cream px-4 py-4 text-center">
                      <p className="font-sans text-base font-extrabold leading-snug tracking-tight text-forest underline decoration-forest/50 underline-offset-2">
                        Ethio Origins Tours &amp; Travel
                      </p>
                      <ExternalLink
                        className="mx-auto mt-2 size-3.5 text-forest/45 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-cream/10 py-5 sm:flex-row">
          <p className="font-sans text-xs text-cream/50">
            © {new Date().getFullYear()} Ethio Origins Tours. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-sans text-xs text-cream/50 transition-colors hover:text-cream">
              Terms
            </a>
            <a href="#" className="font-sans text-xs text-cream/50 transition-colors hover:text-cream">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
