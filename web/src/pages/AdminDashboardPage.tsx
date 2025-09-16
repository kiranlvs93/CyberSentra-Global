import { useEffect, useState } from 'react';

import { EventTable } from '../components/EventTable';
import { RiskDistribution } from '../components/RiskDistribution';
import { StatCard } from '../components/StatCard';
import { getAdminMetrics } from '../services/api';
import type { AdminMetrics, RiskEventSummary } from '../types';

export const AdminDashboardPage: React.FC = () => {
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getAdminMetrics();
        setMetrics(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load metrics');
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  if (loading) {
    return <div className="text-slate-400">Loading metrics...</div>;
  }

  if (error) {
    return <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>;
  }

  if (!metrics) {
    return null;
  }

  const recentEvents: RiskEventSummary[] = metrics.recentEvents.map((event) => ({
    ...event,
    createdAt: event.createdAt,
  }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active users" value={metrics.users} accent="live" />
        <StatCard label="Passkeys" value={metrics.credentials} accent={`${metrics.credentials - metrics.users} backups`} />
        <StatCard label="Risk events" value={metrics.riskEvents} subtext={`${metrics.fallbackRequired} pending fallback`} />
        <StatCard label="Fallback cleared" value={metrics.fallbackCleared} subtext="Sessions recovered" />
      </div>
      <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <h3 className="text-lg font-semibold text-white">Risk distribution</h3>
          <p className="mt-2 text-sm text-slate-400">Breakdown of behavioral scores over the last 90 days.</p>
          <div className="mt-6">
            <RiskDistribution data={metrics.riskBuckets} />
          </div>
        </section>
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Recent events</h3>
            <span className="text-xs text-slate-500">Last 10 events</span>
          </div>
          <EventTable events={recentEvents} />
        </section>
      </div>
    </div>
  );
};
