import type { Metadata } from 'next';
import { StubPage } from '@/components/StubPage';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'GrowthMindset.ai terms of service.',
  alternates: { canonical: '/terms' },
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <StubPage
      eyebrow="Legal"
      title="Terms of Service"
      body={
        <p className="text-ink-dim">
          Terms of Service content to be provided by legal counsel. Placeholder
          page so footer links resolve.
        </p>
      }
    />
  );
}
