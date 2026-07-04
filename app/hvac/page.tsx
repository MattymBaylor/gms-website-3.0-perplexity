import type { Metadata } from 'next';
import { IndustryPage } from '@/components/IndustryPage';
import { INDUSTRY_ECONOMICS } from '@/content/industry-economics';

export const metadata: Metadata = {
  title: 'AI Voice Agent for HVAC Contractors',
  description:
    'Capture every no-heat panic call, qualify maintenance vs. emergency, and book the right tech — 24/7. AI receptionist built for HVAC businesses.',
  alternates: { canonical: '/hvac' },
  openGraph: {
    title: 'AI Voice Agent for HVAC Contractors · growthmindset.ai',
    description:
      'Capture every no-heat panic call, qualify maintenance vs. emergency, and book the right tech — 24/7.',
    url: '/hvac',
  },
};

export default function HVACPage() {
  return (
    <IndustryPage
      videoId="8P6Hu1ggcQk"
      economics={INDUSTRY_ECONOMICS.hvac}
      name="HVAC"
      title="AI Voice Agent for HVAC Contractors"
      headline="When a Furnace Dies at 11pm"
      headlineSecondary="The First Number They Find Wins"
      sub="HVAC calls don't queue. They go down the Google list until someone picks up. The AI picks up first — qualifies the emergency, books the dispatch, and texts you the details before you finish dinner."
      trust="Built for emergency dispatch + maintenance scheduling"
      bullets={[
        "Triages no-heat / no-cool emergencies vs. routine service in the first 20 seconds.",
        "Captures system type, age, symptoms, and warranty status — your tech rolls fully briefed.",
        "Books into your existing scheduling tool (ServiceTitan, Housecall Pro, Jobber, or Google Calendar).",
        "Handles seasonal call surges — 20 simultaneous calls during the first cold snap, no extra hires.",
        "Quotes ranges and asks the qualifying questions you'd ask, in your tone, with your service area.",
        "Sends the homeowner a confirmation text the moment the call ends. No more 'I called someone, can't remember who.'",
      ]}
    />
  );
}
