interface RiskDistributionProps {
  data: Record<string, number>;
}

const BUCKET_COLORS: Record<string, string> = {
  low: 'bg-emerald-500/70',
  medium: 'bg-amber-500/70',
  high: 'bg-red-500/70',
};

export const RiskDistribution: React.FC<RiskDistributionProps> = ({ data }) => {
  const entries = Object.entries(data);
  const total = entries.reduce((acc, [, value]) => acc + value, 0);

  if (total === 0) {
    return <p className="text-sm text-slate-500">No events yet.</p>;
  }

  return (
    <div className="space-y-3">
      <div className="flex overflow-hidden rounded-full border border-slate-800">
        {entries.map(([bucket, value]) => (
          <div
            key={bucket}
            className={`${BUCKET_COLORS[bucket] ?? 'bg-slate-600'} h-3`}
            style={{ width: `${(value / total) * 100}%` }}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4 text-xs text-slate-400">
        {entries.map(([bucket, value]) => (
          <div key={bucket} className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${BUCKET_COLORS[bucket] ?? 'bg-slate-600'}`} />
            <span className="capitalize">{bucket}</span>
            <span className="ml-auto text-slate-300">{Math.round((value / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
