import { destinations } from '../data/destinations'

export function getDestination(slug: string) {
  return destinations.find((destination) => destination.slug === slug)
}
