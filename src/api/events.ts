import { api } from './axios';

export interface IEventActivity {
  _id: string;
  name: string;
  icon: string;
}

export interface IEvent {
  _id: string;
  activity: IEventActivity;
  organizer: { _id: string; firstName: string; lastName?: string; username: string };
  location: string;
  dateFrom: string;
  dateTo?: string;
  difficulty: 'beginner' | 'medium' | 'pro';
  spots: number;
  spotsFilled: number;
  alreadyGoing: number;
  transport: string;
  budget?: number;
  description?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export async function fetchAdminEvents(status?: string): Promise<IEvent[]> {
  const params = status ? { status } : {};
  const { data } = await api.get<ApiResponse<IEvent[]>>('/events/admin', { params });
  return data.data;
}

export async function updateEventStatus(id: string, status: 'approved' | 'rejected'): Promise<IEvent> {
  const { data } = await api.patch<ApiResponse<IEvent>>(`/events/${id}/status`, { status });
  return data.data;
}
