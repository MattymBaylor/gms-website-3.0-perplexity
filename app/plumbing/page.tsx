import type { Metadata } from 'next';
import { IndustryPage } from '@/components/IndustryPage';
import { INDUSTRY_ECONOMICS } from '@/content/industry-economics';

export const metadata: Metadata = {
  title: 'AI Voice Agent for Plumbers',
  description:
    'Capture every burst-pipe emergency and routine service call — 24/7. AI receptionist built for plumbing businesses.',
  alternates: { canonical: '/plumbing' },
  openGraph: {
    title: 'AI Voice Agent for Plumbers · growthmindset.ai',
    description:
      'Capture every burst-pipe emergency and routine service call — 24/7.',
    url: '/plumbing',
  },
};

export default function PlumbingPage() {
  return (
    <IndustryPage
      economics={INDUSTRY_ECONOMICS.plumbing}
      name="Plumbing"
      title="AI Voice Agent for Plumbers"
      headline="Burst Pipes Don't Wait for Business Hours"
      headlineSecondary="Neither Should Your Phones"
      sub="A flooded kitchen at 2am means a panicked homeowner calling every plumber on Google. The AI picks up first, triages the emergency, and dispatches your on-call tech — while you sleep."
      trust="Built for emergency dispatch + routine service"
      bullets={[
        "Triages true emergencies (burst pipes, sewage backup) vs. routine repairs in the first 20 seconds.",
        "Captures problem details, water shutoff status, and property type before dispatch.",
        "Books into your scheduling system — ServiceTitan, Housecall Pro, Jobber, or Google Calendar.",
        "Handles after-hours calls without paying a night dispatcher or answering service.",
        "Sends the homeowner a text confirmation with your tech's ETA and company info.",
        "Qualifies commercial vs. residential and routes accordingly.",
      ]}
    />
  );
}
