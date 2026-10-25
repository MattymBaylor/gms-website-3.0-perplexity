import type { Metadata } from 'next';
import Link from 'next/link';
import { TryForm } from '@/components/TryForm';

/**
 * /try — GMS Demo Blitz landing page (ChatGPT ads + Sales Navigator links).
 *
 * One screen on mobile, one form, one button. Copy comes from the
 * "GMS Demo Blitz — Launch Plan" doc, Ad copy tab, "/try landing page".
 * Not indexed: it is an ad destination, not a search page.
 */
export const metadata: Metadata = {
  title: 'Your AI receptionist calls you in 60 seconds',
  description:
    'Give us your website. She reads it, learns your services, and calls your cell. Try to stump her.',
  alternates: { canonical: '/try' },
  robots: { index: false, follow: false },
};

export default function TryPage() {
  return (
    <main id="main" className="flex min-h-screen flex-col items-center justify-center px-4 py-8 sm:py-14">
      <div className="w-full max-w-md">
        <TryForm />
        <p className="mt-6 text-center text-sm text-ink-muted">
          Built by{' '}
          <Link href="/" className="font-medium text-accent underline underline-offset-4 hover:text-ink">
            growthmindset.ai
          </Link>
        </p>
      </div>
    </main>
  );
}
