import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../config/database.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ok } from "../../utils/api-response.js";
import { HttpError } from "../../middleware/error.middleware.js";
import { getPagination, meta } from "../../utils/pagination.js";
import { mapBlog } from "../../utils/mappers.js";

export const blogRouter = Router();

blogRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const { page, limit, skip, take } = getPagination(req.query);
    const [posts, total] = await Promise.all([
      prisma.blog.findMany({
        orderBy: { id: "desc" },
        skip,
        take
      }),
      prisma.blog.count()
    ]);
    return ok(res, "Blog posts fetched successfully", {
      items: posts.map(mapBlog),
      meta: meta(total, page, limit)
    });
  })
);

blogRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = z.coerce.number().int().positive().parse(req.params.id);
    const post = await prisma.blog.findUnique({ where: { id } });
    if (!post) throw new HttpError(404, "Blog post not found");
    return ok(res, "Blog post fetched successfully", mapBlog(post));
  })
);

