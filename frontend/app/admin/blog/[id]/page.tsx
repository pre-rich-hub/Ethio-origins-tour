import type { Metadata } from 'next'
import { AdminBlogEdit } from './blog-edit-client'

export const metadata: Metadata = {
  title: 'Edit Blog Post',
  robots: { index: false, follow: false },
}

export default function AdminBlogEditPage() {
  return <AdminBlogEdit />
}
