import { getStorageProvider } from "./storage/index.js";

export async function removeStoredFile(storedPath: string | null | undefined) {
  if (!storedPath) return;
  const provider = await getStorageProvider();
  await provider.delete(storedPath);
}
