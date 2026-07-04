import type { Metadata } from 'next';
import { IndustryPage } from '@/components/IndustryPage';
import { INDUSTRY_ECONOMICS } from '@/content/industry-economics';

export const metadata: Metadata = {
  title: 'AI Voice Agent for Medical & Dental Practices',
  description:
    'Handle patient calls, appointment requests, and after-hours triage — 24/7. AI receptionist built for medical and dental practices.',
  alternates: { canonical: '/medical' },
  openGraph: {
    title: 'AI Voice Agent for Medical & Dental Practices · growthmindset.ai',
    description:
      'Handle patient calls, appointment requests, and after-hours triage — 24/7.',
    url: '/medical',
  },
};

export default function MedicalPage() {
  return (
    <IndustryPage
      economics={INDUSTRY_ECONOMICS.medical}
      name="Medical / Dental"
      title="AI Voice Agent for Medical & Dental Practices"
      headline="Your Patients Shouldn't Wait on Hold"
      headlineSecondary="To Schedule an Appointment"
      sub="Appointment requests, prescription refill inquiries, after-hours triage — your front desk is overwhelmed. The AI handles the volume, triages urgency, and books the appointment without putting anyone on hold."
      trust="Built for patient scheduling + after-hours triage"
      bullets={[
        "Triages appointment requests by urgency — routine, urgent, and emergency routing.",
        "Captures new patient intake details — insurance, reason for visit, medical history basics.",
        "Books appointments into your practice management system.",
        "Handles prescription refill requests with proper protocol and routing.",
        "After-hours calls get triaged and routed — emergencies to the on-call provider.",
        "HIPAA-aware conversation design — no diagnostic information given, just proper routing.",
      ]}
    />
  );
}
