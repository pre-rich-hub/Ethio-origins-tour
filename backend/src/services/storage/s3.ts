import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import path from "node:path";
import { env } from "../../config/env.js";
import type { StorageProvider, SaveResult, UploadKind } from "./types.js";

const uploadConfig: Record<UploadKind, { prefix: string }> = {
  tour:        { prefix: "tours/" },
  destination: { prefix: "destinations/" },
  blog:        { prefix: "blog/" },
  gallery:     { prefix: "gallery/" },
  admin:       { prefix: "admin/" },
  document:    { prefix: "documents/" }
};

export class S3StorageProvider implements StorageProvider {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: env.STORAGE_S3_REGION,
      credentials: {
        accessKeyId: env.STORAGE_S3_ACCESS_KEY,
        secretAccessKey: env.STORAGE_S3_SECRET_KEY
      }
    });
  }

  async save(file: { buffer: Buffer; originalname: string }, kind: UploadKind): Promise<SaveResult> {
    const config = uploadConfig[kind];
    const ext = path.extname(file.originalname).toLowerCase();
    const key = `${config.prefix}${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;

    await this.client.send(
      new PutObjectCommand({
        Bucket: env.STORAGE_S3_BUCKET,
        Key: key,
        Body: file.buffer,
        ContentType: `image/${ext.replace(".", "")}`
      })
    );

    return { storedPath: key, url: this.getUrl(key) };
  }

  async delete(storedPath: string): Promise<void> {
    try {
      await this.client.send(
        new DeleteObjectCommand({
          Bucket: env.STORAGE_S3_BUCKET,
          Key: storedPath
        })
      );
    } catch {
      // ignore
    }
  }

  getUrl(storedPath: string): string {
    return `https://${env.STORAGE_S3_BUCKET}.s3.${env.STORAGE_S3_REGION}.amazonaws.com/${storedPath}`;
  }
}
