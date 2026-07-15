'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Check, Users } from 'lucide-react';
import { BrandName } from '@/components/BrandName';

const CAPABILITIES = [
  'Answers in under 1 second',
  'Qualifies every caller',
  'Books appointments automatically',
  'Available 24/7/365',
];

export function Hero() {
  return (
    <section
      className="relative overflow-hidden pt-32 pb-20 md:pt-36 md:pb-28"
      aria-labelledby="hero-heading"
    >
      {/* Ambient glow behind the hero */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[1100px] -translate-x-1/2"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 50% 0%, rgba(0,212,255,0.12), transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="container-wide">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow"
          >
            AI Voice Agents for Home Services
          </motion.p>

          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-hero font-semibold tracking-tight text-ink"
          >
            Every Missed Call Is a Job
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-1 text-xl md:text-2xl font-medium text-ink-muted tracking-tight"
          >
            You&apos;ll Never Know You Lost
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-lead text-ink-muted"
          >
            Every homeowner calls multiple contractors. The one who answers first
            usually gets the job. <BrandName /> answers instantly, asks the
            right questions, captures the details, and books the appointment —
            even when your team is busy serving customers.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
          >
            {CAPABILITIES.map((c) => (
              <li
                key={c}
                className="inline-flex items-center gap-2 text-sm text-ink-muted"
              >
                <Check size={16} className="shrink-0 text-accent" aria-hidden="true" />
                {c}
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-center"
          >
            <a href="#cta" className="btn-primary">
              Get Your Free Demo <ArrowRight size={16} />
            </a>
            <a href="#case-studies" className="btn-ghost">
              See the Results
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mt-8 inline-flex items-center gap-2 text-sm text-ink-dim"
          >
            <Users size={14} className="text-accent" />
            <span>Trusted by 50+ home service businesses</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
