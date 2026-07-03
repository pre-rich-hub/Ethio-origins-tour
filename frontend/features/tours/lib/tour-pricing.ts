import type { Tour } from '../types/tour'

type PriceLabels = {
  from: string
  perPerson: string
  requestQuote: string
}

export function getTourStartingPrice(
  tour: Pick<Tour, 'adultPrice'>,
): number | null {
  const price = Number(tour.adultPrice)

  return Number.isFinite(price) && price > 0 ? price : null
}

export function formatUsdPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}

export function getTourPriceLabel(
  tour: Pick<Tour, 'adultPrice'>,
  labels: PriceLabels,
) {
  const price = getTourStartingPrice(tour)

  return price
    ? `${labels.from} ${formatUsdPrice(price)} ${labels.perPerson}`
    : labels.requestQuote
}
