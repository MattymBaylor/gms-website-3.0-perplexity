import Link from 'next/link';
import { ArrowUpRight, Workflow } from 'lucide-react';
import { LivingFlowEmbed } from '@/components/sections/LivingFlowEmbed';

const SRC = '/living-flow-landscape.html';

/**
 * Living Flow — interactive map of how AI + human handoffs move work.
 * Sits between Field Notes and Free Tools on the homepage; podcast removed.
 */
export function LivingFlow() {
  return (
    <section
      id="living-flow"
      className="section"
      aria-labelledby="living-flow-heading"
    >
      <div className="container-wide">
        <div className="card overflow-hidden p-6 ring-1 ring-accent/25 md:p-8 lg:p-10">
          <p className="inline-flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-cta">
            <Workflow size={12} aria-hidden="true" />
            Living Flow
          </p>

          <h2
            id="living-flow-heading"
            className="mt-3 text-h2 font-semibold text-ink md:text-h1"
          >
            How trusted agents actually move work
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-muted md:text-base">
            Governance decides what should never happen. Architecture decides who
            does what. Living Flow is the bridge — an interactive map of how AI
            and human handoffs move through a real operating system, not a slide
            deck.
          </p>

          <div className="mt-6 overflow-hidden rounded-xl border border-border bg-bg-elevated/40 shadow-[0_0_40px_-12px_rgba(0,212,255,0.25)] md:mt-8">
            <LivingFlowEmbed
              src={SRC}
              title="Living Flow landscape — interactive multi-agent workflow"
            />
          </div>

          <p className="mt-4">
            <Link
              href={SRC}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent transition-colors hover:text-white"
            >
              Open full screen
              <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
