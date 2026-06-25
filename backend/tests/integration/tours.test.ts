import { describe, it, expect, vi, beforeAll } from "vitest";
import request from "supertest";

const { mockPrisma, mockTour } = vi.hoisted(() => {
  const tour = {
    id: 1,
    tourName: "Historic Tour",
    slug: "historic-tour",
    overview: "A great tour",
    adultPrice: { toNumber: () => 500 },
    childPrice: { toNumber: () => 250 },
    discount: null,
    rating: { toNumber: () => 4.5 },
    noOfRates: 10,
    isFeatured: true,
    included: null,
    excluded: null,
    itinerary: null,
    journeyMap: null,
    destinationId: 1,
    destination: {
      id: 1,
      destinationName: "Addis Ababa",
      description: "Capital",
      imageUrl: "/img.jpg",
      slug: "addis-ababa",
      _count: { tours: 3 },
    },
    gallery: [{ id: 1, imageUrl: "/main.jpg", tourId: 1 }],
    categories: [{ category: { id: 1, categoryName: "Cultural", createdAt: new Date("2024-01-01"), _count: { tours: 1 } } }],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-02"),
    blockedDates: [],
  };

  const prisma = {
    tour: {
      findMany: vi.fn().mockResolvedValue([tour]),
      findUnique: vi.fn().mockResolvedValue(tour),
      count: vi.fn().mockResolvedValue(1),
    },
    destination: {
      findUnique: vi.fn().mockResolvedValue({ id: 1 }),
    },
    tourCategory: {
      findFirst: vi.fn().mockResolvedValue({ id: 1 }),
    },
    tourBlockedDate: {
      findMany: vi.fn().mockResolvedValue([]),
    },
  };

  return { mockPrisma: prisma, mockTour: tour };
});

vi.mock("../../src/config/database.js", () => ({
  prisma: mockPrisma,
}));

vi.mock("../../src/config/redis.js", () => ({
  redis: null,
  checkRedis: vi.fn().mockResolvedValue(false),
}));

import { app, installFinalMiddleware } from "../../src/app.js";
import { registerRoutes } from "../../src/routes.js";

beforeAll(() => {
  registerRoutes(app);
  installFinalMiddleware();
});

describe("GET /api/v1/tours", () => {
  it("returns paginated tours list", async () => {
    const res = await request(app).get("/api/v1/tours");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.items).toHaveLength(1);
    expect(res.body.data.items[0].name).toBe("Historic Tour");
    expect(res.body.data.meta.total).toBe(1);
  });

  it("accepts query params", async () => {
    const res = await request(app).get("/api/v1/tours?q=historic&featured=true");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});

describe("GET /api/v1/tours/featured", () => {
  it("returns featured tours", async () => {
    const res = await request(app).get("/api/v1/tours/featured");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});

describe("GET /api/v1/tours/slug/:slug", () => {
  it("returns tour by slug", async () => {
    const res = await request(app).get("/api/v1/tours/slug/historic-tour");
    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe("Historic Tour");
  });

  it("returns 404 for non-existent slug", async () => {
    mockPrisma.tour.findUnique.mockResolvedValueOnce(null);
    const res = await request(app).get("/api/v1/tours/slug/non-existent");
    expect(res.status).toBe(404);
  });
});

describe("GET /api/v1/tours/:id", () => {
  it("returns tour by id", async () => {
    const res = await request(app).get("/api/v1/tours/1");
    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe("Historic Tour");
  });

  it("returns 404 for non-existent id", async () => {
    mockPrisma.tour.findUnique.mockResolvedValueOnce(null);
    const res = await request(app).get("/api/v1/tours/999");
    expect(res.status).toBe(404);
  });

  it("returns 422 for invalid id", async () => {
    const res = await request(app).get("/api/v1/tours/abc");
    expect(res.status).toBe(422);
  });
});

describe("GET /api/v1/tours/:id/blocked-dates", () => {
  it("returns blocked dates", async () => {
    mockPrisma.tour.findUnique.mockResolvedValue({ id: 1 });
    const res = await request(app).get("/api/v1/tours/1/blocked-dates");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("returns 404 for non-existent tour", async () => {
    mockPrisma.tour.findUnique.mockResolvedValueOnce(null);
    const res = await request(app).get("/api/v1/tours/999/blocked-dates");
    expect(res.status).toBe(404);
  });
});
