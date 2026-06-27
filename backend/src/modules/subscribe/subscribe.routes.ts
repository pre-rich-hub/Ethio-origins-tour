import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../config/database.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ok } from "../../utils/api-response.js";
import { publicFormLimiter } from "../../middleware/rate-limit.middleware.js";
import { sendSubscriberAdminEmail } from "../../services/email.service.js";

export const subscribeRouter = Router();

const subscribeSchema = z.object({
  email: z.string().email()
});

subscribeRouter.post(
  "/",
  publicFormLimiter,
  asyncHandler(async (req, res) => {
    const { email } = subscribeSchema.parse(req.body);

    const existing = await prisma.subscriber.findUnique({ where: { email } });
    if (existing) {
      return ok(res, "You're already subscribed!", null);
    }

    const subscriber = await prisma.subscriber.create({ data: { email } });

    await sendSubscriberAdminEmail({
      email: subscriber.email,
      subscribedAt: subscriber.createdAt
    });

    return ok(res, "Thanks for subscribing!", null, 201);
  })
);
