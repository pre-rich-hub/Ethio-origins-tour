'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'

type ContactData = {
  id: number
  name: string
  email: string
  phone: string | null
  preferredMonth: string | null
  message: string
  status: string
  createdAt: string | null
}

export function AdminContactEdit() {
  const router = useRouter()
  const params = useParams()
  const id = Number(params.id)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [contact, setContact] = useState<ContactData | null>(null)

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      fetch(`/api/v1/admin/contacts/${id}`, { credentials: 'include' })
        .then((r) => r.json())
        .then((d) => { if (d.success) setContact(d.data) })
        .catch(() => undefined)
        .finally(() => setLoading(false))
    }, 0)
    return () => window.clearTimeout(timeout)
  }, [id])

  async function handleStatusUpdate(status: string) {
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch(`/api/v1/admin/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
        credentials: 'include',
      })
      const data = await res.json()
      if (data.success) {
        setContact((prev) => prev ? { ...prev, status } : null)
      } else {
        setError(data.message || 'Failed to update status')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this message?')) return
    setSubmitting(true)
    try {
      const res = await fetch(`/api/v1/admin/contacts/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      const data = await res.json()
      if (data.success) router.push('/admin/contacts')
    } catch {
      setError('Failed to delete message')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen ml-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gold border-t-transparent" />
      </div>
    )
  }

  if (!contact) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">Contact message not found.</p>
      </div>
    )
  }

  const statusColors: Record<string, string> = {
    new: 'bg-blue-50 text-blue-700 border-blue-200',
    read: 'bg-gray-50 text-gray-700 border-gray-200',
    replied: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-foreground">Contact Details</h1>
        <p className="text-muted-foreground text-sm mt-1">Message from {contact.name}</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <section className="bg-white rounded-xl border border-border p-6 shadow-xs">
          <h2 className="font-serif text-lg text-foreground mb-5">Contact Information</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Name</dt>
              <dd className="text-foreground font-medium">{contact.name}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Email</dt>
              <dd className="text-foreground">{contact.email}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Phone</dt>
              <dd className="text-foreground">{contact.phone ?? '—'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Preferred Month</dt>
              <dd className="text-foreground">{contact.preferredMonth ?? '—'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Submitted</dt>
              <dd className="text-foreground">
                {contact.createdAt
                  ? new Date(contact.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
                    })
                  : '—'}
              </dd>
            </div>
            <div className="flex justify-between items-center">
              <dt className="text-muted-foreground">Status</dt>
              <dd>
                <span className={`inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full border ${statusColors[contact.status] ?? 'bg-gray-50 text-gray-700 border-gray-200'}`}>
                  {contact.status}
                </span>
              </dd>
            </div>
          </dl>
        </section>

        <section className="bg-white rounded-xl border border-border p-6 shadow-xs">
          <h2 className="font-serif text-lg text-foreground mb-5">Message</h2>
          <p className="text-sm text-foreground whitespace-pre-wrap">{contact.message}</p>
        </section>

        <section className="bg-white rounded-xl border border-border p-6 shadow-xs">
          <h2 className="font-serif text-lg text-foreground mb-5">Update Status</h2>
          <div className="flex flex-wrap gap-3">
            {['new', 'read', 'replied'].map((status) => (
              <button
                key={status}
                onClick={() => handleStatusUpdate(status)}
                disabled={submitting || contact.status === status}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  contact.status === status
                    ? 'bg-muted text-muted-foreground border-border cursor-not-allowed'
                    : 'bg-white text-foreground border-border hover:border-gold hover:text-gold'
                }`}
              >
                {submitting ? <Loader2 size={14} className="animate-spin inline mr-1" /> : null}
                Mark as {status}
              </button>
            ))}
          </div>
        </section>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.push('/admin/contacts')}
            className="px-6 py-2.5 border border-border text-muted-foreground rounded-lg text-sm font-medium hover:text-foreground hover:bg-muted transition-colors"
          >
            Back to Messages
          </button>
          <button
            onClick={handleDelete}
            disabled={submitting}
            className="px-6 py-2.5 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            {submitting ? 'Deleting...' : 'Delete Message'}
          </button>
        </div>
      </div>
    </div>
  )
}
