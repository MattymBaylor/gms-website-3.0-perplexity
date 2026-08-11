import type { Metadata } from 'next';
import Link from 'next/link';
import { AgentFrame } from '@/components/sections/AgentFrame';

/**
 * /demo — the link that goes out to HVAC, roofing and plumbing owners by email.
 *
 * The email does the selling, so this page does not. No nav, no hero, no steps,
 * no second CTA: the card is the first and only thing on screen, with one line
 * under it for anyone who wants to know who sent it. Every reduction here is
 * deliberate — do not add sections back without asking Matt.
 *
 * public/demo-appointment is a different page owned by another thread and is
 * not touched by anything here.
 */
export const metadata: Metadata = {
  title: 'Talk to the Agent — Live Demo',
  description:
    'A live AI appointment-confirmation agent, answering in your browser right now. Not a recording.',
  alternates: { canonical: '/demo' },
  openGraph: {
    type: 'website',
    url: '/demo',
    title: 'Talk to the Agent — Live Demo',
    description:
      'A live AI appointment-confirmation agent, answering in your browser right now. Not a recording.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Talk to the Agent — Live Demo',
    description:
      'A live AI appointment-confirmation agent, answering in your browser right now. Not a recording.',
  },
};

export default function DemoPage() {
  return (
    <main id="main" className="flex min-h-screen flex-col items-center justify-center px-5 py-10 sm:py-14">
      <AgentFrame />

      <p className="mt-8 text-center text-sm text-ink-muted">
        To learn more visit{' '}
        <Link
          href="/"
          className="font-medium text-accent underline underline-offset-4 transition-colors hover:text-ink"
        >
          growthmindset.ai
        </Link>
      </p>
    </main>
  );
}
