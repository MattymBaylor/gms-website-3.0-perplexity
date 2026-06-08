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
}

const INDUSTRIES: Industry[] = [
  { slug: 'hvac',                name: 'HVAC',                icon: <Wind size={22} />,         blurb: 'Capture every emergency call. The AI qualifies the no-heat panic vs. the maintenance question, then books the right tech.',          videoId: '6rEDK6LX_AA', pageBuilt: true },
  { slug: 'roofing',             name: 'Roofing',             icon: <Home size={22} />,         blurb: 'Storm chasers, insurance jobs, repairs. Every call asked the right questions, every lead routed to the right crew.',                videoId: '6rEDK6LX_AA', pageBuilt: true },
  { slug: 'plumbing',            name: 'Plumbing',            icon: <Wrench size={22} />,        blurb: 'Burst pipes don\'t wait for business hours. Neither does the AI. Books emergencies after 5pm without paying a night dispatcher.', videoId: '6rEDK6LX_AA', pageBuilt: true },
  { slug: 'electrical',          name: 'Electrical',          icon: <Zap size={22} />,           blurb: 'Service calls, panel upgrades, EV chargers — qualified and scheduled before your competitor returns a voicemail.',             videoId: '6rEDK6LX_AA', pageBuilt: true },
  { slug: 'insurance',           name: 'Insurance',           icon: <Shield size={22} />,        blurb: 'Quote intake without the wait. The AI captures the basics, qualifies coverage type, and books the agent for the close.',     videoId: '6rEDK6LX_AA', pageBuilt: true },
  { slug: 'real-estate',         name: 'Real Estate',         icon: <Building2 size={22} />,     blurb: 'Sign-call follow-up in 30 seconds. Qualifies buyer vs. seller, timeline, and price band — books the showing on your calendar.', videoId: '6rEDK6LX_AA', pageBuilt: true },
  { slug: 'legal',               name: 'Legal',               icon: <Scale size={22} />,         blurb: 'After-hours intake that respects compliance. Pre-screens conflicts, captures matter details, schedules the consultation.',     videoId: '6rEDK6LX_AA', pageBuilt: true },
  { slug: 'medical',             name: 'Medical / Dental',    icon: <Stethoscope size={22} />,   blurb: 'Patient calls, appointment requests, prescription refills — triaged 24/7 with HIPAA-ready guardrails.',                          videoId: '6rEDK6LX_AA', pageBuilt: true },
  { slug: 'locksmith',           name: 'Locksmith',           icon: <KeyRound size={22} />,      blurb: 'Lockout emergencies converted before they call the next number. AI qualifies vehicle vs. home and dispatches the nearest tech.',  videoId: '6rEDK6LX_AA', pageBuilt: true },
  { slug: 'property-management', name: 'Property Mgmt',       icon: <Building size={22} />,      blurb: 'Tenant maintenance requests captured with unit number, issue category, and severity — routed to the right vendor automatically.', videoId: '6rEDK6LX_AA', pageBuilt: true },
  { slug: 'home-services',       name: 'Home Services',       icon: <HardHat size={22} />,       blurb: 'Painters, landscapers, handymen, cleaners. Any service business that answers the phone for jobs.',                              videoId: '6rEDK6LX_AA', pageBuilt: true },
  { slug: 'custom',              name: 'Custom',              icon: <Sparkles size={22} />,      blurb: 'Industry not listed? The agent is trained on your specific workflow, scripts, and qualifying questions.',                       videoId: '6rEDK6LX_AA', pageBuilt: true },
];

export function Industries() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const active = INDUSTRIES.find((i) => i.slug === openSlug) || null;

  return (
    <section id="industries" className="section" aria-labelledby="industries-heading">
      <div className="container-wide">
        <div className="mb-14 max-w-3xl">
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
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
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
                className="group card flex h-full w-full flex-col items-start gap-3 p-5 text-left"
                aria-label={`Learn more about ${i.name}`}
              >
                <span className="rounded-btn bg-accent/10 p-2.5 text-accent ring-1 ring-accent/20 transition-all group-hover:bg-accent/15 group-hover:ring-accent/40">
                  {i.icon}
                </span>
                <span className="text-h3 font-semibold text-ink">{i.name}</span>
                <span className="mt-auto inline-flex items-center gap-1 text-xs text-ink-muted transition-colors group-hover:text-accent">
                  Learn more <ArrowRight size={12} />
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
