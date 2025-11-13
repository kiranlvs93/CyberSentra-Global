import { Outlet } from 'react-router-dom';

import { Footer } from './footer/Footer';
import { Navbar } from './navigation/Navbar';

export function MainLayout() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
