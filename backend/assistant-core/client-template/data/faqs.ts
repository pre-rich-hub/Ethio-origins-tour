import faqsData from "./faqs.json";
import { KeywordConnector } from "./keywordConnector.js";

export interface TravelFaq {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
}

export function createFaqConnector(): KeywordConnector<TravelFaq> {
  return new KeywordConnector<TravelFaq>(faqsData as TravelFaq[], ["question", "answer"]);
}
