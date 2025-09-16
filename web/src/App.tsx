import { Navigate, Route, Routes } from 'react-router-dom';

import { AdminLayout } from './components/AdminLayout';
import { AdminRoute } from './components/AdminRoute';
import { AppLayout } from './components/AppLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AddSecondaryPasskeyPage } from './pages/AddSecondaryPasskeyPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminEventDetailPage } from './pages/AdminEventDetailPage';
import { AdminEventsPage } from './pages/AdminEventsPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminRiskPage } from './pages/AdminRiskPage';
import { AdminSettingsPage } from './pages/AdminSettingsPage';
import { CreatePasskeyPage } from './pages/CreatePasskeyPage';
import { FallbackChallengePage } from './pages/FallbackChallengePage';
import { LoginPasskeyPage } from './pages/LoginPasskeyPage';
import { RegisterEmailPage } from './pages/RegisterEmailPage';
import { VerifyPage } from './pages/VerifyPage';
import { WelcomePage } from './pages/WelcomePage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<WelcomePage />} />
        <Route path="register" element={<RegisterEmailPage />} />
        <Route path="passkey">
          <Route path="create" element={<CreatePasskeyPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="add-secondary" element={<AddSecondaryPasskeyPage />} />
          </Route>
        </Route>
        <Route path="login">
          <Route path="passkey" element={<LoginPasskeyPage />} />
        </Route>
        <Route element={<ProtectedRoute allowFallback />}>
          <Route path="fallback" element={<FallbackChallengePage />} />
          <Route path="verify" element={<VerifyPage />} />
        </Route>
      </Route>

      <Route path="/admin">
        <Route path="login" element={<AdminLoginPage />} />
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="risk" element={<AdminRiskPage />} />
            <Route path="events" element={<AdminEventsPage />} />
            <Route path="events/:id" element={<AdminEventDetailPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
