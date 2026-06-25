import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function main() {
  console.log("Starting slug backfill...");

  // Backfill Tour slugs
  const tours = await prisma.tour.findMany();
  let tourUpdated = 0;
  for (const tour of tours) {
    const slug = slugify(tour.tourName);
    if (tour.slug !== slug) {
      await prisma.tour.update({
        where: { id: tour.id },
        data: { slug }
      });
      tourUpdated++;
    }
  }
  console.log(`Tours: ${tourUpdated} updated out of ${tours.length}`);

  // Backfill Destination slugs
  const destinations = await prisma.destination.findMany();
  let destUpdated = 0;
  for (const dest of destinations) {
    const slug = slugify(dest.destinationName);
    if (dest.slug !== slug) {
      await prisma.destination.update({
        where: { id: dest.id },
        data: { slug }
      });
      destUpdated++;
    }
  }
  console.log(`Destinations: ${destUpdated} updated out of ${destinations.length}`);

  console.log("Slug backfill completed!");
}

main()
  .catch((e) => {
    console.error("Backfill failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });