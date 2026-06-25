# Production Deployment Guide

This backend is production-ready as code, but it must not be pointed at production data until the database schema is confirmed against a staging copy.

## Required Inputs

Before launch, provide:

- staging `DATABASE_URL` or imported staging dump
- production `DATABASE_URL`
- SMTP credentials
- production frontend origin
- production domain/base URL
- path or mounted volume for `backend/assets`
- rotated DB and SMTP credentials

## One-Time Staging Verification

1. Copy env template:

```bash
cp .env.example .env
```

2. Set `.env` to a staging/exported database, not production.

3. Introspect the real schema:

```bash
npm run prisma:pull
npm run prisma:generate
```

4. Review `prisma/schema.prisma` after introspection.

Check especially:

- exact casing of `admin_table` fields
- `gallery.Image_url` vs `gallery.image_url`
- existence and purpose of `gallery_table`
- `bookings.status`
- date/default fields
- primary keys and foreign keys

5. Run verification:

```bash
npm run typecheck
npm run build
npm audit --omit=dev
```

6. Start against staging:

```bash
npm run start
```

7. Smoke test:

```bash
curl http://localhost:5000/health
curl http://localhost:5000/api/tours
curl http://localhost:5000/api/destinations
curl http://localhost:5000/api/blog
```

8. Test admin login with a staging admin user.

## Production Build

```bash
npm ci
npm run prisma:generate
npm run build
npm run start
```

## Docker Build

```bash
docker build -t ethio-origin-backend .
docker run --env-file .env.production -p 5000:5000 ethio-origin-backend
```

For uploads, mount the backend asset folder:

```bash
docker run \
  --env-file .env.production \
  -p 5000:5000 \
  -v /var/www/ethio-origin-backend-assets:/app/assets \
  ethio-origin-backend
```

`UPLOAD_ROOT=.` stores media in `backend/assets` when running locally or in
the Docker app directory. Set a different `UPLOAD_ROOT` only when the server
mounts media somewhere else.

## Reverse Proxy Notes

Recommended:

- terminate HTTPS at Nginx/Caddy/load balancer
- proxy `/api` to this service
- keep `COOKIE_SECURE=true`
- set `FRONTEND_ORIGIN` to the exact frontend URL
- do not use wildcard CORS with cookie auth

Example Nginx location:

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:5000/api/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

location /health {
    proxy_pass http://127.0.0.1:5000/health;
}
```

## Production Environment

Create `.env.production` from `.env.production.example`.

Never commit `.env.production`.

Important values:

- `NODE_ENV=production`
- `COOKIE_SECURE=true`
- `EMAIL_ENABLED=true`
- strong `JWT_SECRET`
- exact `FRONTEND_ORIGIN`
- safe `UPLOAD_ROOT`

## Database Migration Policy

Initial version should use the existing schema.

Do not run destructive migrations against production.

If `bookings.status` is missing in staging, add it through a formal Prisma migration after confirming the target schema.

## Launch Checklist

- [ ] Staging database introspected with Prisma
- [ ] Prisma schema reviewed after `db pull`
- [ ] Admin password hash verified with Node `bcryptjs`
- [ ] Public APIs return expected data
- [ ] Admin login/logout works with cookies
- [ ] Admin CRUD tested
- [ ] Booking creation tested
- [ ] Contact creation tested
- [ ] Email delivery tested
- [ ] Uploads write to the intended asset path
- [ ] `npm audit --omit=dev` returns zero vulnerabilities
- [ ] Legacy secrets rotated
- [ ] Backups completed
- [ ] Rollback plan ready
