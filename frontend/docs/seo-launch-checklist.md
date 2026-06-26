# SEO Launch Checklist

## Before Deployment

- Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS production origin.
- Set `API_BASE_URL` or `NEXT_PUBLIC_API_BASE_URL` to the production API origin.
- Confirm production does not use localhost, staging, preview, or `vercel.app` as the canonical origin.
- Run `pnpm lint`.
- Run `pnpm exec tsc --noEmit`.
- Run `pnpm test`.
- Run `pnpm build`.
- Run `pnpm analyze`.
- Confirm `/sitemap.xml` contains only indexable public routes.
- Confirm redirect aliases are absent from the sitemap.
- Confirm `/robots.txt` allows production crawling and blocks preview crawling.
- Confirm admin and login routes emit `noindex,nofollow`.
- Confirm all 15 approved tours remain indexable.
- Confirm only complete destinations are in the sitemap.
- Confirm empty, thin, and partial tour categories are excluded from the sitemap.

## Immediately After Deployment

- Open `/` and confirm HTTP 200.
- Open `/tours` and confirm HTTP 200.
- Open one priority tour detail page and confirm HTTP 200.
- Open `/destinations` and confirm HTTP 200.
- Open one complete destination detail page and confirm HTTP 200.
- Open `/blog`, `/about`, `/gallery`, and `/contact`.
- Open `/robots.txt` and confirm production crawl rules.
- Open `/sitemap.xml` and confirm the production domain.
- View source or metadata for canonical URLs on homepage, `/tours`, tour detail, `/destinations`, and destination detail.
- Test Open Graph metadata with a sharing debugger.
- Validate Organization, Website, Breadcrumb, Tour, and Destination JSON-LD with a rich results tool.
- Submit the contact form with a safe test inquiry.
- Submit newsletter signup with a safe test address.
- Confirm `/login` is accessible but noindexed.
- Confirm unauthenticated `/admin` redirects to `/login`.
- Confirm authenticated `/admin` renders only with a valid session.

## Search Console Launch

- Add the production domain or URL-prefix property in Google Search Console.
- Use the real DNS record or verification token supplied by Google.
- Confirm the existing verification HTML file if that is the chosen method.
- Submit `/sitemap.xml`.
- Inspect the homepage.
- Inspect `/tours`.
- Inspect priority tour pages.
- Inspect each complete destination page.
- Test live URLs after deployment.
- Run Rich Results Test on priority page types.
- Monitor Pages and Indexing reports.
- Monitor Core Web Vitals.
- Monitor Manual Actions.
- Monitor Security Issues.

## First 30 Days

- Review index coverage weekly.
- Review crawl errors and unexpected 404s.
- Track search queries, impressions, clicks, and average position.
- Track contact form conversion events.
- Track newsletter conversion events.
- Track tour inquiry CTA events.
- Review Core Web Vitals field data when available.
- Review redirect errors.
- Review sitemap discovery and submitted/indexed URL counts.
- Prioritize new content only after client-approved facts and trust information are available.
