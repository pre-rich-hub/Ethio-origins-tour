import type { Metadata } from 'next'
import { AdminGalleryNew } from './gallery-new-client'

export const metadata: Metadata = {
  title: 'Add Gallery Images',
  robots: { index: false, follow: false },
}

export default function AdminGalleryNewPage() {
  return <AdminGalleryNew />
}
