export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'moderator';
}

export interface AuthState {
  user: AdminUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (user: AdminUser, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
}
