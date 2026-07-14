import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { LivingFlowEmbed } from '@/components/sections/LivingFlowEmbed';

const SRC = '/living-flow-landscape.html';

/**
 * Living Flow — interactive map only.
 * Outer page chrome (duplicate title/lead) removed; slim back plate + rear glow
 * frames the iframe so it reads as lit from behind.
 */
export function LivingFlow() {
  return (
    <section
      id="living-flow"
      className="section"
      aria-label="Living Flow — how trusted agents move work"
    >
      <div className="container-wide">
        {/* Soft rear light — keeps the plate lit without a second header stack */}
        <div className="relative">
          <div
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(ellipse_at_50%_40%,rgba(0,212,255,0.18),rgba(0,212,255,0.05)_45%,transparent_70%)] blur-2xl md:-inset-10"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -inset-2 -z-10 rounded-[1.5rem] bg-[radial-gradient(closest-side,rgba(0,212,255,0.12),transparent_70%)] blur-xl"
            aria-hidden="true"
          />

          {/* Slim back plate — just enough rim to hold glow/border, not a second content card */}
          <div className="overflow-hidden rounded-card border border-border bg-bg-card/50 p-2 shadow-[0_0_0_1px_rgba(0,212,255,0.12),0_0_48px_-8px_rgba(0,212,255,0.35)] ring-1 ring-accent/20 backdrop-blur-sm sm:p-2.5 md:p-3">
            <div className="overflow-hidden rounded-[10px] border border-border bg-bg">
              <LivingFlowEmbed
                src={SRC}
                title="Living Flow landscape — interactive multi-agent workflow"
              />
            </div>
          </div>

          <p className="mt-3">
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
