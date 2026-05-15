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
      // TODO: wire to Mailchimp / ConvertKit / N8N webhook.
      // Stubbed delay so the UI exercise feels real in development.
      await new Promise((r) => setTimeout(r, 600));
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
          <p className="eyebrow">Free guide</p>
          <h2 id="email-capture-heading" className="mt-3 text-h2 font-semibold text-ink">
            The True Cost of Missed Calls
          </h2>
          <p className="mt-3 text-ink-muted">
            Get the data. See what you're leaving on the table.
          </p>

          {status === 'ok' ? (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 inline-flex items-center gap-2 rounded-btn bg-success/10 px-4 py-3 text-success"
              role="status"
            >
              <CheckCircle2 size={18} />
              <span className="text-sm font-medium">Check your inbox — guide is on the way.</span>
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
