import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { VideoExplainer } from '@/components/sections/VideoExplainer';
import { PrimaryCTA } from '@/components/sections/PrimaryCTA';
import { FAQ } from '@/components/sections/FAQ';
import { ArrowRight, CheckCircle2, Phone, Calendar, MessageSquare, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Voice Agent',
  description:
    'An AI receptionist that answers every call, qualifies the lead, books the job, and texts the follow-up — 24/7, in your voice. Hear it live before you decide.',
  alternates: { canonical: '/voice' },
  openGraph: {
    title: 'AI Voice Agent · growthmindset.ai',
    description:
      'Answers every call, qualifies the lead, books the job, and texts the follow-up — 24/7. Hear it live.',
    url: '/voice',
  },
};

const STEPS = [
  {
    icon: Phone,
    title: 'It answers — first ring, every time',
    body: 'Nights, weekends, lunch rush, or five calls at once. The AI picks up on the first ring, so the lead never rolls to voicemail and never dials the next name on the list.',
  },
  {
    icon: CheckCircle2,
    title: 'It qualifies — in your words',
    body: 'It asks the questions you would ask — service type, urgency, address, budget — in your tone and your service area, and separates the emergency from the tire-kicker in the first twenty seconds.',
  },
  {
    icon: Calendar,
    title: 'It books — into your calendar',
    body: 'Straight into ServiceTitan, Housecall Pro, Jobber, or Google Calendar. The job is on the schedule before the caller hangs up.',
  },
  {
    icon: MessageSquare,
    title: 'It follows up — by text',
    body: 'The caller gets a confirmation text the moment the call ends, and you get the full summary — so no lead ever slips through the cracks.',
  },
];

const HANDLES = [
  'Missed-call recovery — every unanswered call gets an instant callback.',
  'After-hours and holiday coverage without paying overtime or a night receptionist.',
  'Overflow when your team is already on the phone — 20 simultaneous calls, no busy signal.',
  'Lead qualification and intake, scored and summarized before your tech rolls.',
  'Appointment booking, confirmations, and reschedules end to end.',
  'English and Spanish, in a voice that sounds like your front desk — not a robot.',
];

export default function VoicePage() {
  return (
    <>
      <Nav />
      <main id="main">
        <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
          <div
            className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[1100px] -translate-x-1/2"
            style={{
              background:
                'radial-gradient(ellipse 50% 50% at 50% 0%, rgba(0,212,255,0.10), transparent 60%)',
            }}
            aria-hidden="true"
          />
          <div className="container-wide">
            <div className="max-w-3xl">
              <p className="eyebrow">The AI Voice Agent</p>
              <h1 className="mt-4 text-hero font-semibold tracking-tight text-ink">
                Your phone, answered.{' '}
                <span className="text-ink-muted">Every call, every time.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lead text-ink-muted">
                Most contractors lose a third of their leads to voicemail. Our AI answers on the
                first ring, qualifies the caller, books the job, and texts the follow-up — 24/7, in
                your voice. You do the work; it keeps the calendar full.
              </p>
              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <a href="#cta" className="btn-primary">
                  Get Your Free Demo <ArrowRight size={16} />
                </a>
                <a href="tel:+12392599975" className="btn-ghost">
                  <Phone size={16} /> Hear it live: (239) 259-9975
                </a>
              </div>
              <p className="mt-6 inline-flex items-center gap-2 text-sm text-ink-dim">
                <Clock size={14} className="text-accent" />
                <span>Live in 48 hours · works with the tools you already use</span>
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container-wide">
            <p className="eyebrow">How it works</p>
            <h2 className="mt-3 text-h2 font-semibold text-ink">
              Four things happen on every call — automatically
            </h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {STEPS.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.title} className="card p-7 md:p-8">
                    <span className="inline-flex text-accent">
                      <Icon size={22} />
                    </span>
                    <h3 className="mt-4 text-base font-semibold text-ink md:text-lg">{s.title}</h3>
                    <p className="mt-2 text-ink-muted">{s.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <VideoExplainer />

        <section className="py-16 md:py-24">
          <div className="container-wide grid items-start gap-12 lg:grid-cols-[0.9fr_1fr]">
            <div>
              <p className="eyebrow">What it handles</p>
              <h2 className="mt-3 text-h2 font-semibold text-ink">
                Everything a great receptionist does — without the payroll
              </h2>
              <p className="mt-4 max-w-md text-ink-muted">
                One flat rate replaces missed calls, after-hours gaps, and overflow. It never calls
                in sick, never takes a lunch break, and never puts a paying customer on hold.
              </p>
            </div>
            <div className="card p-7 md:p-8">
              <ul className="space-y-3.5">
                {HANDLES.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-ink">
                    <span className="mt-0.5 shrink-0 text-accent">
                      <CheckCircle2 size={18} />
                    </span>
                    <span className="text-sm leading-relaxed md:text-base">{b}</span>
                  </li>
                ))}
              </ul>
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
