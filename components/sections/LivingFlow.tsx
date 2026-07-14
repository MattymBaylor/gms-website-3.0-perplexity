import Link from 'next/link';
import { ArrowUpRight, Workflow } from 'lucide-react';
import { LivingFlowEmbed } from '@/components/sections/LivingFlowEmbed';

const SRC = '/living-flow-landscape.html';

/**
 * Living Flow — section framing + interactive map in one cyan-rim plate.
 * Outer copy frames the module; the iframe carries the stage architecture.
 */
export function LivingFlow() {
  return (
    <section
      id="living-flow"
      className="section"
      aria-labelledby="living-flow-heading"
    >
      <div className="container-wide">
        <div className="relative">
          {/* Rear cyan light */}
          <div
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(ellipse_at_50%_40%,rgba(0,212,255,0.18),rgba(0,212,255,0.05)_45%,transparent_70%)] blur-2xl md:-inset-10"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -inset-2 -z-10 rounded-[1.5rem] bg-[radial-gradient(closest-side,rgba(0,212,255,0.12),transparent_70%)] blur-xl"
            aria-hidden="true"
          />

          {/* One plate — solid night, cyan rim, headers + embed together */}
          <div className="isolate overflow-hidden rounded-card bg-[#0a0a0a] p-5 shadow-[0_0_0_1px_rgba(0,212,255,0.22),0_0_48px_-8px_rgba(0,212,255,0.35)] sm:p-6 md:p-8">
            <p className="inline-flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-cta">
              <Workflow size={12} aria-hidden="true" />
              Living Flow
            </p>

            <h2
              id="living-flow-heading"
              className="mt-3 text-h2 font-semibold tracking-tight text-ink md:text-h1"
            >
              How trusted agents actually move work
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-muted md:text-base">
              Governance decides what should never happen. Architecture decides who
              does what. Living Flow is the bridge — an interactive map of how AI
              and human handoffs move through a real operating system, not a slide
              deck.
            </p>

            <div className="mt-6 overflow-hidden rounded-[10px] bg-[#0a0a0a] shadow-[0_0_0_1px_rgba(0,212,255,0.12)] md:mt-8">
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
      </div>
    </section>
  );
}
