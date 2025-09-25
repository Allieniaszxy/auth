# Copilot Instructions for AI Coding Agents

## Project Overview

This is a Next.js 15 project (TypeScript, React 19) for authentication, bootstrapped with `create-next-app`. It uses Turbopack for builds and dev server. The codebase is organized for clarity and separation of concerns, with client and server logic split under `src/app/client` and `src/app/server` respectively.

## Key Architecture & Patterns

- **App Directory Structure**: Uses Next.js `/src/app` routing. Pages are in `client/` (e.g., `login/page.tsx`, `signup/page.tsx`). Shared layout in `layout.tsx`.
- **Database Integration**: MongoDB via Mongoose. Connection logic is in `src/dbConfig/dbConfig.ts` (see `connect()` function). The connection string is read from `process.env.MONGO_URI`.
- **Styling**: Tailwind CSS is configured via `postcss.config.mjs` and imported in `globals.css`. Font customization uses Geist fonts via Next.js font API.
- **Environment Variables**: Sensitive data (e.g., MongoDB URI) is expected in `.env*` files (see `.gitignore`).
- **Linting**: ESLint is configured with `next/core-web-vitals` and `next/typescript` via `eslint.config.mjs`. Run `npm run lint` for checks.

## Developer Workflows

- **Start Dev Server**: `npm run dev` (or `yarn dev`, `pnpm dev`, `bun dev`).
- **Build**: `npm run build` (uses Turbopack).
- **Lint**: `npm run lint`.
- **Production Start**: `npm run start`.
- **Edit Pages**: Modify files in `src/app/client/*/page.tsx` for client routes.

## Conventions & Practices

- **TypeScript Strict Mode**: Enforced via `tsconfig.json`.
- **Path Aliases**: Use `@/` for imports from `src/` (see `tsconfig.json`).
- **No Direct Database Calls in Client**: All DB logic should be in server-side code (e.g., API routes, server components).
- **Font Variables**: Use CSS variables for font families (see `globals.css` and `layout.tsx`).
- **Ignore Files**: `.gitignore` excludes build, output, and environment files.

## Integration Points

- **External Dependencies**: Uses `axios` for HTTP, `bcryptjs` for password hashing, `jsonwebtoken` for JWT, `nodemailer` for email, and `react-hot-toast` for notifications.
- **Deployment**: Designed for Vercel, but can run locally via Next.js CLI.

## Examples

- **Database Connection**: See `src/dbConfig/dbConfig.ts` for how to connect to MongoDB.
- **Page Component**: See `src/app/client/signup/page.tsx` for a minimal page example.
- **Layout**: See `src/app/layout.tsx` for global layout and font setup.

## References

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

If any section is unclear or missing, please provide feedback for further refinement.
