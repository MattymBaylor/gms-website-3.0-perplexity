import { CTAForm } from '../CTAForm';

export function PrimaryCTA() {
  return (
    <section id="cta" className="section relative overflow-hidden" aria-labelledby="cta-heading">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(249,115,22,0.08), transparent 60%)',
        }}
        aria-hidden="true"
      />
      <div className="container-prose">
        <div className="mb-10 text-center">
          <p className="eyebrow">Demo first</p>
          <h2 id="cta-heading" className="mt-3 text-h1 font-semibold text-ink">
            Get Your Free AI Demo
          </h2>
          <p className="mt-4 text-lead text-ink-muted">
            See your call flow before you pay. 14-day trial, then{' '}
            <span className="text-ink">$397/mo</span>. No contracts.
          </p>
        </div>

        <CTAForm />
      </div>
    </section>
  );
}
