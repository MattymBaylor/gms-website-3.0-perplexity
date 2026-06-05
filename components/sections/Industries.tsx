import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Industry {
  slug: string;
  name: string;
  /** Crawlable description for SEO + screen readers. */
  blurb: string;
  /** "r, g, b" accent used for the card glow + Learn more link. */
  accent: string;
}

/**
 * Order + slugs match the existing app/ routes exactly.
 * Each card is a real <Link> anchor (no JS required to navigate) so the grid
 * is fully crawlable and works before hydration on mobile.
 *
 * Icon art lives at /public/industries-cropped/<slug>.webp (3D glow icons with
 * the baked-in label cropped off). next/image derives responsive webp/avif and
 * a sized fallback automatically.
 */
const INDUSTRIES: Industry[] = [
  { slug: 'hvac',                name: 'HVAC',             accent: '0, 180, 220',   blurb: 'Capture every no-heat emergency call, qualify the panic vs. the maintenance question, and book the right tech 24/7.' },
  { slug: 'roofing',            name: 'Roofing',          accent: '220, 140, 50',  blurb: 'Storm jobs, insurance claims, and repairs — every roofing call asked the right questions and routed to the right crew.' },
  { slug: 'plumbing',           name: 'Plumbing',         accent: '60, 130, 220',  blurb: 'Burst pipes don’t wait for business hours. The AI books after-hours plumbing emergencies without a night dispatcher.' },
  { slug: 'electrical',         name: 'Electrical',       accent: '240, 210, 50',  blurb: 'Service calls, panel upgrades, and EV chargers qualified and scheduled before your competitor returns a voicemail.' },
  { slug: 'insurance',          name: 'Insurance',        accent: '80, 180, 100',  blurb: 'Quote intake without the wait. The AI captures the basics, qualifies coverage type, and books the agent for the close.' },
  { slug: 'real-estate',        name: 'Real Estate',      accent: '180, 100, 220', blurb: 'Sign-call follow-up in 30 seconds. Qualifies buyer vs. seller, timeline, and price band, then books the showing.' },
  { slug: 'legal',              name: 'Legal',            accent: '160, 160, 180', blurb: 'After-hours legal intake that respects compliance. Pre-screens conflicts and schedules the consultation.' },
  { slug: 'medical',            name: 'Medical / Dental', accent: '220, 70, 90',   blurb: 'Patient calls, appointment requests, and refills triaged 24/7 with HIPAA-ready guardrails for medical and dental offices.' },
  { slug: 'locksmith',          name: 'Locksmith',        accent: '220, 180, 60',  blurb: 'Lockout emergencies converted before the caller dials the next number. AI dispatches the nearest locksmith.' },
  { slug: 'property-management', name: 'Property Mgmt',   accent: '140, 100, 220', blurb: 'Tenant maintenance requests captured with unit number, issue category, and severity, then routed to the right vendor.' },
  { slug: 'home-services',      name: 'Home Services',    accent: '60, 200, 160',  blurb: 'Painters, landscapers, handymen, and cleaners — any home services business that answers the phone for jobs.' },
  { slug: 'custom',             name: 'Custom',           accent: '0, 212, 255',   blurb: 'Industry not listed? The voice agent is trained on your specific workflow, scripts, and qualifying questions.' },
];

export function Industries() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Industries served by GrowthMindset.ai AI Voice Agents',
    itemListElement: INDUSTRIES.map((i, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: `AI Voice Agent for ${i.name}`,
      url: `https://growthmindset.ai/${i.slug}`,
    })),
  };

  return (
    <section id="industries" className="section" aria-labelledby="industries-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4" role="list">
          {INDUSTRIES.map((i) => (
            <li key={i.slug}>
              <Link
                href={`/${i.slug}`}
                aria-label={`Learn more about AI voice agents for ${i.name}`}
                className="group relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/[0.06] pb-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                style={{
                  background: `
                    radial-gradient(ellipse at 70% 15%, rgba(${i.accent}, 0.07), transparent 70%),
                    linear-gradient(180deg, rgba(20,20,23,1) 0%, rgba(12,12,15,1) 100%)
                  `,
                }}
              >
                {/* Top accent line */}
                <div
                  className="absolute left-0 right-0 top-0 z-20 h-px opacity-40 transition-opacity duration-300 group-hover:opacity-80"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, rgba(${i.accent}, 0.7) 50%, transparent 100%)`,
                  }}
                />

                {/* 3D icon art (label cropped off; rendered as live text below) */}
                <div className="relative aspect-[560/216] w-full overflow-hidden">
                  <Image
                    src={`/industries-cropped/${i.slug}.webp`}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  {/* Fade into the card body so the seam disappears */}
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
                    style={{ background: 'linear-gradient(180deg, transparent, rgba(14,14,17,1))' }}
                  />
                </div>

                {/* Name */}
                <span className="relative z-10 px-5 pt-3 text-base font-semibold text-white/90 transition-colors duration-300 group-hover:text-white">
                  {i.name}
                </span>

                {/* SEO / a11y description (present in DOM, visually hidden) */}
                <span className="sr-only">{i.blurb}</span>

                {/* Learn more */}
                <span
                  className="relative z-10 mt-auto inline-flex items-center gap-1.5 px-5 pt-3 text-xs transition-all duration-300 group-hover:gap-2"
                  style={{ color: `rgba(${i.accent}, 0.78)` }}
                >
                  <span className="transition-colors duration-300 group-hover:text-white/80">Learn more</span>
                  <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
