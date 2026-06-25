import fs from "node:fs";
import path from "node:path";
import mammoth from "mammoth";
import { prisma } from "../config/database.js";
import { env } from "../config/env.js";
import { logger } from "../config/pino.js";
import { getEmbeddingProvider } from "./embedding.js";

const CHUNK_SIZE = 1500;
const CHUNK_OVERLAP = 200;

interface Chunk {
  content: string;
  source: string;
}

function chunkText(text: string, source: string): Chunk[] {
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
  const chunks: Chunk[] = [];
  let buffer = "";

  for (const paragraph of paragraphs) {
    const trimmed = paragraph.trim();
    if (buffer.length + trimmed.length < CHUNK_SIZE) {
      buffer += (buffer ? "\n\n" : "") + trimmed;
    } else {
      if (buffer) chunks.push({ content: buffer, source });
      buffer = trimmed;
    }
  }

  if (buffer) chunks.push({ content: buffer, source });

  if (chunks.length === 0 && text.trim()) {
    chunks.push({ content: text.trim().slice(0, CHUNK_SIZE), source });
  }

  return chunks;
}

function addOverlap(chunks: Chunk[]): Chunk[] {
  if (chunks.length <= 1) return chunks;

  const result: Chunk[] = [];

  for (let i = 0; i < chunks.length; i++) {
    const current = chunks[i];
    let merged = current.content;

    if (i > 0 && CHUNK_OVERLAP > 0) {
      const prev = chunks[i - 1].content;
      merged = prev.slice(-CHUNK_OVERLAP) + "\n\n" + current.content;
    }

    result.push({ content: merged, source: current.source });
  }

  return result;
}

export interface IngestResult {
  fileName: string;
  status: "ingested" | "error";
  error?: string;
  chunkCount: number;
}

export async function ingestFile(filePath: string): Promise<IngestResult> {
  const fileName = path.basename(filePath);
  logger.info({ file: fileName }, "Ingesting document");

  const buffer = fs.readFileSync(filePath);
  const result = await mammoth.extractRawText({ buffer });
  const text = result.value.trim();

  if (!text) {
    return { fileName, status: "error", error: "Empty document", chunkCount: 0 };
  }

  const paragraphChunks = chunkText(text, fileName);
  const finalChunks = addOverlap(paragraphChunks);

  logger.info({ file: fileName, chunks: finalChunks.length }, "Generating embeddings");

  const embeddingProvider = getEmbeddingProvider();
  const allEmbeddings = await embeddingProvider.embedMany(
    finalChunks.map((c) => c.content),
  );

  await prisma.$transaction(async (tx) => {
    await tx.$executeRawUnsafe(`DELETE FROM document_chunks WHERE source = $1`, fileName);

    for (let i = 0; i < finalChunks.length; i++) {
      const chunk = finalChunks[i];
      const vectorStr = `[${allEmbeddings[i].join(",")}]`;

      await tx.$executeRawUnsafe(
        `INSERT INTO document_chunks (id, content, source, metadata, embedding)
         VALUES ($1, $2, $3, $4::jsonb, $5::vector)`,
        crypto.randomUUID(),
        chunk.content,
        chunk.source,
        JSON.stringify({ index: i }),
        vectorStr,
      );
    }
  });

  logger.info({ file: fileName, chunks: finalChunks.length }, "Document ingested");

  return { fileName, status: "ingested", chunkCount: finalChunks.length };
}

export async function ingestAll(): Promise<IngestResult[]> {
  const docsDir = path.resolve(env.DOCUMENTS_DIR);

  if (!fs.existsSync(docsDir)) {
    logger.warn({ dir: docsDir }, "Documents directory does not exist, creating");
    fs.mkdirSync(docsDir, { recursive: true });
    return [];
  }

  const files = fs
    .readdirSync(docsDir)
    .filter((f) => f.toLowerCase().endsWith(".docx"))
    .map((f) => path.join(docsDir, f));

  if (files.length === 0) {
    logger.info({ dir: docsDir }, "No .docx files found");
    return [];
  }

  logger.info({ count: files.length, dir: docsDir }, "Starting ingestion");

  const results: IngestResult[] = [];

  for (const filePath of files) {
    try {
      const result = await ingestFile(filePath);

      await prisma.documentFile.upsert({
        where: { filename: path.basename(filePath) },
        update: { status: result.status, error: null },
        create: {
          filename: path.basename(filePath),
          originalName: path.basename(filePath),
          size: fs.statSync(filePath).size,
          status: result.status,
        },
      });

      results.push(result);
    } catch (err) {
      const fileName = path.basename(filePath);
      const message = err instanceof Error ? err.message : String(err);
      logger.error({ file: fileName, error: message }, "Ingestion failed");

      await prisma.documentFile.upsert({
        where: { filename: fileName },
        update: { status: "error", error: message },
        create: {
          filename: fileName,
          originalName: fileName,
          size: fs.statSync(filePath).size,
          status: "error",
          error: message,
        },
      });

      results.push({ fileName, status: "error", error: message, chunkCount: 0 });
    }
  }

  return results;
}
