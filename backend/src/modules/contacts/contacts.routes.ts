import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../config/database.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ok } from "../../utils/api-response.js";
import { publicFormLimiter } from "../../middleware/rate-limit.middleware.js";
import { mapContact } from "../../utils/mappers.js";

export const contactsRouter = Router();

export const contactCreateSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1)
});

contactsRouter.post(
  "/",
  publicFormLimiter,
  asyncHandler(async (req, res) => {
    const body = contactCreateSchema.parse(req.body);
    const contact = await prisma.contact.create({ data: body });
    return ok(res, "Contact request submitted successfully", mapContact(contact), 201);
  })
);
