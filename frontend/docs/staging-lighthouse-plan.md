# Staging Lighthouse Plan

Local Lighthouse results can be noisy for this project because final API, CDN, and deployment headers are production-dependent. Use staging or production URLs for the launch baseline.

## Pages To Test

- `/`
- `/tours`
- One priority tour detail page
- `/destinations`
- `/destinations/lalibela`
- `/contact`

## Command Template

Run each URL three times on mobile settings and use the median:

```bash
lighthouse https://example.com/ --preset=desktop --output=json --output-path=./lighthouse-home.json
lighthouse https://example.com/ --form-factor=mobile --screenEmulation.mobile --output=json --output-path=./lighthouse-home-mobile.json
```

Record:

- Performance
- Accessibility
- Best Practices
- SEO
- LCP
- CLS
- TBT
- Speed Index

## Notes

- Do not compare localhost results to production targets.
- Confirm Cloudinary images load through Next.js image optimization.
- Confirm Vercel Analytics does not create unexpected blocking work.
- Treat Core Web Vitals field data as authoritative once Search Console has enough traffic.
