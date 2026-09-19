import { getAuth } from 'firebase/auth';
import { ICalendar } from '../store/calendars.reducer';
import { IEvent } from '../store/events.reducer';

const API_BASE_URL = 'http://localhost:3000';

export const getAuthHeaders = async (): Promise<Record<string, string>> => {
  const token = await getAuth().currentUser?.getIdToken();

  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> => {
  const headers = await getAuthHeaders();

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers ?? {}),
    },
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(payload?.message ?? 'Request failed');
  }

  return payload?.data ?? payload;
};

export const calendarsApi = {
  list: () => apiRequest<ICalendar[]>('/calendars'),
  create: (calendar: Omit<ICalendar, 'id'>) =>
    apiRequest<ICalendar>('/calendars', {
      method: 'POST',
      body: JSON.stringify(calendar),
    }),
  update: (calendar: ICalendar) =>
    apiRequest<ICalendar>(`/calendars/${calendar.id}`, {
      method: 'PUT',
      body: JSON.stringify(calendar),
    }),
  delete: (id: string | number) =>
    apiRequest<void>(`/calendars/${id}`, { method: 'DELETE' }),
};

export const eventsApi = {
  list: () => apiRequest<IEvent[]>('/events'),
  create: (event: Omit<IEvent, 'id'>) =>
    apiRequest<IEvent>('/events', {
      method: 'POST',
      body: JSON.stringify(event),
    }),
  update: (event: IEvent) =>
    apiRequest<IEvent>(`/events/${event.id}`, {
      method: 'PUT',
      body: JSON.stringify(event),
    }),
  delete: (id: string | number) =>
    apiRequest<void>(`/events/${id}`, { method: 'DELETE' }),
  deleteByCalendar: (calendarId: string | number) =>
    apiRequest<void>(`/events/all/${calendarId}`, { method: 'DELETE' }),
};
