import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getAdminEvent } from '../services/api';

interface EventDetail {
  id: string;
  score: number;
  riskBucket: 'low' | 'medium' | 'high';
  typingAverage: number;
  typingVariance: number;
  mouseAverage: number;
  mouseVariance: number;
  createdAt: string;
  user: { email: string; displayName: string };
  session?: { _id: string; needsFallback: boolean; fallbackVerifiedAt?: string };
}

export const AdminEventDetailPage: React.FC = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getAdminEvent(id as string);
        setEvent(response as EventDetail);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load event');
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      void load();
    }
  }, [id]);

  if (loading) {
    return <div className="text-slate-400">Loading event...</div>;
  }

  if (error) {
    return <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>;
  }

  if (!event) {
    return null;
  }

  return (
    <div className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold text-white">Event {event.id}</h2>
        <p className="text-sm text-slate-400">
          Recorded {new Date(event.createdAt).toLocaleString()} for {event.user.displayName} ({event.user.email}).
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
          <h3 className="text-sm font-semibold text-slate-200">Scores</h3>
          <ul className="mt-3 space-y-1 text-sm text-slate-300">
            <li>Composite score: <span className="font-semibold text-white">{event.score}</span> ({event.riskBucket})</li>
            <li>Typing average: {event.typingAverage.toFixed(2)}</li>
            <li>Typing variance: {event.typingVariance.toFixed(3)}</li>
            <li>Mouse average: {event.mouseAverage.toFixed(2)}</li>
            <li>Mouse variance: {event.mouseVariance.toFixed(3)}</li>
          </ul>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
          <h3 className="text-sm font-semibold text-slate-200">Session status</h3>
          <p className="mt-3 text-sm text-slate-300">
            Session {event.session?._id ?? 'unknown'} {event.session?.needsFallback ? 'required' : 'did not require'} fallback.
          </p>
          {event.session?.fallbackVerifiedAt ? (
            <p className="text-xs text-slate-500">Fallback cleared {new Date(event.session.fallbackVerifiedAt).toLocaleString()}.</p>
          ) : (
            <p className="text-xs text-slate-500">Fallback not yet completed.</p>
          )}
        </div>
      </div>
    </div>
  );
};
