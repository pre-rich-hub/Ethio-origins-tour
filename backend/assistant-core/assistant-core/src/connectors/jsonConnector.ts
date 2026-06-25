import { DataConnector } from "./types.js";

export class JsonConnector<T extends Record<string, unknown>>
  implements DataConnector<T>
{
  private readonly topK: number;

  constructor(private data: T[], options?: { topK?: number }) {
    this.topK = options?.topK ?? 5;
  }

  async getAll(): Promise<T[]> {
    return this.data;
  }

  async search(query: string): Promise<T[]> {
    const terms = query.toLowerCase().split(" ");
    return this.data
      .filter((item) =>
        terms.some((term) =>
          JSON.stringify(item).toLowerCase().includes(term)
        )
      )
      .slice(0, this.topK);
  }
}
