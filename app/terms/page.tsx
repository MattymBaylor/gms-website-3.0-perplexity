import type { Metadata } from 'next';
import { StubPage } from '@/components/StubPage';
import { BrandName } from '@/components/BrandName';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms governing your use of growthmindset.ai services.',
  alternates: { canonical: '/terms' },
  robots: { index: true, follow: true },
};

const updated = 'June 14, 2026';

function H({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-10 text-lg font-semibold text-ink">{children}</h2>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-ink-muted">{children}</p>;
}
function List({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-ink-muted">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );
}

export default function TermsPage() {
  return (
    <StubPage
      eyebrow="Legal"
      title="Terms of Service"
      body={
        <>
          <P>
            <span className="text-ink-dim">Last updated: {updated}</span>
          </P>
          <P>
            These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and
            use of the websites, AI voice-agent services, and related software
            provided by <BrandName /> (&ldquo;we,&rdquo;
            &ldquo;us,&rdquo; or &ldquo;our&rdquo;) (collectively, the
            &ldquo;Services&rdquo;). By accessing or using the Services, you agree to
            these Terms. If you do not agree, do not use the Services.
          </P>

          <H>The Services</H>
          <P>
            <BrandName /> provides AI voice agents and automation that answer calls,
            qualify leads, schedule appointments, and connect customer interactions
            into your workflows. We may update, improve, or modify the Services from
            time to time.
          </P>

          <H>Accounts &amp; Eligibility</H>
          <P>
            You must be at least 18 years old and able to form a binding contract to
            use the Services. You are responsible for the accuracy of the
            information you provide and for activity that occurs under your account.
          </P>

          <H>Fees, Trial &amp; Billing</H>
          <List
            items={[
              'Paid plans are billed on a recurring monthly basis at the rates presented at sign-up. Any free-trial period is described at the time of the offer; if you do not cancel before it ends, the plan converts to a paid subscription.',
              'Subscriptions are month-to-month and may be cancelled at any time, effective at the end of the current billing period. Fees already paid are non-refundable except where required by law.',
              'We may change pricing on a prospective basis with reasonable notice.',
            ]}
          />

          <H>SMS Terms of Service</H>
          <P>
            By providing your mobile phone number and opting into SMS
            communications, you agree to receive text messages from <BrandName />{' '}
            related to your inquiry, appointments, customer support, project
            updates, and requested services.
          </P>
          <List
            items={[
              'Message frequency varies.',
              'Message and data rates may apply.',
              'You may opt out at any time by replying STOP.',
              'For assistance, reply HELP.',
              'Consent to receive SMS messages is not a condition of purchase.',
              'Wireless carriers are not liable for delayed or undelivered messages.',
            ]}
          />

          <H>Your Responsibilities &amp; Acceptable Use</H>
          <P>You agree not to use the Services to:</P>
          <List
            items={[
              'Violate any law or regulation, including telemarketing, call-recording, consent (e.g., TCPA), and consumer-protection rules applicable to your calls and outreach.',
              'Infringe the rights of others or transmit unlawful, harmful, or fraudulent content.',
              'Interfere with, disrupt, reverse engineer, or attempt to gain unauthorized access to the Services.',
            ]}
          />
          <P>
            You are solely responsible for providing any legally required
            disclosures to, and obtaining any required consent from, callers and
            recipients regarding AI handling and call recording.
          </P>

          <H>Third-Party Services</H>
          <P>
            The Services rely on third-party providers (including telephony, AI/voice
            models, hosting, and payment processors). Your use may also be subject to
            those providers&apos; terms. We are not responsible for third-party
            services we do not control.
          </P>

          <H>Intellectual Property</H>
          <P>
            We retain all rights, title, and interest in the Services and our
            software. We grant you a limited, non-exclusive, non-transferable right
            to use the Services during your subscription. You retain ownership of the
            data and content you provide.
          </P>

          <H>Disclaimers</H>
          <P>
            The Services are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
            without warranties of any kind, whether express or implied, including
            merchantability, fitness for a particular purpose, and non-infringement.
            We do not warrant that the Services will be uninterrupted, error-free, or
            that the AI will perform without mistakes.
          </P>

          <H>Limitation of Liability</H>
          <P>
            To the maximum extent permitted by law, <BrandName /> will not be liable
            for any indirect, incidental, special, consequential, or punitive
            damages, or for lost profits, revenue, or data. Our total liability for
            any claim relating to the Services will not exceed the amount you paid us
            in the three (3) months preceding the event giving rise to the claim.
          </P>

          <H>Indemnification</H>
          <P>
            You agree to indemnify and hold <BrandName /> harmless from claims,
            losses, and expenses arising out of your use of the Services or your
            violation of these Terms or applicable law, including call-consent and
            recording requirements.
          </P>

          <H>Termination</H>
          <P>
            You may stop using the Services at any time. We may suspend or terminate
            access if you breach these Terms or use the Services in a way that
            creates risk or legal exposure. Provisions that by their nature should
            survive termination will survive.
          </P>

          <H>Changes to These Terms</H>
          <P>
            We may update these Terms from time to time. Material changes will be
            reflected by updating the &ldquo;Last updated&rdquo; date above. Continued
            use of the Services constitutes acceptance of the revised Terms.
          </P>

          <H>Contact Us</H>
          <P>
            Questions about these Terms? Email{' '}
            <a href="mailto:matt@growthmindset.ai" className="link-accent">matt@growthmindset.ai</a>.
          </P>
        </>
      }
    />
  );
}
