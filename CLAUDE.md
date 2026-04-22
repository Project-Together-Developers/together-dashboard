# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

See also: `/Users/macstore.uz/Documents/Startups/Together/CLAUDE.md` for project-wide conventions.

## Commands

```bash
pnpm dev        # Vite dev server on port 8001, proxies /api → http://localhost:8000
pnpm build      # tsc && vite build
pnpm lint       # ESLint, 0 warnings allowed
```

## Architecture

### Routing & Auth Guard

`App.tsx` owns all routes. `ProtectedRoute` wraps authenticated pages and redirects to `/login` when `useAuthStore.isAuthenticated` is false. After login the app lands on `/events`.

Pages: `EventsPage`, `UsersPage`, `ReviewsPage`, `AnalyticsPage` — all rendered inside `DashboardLayout` (sidebar + `<Outlet>`).

### State

`src/store/auth.ts` — Zustand store persisted to `localStorage` under key `together-admin-auth`. Holds `accessToken`, `refreshToken`, `user`, and `isAuthenticated`. The only store currently in the app; add new stores to `src/store/`.

### HTTP Client

`src/api/axios.ts` exports a single `api` instance pointed at `VITE_API_URL` (defaults to `/api/v1`). It has:
- Request interceptor: injects `Authorization: Bearer <accessToken>` from the auth store.
- Response interceptor: on 401, queues concurrent requests and refreshes via `POST /auth/admin/login` — do not add a second refresh path.

New API modules go in `src/api/` and import `api` from `./axios`.

### i18n

Default language is `ru` (persisted in `localStorage` under `together-admin-lang`). Always add keys to all three files (`en.json`, `ru.json`, `uz.json`) when adding UI text. Use `AuthErrorCode` enum pattern for error keys — enum value is the i18n key string (e.g. `'auth.invalidCredentials'`).

### UI Components

shadcn/ui components live in `src/components/ui/`. Add new primitives there. Feature-level components go in `src/components/<feature>/`. The `cn()` helper in `src/lib/utils.ts` merges Tailwind classes.
