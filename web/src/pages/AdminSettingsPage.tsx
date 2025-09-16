import { useEffect, useState } from 'react';

import { getTenantSettings, updateTenantSettings } from '../services/api';
import type { TenantSettingsResponse } from '../types';

export const AdminSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<TenantSettingsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getTenantSettings();
        setSettings(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load settings');
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  const toggleFallback = async () => {
    if (!settings) {
      return;
    }
    setSaving(true);
    setError(null);
    setStatus(null);
    try {
      const response = await updateTenantSettings({ allowFallback: !settings.allowFallback });
      setSettings(response);
      setStatus(`Fallback ${response.allowFallback ? 'enabled' : 'disabled'}.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update fallback setting');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-slate-400">Loading settings...</div>;
  }

  if (!settings) {
    return null;
  }

  return (
    <div className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold text-white">Tenant settings</h2>
        <p className="text-sm text-slate-400">
          Manage operational toggles for this tenant. Configuration changes apply immediately to new sessions.
        </p>
      </header>
      <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4 text-sm text-slate-300">
        <p>Current risk threshold: <span className="font-semibold text-white">{settings.riskThreshold}</span></p>
        <p className="mt-1 text-slate-400">
          Modify the threshold in the Risk Controls panel to influence when fallback challenges are triggered.
        </p>
      </div>
      <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/50 p-4">
        <div>
          <p className="text-sm font-semibold text-slate-200">Fallback verification</p>
          <p className="text-xs text-slate-500">
            When disabled, risky sessions are blocked instead of requesting OTP or magic link challenges.
          </p>
        </div>
        <button
          onClick={toggleFallback}
          disabled={saving}
          className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
            settings.allowFallback
              ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          {saving ? 'Updating...' : settings.allowFallback ? 'Enabled' : 'Disabled'}
        </button>
      </div>
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
      {status ? <p className="text-sm text-emerald-400">{status}</p> : null}
      <p className="text-xs text-slate-500">
        Updated {new Date(settings.updatedAt).toLocaleString()} • API base {import.meta.env.VITE_API_BASE_URL}
      </p>
    </div>
  );
};
