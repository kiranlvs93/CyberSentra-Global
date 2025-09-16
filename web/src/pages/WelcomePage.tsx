import { Link } from 'react-router-dom';

export const WelcomePage: React.FC = () => {
  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
      <section className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/80 to-slate-900/40 p-10 shadow-2xl shadow-slate-950/50">
        <div className="space-y-4">
          <span className="inline-flex items-center rounded-full bg-slate-800 px-4 py-1 text-xs uppercase tracking-[0.3em] text-slate-400">
            passwordless access
          </span>
          <h1 className="text-4xl font-semibold text-white lg:text-5xl">
            Sign in instantly with passkeys, backed by adaptive risk intelligence.
          </h1>
          <p className="text-slate-400">
            Passless unifies WebAuthn, behavioral signals, and frictionless fallbacks so your users stay secure without ever touching a password.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/register"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-primary/90"
            >
              Create your passkey
            </Link>
            <Link
              to="/login/passkey"
              className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-800"
            >
              Use existing passkey
            </Link>
          </div>
        </div>
      </section>
      <section className="grid gap-4 lg:gap-6">
        <article className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <h3 className="text-lg font-semibold text-white">Passkey-first authentication</h3>
          <p className="mt-2 text-sm text-slate-400">
            Guided enrollment flows help end-users register their primary and secondary authenticators with a few clicks.
          </p>
        </article>
        <article className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <h3 className="text-lg font-semibold text-white">Behavioral risk scoring</h3>
          <p className="mt-2 text-sm text-slate-400">
            Typing cadence and pointer variance feed a continuous trust score to determine when fallbacks are required.
          </p>
        </article>
        <article className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <h3 className="text-lg font-semibold text-white">Fallbacks that respect privacy</h3>
          <p className="mt-2 text-sm text-slate-400">
            OTPs and magic links are delivered on-demand, ensuring only derived metrics leave the browser.
          </p>
        </article>
      </section>
    </div>
  );
};
