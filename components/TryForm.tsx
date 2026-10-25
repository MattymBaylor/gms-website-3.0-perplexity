'use client';

import { AlertTriangle, Loader2, PhoneCall, Clock, Ban } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * Demo Blitz form for /try. Posts to /api/blitz, which answers 2xx only after
 * the lead is stored. Every success state below is driven by the `state` the
 * server returned — never assumed client-side.
 *
 * Email is collected because every lead form on this site collects it (house
 * rule) and because the follow-ups (missed call, after hours, after the call)
 * go by email. Its destination is wired in the n8n workflow.
 */

const CONSENT_TEXT =
  'By submitting, I agree that Growth Mindset AI may call the number I provided, using an AI-generated voice, for a product demo, and may follow up by email. Consent is not a condition of purchase. Reply STOP or ask the agent to stop calls at any time.';

const CALLER_ID = '(239) 363-5760';
const BROWSER_DEMO = '/demo';

type Status = 'idle' | 'submitting' | 'calling' | 'after_hours' | 'rate_limited' | 'dnc' | 'held' | 'error';

export function TryForm() {
  const [first, setFirst] = useState('');
  const [website, setWebsite] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [consent, setConsent] = useState(false);
  const [k, setK] = useState('');
  const [source, setSource] = useState<'try' | 'chatgpt' | 'salesnav'>('try');
  const [prefilled, setPrefilled] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  // Sales Navigator personal links: /try?k=<key> opens with their name and site filled in.
  useEffect(() => {
    let q: URLSearchParams;
    try {
      q = new URLSearchParams(window.location.search);
    } catch {
      return;
    }
    const utm = (q.get('utm_source') || '').toLowerCase();
    if (utm.includes('chatgpt') || utm.includes('openai')) setSource('chatgpt');
    const key = (q.get('k') || '').trim();
    if (!/^[a-z0-9]{3,40}$/i.test(key)) return;
    setK(key);
    setSource('salesnav');
    fetch(`/api/blitz?k=${encodeURIComponent(key)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d?.ok) return;
        if (d.first_name) setFirst(d.first_name);
        if (d.website) setWebsite(d.website.replace(/^https?:\/\//, ''));
        if (d.company_name) setCompany(d.company_name);
        setPrefilled(true);
      })
      .catch(() => {});
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!first.trim() || !website.trim() || !phone.trim() || !email.trim()) {
      setError('Please fill in all four fields.');
      return;
    }
    if (phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid US mobile number.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!/\.[a-z]{2,}/i.test(website.trim())) {
      setError('Please enter your company website, like abcroofing.com.');
      return;
    }
    if (!consent) {
      setError('Please tick the box so she is allowed to call you.');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/blitz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source,
          k,
          first_name: first.trim(),
          website: website.trim(),
          phone: phone.trim(),
          email: email.trim(),
          company_name: company,
          consent: true,
          consent_text: CONSENT_TEXT,
        }),
      });
      const d = await res.json().catch(() => null);
      if (!res.ok || !d?.ok) {
        if (res.status === 422 && Array.isArray(d?.fields) && d.fields.includes('website')) {
          setStatus('idle');
          setError('We couldn’t read that website address. Check it and try again.');
          return;
        }
        setStatus('error');
        return;
      }
      const map: Record<string, Status> = {
        calling: 'calling',
        after_hours: 'after_hours',
        rate_limited: 'rate_limited',
        dnc: 'dnc',
        hold_dnc_check_failed: 'held',
      };
      setStatus(map[d.state] || 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status !== 'idle' && status !== 'submitting') {
    return <Result status={status} onRetry={() => setStatus('idle')} />;
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card p-6 sm:p-8">
      <h1 className="text-2xl font-semibold leading-tight text-ink sm:text-3xl">
        {prefilled && first
          ? `Hi ${first}, Christina already read ${website}.`
          : 'Your AI receptionist calls you in 60 seconds'}
      </h1>
      <p className="mt-3 text-ink-muted">
        {prefilled
          ? 'Enter your mobile and she’ll call you.'
          : 'Give us your website. She reads it, learns your services, and calls your cell. Try to stump her.'}
      </p>

      <div className="mt-6 grid gap-4">
        <Field id="first_name" label="First name">
          <input id="first_name" className="input" autoComplete="given-name" value={first}
            onChange={(e) => setFirst(e.target.value)} />
        </Field>
        <Field id="website" label="Company website">
          <input id="website" className="input" inputMode="url" autoComplete="url" placeholder="abcroofing.com"
            value={website} onChange={(e) => setWebsite(e.target.value)} />
        </Field>
        <Field id="phone" label="Mobile number">
          <input id="phone" type="tel" className="input" autoComplete="tel" placeholder="(555) 123-4567"
            value={phone} onChange={(e) => setPhone(e.target.value)} />
        </Field>
        <Field id="email" label="Email" hint="If you miss her, we email you a link to talk to her in your browser.">
          <input id="email" type="email" className="input" autoComplete="email" placeholder="you@yourcompany.com"
            value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
      </div>

      <label htmlFor="consent" className="mt-5 flex items-start gap-3 rounded-btn border border-border bg-bg-elevated/40 p-4 text-xs leading-relaxed text-ink-muted">
        <input id="consent" type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-accent" />
        <span>
          {CONSENT_TEXT}{' '}
          <a href="/privacy" target="_blank" rel="noopener noreferrer" className="link-accent">Privacy Policy</a>
        </span>
      </label>

      {error && (
        <p role="alert" className="mt-4 text-sm text-red-400">
          {error}
        </p>
      )}

      <button type="submit" disabled={status === 'submitting'}
        className="btn-primary mt-5 w-full justify-center py-4 text-lg disabled:cursor-not-allowed disabled:opacity-60">
        {status === 'submitting' ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Sending…
          </>
        ) : (
          'Call me now'
        )}
      </button>
      <p className="mt-3 text-center text-xs text-ink-dim">
        One call, about 2 minutes. Your number is used only for this demo.
      </p>
    </form>
  );
}

function Result({ status, onRetry }: { status: Status; onRetry: () => void }) {
  const browser = (
    <a href={BROWSER_DEMO} className="btn-ghost mt-2">
      Talk in my browser
    </a>
  );
  const view: Record<string, { icon: React.ReactNode; title: string; body: React.ReactNode; extra?: React.ReactNode }> = {
    calling: {
      icon: <PhoneCall size={36} />,
      title: 'Dialing you now.',
      body: <>Pick up. Christina is calling from <strong className="text-ink">{CALLER_ID}</strong>.</>,
    },
    after_hours: {
      icon: <Clock size={36} />,
      title: 'She’ll call you at 8am.',
      body: 'It’s after hours where you are, so she’ll call at 8am. Or talk to her right now in your browser.',
      extra: browser,
    },
    rate_limited: {
      icon: <Clock size={36} />,
      title: 'She just called this number.',
      body: 'Give it 10 minutes, or talk to her in your browser.',
      extra: browser,
    },
    dnc: {
      icon: <Ban size={36} />,
      title: 'We won’t call this number.',
      body: 'This number asked us not to call it again, so we won’t. You can still talk to her in your browser.',
      extra: browser,
    },
    held: {
      icon: <AlertTriangle size={36} />,
      title: 'Got it, but the call didn’t start.',
      body: 'Your request was saved, but we couldn’t start the call automatically. Matt will follow up. Or talk to her in your browser now.',
      extra: browser,
    },
    error: {
      icon: <AlertTriangle size={36} />,
      title: 'That didn’t go through.',
      body: 'That didn’t go through, and nothing was sent. Try again, or talk to her in your browser instead.',
      extra: (
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={onRetry} className="btn-primary">Try again</button>
          <a href={BROWSER_DEMO} className="btn-ghost">Talk in my browser</a>
        </div>
      ),
    },
  };
  const v = view[status] || view.error;
  return (
    <div className="card flex flex-col items-center gap-4 p-8 text-center" role="status" aria-live="polite">
      <div className={`rounded-full p-4 ${status === 'error' || status === 'held' ? 'bg-cta/10 text-cta' : 'bg-success/10 text-success'}`} aria-hidden="true">
        {v.icon}
      </div>
      <h2 className="text-2xl font-semibold text-ink">{v.title}</h2>
      <p className="max-w-sm text-ink-muted">{v.body}</p>
      {v.extra}
    </div>
  );
}

function Field({ id, label, hint, children }: { id: string; label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-ink-dim">{hint}</p>}
    </div>
  );
}
