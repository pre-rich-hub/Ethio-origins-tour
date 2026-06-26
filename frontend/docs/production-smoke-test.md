# Production Smoke Test

Run these checks on the final production deployment and on private staging before public launch.

## Public SEO Flows

| Flow | Expected Result |
| --- | --- |
| Homepage -> Tours -> Tour detail -> Contact | All pages load, tour detail is canonical, contact CTA reaches `/contact`. |
| Homepage -> Destination -> Related tour -> Contact | Destination loads, related tour links are valid, contact CTA reaches `/contact`. |
| Tours category -> Tour detail | Indexable categories load real tour cards; empty categories show an honest empty state. |
| Unknown tour slug | 404 page renders with Home, Tours, and Destinations links. |
| Unknown destination slug | 404 page renders with Home, Tours, and Destinations links. |
| Unknown category slug | 404 page renders with Home, Tours, and Destinations links. |
| Unknown blog slug | 404 page renders; unpublished posts are not publicly linked. |

## Forms

| Flow | Expected Result |
| --- | --- |
| Contact form success | API confirms success; success message is announced; no form payload appears in analytics. |
| Contact form validation failure | Inline errors are associated with fields and input is preserved. |
| Contact form server failure | Generic failure message appears; no backend details are exposed. |
| Newsletter success | API confirms success before success text appears. |
| Newsletter validation failure | Invalid email is rejected client-side. |
| Newsletter server failure | Generic failure message appears; email is not logged. |

## Authentication

| Flow | Expected Result |
| --- | --- |
| Login success | Valid credentials create a session and redirect to `/admin`. |
| Login failure | Generic invalid-login message appears. |
| Admin unauthenticated redirect | `/admin` and `/admin/documents` redirect to `/login` before protected content renders. |
| Admin authenticated render | Dashboard and documents pages render only with a valid backend session. |

Do not automate credential-dependent checks unless a safe non-production test account exists.
