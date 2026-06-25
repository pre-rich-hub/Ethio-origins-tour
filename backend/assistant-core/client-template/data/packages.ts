import packagesData from "./packages.json";
import { KeywordConnector } from "./keywordConnector.js";

export interface TourPackage {
  id: string;
  destination: string;
  title: string;
  nights: number;
  pricePerPerson: number;
  keywords: string[];
  summary: string;
}

export function createTourPackageConnector(): KeywordConnector<TourPackage> {
  return new KeywordConnector<TourPackage>(packagesData as TourPackage[], [
    "destination",
    "title",
    "summary",
  ]);
}
