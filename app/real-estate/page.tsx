import type { Metadata } from 'next';
import { IndustryPage } from '@/components/IndustryPage';
import { INDUSTRY_ECONOMICS } from '@/content/industry-economics';

export const metadata: Metadata = {
  title: 'AI Voice Agent for Real Estate',
  description:
    'Capture sign calls, qualify buyers and sellers, and book showings — 24/7. AI receptionist built for real estate agents and brokerages.',
  alternates: { canonical: '/real-estate' },
  openGraph: {
    title: 'AI Voice Agent for Real Estate · growthmindset.ai',
    description:
      'Capture sign calls, qualify buyers and sellers, and book showings — 24/7.',
    url: '/real-estate',
  },
};

export default function RealEstatePage() {
  return (
    <IndustryPage
      videoId="ZhWcJKkFIgs"
      economics={INDUSTRY_ECONOMICS.realEstate}
      name="Real Estate"
      title="AI Voice Agent for Real Estate"
      headline="Sign-Call Follow-Up in 30 Seconds"
      headlineSecondary="Not 30 Minutes"
      sub="A buyer drives by your listing, calls the sign, and gets voicemail. They're already on Zillow before you see the missed call. The AI answers instantly — qualifies buyer vs. seller, timeline, budget — and books the showing."
      trust="Built for sign calls + lead qualification"
      bullets={[
        "Answers sign calls in under 2 seconds — captures the lead before they browse away.",
        "Qualifies buyer vs. seller, timeline, price range, and pre-approval status.",
        "Books showings directly into your calendar with property and lead details.",
        "Handles after-hours and weekend calls when you're at other showings.",
        "Texts the caller the listing details and your contact info immediately.",
        "Routes hot leads to your cell for immediate follow-up.",
      ]}
    />
  );
}
