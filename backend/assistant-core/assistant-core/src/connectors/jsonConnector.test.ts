import { describe, it, expect } from "vitest";
import { JsonConnector } from "./jsonConnector.js";

type TestItem = Record<string, unknown>;

const items: TestItem[] = [
  { id: 1, name: "Rome Weekend", destination: "Rome", price: 800 },
  { id: 2, name: "Zanzibar Beach Escape", destination: "Zanzibar", price: 1200 },
  { id: 3, name: "Tokyo Food Tour", destination: "Tokyo", price: 1500 },
];

describe("JsonConnector", () => {
  it("getAll returns all items", async () => {
    const connector = new JsonConnector(items);
    const result = await connector.getAll();
    expect(result).toEqual(items);
  });

  it("search finds items matching query terms", async () => {
    const connector = new JsonConnector(items);
    const result = await connector.search("rome weekend");
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Rome Weekend");
  });

  it("search is case insensitive", async () => {
    const connector = new JsonConnector(items);
    const result = await connector.search("ROME");
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Rome Weekend");
  });

  it("search returns empty array when nothing matches", async () => {
    const connector = new JsonConnector(items);
    const result = await connector.search("mars colony");
    expect(result).toHaveLength(0);
  });

  it("search respects topK limit", async () => {
    const connector = new JsonConnector(items, { topK: 1 });
    const result = await connector.search("beach tokyo rome");
    expect(result).toHaveLength(1);
  });

  it("defaults topK to 5", async () => {
    const manyItems: TestItem[] = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      name: `Item ${i}`,
      category: "travel",
    }));
    const connector = new JsonConnector(manyItems);
    const result = await connector.search("travel");
    expect(result).toHaveLength(5);
  });
});
