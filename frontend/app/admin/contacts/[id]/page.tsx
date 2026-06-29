import type { Metadata } from 'next'
import { AdminContactEdit } from './contact-edit-client'

export const metadata: Metadata = {
  title: 'Contact Details',
  robots: { index: false, follow: false },
}

export default function AdminContactEditPage() {
  return <AdminContactEdit />
}
