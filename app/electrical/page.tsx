import type { Metadata } from 'next';
import { IndustryPage } from '@/components/IndustryPage';

export const metadata: Metadata = {
  title: 'AI Voice Agent for Electricians',
  description:
    'Capture service calls, panel upgrades, and EV charger installs — 24/7. AI receptionist built for electrical contractors.',
  alternates: { canonical: '/electrical' },
  openGraph: {
    title: 'AI Voice Agent for Electricians · GrowthMindset.ai',
    description:
      'Capture service calls, panel upgrades, and EV charger installs — 24/7.',
    url: '/electrical',
  },
};

export default function ElectricalPage() {
  return (
    <IndustryPage
      name="Electrical"
      title="AI Voice Agent for Electricians"
      headline="Every Unanswered Call Powers Someone Else's Business"
      headlineSecondary="Don't Let Leads Go Dark"
      sub="Service calls, panel upgrades, EV charger installs, code violations — your callers need answers fast. The AI qualifies the job, captures the details, and books it before your competitor returns a voicemail."
      trust="Built for residential + commercial electrical"
      bullets={[
        "Qualifies job type — service repair, new construction, panel upgrade, EV install, or inspection.",
        "Captures breaker info, outlet count, and whether permits are needed.",
        "Routes commercial jobs to your commercial team, residential to residential.",
        "Handles 20 simultaneous calls during new-build season without missing a lead.",
        "Books estimates directly into your calendar with all qualifying details attached.",
        "Texts the customer a confirmation and your license number for their records.",
      ]}
    />
  );
}
