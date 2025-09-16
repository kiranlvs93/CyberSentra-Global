import { FormEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { FormCard } from '../components/FormCard';
import { useAuth } from '../hooks/useAuth';
import { verifyMagicLink, verifyOtp } from '../services/api';

export const VerifyPage: React.FC = () => {
  const [params] = useSearchParams();
  const { refresh } = useAuth();
  const token = params.get('token');
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      return;
    }
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await verifyMagicLink(token);
        if (response?.success) {
          setStatus('Magic link verified successfully.');
          await refresh();
        } else {
          setError('Magic link could not be verified.');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Magic link failed');
      } finally {
        setLoading(false);
      }
    };
    void run();
  }, [token, refresh]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await verifyOtp(code);
      if (response.success) {
        setStatus('Code verified. You are fully authenticated.');
        await refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Code verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormCard
      title="Complete fallback verification"
      description="Enter the one-time code from your email, or follow the magic link to finalize this session."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-slate-300" htmlFor="code">
            Six-digit code
          </label>
          <input
            id="code"
            type="text"
            pattern="[0-9]{6}"
            inputMode="numeric"
            maxLength={6}
            value={code}
            onChange={(event) => setCode(event.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-white focus:border-primary focus:ring-2 focus:ring-primary/40"
            placeholder="123456"
          />
        </div>
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        {status ? <p className="text-sm text-emerald-400">{status}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-slate-700"
        >
          {loading ? 'Verifying...' : 'Verify code'}
        </button>
      </form>
    </FormCard>
  );
};
