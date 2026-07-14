'use client';

/**
 * Continuous testimonial ticker — industry-labeled quotes on a seamless
 * marquee (items rendered twice, translateX -50%). Soft edge fades so the
 * strip dissolves into the page margins. Hover pauses; reduced-motion users
 * get a static horizontal scroll.
 */

export interface Testimonial {
  industry: string;
  quote: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    industry: 'Roofing',
    quote:
      "We went from missing storm-season calls to having our phone answered instantly, every time. The AI books inspections while my crew's still on the roof.",
  },
  {
    industry: 'Roofing',
    quote:
      "Our close rate on inbound leads jumped once every caller got a live 'person' on the first ring. I stopped worrying about who's covering the phone at night.",
  },
  {
    industry: 'HVAC',
    quote:
      'Holiday and after-hours AC emergencies used to go straight to voicemail. Now the AI picks up, qualifies, and books the job before they can call a competitor.',
  },
  {
    industry: 'HVAC',
    quote:
      'It sounds like a real CSR, asks the right questions, and texts customers confirmations automatically. My techs just show up to pre-qualified, high-value service calls.',
  },
  {
    industry: 'Insurance',
    quote:
      "We plugged the AI into our existing phone number and it started capturing quote requests we didn't even know we were missing. Our producers now walk into conversations already pre-qualified.",
  },
  {
    industry: 'Insurance',
    quote:
      'Clients get immediate reassurance when something goes wrong, instead of waiting on hold or leaving a voicemail. That alone has cut down on angry follow-up calls.',
  },
  {
    industry: 'Plumbing',
    quote:
      "Weekend backups and emergency leaks are now our best jobs instead of our biggest headaches. The AI calmly walks customers through the issue and gets us on the schedule in minutes.",
  },
  {
    industry: 'Plumbing',
    quote:
      "We didn't change our ads at all — just stopped losing the calls they generated. Revenue went up, and my office manager finally got her evenings back.",
  },
  {
    industry: 'Electrical',
    quote:
      "Homeowners don't care if it's AI or a person; they care that someone answers and gets them on the calendar. This does that without ever getting tired.",
  },
  {
    industry: 'Electrical',
    quote:
      'After switching it on, our missed-call report basically went to zero. Now even 9 p.m. panel-trouble calls turn into booked estimates instead of lost opportunities.',
  },
  {
    industry: 'Property Management',
    quote:
      'Tenants get someone answering 24/7, logging every detail, and routing it to the right team. My maintenance coordinator went from drowning in voicemails to simply prioritizing jobs.',
  },
  {
    industry: 'Property Management',
    quote:
      'Emergency calls no longer depend on who happens to be near the phone. The AI captures everything, texts updates, and keeps our owners and tenants calm and informed.',
  },
];

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
  const many = TESTIMONIALS.length > 1;
  // ~7s per card keeps the ticker readable
  const durationSec = Math.max(TESTIMONIALS.length * 7, 70);

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
