import { prisma } from "../../../config/database.js";
import type { DataConnector } from "./types.js";
import type { KeywordRecord } from "./keywordSearch.js";
import { rankResults } from "./keywordSearch.js";
import type { Destination } from "@prisma/client";

interface DestinationRecord extends KeywordRecord {
  id: number;
  destinationName: string;
  slug: string;
  description: string | null;
}

export class DestinationConnector implements DataConnector<DestinationRecord> {
  async search(query: string): Promise<DestinationRecord[]> {
    const all = await this.getAll();
    return rankResults<DestinationRecord>(all, query, [
      "destinationName",
      "description",
    ]);
  }

  async getAll(): Promise<DestinationRecord[]> {
    const destinations: Destination[] = await prisma.destination.findMany({ take: 50 });

    return destinations.map((d: Destination) => ({
      id: d.id,
      destinationName: d.destinationName,
      slug: d.slug,
      description: d.description ?? "",
      keywords: [d.destinationName, d.description ?? ""].filter(Boolean),
    }));
  }
}

export function createDestinationConnector(): DestinationConnector {
  return new DestinationConnector();
}
