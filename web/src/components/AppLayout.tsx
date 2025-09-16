import { Link, NavLink, Outlet } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

export const AppLayout: React.FC = () => {
  const { user, logout } = useAuth();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-primary text-white' : 'text-slate-200 hover:bg-slate-800'}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-lg font-semibold text-white">
            Passless
          </Link>
          <nav className="flex items-center gap-2">
            <NavLink to="/register" className={navLinkClass}>
              Register
            </NavLink>
            <NavLink to="/login/passkey" className={navLinkClass}>
              Sign in
            </NavLink>
            {user ? (
              <button
                onClick={() => logout()}
                className="rounded-md bg-slate-800 px-3 py-2 text-sm text-slate-200 hover:bg-slate-700"
              >
                Logout
              </button>
            ) : null}
          </nav>
        </div>
      </header>
      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
};
