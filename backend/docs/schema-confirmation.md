# Schema Confirmation Notes

The current `prisma/schema.prisma` must be confirmed against a staging database before production launch.

## Why Confirmation Is Required

The current MySQL schema may contain mixed casing and older table names:

- `admin_table.name` and `admin_table.Name`
- `admin_table.email` and `admin_table.Email`
- `admin_table.password` and `admin_table.Password`
- `gallery.Image_url` and `gallery.image_url`
- `gallery` and `gallery_table`

MySQL column names are generally case-insensitive, but generated Prisma field mappings need the real database names.

## Required Command

Run against staging or a local imported dump:

```bash
npm run prisma:pull
npm run prisma:generate
```

Then rerun:

```bash
npm run typecheck
npm run build
```

If `db pull` changes model names, update route imports and Prisma client usages accordingly.

## Tables Expected From Code

- `admin_table`
- `tours`
- `destinations`
- `tour_category`
- `tour_category_junction`
- `gallery`
- `gallery_table`
- `bookings`
- `contacts`
- `blog`
- `testimonials`

## Production Decision Points

### Gallery

Current TypeScript behavior writes admin gallery uploads to `gallery`, because that is the table used by public tour pages and dashboard listing.

Confirm whether `gallery_table` is needed before launch.

### Deletes

The TypeScript backend removes obvious join/gallery rows when deleting tours/categories. Test this against real foreign key behavior.

### Slugs

APIs return ID-based canonical metadata. Add slugs later as a formal schema migration if the frontend requires SEO-friendly URLs.
