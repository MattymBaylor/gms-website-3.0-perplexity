'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

interface FormState {
  first_name: string;
  business_name: string;
  phone: string;
  email: string;
  website: string;
  sms_consent: boolean;
}

const EMPTY: FormState = {
  first_name: '',
  business_name: '',
  phone: '',
  email: '',
  website: '',
  // SMS consent must be opt-in: unchecked by default (A2P 10DLC requirement).
  sms_consent: false,
};

const CONSENT_LANGUAGE =
  'I agree to receive SMS messages from Growth Mindset regarding my inquiry, appointments, requested services, and account updates. Message frequency varies. Message and data rates may apply. Reply STOP to opt out and HELP for assistance. Consent is not a condition of purchase.';

export function CTAForm() {
  const [data, setData] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'ok' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const setField =
    (k: keyof Omit<FormState, 'sms_consent'>) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setData((d) => ({ ...d, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !data.first_name.trim() ||
      !data.business_name.trim() ||
      !data.phone.trim() ||
      !data.email.trim()
    ) {
      setError('Please fill out every required field.');
      return;
    }

    // Phone: allow common formats, require >= 10 digits
    if (data.phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid phone number.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim())) {
      setError('Please enter a valid email address — this is where your demo gets sent.');
      return;
    }

    if (!data.sms_consent) {
      setError('Please check the box to agree to receive SMS messages so we can text you about your demo.');
      return;
    }

    setStatus('submitting');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: data.first_name.trim(),
          business_name: data.business_name.trim(),
          phone: data.phone.trim(),
          email: data.email.trim(),
          website: data.website.trim(),
          sms_consent: true,
          // Capture the moment consent was given for the compliance record.
          sms_consent_timestamp: new Date().toISOString(),
          consent_language: CONSENT_LANGUAGE,
          source: typeof window !== 'undefined' ? window.location.href : 'growthmindset.ai',
        }),
      });

      // Only ever claim success when the server actually confirmed receipt.
      // A silent "thanks!" that sent nothing is what this form used to do.
      if (!res.ok) {
        setStatus('error');
        setError(null);
        return;
      }

      setStatus('ok');
    } catch {
      setStatus('error');
      setError(null);
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
          <h3 className="text-h2 font-semibold text-ink">
            We&apos;re building your agent.
          </h3>
          <p className="mt-3 max-w-md text-ink-muted">
            <strong className="text-ink">Within 24 hours you&apos;ll get an email</strong> with a
            voice agent trained on {data.business_name.trim() || 'your business'} — your services,
            your service area, your reviews. One click activates it, and you can call it yourself.
          </p>
          <p className="mt-4 max-w-md text-sm text-ink-dim">
            Check <span className="text-ink-muted">{data.email.trim()}</span> — a confirmation is on
            its way now.
          </p>
        </div>
        <a href="/demo" className="btn-ghost mt-2">
          Don&apos;t want to wait? Talk to a live agent now
        </a>
      </motion.div>
    );
  }

  if (status === 'error') {
    const mailtoFallback = `mailto:matt@growthmindset.ai?subject=${encodeURIComponent(
      `Demo request — ${data.business_name}`,
    )}&body=${encodeURIComponent(
      [
        `First Name: ${data.first_name}`,
        `Business Name: ${data.business_name}`,
        `Phone: ${data.phone}`,
        `Email: ${data.email}`,
        `Website: ${data.website || '—'}`,
        '',
        `SMS Consent: Yes — opted in on ${new Date().toISOString()}`,
      ].join('\n'),
    )}`;

    return (
      <div className="card flex flex-col items-center gap-4 p-10 text-center">
        <div className="rounded-full bg-cta/10 p-4 text-cta" aria-hidden="true">
          <AlertTriangle size={36} />
        </div>
        <div>
          <h3 className="text-h2 font-semibold text-ink">That didn&apos;t go through.</h3>
          <p className="mt-2 max-w-md text-ink-muted">
            Something on our end failed — your request was <strong>not</strong> received. Rather
            than pretend otherwise, here are two ways to reach us that work right now.
          </p>
        </div>
        <div className="mt-2 flex flex-col items-stretch gap-3 sm:flex-row">
          <button type="button" onClick={() => setStatus('idle')} className="btn-primary">
            Try again
          </button>
          <a href={mailtoFallback} className="btn-ghost">
            Email it to Matt instead
          </a>
        </div>
      </div>
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

        <Field id="phone" label="Phone" required>
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

        <Field
          id="email"
          label="Email"
          hint="Where we send your finished agent."
          required
        >
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={data.email}
            onChange={setField('email')}
            className="input"
            placeholder="you@yourcompany.com"
            required
          />
        </Field>

        <Field
          id="website"
          label="Website"
          hint="Optional — helps us learn your services and pull your reviews so the agent sounds like your business."
          className="md:col-span-2"
        >
          <input
            id="website"
            name="website"
            type="text"
            autoComplete="url"
            value={data.website}
            onChange={setField('website')}
            className="input"
            placeholder="yourcompany.com"
          />
        </Field>
      </div>

      {/* A2P 10DLC SMS consent — unchecked by default, standalone (not bundled
          with any other agreement), placed directly above the submit button. */}
      <div className="mt-6 rounded-btn border border-border bg-bg-elevated/40 p-4">
        <label htmlFor="sms_consent" className="flex items-start gap-3 text-sm text-ink-muted">
          <input
            id="sms_consent"
            name="sms_consent"
            type="checkbox"
            checked={data.sms_consent}
            onChange={(e) => setData((d) => ({ ...d, sms_consent: e.target.checked }))}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-accent"
          />
          <span>{CONSENT_LANGUAGE}</span>
        </label>
        <p className="mt-2 pl-7 text-xs text-ink-dim">
          See our{' '}
          <a href="/privacy" className="link-accent" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>{' '}
          and{' '}
          <a href="/terms" className="link-accent" target="_blank" rel="noopener noreferrer">
            Terms &amp; Conditions
          </a>
          .
        </p>
      </div>

      {error && (
        <p role="alert" className="mt-4 text-sm text-red-400">
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-col items-stretch gap-3">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-primary w-full justify-center py-4 text-lg disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Sending…
            </>
          ) : (
            'Get My Free Demo'
          )}
        </button>
        <p className="text-center text-xs text-ink-dim">
          Free. No card, no call required. Your agent arrives by email within 24 hours.
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
