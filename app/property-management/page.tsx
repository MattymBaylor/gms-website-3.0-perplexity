import type { Metadata } from 'next';
import { IndustryPage } from '@/components/IndustryPage';

export const metadata: Metadata = {
  title: 'AI Voice Agent for Property Management',
  description:
    'Capture tenant maintenance requests, qualify urgency, and route to vendors — 24/7. AI receptionist built for property managers.',
  alternates: { canonical: '/property-management' },
  openGraph: {
    title: 'AI Voice Agent for Property Management · GrowthMindset.ai',
    description:
      'Capture tenant maintenance requests, qualify urgency, and route to vendors — 24/7.',
    url: '/property-management',
  },
};

export default function PropertyManagementPage() {
  return (
    <IndustryPage
      name="Property Management"
      title="AI Voice Agent for Property Managers"
      headline="Tenant Calls Shouldn't Mean Your Phone Never Stops"
      headlineSecondary="Let the AI Handle the Volume"
      sub="Maintenance requests, lockouts, noise complaints, lease questions — your phone rings all day and all night. The AI captures every request with unit number, issue category, and severity, then routes to the right vendor automatically."
      trust="Built for maintenance triage + vendor dispatch"
      bullets={[
        "Captures unit number, tenant name, issue category, and severity level on every call.",
        "Triages emergencies (flooding, no heat, gas smell) and routes to your emergency vendor.",
        "Logs routine maintenance requests and assigns to the appropriate vendor or in-house team.",
        "Handles after-hours calls — tenants always reach someone, you only get woken for real emergencies.",
        "Sends tenants a text confirmation with a request number and expected response time.",
        "Scales across your entire portfolio — 50 units or 5,000.",
      ]}
    />
  );
}
