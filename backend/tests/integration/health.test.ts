import { describe, it, expect, vi, beforeAll } from "vitest";
import request from "supertest";

vi.mock("../../src/config/database.js", () => ({
  prisma: {
    $queryRaw: vi.fn().mockRejectedValue(new Error("DB not available")),
  },
}));

vi.mock("../../src/config/redis.js", () => ({
  redis: null,
  checkRedis: vi.fn().mockResolvedValue(false),
}));

import { app } from "../../src/app.js";

describe("GET /health", () => {
  it("returns 200 with healthy status", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe("healthy");
  });
});

describe("GET /ready", () => {
  it("returns 503 when DB is down", async () => {
    const res = await request(app).get("/ready");
    expect(res.status).toBe(503);
    expect(res.body.data.status).toBe("degraded");
    expect(res.body.data.checks.db).toBe(false);
  });
});
