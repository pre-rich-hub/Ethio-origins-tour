# Ethio Origins Backend

Production TypeScript API for the Ethio Origins travel CMS.

## Status

This project uses Express, TypeScript, Prisma, Zod, Nodemailer, and Multer.

Run `npm run prisma:pull` against staging before production use to confirm the live MySQL schema.

## Project Role

This folder owns the API, database access, admin auth, uploads, and CMS media.
Uploaded/public CMS media lives in `assets/` and is served by the API at
`/assets/*`.

## Setup

```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run dev
```

## Production

See:

- `docs/deployment.md`
- `docs/schema-confirmation.md`
- `docs/api.md`

## Important

- Do not point this app at production during development.
- Do not commit real `.env` values.
- Keep uploaded image paths compatible with the current `assets/` folder.
- See `docs/api.md`.
