import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export function FreeTools() {
  return (
    <section className="section" aria-labelledby="free-tools-heading">
      <div className="container-prose">
        <div className="card mx-auto max-w-2xl p-8 md:p-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-accent">
            <Sparkles size={12} aria-hidden="true" />
            Free Tool
          </div>

          <h2
            id="free-tools-heading"
            className="mt-5 text-h2 font-semibold text-ink"
          >
            Pressure-test your marketing for a dollar
          </h2>

          <p className="mt-4 text-ink-muted">
            What used to cost <span className="text-ink">$20,000</span> in focus
            groups now costs <span className="text-ink">about a buck</span>. Paste
            your audience, your goal, and a few message variants — four AI personas
            score them, surface objections, and rewrite the winner stronger. In
            under four minutes.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/saas/ai-validation-panel"
              className="inline-flex items-center justify-center gap-2 rounded-btn bg-accent px-5 py-3 text-sm font-semibold text-bg shadow-[0_6px_24px_rgba(0,212,255,0.25)] transition hover:bg-accent-dim hover:shadow-[0_10px_30px_rgba(0,212,255,0.35)] hover:-translate-y-px"
            >
              Try the AI Validation Panel
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <span className="text-xs text-ink-dim">
              No signup. Nothing stored.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
