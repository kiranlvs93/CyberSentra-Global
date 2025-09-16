export interface User {
  id: string;
  email: string;
  displayName: string;
  role: 'user' | 'admin';
}

export interface SessionInfo {
  id: string;
  needsFallback: boolean;
  fallbackVerifiedAt?: string | null;
}

export interface RiskEventSummary {
  id: string;
  score: number;
  riskBucket: 'low' | 'medium' | 'high';
  createdAt: string;
  user: {
    email: string;
    displayName: string;
  };
}

export interface AdminMetrics {
  users: number;
  credentials: number;
  riskEvents: number;
  fallbackRequired: number;
  fallbackCleared: number;
  recentEvents: RiskEventSummary[];
  riskBuckets: Record<string, number>;
}

export interface TenantSettingsResponse {
  riskThreshold: number;
  allowFallback: boolean;
  updatedAt: string;
}

export interface RiskMetricsPayload {
  typing: {
    average: number;
    variance: number;
  };
  mouse: {
    average: number;
    variance: number;
  };
}
