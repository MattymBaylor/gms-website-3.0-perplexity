import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { VoiceDemo, type VoiceDemoAgent } from '@/components/VoiceDemo';
import { Beacon } from '../beacon';

/**
 * Upwork proposal landing pages — /upwork/voice, /upwork/conversational.
 *
 * Read docs/UPWORK-LANDING-PAGES.md before changing ANYTHING here. The rules
 * that matter most: zero contact affordances (no form, no email, no phone,
 * no chat, no booking link, no social — the only CTA is plain text "Message
 * me back on Upwork"), noindex everywhere, never linked from the public
 * site, and every proof claim comes from the brief's exhaustive §7 list.
 * Do not invent metrics. Never claim Genesys.
 */

const STACK =
  'Vapi · Retell AI · ElevenLabs · Twilio · Five9 · n8n · LangChain · LangGraph · Claude · OpenAI · HubSpot · Salesforce · Supabase · Python/FastAPI';

type Variant = {
  title: string;
  eyebrow: string;
  h1: string;
  sub: string;
  agent: VoiceDemoAgent;
  demoNote?: string;
  tryItems: Array<[string, string]>;
  proof: string[];
  ctaHead: string;
  fictionNote: boolean;
};

const VARIANTS: Record<string, Variant> = {
  voice: {
    title: 'Live Voice Agent Demo',
    eyebrow: 'Live demo — speaks in your browser · about two minutes',
    h1: 'Stop reading proposals. Talk to one.',
    sub: 'This is Christina — a live speech-to-speech agent confirming tomorrow’s appointment for a home-services company. Not a recording, and not a human behind a curtain. She runs about two minutes, then wraps up on her own.',
    agent: 'appointment',
    demoNote: 'Anywhere in the world: use the “talk in your browser” option. The phone-call option only dials US numbers.',
    tryItems: [
      [
        'Interrupt her.',
        'Talk over her mid-sentence. She stops instantly and yields — real barge-in, not turn-taking theater.',
      ],
      [
        'Ask what she can’t know.',
        'Your account balance, Friday’s weather, her favorite movie. She declines to invent an answer — no hallucinated confidence. This is the one to watch.',
      ],
      [
        'Tell her you want to cancel.',
        'One clean save attempt, then a graceful handoff. No loops, no pressure.',
      ],
    ],
    proof: [
      'Call-centre confirmation voice AI: cancellation rate cut 38% → 27% across 60 reps, ~$22K in attributed sales',
      'SMS + self-scheduling automation behind $750K/month in booked business',
      'Dozens of voice and agentic systems shipped · 100+ production n8n workflows',
      '25+ years in marketing technology, CRM architecture and revenue operations',
    ],
    ctaHead: 'Want this answering your line?',
    fictionNote: true,
  },
  conversational: {
    title: 'Live Conversational AI Demo',
    eyebrow: 'Live demo — no script, no sales agenda · about two minutes',
    h1: 'June has no script. Try to knock her off one anyway.',
    sub: 'An open-ended conversational agent built to show persona design and dialog control — warm, curious, and honest about what she doesn’t know. Speaks in your browser; about two minutes.',
    agent: 'conversation',
    tryItems: [
      [
        'Change the subject mid-thought.',
        'She follows you and keeps the context — no reset, no “as I was saying.”',
      ],
      [
        'Ask something unknowable.',
        'She tells you she doesn’t know instead of performing confidence. That honesty is designed in — it’s the point.',
      ],
      [
        'Interrupt her.',
        'She stops mid-word and hands you the floor.',
      ],
    ],
    proof: [
      'Dozens of voice and agentic systems shipped · 100+ production n8n workflows',
      '35% engagement / 25% retention lift via AI lifecycle workflows',
      '25+ years in marketing technology, CRM architecture and revenue operations',
    ],
    ctaHead: 'Want an agent with this kind of range?',
    fictionNote: false,
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(VARIANTS).map((variant) => ({ variant }));
}

export function generateMetadata({ params }: { params: { variant: string } }): Metadata {
  const v = VARIANTS[params.variant];
  return {
    title: v ? v.title : 'Live Demo',
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: { index: false, follow: false },
    },
  };
}

export default function UpworkVariantPage({ params }: { params: { variant: string } }) {
  const v = VARIANTS[params.variant];
  if (!v) notFound();

  return (
    <main id="main" className="uw-wrap">
      <Beacon variant={params.variant} />

      <p className="uw-eyebrow">
        <span className="uw-dot" aria-hidden="true" />
        {v.eyebrow}
      </p>
      <h1 className="uw-h1">{v.h1}</h1>
      <p className="uw-sub">{v.sub}</p>

      <div className="uw-demo">
        <VoiceDemo agent={v.agent} />
        {v.demoNote ? <p className="uw-demo-note">{v.demoNote}</p> : null}
      </div>

      <section className="uw-try" aria-label="Three things to try">
        <h2>Three things to try</h2>
        <ol>
          {v.tryItems.map(([label, detail]) => (
            <li key={label}>
              <strong>{label}</strong>
              <span>{detail}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="uw-proof" aria-label="Track record">
        <h2>The numbers behind it</h2>
        <ul>
          {v.proof.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <p className="uw-stack">{STACK}</p>
      </section>

      <section className="uw-cta" aria-label="Next step">
        <h2>{v.ctaHead}</h2>
        <p>Message me back on Upwork.</p>
        <p className="uw-cta-sub">
          Same thread this link came from — everything stays on the platform.
        </p>
      </section>

      <p className="uw-fine">
        {(v.fictionNote
          ? '“Quality Home Services” is a fictional company built for this demo. '
          : '') +
          'This page is not linked or indexed anywhere — it exists only for Upwork proposals.'}
      </p>
    </main>
  );
}
