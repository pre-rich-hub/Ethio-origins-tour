import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../config/database.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ok } from "../../utils/api-response.js";

export const seoRouter = Router();

seoRouter.get(
  "/meta",
  asyncHandler(async (req, res) => {
    const path = z.string().min(1).parse(req.query.path);
    const url = new URL(path, "http://localhost");

    const segments = url.pathname.split("/").filter(Boolean);

    let title = "Ethio Origins Tour";
    let description = "Discover the wonders of Ethiopia with Ethio Origins Tour. Experience unique cultural and historical tours.";
    let ogImage: string | null = null;
    let ogType = "website";
    let canonical = url.pathname;
    let structuredData: Record<string, unknown> | null = null;

    if (segments.length >= 2) {
      const [resource, slug] = segments;

      if (resource === "tours") {
        const tour = await prisma.tour.findFirst({
          where: { OR: [{ slug }, { id: Number.isInteger(Number(slug)) ? Number(slug) : undefined }].filter(Boolean) },
          include: { gallery: { take: 1, orderBy: { id: "asc" } } }
        });
        if (tour) {
          title = `${tour.tourName} — Ethio Origins Tour`;
          description = tour.overview?.slice(0, 200) ?? description;
          ogImage = tour.gallery[0]?.imageUrl ?? null;
          ogType = "product";
          canonical = `/tours/${tour.slug}`;
          structuredData = {
            "@context": "https://schema.org",
            "@type": "Product",
            name: tour.tourName,
            description: tour.overview,
            image: ogImage,
            offers: tour.adultPrice ? {
              "@type": "Offer",
              price: Number(tour.adultPrice),
              priceCurrency: "USD",
              availability: "https://schema.org/InStock"
            } : undefined
          };
        }
      } else if (resource === "destinations") {
        const destination = await prisma.destination.findFirst({
          where: { OR: [{ slug }, { id: Number.isInteger(Number(slug)) ? Number(slug) : undefined }].filter(Boolean) }
        });
        if (destination) {
          title = `${destination.destinationName} — Ethio Origins Tour`;
          description = destination.description?.slice(0, 200) ?? description;
          ogImage = destination.imageUrl;
          ogType = "place";
          canonical = `/destinations/${destination.slug}`;
          structuredData = {
            "@context": "https://schema.org",
            "@type": "Place",
            name: destination.destinationName,
            description: destination.description,
            image: destination.imageUrl
          };
        }
      } else if (resource === "blog") {
        const post = await prisma.blog.findFirst({
          where: { OR: [{ slug }, { id: Number.isInteger(Number(slug)) ? Number(slug) : undefined }].filter(Boolean) }
        });
        if (post) {
          title = `${post.blogTitle} — Ethio Origins Tour Blog`;
          description = post.description?.slice(0, 200) ?? description;
          ogImage = post.imageUrl;
          ogType = "article";
          canonical = `/blog/${post.slug}`;
          structuredData = {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.blogTitle,
            description: post.description,
            image: post.imageUrl,
            datePublished: post.createdAt?.toISOString()
          };
        }
      }
    } else if (segments.length === 0 || segments[0] === "") {
      canonical = "/";
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Ethio Origins Tour",
        description: "Discover the wonders of Ethiopia with guided cultural and historical tours.",
        url: `${req.protocol}://${req.get("host")}`,
        logo: `${req.protocol}://${req.get("host")}/assets/logo.png`
      };
    }

    return ok(res, "SEO meta fetched successfully", {
      title,
      description,
      ogImage,
      ogType,
      canonical,
      twitterCard: "summary_large_image",
      structuredData
    });
  })
);

seoRouter.get(
  "/sitemap.xml",
  asyncHandler(async (_req, res) => {
    const baseUrl = "https://ethioorigins.com";

    const [tours, destinations, blogPosts] = await Promise.all([
      prisma.tour.findMany({ select: { slug: true, updatedAt: true } }),
      prisma.destination.findMany({ select: { slug: true } }),
      prisma.blog.findMany({ select: { slug: true, createdAt: true } })
    ]);

    type SitemapEntry = {
      loc: string;
      priority: string;
      changefreq: string;
      lastmod?: string;
    };

    const staticPages: SitemapEntry[] = [
      { loc: "/", priority: "1.0", changefreq: "weekly" },
      { loc: "/tours", priority: "0.9", changefreq: "weekly" },
      { loc: "/destinations", priority: "0.8", changefreq: "weekly" },
      { loc: "/blog", priority: "0.8", changefreq: "weekly" },
      { loc: "/about", priority: "0.6", changefreq: "monthly" },
      { loc: "/contact", priority: "0.6", changefreq: "monthly" }
    ];

    const tourUrls: SitemapEntry[] = tours.map((t) => ({
      loc: `/tours/${t.slug}`,
      priority: "0.8",
      changefreq: "monthly",
      lastmod: t.updatedAt?.toISOString().slice(0, 10)
    }));

    const destinationUrls: SitemapEntry[] = destinations.map((d) => ({
      loc: `/destinations/${d.slug}`,
      priority: "0.7",
      changefreq: "monthly"
    }));

    const blogUrls: SitemapEntry[] = blogPosts.map((b) => ({
      loc: `/blog/${b.slug}`,
      priority: "0.6",
      changefreq: "monthly",
      lastmod: b.createdAt?.toISOString().slice(0, 10)
    }));

    const allUrls = [...staticPages, ...tourUrls, ...destinationUrls, ...blogUrls];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map((u) => `  <url>
    <loc>${baseUrl}${u.loc}</loc>
    ${u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>\n` : ""}    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join("\n")}
</urlset>`;

    res.setHeader("Content-Type", "application/xml");
    res.send(xml);
  })
);
