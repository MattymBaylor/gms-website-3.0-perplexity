'use client';

/**
 * Continuous testimonial ticker — industry-labeled quotes on a seamless
 * marquee (items rendered twice, translateX -50%). Soft edge fades so the
 * strip dissolves into the page margins. Hover pauses; reduced-motion users
 * get a static horizontal scroll.
 *
 * Copy lives in content/testimonials.ts. Empty array → section not rendered.
 */

import { TESTIMONIALS, type Testimonial } from '@/content/testimonials';

function Card({ t, dup }: { t: Testimonial; dup: boolean }) {
  return (
    <figure
      className="tm-card w-[min(85vw,340px)] shrink-0 rounded-card border border-border bg-bg-card/70 p-5 sm:w-[min(70vw,380px)] sm:p-6"
      aria-hidden={dup || undefined}
    >
      <p className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-accent">
        {t.industry}
      </p>
      <blockquote className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-[0.95rem] sm:leading-[1.65]">
        <span className="text-ink/40" aria-hidden="true">
          “
        </span>
        {t.quote}
        <span className="text-ink/40" aria-hidden="true">
          ”
        </span>
      </blockquote>
    </figure>
  );
}

export function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  const many = TESTIMONIALS.length > 1;
  // ~7s per card keeps the ticker readable; floor so 1–2 cards still drift slowly
  const durationSec = Math.max(TESTIMONIALS.length * 7, 40);

  return (
    <section
      className="section pt-12 pb-16 md:pt-16 md:pb-20"
      aria-label="Customer testimonials"
    >
      <div className="mb-10 text-center md:mb-12">
        <p className="eyebrow">From the field</p>
        <h2 className="mt-3 text-h2 font-semibold tracking-tight text-ink md:text-h1">
          Operators, not theory
        </h2>
      </div>

      <div
        className="tm-viewport relative overflow-hidden"
        role="group"
        aria-roledescription="carousel"
        aria-label="Industry testimonials — auto-scrolling, hover to pause"
      >
        {/* Edge fades into page bg */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-bg to-transparent sm:w-20 md:w-28"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-bg to-transparent sm:w-20 md:w-28"
          aria-hidden="true"
        />

        <div
          className="tm-track flex w-max gap-4 px-2 sm:gap-5"
          style={{ ['--tm-dur' as string]: `${durationSec}s` }}
        >
          {TESTIMONIALS.map((t, i) => (
            <Card key={`a-${i}`} t={t} dup={false} />
          ))}
          {many &&
            TESTIMONIALS.map((t, i) => (
              <Card key={`b-${i}`} t={t} dup />
            ))}
          {/* Single card: still duplicate so -50% loop has distance */}
          {!many &&
            TESTIMONIALS.map((t, i) => (
              <Card key={`b-${i}`} t={t} dup />
            ))}
        </div>
      </div>

      <style>{`
        @keyframes tm-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .tm-track {
          animation: tm-marquee var(--tm-dur, 80s) linear infinite;
          will-change: transform;
        }
        .tm-viewport:hover .tm-track,
        .tm-viewport:focus-within .tm-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .tm-track {
            animation: none;
          }
          .tm-viewport {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scroll-snap-type: x mandatory;
          }
          .tm-card {
            scroll-snap-align: start;
          }
          .tm-card[aria-hidden="true"] {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
