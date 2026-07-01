import type { Metadata } from 'next'
import { AdminGallery } from './gallery-client'

export const metadata: Metadata = { title: 'Gallery' }

export default function AdminGalleryPage() {
  return <AdminGallery />
}
