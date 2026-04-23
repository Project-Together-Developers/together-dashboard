# Routing & Auth Guard

The application uses `react-router-dom` for handling all navigation and routing.

## Routing Structure

- **Main Router**: Defined in `src/app.tsx`. It owns all routes for the application.
- **Layouts**: 
  - `DashboardLayout` (`src/components/layout/dashboard-layout.tsx`): The main wrapper for authenticated pages, which includes the `Sidebar` and an `<Outlet>` for rendering child pages.
- **Pages**:
  - `login-page.tsx`
  - `events-page.tsx`
  - `users-page.tsx`
  - `reviews-page.tsx`
  - `analytics-page.tsx`

## Auth Guard (`ProtectedRoute`)

The `ProtectedRoute` component (`src/components/layout/protected-route.tsx`) wraps all authenticated routes to ensure unauthorized users cannot access them.

- **Behavior**: It checks `useAuthStore((s) => s.isAuthenticated)`.
  - If `true`, it renders its `children` (the requested protected page).
  - If `false`, it redirects the user to `/login` using the `<Navigate>` component.
- **Post-Login Redirect**: Upon successful login, the application redirects the user to `/events`, which serves as the default landing page.
