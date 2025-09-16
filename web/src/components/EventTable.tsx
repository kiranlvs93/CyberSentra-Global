import type { RiskEventSummary } from '../types';

interface EventTableProps {
  events: RiskEventSummary[];
  onSelect?: (id: string) => void;
}

export const EventTable: React.FC<EventTableProps> = ({ events, onSelect }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800">
      <table className="min-w-full divide-y divide-slate-800">
        <thead className="bg-slate-900/80 text-xs uppercase tracking-wide text-slate-400">
          <tr>
            <th className="px-4 py-3 text-left">User</th>
            <th className="px-4 py-3 text-left">Score</th>
            <th className="px-4 py-3 text-left">Bucket</th>
            <th className="px-4 py-3 text-left">Timestamp</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800 bg-slate-900/40 text-sm">
          {events.map((event) => (
            <tr
              key={event.id}
              className="hover:bg-slate-800/50"
              onClick={() => onSelect?.(event.id)}
            >
              <td className="px-4 py-3">
                <div className="font-medium text-slate-200">{event.user.displayName}</div>
                <div className="text-xs text-slate-500">{event.user.email}</div>
              </td>
              <td className="px-4 py-3 text-slate-100">{event.score}</td>
              <td className="px-4 py-3 capitalize text-slate-200">{event.riskBucket}</td>
              <td className="px-4 py-3 text-slate-400">
                {new Date(event.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
          {events.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                No events recorded.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
};
