import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../config/database.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ok } from "../../utils/api-response.js";
import { HttpError } from "../../middleware/error.middleware.js";
import { requireAdminAuth } from "../../middleware/auth.middleware.js";
import { uploadFor, storedPathForFile } from "../../middleware/upload.middleware.js";
import { parseOptionalJsonArrayString, toBoolean, toNumber } from "../../utils/parsers.js";
import {
  mapBlog,
  mapCategory,
  mapDestination,
  mapGalleryImage,
  mapTestimonial,
  mapTour
} from "../../utils/mappers.js";
import { removeStoredFile } from "../../services/file.service.js";
import { mapBooking, mapContact } from "../../utils/mappers.js";
import { bookingStatusSchema, updateBookingStatus } from "../bookings/bookings.routes.js";
import { sendEmail } from "../../services/email.service.js";
import { slugify } from "../../utils/slug.js";

export const adminRouter = Router();

adminRouter.use(requireAdminAuth);

const idParam = z.coerce.number().int().positive();

function parseCategoryIds(value: unknown): number[] {
  if (Array.isArray(value)) return value.map(Number).filter(Number.isInteger);
  if (typeof value === "string" && value.trim()) {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed.map(Number).filter(Number.isInteger);
    } catch {
      return value.split(",").map(Number).filter(Number.isInteger);
    }
  }
  return [];
}

function parseItinerary(value: unknown): string {
  if (typeof value !== "string" || value.trim() === "") return "[]";
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? JSON.stringify(parsed) : "[]";
  } catch {
    return "[]";
  }
}

const tourUpload = uploadFor("tour");
const destinationUpload = uploadFor("destination");
const blogUpload = uploadFor("blog");
const galleryUpload = uploadFor("gallery");

adminRouter.post(
  "/tours",
  tourUpload.array("tourImages", 20),
  asyncHandler(async (req, res) => {
    const files = (req.files as Express.Multer.File[] | undefined) ?? [];
    const imagePaths = files.map(storedPathForFile).filter((path): path is string => Boolean(path));
    if (imagePaths.length === 0) throw new HttpError(422, "At least one tour image is required");

    const categoryIds = parseCategoryIds(req.body.tourCategories);
    const tourTitle = String(req.body.tourTitle ?? "");
    const slug = slugify(tourTitle);
    const created = await prisma.$transaction(async (tx) => {
      const tour = await tx.tour.create({
        data: {
          destinationId: Number(req.body.tourDestination),
          slug,
          tourName: tourTitle,
          adultPrice: toNumber(req.body.adultPrice) ?? 0,
          childPrice: toNumber(req.body.childPrice) ?? 0,
          discount: req.body.tourDiscount ? String(req.body.tourDiscount) : null,
          rating: toNumber(req.body.tourRating) ?? 0,
          noOfRates: Number(req.body.tourReviews ?? 0),
          isFeatured: toBoolean(req.body.isFeatured),
          overview: String(req.body.tourOverview ?? ""),
          included: parseOptionalJsonArrayString(req.body.tourIncluded),
          excluded: parseOptionalJsonArrayString(req.body.tourExcluded),
          itinerary: parseItinerary(req.body.tourItinerary),
          journeyMap: req.body.tourMap ? String(req.body.tourMap) : null
        }
      });

      await tx.gallery.createMany({
        data: imagePaths.map((imageUrl) => ({ imageUrl, tourId: tour.id }))
      });

      if (categoryIds.length) {
        await tx.tourCategoryJunction.createMany({
          data: categoryIds.map((categoryId) => ({ tourId: tour.id, categoryId })),
          skipDuplicates: true
        });
      }

      return tx.tour.findUnique({
        where: { id: tour.id },
        include: {
          destination: true,
          gallery: { orderBy: { id: "asc" } },
          categories: { include: { category: true } }
        }
      });
    });

    return ok(res, "Tour created successfully", mapTour(created, true), 201);
  })
);

adminRouter.put(
  "/tours/:id",
  tourUpload.array("tourImages", 20),
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const categoryIds = parseCategoryIds(req.body.tourCategories);
    const files = (req.files as Express.Multer.File[] | undefined) ?? [];
    const imagePaths = files.map(storedPathForFile).filter((path): path is string => Boolean(path));
    const tourTitle = String(req.body.tourTitle ?? "");
    const slug = slugify(tourTitle);

    const updated = await prisma.$transaction(async (tx) => {
      await tx.tour.update({
        where: { id },
        data: {
          destinationId: Number(req.body.tourDestination),
          slug,
          tourName: tourTitle,
          adultPrice: toNumber(req.body.adultPrice) ?? 0,
          childPrice: toNumber(req.body.childPrice) ?? 0,
          discount: req.body.tourDiscount ? String(req.body.tourDiscount) : null,
          rating: toNumber(req.body.tourRating) ?? 0,
          noOfRates: Number(req.body.tourReviews ?? 0),
          isFeatured: toBoolean(req.body.isFeatured),
          overview: String(req.body.tourOverview ?? ""),
          included: parseOptionalJsonArrayString(req.body.tourIncluded),
          excluded: parseOptionalJsonArrayString(req.body.tourExcluded),
          itinerary: parseItinerary(req.body.tourItinerary),
          journeyMap: req.body.tourMap ? String(req.body.tourMap) : null
        }
      });

      const deleteImageIds = parseCategoryIds(req.body.deleteImages);
      if (deleteImageIds.length) {
        const deleting = await tx.gallery.findMany({
          where: { id: { in: deleteImageIds }, tourId: id }
        });
        await tx.gallery.deleteMany({ where: { id: { in: deleteImageIds }, tourId: id } });
        await Promise.all(deleting.map((image) => removeStoredFile(image.imageUrl)));
      }

      if (imagePaths.length) {
        await tx.gallery.createMany({
          data: imagePaths.map((imageUrl) => ({ imageUrl, tourId: id }))
        });
      }

      await tx.tourCategoryJunction.deleteMany({ where: { tourId: id } });
      if (categoryIds.length) {
        await tx.tourCategoryJunction.createMany({
          data: categoryIds.map((categoryId) => ({ tourId: id, categoryId })),
          skipDuplicates: true
        });
      }

      return tx.tour.findUnique({
        where: { id },
        include: {
          destination: true,
          gallery: { orderBy: { id: "asc" } },
          categories: { include: { category: true } }
        }
      });
    });

    return ok(res, "Tour updated successfully", mapTour(updated, true));
  })
);

adminRouter.delete(
  "/tours/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    await prisma.$transaction([
      prisma.tourCategoryJunction.deleteMany({ where: { tourId: id } }),
      prisma.gallery.deleteMany({ where: { tourId: id } }),
      prisma.tour.delete({ where: { id } })
    ]);
    return ok(res, "Tour deleted successfully", null);
  })
);

adminRouter.post(
  "/destinations",
  destinationUpload.single("destinationImage"),
  asyncHandler(async (req, res) => {
    const imageUrl = req.file ? storedPathForFile(req.file) : undefined;
    if (!imageUrl) throw new HttpError(422, "Destination image is required");
    const destinationName = String(req.body.destinationName ?? "");
    const slug = slugify(destinationName);
    const destination = await prisma.destination.create({
      data: {
        slug,
        destinationName,
        description: String(req.body.destinationDescription ?? ""),
        imageUrl
      },
      include: { _count: { select: { tours: true } } }
    });
    return ok(res, "Destination created successfully", mapDestination(destination), 201);
  })
);

adminRouter.put(
  "/destinations/:id",
  destinationUpload.single("destinationImage"),
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const imageUrl = req.file ? storedPathForFile(req.file) : undefined;
    const destinationName = String(req.body.destinationName ?? "");
    const slug = slugify(destinationName);
    const destination = await prisma.destination.update({
      where: { id },
      data: {
        slug,
        destinationName,
        description: String(req.body.destinationDescription ?? ""),
        ...(imageUrl ? { imageUrl } : {})
      },
      include: { _count: { select: { tours: true } } }
    });
    return ok(res, "Destination updated successfully", mapDestination(destination));
  })
);

adminRouter.delete(
  "/destinations/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    await prisma.destination.delete({ where: { id } });
    return ok(res, "Destination deleted successfully", null);
  })
);

adminRouter.post(
  "/categories",
  asyncHandler(async (req, res) => {
    const body = z.object({ categoryName: z.string().min(1) }).parse(req.body);
    const category = await prisma.tourCategory.create({
      data: { categoryName: body.categoryName },
      include: { _count: { select: { tours: true } } }
    });
    return ok(res, "Category created successfully", mapCategory(category), 201);
  })
);

adminRouter.put(
  "/categories/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const body = z.object({ categoryName: z.string().min(1) }).parse(req.body);
    const category = await prisma.tourCategory.update({
      where: { id },
      data: { categoryName: body.categoryName },
      include: { _count: { select: { tours: true } } }
    });
    return ok(res, "Category updated successfully", mapCategory(category));
  })
);

adminRouter.delete(
  "/categories/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    await prisma.$transaction([
      prisma.tourCategoryJunction.deleteMany({ where: { categoryId: id } }),
      prisma.tourCategory.delete({ where: { id } })
    ]);
    return ok(res, "Category deleted successfully", null);
  })
);

adminRouter.post(
  "/gallery",
  galleryUpload.single("galleryImage"),
  asyncHandler(async (req, res) => {
    const imageUrl = req.file ? storedPathForFile(req.file) : undefined;
    if (!imageUrl) throw new HttpError(422, "Gallery image is required");
    const tourId = req.body.tourId ? Number(req.body.tourId) : null;
    const image = await prisma.gallery.create({ data: { imageUrl, tourId } });
    return ok(res, "Gallery image created successfully", mapGalleryImage(image), 201);
  })
);

adminRouter.delete(
  "/gallery/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const image = await prisma.gallery.delete({ where: { id } });
    await removeStoredFile(image.imageUrl);
    return ok(res, "Gallery image deleted successfully", null);
  })
);

adminRouter.post(
  "/blog",
  blogUpload.single("blogImage"),
  asyncHandler(async (req, res) => {
    const imageUrl = req.file ? storedPathForFile(req.file) : undefined;
    const blogTitle = String(req.body.blogTitle ?? "");
    const slug = slugify(blogTitle);
    const post = await prisma.blog.create({
      data: {
        slug,
        blogTitle,
        description: String(req.body.blogDescription ?? ""),
        imageUrl,
        categoryId: req.body.categoryId ? Number(req.body.categoryId) : null
      },
      include: { category: true }
    });
    return ok(res, "Blog post created successfully", mapBlog(post), 201);
  })
);

adminRouter.put(
  "/blog/:id",
  blogUpload.single("blogImage"),
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const imageUrl = req.file ? storedPathForFile(req.file) : undefined;
    const blogTitle = String(req.body.blogTitle ?? "");
    const slug = slugify(blogTitle);
    const post = await prisma.blog.update({
      where: { id },
      data: {
        slug,
        blogTitle,
        description: String(req.body.blogDescription ?? ""),
        categoryId: req.body.categoryId ? Number(req.body.categoryId) : null,
        ...(imageUrl ? { imageUrl } : {})
      },
      include: { category: true }
    });
    return ok(res, "Blog post updated successfully", mapBlog(post));
  })
);

adminRouter.delete(
  "/blog/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    await prisma.blog.delete({ where: { id } });
    return ok(res, "Blog post deleted successfully", null);
  })
);

adminRouter.get(
  "/blog-categories",
  asyncHandler(async (_req, res) => {
    const categories = await prisma.blogCategory.findMany({
      include: { _count: { select: { posts: true } } },
      orderBy: { id: "asc" }
    });
    return ok(res, "Blog categories fetched successfully", categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      postCount: cat._count.posts
    })));
  })
);

adminRouter.post(
  "/blog-categories",
  asyncHandler(async (req, res) => {
    const body = z.object({ name: z.string().min(1) }).parse(req.body);
    const slug = slugify(body.name);
    const category = await prisma.blogCategory.create({
      data: { name: body.name, slug },
      include: { _count: { select: { posts: true } } }
    });
    return ok(res, "Blog category created successfully", {
      id: category.id,
      name: category.name,
      slug: category.slug,
      postCount: category._count.posts
    }, 201);
  })
);

adminRouter.put(
  "/blog-categories/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const body = z.object({ name: z.string().min(1) }).parse(req.body);
    const slug = slugify(body.name);
    const category = await prisma.blogCategory.update({
      where: { id },
      data: { name: body.name, slug },
      include: { _count: { select: { posts: true } } }
    });
    return ok(res, "Blog category updated successfully", {
      id: category.id,
      name: category.name,
      slug: category.slug,
      postCount: category._count.posts
    });
  })
);

adminRouter.delete(
  "/blog-categories/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    await prisma.blogCategory.delete({ where: { id } });
    return ok(res, "Blog category deleted successfully", null);
  })
);

adminRouter.post(
  "/testimonials",
  asyncHandler(async (req, res) => {
    const body = z
      .object({
        message: z.string().min(1),
        reviewerName: z.string().min(1),
        profession: z.string().optional()
      })
      .parse(req.body);
    const testimonial = await prisma.testimonial.create({ data: body });
    return ok(res, "Testimonial created successfully", mapTestimonial(testimonial), 201);
  })
);

adminRouter.put(
  "/testimonials/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const body = z
      .object({
        message: z.string().min(1),
        reviewerName: z.string().min(1),
        profession: z.string().optional()
      })
      .parse(req.body);
    const testimonial = await prisma.testimonial.update({ where: { id }, data: body });
    return ok(res, "Testimonial updated successfully", mapTestimonial(testimonial));
  })
);

adminRouter.delete(
  "/testimonials/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    await prisma.testimonial.delete({ where: { id } });
    return ok(res, "Testimonial deleted successfully", null);
  })
);

adminRouter.get(
  "/bookings",
  asyncHandler(async (_req, res) => {
    const bookings = await prisma.booking.findMany({
      include: { tour: true },
      orderBy: { createdAt: "desc" }
    });
    return ok(res, "Bookings fetched successfully", bookings.map(mapBooking));
  })
);

adminRouter.get(
  "/bookings/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: { tour: true }
    });
    if (!booking) throw new HttpError(404, "Booking not found");
    return ok(res, "Booking fetched successfully", mapBooking(booking));
  })
);

adminRouter.put(
  "/bookings/:id/status",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const { status } = bookingStatusSchema.parse(req.body);
    const booking = await updateBookingStatus(id, status);
    return ok(res, "Booking status updated successfully", mapBooking(booking));
  })
);

adminRouter.delete(
  "/bookings/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    await prisma.booking.delete({ where: { id } });
    return ok(res, "Booking deleted successfully", null);
  })
);

adminRouter.get(
  "/contacts",
  asyncHandler(async (_req, res) => {
    const contacts = await prisma.contact.findMany({ orderBy: { id: "desc" } });
    return ok(res, "Contacts fetched successfully", contacts.map(mapContact));
  })
);

adminRouter.get(
  "/contacts/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const contact = await prisma.contact.findUnique({ where: { id } });
    if (!contact) throw new HttpError(404, "Contact not found");
    return ok(res, "Contact fetched successfully", mapContact(contact));
  })
);

adminRouter.post(
  "/contacts/:id/reply",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const body = z.object({ subject: z.string().min(1), message: z.string().min(1) }).parse(req.body);
    const contact = await prisma.contact.findUnique({ where: { id } });
    if (!contact) throw new HttpError(404, "Contact not found");

    await sendEmail({
      to: contact.email,
      subject: body.subject,
      html: `
        <p>Dear ${contact.name},</p>
        <p>${body.message.replace(/\n/g, "<br>")}</p>
        <p>Best regards,<br>Ethio Origins Tour Team</p>
      `
    });

    return ok(res, "Reply sent successfully", null);
  })
);

adminRouter.delete(
  "/contacts/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    await prisma.contact.delete({ where: { id } });
    return ok(res, "Contact deleted successfully", null);
  })
);

adminRouter.get(
  "/dashboard/stats",
  asyncHandler(async (_req, res) => {
    const [totalTours, totalDestinations, totalBookings, totalGalleryImages, totalContacts, recentBookings] =
      await Promise.all([
        prisma.tour.count(),
        prisma.destination.count(),
        prisma.booking.count(),
        prisma.gallery.count(),
        prisma.contact.count(),
        prisma.booking.findMany({
          include: { tour: true },
          orderBy: { createdAt: "desc" },
          take: 5
        })
      ]);

    return ok(res, "Dashboard stats fetched successfully", {
      totals: {
        tours: totalTours,
        destinations: totalDestinations,
        bookings: totalBookings,
        galleryImages: totalGalleryImages,
        contacts: totalContacts
      },
      recentBookings: recentBookings.map(mapBooking)
    });
  })
);

const blockedDateSchema = z.object({
  dates: z.array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).min(1),
  reason: z.string().optional()
});

adminRouter.get(
  "/tours/:id/blocked-dates",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const tour = await prisma.tour.findUnique({ where: { id }, select: { id: true } });
    if (!tour) throw new HttpError(404, "Tour not found");

    const blockedDates = await prisma.tourBlockedDate.findMany({
      where: { tourId: id },
      orderBy: { date: "asc" }
    });

    return ok(res, "Blocked dates fetched successfully", blockedDates.map((bd) => ({
      id: bd.id,
      date: bd.date.toISOString().slice(0, 10),
      reason: bd.reason
    })));
  })
);

adminRouter.post(
  "/tours/:id/blocked-dates",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const body = blockedDateSchema.parse(req.body);

    const tour = await prisma.tour.findUnique({ where: { id }, select: { id: true } });
    if (!tour) throw new HttpError(404, "Tour not found");

    const created = await prisma.tourBlockedDate.createMany({
      data: body.dates.map((date) => ({
        tourId: id,
        date: new Date(`${date}T00:00:00.000Z`),
        reason: body.reason
      })),
      skipDuplicates: true
    });

    return ok(res, `${created.count} blocked dates created successfully`, { count: created.count }, 201);
  })
);

adminRouter.delete(
  "/tours/:id/blocked-dates/:blockedDateId",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const blockedDateId = idParam.parse(req.params.blockedDateId);

    const blockedDate = await prisma.tourBlockedDate.findFirst({
      where: { id: blockedDateId, tourId: id }
    });
    if (!blockedDate) throw new HttpError(404, "Blocked date not found");

    await prisma.tourBlockedDate.delete({ where: { id: blockedDateId } });
    return ok(res, "Blocked date deleted successfully", null);
  })
);
