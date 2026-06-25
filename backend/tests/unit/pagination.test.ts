import { describe, it, expect } from "vitest";
import { getPagination, meta, paginationQuery } from "../../src/utils/pagination.js";

describe("paginationQuery", () => {
  it("uses defaults when no params", () => {
    const parsed = paginationQuery.parse({});
    expect(parsed.page).toBe(1);
    expect(parsed.limit).toBe(20);
  });

  it("parses coered numbers", () => {
    const parsed = paginationQuery.parse({ page: "2", limit: "10" });
    expect(parsed.page).toBe(2);
    expect(parsed.limit).toBe(10);
  });

  it("rejects page < 1", () => {
    expect(() => paginationQuery.parse({ page: "0" })).toThrow();
  });

  it("rejects limit > 100", () => {
    expect(() => paginationQuery.parse({ limit: "200" })).toThrow();
  });
});

describe("getPagination", () => {
  it("returns skip and take", () => {
    const result = getPagination({ page: 2, limit: 10 });
    expect(result.page).toBe(2);
    expect(result.limit).toBe(10);
    expect(result.skip).toBe(10);
    expect(result.take).toBe(10);
  });

  it("returns skip = 0 for page 1", () => {
    const result = getPagination({ page: 1, limit: 20 });
    expect(result.skip).toBe(0);
  });
});

describe("meta", () => {
  it("returns correct meta", () => {
    const result = meta(50, 1, 20);
    expect(result.total).toBe(50);
    expect(result.page).toBe(1);
    expect(result.limit).toBe(20);
    expect(result.totalPages).toBe(3);
  });

  it("handles zero total", () => {
    const result = meta(0, 1, 20);
    expect(result.totalPages).toBe(0);
  });
});
