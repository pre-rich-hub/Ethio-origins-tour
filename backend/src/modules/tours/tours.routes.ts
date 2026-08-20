import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../config/database.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ok } from "../../utils/api-response.js";
import { HttpError } from "../../middleware/error.middleware.js";
import { getPagination, meta } from "../../utils/pagination.js";
import { mapTour } from "../../utils/mappers.js";
import { withTourDestinationLinksFallback } from "../../utils/schema-compat.js";

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

function includeTourList(includeDestinationLinks: boolean) {
  return {
    destination: true,
    ...(includeDestinationLinks
      ? { destinations: { include: { destination: true } } }
      : {}),
    gallery: { orderBy: { id: "asc" as const }, take: 4 },
    categories: { include: { category: true } }
  };
}

function includeTourDetail(includeDestinationLinks: boolean) {
  return {
    destination: true,
    ...(includeDestinationLinks
      ? { destinations: { include: { destination: true } } }
      : {}),
    gallery: { orderBy: { id: "asc" as const } },
    categories: { include: { category: true } }
  };
}

function destinationWhere(destinationId: number, includeDestinationLinks: boolean) {
  return includeDestinationLinks
    ? {
        OR: [
          { destinationId },
          { destinations: { some: { destinationId } } }
        ]
      }
    : { destinationId };
}

function relatedDestinationWhere(destinationIds: number[], includeDestinationLinks: boolean) {
  return includeDestinationLinks
    ? {
        OR: [
          { destinationId: { in: destinationIds } },
          { destinations: { some: { destinationId: { in: destinationIds } } } }
        ]
      }
    : { destinationId: { in: destinationIds } };
}

toursRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const query = listQuery.parse(req.query);
    const { page, limit, skip, take } = getPagination(query);
    const baseWhere: any = {};
    let selectedDestinationId: number | undefined;

    if (query.q) {
      baseWhere.OR = [
        { tourName: { contains: query.q } },
        { overview: { contains: query.q } }
      ];
    }

    if (query.destinationId) {
      selectedDestinationId = query.destinationId;
    } else if (query.destinationSlug) {
      const destination = await prisma.destination.findUnique({
        where: { slug: query.destinationSlug },
        select: { id: true }
      });
      if (destination) {
        selectedDestinationId = destination.id;
      } else {
        return ok(res, "Tours fetched successfully", { items: [], meta: meta(0, page, limit) });
      }
    }

    if (query.featured !== undefined) {
      baseWhere.isFeatured = query.featured;
    }

    if (query.categoryId) {
      baseWhere.categories = { some: { categoryId: query.categoryId } };
    } else if (query.categorySlug) {
      const category = await prisma.tourCategory.findFirst({
        where: { categoryName: query.categorySlug },
        select: { id: true }
      });
      if (category) {
        baseWhere.categories = { some: { categoryId: category.id } };
      } else {
        return ok(res, "Tours fetched successfully", { items: [], meta: meta(0, page, limit) });
      }
    }

    if (query.priceMin !== undefined || query.priceMax !== undefined) {
      baseWhere.adultPrice = {};
      if (query.priceMin !== undefined) baseWhere.adultPrice.gte = query.priceMin;
      if (query.priceMax !== undefined) baseWhere.adultPrice.lte = query.priceMax;
    }

    if (query.ratingMin !== undefined) {
      baseWhere.rating = { gte: query.ratingMin };
    }

    const buildWhere = (includeDestinationLinks: boolean) => ({
      ...baseWhere,
      ...(selectedDestinationId
        ? {
            AND: [
              ...(Array.isArray(baseWhere.AND) ? baseWhere.AND : []),
              destinationWhere(selectedDestinationId, includeDestinationLinks)
            ]
          }
        : {})
    });

    const [items, total] = await withTourDestinationLinksFallback(
      () => Promise.all([
        prisma.tour.findMany({
          where: buildWhere(true),
          include: includeTourList(true),
          orderBy: [{ isFeatured: "desc" }, { rating: "desc" }, { id: "desc" }],
          skip,
          take
        }),
        prisma.tour.count({ where: buildWhere(true) })
      ]),
      () => Promise.all([
        prisma.tour.findMany({
          where: buildWhere(false),
          include: includeTourList(false),
          orderBy: [{ isFeatured: "desc" }, { rating: "desc" }, { id: "desc" }],
          skip,
          take
        }),
        prisma.tour.count({ where: buildWhere(false) })
      ])
    );

    return ok(res, "Tours fetched successfully", {
      items: items.map((tour) => mapTour(tour)),
      meta: meta(total, page, limit)
    });
  })
);

toursRouter.get(
  "/featured",
  asyncHandler(async (_req, res) => {
    const tours = await withTourDestinationLinksFallback(
      () => prisma.tour.findMany({
        where: { isFeatured: true },
        include: includeTourList(true),
        orderBy: [{ rating: "desc" }, { id: "desc" }],
        take: 12
      }),
      () => prisma.tour.findMany({
        where: { isFeatured: true },
        include: includeTourList(false),
        orderBy: [{ rating: "desc" }, { id: "desc" }],
        take: 12
      })
    );
    return ok(res, "Featured tours fetched successfully", tours.map((tour) => mapTour(tour)));
  })
);

toursRouter.get(
  "/slug/:slug",
  asyncHandler(async (req, res) => {
    const slug = z.string().parse(req.params.slug);
    const tour = await withTourDestinationLinksFallback(
      () => prisma.tour.findUnique({
        where: { slug },
        include: includeTourDetail(true)
      }),
      () => prisma.tour.findUnique({
        where: { slug },
        include: includeTourDetail(false)
      })
    );
    if (!tour) throw new HttpError(404, "Tour not found");

    const destinationIds = [...new Set([
      ...(tour.destinationId ? [tour.destinationId] : []),
      ...(Array.isArray(tour.destinations)
        ? tour.destinations.map((item) => item.destinationId)
        : [])
    ])];
    const related = destinationIds.length
      ? await withTourDestinationLinksFallback(
          () => prisma.tour.findMany({
            where: {
              id: { not: tour.id },
              ...relatedDestinationWhere(destinationIds, true)
            },
            include: includeTourList(true),
            orderBy: [{ isFeatured: "desc" }, { rating: "desc" }, { id: "desc" }],
            take: 6
          }),
          () => prisma.tour.findMany({
            where: {
              id: { not: tour.id },
              ...relatedDestinationWhere(destinationIds, false)
            },
            include: includeTourList(false),
            orderBy: [{ isFeatured: "desc" }, { rating: "desc" }, { id: "desc" }],
            take: 6
          })
        )
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
    const tour = await withTourDestinationLinksFallback(
      () => prisma.tour.findUnique({
        where: { id },
        include: includeTourDetail(true)
      }),
      () => prisma.tour.findUnique({
        where: { id },
        include: includeTourDetail(false)
      })
    );
    if (!tour) throw new HttpError(404, "Tour not found");

    const destinationIds = [...new Set([
      ...(tour.destinationId ? [tour.destinationId] : []),
      ...(Array.isArray(tour.destinations)
        ? tour.destinations.map((item) => item.destinationId)
        : [])
    ])];
    const related = destinationIds.length
      ? await withTourDestinationLinksFallback(
          () => prisma.tour.findMany({
            where: {
              id: { not: id },
              ...relatedDestinationWhere(destinationIds, true)
            },
            include: includeTourList(true),
            orderBy: [{ isFeatured: "desc" }, { rating: "desc" }, { id: "desc" }],
            take: 6
          }),
          () => prisma.tour.findMany({
            where: {
              id: { not: id },
              ...relatedDestinationWhere(destinationIds, false)
            },
            include: includeTourList(false),
            orderBy: [{ isFeatured: "desc" }, { rating: "desc" }, { id: "desc" }],
            take: 6
          })
        )
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
