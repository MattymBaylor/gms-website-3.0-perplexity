'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export function EmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'ok' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic email format validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, source: 'missed-call-guide' }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setStatus('error');
        setError(body?.error || 'Something went wrong. Try again.');
        return;
      }
      setStatus('ok');
    } catch {
      setStatus('error');
      setError('Something went wrong. Try again.');
    }
  };

  return (
    <section className="section" aria-labelledby="email-capture-heading">
      <div className="container-prose">
        <div className="card mx-auto max-w-2xl p-8 md:p-10 text-center">
          <p className="eyebrow">Free guide · Southwest Florida edition</p>
          <h2 id="email-capture-heading" className="mt-3 text-h2 font-semibold text-ink">
            The True Cost of Missed Calls
          </h2>
          <p className="mt-3 text-ink-muted">
            The complete guide for Southwest Florida service businesses — typical
            job values for twelve industries across Naples, Fort Myers, and Miami,
            and the exact math on what an unanswered phone costs you every month.
          </p>

          {status === 'ok' ? (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex flex-col items-center gap-4"
              role="status"
            >
              <span className="inline-flex items-center gap-2 rounded-btn bg-success/10 px-4 py-3 text-success">
                <CheckCircle2 size={18} />
                <span className="text-sm font-medium">You&apos;re in — here&apos;s your guide.</span>
              </span>
              <a
                href="/guides/the-true-cost-of-missed-calls.pdf"
                download
                className="btn-primary"
              >
                Download the guide (PDF)
              </a>
            </motion.div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="mt-6 flex flex-col gap-3 sm:flex-row"
              noValidate
            >
              <label htmlFor="lead-email" className="sr-only">
                Email address
              </label>
              <input
                id="lead-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@business.com"
                className="input flex-1"
                required
              />
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary disabled:opacity-60"
              >
                {status === 'submitting' ? 'Sending…' : 'Send Me the Guide'}
              </button>
            </form>
          )}

          {error && (
            <p role="alert" className="mt-3 text-sm text-red-400">
              {error}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
