import type { Metadata } from 'next';
import { IndustryPage } from '@/components/IndustryPage';
import { INDUSTRY_ECONOMICS } from '@/content/industry-economics';

export const metadata: Metadata = {
  title: 'Custom AI Voice Agent for Your Business',
  description:
    'AI voice agent trained on your specific workflow, scripts, and qualifying questions. Built for any business that answers the phone for revenue.',
  alternates: { canonical: '/custom' },
  openGraph: {
    title: 'Custom AI Voice Agent · growthmindset.ai',
    description:
      'AI voice agent trained on your specific workflow, scripts, and qualifying questions.',
    url: '/custom',
  },
};

export default function CustomPage() {
  return (
    <IndustryPage
      videoId="TEUaEDQ1Tuo"
      economics={INDUSTRY_ECONOMICS.custom}
      name="Custom"
      title="Custom AI Voice Agent for Your Business"
      headline="Your Industry. Your Workflow. Your Voice."
      headlineSecondary="We Build It Around You"
      sub="Don't see your industry listed? It doesn't matter. The AI is trained on your specific workflow, scripts, qualifying questions, and tone. If your business answers the phone for revenue, we build the agent to match."
      trust="Built for any business that books by phone"
      bullets={[
        "Trained on your exact scripts, objection handling, and qualifying criteria.",
        "Learns your service area, pricing structure, and scheduling rules.",
        "Integrates with your existing CRM, calendar, or scheduling tool.",
        "Handles industry-specific terminology and caller expectations.",
        "24-hour turnaround — we research your business and have it live the next day.",
        "Ongoing optimization based on real call data and your feedback.",
      ]}
    />
  );
}
