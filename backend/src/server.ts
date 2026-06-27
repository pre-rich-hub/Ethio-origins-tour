import { app, installFinalMiddleware } from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./config/database.js";
import { logger } from "./config/pino.js";
import { initSentry } from "./config/sentry.js";
import { redis } from "./config/redis.js";
import { registerRoutes } from "./routes.js";
import { createEmailWorker } from "./services/queue.service.js";
import { sendMail } from "./services/email.service.js";

const isVercel = Boolean(process.env.VERCEL);

initSentry();
registerRoutes(app);
installFinalMiddleware();

if (!isVercel) {
  createEmailWorker(sendMail);

  const server = app.listen(env.PORT, () => {
    logger.info({ port: env.PORT }, "Backend API listening");
  });

  async function shutdown() {
    logger.info("Shutting down...");
    await prisma.$disconnect();
    if (redis) {
      await redis.quit();
    }
    server.close(() => process.exit(0));
  }

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

export default app;
