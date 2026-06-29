import type { Metadata } from 'next'
import { AdminTestimonialNew } from './testimonial-new-client'

export const metadata: Metadata = {
  title: 'New Testimonial',
  robots: { index: false, follow: false },
}

export default function AdminTestimonialNewPage() {
  return <AdminTestimonialNew />
}
