'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'

type DestinationData = {
  id: number
  name: string
  description: string | null
  imageUrl: string | null
}

export function AdminDestinationEdit() {
  const router = useRouter()
  const params = useParams()
  const id = Number(params.id)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [destination, setDestination] = useState<DestinationData | null>(null)
  const [newImage, setNewImage] = useState<File | null>(null)

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      fetch(`/api/v1/admin/destinations/${id}`, { credentials: 'include' })
        .then((r) => r.json())
        .then((d) => { if (d.success) setDestination(d.data) })
        .catch(() => undefined)
        .finally(() => setLoading(false))
    }, 0)
    return () => window.clearTimeout(timeout)
  }, [id])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const form = e.currentTarget
    const formData = new FormData(form)
    if (newImage) formData.set('destinationImage', newImage)

    try {
      const res = await fetch(`/api/v1/admin/destinations/${id}`, {
        method: 'PUT',
        body: formData,
        credentials: 'include',
      })
      const data = await res.json()
      if (data.success) {
        router.push('/admin/destinations')
      } else {
        setError(data.message || 'Failed to update destination')
      }
    } catch {
      setError('Network error. Please try again.')
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

  if (!destination) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">Destination not found.</p>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-foreground">Edit Destination</h1>
        <p className="text-muted-foreground text-sm mt-1">{destination.name}</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="bg-white rounded-xl border border-border p-6 shadow-xs">
          <h2 className="font-serif text-lg text-foreground mb-5">Destination Details</h2>
          <div className="space-y-5">
            <div>
              <label htmlFor="destinationName" className="block text-sm font-medium text-foreground mb-1.5">
                Name
              </label>
              <input
                id="destinationName"
                name="destinationName"
                required
                defaultValue={destination.name}
                className="w-full px-3.5 py-2 bg-white border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
              />
            </div>
            <div>
              <label htmlFor="destinationDescription" className="block text-sm font-medium text-foreground mb-1.5">
                Description
              </label>
              <textarea
                id="destinationDescription"
                name="destinationDescription"
                rows={4}
                defaultValue={destination.description ?? ''}
                className="w-full px-3.5 py-2 bg-white border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold resize-y"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Current Image
              </label>
              {destination.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={destination.imageUrl}
                  alt=""
                  className="w-40 h-28 rounded-lg object-cover border border-border"
                />
              ) : (
                <p className="text-sm text-muted-foreground">No image</p>
              )}
            </div>
            <div>
              <label htmlFor="destinationImage" className="block text-sm font-medium text-foreground mb-1.5">
                Replace Image
              </label>
              <input
                id="destinationImage"
                name="destinationImage"
                type="file"
                accept="image/*"
                onChange={(e) => setNewImage(e.target.files?.[0] ?? null)}
                className="block w-full text-sm text-muted-foreground file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gold/10 file:text-gold hover:file:bg-gold/20 cursor-pointer"
              />
            </div>
          </div>
        </section>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-gold text-white rounded-lg text-sm font-medium hover:bg-gold/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {submitting && <Loader2 size={16} className="animate-spin" />}
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/destinations')}
            className="px-6 py-2.5 border border-border text-muted-foreground rounded-lg text-sm font-medium hover:text-foreground hover:bg-muted transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
