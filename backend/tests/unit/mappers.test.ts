import { describe, it, expect } from "vitest";
import {
  mapCategory,
  mapDestination,
  mapTour,
  mapBlog,
  mapTestimonial,
  mapBooking,
  mapContact,
} from "../../src/utils/mappers.js";

describe("mapCategory", () => {
  it("returns mapped category", () => {
    const result = mapCategory({
      id: 1,
      categoryName: "Cultural",
      createdAt: new Date("2024-01-01"),
      _count: { tours: 3 },
    });
    expect(result).toEqual({
      id: 1,
      name: "Cultural",
      createdAt: expect.any(Date),
      tourCount: 3,
    });
  });
});

describe("mapDestination", () => {
  it("returns mapped destination with slug canonical", () => {
    const result = mapDestination({
      id: 1,
      destinationName: "Addis Ababa",
      description: "Capital city",
      imageUrl: "/img.jpg",
      slug: "addis-ababa",
      _count: { tours: 5 },
    });
    expect(result).toEqual({
      id: 1,
      name: "Addis Ababa",
      description: "Capital city",
      imageUrl: "/img.jpg",
      tourCount: 5,
      canonical: {
        type: "slug",
        id: 1,
        suggestedPath: "/destinations/addis-ababa",
        slug: "addis-ababa",
      },
    });
  });

  it("uses id when slug is null", () => {
    const result = mapDestination({
      id: 1,
      destinationName: "Test",
      description: null,
      imageUrl: null,
      slug: null,
    });
    expect(result.canonical.suggestedPath).toBe("/destinations/1");
    expect(result.canonical.slug).toBeNull();
  });
});

describe("mapTour", () => {
  const baseTour = {
    id: 1,
    tourName: "Historic Tour",
    overview: "A great tour",
    adultPrice: 500,
    childPrice: 250,
    discount: null,
    rating: 4.5,
    noOfRates: 10,
    isFeatured: true,
    included: null,
    excluded: null,
    itinerary: null,
    journeyMap: null,
    slug: "historic-tour",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-02"),
    destination: null,
    categories: [],
    gallery: [],
  };

  it("returns mapped tour (non-detail)", () => {
    const result = mapTour(baseTour);
    expect(result.id).toBe(1);
    expect(result.name).toBe("Historic Tour");
    expect(result.adultPrice).toBe(500);
    expect(result.childPrice).toBe(250);
    expect(result.isFeatured).toBe(true);
    expect(result.included).toBeUndefined();
    expect(result.itinerary).toBeUndefined();
  });

  it("returns mapped tour (detail) with arrays", () => {
    const tour = {
      ...baseTour,
      included: '["Hotel"]',
      excluded: '["Flights"]',
      itinerary: '[{"day":1,"title":"Arrival"}]',
    };
    const result = mapTour(tour, true);
    expect(result.included).toEqual(["Hotel"]);
    expect(result.excluded).toEqual(["Flights"]);
    expect(result.itinerary).toEqual([{ day: 1, title: "Arrival" }]);
  });

  it("returns mainImage from gallery", () => {
    const tour = {
      ...baseTour,
      gallery: [{ id: 1, imageUrl: "/main.jpg", tourId: 1 }],
    };
    const result = mapTour(tour);
    expect(result.mainImage).toBe("/main.jpg");
  });

  it("returns null mainImage when gallery is empty", () => {
    const result = mapTour(baseTour);
    expect(result.mainImage).toBeNull();
  });
});

describe("mapBlog", () => {
  it("returns mapped blog with category", () => {
    const result = mapBlog({
      id: 1,
      slug: "my-post",
      blogTitle: "My Post",
      description: "Description",
      imageUrl: "/img.jpg",
      category: { id: 1, name: "News", slug: "news" },
      createdAt: new Date("2024-01-01"),
    });
    expect(result).toEqual({
      id: 1,
      slug: "my-post",
      title: "My Post",
      description: "Description",
      imageUrl: "/img.jpg",
      category: { id: 1, name: "News", slug: "news" },
      createdAt: expect.any(Date),
      canonical: {
        type: "slug",
        id: 1,
        suggestedPath: "/blog/my-post",
        slug: "my-post",
      },
    });
  });

  it("returns null category when missing", () => {
    const result = mapBlog({
      id: 1,
      slug: "my-post",
      blogTitle: "My Post",
      description: null,
      imageUrl: null,
      category: null,
      createdAt: null,
    });
    expect(result.category).toBeNull();
  });
});

describe("mapTestimonial", () => {
  it("returns mapped testimonial", () => {
    const result = mapTestimonial({
      id: 1,
      message: "Great tour!",
      reviewerName: "John",
      profession: "Engineer",
    });
    expect(result).toEqual({
      id: 1,
      message: "Great tour!",
      reviewerName: "John",
      profession: "Engineer",
    });
  });
});

describe("mapBooking", () => {
  it("returns mapped booking", () => {
    const result = mapBooking({
      id: 1,
      tourId: 1,
      tour: { id: 1, tourName: "Historic Tour" },
      fullName: "John",
      email: "john@test.com",
      phone: "123",
      country: "Ethiopia",
      chosenDate: new Date("2024-06-01"),
      adults: 2,
      children: 1,
      status: "Confirmed",
      createdAt: new Date("2024-01-01"),
    });
    expect(result.id).toBe(1);
    expect(result.tour).toEqual({ id: 1, name: "Historic Tour" });
    expect(result.fullName).toBe("John");
    expect(result.status).toBe("Confirmed");
  });

  it("returns null tour when missing", () => {
    const result = mapBooking({
      id: 1,
      tourId: null,
      tour: null,
      fullName: "John",
      email: "john@test.com",
      phone: "123",
      country: "Ethiopia",
      chosenDate: null,
      adults: 2,
      children: 0,
      status: "Pending",
      createdAt: null,
    });
    expect(result.tour).toBeNull();
  });
});

describe("mapContact", () => {
  it("returns mapped contact", () => {
    const result = mapContact({
      id: 1,
      name: "John",
      email: "john@test.com",
      message: "Hello",
      createdAt: new Date("2024-01-01"),
    });
    expect(result).toEqual({
      id: 1,
      name: "John",
      email: "john@test.com",
      message: "Hello",
      createdAt: expect.any(Date),
    });
  });
});
