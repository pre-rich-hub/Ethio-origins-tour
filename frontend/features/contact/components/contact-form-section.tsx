'use client'

import { ArrowRight, Clock } from 'lucide-react'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { useLanguage } from '@/lib/i18n/language'
import {
  type ContactFields,
  type FieldErrors,
  validateContactInquiry,
} from '@/lib/forms/validation'
import { trackSeoEvent } from '@/lib/analytics/events'
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
  const [errors, setErrors] = useState<FieldErrors<ContactFields>>({})
  const [renderedAt, setRenderedAt] = useState(() => Date.now())

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'loading') return
    setStatus('loading')
    setMessage('')
    setErrors({})
    trackSeoEvent('contact_submit_started', {
      route: '/contact',
      ctaLocation: 'contact_form',
    })

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const phone = String(formData.get('phone') || '').trim()
    const preferredMonth = String(formData.get('preferredMonth') || '').trim()
    const userMessage = String(formData.get('message') || '').trim()
    const honeypot = String(formData.get('companyWebsite') || '')
    const validation = validateContactInquiry({
      name,
      email,
      phone,
      preferredMonth,
      message: userMessage,
      honeypot,
      elapsedMs: Date.now() - renderedAt,
    })

    if (!validation.success) {
      setStatus('error')
      setErrors(validation.errors)
      setMessage(validation.errors.form || 'Please fix the highlighted fields.')
      trackSeoEvent('contact_submit_failed', {
        route: '/contact',
        resultCode: validation.errors.form ? 'spam_or_timing' : 'validation_error',
      })
      return
    }

    const selectedStyles = formData.getAll('journeyStyle').join(', ')
    const details = [
      `${t.contactPage.form.phone}: ${phone || t.contactPage.form.notProvided}`,
      `${t.contactPage.form.month}: ${preferredMonth || t.contactPage.form.notProvided}`,
      `${t.contactPage.form.journeyStyle}: ${selectedStyles || t.contactPage.form.notSelected}`,
      `${t.contactPage.form.travelers}: ${formData.get('travelers') || t.contactPage.form.notSelected}`,
      `${t.contactPage.form.tripLength}: ${formData.get('tripLength') || t.contactPage.form.notSelected}`,
      '',
      userMessage,
    ].join('\n')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message: details,
        }),
      })

      const payload = (await response.json()) as { success?: boolean }

      if (!response.ok || !payload.success) {
        throw new Error(t.contactPage.form.error)
      }

      event.currentTarget.reset()
      setRenderedAt(Date.now())
      setStatus('success')
      setMessage(t.contactPage.form.success)
      trackSeoEvent('contact_submit_success', {
        route: '/contact',
        ctaLocation: 'contact_form',
      })
    } catch {
      setStatus('error')
      setMessage(t.contactPage.form.error)
      trackSeoEvent('contact_submit_failed', {
        route: '/contact',
        resultCode: 'server_or_network_error',
      })
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
              <input
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
                aria-invalid={Boolean(errors.name)}
                className={inputClass}
                maxLength={80}
                minLength={2}
                name="name"
                placeholder={t.contactPage.form.namePlaceholder}
                required
              />
              {errors.name ? (
                <span id="contact-name-error" className="mt-2 block text-sm text-red-700">
                  {errors.name}
                </span>
              ) : null}
            </label>
            <label>
              <FieldLabel>{t.contactPage.form.email}</FieldLabel>
              <input
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
                aria-invalid={Boolean(errors.email)}
                className={inputClass}
                maxLength={120}
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
              {errors.email ? (
                <span id="contact-email-error" className="mt-2 block text-sm text-red-700">
                  {errors.email}
                </span>
              ) : null}
            </label>
            <label>
              <FieldLabel>{t.contactPage.form.phone}</FieldLabel>
              <input
                aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                aria-invalid={Boolean(errors.phone)}
                className={inputClass}
                maxLength={40}
                name="phone"
                placeholder="+1 000 000 0000"
              />
              {errors.phone ? (
                <span id="contact-phone-error" className="mt-2 block text-sm text-red-700">
                  {errors.phone}
                </span>
              ) : null}
            </label>
            <label>
              <FieldLabel>{t.contactPage.form.month}</FieldLabel>
              <input
                aria-describedby={errors.preferredMonth ? 'contact-month-error' : undefined}
                aria-invalid={Boolean(errors.preferredMonth)}
                className={inputClass}
                maxLength={80}
                name="preferredMonth"
                placeholder={t.contactPage.form.monthPlaceholder}
              />
              {errors.preferredMonth ? (
                <span id="contact-month-error" className="mt-2 block text-sm text-red-700">
                  {errors.preferredMonth}
                </span>
              ) : null}
            </label>
          </div>

          <label className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
            Company website
            <input
              name="companyWebsite"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>

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
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
              aria-invalid={Boolean(errors.message)}
              className={inputClass}
              maxLength={2500}
              minLength={20}
              name="message"
              rows={6}
              placeholder={t.contactPage.form.messagePlaceholder}
              required
            />
            {errors.message ? (
              <span id="contact-message-error" className="mt-2 block text-sm text-red-700">
                {errors.message}
              </span>
            ) : null}
          </label>

          {message ? (
            <p
              role={status === 'error' ? 'alert' : 'status'}
              aria-live={status === 'error' ? 'assertive' : 'polite'}
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
