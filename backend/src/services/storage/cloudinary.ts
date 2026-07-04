import { v2 as cloudinary } from "cloudinary";
import { env } from "../../config/env.js";
import type { StorageProvider, SaveResult, UploadKind } from "./types.js";

export class CloudinaryStorageProvider implements StorageProvider {
  constructor() {
    if (env.CLOUDINARY_URL) {
      const cloudinaryUrl = new URL(env.CLOUDINARY_URL);
      if (cloudinaryUrl.protocol !== "cloudinary:") {
        throw new Error("CLOUDINARY_URL must start with cloudinary://");
      }
      cloudinary.config({
        cloud_name: cloudinaryUrl.hostname,
        api_key: decodeURIComponent(cloudinaryUrl.username),
        api_secret: decodeURIComponent(cloudinaryUrl.password)
      });
    } else {
      cloudinary.config({
        cloud_name: env.STORAGE_CLOUDINARY_CLOUD_NAME,
        api_key: env.STORAGE_CLOUDINARY_API_KEY,
        api_secret: env.STORAGE_CLOUDINARY_API_SECRET
      });
    }
  }

  async save(file: { buffer: Buffer; originalname: string }, kind: UploadKind): Promise<SaveResult> {
    const publicId = `${kind}/${Date.now()}-${Math.round(Math.random() * 1e9)}`;

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { public_id: publicId, resource_type: "image" },
        (error, result) => {
          if (error || !result) return reject(error ?? new Error("Cloudinary upload failed"));
          resolve({ storedPath: result.public_id, url: result.secure_url });
        }
      );
      uploadStream.end(file.buffer);
    });
  }

  async delete(storedPath: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(storedPath);
    } catch {
      // ignore
    }
  }

  getUrl(storedPath: string): string {
    return cloudinary.url(storedPath, { secure: true });
  }
}
