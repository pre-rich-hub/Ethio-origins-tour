import type { Metadata } from 'next'
import { AdminTestimonialEdit } from './testimonial-edit-client'

export const metadata: Metadata = {
  title: 'Edit Testimonial',
  robots: { index: false, follow: false },
}

export default function AdminTestimonialEditPage() {
  return <AdminTestimonialEdit />
}
