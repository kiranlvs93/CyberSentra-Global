import type { AdminMetrics, RiskMetricsPayload, SessionInfo, TenantSettingsResponse, User } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

const buildUrl = (path: string) => `${API_BASE_URL}${path}`;

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Request failed');
  }
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  return null;
};

export const enrollStart = async (payload: { email?: string; displayName?: string }) => {
  const response = await fetch(buildUrl('/api/enroll/start'), {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(response) as Promise<{ options: unknown }>;
};

export const enrollFinish = async (payload: { email?: string; credential: unknown; nickname?: string }) => {
  const response = await fetch(buildUrl('/api/enroll/finish'), {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(response) as Promise<{ user: User; session: SessionInfo }>;
};

export const assertionOptions = async (email: string) => {
  const params = new URLSearchParams({ email });
  const response = await fetch(buildUrl(`/api/webauthn/assertion/options?${params.toString()}`), {
    credentials: 'include',
  });
  return handleResponse(response) as Promise<{ options: unknown }>;
};

export const assertionVerify = async (payload: { email: string; credential: unknown }) => {
  const response = await fetch(buildUrl('/api/webauthn/assertion/verify'), {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(response) as Promise<{ user: User; session: SessionInfo }>;
};

export const getSession = async () => {
  const response = await fetch(buildUrl('/api/session'), {
    credentials: 'include',
  });
  return handleResponse(response) as Promise<{ user: User | null; session?: SessionInfo }>;
};

export const logout = async () => {
  const response = await fetch(buildUrl('/api/session/logout'), {
    method: 'POST',
    credentials: 'include',
  });
  return handleResponse(response);
};

export const submitRisk = async (payload: RiskMetricsPayload) => {
  const response = await fetch(buildUrl('/api/risk/score'), {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(response) as Promise<{
    score: number;
    riskBucket: 'low' | 'medium' | 'high';
    threshold: number;
    needsFallback: boolean;
    eventId: string;
  }>;
};

export const sendOtp = async () => {
  const response = await fetch(buildUrl('/api/fallback/otp/send'), {
    method: 'POST',
    credentials: 'include',
  });
  return handleResponse(response);
};

export const verifyOtp = async (code: string) => {
  const response = await fetch(buildUrl('/api/fallback/otp/verify'), {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });
  return handleResponse(response) as Promise<{ success: boolean }>;
};

export const sendMagicLink = async () => {
  const response = await fetch(buildUrl('/api/fallback/magic-link'), {
    method: 'POST',
    credentials: 'include',
  });
  return handleResponse(response);
};

export const verifyMagicLink = async (token: string) => {
  const params = new URLSearchParams({ token });
  const response = await fetch(buildUrl(`/api/fallback/magic-link/verify?${params.toString()}`), {
    credentials: 'include',
  });
  return handleResponse(response) as Promise<{ success: boolean }>;
};

export const getAdminMetrics = async () => {
  const response = await fetch(buildUrl('/api/admin/metrics'), {
    credentials: 'include',
  });
  return handleResponse(response) as Promise<AdminMetrics>;
};

export const getAdminEvents = async () => {
  const response = await fetch(buildUrl('/api/admin/events'), {
    credentials: 'include',
  });
  return handleResponse(response) as Promise<{
    events: Array<{
      id: string;
      score: number;
      riskBucket: 'low' | 'medium' | 'high';
      typingAverage: number;
      typingVariance: number;
      mouseAverage: number;
      mouseVariance: number;
      createdAt: string;
      user: { email: string; displayName: string };
    }>;
  }>;
};

export const getAdminEvent = async (id: string) => {
  const response = await fetch(buildUrl(`/api/admin/events/${id}`), {
    credentials: 'include',
  });
  return handleResponse(response);
};

export const getTenantSettings = async () => {
  const response = await fetch(buildUrl('/api/admin/settings'), {
    credentials: 'include',
  });
  return handleResponse(response) as Promise<TenantSettingsResponse>;
};

export const updateTenantSettings = async (payload: Partial<{ riskThreshold: number; allowFallback: boolean }>) => {
  const response = await fetch(buildUrl('/api/admin/settings'), {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(response) as Promise<TenantSettingsResponse>;
};
