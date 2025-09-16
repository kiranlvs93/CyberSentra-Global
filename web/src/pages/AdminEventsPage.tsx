import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { EventTable } from '../components/EventTable';
import { getAdminEvents } from '../services/api';
import type { RiskEventSummary } from '../types';

export const AdminEventsPage: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<RiskEventSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getAdminEvents();
        setEvents(
          response.events.map((event) => ({
            id: event.id,
            score: event.score,
            riskBucket: event.riskBucket,
            createdAt: event.createdAt,
            user: event.user,
          })),
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load events');
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  const handleSelect = (id: string) => {
    navigate(`/admin/events/${id}`);
  };

  if (loading) {
    return <div className="text-slate-400">Loading events...</div>;
  }

  if (error) {
    return <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>;
  }

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">Behavioral events</h2>
        <span className="text-xs text-slate-500">Click any row for full telemetry</span>
      </header>
      <EventTable events={events} onSelect={handleSelect} />
    </div>
  );
};
