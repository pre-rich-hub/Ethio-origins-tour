import { z } from "zod";

export const chatRequestSchema = z.object({
  body: z.object({
    message: z.string().min(1).max(2000),
    conversationId: z.string().optional(),
  }),
});
