import type { Metadata } from 'next'
import { AdminGalleryEdit } from './gallery-edit-client'

export const metadata: Metadata = {
  title: 'Edit Gallery Image',
  robots: { index: false, follow: false },
}

export default function AdminGalleryEditPage() {
  return <AdminGalleryEdit />
}
