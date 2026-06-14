'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface FormState {
  first_name: string;
  business_name: string;
  business_address: string;
  phone: string;
  sms_consent: boolean;
}

const EMPTY: FormState = {
  first_name: '',
  business_name: '',
  business_address: '',
  phone: '',
  // SMS consent must be opt-in: unchecked by default (A2P 10DLC requirement).
  sms_consent: false,
};

export function CTAForm() {
  const [data, setData] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'ok' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const setField = (k: keyof Omit<FormState, 'sms_consent'>) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setData((d) => ({ ...d, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
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

    // SMS consent must be explicitly granted before we can text the contact.
    if (!data.sms_consent) {
      setError('Please check the box to agree to receive SMS messages so we can text you about your demo.');
      return;
    }

    // Capture the moment consent was given for the compliance record.
    const consentTimestamp = new Date().toISOString();
    const consentLanguage =
      'I agree to receive SMS messages from Growth Mindset regarding my inquiry, appointments, requested services, and account updates. Message frequency varies. Message and data rates may apply. Reply STOP to opt out and HELP for assistance. Consent is not a condition of purchase.';

    // Send the request straight to Matt's inbox via the visitor's mail client.
    const subject = `Demo request — ${data.business_name}`;
    const body = [
      `First Name: ${data.first_name}`,
      `Business Name: ${data.business_name}`,
      `Business Address: ${data.business_address}`,
      `Phone: ${data.phone}`,
      '',
      `SMS Consent: Yes — opted in on ${consentTimestamp}`,
      `Consent Language: ${consentLanguage}`,
    ].join('\n');
    window.location.href = `mailto:matt@growthmindset.ai?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setStatus('ok');
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
          <h3 className="text-h2 font-semibold text-ink">Almost there.</h3>
          <p className="mt-2 max-w-md text-ink-muted">
            Your email app just opened with your demo request — hit send and it
            lands in Matt&apos;s inbox. We&apos;ll reach out shortly to set up your
            tailored demo.
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
          <span>
            I agree to receive SMS messages from Growth Mindset regarding my
            inquiry, appointments, requested services, and account updates.
            Message frequency varies. Message and data rates may apply. Reply
            STOP to opt out and HELP for assistance. Consent is not a condition
            of purchase.
          </span>
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
            'Request a Demo'
          )}
        </button>
        <p className="text-xs text-ink-dim">
          Prefer to talk to a human?{' '}
          <a
            href="mailto:matt@growthmindset.ai?subject=Schedule%20a%20call"
            className="link-accent"
          >
            Email Matt directly →
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
