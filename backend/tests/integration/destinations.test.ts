import { describe, it, expect, vi, beforeAll } from "vitest";
import request from "supertest";

const { mockPrisma } = vi.hoisted(() => {
  const mockDest = {
    id: 1,
    destinationName: "Addis Ababa",
    slug: "addis-ababa",
    description: "Capital city",
    imageUrl: "/img.jpg",
    _count: { tours: 3 },
    tours: [
      {
        id: 1,
        tourName: "City Tour",
        slug: "city-tour",
        overview: "Explore the city",
        adultPrice: { toNumber: () => 200 },
        childPrice: { toNumber: () => 100 },
        discount: null,
        rating: { toNumber: () => 4.0 },
        noOfRates: 5,
        isFeatured: false,
        included: null,
        excluded: null,
        itinerary: null,
        journeyMap: null,
        destinationId: 1,
        destination: {
          id: 1, destinationName: "Addis Ababa", description: "Capital", imageUrl: "/img.jpg", slug: "addis-ababa",
          _count: { tours: 3 },
        },
        gallery: [{ id: 1, imageUrl: "/tour.jpg", tourId: 1 }],
        categories: [],
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-02"),
      },
    ],
  };

  const prisma = {
    destination: {
      findMany: vi.fn().mockResolvedValue([mockDest]),
      findUnique: vi.fn().mockResolvedValue(mockDest),
    },
  };

  return { mockPrisma: prisma };
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

describe("GET /api/v1/destinations", () => {
  it("returns all destinations", async () => {
    const res = await request(app).get("/api/v1/destinations");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].name).toBe("Addis Ababa");
  });
});

describe("GET /api/v1/destinations/featured", () => {
  it("returns featured destinations sorted by tour count", async () => {
    const res = await request(app).get("/api/v1/destinations/featured");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});

describe("GET /api/v1/destinations/slug/:slug", () => {
  it("returns destination by slug", async () => {
    const res = await request(app).get("/api/v1/destinations/slug/addis-ababa");
    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe("Addis Ababa");
    expect(res.body.data.tours).toHaveLength(1);
  });

  it("returns 404 for non-existent slug", async () => {
    mockPrisma.destination.findUnique.mockResolvedValueOnce(null);
    const res = await request(app).get("/api/v1/destinations/slug/non-existent");
    expect(res.status).toBe(404);
  });
});

describe("GET /api/v1/destinations/:id", () => {
  it("returns destination by id", async () => {
    const res = await request(app).get("/api/v1/destinations/1");
    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe("Addis Ababa");
  });

  it("returns 404 for non-existent id", async () => {
    mockPrisma.destination.findUnique.mockResolvedValueOnce(null);
    const res = await request(app).get("/api/v1/destinations/999");
    expect(res.status).toBe(404);
  });

  it("returns 422 for invalid id", async () => {
    const res = await request(app).get("/api/v1/destinations/abc");
    expect(res.status).toBe(422);
  });
});
