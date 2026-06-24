# API Documentation

Base URL: `/api`

All responses use:

```json
{
  "success": true,
  "message": "Message",
  "data": {}
}
```

Errors use:

```json
{
  "success": false,
  "message": "Message",
  "errors": []
}
```

## Public Read APIs

### GET `/api/tours`

Returns paginated tours with destination, categories, gallery preview images, and SEO-friendly raw fields.

Query:

- `page`
- `limit`
- `categoryId`
- `destinationId`
- `featured`

### GET `/api/tours/featured`

Returns featured/high-rated tours.

### GET `/api/tours/:id`

Returns one tour with destination, categories, gallery, included/excluded arrays, itinerary array, related tours, and canonical-friendly ID.

### GET `/api/destinations`

Returns destinations with tour counts.

### GET `/api/destinations/featured`

Returns highest-tour-count destinations.

### GET `/api/destinations/:id`

Returns one destination and its tours.

### GET `/api/categories`

Returns tour categories with tour counts.

### GET `/api/gallery`

Returns gallery images.

### GET `/api/gallery/tour/:tourId`

Returns images for a tour.

### GET `/api/blog`

Returns paginated blog posts.

### GET `/api/blog/:id`

Returns one blog post.

### GET `/api/testimonials`

Returns testimonials.

## Admin Auth

Auth uses secure HTTP-only cookie sessions.

### POST `/api/auth/login`

Body:

```json
{
  "email": "admin@example.com",
  "password": "password"
}
```

### POST `/api/auth/logout`

Clears auth cookie.

### GET `/api/auth/me`

Requires auth. Returns current admin profile.

### PUT `/api/auth/profile`

Requires auth. Updates admin name/email/profile image.

### PUT `/api/auth/change-password`

Requires auth.

Body:

```json
{
  "oldPassword": "old",
  "newPassword": "new"
}
```

## Admin CRUD

All `/api/admin/*` routes require auth.

### Tours

- `POST /api/admin/tours`
- `PUT /api/admin/tours/:id`
- `DELETE /api/admin/tours/:id`

Tour create/update accepts multipart form data. Image field: `tourImages`.

### Destinations

- `POST /api/admin/destinations`
- `PUT /api/admin/destinations/:id`
- `DELETE /api/admin/destinations/:id`

Image field: `destinationImage`.

### Categories

- `POST /api/admin/categories`
- `PUT /api/admin/categories/:id`
- `DELETE /api/admin/categories/:id`

### Gallery

- `POST /api/admin/gallery`
- `DELETE /api/admin/gallery/:id`

Image field: `galleryImage`.

Note: this API writes tour gallery images to `gallery`, which is the table used by public tour pages.

### Blog

- `POST /api/admin/blog`
- `PUT /api/admin/blog/:id`
- `DELETE /api/admin/blog/:id`

Image field: `blogImage`.

### Testimonials

- `POST /api/admin/testimonials`
- `PUT /api/admin/testimonials/:id`
- `DELETE /api/admin/testimonials/:id`

## Bookings

### POST `/api/bookings`

Creates booking inquiry, validates tour existence, inserts booking, sends admin/customer emails when enabled.

Body:

```json
{
  "tourId": 1,
  "fullName": "Customer",
  "email": "customer@example.com",
  "phone": "+251...",
  "country": "Ethiopia",
  "chosenDate": "2026-07-01",
  "adults": 2,
  "children": 0
}
```

Admin:

- `GET /api/admin/bookings`
- `GET /api/admin/bookings/:id`
- `PUT /api/admin/bookings/:id/status`
- `DELETE /api/admin/bookings/:id`

Allowed statuses: `Pending`, `Confirmed`, `Cancelled`, `Completed`.

## Contacts

### POST `/api/contact`

Creates contact request.

Admin:

- `GET /api/admin/contacts`
- `GET /api/admin/contacts/:id`
- `DELETE /api/admin/contacts/:id`
- `POST /api/admin/contacts/:id/reply`

## Dashboard

### GET `/api/admin/dashboard/stats`

Returns totals and recent bookings.

## SEO Data Notes

The backend does not render meta tags, Open Graph, JSON-LD, or frontend SEO components.

Public APIs return enough raw data for the frontend team:

- name/title
- description/overview
- main image path
- category/destination info
- created/updated dates when available
- ID-based canonical path data

Slug support is future work. Current APIs return ID-based canonical metadata.
