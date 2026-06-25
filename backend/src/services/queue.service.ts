import { Queue, Worker } from "bullmq";
import { redis } from "../config/redis.js";
import { logger } from "../config/pino.js";

type EmailJobData = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

let emailQueue: Queue<EmailJobData> | null = null;

export function getEmailQueue(): Queue<EmailJobData> | null {
  if (!redis) return null;
  if (!emailQueue) {
    emailQueue = new Queue<EmailJobData>("email", {
      connection: redis as any,
      defaultJobOptions: {
        attempts: 3,
        backoff: { type: "exponential", delay: 5000 },
        removeOnComplete: 100,
        removeOnFail: 50
      }
    });
  }
  return emailQueue;
}

export function createEmailWorker(handler: (data: EmailJobData) => Promise<void>) {
  if (!redis) {
    logger.warn("Redis not available — email worker not started");
    return null;
  }

  const worker = new Worker<EmailJobData>("email", async (job) => {
    await handler(job.data);
  }, {
    connection: redis as any,
    concurrency: 5
  });

  worker.on("completed", (job) => {
    logger.info({ jobId: job.id }, "Email job completed");
  });

  worker.on("failed", (job, err) => {
    logger.error({ jobId: job?.id, err: err.message }, "Email job failed");
  });

  return worker;
}

export async function addEmailJob(data: EmailJobData): Promise<void> {
  const queue = getEmailQueue();
  if (!queue) {
    logger.warn({ to: data.to, subject: data.subject }, "Email queue not available — sending inline");
    throw new Error("Email queue not available");
  }
  await queue.add("send-email", data);
}
