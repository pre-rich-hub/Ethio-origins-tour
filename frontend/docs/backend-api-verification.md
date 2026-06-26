# Backend API Verification Checklist

The frontend assumes these API contracts. Verify against the deployed backend before public launch.

## `/api/contact`

- Method: `POST`
- Body: `{ "name": string, "email": string, "message": string }`
- Success response: JSON with `{ "success": true }`
- Error response: JSON with `{ "success": false }` or appropriate non-2xx status
- Timeout behavior: frontend times out and shows a generic error
- Requirements: server-side validation, spam protection, rate limiting, and delivery monitoring
- Cookies: not required

## `/api/subscribe`

- Method: `POST`
- Body: `{ "email": string }`
- Success response: JSON with `{ "success": true }`
- Error response: JSON with `{ "success": false }` or appropriate non-2xx status
- Timeout behavior: frontend times out and shows a generic error
- Requirements: server-side validation, bot protection, rate limiting, and subscription-provider confirmation
- Cookies: not required

## `/api/v1/auth/me`

- Method: `GET`
- Success response: JSON with `{ "success": true }`
- Unauthorized response: `401` or JSON with `{ "success": false }`
- Cookies: required for authenticated sessions
- Frontend assumption: admin layout forwards request cookies server-side before rendering protected content

## `/api/v1/admin/*`

- Methods: route-specific
- Cookies: required
- Unauthorized behavior: must reject unauthenticated requests server-side
- Frontend assumption: protected UI does not render without `/api/v1/auth/me`, but backend must still enforce authorization directly

Do not hardcode test credentials or secrets in frontend code or documentation.
