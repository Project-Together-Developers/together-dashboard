import { api } from './axios';

export interface IActivity {
  _id: string;
  name: string;
  icon: string;
  isActive: boolean;
  createdAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export async function fetchActivities(): Promise<IActivity[]> {
  const { data } = await api.get<ApiResponse<IActivity[]>>('/activities');
  return data.data;
}

export async function createActivity(payload: { name: string; icon: string }): Promise<IActivity> {
  const { data } = await api.post<ApiResponse<IActivity>>('/activities', payload);
  return data.data;
}

export async function updateActivity(id: string, payload: { name?: string; icon?: string; isActive?: boolean }): Promise<IActivity> {
  const { data } = await api.patch<ApiResponse<IActivity>>(`/activities/${id}`, payload);
  return data.data;
}

export async function deleteActivity(id: string): Promise<void> {
  await api.delete(`/activities/${id}`);
}
