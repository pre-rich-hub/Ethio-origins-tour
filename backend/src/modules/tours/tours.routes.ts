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
  q: z.string().optional(),
  categoryId: z.coerce.number().int().positive().optional(),
  categorySlug: z.string().optional(),
  destinationId: z.coerce.number().int().positive().optional(),
  destinationSlug: z.string().optional(),
  featured: z.coerce.boolean().optional(),
  priceMin: z.coerce.number().min(0).optional(),
  priceMax: z.coerce.number().min(0).optional(),
  ratingMin: z.coerce.number().min(0).max(5).optional()
});

const blockedDatesQuery = z.object({
  from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional()
});

const includeTourList = {
  destination: true,
  gallery: { orderBy: { id: "asc" as const }, take: 4 },
  categories: { include: { category: true } }
};

const includeTourDetail = {
  destination: true,
  gallery: { orderBy: { id: "asc" as const } },
  categories: { include: { category: true } }
};

toursRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const query = listQuery.parse(req.query);
    const { page, limit, skip, take } = getPagination(query);
    const where: any = {};

    if (query.q) {
      where.OR = [
        { tourName: { contains: query.q } },
        { overview: { contains: query.q } }
      ];
    }

    if (query.destinationId) {
      where.destinationId = query.destinationId;
    } else if (query.destinationSlug) {
      const destination = await prisma.destination.findUnique({
        where: { slug: query.destinationSlug },
        select: { id: true }
      });
      if (destination) {
        where.destinationId = destination.id;
      } else {
        return ok(res, "Tours fetched successfully", { items: [], meta: meta(0, page, limit) });
      }
    }

    if (query.featured !== undefined) {
      where.isFeatured = query.featured;
    }

    if (query.categoryId) {
      where.categories = { some: { categoryId: query.categoryId } };
    } else if (query.categorySlug) {
      const category = await prisma.tourCategory.findFirst({
        where: { categoryName: query.categorySlug },
        select: { id: true }
      });
      if (category) {
        where.categories = { some: { categoryId: category.id } };
      } else {
        return ok(res, "Tours fetched successfully", { items: [], meta: meta(0, page, limit) });
      }
    }

    if (query.priceMin !== undefined || query.priceMax !== undefined) {
      where.adultPrice = {};
      if (query.priceMin !== undefined) where.adultPrice.gte = query.priceMin;
      if (query.priceMax !== undefined) where.adultPrice.lte = query.priceMax;
    }

    if (query.ratingMin !== undefined) {
      where.rating = { gte: query.ratingMin };
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
  "/slug/:slug",
  asyncHandler(async (req, res) => {
    const slug = z.string().parse(req.params.slug);
    const tour = await prisma.tour.findUnique({
      where: { slug },
      include: includeTourDetail
    });
    if (!tour) throw new HttpError(404, "Tour not found");

    const related = tour.destinationId
      ? await prisma.tour.findMany({
          where: { destinationId: tour.destinationId, id: { not: tour.id } },
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

toursRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = z.coerce.number().int().positive().parse(req.params.id);
    const tour = await prisma.tour.findUnique({
      where: { id },
      include: includeTourDetail
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

toursRouter.get(
  "/:id/blocked-dates",
  asyncHandler(async (req, res) => {
    const id = z.coerce.number().int().positive().parse(req.params.id);
    const query = blockedDatesQuery.parse(req.query);

    const tour = await prisma.tour.findUnique({ where: { id }, select: { id: true } });
    if (!tour) throw new HttpError(404, "Tour not found");

    const where: any = { tourId: id };
    if (query.from || query.to) {
      where.date = {};
      if (query.from) where.date.gte = new Date(`${query.from}T00:00:00.000Z`);
      if (query.to) where.date.lte = new Date(`${query.to}T23:59:59.999Z`);
    }

    const blockedDates = await prisma.tourBlockedDate.findMany({
      where,
      orderBy: { date: "asc" },
      select: { date: true, reason: true }
    });

    return ok(res, "Blocked dates fetched successfully", blockedDates.map((bd) => ({
      date: bd.date.toISOString().slice(0, 10),
      reason: bd.reason
    })));
  })
);
