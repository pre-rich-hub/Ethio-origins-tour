import { Router } from "express";
import { prisma } from "../../config/database.js";
import { checkRedis } from "../../config/redis.js";
import { env } from "../../config/env.js";

export const healthRouter = Router();

healthRouter.get("/health", (_req, res) => {
  res.json({ success: true, message: "OK", data: { status: "healthy" } });
});

healthRouter.get("/ready", async (_req, res) => {
  let dbOk = false;
  let redisOk = false;
  const emailOk = Boolean(env.SENDGRID_API_KEY) || Boolean(env.EMAIL_ENABLED);

  try {
    await prisma.$queryRaw`SELECT 1`;
    dbOk = true;
  } catch {}

  redisOk = await checkRedis();

  const allOk = dbOk && (!env.SENDGRID_API_KEY || emailOk);
  const ready = dbOk;

  res.status(ready ? 200 : 503).json({
    success: ready,
    message: ready ? "OK" : "Service not ready",
    data: {
      status: ready ? "ok" : "degraded",
      checks: {
        db: dbOk,
        redis: redisOk,
        email: emailOk
      }
    }
  });
});
