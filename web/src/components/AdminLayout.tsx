import { Link, NavLink, Outlet } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

export const AdminLayout: React.FC = () => {
  const { logout, user } = useAuth();

  const navItem = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3 py-2 text-sm font-medium ${isActive ? 'bg-slate-700 text-white' : 'text-slate-300 hover:bg-slate-800'}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/admin/dashboard" className="text-lg font-semibold text-white">
            Passless Admin
          </Link>
          <div className="flex items-center gap-3 text-sm text-slate-300">
            <span>{user?.email}</span>
            <button
              onClick={() => logout()}
              className="rounded-md bg-slate-800 px-3 py-2 text-sm text-slate-200 hover:bg-slate-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <div className="mx-auto flex max-w-6xl gap-8 px-6 py-8">
        <aside className="w-60 space-y-2">
          <NavLink to="/admin/dashboard" className={navItem}>
            Overview
          </NavLink>
          <NavLink to="/admin/risk" className={navItem}>
            Risk Controls
          </NavLink>
          <NavLink to="/admin/events" className={navItem}>
            Events
          </NavLink>
          <NavLink to="/admin/settings" className={navItem}>
            Settings
          </NavLink>
        </aside>
        <main className="flex-1 space-y-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
