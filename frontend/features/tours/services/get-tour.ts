import { tours } from '../data/tours'

export function getTour(slug: string) {
  return tours.find((tour) => tour.slug === slug)
}
