import type { Metadata } from 'next'
import { AdminTestimonials } from './testimonials-client'

export const metadata: Metadata = { title: 'Testimonials' }

export default function AdminTestimonialsPage() {
  return <AdminTestimonials />
}
