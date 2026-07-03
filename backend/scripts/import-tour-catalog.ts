import { PrismaClient } from "@prisma/client";
import { tours as catalogTours } from "../../frontend/features/tours/data/tours.ts";
import { tourCategories as catalogCategories } from "../../frontend/features/tours/data/tour-categories.ts";
import { slugify } from "../src/utils/slug.ts";

const prisma = new PrismaClient();
const dryRun = process.argv.includes("--dry-run");
const repairLinks = process.argv.includes("--repair-links");

async function main() {
  const [destinations, initialCategories, existingTours] = await Promise.all([
    prisma.destination.findMany({ select: { id: true, slug: true } }),
    prisma.tourCategory.findMany({ select: { id: true, categoryName: true } }),
    prisma.tour.findMany({
      select: {
        id: true,
        slug: true,
        categories: { select: { categoryId: true } }
      }
    })
  ]);
  const existingCategoryNames = new Set(
    initialCategories.map((item) => item.categoryName.toLowerCase())
  );
  const missingCategories = catalogCategories.filter(
    (category) => !existingCategoryNames.has(category.name.toLowerCase())
  );
  if (!dryRun && missingCategories.length) {
    await prisma.tourCategory.createMany({
      data: missingCategories.map((category) => ({
        categoryName: category.name
      }))
    });
  }
  const categories = dryRun
    ? initialCategories
    : await prisma.tourCategory.findMany({
        select: { id: true, categoryName: true }
      });
  const destinationsBySlug = new Map(destinations.map((item) => [item.slug, item.id]));
  const catalogCategorySlugByName = new Map(
    catalogCategories.map((category) => [category.name.toLowerCase(), category.slug])
  );
  const categoriesBySlug = new Map(categories.map((item) => [
    catalogCategorySlugByName.get(item.categoryName.toLowerCase()) ?? slugify(item.categoryName),
    item.id
  ]));
  const existingBySlug = new Map(existingTours.map((item) => [item.slug, item]));
  let imported = 0;
  let skipped = 0;
  let repaired = 0;

  for (const [index, catalogTour] of catalogTours.entries()) {
    const destinationId = catalogTour.destinationSlugs
      .map((slug) => destinationsBySlug.get(slug))
      .find((id): id is number => id !== undefined);
    if (!destinationId) {
      throw new Error(`No database destination matches ${catalogTour.slug}`);
    }

    const categoryIds = catalogTour.categorySlugs
      .map((slug) => categoriesBySlug.get(slug))
      .filter((id): id is number => id !== undefined);
    const gallery = catalogTour.gallery.length
      ? catalogTour.gallery
      : [catalogTour.image];
    const existingTour = existingBySlug.get(catalogTour.slug);

    if (existingTour) {
      if (
        repairLinks &&
        existingTour.categories.length === 0 &&
        categoryIds.length > 0 &&
        !dryRun
      ) {
        await prisma.tourCategoryJunction.createMany({
          data: categoryIds.map((categoryId) => ({
            tourId: existingTour.id,
            categoryId
          })),
          skipDuplicates: true
        });
        repaired += 1;
      }
      skipped += 1;
      continue;
    }

    if (!dryRun) {
      await prisma.$transaction(async (tx) => {
        const tour = await tx.tour.create({
          data: {
            destinationId,
            slug: catalogTour.slug,
            tourName: catalogTour.title,
            adultPrice: catalogTour.adultPrice,
            childPrice: catalogTour.childPrice,
            rating: catalogTour.rating,
            noOfRates: catalogTour.reviewCount,
            isFeatured: index < 6,
            overview: catalogTour.intro,
            included: JSON.stringify(catalogTour.included),
            excluded: JSON.stringify(catalogTour.excluded),
            itinerary: JSON.stringify(catalogTour.itinerary),
            journeyMap: catalogTour.journeyMap
          }
        });

        await tx.gallery.createMany({
          data: gallery.map((imageUrl) => ({ imageUrl, tourId: tour.id }))
        });

        if (categoryIds.length) {
          await tx.tourCategoryJunction.createMany({
            data: categoryIds.map((categoryId) => ({
              tourId: tour.id,
              categoryId
            })),
            skipDuplicates: true
          });
        }
      });
    }

    imported += 1;
  }

  console.log(JSON.stringify({
    dryRun,
    repairLinks,
    categoriesCreated: missingCategories.length,
    imported,
    repaired,
    skipped,
    total: imported + skipped
  }));
}

main()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
