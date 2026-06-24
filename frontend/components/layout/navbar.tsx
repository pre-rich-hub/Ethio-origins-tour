'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown, Globe2, Menu, X } from 'lucide-react'
import { destinations } from '@/features/destinations'
import { tours } from '@/features/tours'
import { languages, useLanguage } from '@/lib/i18n/language'

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

export function Navbar() {
  const { language, setLanguage, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null)
  const selectedLanguage =
    languages.find((item) => item.code === language) ?? languages[0]
  const links: NavLink[] = [
    { label: t.nav.home, href: '/#home' },
    {
      label: t.nav.destinations,
      href: '/destinations',
      previewLimit: 4,
      seeMoreHref: '/destinations',
      seeMoreLabel: t.nav.seeMoreDestinations,
      children: destinations.map((destination) => ({
        label: destination.name,
        href: `/destinations/${destination.slug}`,
        meta: destination.place,
      })),
    },
    {
      label: t.nav.tours,
      href: '/tours',
      previewLimit: 4,
      seeMoreHref: '/tours',
      seeMoreLabel: t.nav.seeMoreTours,
      children: tours.map((tour) => ({
        label: tour.title,
        href: `/tours/${tour.slug}`,
        meta: tour.duration,
      })),
    },
    { label: t.nav.gallery, href: '/gallery' },
    { label: t.nav.blog, href: '/blog' },
    { label: t.nav.contact, href: '/contact' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-forest/95 backdrop-blur-md shadow-lg shadow-forest/20'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8 md:py-5">
        <Link href="/#home" className="flex items-center" aria-label="Ethio Origins Tour home">
          <Image
            src="/brand/logo-header.png"
            alt="Ethio Origins Ethiopia Tours"
            width={900}
            height={883}
            priority
            className="h-14 w-auto md:h-16"
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
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="text-cream lg:hidden"
          >
            <Menu className="size-7" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-background text-foreground lg:hidden"
          >
            <div className="flex items-start justify-between px-5 py-6">
              <Link
                href="/#home"
                onClick={() => {
                  setOpen(false)
                  setExpandedMobile(null)
                }}
                className="flex items-center"
              >
                <Image
                  src="/brand/logo-header.png"
                  alt="Ethio Origins Ethiopia Tours"
                  width={900}
                  height={883}
                  className="h-16 w-auto"
                />
              </Link>
              <button
                onClick={() => {
                  setOpen(false)
                  setExpandedMobile(null)
                }}
                aria-label="Close menu"
                className="text-foreground transition-colors hover:text-gold"
              >
                <X className="size-5" />
              </button>
            </div>

            <ul className="flex flex-1 flex-col justify-center gap-5 px-8 pb-16 text-center">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                >
                  {l.children && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedMobile((current) =>
                            current === l.label ? null : l.label,
                          )
                        }
                        className="inline-flex items-center justify-center gap-2 font-serif text-2xl font-medium text-foreground transition-colors hover:text-gold"
                      >
                        {l.label}
                        <ChevronDown
                          className={`size-4 text-gold transition-transform ${
                            expandedMobile === l.label ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {expandedMobile === l.label && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mx-auto mt-3 grid max-w-xs gap-2 overflow-hidden border-y border-forest/10 py-3"
                          >
                            <a
                              href={l.href}
                              onClick={() => {
                                setOpen(false)
                                setExpandedMobile(null)
                              }}
                              className="font-sans text-[0.7rem] uppercase tracking-[0.22em] text-gold transition-colors hover:text-forest"
                            >
                              {l.seeMoreLabel ?? `${t.nav.all} ${l.label}`}
                            </a>
                            {l.children
                              .slice(0, l.previewLimit ?? l.children.length)
                              .map((child) => (
                                <a
                                  key={child.href + child.label}
                                  href={child.href}
                                  onClick={() => {
                                    setOpen(false)
                                    setExpandedMobile(null)
                                  }}
                                  className="font-sans text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-forest"
                                >
                                  {child.label}
                                </a>
                              ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                  {!l.children && (
                    <a
                      href={l.href}
                      onClick={() => {
                        setOpen(false)
                        setExpandedMobile(null)
                      }}
                      className="inline-block font-serif text-2xl font-medium text-foreground transition-colors hover:text-gold"
                    >
                      {l.href === '/contact' ? t.nav.contactShort : l.label}
                    </a>
                  )}
                </motion.li>
              ))}
            </ul>

            <div className="px-8 pb-8">
              <div className="mb-4 border border-forest/10 bg-stone/60 p-3">
                <p className="mb-3 flex items-center justify-center gap-2 font-sans text-[0.65rem] font-bold uppercase tracking-[0.22em] text-gold">
                  <Globe2 className="size-4" />
                  {t.nav.language}
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {languages.map((item) => (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => {
                        setLanguage(item.code)
                        setOpen(false)
                        setExpandedMobile(null)
                      }}
                      className={`flex items-center justify-between border px-3 py-2.5 font-sans text-sm transition-colors ${
                        language === item.code
                          ? 'border-gold bg-gold text-forest'
                          : 'border-forest/10 bg-cream text-forest hover:border-gold'
                      }`}
                      aria-label={`${t.nav.changeLanguage} to ${item.label}`}
                    >
                      <span>{item.displayName}</span>
                      <span className="text-[0.62rem] font-bold uppercase tracking-widest opacity-70">
                        {item.code}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <a
                href="/contact"
                onClick={() => {
                  setOpen(false)
                  setExpandedMobile(null)
                }}
                className="block rounded-sm bg-gold px-6 py-4 text-center font-sans text-xs uppercase tracking-widest text-coffee"
              >
                {t.nav.plan}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
