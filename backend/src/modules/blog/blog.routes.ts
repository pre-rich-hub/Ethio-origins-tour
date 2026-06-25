import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../config/database.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ok } from "../../utils/api-response.js";
import { HttpError } from "../../middleware/error.middleware.js";
import { getPagination, meta } from "../../utils/pagination.js";
import { mapBlog } from "../../utils/mappers.js";

export const blogRouter = Router();

const blogInclude = {
  category: true
};

blogRouter.get(
  "/categories",
  asyncHandler(async (_req, res) => {
    const categories = await prisma.blogCategory.findMany({
      include: { _count: { select: { posts: true } } },
      orderBy: { name: "asc" }
    });
    return ok(res, "Blog categories fetched successfully", categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      postCount: cat._count.posts
    })));
  })
);

blogRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const { page, limit, skip, take } = getPagination(req.query);
    const categorySlug = z.string().optional().parse(req.query.categorySlug);

    const where: any = {};
    if (categorySlug) {
      const category = await prisma.blogCategory.findUnique({
        where: { slug: categorySlug },
        select: { id: true }
      });
      if (category) {
        where.categoryId = category.id;
      } else {
        return ok(res, "Blog posts fetched successfully", { items: [], meta: meta(0, page, limit) });
      }
    }

    const [posts, total] = await Promise.all([
      prisma.blog.findMany({
        where,
        include: blogInclude,
        orderBy: { id: "desc" },
        skip,
        take
      }),
      prisma.blog.count({ where })
    ]);
    return ok(res, "Blog posts fetched successfully", {
      items: posts.map(mapBlog),
      meta: meta(total, page, limit)
    });
  })
);

blogRouter.get(
  "/slug/:slug",
  asyncHandler(async (req, res) => {
    const slug = z.string().parse(req.params.slug);
    const post = await prisma.blog.findUnique({
      where: { slug },
      include: blogInclude
    });
    if (!post) throw new HttpError(404, "Blog post not found");
    return ok(res, "Blog post fetched successfully", mapBlog(post));
  })
);

blogRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = z.coerce.number().int().positive().parse(req.params.id);
    const post = await prisma.blog.findUnique({
      where: { id },
      include: blogInclude
    });
    if (!post) throw new HttpError(404, "Blog post not found");
    return ok(res, "Blog post fetched successfully", mapBlog(post));
  })
);

