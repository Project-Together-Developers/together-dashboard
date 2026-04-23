# CLAUDE.md (keep this lean)

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Vite dev server on port 8001, proxies /api → http://localhost:8000
pnpm build      # tsc && vite build
pnpm lint       # ESLint, 0 warnings allowed
```

## Rules
- use kebab-case for files and folders
- always reuse shared/ui components
- always sync error codes with backend

## Docs (read only when needed)
For API conventions, read `docs/api.md`
For state management guidelines, read `docs/state-management.md`
For routing and auth guard, read `docs/routing-and-auth.md`
For i18n guidelines, read `docs/i18n.md`
For project rules, read `docs/project-rules.md`
