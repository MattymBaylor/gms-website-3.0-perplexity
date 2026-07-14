'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Industry {
  slug: string;
  name: string;
  /** Metallic icon under /public/industries/icons — Variation 2 shapes */
  icon: string;
}

/**
 * Variation 2 — Soft Green Tint Hover
 * Icons: mockup metallic shapes (roof peak, pipe, bolt, shield, keys, hat, building, scales).
 * Normal: chrome metal + soft white under-light.
 * Hover: restrained sage tint on metal + green under-light (no hard color wash).
 */
const INDUSTRIES: Industry[] = [
  // Mockup order first
  { slug: 'roofing', name: 'Roofing', icon: 'roofing' },
  { slug: 'plumbing', name: 'Plumbing', icon: 'plumbing' },
  { slug: 'electrical', name: 'Electrical', icon: 'electrical' },
  { slug: 'insurance', name: 'Insurance', icon: 'insurance' },
  { slug: 'locksmith', name: 'Locksmith', icon: 'locksmith' },
  { slug: 'home-services', name: 'Home Services', icon: 'home-services' },
  { slug: 'real-estate', name: 'Real Estate', icon: 'real-estate' },
  { slug: 'legal', name: 'Legal', icon: 'legal' },
  // Extended catalog
  { slug: 'hvac', name: 'HVAC', icon: 'hvac' },
  { slug: 'medical', name: 'Medical / Dental', icon: 'medical' },
  { slug: 'property-management', name: 'Property Mgmt', icon: 'property-management' },
  { slug: 'custom', name: 'Custom', icon: 'custom' },
];

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
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
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
                className="group relative flex h-full w-full flex-col items-center gap-2 overflow-hidden rounded-2xl border border-white/[0.06] bg-[#121214] px-3 py-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 hover:border-white/[0.1] hover:bg-[#131816] sm:px-4 sm:py-6"
                aria-label={`${i.name} — AI voice agent details`}
              >
                {/* Soft ambient green veil on hover */}
                <span
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(ellipse at 50% 32%, rgba(${HOVER_GREEN},0.12), transparent 68%)`,
                  }}
                  aria-hidden="true"
                />

                <span className="relative z-10 flex h-[4.75rem] w-full items-center justify-center sm:h-[5.25rem]">
                  {/* White under-light */}
                  <span
                    className="pointer-events-none absolute bottom-0 left-1/2 h-8 w-14 -translate-x-1/2 rounded-[100%] opacity-80 blur-[6px] transition-opacity duration-300 group-hover:opacity-0"
                    style={{
                      background:
                        'radial-gradient(ellipse at center, rgba(255,255,255,0.48) 0%, rgba(255,255,255,0.1) 50%, transparent 72%)',
                    }}
                    aria-hidden="true"
                  />
                  {/* Green under-light */}
                  <span
                    className="pointer-events-none absolute bottom-0 left-1/2 h-8 w-14 -translate-x-1/2 rounded-[100%] opacity-0 blur-[6px] transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(ellipse at center, rgba(${HOVER_GREEN},0.55) 0%, rgba(${HOVER_GREEN},0.16) 50%, transparent 72%)`,
                    }}
                    aria-hidden="true"
                  />

                  {/* Icons only +10% — card/button footprint unchanged */}
                  <Image
                    src={`/industries/icons/${i.icon}.png`}
                    alt=""
                    width={124}
                    height={124}
                    className="relative z-10 h-[4.4rem] w-[4.4rem] object-contain transition-[filter,transform] duration-300 group-hover:scale-[1.03] group-hover:[filter:sepia(0.4)_hue-rotate(72deg)_saturate(0.88)_brightness(1.06)] sm:h-[4.95rem] sm:w-[4.95rem]"
                    aria-hidden="true"
                  />
                </span>

                <span className="relative z-10 text-sm font-semibold tracking-tight text-white/90 transition-colors duration-300 group-hover:text-white sm:text-[0.95rem]">
                  {i.name}
                </span>

                <span className="relative z-10 mt-auto inline-flex items-center gap-1 text-[11px] text-white/40 transition-all duration-300 group-hover:gap-1.5 group-hover:text-white/60">
                  Learn more
                  <ArrowRight
                    size={11}
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
