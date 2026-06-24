import { Router } from "express";
import { prisma } from "../../config/database.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ok } from "../../utils/api-response.js";
import { mapCategory } from "../../utils/mappers.js";

export const categoriesRouter = Router();

categoriesRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const categories = await prisma.tourCategory.findMany({
      include: { _count: { select: { tours: true } } },
      orderBy: { id: "asc" }
    });
    return ok(res, "Categories fetched successfully", categories.map(mapCategory));
  })
);

