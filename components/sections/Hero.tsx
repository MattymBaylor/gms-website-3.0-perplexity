'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Users } from 'lucide-react';
import { HeroBlueprint } from '../HeroBlueprint';

export function Hero() {
  return (
    <section
      className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28"
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

      <div className="container-wide grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        {/* Left column: copy */}
        <div className="text-left">
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
            Every Missed Call Is a Job{' '}
            <span className="text-ink-muted">You'll Never Know You Lost</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl text-lead text-ink-muted"
          >
            AI that answers your phone, qualifies the lead, and books the job —
            before they hang up.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          >
            <a href="#cta" className="btn-primary">
              Get Your Free Demo <ArrowRight size={16} />
            </a>
            <a href="#case-studies" className="btn-ghost">
              See the results
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-6 inline-flex items-center gap-2 text-sm text-ink-dim"
          >
            <Users size={14} className="text-accent" />
            <span>Trusted by 50+ home service businesses</span>
          </motion.div>
        </div>

        {/* Right column: animated blueprint */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <HeroBlueprint />
        </motion.div>
      </div>
    </section>
  );
}
