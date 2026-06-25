import { parseJsonArray } from "./parsers.js";

function decimalToNumber(value: unknown): number | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number(value);
  if (typeof value === "object" && "toNumber" in value && typeof value.toNumber === "function") {
    return value.toNumber();
  }
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
}

export function mapCategory(category: any) {
  return {
    id: category.id,
    name: category.categoryName,
    createdAt: category.createdAt ?? null,
    tourCount: category._count?.tours ?? undefined
  };
}

export function mapDestination(destination: any) {
  return {
    id: destination.id,
    name: destination.destinationName,
    description: destination.description,
    imageUrl: destination.imageUrl,
    tourCount: destination._count?.tours ?? undefined,
    canonical: {
      type: "slug",
      id: destination.id,
      suggestedPath: `/destinations/${destination.slug ?? destination.id}`,
      slug: destination.slug ?? null
    }
  };
}

export function mapGalleryImage(image: any) {
  return {
    id: image.id,
    imageUrl: image.imageUrl,
    tourId: image.tourId ?? null
  };
}

export function mapTour(tour: any, detail = false) {
  const gallery = Array.isArray(tour.gallery) ? tour.gallery.map(mapGalleryImage) : [];
  const categories = Array.isArray(tour.categories)
    ? tour.categories.map((item: any) => mapCategory(item.category))
    : [];

  return {
    id: tour.id,
    name: tour.tourName,
    description: tour.overview,
    overview: tour.overview,
    adultPrice: decimalToNumber(tour.adultPrice),
    childPrice: decimalToNumber(tour.childPrice),
    discount: tour.discount,
    rating: decimalToNumber(tour.rating),
    noOfRates: tour.noOfRates,
    isFeatured: Boolean(tour.isFeatured),
    mainImage: gallery[0]?.imageUrl ?? null,
    destination: tour.destination ? mapDestination(tour.destination) : null,
    categories,
    gallery,
    included: detail ? parseJsonArray(tour.included) : undefined,
    excluded: detail ? parseJsonArray(tour.excluded) : undefined,
    itinerary: detail ? parseJsonArray(tour.itinerary) : undefined,
    journeyMap: detail ? tour.journeyMap : undefined,
    createdAt: tour.createdAt ?? null,
    updatedAt: tour.updatedAt ?? null,
    canonical: {
      type: "slug",
      id: tour.id,
      suggestedPath: `/tours/${tour.slug ?? tour.id}`,
      slug: tour.slug ?? null
    }
  };
}

export function mapBlog(post: any) {
  return {
    id: post.id,
    title: post.blogTitle,
    description: post.description,
    imageUrl: post.imageUrl,
    createdAt: post.createdAt ?? null,
    canonical: {
      type: "id",
      id: post.id,
      suggestedPath: `/blog/${post.id}`,
      slug: null
    }
  };
}

export function mapTestimonial(testimonial: any) {
  return {
    id: testimonial.id,
    message: testimonial.message,
    reviewerName: testimonial.reviewerName,
    profession: testimonial.profession
  };
}

export function mapBooking(booking: any) {
  return {
    id: booking.id,
    tourId: booking.tourId,
    tour: booking.tour ? { id: booking.tour.id, name: booking.tour.tourName } : null,
    fullName: booking.fullName,
    email: booking.email,
    phone: booking.phone,
    country: booking.country,
    chosenDate: booking.chosenDate,
    adults: booking.adults,
    children: booking.children,
    status: booking.status ?? "Pending",
    createdAt: booking.createdAt ?? null
  };
}

export function mapContact(contact: any) {
  return {
    id: contact.id,
    name: contact.name,
    email: contact.email,
    message: contact.message,
    createdAt: contact.createdAt ?? null
  };
}
