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

export function registerRoutes(app: Express) {
  app.use("/api/auth", authRouter);
  app.use("/api/admin", adminRouter);
  app.use("/api/tours", toursRouter);
  app.use("/api/destinations", destinationsRouter);
  app.use("/api/categories", categoriesRouter);
  app.use("/api/gallery", galleryRouter);
  app.use("/api/blog", blogRouter);
  app.use("/api/testimonials", testimonialsRouter);
  app.use("/api/bookings", bookingsRouter);
  app.use("/api/contact", contactsRouter);
}
