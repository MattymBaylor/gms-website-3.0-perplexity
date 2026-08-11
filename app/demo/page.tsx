import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { AgentFrame } from '@/components/sections/AgentFrame';

/**
 * /demo — the landing page behind the LinkedIn post.
 *
 * Deliberately narrow: the headline, the three things to try, and the agent.
 * Everything the standalone demo carries for its own sake — the stack chips,
 * the "demo, not the product" explainer, the voice-catalogue note — is stripped
 * by ?embed=1 inside AgentFrame, so a cold visitor from LinkedIn lands on the
 * form instead of scrolling past a spec sheet to find it.
 *
 * This is a page in this site, so the nav and footer bring the real logo and
 * palette with them. public/demo-appointment is a different page owned by
 * another thread and is not touched by anything here.
 */
export const metadata: Metadata = {
  title: "Don't Take My Word for It — Talk to the Agent",
  description:
    'A live AI appointment-confirmation agent, answering in your browser right now. Not a recording. Book a fake appointment and hear what your callers would hear.',
  alternates: { canonical: '/demo' },
  openGraph: {
    type: 'website',
    url: '/demo',
    title: "Don't Take My Word for It — Talk to the Agent",
    description:
      'A live AI appointment-confirmation agent, answering in your browser right now. Not a recording.',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Don't Take My Word for It — Talk to the Agent",
    description:
      'A live AI appointment-confirmation agent, answering in your browser right now. Not a recording.',
  },
};

const STEPS = [
  'Enter any appointment details. Made-up is fine — she works from whatever you put in.',
  'Tap Book Now and allow your mic. She calls you straight back, right in the page.',
  "Push back on her. Say you want to cancel, say you don't remember booking, say the price scares you.",
];

// Prefilled so the visitor sends a usable email instead of a blank one.
const MAILTO = `mailto:matt@growthmindset.ai?subject=${encodeURIComponent(
  'Get started — AI voice agent',
)}&body=${encodeURIComponent(
  [
    "I tried the demo and I'd like one set up for my business.",
    '',
    'First Name:',
    'Business Name:',
    'Business Address:',
    'Phone:',
    'Best time to call:',
    '',
    'What I want it to handle:',
  ].join('\n'),
)}`;

export default function DemoPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <section className="section" aria-labelledby="demo-heading">
          <div className="container-wide">
            <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Left: what this is and what to try */}
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-success">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-soft"
                    aria-hidden
                  />
                  Live agent — not a recording
                </p>

                <h1
                  id="demo-heading"
                  className="mt-5 text-hero font-semibold text-ink"
                >
                  Don&rsquo;t take my word for it.
                  <br />
                  <span className="text-accent">Talk to the agent.</span>
                </h1>

                <p className="mt-5 max-w-xl text-lead text-ink-muted">
                  This is a real appointment-confirmation agent &mdash; the same kind I
                  build for home-services companies. Fill in whatever details you like,
                  then talk to her. She works from exactly what you typed, handles your
                  objections, and knows when to stop selling and hand you off.
                </p>

                <ol className="mt-8 max-w-xl space-y-4">
                  {STEPS.map((step, i) => (
                    <li key={step} className="flex items-start gap-3.5">
                      <span
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-accent/30 bg-accent/10 font-mono text-[11px] font-bold text-accent"
                        aria-hidden
                      >
                        {i + 1}
                      </span>
                      <span className="text-sm leading-relaxed text-ink-muted sm:text-base">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Right: the agent */}
              <div className="lg:pt-2">
                <AgentFrame />
              </div>
            </div>

            {/* Two ways out: read more, or start. */}
            <div className="mx-auto mt-16 max-w-2xl border-t border-border pt-12 text-center">
              <h2 className="text-h2 font-semibold text-ink">
                Want one answering your phone?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
                Same agent, your business, your calls &mdash; trained on the language
                your callers actually use, answering 24/7 on a real phone number.
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a href={MAILTO} className="btn-primary w-full sm:w-auto">
                  <Mail size={16} aria-hidden /> Get Started Now
                </a>
                <Link href="/" className="btn-ghost w-full sm:w-auto">
                  Learn More <ArrowRight size={16} aria-hidden />
                </Link>
              </div>
              <p className="mt-4 text-xs text-ink-dim">
                &ldquo;Get Started Now&rdquo; opens an email to Matt with the details
                already filled in &mdash; add your name and send.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
