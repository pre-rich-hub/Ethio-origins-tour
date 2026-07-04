import { beforeAll, describe, expect, it, vi } from "vitest";
import request from "supertest";

const { mockPrisma, storedMedia, mediaId } = vi.hoisted(() => {
  process.env.STORAGE_DRIVER = "database";
  const id = "8f116010-b7d7-4d99-9218-a9452cfef928";
  const media: { content: Uint8Array; mimeType: string; size: number } = {
    content: new Uint8Array(),
    mimeType: "image/png",
    size: 0
  };

  const prisma = {
    $executeRawUnsafe: vi.fn().mockResolvedValue(0),
    admin: {
      findUnique: vi.fn().mockResolvedValue({ id: 1, email: "admin@test.com", name: "Admin" })
    },
    mediaAsset: {
      create: vi.fn().mockImplementation(async ({ data }: any) => {
        media.content = data.content;
        media.mimeType = data.mimeType;
        media.size = data.size;
        return { id };
      }),
      findUnique: vi.fn().mockImplementation(async () => media),
      delete: vi.fn().mockResolvedValue({})
    },
    tour: {
      findUnique: vi.fn().mockResolvedValue(null),
      create: vi.fn().mockImplementation(async ({ data }: any) => ({
        id: 202,
        ...data,
        destination: {
          id: data.destinationId,
          slug: "database-test-destination",
          destinationName: "Database Test Destination",
          description: null,
          imageUrl: null
        },
        gallery: data.gallery.createMany.data.map((image: { imageUrl: string }, index: number) => ({
          id: index + 1,
          imageUrl: image.imageUrl,
          tourId: 202
        })),
        categories: [],
        createdAt: new Date("2026-07-05T00:00:00.000Z"),
        updatedAt: null
      }))
    }
  };

  return { mockPrisma: prisma, storedMedia: media, mediaId: id };
});

vi.mock("../../src/config/database.js", () => ({ prisma: mockPrisma }));
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

describe("admin tour creation with database image storage", () => {
  it("stores the upload in PostgreSQL, creates the tour, and serves the same bytes", async () => {
    const imageBytes = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
    const token = signAdminToken(1);

    const createResponse = await request(app)
      .post("/api/v1/admin/tours")
      .set("Cookie", `${env.AUTH_COOKIE_NAME}=${token}`)
      .field("tourTitle", "Database Image Tour")
      .field("tourDestination", "42")
      .field("adultPrice", "900")
      .field("tourCategories", "[]")
      .field("tourItinerary", "[]")
      .attach("tourImages", imageBytes, {
        filename: "database-tour.png",
        contentType: "image/png"
      });

    expect(createResponse.status).toBe(201);
    expect(createResponse.body.data).toMatchObject({
      id: 202,
      name: "Database Image Tour",
      mainImage: `/api/v1/media/${mediaId}`
    });
    expect(mockPrisma.$executeRawUnsafe).toHaveBeenCalledOnce();
    expect(mockPrisma.mediaAsset.create).toHaveBeenCalledOnce();
    expect(Buffer.from(storedMedia.content)).toEqual(imageBytes);

    const imageResponse = await request(app).get(`/api/v1/media/${mediaId}`);
    expect(imageResponse.status).toBe(200);
    expect(imageResponse.headers["content-type"]).toBe("image/png");
    expect(imageResponse.body).toEqual(imageBytes);
  });
});
