# Ethio Origins Frontend

Next.js website for Ethio Origins Tour.

## Project Role

This folder owns all browser-facing files:

- public website pages
- SEO routes such as `robots.txt`, `sitemap.xml`, and `manifest.webmanifest`
- Google verification in `public/google5177018a25afa5f1.html`
- favicon/app icons in `public/`
- active brand files in `public/brand/`
- original logo delivery files in `brand/`

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

The frontend reads CMS data from the backend using:

- `API_BASE_URL` for server-side requests
- `NEXT_PUBLIC_API_BASE_URL` for browser/media URLs and the `/api/*` proxy
