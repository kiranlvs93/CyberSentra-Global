import { useState } from 'react';

import { FormCard } from '../components/FormCard';
import { useAuth } from '../hooks/useAuth';
import { usePasskey } from '../hooks/usePasskey';
import { enrollFinish, enrollStart } from '../services/api';

export const AddSecondaryPasskeyPage: React.FC = () => {
  const { updateAuth } = useAuth();
  const { createRegistration } = usePasskey();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAdd = async () => {
    setError(null);
    setStatus(null);
    setLoading(true);
    try {
      const { options } = await enrollStart({});
      const credential = await createRegistration(options);
      const response = await enrollFinish({ credential });
      updateAuth(response);
      setStatus('Secondary passkey added successfully.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add passkey');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormCard
      title="Add a secondary passkey"
      description="Register another device or security key so you can recover quickly if your primary authenticator is unavailable."
    >
      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          We recommend adding at least one backup authenticator—such as a hardware key or a secondary device—to keep access resilient.
        </p>
        {status ? <p className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200">{status}</p> : null}
        {error ? <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-200">{error}</p> : null}
        <button
          onClick={handleAdd}
          disabled={loading}
          className="w-full rounded-xl border border-primary/50 bg-transparent py-3 text-sm font-semibold text-primary transition hover:bg-primary/10 disabled:cursor-not-allowed disabled:border-slate-700 disabled:text-slate-500"
        >
          {loading ? 'Waiting for authenticator...' : 'Register another passkey'}
        </button>
      </div>
    </FormCard>
  );
};
