import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";
import { env } from "./env.js";

export function initSentry() {
  if (!env.SENTRY_DSN) return;

  Sentry.init({
    dsn: env.SENTRY_DSN,
    environment: env.NODE_ENV,
    integrations: [nodeProfilingIntegration()],
    tracesSampleRate: env.NODE_ENV === "production" ? 0.1 : 0,
    profilesSampleRate: env.NODE_ENV === "production" ? 0.1 : 0,
  });
}
