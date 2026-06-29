'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'

type TourOption = { id: number; name: string }

type GalleryData = {
  id: number
  imageUrl: string | null
  alt?: string
  title?: string
  place?: string
  tourId: number | null
}

export function AdminGalleryEdit() {
  const router = useRouter()
  const params = useParams()
  const id = Number(params.id)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [item, setItem] = useState<GalleryData | null>(null)
  const [tours, setTours] = useState<TourOption[]>([])
  const [newImage, setNewImage] = useState<File | null>(null)

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void Promise.all([
        fetch(`/api/v1/admin/gallery/${id}`, { credentials: 'include' })
          .then((r) => r.json())
          .then((d) => { if (d.success) setItem(d.data) }),
        fetch('/api/v1/admin/tours', { credentials: 'include' })
          .then((r) => r.json())
          .then((d) => { if (d.success) setTours(d.data) }),
      ]).finally(() => setLoading(false))
    }, 0)
    return () => window.clearTimeout(timeout)
  }, [id])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const form = e.currentTarget
    const formData = new FormData(form)
    if (newImage) formData.append('image', newImage)

    try {
      const res = await fetch(`/api/v1/admin/gallery/${id}`, {
        method: 'PUT',
        body: formData,
        credentials: 'include',
      })
      const data = await res.json()
      if (data.success) {
        router.push('/admin/gallery')
      } else {
        setError(data.message || 'Failed to update image')
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

  if (!item) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">Image not found.</p>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-foreground">Edit Gallery Image</h1>
        <p className="text-muted-foreground text-sm mt-1">{item.title ?? `Image #${item.id}`}</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="bg-white rounded-xl border border-border p-6 shadow-xs">
          <h2 className="font-serif text-lg text-foreground mb-5">Image Details</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Current Image
              </label>
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.alt ?? ''}
                  className="w-full max-h-64 rounded-lg object-cover border border-border"
                />
              ) : (
                <p className="text-sm text-muted-foreground">No image</p>
              )}
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-foreground mb-1.5">
                Replace Image
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={(e) => setNewImage(e.target.files?.[0] ?? null)}
                className="block w-full text-sm text-muted-foreground file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gold/10 file:text-gold hover:file:bg-gold/20 cursor-pointer"
              />
            </div>
            <div>
              <label htmlFor="alt" className="block text-sm font-medium text-foreground mb-1.5">
                Alt Text
              </label>
              <input
                id="alt"
                name="alt"
                defaultValue={item.alt ?? ''}
                className="w-full px-3.5 py-2 bg-white border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
              />
            </div>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-foreground mb-1.5">
                Title
              </label>
              <input
                id="title"
                name="title"
                defaultValue={item.title ?? ''}
                className="w-full px-3.5 py-2 bg-white border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
              />
            </div>
            <div>
              <label htmlFor="place" className="block text-sm font-medium text-foreground mb-1.5">
                Place
              </label>
              <input
                id="place"
                name="place"
                defaultValue={item.place ?? ''}
                className="w-full px-3.5 py-2 bg-white border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
              />
            </div>
            <div>
              <label htmlFor="tourId" className="block text-sm font-medium text-foreground mb-1.5">
                Associated Tour
              </label>
              <select
                id="tourId"
                name="tourId"
                defaultValue={item.tourId ?? ''}
                className="w-full px-3.5 py-2 bg-white border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
              >
                <option value="">No associated tour</option>
                {tours.map((tour) => (
                  <option key={tour.id} value={tour.id}>{tour.name}</option>
                ))}
              </select>
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
            onClick={() => router.push('/admin/gallery')}
            className="px-6 py-2.5 border border-border text-muted-foreground rounded-lg text-sm font-medium hover:text-foreground hover:bg-muted transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
