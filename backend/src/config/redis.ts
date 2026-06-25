import type { Redis as RedisType } from "ioredis";
import { Redis } from "ioredis";
import { env } from "./env.js";
import { logger } from "./pino.js";

let redisClient: RedisType | null = null;

if (env.REDIS_URL) {
  redisClient = new Redis(env.REDIS_URL, {
    maxRetriesPerRequest: null,
    enableOfflineQueue: false,
    lazyConnect: true
  });

  redisClient.on("error", (err: Error) => {
    logger.error({ err }, "Redis connection error");
  });

  redisClient.on("connect", () => {
    logger.info("Redis connected");
  });
}

export { redisClient as redis };

export async function checkRedis(): Promise<boolean> {
  if (!redisClient) return false;
  try {
    await redisClient.ping();
    return true;
  } catch {
    return false;
  }
}
