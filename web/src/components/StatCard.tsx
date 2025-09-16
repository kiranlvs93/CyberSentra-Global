interface StatCardProps {
  label: string;
  value: string | number;
  accent?: string;
  subtext?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, accent = '', subtext }) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
      <p className="text-sm uppercase tracking-wide text-slate-400">{label}</p>
      <div className="mt-3 flex items-baseline gap-3">
        <span className="text-3xl font-semibold text-white">{value}</span>
        {accent ? <span className="text-xs text-accent">{accent}</span> : null}
      </div>
      {subtext ? <p className="mt-2 text-xs text-slate-500">{subtext}</p> : null}
    </div>
  );
};
