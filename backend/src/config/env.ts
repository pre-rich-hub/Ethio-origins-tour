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
});

export const env = envSchema.parse(process.env);

export const isProduction = env.NODE_ENV === "production";
