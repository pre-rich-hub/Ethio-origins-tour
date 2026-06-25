import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../config/database.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ok } from "../../utils/api-response.js";
import { mapGalleryImage } from "../../utils/mappers.js";

export const galleryRouter = Router();

galleryRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const images = await prisma.gallery.findMany({ orderBy: { id: "desc" } });
    return ok(res, "Gallery fetched successfully", images.map(mapGalleryImage));
  })
);

galleryRouter.get(
  "/tour/:tourId",
  asyncHandler(async (req, res) => {
    const tourId = z.coerce.number().int().positive().parse(req.params.tourId);
    const images = await prisma.gallery.findMany({
      where: { tourId },
      orderBy: { id: "asc" }
    });
    return ok(res, "Tour gallery fetched successfully", images.map(mapGalleryImage));
  })
);

