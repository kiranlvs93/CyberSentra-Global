import { createContext, useContext, useEffect, useState, useCallback } from 'react';

import * as api from '../services/api';
import type { SessionInfo, User } from '../types';

interface RegistrationState {
  email: string;
  displayName?: string;
  options: unknown;
}

interface AuthContextValue {
  user: User | null;
  session: SessionInfo | null;
  loading: boolean;
  registration: RegistrationState | null;
  setRegistration: (state: RegistrationState | null) => void;
  updateAuth: (payload: { user: User; session: SessionInfo }) => void;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<SessionInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [registration, setRegistration] = useState<RegistrationState | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getSession();
      setUser(data.user ?? null);
      setSession(data.session ?? null);
    } catch (error) {
      setUser(null);
      setSession(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const updateAuth = (payload: { user: User; session: SessionInfo }) => {
    setUser(payload.user);
    setSession(payload.session);
  };

  const logout = async () => {
    await api.logout();
    setUser(null);
    setSession(null);
  };

  const value: AuthContextValue = {
    user,
    session,
    loading,
    registration,
    setRegistration,
    updateAuth,
    refresh,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};
