'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  EllipsisVertical,
  Globe2,
  Mail,
  Minus,
  Phone,
  Plus,
  X,
} from 'lucide-react'
import { languages, useLanguage } from '@/lib/i18n/language'
import { siteConfig } from '@/lib/seo/site-config'

const navDestinations: NavChild[] = [
  { label: 'Lalibela', href: '/destinations/lalibela', meta: 'Amhara Highlands' },
  { label: 'Omo Valley', href: '/destinations/omo-valley', meta: 'Southern Ethiopia' },
  { label: 'Danakil Depression', href: '/destinations/danakil-depression', meta: 'Afar Region' },
  { label: 'Bale Mountains', href: '/destinations/bale-mountains-national-park', meta: 'Oromia Highlands' },
]

const navTours: NavChild[] = [
  { label: 'Omo Valley & Bale Mountains', href: '/tours/10-day-omo-valley-bale-mountains-cultural-adventure', meta: '10 Days' },
  { label: 'Omo Valley Cultural Discovery', href: '/tours/8-day-omo-valley-cultural-discovery-tour', meta: '8 Days' },
  { label: 'Lalibela Christmas Festival', href: '/tours/3-day-lalibela-genna-festival-tour', meta: '3 Days' },
  { label: 'Danakil & Erta Ale Adventure', href: '/tours/4-day-danakil-depression-erta-ale-tour', meta: '4 Days' },
]

type NavChild = {
  label: string
  href: string
  meta: string
}

type NavLink = {
  label: string
  href: string
  children?: NavChild[]
  previewLimit?: number
  seeMoreHref?: string
  seeMoreLabel?: string
}

export function Navbar({ solid = false }: { solid?: boolean } = {}) {
  const { language, setLanguage, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const scrolledRef = useRef(false)
  const [open, setOpen] = useState(false)
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null)
  const selectedLanguage =
    languages.find((item) => item.code === language) ?? languages[0]
  const links: NavLink[] = [
    { label: t.nav.home, href: '/#home' },
    { label: t.nav.about, href: '/about' },
    {
      label: t.nav.destinations,
      href: '/destinations',
      previewLimit: 4,
      seeMoreHref: '/destinations',
      seeMoreLabel: t.nav.seeMoreDestinations,
      children: navDestinations,
    },
    {
      label: t.nav.tours,
      href: '/tours',
      previewLimit: 4,
      seeMoreHref: '/tours',
      seeMoreLabel: t.nav.seeMoreTours,
      children: navTours,
    },
    { label: t.nav.gallery, href: '/gallery' },
    { label: t.nav.blog, href: '/blog' },
    { label: t.nav.contact, href: '/contact' },
  ]

  useEffect(() => {
    let frameId: number | null = null

    const updateScrolledState = () => {
      frameId = null
      const nextScrolled = window.scrollY > 40

      if (scrolledRef.current !== nextScrolled) {
        scrolledRef.current = nextScrolled
        setScrolled(nextScrolled)
      }
    }

    const onScroll = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateScrolledState)
      }
    }

    updateScrolledState()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        setExpandedMobile(null)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  const closeMobileMenu = () => {
    setOpen(false)
    setExpandedMobile(null)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid || scrolled
          ? 'bg-forest/95 backdrop-blur-md shadow-lg shadow-forest/20'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8 md:py-4">
        <Link
          href="/#home"
          className="flex h-16 w-32 shrink-0 items-center justify-center md:h-20 md:w-40"
          aria-label="Ethio Origins Tour home"
        >
          <Image
            src="/brand/ethio-origin-logo-dark-transparent-2026.webp"
            alt="Ethio Origins Ethiopia Tours"
            width={420}
            height={223}
            priority
            className="h-full w-full object-contain"
          />
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.href} className="group relative">
              <div className="flex items-center">
                <a
                  href={l.href}
                  className="font-sans text-sm font-light text-cream/90 transition-colors hover:text-gold"
                >
                  {l.label}
                </a>
                {l.children && (
                  <ChevronDown className="ml-1.5 size-3.5 text-cream/70 transition-all duration-300 group-hover:rotate-180 group-hover:text-gold" />
                )}
              </div>

              {l.children && (
                <div className="pointer-events-none absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 pt-5 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-1 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-1 group-focus-within:opacity-100">
                  <div className="overflow-hidden rounded-md border border-cream/15 bg-forest/92 shadow-2xl shadow-black/30 backdrop-blur-xl">
                    <div className="border-b border-cream/10 px-5 py-4">
                      <p className="font-sans text-[0.62rem] uppercase tracking-luxe text-gold">
                        {l.label}
                      </p>
                    </div>
                    <div className="p-2">
                      {l.children
                        .slice(0, l.previewLimit ?? l.children.length)
                        .map((child) => (
                        <a
                          key={child.href + child.label}
                          href={child.href}
                          className="block rounded-sm px-4 py-3 transition-colors hover:bg-cream/8 focus:bg-cream/8"
                        >
                          <span className="block font-serif text-lg leading-tight text-cream">
                            {child.label}
                          </span>
                          <span className="mt-1 block font-sans text-[0.65rem] uppercase tracking-widest text-cream/52">
                            {child.meta}
                          </span>
                        </a>
                      ))}
                      {l.children.length > (l.previewLimit ?? l.children.length) && (
                        <a
                          href={l.seeMoreHref}
                          className="mt-1 block border-t border-cream/10 px-4 py-3 font-sans text-xs uppercase tracking-widest text-gold transition-colors hover:bg-cream/8 hover:text-cream"
                        >
                          {l.seeMoreLabel}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div className="group relative hidden lg:block">
            <button
              type="button"
              onClick={() => setLanguageMenuOpen((value) => !value)}
              className="flex items-center gap-2 rounded-sm border border-cream/18 bg-cream/8 px-3.5 py-2.5 font-sans text-[0.68rem] font-bold uppercase tracking-[0.16em] text-cream transition-colors hover:border-gold/70 hover:text-gold"
              aria-label={t.nav.changeLanguage}
              aria-expanded={languageMenuOpen}
            >
              <Globe2 className="size-4" />
              {selectedLanguage.code}
              <ChevronDown className="size-3.5 transition-transform duration-300 group-hover:rotate-180" />
            </button>

            <div
              className={`absolute right-0 top-full z-50 w-44 pt-4 transition-all duration-300 ${
                languageMenuOpen
                  ? 'pointer-events-auto translate-y-1 opacity-100'
                  : 'pointer-events-none opacity-0'
              }`}
            >
              <div className="overflow-hidden rounded-md border border-cream/15 bg-forest/95 p-1.5 shadow-2xl shadow-black/30 backdrop-blur-xl">
                {languages.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => {
                      setLanguage(item.code)
                      setLanguageMenuOpen(false)
                    }}
                    className="flex w-full items-center justify-between rounded-sm px-3 py-2.5 text-left font-sans text-sm text-cream/80 transition-colors hover:bg-cream/8 hover:text-gold"
                  >
                    <span className="flex items-center gap-2">
                      <span className="font-sans text-[0.65rem] font-bold uppercase tracking-widest text-gold">
                        {item.code}
                      </span>
                      {item.displayName}
                    </span>
                    {language === item.code && (
                      <Check className="size-3.5 text-gold" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <a
            href="/contact"
            className="hidden rounded-sm border border-gold/70 px-5 py-2.5 font-sans text-xs uppercase tracking-widest text-cream transition-colors hover:bg-gold hover:text-coffee md:inline-block"
          >
            {t.nav.plan}
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className="group inline-flex size-11 items-center justify-center rounded-full border border-cream/20 bg-coffee/35 text-cream shadow-lg shadow-black/10 backdrop-blur-md transition-colors hover:border-gold/70 hover:bg-coffee/60 hover:text-gold lg:hidden"
          >
            <EllipsisVertical className="size-5 transition-transform duration-300 group-hover:scale-110" />
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-[60] h-[100dvh] overflow-y-auto bg-coffee text-cream lg:hidden"
        >
          <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_85%_8%,rgba(201,162,39,0.12),transparent_28%),radial-gradient(circle_at_10%_70%,rgba(31,77,58,0.38),transparent_36%)]" />

          <div className="relative min-h-full animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-cream/10 bg-coffee/90 px-5 py-4 backdrop-blur-xl">
              <Link
                href="/#home"
                onClick={closeMobileMenu}
                className="flex h-14 w-28 shrink-0 items-center"
              >
                <Image
                  src="/brand/ethio-origin-logo-dark-transparent-2026.webp"
                  alt="Ethio Origins Ethiopia Tours"
                  width={420}
                  height={223}
                  className="h-full w-full object-contain"
                />
              </Link>

              <div className="ml-auto mr-4 text-right">
                <p className="font-sans text-[0.58rem] uppercase tracking-[0.24em] text-gold">
                  {t.nav.menuLabel}
                </p>
                <p className="mt-1 font-sans text-[0.68rem] text-cream/50">
                  {t.nav.menuContext}
                </p>
              </div>

              <button
                type="button"
                onClick={closeMobileMenu}
                aria-label="Close menu"
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-cream/15 bg-cream/5 text-cream transition-colors hover:border-gold hover:text-gold"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="relative px-5 pb-10 pt-8">
              <div className="mb-5 flex items-end justify-between">
                <div>
                  <p className="font-sans text-[0.62rem] uppercase tracking-[0.3em] text-gold">
                    {t.nav.discover}
                  </p>
                  <h2 className="mt-2 font-serif text-4xl font-medium leading-none text-cream">
                    {t.nav.menuTitleLine1}<br />{t.nav.menuTitleLine2}
                  </h2>
                </div>
                <span className="mb-1 size-2 rounded-full bg-gold shadow-[0_0_18px_rgba(201,162,39,0.8)]" />
              </div>

              <nav aria-label="Primary mobile navigation">
                <ul className="border-t border-cream/12">
                  {links.map((link, index) => {
                    const isExpanded = expandedMobile === link.label

                    return (
                      <li key={link.href} className="border-b border-cream/12">
                        {link.children ? (
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedMobile((current) =>
                                current === link.label ? null : link.label,
                              )
                            }
                            className="group flex w-full items-center gap-4 py-4 text-left"
                            aria-expanded={isExpanded}
                          >
                            <span className="w-5 font-sans text-[0.58rem] tracking-widest text-gold/70">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <span className="flex-1 font-serif text-[1.85rem] font-medium leading-none text-cream transition-colors group-hover:text-gold">
                              {link.label}
                            </span>
                            <span className={`inline-flex size-10 items-center justify-center rounded-full border transition-colors ${
                              isExpanded
                                ? 'border-gold bg-gold text-coffee'
                                : 'border-cream/15 bg-cream/5 text-cream/70 group-hover:border-gold/60 group-hover:text-gold'
                            }`}>
                              {isExpanded ? <Minus className="size-4" /> : <Plus className="size-4" />}
                            </span>
                          </button>
                        ) : (
                          <a
                            href={link.href}
                            onClick={closeMobileMenu}
                            className="group flex items-center gap-4 py-4"
                          >
                            <span className="w-5 font-sans text-[0.58rem] tracking-widest text-gold/70">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <span className="flex-1 font-serif text-[1.85rem] font-medium leading-none text-cream transition-colors group-hover:text-gold">
                              {link.label}
                            </span>
                            <ArrowUpRight className="size-4 text-cream/35 transition-colors group-hover:text-gold" />
                          </a>
                        )}

                        {link.children && isExpanded && (
                          <div className="mb-5 ml-9 overflow-hidden rounded-md border border-cream/10 bg-cream/[0.035] p-2">
                            <a
                              href={link.href}
                              onClick={closeMobileMenu}
                              className="flex items-center justify-between rounded-sm border-b border-cream/10 px-3 py-3 font-sans text-[0.64rem] font-bold uppercase tracking-[0.18em] text-gold transition-colors hover:bg-cream/5"
                            >
                              {link.seeMoreLabel ?? `${t.nav.all} ${link.label}`}
                              <ArrowUpRight className="size-3.5" />
                            </a>
                            {link.children
                              .slice(0, link.previewLimit ?? link.children.length)
                              .map((child) => (
                                <a
                                  key={child.href + child.label}
                                  href={child.href}
                                  onClick={closeMobileMenu}
                                  className="group/child flex items-center justify-between gap-4 rounded-sm px-3 py-3 transition-colors hover:bg-cream/5"
                                >
                                  <span className="font-sans text-sm text-cream/78 transition-colors group-hover/child:text-cream">
                                    {child.label}
                                  </span>
                                  <span className="shrink-0 font-sans text-[0.58rem] uppercase tracking-widest text-cream/35">
                                    {child.meta}
                                  </span>
                                </a>
                              ))}
                          </div>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </nav>

              <section className="mt-8 border border-cream/12 bg-[linear-gradient(135deg,rgba(250,248,244,0.07),rgba(250,248,244,0.02))] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="flex items-center gap-2 font-sans text-[0.6rem] uppercase tracking-[0.22em] text-gold">
                      <Globe2 className="size-3.5" />
                      {t.nav.language}
                    </p>
                    <p className="mt-1 font-sans text-xs text-cream/45">
                      {selectedLanguage.displayName}
                    </p>
                  </div>
                  <div className="flex gap-1.5">
                    {languages.map((item) => (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => setLanguage(item.code)}
                        className={`inline-flex size-9 items-center justify-center rounded-full border font-sans text-[0.6rem] font-bold transition-colors ${
                          language === item.code
                            ? 'border-gold bg-gold text-coffee'
                            : 'border-cream/15 bg-cream/5 text-cream/55 hover:border-gold/60 hover:text-gold'
                        }`}
                        aria-label={`${t.nav.changeLanguage} to ${item.label}`}
                      >
                        {item.code}
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              <section className="relative mt-4 overflow-hidden border border-gold/25 bg-forest/45 p-5 shadow-2xl shadow-black/15">
                <div className="absolute -right-12 -top-12 size-36 rounded-full border border-gold/10" />
                <div className="absolute -right-6 -top-6 size-20 rounded-full border border-gold/15" />
                <p className="font-sans text-[0.6rem] uppercase tracking-[0.26em] text-gold">
                  {t.nav.supportLabel}
                </p>
                <h3 className="mt-2 max-w-xs font-serif text-2xl leading-tight text-cream">
                  {t.nav.supportTitle}
                </h3>

                <div className="mt-5 grid gap-2">
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="group flex items-center gap-3 font-sans text-sm text-cream/72 transition-colors hover:text-cream"
                  >
                    <span className="inline-flex size-9 items-center justify-center rounded-full border border-cream/15 bg-cream/5 text-gold">
                      <Phone className="size-4" />
                    </span>
                    {siteConfig.contact.phone}
                  </a>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="group flex items-center gap-3 font-sans text-sm text-cream/72 transition-colors hover:text-cream"
                  >
                    <span className="inline-flex size-9 items-center justify-center rounded-full border border-cream/15 bg-cream/5 text-gold">
                      <Mail className="size-4" />
                    </span>
                    {siteConfig.contact.email}
                  </a>
                </div>

                <a
                  href="/contact"
                  onClick={closeMobileMenu}
                  className="mt-5 flex items-center justify-between bg-gold px-4 py-3.5 font-sans text-[0.68rem] font-bold uppercase tracking-[0.18em] text-coffee transition-colors hover:bg-cream"
                >
                  {t.nav.plan}
                  <ArrowUpRight className="size-4" />
                </a>
              </section>

              <div className="mt-5 flex items-center justify-between border-t border-cream/10 pt-5">
                <p className="font-sans text-[0.6rem] uppercase tracking-[0.18em] text-cream/35">
                  {t.nav.follow}
                </p>
                <div className="flex gap-2">
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="inline-flex size-10 items-center justify-center rounded-full border border-cream/15 bg-cream/5 font-sans text-[0.62rem] font-bold text-cream/65 transition-colors hover:border-gold hover:text-gold"
                  >
                    IG
                  </a>
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="inline-flex size-10 items-center justify-center rounded-full border border-cream/15 bg-cream/5 font-sans text-[0.62rem] font-bold text-cream/65 transition-colors hover:border-gold hover:text-gold"
                  >
                    FB
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
