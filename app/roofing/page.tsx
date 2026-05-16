import type { Metadata } from 'next';
import { IndustryPage } from '@/components/IndustryPage';

export const metadata: Metadata = {
  title: 'AI Voice Agent for Roofers',
  description:
    'Capture storm-surge calls, qualify insurance vs. cash jobs, and book inspections — 24/7. AI receptionist built for roofing companies.',
  alternates: { canonical: '/roofing' },
  openGraph: {
    title: 'AI Voice Agent for Roofers · GrowthMindset.ai',
    description:
      'Capture storm-surge calls, qualify insurance vs. cash jobs, and book inspections — 24/7.',
    url: '/roofing',
  },
};

export default function RoofingPage() {
  return (
    <IndustryPage
      name="Roofing"
      title="AI Voice Agent for Roofers"
      headline="When the Storm Stops, the Phones Don't"
      headlineSecondary="Be First, Every Time"
      sub="After every hailstorm, every homeowner on the block calls three roofers. The one who answers first wins. The AI answers instantly — qualifies insurance vs. cash, captures damage details, and books the inspection before the next ring."
      trust="Built for storm response + insurance restoration"
      bullets={[
        "Handles 20+ simultaneous calls during storm surges — no busy signals, no voicemail.",
        "Qualifies insurance claims vs. cash repairs and captures adjuster info when available.",
        "Captures roof age, material type, visible damage description, and property address.",
        "Books the inspection slot and texts the homeowner a confirmation with your company info.",
        "Filters tire-kickers from genuine leads by asking the right qualifying questions.",
        "Works 24/7 — because storm damage doesn't wait for Monday morning.",
      ]}
    />
  );
}
