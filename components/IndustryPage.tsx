/**
 * Generic industry landing page template.
 * Each industry (HVAC, roofing, plumbing, etc.) supplies its own props;
 * the layout, sections, and CTA are identical to the homepage funnel.
 */

import Link from 'next/link';
import { Nav } from './Nav';
import { Footer } from './Footer';
import { VideoExplainer } from './sections/VideoExplainer';
import { MissedCallMath, type IndustryEconomics } from './sections/MissedCallMath';
import { CaseStudies } from './sections/CaseStudies';
import { EmailCapture } from './sections/EmailCapture';
import { PrimaryCTA } from './sections/PrimaryCTA';
import { FAQ } from './sections/FAQ';
import { ArrowLeft, ArrowRight, CheckCircle2, Users } from 'lucide-react';
import type { ReactNode } from 'react';

export interface IndustryPageProps {
  /** Display name, e.g. "HVAC" */
  name: string;
  /** SEO title */
  title: string;
  /** Hero headline — make it specific to the industry pain */
  headline: string;
  /** Two-tone secondary phrase that appears in muted ink */
  headlineSecondary?: string;
  /** Subheadline under the hero */
  sub: string;
  /** Trust-signal line under the CTAs */
  trust: string;
  /** Bullets specific to this industry */
  bullets: string[];
  /** Industry-specific YouTube cut; when set it wins the explainer slot */
  videoId?: string;
  /** Industry economics for the animated missed-call explainer; used when no videoId cut exists */
  economics?: IndustryEconomics;
  /** Optional content slotted between the video explainer and the case studies. */
  children?: ReactNode;
}

export function IndustryPage({
  name,
  headline,
  headlineSecondary,
  sub,
  trust,
  bullets,
  videoId,
  economics,
  children,
}: IndustryPageProps) {
  return (
    <>
      <Nav />
      <main id="main">
        {/* Hero — simpler than homepage hero (no blueprint), heavier on industry-specific bullets */}
        <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
          <div
            className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[1100px] -translate-x-1/2"
            style={{
              background:
                'radial-gradient(ellipse 50% 50% at 50% 0%, rgba(0,212,255,0.10), transparent 60%)',
            }}
            aria-hidden="true"
          />

          <div className="container-wide grid items-center gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
            <div>
              {/* Same pattern as mattmartelli subpages — little arrow, no pill */}
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-accent"
              >
                <ArrowLeft size={15} aria-hidden="true" />
                Back to home
              </Link>
              <p className="eyebrow mt-8">For {name} businesses</p>
              <h1 className="mt-4 text-hero font-semibold tracking-tight text-ink">
                {headline}{' '}
                {headlineSecondary && (
                  <span className="text-ink-muted">{headlineSecondary}</span>
                )}
              </h1>
              <p className="mt-6 max-w-xl text-lead text-ink-muted">{sub}</p>

              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <a href="#cta" className="btn-primary px-8 py-4 text-lg">
                  Get My Free Demo <ArrowRight size={18} />
                </a>
                <a
                  href="#case-studies"
                  className="text-sm text-ink-muted underline underline-offset-4 transition-colors hover:text-ink"
                >
                  or read the breakdown first
                </a>
              </div>

              <p className="mt-6 inline-flex items-center gap-2 text-sm text-ink-dim">
                <Users size={14} className="text-accent" />
                <span>{trust}</span>
              </p>
            </div>

            {/* Right column: industry-specific bullet card */}
            <div className="card p-7 md:p-8">
              <p className="eyebrow">What it does for {name}</p>
              <ul className="mt-5 space-y-3.5">
                {bullets.map((b) => (
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

        {videoId ? (
          <VideoExplainer videoId={videoId} />
        ) : economics ? (
          <MissedCallMath data={economics} />
        ) : (
          <VideoExplainer />
        )}

        {children}

        <CaseStudies />
        <EmailCapture />
        <PrimaryCTA />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
