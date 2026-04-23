# API Documentation

The Together Dashboard connects to the backend API using Axios. All configurations and endpoint definitions are stored in `src/api/`.

## Axios Configuration

The main axios instance is defined in `src/api/axios.ts`.

- **Base URL**: The API base URL is defined by the environment variable `VITE_API_URL`, which defaults to `/api/v1`.
- **Interceptors**:
  - **Request**: Automatically attaches the `Authorization` header with a Bearer token if one is present in the local storage (managed by Zustand `useAuthStore`).
  - **Response**: If a 401 Unauthorized response is received, it attempts to clear the local auth state and reload the window.

## Auth API

Defined in `src/api/auth.ts`.

### `adminLogin`

Authenticates an admin user.

- **Endpoint**: `POST /auth/admin/login`
- **Payload**:
  - `email` (string)
  - `password` (string)
- **Returns**: `AdminLoginData` object containing `accessToken`, `refreshToken`, and the `AdminUser` details.
