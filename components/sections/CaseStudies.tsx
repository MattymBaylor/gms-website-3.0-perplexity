'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { Modal } from '../Modal';

interface CaseStudy {
  slug: string;
  title: string;
  teaser: string;
  metric: string;
  metricLabel: string;
  featured?: boolean;
  /** Custom poster gradient when no real image is supplied. */
  posterClass?: string;
  /** Path to a poster image — takes priority over posterClass. */
  posterImage?: string;
  body: React.ReactNode;
  /** If set, modal includes a deep-link to a dedicated interactive page. */
  interactiveHref?: string;
}

const CASES: CaseStudy[] = [
  {
    slug: 'seinfeld-hq',
    title: 'Seinfeld HQ: A multi-agent command center',
    teaser:
      "A pixel-art interactive case study demonstrating the internal architecture that powers Growth Mindset's voice agents — 8 specialized AI characters, each with their own role.",
    metric: '8',
    metricLabel: 'specialized agents',
    featured: true,
    posterImage: '/seinfeld-hq/banner.png',
    posterClass:
      'bg-[#14120c]',
    interactiveHref: '/seinfeld-hq',
    body: (
      <div className="space-y-4 text-ink-muted">
        <p>
          <span className="font-semibold text-ink">The challenge.</span> Growth
          Mindset&apos;s voice agents need more than a single LLM to feel real. They
          have to handle objections, route to humans, log to CRMs, run business
          research mid-call, and learn from every conversation — all in under
          400ms of latency.
        </p>
        <p>
          <span className="font-semibold text-ink">The solution.</span> A
          multi-agent architecture where specialized models handle each
          responsibility: a router, a researcher, a qualifier, a scheduler, a
          texter, a reviewer, a confirmation caller, and a memory keeper. Each
          one is purpose-trained on its domain; the orchestrator decides who
          speaks next.
        </p>
        <p>
          <span className="font-semibold text-ink">The interactive piece.</span>{' '}
          Built as a Seinfeld-themed pixel-art command center, you can click
          each character to chat with the underlying agent, discover trivia
          hotspots, use the whiteboard, and trigger Kramer&apos;s door-burst. It&apos;s a
          working demo of the architecture that runs Growth Mindset internally.
        </p>
      </div>
    ),
  },
  {
    slug: 'hvac-emergency-dispatch',
    title: 'HVAC emergency dispatch',
    teaser:
      'Real metrics from a contractor running the voice agent across emergency dispatch and maintenance scheduling.',
    metric: 'Soon',
    metricLabel: 'publishing Q3',
    posterClass:
      'bg-[radial-gradient(ellipse_at_20%_30%,rgba(0,212,255,0.18),transparent_60%),linear-gradient(135deg,#0a0a0a,#111113)]',
    body: (
      <p className="text-ink-muted">
        Case study is being prepared with the customer&apos;s approval. Check back
        soon — or join the email list below to get notified when it publishes.
      </p>
    ),
  },
  {
    slug: 'roofing-storm-response',
    title: 'Roofing storm response',
    teaser:
      'How a storm-chasing roofer handled a 6× spike in inbound calls without hiring a single dispatcher.',
    metric: 'Soon',
    metricLabel: 'publishing Q3',
    posterClass:
      'bg-[radial-gradient(ellipse_at_70%_30%,rgba(249,115,22,0.18),transparent_60%),linear-gradient(135deg,#0a0a0a,#111113)]',
    body: (
      <p className="text-ink-muted">
        Case study is being prepared with the customer&apos;s approval. Check back
        soon — or join the email list below to get notified when it publishes.
      </p>
    ),
  },
  {
    slug: 'locksmith-after-hours',
    title: 'Locksmith after-hours capture',
    teaser:
      'Converting 2am lockout calls into booked jobs while every competitor in the market sends them to voicemail.',
    metric: 'Soon',
    metricLabel: 'publishing Q3',
    posterClass:
      'bg-[radial-gradient(ellipse_at_50%_70%,rgba(16,185,129,0.16),transparent_60%),linear-gradient(135deg,#0a0a0a,#111113)]',
    body: (
      <p className="text-ink-muted">
        Case study is being prepared with the customer&apos;s approval. Check back
        soon — or join the email list below to get notified when it publishes.
      </p>
    ),
  },
  {
    slug: 'plumbing-overflow',
    title: 'Plumbing overflow management',
    teaser:
      'How a 3-truck plumbing company stopped losing weekend emergency calls to competitors with faster pickup.',
    metric: 'Soon',
    metricLabel: 'publishing Q4',
    posterClass:
      'bg-[radial-gradient(ellipse_at_30%_60%,rgba(59,130,246,0.16),transparent_60%),linear-gradient(135deg,#0a0a0a,#111113)]',
    body: (
      <p className="text-ink-muted">
        Case study is being prepared with the customer&apos;s approval. Check back
        soon — or join the email list below to get notified when it publishes.
      </p>
    ),
  },
  {
    slug: 'property-mgmt-scale',
    title: 'Property management at scale',
    teaser:
      'Managing tenant maintenance requests across 200+ units with AI triage — no additional staff.',
    metric: 'Soon',
    metricLabel: 'publishing Q4',
    posterClass:
      'bg-[radial-gradient(ellipse_at_60%_40%,rgba(168,85,247,0.16),transparent_60%),linear-gradient(135deg,#0a0a0a,#111113)]',
    body: (
      <p className="text-ink-muted">
        Case study is being prepared with the customer&apos;s approval. Check back
        soon — or join the email list below to get notified when it publishes.
      </p>
    ),
  },
  {
    slug: 'electrical-commercial',
    title: 'Electrical contractor lead capture',
    teaser:
      'Separating residential service calls from commercial bid requests automatically — routing each to the right team.',
    metric: 'Soon',
    metricLabel: 'publishing Q4',
    posterClass:
      'bg-[radial-gradient(ellipse_at_40%_30%,rgba(234,179,8,0.16),transparent_60%),linear-gradient(135deg,#0a0a0a,#111113)]',
    body: (
      <p className="text-ink-muted">
        Case study is being prepared with the customer&apos;s approval. Check back
        soon — or join the email list below to get notified when it publishes.
      </p>
    ),
  },
  {
    slug: 'insurance-intake',
    title: 'Insurance agency intake automation',
    teaser:
      'Turning after-hours quote requests into next-morning appointments with full intake already completed.',
    metric: 'Soon',
    metricLabel: 'publishing Q4',
    posterClass:
      'bg-[radial-gradient(ellipse_at_50%_50%,rgba(236,72,153,0.14),transparent_60%),linear-gradient(135deg,#0a0a0a,#111113)]',
    body: (
      <p className="text-ink-muted">
        Case study is being prepared with the customer&apos;s approval. Check back
        soon — or join the email list below to get notified when it publishes.
      </p>
    ),
  },
];

export function CaseStudies() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const active = CASES.find((c) => c.slug === openSlug) || null;

  const scroll = (dir: 'l' | 'r') => {
    const el = scrollerRef.current;
    if (!el) return;
    const delta = el.clientWidth * 0.85 * (dir === 'l' ? -1 : 1);
    el.scrollBy({ left: delta, behavior: 'smooth' });
  };

  return (
    <section id="case-studies" className="section" aria-labelledby="case-studies-heading">
      <div className="container-wide">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="eyebrow">See the results</p>
            <h2 id="case-studies-heading" className="mt-3 text-h1 font-semibold text-ink">
              Case Studies
            </h2>
            <p className="mt-4 text-lead text-ink-muted">
              Real businesses. Real numbers. Real architecture.
            </p>
          </div>

          {/* Desktop scroll controls */}
          <div className="hidden gap-2 md:flex">
            <button
              type="button"
              onClick={() => scroll('l')}
              aria-label="Scroll left"
              className="rounded-full border border-border-strong p-2.5 text-ink-muted transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scroll('r')}
              aria-label="Scroll right"
              className="rounded-full border border-border-strong p-2.5 text-ink-muted transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 md:-mx-10 md:px-10"
          style={{ scrollbarWidth: 'thin' }}
        >
          {CASES.map((c, idx) => (
            <motion.button
              key={c.slug}
              type="button"
              onClick={() => setOpenSlug(c.slug)}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: idx * 0.06, duration: 0.4 }}
              className={[
                'group card flex shrink-0 snap-start flex-col text-left',
                c.featured ? 'w-[340px] md:w-[420px]' : 'w-[300px] md:w-[340px]',
              ].join(' ')}
              aria-label={`Open case study: ${c.title}`}
            >
              {/* Poster */}
              <div
                className={[
                  'relative h-44 w-full overflow-hidden rounded-t-card',
                  c.posterClass || 'bg-bg-elevated',
                ].join(' ')}
                aria-hidden="true"
              >
                {/* Real poster image if available */}
                {c.posterImage && (
                  <Image
                    src={c.posterImage}
                    alt=""
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 340px, 420px"
                  />
                )}
                {c.featured && (
                  <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-cta px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                    <Sparkles size={12} /> Featured
                  </span>
                )}
                <div className="absolute bottom-3 right-3 z-10 text-right">
                  <div className="text-2xl font-bold text-ink">{c.metric}</div>
                  <div className="text-[10px] uppercase tracking-wider text-ink-muted">
                    {c.metricLabel}
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col gap-2 p-5">
                <h3 className="text-h3 font-semibold text-ink">{c.title}</h3>
                <p className="text-sm text-ink-muted">{c.teaser}</p>
                <span className="mt-auto inline-flex items-center gap-1 text-xs text-accent">
                  Read case study <ArrowRight size={12} />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <Modal
        open={!!active}
        onClose={() => setOpenSlug(null)}
        title={active?.title}
        maxWidth="780px"
      >
        {active && (
          <div className="space-y-6">
            {active.posterImage ? (
              <div className="relative h-40 w-full overflow-hidden rounded-card">
                <Image
                  src={active.posterImage}
                  alt=""
                  fill
                  className="object-cover object-center"
                  sizes="780px"
                />
              </div>
            ) : (
              <div
                className={[
                  'h-40 w-full rounded-card',
                  active.posterClass || 'bg-bg-elevated',
                ].join(' ')}
                aria-hidden="true"
              />
            )}
            {active.body}
            {active.interactiveHref && (
              <Link
                href={active.interactiveHref}
                className="btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore the Interactive HQ →
              </Link>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
}
