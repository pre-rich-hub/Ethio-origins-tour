'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

type BlogCategory = { id: number; name: string; slug: string }

export function AdminBlogNew() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [image, setImage] = useState<File | null>(null)

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      fetch('/api/v1/admin/blog/categories', { credentials: 'include' })
        .then((r) => r.json())
        .then((d) => { if (d.success) setCategories(d.data) })
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
    if (image) formData.append('image', image)

    try {
      const res = await fetch('/api/v1/admin/blog', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      })
      const data = await res.json()
      if (data.success) {
        router.push('/admin/blog')
      } else {
        setError(data.message || 'Failed to create post')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-foreground">New Blog Post</h1>
        <p className="text-muted-foreground text-sm mt-1">Write a new blog post</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="bg-white rounded-xl border border-border p-6 shadow-xs">
          <h2 className="font-serif text-lg text-foreground mb-5">Post Details</h2>
          <div className="space-y-5">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-foreground mb-1.5">
                Title
              </label>
              <input
                id="title"
                name="title"
                required
                className="w-full px-3.5 py-2 bg-white border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                placeholder="e.g. Exploring the Omo Valley"
              />
            </div>
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-foreground mb-1.5">
                Slug
              </label>
              <input
                id="slug"
                name="slug"
                required
                className="w-full px-3.5 py-2 bg-white border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                placeholder="e.g. exploring-the-omo-valley"
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-foreground mb-1.5">
                Category
              </label>
              <select
                id="category"
                name="category"
                required
                className="w-full px-3.5 py-2 bg-white border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1.5">
                Excerpt / Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className="w-full px-3.5 py-2 bg-white border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold resize-y"
                placeholder="Short description or excerpt of the post..."
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-foreground mb-1.5">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                rows={12}
                className="w-full px-3.5 py-2 bg-white border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold resize-y font-mono"
                placeholder="Write your blog post content here..."
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-foreground mb-1.5">
                Featured Image
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] ?? null)}
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
            {submitting ? 'Creating...' : 'Create Post'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/blog')}
            className="px-6 py-2.5 border border-border text-muted-foreground rounded-lg text-sm font-medium hover:text-foreground hover:bg-muted transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
