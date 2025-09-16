import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FormCard } from '../components/FormCard';
import { useAuth } from '../hooks/useAuth';
import { usePasskey } from '../hooks/usePasskey';
import { enrollFinish } from '../services/api';

export const CreatePasskeyPage: React.FC = () => {
  const navigate = useNavigate();
  const { registration, setRegistration, updateAuth } = useAuth();
  const { createRegistration } = usePasskey();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!registration) {
      navigate('/register');
    }
  }, [registration, navigate]);

  const handleCreate = async () => {
    if (!registration) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const credential = await createRegistration(registration.options);
      const response = await enrollFinish({ email: registration.email, credential });
      updateAuth(response);
      setRegistration(null);
      navigate('/passkey/add-secondary');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create passkey');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormCard
      title="Create your primary passkey"
      description="Use your platform authenticator (Touch ID, Windows Hello, or equivalent) to finish registration."
      footer="Passless stores only the credential public key and counter—never your biometric data."
    >
      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          When prompted, choose the authenticator you trust most for daily sign-ins. You can add additional devices after this step.
        </p>
        {error ? <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-200">{error}</p> : null}
        <button
          onClick={handleCreate}
          disabled={loading}
          className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-slate-700"
        >
          {loading ? 'Waiting for authenticator...' : 'Create passkey'}
        </button>
      </div>
    </FormCard>
  );
};
