import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { PrimaryCTA } from '@/components/sections/PrimaryCTA';
import { FAQ } from '@/components/sections/FAQ';
import { ArrowRight, CheckCircle2, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'One plan, $397 per month. Unlimited AI call answering, lead qualification, booking, and text follow-up. 14-day free trial, no contract, live in 48 hours.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'Pricing · growthmindset.ai',
    description:
      'One plan, $397 per month. Unlimited AI call answering, booking, and follow-up. 14-day free trial, no contract.',
    url: '/pricing',
  },
};

const INCLUDED = [
  '24/7 AI voice agent — answers every call on the first ring',
  'Lead qualification and intake in your voice and service area',
  'Appointment booking into your existing calendar or scheduler',
  'Automatic confirmation and follow-up texts on every call',
  'Missed-call recovery with instant callback',
  'Call summaries and transcripts sent straight to you',
  'English and Spanish call handling',
  'Setup and tuning done for you — live in 48 hours',
];

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
          <div
            className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[1100px] -translate-x-1/2"
            style={{
              background:
                'radial-gradient(ellipse 50% 50% at 50% 0%, rgba(0,212,255,0.10), transparent 60%)',
            }}
            aria-hidden="true"
          />
          <div className="container-wide">
            <div className="max-w-2xl">
              <p className="eyebrow">Pricing</p>
              <h1 className="mt-4 text-hero font-semibold tracking-tight text-ink">
                One plan. One price.{' '}
                <span className="text-ink-muted">One booked job pays for it.</span>
              </h1>
              <p className="mt-6 text-lead text-ink-muted">
                No tiers, no per-minute meter, no annual lock-in — a single flat rate that costs
                less than one missed job a month.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="container-wide">
            <div className="mx-auto max-w-xl">
              <div className="card p-8 md:p-10">
                <p className="eyebrow">Smart Voice Agent</p>
                <div className="mt-4 flex items-end gap-2">
                  <span className="text-hero font-semibold text-ink">$397</span>
                  <span className="mb-2 text-ink-muted">/ month</span>
                </div>
                <p className="mt-2 text-sm text-ink-dim">
                  14-day free trial · no card to start · no contract · cancel anytime
                </p>

                <a href="#cta" className="btn-primary mt-6 w-full justify-center">
                  Start Free — Get Your Demo <ArrowRight size={16} />
                </a>
                <a href="tel:+12392599975" className="btn-ghost mt-3 w-full justify-center">
                  <Phone size={16} /> Hear it live: (239) 259-9975
                </a>

                <ul className="mt-8 space-y-3.5 border-t border-border pt-8">
                  {INCLUDED.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-ink">
                      <span className="mt-0.5 shrink-0 text-accent">
                        <CheckCircle2 size={18} />
                      </span>
                      <span className="text-sm leading-relaxed md:text-base">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-6 text-center text-sm text-ink-dim">
                Compare: a part-time receptionist runs $2,500–$4,000 a month and clocks out at 5pm.
                The AI never does.
              </p>
            </div>
          </div>
        </section>

        <PrimaryCTA />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
