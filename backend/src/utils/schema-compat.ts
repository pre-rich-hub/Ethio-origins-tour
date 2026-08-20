import { Prisma } from "@prisma/client";

let tourDestinationLinksAvailable = true;

export function isMissingTourDestinationJunction(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);

  return (
    message.includes("tour_destination_junction") &&
    (message.includes("does not exist") ||
      (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2021"))
  );
}

export async function withTourDestinationLinksFallback<T>(
  queryWithLinks: () => Promise<T>,
  queryWithoutLinks: () => Promise<T>
): Promise<T> {
  if (!tourDestinationLinksAvailable) return queryWithoutLinks();

  try {
    return await queryWithLinks();
  } catch (error) {
    if (!isMissingTourDestinationJunction(error)) throw error;
    tourDestinationLinksAvailable = false;
    return queryWithoutLinks();
  }
}
