import { Router } from "express";
import { prisma } from "../../config/database.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ok } from "../../utils/api-response.js";
import { mapTestimonial } from "../../utils/mappers.js";

export const testimonialsRouter = Router();

testimonialsRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const testimonials = await prisma.testimonial.findMany({ orderBy: { id: "asc" } });
    return ok(res, "Testimonials fetched successfully", testimonials.map(mapTestimonial));
  })
);

