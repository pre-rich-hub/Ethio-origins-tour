import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../config/database.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ok } from "../../utils/api-response.js";
import { HttpError } from "../../middleware/error.middleware.js";
import { getPagination, meta } from "../../utils/pagination.js";
import { mapTour } from "../../utils/mappers.js";

export const toursRouter = Router();

const listQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  categoryId: z.coerce.number().int().positive().optional(),
  destinationId: z.coerce.number().int().positive().optional(),
  featured: z.coerce.boolean().optional()
});

const includeTourList = {
  destination: true,
  gallery: { orderBy: { id: "asc" as const }, take: 4 },
  categories: { include: { category: true } }
};

toursRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const query = listQuery.parse(req.query);
    const { page, limit, skip, take } = getPagination(query);
    const where: any = {};
    if (query.destinationId) where.destinationId = query.destinationId;
    if (query.featured !== undefined) where.isFeatured = query.featured;
    if (query.categoryId) {
      where.categories = { some: { categoryId: query.categoryId } };
    }

    const [items, total] = await Promise.all([
      prisma.tour.findMany({
        where,
        include: includeTourList,
        orderBy: [{ isFeatured: "desc" }, { rating: "desc" }, { id: "desc" }],
        skip,
        take
      }),
      prisma.tour.count({ where })
    ]);

    return ok(res, "Tours fetched successfully", {
      items: items.map((tour) => mapTour(tour)),
      meta: meta(total, page, limit)
    });
  })
);

toursRouter.get(
  "/featured",
  asyncHandler(async (_req, res) => {
    const tours = await prisma.tour.findMany({
      where: { isFeatured: true },
      include: includeTourList,
      orderBy: [{ rating: "desc" }, { id: "desc" }],
      take: 12
    });
    return ok(res, "Featured tours fetched successfully", tours.map((tour) => mapTour(tour)));
  })
);

toursRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = z.coerce.number().int().positive().parse(req.params.id);
    const tour = await prisma.tour.findUnique({
      where: { id },
      include: {
        destination: true,
        gallery: { orderBy: { id: "asc" } },
        categories: { include: { category: true } }
      }
    });
    if (!tour) throw new HttpError(404, "Tour not found");

    const related = tour.destinationId
      ? await prisma.tour.findMany({
          where: { destinationId: tour.destinationId, id: { not: id } },
          include: includeTourList,
          orderBy: [{ isFeatured: "desc" }, { rating: "desc" }, { id: "desc" }],
          take: 6
        })
      : [];

    return ok(res, "Tour fetched successfully", {
      ...mapTour(tour, true),
      relatedTours: related.map((item) => mapTour(item))
    });
  })
);

