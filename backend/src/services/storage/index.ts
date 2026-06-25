import { env } from "../../config/env.js";
import { LocalStorageProvider } from "./local.js";
import type { StorageProvider } from "./types.js";

export type { StorageProvider, SaveResult, UploadKind } from "./types.js";

let _provider: StorageProvider | null = null;

async function resolveProvider(): Promise<StorageProvider> {
  if (_provider) return _provider;

  switch (env.STORAGE_DRIVER) {
    case "s3": {
      const { S3StorageProvider } = await import("./s3.js");
      _provider = new S3StorageProvider();
      break;
    }
    case "cloudinary": {
      const { CloudinaryStorageProvider } = await import("./cloudinary.js");
      _provider = new CloudinaryStorageProvider();
      break;
    }
    default: {
      _provider = new LocalStorageProvider();
    }
  }

  return _provider;
}

export function getStorageProvider(): Promise<StorageProvider> {
  return resolveProvider();
}
