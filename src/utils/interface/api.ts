import { AdminUser } from "./auth";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface AdminLoginData {
  accessToken: string;
  refreshToken: string;
  user: AdminUser;
}
