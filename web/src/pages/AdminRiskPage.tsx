import { useEffect, useState } from 'react';

import { getTenantSettings, updateTenantSettings } from '../services/api';
import type { TenantSettingsResponse } from '../types';

export const AdminRiskPage: React.FC = () => {
  const [settings, setSettings] = useState<TenantSettingsResponse | null>(null);
  const [threshold, setThreshold] = useState(65);
  const [allowFallback, setAllowFallback] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getTenantSettings();
        setSettings(response);
        setThreshold(response.riskThreshold);
        setAllowFallback(response.allowFallback);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load settings');
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setStatus(null);
    try {
      const response = await updateTenantSettings({ riskThreshold: threshold, allowFallback });
      setSettings(response);
      setStatus('Risk policy updated.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-slate-400">Loading risk controls...</div>;
  }

  return (
    <div className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold text-white">Adaptive risk policy</h2>
        <p className="text-sm text-slate-400">
          Tune the threshold at which fallback challenges are triggered. Lower scores enforce stronger scrutiny, while higher scores favor convenience.
        </p>
      </header>
      <div className="space-y-4">
        <label className="block text-sm text-slate-300">
          Risk threshold: <span className="font-semibold text-white">{threshold}</span>
        </label>
        <input
          type="range"
          min={0}
          max={100}
          value={threshold}
          onChange={(event) => setThreshold(Number(event.target.value))}
          className="w-full accent-primary"
        />
        <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4 text-sm text-slate-300">
          <p>Current setting requires fallbacks when risk score ≥ {threshold}.</p>
          <p className="mt-1 text-xs text-slate-500">Scores above 80 are typically flagged as high risk.</p>
        </div>
        <label className="flex items-center gap-3 text-sm text-slate-300">
          <input
            type="checkbox"
            checked={allowFallback}
            onChange={(event) => setAllowFallback(event.target.checked)}
            className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-primary focus:ring-primary"
          />
          Allow OTP and magic link fallbacks
        </label>
      </div>
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
      {status ? <p className="text-sm text-emerald-400">{status}</p> : null}
      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-slate-700"
      >
        {saving ? 'Saving...' : 'Save policy'}
      </button>
      {settings ? (
        <p className="text-xs text-slate-500">
          Last updated {new Date(settings.updatedAt).toLocaleString()}.
        </p>
      ) : null}
    </div>
  );
};
