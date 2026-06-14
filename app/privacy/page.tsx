import type { Metadata } from 'next';
import { StubPage } from '@/components/StubPage';
import { BrandName } from '@/components/BrandName';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How growthmindset.ai collects, uses, and protects your information.',
  alternates: { canonical: '/privacy' },
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

export default function PrivacyPage() {
  return (
    <StubPage
      eyebrow="Legal"
      title="Privacy Policy"
      body={
        <>
          <P>
            <span className="text-ink-dim">Last updated: {updated}</span>
          </P>
          <P>
            This Privacy Policy explains how <BrandName /> (&ldquo;we,&rdquo;
            &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and
            shares information when you visit our website, request a demo, or use our
            AI voice-agent services (the &ldquo;Services&rdquo;). By using the
            Services, you agree to the practices described here.
          </P>

          <H>Information We Collect</H>
          <P>We collect the following categories of information:</P>
          <List
            items={[
              <><strong className="text-ink">Information you provide.</strong> Your name, business name, business address, phone number, email address, and any details you submit through our forms or share with us.</>,
              <><strong className="text-ink">Call data.</strong> When our AI voice agent handles calls on your behalf, we process call audio, transcripts, caller phone numbers, and the information callers provide so the agent can qualify leads and book jobs.</>,
              <><strong className="text-ink">Usage and device data.</strong> IP address, browser type, pages viewed, referring URLs, and similar analytics collected automatically through cookies and comparable technologies.</>,
            ]}
          />

          <H>How We Use Information</H>
          <List
            items={[
              'To provide, operate, and improve the Services, including configuring and training your AI voice agent.',
              'To respond to demo requests, communicate with you, and provide customer support.',
              'To process payments and manage your subscription.',
              'To analyze usage, maintain security, prevent fraud, and comply with legal obligations.',
            ]}
          />

          <H>SMS Communications</H>
          <P>
            If you provide your mobile phone number and consent to receive text
            messages, <BrandName /> may send SMS communications regarding
            appointments, consultations, project updates, customer support, and
            requested information.
          </P>
          <List
            items={[
              'Message frequency varies.',
              'Message and data rates may apply.',
              'You may opt out at any time by replying STOP to any SMS message.',
              'For assistance, reply HELP or contact us through our website.',
            ]}
          />
          <P>
            SMS consent is not shared with third parties or affiliates for
            marketing purposes.
          </P>

          <H>Call Recording &amp; AI Processing</H>
          <P>
            Our Services answer and process phone calls using artificial
            intelligence. Call audio and transcripts may be recorded and processed
            to operate the agent and improve quality. As the business deploying the
            agent, you are responsible for providing any notices and obtaining any
            consents required by applicable call-recording and privacy laws in your
            jurisdiction.
          </P>

          <H>How We Share Information</H>
          <P>We do not sell your personal information. We share it only:</P>
          <List
            items={[
              <>With <strong className="text-ink">service providers</strong> (e.g., telephony, voice/AI model, hosting, and payment processors) who process data on our behalf under appropriate safeguards.</>,
              <>To comply with law, enforce our agreements, or protect the rights, safety, and property of <BrandName />, our customers, or others.</>,
              'In connection with a merger, acquisition, or sale of assets, subject to this Policy.',
            ]}
          />

          <H>Data Retention</H>
          <P>
            We retain information for as long as needed to provide the Services and
            for legitimate business or legal purposes. You may request deletion of
            your information as described below.
          </P>

          <H>Security</H>
          <P>
            We use reasonable administrative, technical, and physical safeguards to
            protect your information. No method of transmission or storage is
            completely secure, and we cannot guarantee absolute security.
          </P>

          <H>Your Rights &amp; Choices</H>
          <P>
            Depending on your location, you may have the right to access, correct,
            delete, or restrict the use of your personal information, and to opt out
            of certain processing. To exercise these rights, contact us at{' '}
            <a href="mailto:matt@growthmindset.ai" className="link-accent">matt@growthmindset.ai</a>.
            You can also manage cookies through your browser settings.
          </P>

          <H>Children&apos;s Privacy</H>
          <P>
            The Services are intended for businesses and are not directed to
            children under 13. We do not knowingly collect information from
            children.
          </P>

          <H>Changes to This Policy</H>
          <P>
            We may update this Policy from time to time. Material changes will be
            reflected by updating the &ldquo;Last updated&rdquo; date above.
          </P>

          <H>Contact Us</H>
          <P>
            Questions about this Policy? Email{' '}
            <a href="mailto:matt@growthmindset.ai" className="link-accent">matt@growthmindset.ai</a>.
          </P>
        </>
      }
    />
  );
}
