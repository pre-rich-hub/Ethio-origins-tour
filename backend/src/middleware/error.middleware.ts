import type { ErrorRequestHandler } from "express";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { fail } from "../utils/api-response.js";
import { isProduction } from "../config/env.js";

export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const notFoundHandler = () => {
  throw new HttpError(404, "Route not found");
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    return fail(
      res,
      "Validation failed",
      err.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message
      })),
      422
    );
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2025") return fail(res, "Record not found", [], 404);
    if (err.code === "P2002") return fail(res, "Duplicate record", [], 409);
  }

  if (err instanceof HttpError) {
    return fail(res, err.message, [], err.status);
  }

  const message = isProduction ? "Internal server error" : err?.message ?? "Internal server error";
  return fail(res, message, [], 500);
};

