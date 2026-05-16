import type { Metadata } from 'next';
import { IndustryPage } from '@/components/IndustryPage';

export const metadata: Metadata = {
  title: 'AI Voice Agent for Home Service Businesses',
  description:
    'Capture every inbound call, qualify leads, and book jobs — 24/7. AI receptionist built for painters, landscapers, handymen, and cleaners.',
  alternates: { canonical: '/home-services' },
  openGraph: {
    title: 'AI Voice Agent for Home Services · GrowthMindset.ai',
    description:
      'Capture every inbound call, qualify leads, and book jobs — 24/7.',
    url: '/home-services',
  },
};

export default function HomeServicesPage() {
  return (
    <IndustryPage
      name="Home Services"
      title="AI Voice Agent for Home Service Businesses"
      headline="You're Under a House. Inside a Crawlspace."
      headlineSecondary="The Phone Rings. Now What?"
      sub="Painters, landscapers, handymen, cleaners, pool service — if you answer the phone for jobs, and you can't always answer the phone, you need this. The AI picks up, qualifies the lead, and books the estimate while your hands are full."
      trust="Built for any service business that books jobs by phone"
      bullets={[
        "Answers every call — no voicemail, no hold music, no 'I'll call you back.'",
        "Qualifies the job scope, timeline, budget range, and property details.",
        "Books estimates and jobs directly into your calendar or scheduling tool.",
        "Handles 20 simultaneous calls during busy seasons without dropping a lead.",
        "Texts the customer a confirmation with your company info the moment the call ends.",
        "Trained on your specific services, pricing, and service area — sounds like your shop.",
      ]}
    />
  );
}
