import type { Metadata } from 'next';
import { StubPage } from '@/components/StubPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How GrowthMindset.ai collects, uses, and protects your information.',
  alternates: { canonical: '/privacy' },
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <StubPage
      eyebrow="Legal"
      title="Privacy Policy"
      body={
        <p className="text-ink-dim">
          Privacy Policy content to be provided by legal counsel. Placeholder
          page so footer links resolve and search engines see the route.
        </p>
      }
    />
  );
}
