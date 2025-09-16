import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FormCard } from '../components/FormCard';
import { useAuth } from '../hooks/useAuth';
import { usePasskey } from '../hooks/usePasskey';
import { assertionOptions, assertionVerify } from '../services/api';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { createAuthentication } = usePasskey();
  const { updateAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { options } = await assertionOptions(email);
      const credential = await createAuthentication(options);
      const response = await assertionVerify({ email, credential });
      if (response.user.role !== 'admin') {
        setError('This account does not have admin privileges.');
        setLoading(false);
        return;
      }
      updateAuth(response);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to authenticate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg">
      <FormCard
        title="Admin sign-in"
        description="Use your registered admin passkey to access tenant controls."
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-slate-300" htmlFor="email">
              Admin email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-white focus:border-primary focus:ring-2 focus:ring-primary/40"
              placeholder="admin@example.com"
            />
          </div>
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-slate-700"
          >
            {loading ? 'Verifying...' : 'Authenticate'}
          </button>
        </form>
      </FormCard>
    </div>
  );
};
