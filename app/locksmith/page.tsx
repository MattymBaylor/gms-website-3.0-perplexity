import type { Metadata } from 'next';
import { IndustryPage } from '@/components/IndustryPage';
import { INDUSTRY_ECONOMICS } from '@/content/industry-economics';

export const metadata: Metadata = {
  title: 'AI Voice Agent for Locksmiths',
  description:
    'Convert lockout emergencies into booked jobs — 24/7. AI receptionist built for locksmith businesses.',
  alternates: { canonical: '/locksmith' },
  openGraph: {
    title: 'AI Voice Agent for Locksmiths · growthmindset.ai',
    description:
      'Convert lockout emergencies into booked jobs — 24/7.',
    url: '/locksmith',
  },
};

export default function LocksmithPage() {
  return (
    <IndustryPage
      videoId="iPzWroC610Y"
      economics={INDUSTRY_ECONOMICS.locksmith}
      name="Locksmith"
      title="AI Voice Agent for Locksmiths"
      headline="A Lockout at 2am Means One Call"
      headlineSecondary="Make Sure It's Yours They Answer"
      sub="Lockout emergencies are the most time-sensitive calls in home services. The caller goes down the Google list and stops at the first answer. The AI picks up instantly, qualifies the job, and dispatches your nearest tech."
      trust="Built for emergency lockout + rekey services"
      bullets={[
        "Answers lockout emergencies in under 2 seconds — before they call the next locksmith.",
        "Qualifies vehicle vs. home vs. commercial and captures make/model or lock type.",
        "Dispatches your nearest available tech based on location and availability.",
        "Handles price-range questions with your approved quoting guidelines.",
        "Texts the customer your tech's ETA and vehicle description for safety.",
        "Captures rekey and security upgrade requests for daytime follow-up.",
      ]}
    />
  );
}
