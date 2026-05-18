'use client';

import { motion } from 'framer-motion';
import {
  Wind,
  Home,
  Wrench,
  Zap,
  Shield,
  Building2,
  Scale,
  Stethoscope,
  KeyRound,
  Building,
  HardHat,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Modal } from '../Modal';

interface Industry {
  slug: string;
  name: string;
  icon: React.ReactNode;
  blurb: string;
  /** Industry-specific video. Falls back to the generic explainer. */
  videoId: string;
  /** Whether the dedicated landing page exists. */
  pageBuilt: boolean;
  /** Accent color for the card glow */
  accent: string;
}

const INDUSTRIES: Industry[] = [
  { slug: 'hvac',                name: 'HVAC',                icon: <Wind size={28} />,         blurb: 'Capture every emergency call. The AI qualifies the no-heat panic vs. the maintenance question, then books the right tech.',          videoId: '6rEDK6LX_AA', pageBuilt: true, accent: '0, 180, 220' },
  { slug: 'roofing',             name: 'Roofing',             icon: <Home size={28} />,         blurb: 'Storm chasers, insurance jobs, repairs. Every call asked the right questions, every lead routed to the right crew.',                videoId: '6rEDK6LX_AA', pageBuilt: true, accent: '220, 140, 50' },
  { slug: 'plumbing',            name: 'Plumbing',            icon: <Wrench size={28} />,        blurb: 'Burst pipes don\'t wait for business hours. Neither does the AI. Books emergencies after 5pm without paying a night dispatcher.', videoId: '6rEDK6LX_AA', pageBuilt: true, accent: '60, 130, 220' },
  { slug: 'electrical',          name: 'Electrical',          icon: <Zap size={28} />,           blurb: 'Service calls, panel upgrades, EV chargers — qualified and scheduled before your competitor returns a voicemail.',             videoId: '6rEDK6LX_AA', pageBuilt: true, accent: '240, 210, 50' },
  { slug: 'insurance',           name: 'Insurance',           icon: <Shield size={28} />,        blurb: 'Quote intake without the wait. The AI captures the basics, qualifies coverage type, and books the agent for the close.',     videoId: '6rEDK6LX_AA', pageBuilt: true, accent: '80, 180, 100' },
  { slug: 'real-estate',         name: 'Real Estate',         icon: <Building2 size={28} />,     blurb: 'Sign-call follow-up in 30 seconds. Qualifies buyer vs. seller, timeline, and price band — books the showing on your calendar.', videoId: '6rEDK6LX_AA', pageBuilt: true, accent: '180, 100, 220' },
  { slug: 'legal',               name: 'Legal',               icon: <Scale size={28} />,         blurb: 'After-hours intake that respects compliance. Pre-screens conflicts, captures matter details, schedules the consultation.',     videoId: '6rEDK6LX_AA', pageBuilt: true, accent: '160, 160, 180' },
  { slug: 'medical',             name: 'Medical / Dental',    icon: <Stethoscope size={28} />,   blurb: 'Patient calls, appointment requests, prescription refills — triaged 24/7 with HIPAA-ready guardrails.',                          videoId: '6rEDK6LX_AA', pageBuilt: true, accent: '220, 70, 90' },
  { slug: 'locksmith',           name: 'Locksmith',           icon: <KeyRound size={28} />,      blurb: 'Lockout emergencies converted before they call the next number. AI qualifies vehicle vs. home and dispatches the nearest tech.',  videoId: '6rEDK6LX_AA', pageBuilt: true, accent: '220, 180, 60' },
  { slug: 'property-management', name: 'Property Mgmt',       icon: <Building size={28} />,      blurb: 'Tenant maintenance requests captured with unit number, issue category, and severity — routed to the right vendor automatically.', videoId: '6rEDK6LX_AA', pageBuilt: true, accent: '140, 100, 220' },
  { slug: 'home-services',       name: 'Home Services',       icon: <HardHat size={28} />,       blurb: 'Painters, landscapers, handymen, cleaners. Any service business that answers the phone for jobs.',                              videoId: '6rEDK6LX_AA', pageBuilt: true, accent: '60, 200, 160' },
  { slug: 'custom',              name: 'Custom',              icon: <Sparkles size={28} />,      blurb: 'Industry not listed? The agent is trained on your specific workflow, scripts, and qualifying questions.',                       videoId: '6rEDK6LX_AA', pageBuilt: true, accent: '0, 212, 255' },
];

export function Industries() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const active = INDUSTRIES.find((i) => i.slug === openSlug) || null;

  return (
    <section id="industries" className="section" aria-labelledby="industries-heading">
      <div className="container-wide">
        <div className="mb-14 max-w-2xl">
          <p className="eyebrow">Built for your industry</p>
          <h2 id="industries-heading" className="mt-3 text-h1 font-semibold text-ink">
            Industries We Serve
          </h2>
          <p className="mt-4 text-lead text-ink-muted">
            Trained on the language your callers actually use — the panic, the
            timeline, the budget — so the AI sounds like it works at your shop, not
            a call center.
          </p>
        </div>

        <ul
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4"
          role="list"
        >
          {INDUSTRIES.map((i, idx) => (
            <motion.li
              key={i.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: (idx % 4) * 0.05, duration: 0.4 }}
            >
              <button
                type="button"
                onClick={() => setOpenSlug(i.slug)}
                className="group relative flex h-full w-full flex-col items-start gap-3 overflow-hidden rounded-xl border border-white/[0.06] p-6 text-left transition-all duration-300 hover:border-white/[0.12]"
                style={{
                  background: `
                    radial-gradient(ellipse at 70% 20%, rgba(${i.accent}, 0.06), transparent 70%),
                    linear-gradient(180deg, rgba(20,20,23,1) 0%, rgba(12,12,15,1) 100%)
                  `,
                }}
                aria-label={`Learn more about ${i.name}`}
              >
                {/* Hover glow overlay */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `
                      radial-gradient(ellipse at 70% 20%, rgba(${i.accent}, 0.15), transparent 60%),
                      radial-gradient(ellipse at 30% 80%, rgba(${i.accent}, 0.06), transparent 60%)
                    `,
                  }}
                />

                {/* Subtle grid pattern overlay */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
                    `,
                    backgroundSize: '24px 24px',
                  }}
                />

                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-30 group-hover:opacity-60 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, rgba(${i.accent}, 0.6) 50%, transparent 100%)`,
                  }}
                />

                {/* Icon */}
                <span
                  className="relative z-10 rounded-lg p-3 transition-all duration-300"
                  style={{
                    background: `rgba(${i.accent}, 0.08)`,
                    color: `rgba(${i.accent}, 0.7)`,
                    boxShadow: `0 0 0 1px rgba(${i.accent}, 0.12)`,
                  }}
                >
                  <span className="block transition-colors duration-300 group-hover:text-white" style={{ color: 'inherit' }}>
                    {i.icon}
                  </span>
                </span>

                {/* Name */}
                <span className="relative z-10 text-base font-semibold text-white/90 group-hover:text-white transition-colors duration-300">
                  {i.name}
                </span>

                {/* CTA */}
                <span className="relative z-10 mt-auto inline-flex items-center gap-1.5 text-xs transition-all duration-300 group-hover:gap-2"
                  style={{ color: `rgba(${i.accent}, 0.5)` }}
                >
                  <span className="group-hover:text-white/70 transition-colors duration-300">Learn more</span>
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      <Modal open={!!active} onClose={() => setOpenSlug(null)} title={active?.name}>
        {active && (
          <div className="space-y-5">
            <div className="aspect-video overflow-hidden rounded-card border border-border bg-bg">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${active.videoId}?rel=0`}
                title={`${active.name} explainer`}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-ink-muted">{active.blurb}</p>
            {active.pageBuilt ? (
              <Link href={`/${active.slug}`} className="btn-ghost">
                See full {active.name} details →
              </Link>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-btn border border-border bg-bg-card/40 px-4 py-2.5 text-sm text-ink-dim">
                Dedicated page coming soon
              </span>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
}
