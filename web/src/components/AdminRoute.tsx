import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

export const AdminRoute: React.FC = () => {
  const { loading, isAuthenticated, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-200">
        Loading admin session...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
