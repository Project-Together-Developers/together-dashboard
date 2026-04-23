import { api } from './axios';
import { AdminLoginData, ApiResponse } from '../utils/interface/api';

export async function adminLogin(email: string, password: string): Promise<AdminLoginData> {
  const { data } = await api.post<ApiResponse<AdminLoginData>>('/auth/admin/login', {
    email,
    password,
  });
  return data.data;
}
