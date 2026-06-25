import { Router } from "express";
import { validate } from "../../middleware/validate.middleware.js";
import { publicFormLimiter } from "../../middleware/rate-limit.middleware.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ok, fail } from "../../utils/api-response.js";
import { chatRequestSchema } from "./assistant.validation.js";
import { handleChat, getConversationHistory } from "./assistant.service.js";
import { listConversations } from "./conversation.service.js";

export const assistantRouter = Router();

assistantRouter.post(
  "/chat",
  publicFormLimiter,
  validate(chatRequestSchema),
  asyncHandler(async (req, res) => {
    const { message, conversationId } = req.body;

    try {
      const { response, conversationId: id } = await handleChat(
        message,
        conversationId,
      );

      ok(res, "OK", {
        reply: response.reply,
        lead: response.lead,
        shouldHandoff: response.shouldHandoff,
        conversationId: id,
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Assistant request failed";
      fail(res, message, [], 502);
    }
  }),
);

assistantRouter.get(
  "/conversations",
  asyncHandler(async (_req, res) => {
    const conversations = await listConversations();
    ok(res, "OK", conversations);
  }),
);

assistantRouter.get(
  "/conversation/:id",
  asyncHandler(async (req, res) => {
    const conversationId = String(req.params.id);
    const conversation = await getConversationHistory(conversationId);

    if (!conversation) {
      fail(res, "Conversation not found", [], 404);
      return;
    }

    ok(res, "OK", conversation);
  }),
);
