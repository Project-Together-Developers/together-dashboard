import { api } from './axios';
import { AdminUser } from '../store/auth';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

interface AdminLoginData {
  accessToken: string;
  refreshToken: string;
  user: AdminUser;
}

export async function adminLogin(email: string, password: string): Promise<AdminLoginData> {
  const { data } = await api.post<ApiResponse<AdminLoginData>>('/auth/admin/login', {
    email,
    password,
  });
  return data.data;
}
