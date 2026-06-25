import { KeywordConnector } from "./keywordConnector.js";

export interface BookingAvailability {
  id: string;
  packageId: string;
  departureDate: string;
  availableSpots: number;
  keywords: string[];
}

const availabilityData: BookingAvailability[] = [
  {
    id: "availability-rome-1",
    packageId: "rome-weekend",
    departureDate: "2026-07-10",
    availableSpots: 4,
    keywords: ["rome", "weekend", "july", "available", "booking"],
  },
  {
    id: "availability-zanzibar-1",
    packageId: "zanzibar-breeze",
    departureDate: "2026-08-02",
    availableSpots: 2,
    keywords: ["zanzibar", "beach", "august", "available", "booking"],
  },
  {
    id: "availability-tokyo-1",
    packageId: "tokyo-essentials",
    departureDate: "2026-09-12",
    availableSpots: 6,
    keywords: ["tokyo", "japan", "september", "available", "booking"],
  },
];

export function createBookingAvailabilityConnector(): KeywordConnector<BookingAvailability> {
  return new KeywordConnector<BookingAvailability>(availabilityData, ["packageId", "departureDate"]);
}
