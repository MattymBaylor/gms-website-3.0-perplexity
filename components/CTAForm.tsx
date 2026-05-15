'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface FormState {
  first_name: string;
  business_name: string;
  business_address: string;
  phone: string;
}

const EMPTY: FormState = {
  first_name: '',
  business_name: '',
  business_address: '',
  phone: '',
};

export function CTAForm() {
  const [data, setData] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'ok' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const setField = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setData((d) => ({ ...d, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Light client-side validation
    if (!data.first_name.trim() || !data.business_name.trim() || !data.business_address.trim() || !data.phone.trim()) {
      setError('Please fill out every field.');
      return;
    }

    // Phone: allow common formats, require ≥ 10 digits
    const digits = data.phone.replace(/\D/g, '');
    if (digits.length < 10) {
      setError('Please enter a valid phone number.');
      return;
    }

    setStatus('submitting');
    try {
      // Primary path: server route that proxies to N8N (preferred on Vercel).
      let res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      // Fallback: in a fully static deploy the API route doesn't exist (404).
      // Post straight to N8N — same payload, same outcome.
      if (res.status === 404 || res.status === 405) {
        res = await fetch(
          'https://n8n.growthmindsetai.tech/webhook/44956247-3835-4500-87b4-dafc40c6b0a9',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          },
        );
      }
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus('ok');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  if (status === 'ok') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="card flex flex-col items-center gap-4 p-10 text-center"
      >
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.05, type: 'spring', stiffness: 200, damping: 18 }}
          className="rounded-full bg-success/10 p-4 text-success"
          aria-hidden="true"
        >
          <CheckCircle2 size={36} />
        </motion.div>
        <div>
          <h3 className="text-h2 font-semibold text-ink">You're in.</h3>
          <p className="mt-2 max-w-md text-ink-muted">
            Expect a call within 15 minutes. Our AI will research your business and
            walk you through a tailored demo — same way it would treat one of your
            customers.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card p-6 md:p-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field id="first_name" label="First Name" required>
          <input
            id="first_name"
            name="first_name"
            type="text"
            autoComplete="given-name"
            value={data.first_name}
            onChange={setField('first_name')}
            className="input"
            required
          />
        </Field>

        <Field id="business_name" label="Business Name" required>
          <input
            id="business_name"
            name="business_name"
            type="text"
            autoComplete="organization"
            value={data.business_name}
            onChange={setField('business_name')}
            className="input"
            required
          />
        </Field>

        <Field
          id="business_address"
          label="Business Address"
          hint="Used to pull your Google reviews and tailor the demo."
          required
          className="md:col-span-2"
        >
          <input
            id="business_address"
            name="business_address"
            type="text"
            autoComplete="street-address"
            value={data.business_address}
            onChange={setField('business_address')}
            className="input"
            required
          />
        </Field>

        <Field
          id="phone"
          label="Phone"
          hint="Mobile preferred — our AI will call you within 15 minutes to show you the full demo, including follow-up texts and other features."
          required
          className="md:col-span-2"
        >
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={data.phone}
            onChange={setField('phone')}
            className="input"
            placeholder="(555) 123-4567"
            required
          />
        </Field>
      </div>

      {error && (
        <p role="alert" className="mt-4 text-sm text-red-400">
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Sending…
            </>
          ) : (
            'Start My Demo'
          )}
        </button>
        <p className="text-xs text-ink-dim">
          Prefer to talk to a human?{' '}
          <a
            href="https://cal.com/matt-growthmindset"
            target="_blank"
            rel="noopener noreferrer"
            className="link-accent"
          >
            Schedule a call with Matt →
          </a>
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  hint,
  required,
  children,
  className = '',
}: {
  id: string;
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required && <span className="ml-1 text-cta">*</span>}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-ink-dim">{hint}</p>}
    </div>
  );
}
