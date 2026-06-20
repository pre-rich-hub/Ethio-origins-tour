import { tourCategories } from '../data/tour-categories'

export function getTourCategory(slug: string) {
  return tourCategories.find((category) => category.slug === slug)
}
