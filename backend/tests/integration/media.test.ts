import express from "express";
import { describe, expect, it, vi } from "vitest";
import request from "supertest";

const { mockPrisma } = vi.hoisted(() => ({
  mockPrisma: {
    mediaAsset: {
      findUnique: vi.fn().mockResolvedValue({
        content: Uint8Array.from([137, 80, 78, 71]),
        mimeType: "image/png",
        size: 4
      })
    }
  }
}));

vi.mock("../../src/config/database.js", () => ({ prisma: mockPrisma }));

import { errorHandler } from "../../src/middleware/error.middleware.js";
import { mediaRouter } from "../../src/modules/media/media.routes.js";

const app = express();
app.use("/api/v1/media", mediaRouter);
app.use(errorHandler);

describe("GET /api/v1/media/:id", () => {
  it("serves database image bytes with immutable image headers", async () => {
    const response = await request(app)
      .get("/api/v1/media/8f116010-b7d7-4d99-9218-a9452cfef928");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toBe("image/png");
    expect(response.headers["cache-control"]).toBe("public, max-age=31536000, immutable");
    expect(response.body).toEqual(Buffer.from([137, 80, 78, 71]));
  });
});
