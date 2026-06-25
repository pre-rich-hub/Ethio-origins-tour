import type { Express } from "express";
import { toursRouter } from "./modules/tours/tours.routes.js";
import { destinationsRouter } from "./modules/destinations/destinations.routes.js";
import { categoriesRouter } from "./modules/categories/categories.routes.js";
import { galleryRouter } from "./modules/gallery/gallery.routes.js";
import { blogRouter } from "./modules/blog/blog.routes.js";
import { testimonialsRouter } from "./modules/testimonials/testimonials.routes.js";
import { authRouter } from "./modules/auth/auth.routes.js";
import { adminRouter } from "./modules/admin/admin.routes.js";
import { bookingsRouter } from "./modules/bookings/bookings.routes.js";
import { contactsRouter } from "./modules/contacts/contacts.routes.js";
import { seoRouter } from "./modules/seo/seo.routes.js";

export function registerRoutes(app: Express) {
  // API v1 routes
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/admin", adminRouter);
  app.use("/api/v1/tours", toursRouter);
  app.use("/api/v1/destinations", destinationsRouter);
  app.use("/api/v1/categories", categoriesRouter);
  app.use("/api/v1/gallery", galleryRouter);
  app.use("/api/v1/blog", blogRouter);
  app.use("/api/v1/testimonials", testimonialsRouter);
  app.use("/api/v1/bookings", bookingsRouter);
  app.use("/api/v1/contact", contactsRouter);
  app.use("/api/v1/seo", seoRouter);

  // Backward compatibility: redirect old /api/ routes to /api/v1/
  app.use("/api/auth", (_req, res) => {
    res.redirect(301, `/api/v1/auth${_req.url}`);
  });
  app.use("/api/admin", (_req, res) => {
    res.redirect(301, `/api/v1/admin${_req.url}`);
  });
  app.use("/api/tours", (_req, res) => {
    res.redirect(301, `/api/v1/tours${_req.url}`);
  });
  app.use("/api/destinations", (_req, res) => {
    res.redirect(301, `/api/v1/destinations${_req.url}`);
  });
  app.use("/api/categories", (_req, res) => {
    res.redirect(301, `/api/v1/categories${_req.url}`);
  });
  app.use("/api/gallery", (_req, res) => {
    res.redirect(301, `/api/v1/gallery${_req.url}`);
  });
  app.use("/api/blog", (_req, res) => {
    res.redirect(301, `/api/v1/blog${_req.url}`);
  });
  app.use("/api/testimonials", (_req, res) => {
    res.redirect(301, `/api/v1/testimonials${_req.url}`);
  });
  app.use("/api/bookings", (_req, res) => {
    res.redirect(301, `/api/v1/bookings${_req.url}`);
  });
  app.use("/api/contact", (_req, res) => {
    res.redirect(301, `/api/v1/contact${_req.url}`);
  });
  app.use("/api/seo", (_req, res) => {
    res.redirect(301, `/api/v1/seo${_req.url}`);
  });
}
