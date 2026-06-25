'use client'

import { ArrowRight, Clock } from 'lucide-react'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { useLanguage } from '@/lib/i18n/language'
import { contactMethods } from '../data/contact-methods'

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
  const { t } = useLanguage()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    const formData = new FormData(event.currentTarget)
    const selectedStyles = formData.getAll('journeyStyle').join(', ')
    const details = [
      `${t.contactPage.form.phone}: ${formData.get('phone') || t.contactPage.form.notProvided}`,
      `${t.contactPage.form.month}: ${formData.get('preferredMonth') || t.contactPage.form.notProvided}`,
      `${t.contactPage.form.journeyStyle}: ${selectedStyles || t.contactPage.form.notSelected}`,
      `${t.contactPage.form.travelers}: ${formData.get('travelers') || t.contactPage.form.notSelected}`,
      `${t.contactPage.form.tripLength}: ${formData.get('tripLength') || t.contactPage.form.notSelected}`,
      '',
      String(formData.get('message') || ''),
    ].join('\n')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: details,
        }),
      })

      const payload = await response.json()

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || t.contactPage.form.error)
      }

      event.currentTarget.reset()
      setStatus('success')
      setMessage(t.contactPage.form.success)
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : t.contactPage.form.error)
    }
  }

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:px-8 lg:grid-cols-[minmax(0,1fr)_410px]">
        <form
          onSubmit={handleSubmit}
          className="border border-border bg-card p-6 shadow-xl shadow-coffee/5 md:p-10"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <label>
              <FieldLabel>{t.contactPage.form.fullName}</FieldLabel>
              <input className={inputClass} name="name" placeholder={t.contactPage.form.namePlaceholder} required />
            </label>
            <label>
              <FieldLabel>{t.contactPage.form.email}</FieldLabel>
              <input
                className={inputClass}
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </label>
            <label>
              <FieldLabel>{t.contactPage.form.phone}</FieldLabel>
              <input className={inputClass} name="phone" placeholder="+1 000 000 0000" />
            </label>
            <label>
              <FieldLabel>{t.contactPage.form.month}</FieldLabel>
              <input className={inputClass} name="preferredMonth" placeholder={t.contactPage.form.monthPlaceholder} />
            </label>
          </div>

          <div className="mt-7">
            <FieldLabel>{t.contactPage.form.journeyStyle}</FieldLabel>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {t.contactPage.tripStyles.map((style) => (
                <label
                  key={style}
                  className="flex items-center gap-3 border border-border bg-stone/60 px-4 py-3 font-sans text-sm text-foreground"
                >
                  <input
                    name="journeyStyle"
                    value={style}
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
              <FieldLabel>{t.contactPage.form.travelers}</FieldLabel>
              <select className={inputClass} name="travelers" defaultValue="">
                <option value="" disabled>
                  {t.contactPage.form.groupPlaceholder}
                </option>
                {t.contactPage.form.travelerOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label>
              <FieldLabel>{t.contactPage.form.tripLength}</FieldLabel>
              <select className={inputClass} name="tripLength" defaultValue="">
                <option value="" disabled>
                  {t.contactPage.form.durationPlaceholder}
                </option>
                {t.contactPage.form.durationOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="mt-7 block">
            <FieldLabel>{t.contactPage.form.message}</FieldLabel>
            <textarea
              className={inputClass}
              name="message"
              rows={6}
              placeholder={t.contactPage.form.messagePlaceholder}
              required
            />
          </label>

          {message ? (
            <p
              className={`mt-5 font-sans text-sm ${
                status === 'success' ? 'text-forest' : 'text-red-700'
              }`}
            >
              {message}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="mt-8 inline-flex h-14 w-full items-center justify-center gap-3 bg-forest px-7 font-sans text-sm uppercase tracking-widest text-cream transition-colors hover:bg-coffee sm:w-auto"
          >
            {status === 'loading' ? t.contactPage.form.sending : t.contactPage.form.submit}
            <ArrowRight className="size-4" />
          </button>
        </form>

        <aside className="space-y-6">
          <div className="border border-border bg-forest p-7 text-cream">
            <p className="font-sans text-xs uppercase tracking-luxe text-gold">
              {t.contactPage.direct.eyebrow}
            </p>
            <h2 className="mt-4 font-serif text-3xl font-medium leading-tight">
              {t.contactPage.direct.title}
            </h2>
            <p className="mt-4 font-sans text-sm font-light leading-relaxed text-cream/72">
              {t.contactPage.direct.description}
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
                      {t.contactPage.direct.methods[
                        method.label as keyof typeof t.contactPage.direct.methods
                      ] ?? method.label}
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
              {t.contactPage.direct.responseTitle}
            </h3>
            <p className="mt-3 font-sans text-sm font-light leading-relaxed text-muted-foreground">
              {t.contactPage.direct.responseText}
            </p>
          </div>
        </aside>
      </div>
    </section>
  )
}
