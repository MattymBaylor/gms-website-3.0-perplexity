import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { AgentFrame } from '@/components/sections/AgentFrame';

/**
 * /demo — the landing page behind the LinkedIn post.
 *
 * Deliberately bare: the site's own nav and footer for the logo and the way
 * back, one line of setup, the live agent, and two ways to act. Everything the
 * standalone demo carries for its own sake — its hero, its stack chips, its
 * footer — is stripped by ?embed=1 inside AgentFrame, so the visitor lands on
 * the form rather than scrolling to it.
 *
 * This is a page in this site, not a copy of the demo. public/demo-appointment
 * is untouched and still serves its own standalone page.
 */
export const metadata: Metadata = {
  title: 'Talk to the AI That Books Your Jobs',
  description:
    'A live AI voice agent, answering in your browser right now — not a recording. Book a fake appointment and hear exactly what your callers would hear.',
  alternates: { canonical: '/demo' },
  openGraph: {
    type: 'website',
    url: '/demo',
    title: 'Talk to the AI That Books Your Jobs',
    description:
      'A live AI voice agent, answering in your browser right now — not a recording.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Talk to the AI That Books Your Jobs',
    description:
      'A live AI voice agent, answering in your browser right now — not a recording.',
  },
};

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
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <p className="eyebrow">Live demo</p>
              <h1 id="demo-heading" className="mt-3 text-hero font-semibold text-ink">
                Talk to the AI That Books Your Jobs
              </h1>
              <p className="mt-4 text-lead text-ink-muted">
                Book a fake appointment below and the agent calls you back in your
                browser to confirm it. She&rsquo;s answering live &mdash; not a
                recording. Move the date on her, or tell her you never booked it, and
                hear exactly what your callers would hear.
              </p>
            </div>

            <AgentFrame />

            {/* Two ways out: read more, or start. */}
            <div className="mx-auto mt-12 max-w-2xl text-center">
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
