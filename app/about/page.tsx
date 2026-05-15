import type { Metadata } from 'next';
import { StubPage } from '@/components/StubPage';

export const metadata: Metadata = {
  title: 'About',
  description: 'The story behind GrowthMindset.ai — AI voice agents for home service contractors.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <StubPage
      eyebrow="Who we are"
      title="About GrowthMindset.ai"
      body={
        <>
          <p>
            Growth Mindset was founded by Matt — a home services operator turned
            AI engineer — after watching too many contractors lose six-figure
            revenue to the simple act of not answering the phone.
          </p>
          <p className="mt-4">
            We build voice agents that sound like the best dispatcher you've
            ever hired, answer in under a second, and never miss a call. The
            tech under the hood is a multi-agent architecture (see the{' '}
            <a href="/seinfeld-hq" className="link-accent">
              Seinfeld HQ
            </a>{' '}
            interactive piece) — but for customers, it's just one thing: the
            phone gets answered, and the job gets booked.
          </p>
          <p className="mt-4 text-ink-dim">
            Full founder bio + E-E-A-T signals coming soon.
          </p>
        </>
      }
    />
  );
}
