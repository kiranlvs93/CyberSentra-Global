import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  allowFallback?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowFallback = false }) => {
  const { loading, isAuthenticated, needsFallback } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-200">
        Loading session...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login/passkey" replace />;
  }

  if (needsFallback && !allowFallback) {
    return <Navigate to="/fallback" replace />;
  }

  return <Outlet />;
};
