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
          <p className="eyebrow">The Demo IS the Product</p>
          <h2 id="cta-heading" className="mt-3 text-h1 font-semibold text-ink">
            Hear it answer the phone for your business
          </h2>
          <p className="mt-4 text-lead text-ink-muted">
            Fill this out and we&apos;ll build a voice agent trained on your business — your
            services, your service area, your reviews.{' '}
            <span className="text-ink">Within 24 hours it lands in your inbox.</span> One click
            activates it, and you can call it yourself.
          </p>
          <p className="mt-3 text-sm text-ink-dim">
            Free to try · 14-day trial, then <span className="text-ink-muted">$397/mo</span> · No
            contracts
          </p>
        </div>

        <CTAForm />
      </div>
    </section>
  );
}
