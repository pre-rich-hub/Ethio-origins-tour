import { describe, it, expect, vi } from "vitest";
import { ok, fail } from "../../src/utils/api-response.js";

function mockRes() {
  return {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  } as any;
}

describe("ok", () => {
  it("returns success response with defaults", () => {
    const res = mockRes();
    ok(res, "OK", { id: 1 });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "OK",
      data: { id: 1 },
    });
  });

  it("uses custom status code", () => {
    const res = mockRes();
    ok(res, "Created", { id: 1 }, 201);
    expect(res.status).toHaveBeenCalledWith(201);
  });
});

describe("fail", () => {
  it("returns error response with defaults", () => {
    const res = mockRes();
    fail(res, "Bad request");
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Bad request",
      errors: [],
    });
  });

  it("includes validation errors", () => {
    const res = mockRes();
    fail(res, "Validation failed", [
      { path: "name", message: "Name is required" },
    ]);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Validation failed",
      errors: [{ path: "name", message: "Name is required" }],
    });
  });

  it("uses custom status code", () => {
    const res = mockRes();
    fail(res, "Not found", [], 404);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});
