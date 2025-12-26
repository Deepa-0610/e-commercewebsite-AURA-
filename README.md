# Aura monorepo

This repository has been converted to a Turborepo-powered monorepo.

Quick commands (requires pnpm):

```bash
pnpm install
pnpm dev    # runs turbo dev
pnpm build  # runs turbo build
pnpm start  # runs turbo start
```

Notes:
- `apps/web` is the Next.js application. Keep its dependencies in `apps/web/package.json`.
- Install dependencies with `pnpm install` at the repo root.
