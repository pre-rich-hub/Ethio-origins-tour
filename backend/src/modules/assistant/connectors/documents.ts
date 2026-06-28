import { prisma } from "../../../config/database.js";
import type { DataConnector } from "./types.js";
import { getEmbeddingProvider } from "../../../services/embedding.js";
import { logger } from "../../../config/pino.js";

const MAX_CHUNKS = 15;

interface DocumentChunkRecord {
  id: string;
  content: string;
  source: string;
}

export class DocumentConnector implements DataConnector<DocumentChunkRecord> {
  async search(query: string): Promise<DocumentChunkRecord[]> {
    try {
      const embeddingProvider = getEmbeddingProvider();
      const [embedding] = await embeddingProvider.embedMany([query]);
      const vectorStr = `[${embedding.join(",")}]`;

      const rows = await prisma.$queryRawUnsafe<DocumentChunkRecord[]>(
        `SELECT id, content, source
         FROM document_chunks
         ORDER BY embedding::vector <=> $1::vector
         LIMIT $2`,
        vectorStr,
        MAX_CHUNKS,
      );

      return rows;
    } catch (err) {
      logger.warn({ err }, "Document vector search failed, returning empty");
      return [];
    }
  }

  async getAll(): Promise<DocumentChunkRecord[]> {
    return [];
  }
}

export function createDocumentConnector(): DocumentConnector {
  return new DocumentConnector();
}
