'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Industry {
  slug: string;
  name: string;
  /** Metallic icon asset under /public/industries/icons */
  icon: string;
}

/**
 * Variation 2 — Soft Green Tint Hover
 * Icons: metallic shapes from the Variation 2 mockup (not Lucide outlines).
 * Normal: soft white levitating light under each icon.
 * Hover: under-icon light shifts to restrained sage green only.
 */
const INDUSTRIES: Industry[] = [
  { slug: 'hvac', name: 'HVAC', icon: 'hvac' },
  { slug: 'roofing', name: 'Roofing', icon: 'roofing' },
  { slug: 'plumbing', name: 'Plumbing', icon: 'plumbing' },
  { slug: 'electrical', name: 'Electrical', icon: 'electrical' },
  { slug: 'insurance', name: 'Insurance', icon: 'insurance' },
  { slug: 'real-estate', name: 'Real Estate', icon: 'real-estate' },
  { slug: 'legal', name: 'Legal', icon: 'legal' },
  { slug: 'medical', name: 'Medical / Dental', icon: 'medical' },
  { slug: 'locksmith', name: 'Locksmith', icon: 'locksmith' },
  { slug: 'property-management', name: 'Property Mgmt', icon: 'property-management' },
  { slug: 'home-services', name: 'Home Services', icon: 'home-services' },
  { slug: 'custom', name: 'Custom', icon: 'custom' },
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
                className="group relative flex h-full w-full flex-col items-center gap-2.5 overflow-hidden rounded-xl border border-white/[0.07] bg-gradient-to-b from-[#16161a] to-[#0c0c0f] px-4 py-6 text-center transition-all duration-300 hover:border-white/[0.12] sm:px-5 sm:py-7"
                aria-label={`${i.name} — AI voice agent details`}
              >
                {/* Icon stage — metallic mockup art + levitating under-light */}
                <span className="relative z-10 flex h-[5.25rem] w-full items-center justify-center sm:h-[5.75rem]">
                  {/* Soft white under-light (normal) */}
                  <span
                    className="pointer-events-none absolute bottom-1 left-1/2 h-9 w-16 -translate-x-1/2 rounded-[100%] opacity-90 blur-[7px] transition-opacity duration-300 group-hover:opacity-0"
                    style={{
                      background:
                        'radial-gradient(ellipse at center, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.16) 45%, transparent 72%)',
                    }}
                    aria-hidden="true"
                  />
                  {/* Soft green under-light (hover) — Variation 2 */}
                  <span
                    className="pointer-events-none absolute bottom-1 left-1/2 h-9 w-16 -translate-x-1/2 rounded-[100%] opacity-0 blur-[7px] transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(ellipse at center, rgba(${HOVER_GREEN},0.55) 0%, rgba(${HOVER_GREEN},0.2) 45%, transparent 72%)`,
                    }}
                    aria-hidden="true"
                  />
                  {/* Wider ambient floor */}
                  <span
                    className="pointer-events-none absolute bottom-0 left-1/2 h-5 w-20 -translate-x-1/2 rounded-[100%] opacity-35 blur-md transition-opacity duration-300 group-hover:opacity-0"
                    style={{
                      background:
                        'radial-gradient(ellipse at center, rgba(255,255,255,0.25) 0%, transparent 70%)',
                    }}
                    aria-hidden="true"
                  />
                  <span
                    className="pointer-events-none absolute bottom-0 left-1/2 h-5 w-20 -translate-x-1/2 rounded-[100%] opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-55"
                    style={{
                      background: `radial-gradient(ellipse at center, rgba(${HOVER_GREEN},0.32) 0%, transparent 70%)`,
                    }}
                    aria-hidden="true"
                  />

                  {/* Metallic mockup icon */}
                  <Image
                    src={`/industries/icons/${i.icon}.png`}
                    alt=""
                    width={96}
                    height={96}
                    className="relative z-10 h-[4.25rem] w-[4.25rem] object-contain transition-[filter,transform] duration-300 group-hover:scale-[1.04] group-hover:drop-shadow-[0_0_12px_rgba(110,170,130,0.35)] sm:h-[4.75rem] sm:w-[4.75rem]"
                    aria-hidden="true"
                  />
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
