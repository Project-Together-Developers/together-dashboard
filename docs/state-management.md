# State Management Documentation

The application uses [Zustand](https://github.com/pmndrs/zustand) for global state management.

## Auth Store

The auth store is implemented in `src/store/auth.ts` and exports a custom hook `useAuthStore`.

### State Details

The store holds the following state related to user authentication (`AuthState` from `src/utils/interface/auth.ts`):

- `user`: The currently logged-in admin user (`AdminUser | null`).
- `accessToken`: JWT Access Token (`string | null`).
- `refreshToken`: JWT Refresh Token (`string | null`).
- `isAuthenticated`: Boolean indicating if the user is authenticated.

### Actions

- `login(user: AdminUser, accessToken: string, refreshToken: string)`: Updates state with authenticated user data and tokens.
- `logout()`: Clears the user, tokens, and sets `isAuthenticated` to false.
- `setTokens(accessToken: string, refreshToken: string)`: Updates only the tokens (useful for token refreshing logic).

### Persistence

The `useAuthStore` uses Zustand's `persist` middleware.
State is saved to `localStorage` under the key `together-admin-auth`.
It partially persists state, saving only `accessToken`, `refreshToken`, `user`, and `isAuthenticated`.
