import { useState } from 'react';

import { FormCard } from '../components/FormCard';
import { useAuth } from '../hooks/useAuth';
import { sendMagicLink, sendOtp } from '../services/api';

export const FallbackChallengePage: React.FC = () => {
  const { session } = useAuth();
  const [otpStatus, setOtpStatus] = useState<string | null>(null);
  const [magicStatus, setMagicStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingTarget, setLoadingTarget] = useState<'otp' | 'magic' | null>(null);

  const handleSendOtp = async () => {
    setError(null);
    setLoadingTarget('otp');
    try {
      await sendOtp();
      setOtpStatus('One-time code sent to your email.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to send OTP');
    } finally {
      setLoadingTarget(null);
    }
  };

  const handleSendMagicLink = async () => {
    setError(null);
    setLoadingTarget('magic');
    try {
      await sendMagicLink();
      setMagicStatus('Magic link dispatched. Check your inbox to verify this session.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to send magic link');
    } finally {
      setLoadingTarget(null);
    }
  };

  return (
    <FormCard
      title="Additional verification required"
      description="Your recent behavior deviated from your typical profile. Complete one of the fallbacks to continue."
      footer="Fallbacks are single-use and expire in ten minutes."
    >
      <div className="space-y-4">
        <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
          Session {session?.id} flagged at elevated risk.
        </div>
        {error ? <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-200">{error}</p> : null}
        <div className="space-y-3">
          <button
            onClick={handleSendOtp}
            disabled={loadingTarget === 'otp'}
            className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-slate-700"
          >
            {loadingTarget === 'otp' ? 'Sending code...' : 'Send verification code'}
          </button>
          {otpStatus ? <p className="text-xs text-slate-400">{otpStatus}</p> : null}
        </div>
        <div className="space-y-3">
          <button
            onClick={handleSendMagicLink}
            disabled={loadingTarget === 'magic'}
            className="w-full rounded-xl border border-slate-700 bg-transparent py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:text-slate-500"
          >
            {loadingTarget === 'magic' ? 'Sending link...' : 'Email me a magic link'}
          </button>
          {magicStatus ? <p className="text-xs text-slate-400">{magicStatus}</p> : null}
        </div>
      </div>
    </FormCard>
  );
};
