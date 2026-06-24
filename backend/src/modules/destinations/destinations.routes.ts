import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../config/database.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ok } from "../../utils/api-response.js";
import { HttpError } from "../../middleware/error.middleware.js";
import { mapDestination, mapTour } from "../../utils/mappers.js";

export const destinationsRouter = Router();

destinationsRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const destinations = await prisma.destination.findMany({
      include: { _count: { select: { tours: true } } },
      orderBy: { id: "desc" }
    });
    return ok(res, "Destinations fetched successfully", destinations.map(mapDestination));
  })
);

destinationsRouter.get(
  "/featured",
  asyncHandler(async (_req, res) => {
    const destinations = await prisma.destination.findMany({
      include: { _count: { select: { tours: true } } }
    });
    const sorted = destinations
      .sort((a, b) => b._count.tours - a._count.tours)
      .slice(0, 8)
      .map(mapDestination);
    return ok(res, "Featured destinations fetched successfully", sorted);
  })
);

destinationsRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = z.coerce.number().int().positive().parse(req.params.id);
    const destination = await prisma.destination.findUnique({
      where: { id },
      include: {
        _count: { select: { tours: true } },
        tours: {
          include: {
            destination: true,
            gallery: { orderBy: { id: "asc" }, take: 4 },
            categories: { include: { category: true } }
          }
        }
      }
    });
    if (!destination) throw new HttpError(404, "Destination not found");
    return ok(res, "Destination fetched successfully", {
      ...mapDestination(destination),
      tours: destination.tours.map((tour) => mapTour(tour))
    });
  })
);

