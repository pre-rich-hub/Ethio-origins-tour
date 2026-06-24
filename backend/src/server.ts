import { app, installFinalMiddleware } from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./config/database.js";
import { registerRoutes } from "./routes.js";

registerRoutes(app);
installFinalMiddleware();

const server = app.listen(env.PORT, () => {
  console.log(`Backend API listening on port ${env.PORT}`);
});

async function shutdown() {
  await prisma.$disconnect();
  server.close(() => process.exit(0));
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
