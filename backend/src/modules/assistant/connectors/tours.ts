import { prisma } from "../../../config/database.js";
import type { DataConnector } from "./types.js";
import type { KeywordRecord } from "./keywordSearch.js";
import { rankResults } from "./keywordSearch.js";
import type { Tour, Destination } from "@prisma/client";

type TourWithDestination = Tour & { destination: Destination | null };

interface TourRecord extends KeywordRecord {
  id: number;
  tourName: string;
  slug: string;
  adultPrice: number | null;
  childPrice: number | null;
  overview: string | null;
  destinationName: string | null;
}

export class TourConnector implements DataConnector<TourRecord> {
  async search(query: string): Promise<TourRecord[]> {
    const all = await this.getAll();
    return rankResults<TourRecord>(all, query, [
      "tourName",
      "overview",
      "destinationName",
    ]);
  }

  async getAll(): Promise<TourRecord[]> {
    const tours = (await prisma.tour.findMany({
      include: { destination: true },
      take: 50,
    })) as TourWithDestination[];

    return tours.map((t: TourWithDestination) => ({
      id: t.id,
      tourName: t.tourName,
      slug: t.slug,
      adultPrice: t.adultPrice ? Number(t.adultPrice) : null,
      childPrice: t.childPrice ? Number(t.childPrice) : null,
      overview: t.overview ?? "",
      destinationName: t.destination?.destinationName ?? null,
      keywords: [
        t.tourName,
        t.destination?.destinationName ?? "",
        t.overview ?? "",
      ].filter(Boolean),
    }));
  }
}

export function createTourConnector(): TourConnector {
  return new TourConnector();
}
