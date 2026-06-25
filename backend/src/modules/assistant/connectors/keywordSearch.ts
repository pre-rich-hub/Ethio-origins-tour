export interface KeywordRecord {
  id: string | number;
  keywords?: string[];
}

export function tokenize(value: string): string[] {
  return Array.from(new Set(value.toLowerCase().match(/[a-z0-9]+/g) ?? [])).filter(
    (token) => token.length >= 2,
  );
}

export function scoreItem<T extends KeywordRecord>(
  item: T,
  tokens: string[],
  searchableKeys: (keyof T)[],
): number {
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

export function rankResults<T extends KeywordRecord>(
  items: T[],
  query: string,
  searchableKeys: (keyof T)[],
): T[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  return [...items]
    .map((item) => ({ item, score: scoreItem(item, tokens, searchableKeys) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);
}
