import { prisma } from "../../../config/database.js";
import type { DataConnector } from "./types.js";
import type { KeywordRecord } from "./keywordSearch.js";
import { rankResults } from "./keywordSearch.js";
import type { Testimonial } from "@prisma/client";

interface TestimonialRecord extends KeywordRecord {
  id: number;
  message: string;
  reviewerName: string | null;
  profession: string | null;
}

export class TestimonialConnector implements DataConnector<TestimonialRecord> {
  async search(query: string): Promise<TestimonialRecord[]> {
    const all = await this.getAll();
    return rankResults<TestimonialRecord>(all, query, [
      "message",
      "reviewerName",
      "profession",
    ]);
  }

  async getAll(): Promise<TestimonialRecord[]> {
    const testimonials: Testimonial[] = await prisma.testimonial.findMany({ take: 50 });

    return testimonials.map((t: Testimonial) => ({
      id: t.id,
      message: t.message,
      reviewerName: t.reviewerName,
      profession: t.profession,
      keywords: [t.message, t.reviewerName, t.profession ?? ""].filter(Boolean),
    }));
  }
}

export function createTestimonialConnector(): TestimonialConnector {
  return new TestimonialConnector();
}
