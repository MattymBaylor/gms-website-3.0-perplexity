import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { BrandName } from '@/components/BrandName';
import { ValidationPanel } from './ValidationPanel';

export const metadata: Metadata = {
  title: 'AI Validation Panel — Pressure-test marketing for $1, not $20,000',
  description:
    'Paste your audience, goal, and message variants. Four AI personas score them, surface objections, and rewrite the winner stronger — in under four minutes.',
  alternates: { canonical: '/saas/ai-validation-panel' },
  openGraph: {
    type: 'website',
    title: 'AI Validation Panel — by growthmindset.ai',
    description:
      'What used to cost $20,000 in focus groups now costs a dollar. Run an AI persona panel on your marketing in under four minutes.',
    url: '/saas/ai-validation-panel',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Validation Panel — by growthmindset.ai',
    description:
      'What used to cost $20,000 in focus groups now costs a dollar. Run an AI persona panel on your marketing in under four minutes.',
  },
};

export default function AIValidationPanelPage() {
  return (
    <>
      <Nav />
      <main id="main" className="pt-32 pb-24 md:pt-40">
        <div className="container-prose">
          <div className="mx-auto max-w-3xl">
            {/* Header */}
            <p className="eyebrow">
              Free Tool · by <BrandName />
            </p>
            <h1 className="mt-3 text-h1 font-semibold text-ink">
              AI Validation Panel
            </h1>
            <p className="mt-5 text-lead text-ink-muted">
              What used to cost <span className="text-ink">$20,000</span> in focus
              groups now costs about <span className="text-ink">a dollar</span>.
              Pressure-test your marketing message against a panel of four
              independent AI personas — in under four minutes.
            </p>

            {/* What it is */}
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="card p-6">
                <p className="eyebrow">What you give us</p>
                <ol className="mt-4 space-y-3 text-ink-muted">
                  <li className="flex gap-3">
                    <span className="shrink-0 font-mono text-sm text-accent pt-0.5">
                      01
                    </span>
                    <span>
                      <span className="text-ink">Who it's for</span> — the audience
                      you're trying to reach.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 font-mono text-sm text-accent pt-0.5">
                      02
                    </span>
                    <span>
                      <span className="text-ink">What you want them to do</span> —
                      the goal of the message.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 font-mono text-sm text-accent pt-0.5">
                      03
                    </span>
                    <span>
                      <span className="text-ink">Two or more message variants</span>{' '}
                      to compare, one per line.
                    </span>
                  </li>
                </ol>
              </div>

              <div className="card p-6">
                <p className="eyebrow">What you get back</p>
                <ul className="mt-4 space-y-3 text-ink-muted">
                  <li className="flex gap-3">
                    <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>The winning message.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>Why it won across the panel.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>The main objections the personas raised.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>
                      Two to three sharpened rewrites that address those
                      objections.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="mt-10">
              <ValidationPanel />
            </div>

            <p className="mt-12 text-xs text-ink-dim">
              Runs on Grok (xAI). Your inputs are sent server-side to xAI and are
              not stored. Nothing is saved on growthmindset.ai.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
