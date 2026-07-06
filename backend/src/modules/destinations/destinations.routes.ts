import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../config/database.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ok } from "../../utils/api-response.js";
import { HttpError } from "../../middleware/error.middleware.js";
import { mapDestination, mapTour } from "../../utils/mappers.js";

export const destinationsRouter = Router();

const includeDestinationTour = {
  destination: true,
  destinations: { include: { destination: true } },
  gallery: { orderBy: { id: "asc" as const }, take: 4 },
  categories: { include: { category: true } }
};

const includeDestinationDetail = {
  _count: { select: { tours: true, tourLinks: true } },
  tours: { include: includeDestinationTour },
  tourLinks: { include: { tour: { include: includeDestinationTour } } }
};

function destinationTours(destination: any) {
  const tours = [
    ...(Array.isArray(destination.tours) ? destination.tours : []),
    ...(Array.isArray(destination.tourLinks)
      ? destination.tourLinks.map((item: any) => item.tour).filter(Boolean)
      : [])
  ];
  return tours.filter((tour, index, all) =>
    all.findIndex((item) => item.id === tour.id) === index
  );
}

destinationsRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const destinations = await prisma.destination.findMany({
      include: { _count: { select: { tours: true, tourLinks: true } } },
      orderBy: { id: "desc" }
    });
    return ok(res, "Destinations fetched successfully", destinations.map(mapDestination));
  })
);

destinationsRouter.get(
  "/featured",
  asyncHandler(async (_req, res) => {
    const destinations = await prisma.destination.findMany({
      include: { _count: { select: { tours: true, tourLinks: true } } }
    });
    const sorted = destinations
      .sort((a, b) =>
        (b._count.tourLinks ?? b._count.tours) - (a._count.tourLinks ?? a._count.tours)
      )
      .slice(0, 8)
      .map(mapDestination);
    return ok(res, "Featured destinations fetched successfully", sorted);
  })
);

destinationsRouter.get(
  "/slug/:slug",
  asyncHandler(async (req, res) => {
    const slug = z.string().parse(req.params.slug);
    const destination = await prisma.destination.findUnique({
      where: { slug },
      include: includeDestinationDetail
    });
    if (!destination) throw new HttpError(404, "Destination not found");
    const tours = destinationTours(destination);
    return ok(res, "Destination fetched successfully", {
      ...mapDestination(destination),
      tours: tours.map((tour) => mapTour(tour))
    });
  })
);

destinationsRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = z.coerce.number().int().positive().parse(req.params.id);
    const destination = await prisma.destination.findUnique({
      where: { id },
      include: includeDestinationDetail
    });
    if (!destination) throw new HttpError(404, "Destination not found");
    const tours = destinationTours(destination);
    return ok(res, "Destination fetched successfully", {
      ...mapDestination(destination),
      tours: tours.map((tour) => mapTour(tour))
    });
  })
);
