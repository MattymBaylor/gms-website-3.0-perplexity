'use client';

import { useState } from 'react';
import { ArrowRight, ChevronDown, Lock } from 'lucide-react';

type Track = 'sales' | 'ops' | 'care';

interface Stage {
  n: number;
  track: Track;
  title: string;
  agent: string;
  description: string;
  goesOut?: string;
  channel?: string;
  tools?: string;
  gate?: string;
}

const STAGES: Stage[] = [
  {
    n: 1,
    track: 'sales',
    title: 'The call gets answered',
    agent: 'Intake Agent',
    description: `A homeowner with a leak is calling three roofers; whoever picks up first usually wins. Answers in under a second, day or night, qualifies shingle vs. tile and insurance vs. cash, captures the address, and asks the preferred contact channel.`,
    goesOut: 'Live answer + welcome confirmation',
    channel: 'sets the channel for everything after',
  },
  {
    n: 2,
    track: 'ops',
    title: 'The roof gets measured',
    agent: 'Measurement Agent',
    description: `The moment we have the address, an aerial report is pulled — squares, pitch, facets — before anyone drives out.`,
    goesOut: 'Internal — report attached',
    tools: 'EagleView',
  },
  {
    n: 3,
    track: 'ops',
    title: 'The job gets a record',
    agent: 'CRM Agent',
    description: `Job opened, job number generated, measurement and call notes filed against it.`,
    goesOut: 'Internal — job number created',
    tools: 'AccuLynx / JobNimbus',
  },
  {
    n: 4,
    track: 'ops',
    title: 'Everything gets routed',
    agent: 'Joe · Traffic',
    description: `A roof sale is a chain of calls, in order. Joe sequences the follow-ups and assigns the right agent to each.`,
    goesOut: 'Internal — follow-ups scheduled',
  },
  {
    n: 5,
    track: 'sales',
    title: 'They pick a tile — and see it',
    agent: 'Selection Agent',
    description: `Walked through options and shown them: a Westlake Royal profile in their color, an Eagle concrete tile beside it, clay vs. concrete, on their house.`,
    goesOut: 'Tile options sent to review',
    tools: 'Westlake Royal · Eagle',
  },
  {
    n: 6,
    track: 'ops',
    title: 'The rules questions get answered',
    agent: 'Lloyd Braun · Compliance',
    description: `Roofing code is a moving target — building code, the 25% rule, hurricane-zone requirements, permit changes. Stays current on the latest rules and answers live, in plain language.`,
    goesOut: 'Answers on their channel',
  },
  {
    n: 7,
    track: 'sales',
    title: 'The paperwork gets signed',
    agent: 'Contracts Agent',
    description: `Agreement goes out for e-signature, and the agent confirms it actually came back signed — not just "sent."`,
    goesOut: 'Contract sent + signature confirmed',
    tools: 'AccuLynx eSign / DocuSign',
    gate: 'Nothing advances until signed',
  },
  {
    n: 8,
    track: 'ops',
    title: 'The permit gets pulled',
    agent: 'Permit Agent',
    description: `Filed with the county and tracked. Knows the order: no permit before a signed contract, no contract before tile selection.`,
    goesOut: 'Permit status updates',
    gate: 'Requires confirmed-signed contract',
  },
  {
    n: 9,
    track: 'ops',
    title: 'Every gate gets checked',
    agent: 'Mickey · QA',
    description: `Verifies each step truly finished before the next starts: address captured, report attached, contract signed, permit filed. An open gate doesn't advance.`,
    goesOut: 'Internal — quality gates enforced',
  },
  {
    n: 10,
    track: 'care',
    title: 'They always know where they are',
    agent: 'Uncle Leo · Concierge',
    description: `The question every homeowner is secretly asking: where am I, what's next? Proactive updates at every milestone — especially for older homeowners who just want to know who to call.`,
    goesOut: 'Proactive milestone updates',
    channel: 'always on their chosen channel',
  },
  {
    n: 11,
    track: 'ops',
    title: 'The whole line is supervised',
    agent: 'Jerry · Orchestrator',
    description: `Makes sure steps happen in sequence, catches anything that stalls, steps in when a human's needed. The reason it's a system, not 11 bots tripping over each other.`,
    goesOut: 'Internal — oversight & escalation',
  },
  {
    n: 12,
    track: 'care',
    title: 'The roof gets a satisfaction check',
    agent: 'Whatley · Operations',
    description: `Once the roof's on: are you happy? Anything not right? Catching a stray nail before it becomes a 1-star review beats any ad.`,
    goesOut: 'Satisfaction check-in',
    gate: 'Review ask waits for a "yes"',
  },
  {
    n: 13,
    track: 'care',
    title: 'The warranty gets registered',
    agent: 'Whatley · Operations',
    description: `Tile warranties must be registered and homeowners rarely do it. We handle it — profile, color, install date, contractor — and send confirmation.`,
    goesOut: 'Warranty confirmation sent',
    tools: 'Eagle · Westlake Royal',
  },
  {
    n: 14,
    track: 'care',
    title: 'The review gets asked for',
    agent: 'Elaine · Content',
    description: `Only after they've said they're happy: review request at the peak moment, direct link, preferred channel.`,
    goesOut: 'Review request + direct link',
    tools: 'Google · Facebook · BBB',
  },
  {
    n: 15,
    track: 'care',
    title: 'The referral pays off',
    agent: 'Frank · Outreach',
    description: `Refer a neighbor; when they sign, you get $500 off — and we make sure the credit actually gets applied. After a storm, neighbors talk.`,
    goesOut: 'Referral offer + $500 credit tracked',
  },
];

const TRACK_STYLES: Record<Track, { node: string; pill: string }> = {
  sales: {
    node: 'border-accent text-accent',
    pill: 'border-accent/30 bg-accent/10 text-accent',
  },
  ops: {
    node: 'border-success text-success',
    pill: 'border-success/30 bg-success/10 text-success',
  },
  care: {
    node: 'border-cta text-cta',
    pill: 'border-cta/30 bg-cta/10 text-cta',
  },
};

function Chip({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg-card/40 px-3 py-1 text-[11px]">
      <span className="text-ink-dim">{label}:</span>
      <span className="text-ink-muted">{value}</span>
    </span>
  );
}

export function RoofingPipeline() {
  const [openN, setOpenN] = useState<number | null>(1);

  return (
    <section
      className="section bp-grid"
      aria-labelledby="roofing-pipeline-heading"
    >
      <div className="container-prose">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <p className="eyebrow">Growth Mindset AI · Live Workflow</p>
          <h2
            id="roofing-pipeline-heading"
            className="mt-3 text-h2 font-semibold text-ink"
          >
            One roofing job. A whole crew of AI agents.
          </h2>
          <p className="mt-4 text-lead text-ink-muted">
            This is how a single tile-roof lead moves through our system — from
            the first ring to the referral. Each step is owned by its own AI
            agent, and nobody&apos;s allowed to jump the line. Tap any step to
            see who handles it and what goes out.
          </p>

          {/* Pipeline */}
          <ol className="mt-12">
            {STAGES.map((stage, idx) => {
              const isOpen = openN === stage.n;
              const isFirst = idx === 0;
              const isLast = idx === STAGES.length - 1;
              const trackStyle = TRACK_STYLES[stage.track];
              const panelId = `roofing-panel-${stage.n}`;
              const headerId = `roofing-header-${stage.n}`;

              return (
                <li
                  key={stage.n}
                  className="relative pl-14 pb-3 last:pb-0"
                >
                  {/* Rail segment — connects nodes */}
                  <div
                    className={[
                      'pointer-events-none absolute left-5 w-px bg-white/10',
                      isFirst ? 'top-6' : 'top-0',
                      isLast ? 'h-6' : 'bottom-0',
                    ].join(' ')}
                    aria-hidden="true"
                  />

                  {/* Numbered node */}
                  <div
                    className={[
                      'absolute left-0 top-2 z-10 grid h-10 w-10 place-items-center rounded-full border-2 bg-bg text-xs font-semibold tabular-nums',
                      trackStyle.node,
                    ].join(' ')}
                    aria-hidden="true"
                  >
                    {stage.n}
                  </div>

                  {/* Header button (full row click target) */}
                  <button
                    id={headerId}
                    type="button"
                    onClick={() =>
                      setOpenN((curr) => (curr === stage.n ? null : stage.n))
                    }
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className={[
                      'flex w-full items-center justify-between gap-3 rounded-card border bg-bg-card/40 px-4 py-3 text-left transition-colors hover:border-border-strong',
                      isOpen
                        ? 'border-border-strong'
                        : 'border-border',
                    ].join(' ')}
                  >
                    <div className="flex min-w-0 flex-1 flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
                      <span className="text-sm font-semibold text-ink md:text-base">
                        {stage.title}
                      </span>
                      <span
                        className={[
                          'inline-flex items-center self-start rounded-full border px-2.5 py-0.5 text-[11px] font-medium',
                          trackStyle.pill,
                        ].join(' ')}
                      >
                        {stage.agent}
                      </span>
                    </div>
                    <ChevronDown
                      size={16}
                      className={[
                        'shrink-0 text-ink-muted transition-transform duration-200',
                        isOpen ? 'rotate-180' : '',
                      ].join(' ')}
                      aria-hidden="true"
                    />
                  </button>

                  {/* Expanded detail panel */}
                  {isOpen && (
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={headerId}
                      className="mt-2 rounded-card border border-border bg-bg-elevated/40 p-5"
                    >
                      <p className="text-sm leading-relaxed text-ink-muted">
                        {stage.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {stage.goesOut && (
                          <Chip label="Goes out" value={stage.goesOut} />
                        )}
                        {stage.tools && (
                          <Chip label="Tools" value={stage.tools} />
                        )}
                        {stage.channel && (
                          <Chip label="Channel" value={stage.channel} />
                        )}
                      </div>

                      {stage.gate && (
                        <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-[11px] font-medium text-red-300">
                          <Lock size={11} aria-hidden="true" />
                          <span className="uppercase tracking-wider">Gate</span>
                          <span className="text-red-200">— {stage.gate}</span>
                        </div>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ol>

          {/* Channel callout */}
          <div className="mt-12 rounded-card border border-accent/30 bg-accent/5 p-5 sm:p-6">
            <p className="eyebrow text-accent">
              Every message goes out the way they asked
            </p>
            <p className="mt-2 text-sm text-ink-muted sm:text-base">
              Text, email, or phone — captured at intake and honored through
              the entire lifecycle. The homeowner chooses the channel; the
              system remembers.
            </p>
          </div>

          {/* CTA row */}
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <a href="/#cta" className="btn-primary">
              Get Your Free Demo <ArrowRight size={16} />
            </a>
            <p className="text-xs text-ink-dim">
              15 agents · one roofing job · zero dropped handoffs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
