import fs from "node:fs/promises";
import path from "node:path";
import { env } from "../config/env.js";

export function absoluteStoredPath(storedPath: string) {
  return path.resolve(process.cwd(), env.UPLOAD_ROOT, storedPath);
}

export async function removeStoredFile(storedPath: string | null | undefined) {
  if (!storedPath) return;
  try {
    await fs.unlink(absoluteStoredPath(storedPath));
  } catch {
    // Missing files should not fail DB operations.
  }
}
