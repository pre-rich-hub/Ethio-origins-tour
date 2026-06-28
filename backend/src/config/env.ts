import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(5000),
  DATABASE_URL: z.string().min(1),
  FRONTEND_ORIGIN: z.string().default("http://localhost:3000"),
  JWT_SECRET: z.string().min(16),
  JWT_EXPIRES_IN: z.string().default("7d"),
  AUTH_COOKIE_NAME: z.string().default("admin_session"),
  COOKIE_SECURE: z.coerce.boolean().default(false),
  SMTP_HOST: z.string().optional().default(""),
  SMTP_PORT: z.coerce.number().int().positive().default(587),
  SMTP_USER: z.string().optional().default(""),
  SMTP_PASS: z.string().optional().default(""),
  SMTP_FROM: z.string().optional().default(""),
  ADMIN_EMAIL: z.string().optional().default(""),
  EMAIL_ENABLED: z.coerce.boolean().default(false),
  UPLOAD_ROOT: z.string().default("."),
  PUBLIC_FILE_BASE_URL: z.string().optional().default(""),
  MAX_UPLOAD_MB: z.coerce.number().positive().default(5),

  // SendGrid
  SENDGRID_API_KEY: z.string().optional().default(""),
  SENDGRID_FROM_EMAIL: z.string().optional().default(""),

  // Redis
  REDIS_URL: z.string().default("redis://localhost:6379"),

  // Sentry
  SENTRY_DSN: z.string().optional().default(""),

  // AI Assistant
  ASSISTANT_PROVIDER: z.enum(["gemini", "openai", "anthropic", "grok", "nvidia"]).default("gemini"),
  ASSISTANT_MODEL: z.string().default("gemini-2.5-flash"),
  GEMINI_API_KEY: z.string().optional().default(""),
  OPENAI_API_KEY: z.string().optional().default(""),
  ANTHROPIC_API_KEY: z.string().optional().default(""),
  GROK_API_KEY: z.string().optional().default(""),
  NVIDIA_API_KEY: z.string().optional().default(""),

  // Document Ingestion
  EMBEDDING_MODEL: z.string().default("gemini-embedding-001"),
  DOCUMENTS_DIR: z.string().default("./data"),

  // Storage
  STORAGE_DRIVER: z.enum(["local", "s3", "cloudinary"]).default("local"),
  STORAGE_S3_BUCKET: z.string().optional().default(""),
  STORAGE_S3_REGION: z.string().optional().default(""),
  STORAGE_S3_ACCESS_KEY: z.string().optional().default(""),
  STORAGE_S3_SECRET_KEY: z.string().optional().default(""),
  STORAGE_CLOUDINARY_CLOUD_NAME: z.string().optional().default(""),
  STORAGE_CLOUDINARY_API_KEY: z.string().optional().default(""),
  STORAGE_CLOUDINARY_API_SECRET: z.string().optional().default(""),
});

const parsed = envSchema.parse(process.env);

if (parsed.NODE_ENV === "production") {
  const required: string[] = [];
  const hasSendGrid = Boolean(parsed.SENDGRID_API_KEY);
  const hasSmtp = Boolean(parsed.SMTP_HOST) && Boolean(parsed.SMTP_USER) && Boolean(parsed.SMTP_PASS);
  if (!hasSendGrid && !hasSmtp) {
    required.push("SENDGRID_API_KEY or complete SMTP configuration (SMTP_HOST, SMTP_USER, SMTP_PASS)");
  }

  if (required.length > 0) {
    throw new Error(
      `Missing required environment variables in production: ${required.join(", ")}`
    );
  }
}

export const env = parsed;

export const isProduction = parsed.NODE_ENV === "production";
