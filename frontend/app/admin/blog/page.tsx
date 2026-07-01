import type { Metadata } from 'next'
import { AdminBlog } from './blog-client'

export const metadata: Metadata = { title: 'Blog' }

export default function AdminBlogPage() {
  return <AdminBlog />
}
