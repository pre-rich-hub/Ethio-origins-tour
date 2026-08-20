import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

const { mockPrisma, mockStorage } = vi.hoisted(() => {
  const storage = {
    save: vi.fn().mockResolvedValue({
      storedPath: "destination/test-destination.png",
      url: "https://media.example.com/destination/test-destination.png"
    }),
    delete: vi.fn().mockResolvedValue(undefined),
    getUrl: vi.fn()
  };

  const prisma = {
    admin: {
      findUnique: vi.fn().mockResolvedValue({ id: 1, email: "admin@test.com", name: "Admin" })
    },
    destination: {
      create: vi.fn().mockImplementation(async ({ data }: any) => ({
        id: 202,
        ...data,
        _count: { tours: 0, tourLinks: 0 }
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

beforeEach(() => {
  vi.clearAllMocks();
  mockStorage.save.mockResolvedValue({
    storedPath: "destination/test-destination.png",
    url: "https://media.example.com/destination/test-destination.png"
  });
});

describe("POST /api/v1/admin/destinations", () => {
  it("creates a destination from the admin multipart form with its image", async () => {
    const token = signAdminToken(1);
    const response = await request(app)
      .post("/api/v1/admin/destinations")
      .set("Cookie", `${env.AUTH_COOKIE_NAME}=${token}`)
      .field("destinationName", "Admin Form Destination")
      .field("destinationDescription", "Created through the real destination multipart endpoint")
      .attach("destinationImage", Buffer.from("test image"), {
        filename: "destination.png",
        contentType: "image/png"
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toMatchObject({
      id: 202,
      name: "Admin Form Destination",
      description: "Created through the real destination multipart endpoint",
      imageUrl: "https://media.example.com/destination/test-destination.png",
      canonical: {
        suggestedPath: "/destinations/admin-form-destination",
        slug: "admin-form-destination"
      }
    });
    expect(mockStorage.save).toHaveBeenCalledOnce();
    expect(mockPrisma.destination.create).toHaveBeenCalledWith(expect.objectContaining({
      data: {
        slug: "admin-form-destination",
        destinationName: "Admin Form Destination",
        description: "Created through the real destination multipart endpoint",
        imageUrl: "https://media.example.com/destination/test-destination.png"
      }
    }));
  });

  it("returns a clear storage error when the destination image cannot be saved", async () => {
    mockStorage.save.mockRejectedValueOnce(new Error("storage unavailable"));
    const token = signAdminToken(1);
    const response = await request(app)
      .post("/api/v1/admin/destinations")
      .set("Cookie", `${env.AUTH_COOKIE_NAME}=${token}`)
      .field("destinationName", "Storage Failure Destination")
      .field("destinationDescription", "This should not be created")
      .attach("destinationImage", Buffer.from("test image"), {
        filename: "destination.png",
        contentType: "image/png"
      });

    expect(response.status).toBe(503);
    expect(response.body).toMatchObject({
      success: false,
      message: "The image could not be stored. Check the persistent media storage configuration"
    });
    expect(mockPrisma.destination.create).not.toHaveBeenCalled();
  });
});
