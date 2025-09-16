import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FormCard } from '../components/FormCard';
import { useAuth } from '../hooks/useAuth';
import { enrollStart } from '../services/api';

export const RegisterEmailPage: React.FC = () => {
  const navigate = useNavigate();
  const { setRegistration } = useAuth();
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await enrollStart({ email, displayName });
      setRegistration({ email, displayName, options: response.options });
      navigate('/passkey/create');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start enrollment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormCard
      title="Register your email"
      description="We use your email to bind passkeys and deliver fallback challenges when risk is elevated."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-slate-300" htmlFor="email">
            Work email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-white focus:border-primary focus:ring-2 focus:ring-primary/40"
            placeholder="you@example.com"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-slate-300" htmlFor="displayName">
            Display name
          </label>
          <input
            id="displayName"
            type="text"
            required
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-white focus:border-primary focus:ring-2 focus:ring-primary/40"
            placeholder="Casey Morgan"
          />
        </div>
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-slate-700"
        >
          {loading ? 'Preparing passkey...' : 'Continue to passkey setup'}
        </button>
      </form>
    </FormCard>
  );
};
