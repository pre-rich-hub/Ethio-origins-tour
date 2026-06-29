import type { Metadata } from 'next'
import { AdminBlogNew } from './blog-new-client'

export const metadata: Metadata = {
  title: 'New Blog Post',
  robots: { index: false, follow: false },
}

export default function AdminBlogNewPage() {
  return <AdminBlogNew />
}
