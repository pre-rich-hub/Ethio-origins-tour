export interface DataConnector<T> {
  search(query: string): Promise<T[]>;
  getAll(): Promise<T[]>;
}
