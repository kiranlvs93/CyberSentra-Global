import { useMemo } from 'react';

import { useAuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const context = useAuthContext();
  const isAuthenticated = !!context.user;
  const isAdmin = context.user?.role === 'admin';
  const needsFallback = context.session?.needsFallback ?? false;

  return useMemo(
    () => ({
      ...context,
      isAuthenticated,
      isAdmin,
      needsFallback,
    }),
    [context, isAuthenticated, isAdmin, needsFallback],
  );
};
