import path from "node:path";
import fs from "node:fs";
import multer from "multer";
import { env } from "../config/env.js";

export type UploadKind = "tour" | "destination" | "blog" | "gallery" | "admin";

const uploadConfig: Record<UploadKind, { dir: string; dbPrefix: string; prefix: string; extensions: string[] }> = {
  tour: {
    dir: "assets/images/custom/gallery",
    dbPrefix: "assets/images/custom/gallery",
    prefix: "TOUR-",
    extensions: ["jpg", "jpeg", "png", "webp", "avif"]
  },
  destination: {
    dir: "assets/images/destination",
    dbPrefix: "assets/images/destination",
    prefix: "DEST-",
    extensions: ["jpg", "jpeg", "png", "webp", "avif"]
  },
  blog: {
    dir: "assets/images/blog",
    dbPrefix: "assets/images/blog",
    prefix: "BLOG-",
    extensions: ["jpg", "jpeg", "png", "webp", "avif"]
  },
  gallery: {
    dir: "assets/images/gallery",
    dbPrefix: "assets/images/gallery",
    prefix: "IMG-",
    extensions: ["jpg", "jpeg", "png", "webp", "avif"]
  },
  admin: {
    dir: "assets/images/admin",
    dbPrefix: "assets/images/admin",
    prefix: "IMG-",
    extensions: ["jpg", "jpeg", "png", "webp"]
  }
};

export function storedPathForFile(file: Express.Multer.File) {
  return (file as Express.Multer.File & { storedPath?: string }).storedPath;
}

export function uploadFor(kind: UploadKind) {
  const config = uploadConfig[kind];
  const absoluteDir = path.resolve(process.cwd(), env.UPLOAD_ROOT, config.dir);
  fs.mkdirSync(absoluteDir, { recursive: true });

  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, absoluteDir),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname).replace(".", "").toLowerCase();
      const name = `${config.prefix}${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
      (file as Express.Multer.File & { storedPath?: string }).storedPath = `${config.dbPrefix}/${name}`;
      cb(null, name);
    }
  });

  return multer({
    storage,
    limits: {
      fileSize: env.MAX_UPLOAD_MB * 1024 * 1024
    },
    fileFilter: (_req, file, cb) => {
      const ext = path.extname(file.originalname).replace(".", "").toLowerCase();
      const allowedMime = file.mimetype.startsWith("image/");
      cb(null, config.extensions.includes(ext) && allowedMime);
    }
  });
}
