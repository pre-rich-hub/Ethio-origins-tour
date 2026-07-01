import { Loader2 } from 'lucide-react'

export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string
  description: string
  action?: React.ReactNode
}) {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="font-serif text-3xl text-foreground">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  )
}

export function AdminLoading() {
  return (
    <div className="flex items-center justify-center py-20" aria-label="Loading">
      <Loader2 className="size-6 animate-spin text-gold" />
    </div>
  )
}

export function AdminFeedback({
  message,
  tone = 'error',
}: {
  message: string
  tone?: 'error' | 'success'
}) {
  if (!message) return null
  return (
    <p
      role={tone === 'error' ? 'alert' : 'status'}
      className={`mb-5 rounded-lg border px-4 py-3 text-sm ${
        tone === 'error'
          ? 'border-red-200 bg-red-50 text-red-700'
          : 'border-emerald-200 bg-emerald-50 text-emerald-700'
      }`}
    >
      {message}
    </p>
  )
}

export const adminInputClass =
  'w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20'

export const adminLabelClass = 'mb-1.5 block text-sm font-medium text-foreground'

export const adminPrimaryButtonClass =
  'inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gold/90 disabled:cursor-not-allowed disabled:opacity-50'

export const adminSecondaryButtonClass =
  'inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-50'
