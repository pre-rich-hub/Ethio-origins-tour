import { beforeAll, describe, expect, it, vi } from "vitest";
import request from "supertest";

const { mockPrisma, mockStorage } = vi.hoisted(() => {
  const storage = {
    save: vi.fn().mockResolvedValue({
      storedPath: "tour/test-tour.png",
      url: "https://media.example.com/tour/test-tour.png"
    }),
    delete: vi.fn().mockResolvedValue(undefined),
    getUrl: vi.fn()
  };

  const prisma = {
    admin: {
      findUnique: vi.fn().mockResolvedValue({ id: 1, email: "admin@test.com", name: "Admin" })
    },
    tour: {
      findUnique: vi.fn().mockResolvedValue(null),
      create: vi.fn().mockImplementation(async ({ data }: any) => ({
        id: 101,
        ...data,
        destinationId: data.destinationId,
        destination: {
          id: data.destinationId,
          slug: "test-destination",
          destinationName: "Test Destination",
          description: "Test destination",
          imageUrl: null
        },
        gallery: data.gallery.createMany.data.map((image: { imageUrl: string }, index: number) => ({
          id: index + 1,
          imageUrl: image.imageUrl,
          tourId: 101
        })),
        categories: (data.categories?.createMany.data ?? []).map(({ categoryId }: { categoryId: number }) => ({
          category: { id: categoryId, categoryName: "Cultural", createdAt: null }
        })),
        createdAt: new Date("2026-07-04T00:00:00.000Z"),
        updatedAt: null
      }))
    }
  };

  return { mockPrisma: prisma, mockStorage: storage };
});

vi.mock("../../src/config/database.js", () => ({ prisma: mockPrisma }));
vi.mock("../../src/services/storage/index.js", () => ({
  getStorageProvider: vi.fn().mockResolvedValue(mockStorage)
}));
vi.mock("../../src/config/redis.js", () => ({
  redis: null,
  checkRedis: vi.fn().mockResolvedValue(false)
}));

import { app, installFinalMiddleware } from "../../src/app.js";
import { env } from "../../src/config/env.js";
import { signAdminToken } from "../../src/middleware/auth.middleware.js";
import { registerRoutes } from "../../src/routes.js";

beforeAll(() => {
  registerRoutes(app);
  installFinalMiddleware();
});

describe("POST /api/v1/admin/tours", () => {
  it("creates a tour from the admin multipart form with its image and relations", async () => {
    const token = signAdminToken(1);
    const response = await request(app)
      .post("/api/v1/admin/tours")
      .set("Cookie", `${env.AUTH_COOKIE_NAME}=${token}`)
      .field("tourTitle", "Admin Form Tour")
      .field("tourDestination", "42")
      .field("tourDestinations", "[42,43]")
      .field("adultPrice", "1250")
      .field("childPrice", "650")
      .field("tourRating", "4.8")
      .field("isFeatured", "true")
      .field("tourOverview", "Created through the real multipart endpoint")
      .field("tourCategories", "[5]")
      .field("tourIncluded", '["Guide"]')
      .field("tourExcluded", '["Flights"]')
      .field("tourItinerary", '[{"day":1,"title":"Arrival"}]')
      .field("tourReviews", "0")
      .attach("tourImages", Buffer.from("test image"), {
        filename: "tour.png",
        contentType: "image/png"
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toMatchObject({
      id: 101,
      name: "Admin Form Tour",
      adultPrice: 1250,
      childPrice: 650,
      isFeatured: true,
      mainImage: "https://media.example.com/tour/test-tour.png",
      destination: { id: 42, name: "Test Destination" }
    });
    expect(mockStorage.save).toHaveBeenCalledOnce();
    expect(mockPrisma.tour.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        destinationId: 42,
        tourName: "Admin Form Tour",
        destinations: {
          createMany: {
            data: [{ destinationId: 42 }, { destinationId: 43 }],
            skipDuplicates: true
          }
        },
        gallery: {
          createMany: {
            data: [{ imageUrl: "https://media.example.com/tour/test-tour.png" }]
          }
        },
        categories: {
          createMany: {
            data: [{ categoryId: 5 }],
            skipDuplicates: true
          }
        }
      })
    }));
  });
});
