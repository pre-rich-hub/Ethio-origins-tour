import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import path from "node:path";
import { env } from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware.js";

export const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.FRONTEND_ORIGIN,
    credentials: true
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/assets", express.static(path.resolve(process.cwd(), env.UPLOAD_ROOT, "assets")));

app.get("/health", (_req, res) => {
  res.json({ success: true, message: "OK", data: { status: "healthy" } });
});

export function installFinalMiddleware() {
  app.use(notFoundHandler);
  app.use(errorHandler);
}
