'use client';

import { useState, FormEvent } from 'react';
import { Loader2, Trophy, AlertTriangle, Lightbulb, Sparkles } from 'lucide-react';

interface ValidateResponse {
  winnerMessage: string;
  whyItWon: string;
  objections: string[];
  improvedOptions: string[];
}

const SAMPLE = {
  audience:
    'Owners of US home-service businesses (HVAC, plumbing, roofing) doing $1M–$10M/yr who are sick of missed calls turning into lost jobs.',
  goal: 'Get them to book a free demo of our 24/7 AI voice agent that answers, qualifies, and schedules calls.',
  messages: [
    'Stop losing jobs to voicemail. Our AI answers every call 24/7 and books the work for you.',
    'Hire the receptionist that never sleeps, never quits, and never misses a lead.',
    'Most home-service businesses lose 30% of after-hours calls. We can fix that this week.',
  ].join('\n'),
};

export function ValidationPanel() {
  const [audience, setAudience] = useState('');
  const [goal, setGoal] = useState('');
  const [messagesText, setMessagesText] = useState('');
  // Optional on purpose. This is a tool, not a gate — making it required would
  // buy a few addresses and cost the try-it-instantly moment that gets people
  // to run it at all. Anyone who wants their results keeps them.
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ValidateResponse | null>(null);

  function loadSample() {
    setAudience(SAMPLE.audience);
    setGoal(SAMPLE.goal);
    setMessagesText(SAMPLE.messages);
    setError(null);
    setResult(null);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);

    const messages = messagesText
      .split('\n')
      .map((m) => m.trim())
      .filter(Boolean);

    if (!audience.trim() || !goal.trim() || messages.length < 2) {
      setError('Please fill all three fields, with at least 2 messages (one per line).');
      return;
    }

    // Fire-and-forget. A bad address, or a subscribe endpoint having a bad day,
    // must never stop someone getting their panel results.
    const trimmedEmail = email.trim();
    if (trimmedEmail && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmedEmail)) {
      fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail, source: 'ai-validation-panel' }),
      }).catch(() => {});
    }

    setLoading(true);
    try {
      const res = await fetch('/api/validate', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          audience: audience.trim(),
          goal: goal.trim(),
          messages,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'Something went wrong.');
      }
      setResult(data as ValidateResponse);
      // Scroll the result into view
      requestAnimationFrame(() => {
        document
          .getElementById('panel-result')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    } catch (err: any) {
      setError(err?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-12">
      {/* Form */}
      <form onSubmit={onSubmit} className="card p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-ink-muted">
            Paste your audience, goal, and a few message variants. The panel runs in
            ~15 seconds.
          </p>
          <button
            type="button"
            onClick={loadSample}
            className="text-xs font-medium text-accent hover:opacity-80 whitespace-nowrap"
          >
            Load sample →
          </button>
        </div>

        <div>
          <label
            htmlFor="audience"
            className="block text-sm font-medium text-ink mb-2"
          >
            Who is this for?{' '}
            <span className="text-ink-dim font-normal">(audience)</span>
          </label>
          <textarea
            id="audience"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            rows={3}
            className="input"
            placeholder="e.g. CTOs at Series-B SaaS companies struggling with on-call fatigue"
            required
          />
        </div>

        <div>
          <label htmlFor="goal" className="block text-sm font-medium text-ink mb-2">
            What's the goal of this message?{' '}
            <span className="text-ink-dim font-normal">(goal)</span>
          </label>
          <textarea
            id="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            rows={2}
            className="input"
            placeholder="e.g. Book a 20-minute demo of our incident-response platform"
            required
          />
        </div>

        <div>
          <label
            htmlFor="messages"
            className="block text-sm font-medium text-ink mb-2"
          >
            Messages{' '}
            <span className="text-ink-dim font-normal">(one per line)</span>
          </label>
          <textarea
            id="messages"
            value={messagesText}
            onChange={(e) => setMessagesText(e.target.value)}
            rows={6}
            className="input font-mono text-sm"
            placeholder={'Message variant 1\nMessage variant 2\nMessage variant 3'}
            required
          />
          <p className="mt-2 text-xs text-ink-dim">
            2–10 variants works best. Each line is one message.
          </p>
        </div>

        <div>
          <label htmlFor="panel-email" className="block text-sm font-medium text-ink mb-2">
            Your email{' '}
            <span className="text-ink-dim font-normal">(optional)</span>
          </label>
          <input
            id="panel-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="you@yourcompany.com"
          />
          <p className="mt-2 text-xs text-ink-dim">
            Leave it and we&apos;ll send you the results plus the missed-call guide. Skip it and
            the panel still runs — nothing here is gated.
          </p>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-btn bg-accent px-5 py-3 text-sm font-semibold text-bg shadow-[0_6px_24px_rgba(0,212,255,0.25)] transition hover:bg-accent-dim hover:shadow-[0_10px_30px_rgba(0,212,255,0.35)] hover:-translate-y-px disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Running panel…
              </>
            ) : (
              <>
                <Sparkles size={16} />
                Run AI Validation Panel
              </>
            )}
          </button>
          {loading && (
            <span className="text-sm text-ink-muted">
              Asking four AI personas to weigh in…
            </span>
          )}
        </div>

        {error && (
          <div
            role="alert"
            className="rounded-btn border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300"
          >
            {error}
          </div>
        )}
      </form>

      {/* Result */}
      {result && (
        <div id="panel-result" className="space-y-6 animate-fade-in">
          <div className="card p-6 md:p-8">
            <div className="flex items-center gap-2 text-accent">
              <Trophy size={18} />
              <p className="eyebrow !text-accent">Winner</p>
            </div>
            <p className="mt-3 text-lg text-ink leading-relaxed">
              {result.winnerMessage}
            </p>
          </div>

          <div className="card p-6 md:p-8">
            <p className="eyebrow">Why it won</p>
            <p className="mt-3 text-ink-muted leading-relaxed whitespace-pre-wrap">
              {result.whyItWon}
            </p>
          </div>

          {result.objections.length > 0 && (
            <div className="card p-6 md:p-8">
              <div className="flex items-center gap-2">
                <AlertTriangle size={18} className="text-amber-400" />
                <p className="eyebrow !text-amber-400">Main objections</p>
              </div>
              <ul className="mt-4 space-y-3">
                {result.objections.map((o, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-ink-muted leading-relaxed"
                  >
                    <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/70" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.improvedOptions.length > 0 && (
            <div className="card p-6 md:p-8">
              <div className="flex items-center gap-2">
                <Lightbulb size={18} className="text-accent" />
                <p className="eyebrow">Improved options</p>
              </div>
              <ol className="mt-4 space-y-4">
                {result.improvedOptions.map((m, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="shrink-0 text-accent font-mono text-sm pt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-ink leading-relaxed">{m}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setResult(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-ghost"
            >
              Run another panel
            </button>
            <button
              type="button"
              onClick={() => {
                const blob = [
                  `WINNER\n${result.winnerMessage}\n`,
                  `WHY IT WON\n${result.whyItWon}\n`,
                  `OBJECTIONS\n${result.objections.map((o) => `- ${o}`).join('\n')}\n`,
                  `IMPROVED OPTIONS\n${result.improvedOptions
                    .map((m, i) => `${i + 1}. ${m}`)
                    .join('\n')}`,
                ].join('\n');
                navigator.clipboard?.writeText(blob);
              }}
              className="btn-ghost"
            >
              Copy result
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
