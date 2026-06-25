import { describe, it, expect, vi } from "vitest";
import { asyncHandler } from "../../src/utils/async-handler.js";

describe("asyncHandler", () => {
  it("calls next on success", async () => {
    const handler = asyncHandler(async (_req, _res, _next) => {
      return "done";
    });
    const req = {} as any;
    const res = {} as any;
    const next = vi.fn();
    await handler(req, res, next);
    expect(next).not.toHaveBeenCalled();
  });

  it("calls next with error on rejection", async () => {
    const error = new Error("boom");
    const handler = asyncHandler(async (_req, _res, _next) => {
      throw error;
    });
    const req = {} as any;
    const res = {} as any;
    const next = vi.fn();
    await handler(req, res, next);
    expect(next).toHaveBeenCalledWith(error);
  });
});
