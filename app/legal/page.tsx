import type { Metadata } from 'next';
import { IndustryPage } from '@/components/IndustryPage';
import { INDUSTRY_ECONOMICS } from '@/content/industry-economics';

export const metadata: Metadata = {
  title: 'AI Voice Agent for Law Firms',
  description:
    'Capture intake calls, pre-screen matters, and book consultations — 24/7. AI receptionist built for law firms and legal practices.',
  alternates: { canonical: '/legal' },
  openGraph: {
    title: 'AI Voice Agent for Law Firms · growthmindset.ai',
    description:
      'Capture intake calls, pre-screen matters, and book consultations — 24/7.',
    url: '/legal',
  },
};

export default function LegalPage() {
  return (
    <IndustryPage
      videoId="YfZhcfAQclI"
      economics={INDUSTRY_ECONOMICS.legal}
      name="Legal"
      title="AI Voice Agent for Law Firms"
      headline="Potential Clients Don't Leave Voicemails"
      headlineSecondary="They Call the Next Firm"
      sub="After-hours intake that respects compliance. The AI pre-screens the matter, captures details, checks for basic conflicts, and schedules the consultation — without making promises your firm can't keep."
      trust="Built for intake + consultation scheduling"
      bullets={[
        "Pre-screens practice area — family, personal injury, criminal, estate, business, immigration.",
        "Captures incident details, timeline, and opposing party info for conflict checks.",
        "Books consultations into your attorneys' calendars with full intake notes attached.",
        "Handles after-hours and weekend calls — when most legal emergencies happen.",
        "Never gives legal advice or makes guarantees — trained on compliance guardrails.",
        "Texts the caller a confirmation with your firm's info and consultation details.",
      ]}
    />
  );
}
