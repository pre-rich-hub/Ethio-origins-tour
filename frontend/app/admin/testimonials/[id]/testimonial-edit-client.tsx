'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'

type TestimonialData = {
  id: number
  name: string
  role: string | null
  content: string
  rating: number | null
  imageUrl: string | null
  isFeatured: boolean
}

export function AdminTestimonialEdit() {
  const router = useRouter()
  const params = useParams()
  const id = Number(params.id)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [testimonial, setTestimonial] = useState<TestimonialData | null>(null)
  const [newImage, setNewImage] = useState<File | null>(null)

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      fetch(`/api/v1/admin/testimonials/${id}`, { credentials: 'include' })
        .then((r) => r.json())
        .then((d) => { if (d.success) setTestimonial(d.data) })
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
    if (newImage) formData.append('image', newImage)

    try {
      const res = await fetch(`/api/v1/admin/testimonials/${id}`, {
        method: 'PUT',
        body: formData,
        credentials: 'include',
      })
      const data = await res.json()
      if (data.success) {
        router.push('/admin/testimonials')
      } else {
        setError(data.message || 'Failed to update testimonial')
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

  if (!testimonial) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">Testimonial not found.</p>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-foreground">Edit Testimonial</h1>
        <p className="text-muted-foreground text-sm mt-1">{testimonial.name}</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="bg-white rounded-xl border border-border p-6 shadow-xs">
          <h2 className="font-serif text-lg text-foreground mb-5">Testimonial Details</h2>
          <div className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                Customer Name
              </label>
              <input
                id="name"
                name="name"
                required
                defaultValue={testimonial.name}
                className="w-full px-3.5 py-2 bg-white border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-foreground mb-1.5">
                Role / Title
              </label>
              <input
                id="role"
                name="role"
                defaultValue={testimonial.role ?? ''}
                className="w-full px-3.5 py-2 bg-white border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-foreground mb-1.5">
                Testimonial Content
              </label>
              <textarea
                id="content"
                name="content"
                required
                rows={5}
                defaultValue={testimonial.content}
                className="w-full px-3.5 py-2 bg-white border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold resize-y"
              />
            </div>
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-foreground mb-1.5">
                Rating (1-5)
              </label>
              <input
                id="rating"
                name="rating"
                type="number"
                min="1"
                max="5"
                step="1"
                defaultValue={testimonial.rating ?? ''}
                className="w-full px-3.5 py-2 bg-white border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
              />
            </div>
            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                id="isFeatured"
                name="isFeatured"
                value="true"
                defaultChecked={testimonial.isFeatured}
                className="w-4 h-4 rounded border-border text-gold focus:ring-gold/30"
              />
              <label htmlFor="isFeatured" className="text-sm font-medium text-foreground">
                Featured Testimonial
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Current Photo
              </label>
              {testimonial.imageUrl ? (
                <img
                  src={testimonial.imageUrl}
                  alt=""
                  className="w-16 h-16 rounded-full object-cover border border-border"
                />
              ) : (
                <p className="text-sm text-muted-foreground">No photo</p>
              )}
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-foreground mb-1.5">
                Replace Photo
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
            onClick={() => router.push('/admin/testimonials')}
            className="px-6 py-2.5 border border-border text-muted-foreground rounded-lg text-sm font-medium hover:text-foreground hover:bg-muted transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
