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

interface Industry {
  slug: string;
  name: string;
  icon: React.ReactNode;
}

/**
 * Variation 2 — Soft Green Tint Hover
 * Normal: chrome-silver icon + soft white levitating light under the icon.
 * Hover: same icon metal; under-icon light shifts to a restrained sage-green tint.
 * Cards stay dark charcoal; no multi-color accent washes.
 */
const INDUSTRIES: Industry[] = [
  { slug: 'hvac', name: 'HVAC', icon: <Wind size={28} strokeWidth={1.75} /> },
  { slug: 'roofing', name: 'Roofing', icon: <Home size={28} strokeWidth={1.75} /> },
  { slug: 'plumbing', name: 'Plumbing', icon: <Wrench size={28} strokeWidth={1.75} /> },
  { slug: 'electrical', name: 'Electrical', icon: <Zap size={28} strokeWidth={1.75} /> },
  { slug: 'insurance', name: 'Insurance', icon: <Shield size={28} strokeWidth={1.75} /> },
  { slug: 'real-estate', name: 'Real Estate', icon: <Building2 size={28} strokeWidth={1.75} /> },
  { slug: 'legal', name: 'Legal', icon: <Scale size={28} strokeWidth={1.75} /> },
  { slug: 'medical', name: 'Medical / Dental', icon: <Stethoscope size={28} strokeWidth={1.75} /> },
  { slug: 'locksmith', name: 'Locksmith', icon: <KeyRound size={28} strokeWidth={1.75} /> },
  { slug: 'property-management', name: 'Property Mgmt', icon: <Building size={28} strokeWidth={1.75} /> },
  { slug: 'home-services', name: 'Home Services', icon: <HardHat size={28} strokeWidth={1.75} /> },
  { slug: 'custom', name: 'Custom', icon: <Sparkles size={28} strokeWidth={1.75} /> },
];

/** Muted sophisticated sage — soft green tint for hover light only */
const HOVER_GREEN = '110, 170, 130';

export function Industries() {
  return (
    <section id="industries" className="section" aria-labelledby="industries-heading">
      <div className="container-wide">
        <div className="mb-14 mx-auto max-w-2xl text-center">
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
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
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
              <Link
                href={`/${i.slug}`}
                className="group relative flex h-full w-full flex-col items-center gap-3 overflow-hidden rounded-xl border border-white/[0.07] bg-gradient-to-b from-[#16161a] to-[#0c0c0f] px-4 py-6 text-center transition-all duration-300 hover:border-white/[0.12] sm:px-5 sm:py-7"
                aria-label={`${i.name} — AI voice agent details`}
              >
                {/* Icon stage — chrome mark + levitating under-light */}
                <span className="relative z-10 flex h-[4.5rem] w-full items-center justify-center">
                  {/* Soft white under-light (normal) */}
                  <span
                    className="pointer-events-none absolute bottom-1 left-1/2 h-8 w-14 -translate-x-1/2 rounded-[100%] opacity-90 blur-[6px] transition-opacity duration-300 group-hover:opacity-0"
                    style={{
                      background:
                        'radial-gradient(ellipse at center, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.18) 45%, transparent 72%)',
                    }}
                    aria-hidden="true"
                  />
                  {/* Soft green under-light (hover) — Variation 2 */}
                  <span
                    className="pointer-events-none absolute bottom-1 left-1/2 h-8 w-14 -translate-x-1/2 rounded-[100%] opacity-0 blur-[6px] transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(ellipse at center, rgba(${HOVER_GREEN},0.55) 0%, rgba(${HOVER_GREEN},0.22) 45%, transparent 72%)`,
                    }}
                    aria-hidden="true"
                  />
                  {/* Wider ambient floor glow */}
                  <span
                    className="pointer-events-none absolute bottom-0 left-1/2 h-5 w-20 -translate-x-1/2 rounded-[100%] opacity-40 blur-md transition-all duration-300 group-hover:opacity-70 group-hover:blur-lg"
                    style={{
                      background:
                        'radial-gradient(ellipse at center, rgba(255,255,255,0.28) 0%, transparent 70%)',
                    }}
                    aria-hidden="true"
                  />
                  <span
                    className="pointer-events-none absolute bottom-0 left-1/2 h-5 w-20 -translate-x-1/2 rounded-[100%] opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-60"
                    style={{
                      background: `radial-gradient(ellipse at center, rgba(${HOVER_GREEN},0.35) 0%, transparent 70%)`,
                    }}
                    aria-hidden="true"
                  />

                  {/* Chrome icon */}
                  <span
                    className="relative z-10 text-zinc-200 drop-shadow-[0_2px_6px_rgba(255,255,255,0.22)] transition-[color,filter,drop-shadow] duration-300 group-hover:text-zinc-100 group-hover:drop-shadow-[0_0_10px_rgba(110,170,130,0.35)]"
                    style={{
                      filter:
                        'drop-shadow(0 1px 0 rgba(255,255,255,0.35)) drop-shadow(0 2px 4px rgba(0,0,0,0.55))',
                    }}
                  >
                    {i.icon}
                  </span>
                </span>

                {/* Name */}
                <span className="relative z-10 text-sm font-semibold tracking-tight text-white/90 transition-colors duration-300 group-hover:text-white sm:text-base">
                  {i.name}
                </span>

                {/* CTA */}
                <span className="relative z-10 mt-auto inline-flex items-center gap-1.5 text-xs text-white/40 transition-all duration-300 group-hover:gap-2 group-hover:text-white/65">
                  Learn more
                  <ArrowRight
                    size={12}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
