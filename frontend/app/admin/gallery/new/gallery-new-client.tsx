'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

type TourOption = { id: number; name: string }

export function AdminGalleryNew() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [tours, setTours] = useState<TourOption[]>([])

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      fetch('/api/v1/admin/tours', { credentials: 'include' })
        .then((r) => r.json())
        .then((d) => { if (d.success) setTours(d.data) })
        .catch(() => undefined)
    }, 0)
    return () => window.clearTimeout(timeout)
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const form = e.currentTarget
    const formData = new FormData(form)
    images.forEach((file) => formData.append('images', file))

    try {
      const res = await fetch('/api/v1/admin/gallery', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      })
      const data = await res.json()
      if (data.success) {
        router.push('/admin/gallery')
      } else {
        setError(data.message || 'Failed to upload images')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-foreground">Add Gallery Images</h1>
        <p className="text-muted-foreground text-sm mt-1">Upload images to the gallery</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="bg-white rounded-xl border border-border p-6 shadow-xs">
          <h2 className="font-serif text-lg text-foreground mb-5">Images</h2>
          <div className="space-y-5">
            <div>
              <label htmlFor="images" className="block text-sm font-medium text-foreground mb-1.5">
                Select Images
              </label>
              <input
                id="images"
                name="images"
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setImages(Array.from(e.target.files ?? []))}
                className="block w-full text-sm text-muted-foreground file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gold/10 file:text-gold hover:file:bg-gold/20 cursor-pointer"
              />
              {images.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {images.map((file, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 text-xs bg-gold/10 text-gold px-2.5 py-1 rounded-full"
                    >
                      {file.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div>
              <label htmlFor="alt" className="block text-sm font-medium text-foreground mb-1.5">
                Alt Text
              </label>
              <input
                id="alt"
                name="alt"
                className="w-full px-3.5 py-2 bg-white border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                placeholder="Descriptive text for accessibility"
              />
            </div>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-foreground mb-1.5">
                Title
              </label>
              <input
                id="title"
                name="title"
                className="w-full px-3.5 py-2 bg-white border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                placeholder="e.g. Danakil Depression Sunset"
              />
            </div>
            <div>
              <label htmlFor="place" className="block text-sm font-medium text-foreground mb-1.5">
                Place
              </label>
              <input
                id="place"
                name="place"
                className="w-full px-3.5 py-2 bg-white border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                placeholder="e.g. Danakil Depression"
              />
            </div>
            <div>
              <label htmlFor="tourId" className="block text-sm font-medium text-foreground mb-1.5">
                Associated Tour (optional)
              </label>
              <select
                id="tourId"
                name="tourId"
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
            {submitting ? 'Uploading...' : 'Upload Images'}
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
