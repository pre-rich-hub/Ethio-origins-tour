import { DataConnector } from "../../assistant-core/index.js";

export interface KeywordRecord {
  id: string;
  keywords?: string[];
}

export class KeywordConnector<T extends KeywordRecord> implements DataConnector<T> {
  constructor(private readonly items: T[], private readonly searchableKeys: (keyof T)[] = []) {}

  async search(query: string): Promise<T[]> {
    const tokens = tokenize(query);
    if (tokens.length === 0) {
      return [];
    }

    return [...this.items]
      .map((item) => ({ item, score: scoreItem(item, tokens, this.searchableKeys) }))
      .filter(({ score }) => score > 0)
      .sort((left, right) => right.score - left.score)
      .map(({ item }) => item);
  }

  async getAll(): Promise<T[]> {
    return [...this.items];
  }
}

function tokenize(value: string): string[] {
  return Array.from(new Set(value.toLowerCase().match(/[a-z0-9]+/g) ?? [])).filter(
    (token) => token.length >= 2,
  );
}

function scoreItem<T extends KeywordRecord>(item: T, tokens: string[], searchableKeys: (keyof T)[]): number {
  const haystacks = new Set<string>();

  for (const token of item.keywords ?? []) {
    haystacks.add(token.toLowerCase());
  }

  for (const key of searchableKeys) {
    const value = item[key];
    if (typeof value === "string") {
      tokenize(value).forEach((token) => haystacks.add(token));
    }
  }

  for (const value of Object.values(item)) {
    if (typeof value === "string") {
      tokenize(value).forEach((token) => haystacks.add(token));
    }
  }

  return tokens.reduce((score, token) => score + (haystacks.has(token) ? 1 : 0), 0);
}
