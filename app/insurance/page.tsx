import type { Metadata } from 'next';
import { IndustryPage } from '@/components/IndustryPage';

export const metadata: Metadata = {
  title: 'AI Voice Agent for Insurance Agencies',
  description:
    'Capture quote requests, qualify coverage type, and book consultations — 24/7. AI receptionist built for insurance agencies.',
  alternates: { canonical: '/insurance' },
  openGraph: {
    title: 'AI Voice Agent for Insurance Agencies · GrowthMindset.ai',
    description:
      'Capture quote requests, qualify coverage type, and book consultations — 24/7.',
    url: '/insurance',
  },
};

export default function InsurancePage() {
  return (
    <IndustryPage
      name="Insurance"
      title="AI Voice Agent for Insurance Agencies"
      headline="Quote Requests Don't Leave Voicemails"
      headlineSecondary="They Call the Next Agency"
      sub="When someone's shopping rates, they call three agencies and go with whoever picks up. The AI captures the intake, qualifies coverage type, and books your agent for the close — instantly."
      trust="Built for quote intake + policy service"
      bullets={[
        "Qualifies auto, home, life, commercial, or bundled — routes to the right agent.",
        "Captures current carrier, expiration date, and coverage level for faster quoting.",
        "Handles claims intake after hours — captures incident details and policy number.",
        "Books consultations directly into your agents' calendars.",
        "Texts the caller a confirmation with your agency info and appointment details.",
        "Filters rate-shoppers from serious buyers with the right qualifying questions.",
      ]}
    />
  );
}
