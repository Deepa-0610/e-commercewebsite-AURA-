---
description: Repository Information Overview
alwaysApply: true
---

# Aura Information

## Summary
Aura is a Next.js web application built with React and TypeScript. It utilizes Supabase for backend services (database, authentication) and Tailwind CSS for styling. The project appears to be an e-commerce or product showcase platform, featuring components for products, carts, wishlists, and checkout.

## Structure
- **app/**: Contains the Next.js App Router pages, layouts, and route groups (auth, cart, checkout, products, etc.).
- **components/**: Reusable UI components, including a `ui` folder likely for shadcn/ui primitives, and feature-specific components like `product-card.tsx`, `cart-items.tsx`.
- **hooks/**: Custom React hooks (e.g., `use-toast.ts`, `use-mobile.ts`).
- **lib/**: Utility functions and Supabase client configuration.
- **public/**: Static assets including images and icons.
- **scripts/**: SQL scripts for database setup (creating tables for products, cart, orders, profiles).
- **styles/**: Global CSS styles.

## Language & Runtime
**Language**: TypeScript  
**Version**: v5 (TypeScript), Node.js (implied by Next.js environment)  
**Framework**: Next.js 15.5.9, React 19.2.0  
**Build System**: Next.js Build API  
**Package Manager**: pnpm (inferred from `pnpm-lock.yaml`)

## Dependencies
**Main Dependencies**:
- **next**: 15.5.9
- **react**: 19.2.0
- **@supabase/supabase-js**: latest
- **tailwindcss**: ^4.1.9
- **framer-motion**: 12.23.26
- **lucide-react**: ^0.454.0
- **react-hook-form**: ^7.60.0
- **zod**: 3.25.76
- **@radix-ui/react-***: Various primitives for UI components

**Development Dependencies**:
- **typescript**: ^5
- **@types/node**: ^22
- **@types/react**: ^19
- **postcss**: ^8.5

## Build & Installation
```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

## Main Files & Resources
**Entry Points**:
- `app/layout.tsx`: Root layout file.
- `app/page.tsx`: Main landing page.

**Configuration**:
- `next.config.mjs`: Next.js configuration.
- `tailwind.config.ts` (or implicit in v4): Tailwind CSS configuration.
- `tsconfig.json`: TypeScript configuration.
- `components.json`: Configuration for UI components (likely shadcn/ui).

## Database
The project uses Supabase. SQL migration scripts are located in `scripts/`:
- `001_create_products_table.sql`
- `002_create_cart_wishlist_tables.sql`
- `003_create_orders_table.sql`
- `004_create_profiles_table.sql`
