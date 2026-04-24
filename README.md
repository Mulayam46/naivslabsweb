# NavisLabs Website

NavisLabs is a multi-product AI company website built with Next.js 16, React 19, and Tailwind CSS v4. The site is designed as a clean public front door for the company and its product family:

- `HireAI` for AI-powered hiring workflows
- `Navis AI` for decision intelligence and work context

## Live Site Structure

- `/` - main homepage
- `/products` - product overview
- `/products/hireai` - live HireAI product page
- `/products/navis-ai` - Navis AI product page
- `/company` - company story and principles

## Features

- Premium, lightweight marketing site with a cleaner visual style
- Shared navigation and footer across all pages
- Product-first structure that can scale to more products later
- Waitlist call-to-action for future launches
- Route-specific metadata for SEO and sharing
- Basic security headers and disabled production source maps

## Tech Stack

- [Next.js 16](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React](https://lucide.dev/)
- [Geist](https://vercel.com/font)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - start the local development server
- `npm run build` - create a production build
- `npm run start` - run the production server
- `npm run lint` - run ESLint

## Project Structure

- `app/` - App Router pages, layout, metadata, and global styles
- `components/` - shared UI sections used across routes
- `lib/site-data.ts` - shared content and product data
- `public/` - static assets such as logos and icons

## Content Model

Shared product content is centralized in `lib/site-data.ts` so the site can scale without duplicating copy in multiple components.

The current model includes:

- company stats
- product cards
- product-specific metrics
- product pillars
- company principles

## Deployment Notes

- The repo is configured for static marketing pages and production-safe headers in `next.config.ts`
- `poweredByHeader` is disabled
- production browser source maps are disabled
- common security headers are enabled for the public site

## Notes

- The public `HireAI` CTA points to the external product app.
- The waitlist CTA is shared across the marketing pages for consistency.
- The site is intentionally marketing-first, not an authenticated product dashboard.

