import type { ReactNode } from 'react';

interface FormCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export const FormCard: React.FC<FormCardProps> = ({ title, description, children, footer }) => {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 shadow-xl shadow-slate-950/40">
      <div className="mb-6 space-y-2">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        {description ? <p className="text-sm text-slate-400">{description}</p> : null}
      </div>
      <div className="space-y-4">{children}</div>
      {footer ? <div className="mt-6 border-t border-slate-800 pt-4 text-sm text-slate-400">{footer}</div> : null}
    </section>
  );
};
