import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LogoMark } from '@/components/Logo';
import { VoiceDemo, type VoiceDemoAgent } from '@/components/VoiceDemo';
import { Beacon } from '../beacon';

/**
 * Upwork proposal landing pages — /upwork/voice, /upwork/conversational.
 *
 * Layout grammar mirrors the shipped demo landing page (talk.html); the
 * palette is the SITE brand (cyan accent, green live states, #141417 cards)
 * so the wrapper and the site-skinned embedded card read as one product.
 * The real LogoMark sits top-left — as plain, unlinked markup.
 *
 * Read docs/UPWORK-LANDING-PAGES.md before changing ANYTHING here. The rules
 * that matter most: zero contact affordances (no form, no email, no phone,
 * no chat, no booking link, no social, no links at all — the only CTA is
 * plain text "Message me back on Upwork"), noindex everywhere, never linked
 * from the public site, and every proof claim comes from the brief's
 * exhaustive §7 list. Do not invent metrics. Never claim Genesys.
 */

type Variant = {
  title: string;
  h1Plain: string;
  h1Grad: string;
  h1Fit?: boolean;
  lede: string;
  agent: VoiceDemoAgent;
  steps: string[];
  chipsUnder: string[];
  chipsDeploy: string[];
  proof: Array<[string, string]>;
  ctaHead: string;
  fine: string;
};

const VENDOR_HINT =
  'The agent’s character — how she talks, what she asks, what she never does — lives in the orchestration layer, not the vendor. Already on a platform? I build into it. Not yet? I’ll recommend one and you keep the account.';

const CLOSING_HINT =
  'This runs on a real-time speech-to-speech model, which is why she pauses, breathes and can be interrupted mid-sentence — go ahead and talk over her. The same engine puts an agent on real telephony with a dedicated number, call recording, transcripts and post-call analysis.';

const VARIANTS: Record<string, Variant> = {
  voice: {
    title: 'Live Voice Agent Demo',
    h1Plain: 'Don’t take my word for it.',
    h1Grad: 'Talk to the agent.',
    h1Fit: true,
    lede:
      'Christina confirms tomorrow’s appointment for a home-services company — live, in your browser. Real-time speech-to-speech: she pauses, breathes, and stops the moment you talk over her. About two minutes, then she wraps up on her own.',
    agent: 'appointment',
    steps: [
      'Tap the button on the card and allow your mic once. She speaks first, like a real call.',
      'Talk over her mid-sentence — she stops and yields. Then ask something she can’t know: she declines to invent an answer rather than fake one.',
      'Tell her you want to cancel. One clean save attempt, then a graceful handoff — no loops, no pressure.',
    ],
    chipsUnder: [
      'n8n orchestration',
      'Realtime speech-to-speech',
      'Server VAD',
      'Barge-in',
      'Telephone-band audio',
      'Pink-noise room tone',
      'Rate limiting',
    ],
    chipsDeploy: [
      'Vapi',
      'Retell AI',
      'ElevenLabs',
      'Twilio',
      'Five9',
      'n8n',
      'LangChain',
      'LangGraph',
      'Claude',
      'OpenAI',
      'HubSpot',
      'Salesforce',
      'Supabase',
      'Python/FastAPI',
    ],
    proof: [
      ['38% → 27%', 'cancellation rate on a 60-rep confirmation floor — ~$22K in attributed sales.'],
      ['$750K/month', 'in booked business behind SMS + self-scheduling automation.'],
      ['100+ n8n workflows', 'and dozens of voice + agentic systems shipped to production.'],
      ['25+ years', 'in marketing technology, CRM architecture and revenue operations.'],
    ],
    ctaHead: 'Want this answering your line?',
    fine:
      '“Quality Home Services” is a fictional company built for this demo. Anywhere in the world, use the talk-in-your-browser option — the phone-call option dials US numbers only. This page is not linked or indexed anywhere; it exists only for Upwork proposals.',
  },
  conversational: {
    title: 'Live Conversational AI Demo',
    h1Plain: 'Nothing to sell you.',
    h1Grad: 'Just a really good conversation.',
    lede:
      'Most voice agents are trying to get something from you. This one isn’t. Tell her your name and what you’d like to talk about, and she’ll call you right here in the browser — curious, funny, and she knows the subject.',
    agent: 'conversation',
    steps: [
      'Tell her your name and pick a subject. Anything at all — she works from whatever you type.',
      'Tap the button and allow your mic. She calls you straight back, right in the page.',
      'Then just talk. Interrupt her, change the subject, go off on a tangent — she’ll follow you. And ask something she can’t know: she says so instead of making it up.',
    ],
    chipsUnder: [
      'n8n orchestration',
      'Grok realtime voice',
      'Speech-to-speech',
      'Server VAD',
      'Barge-in',
      'Live variable injection',
      'Rate limiting',
    ],
    chipsDeploy: [
      'Retell AI',
      'Vapi',
      'Bland',
      'LiveKit',
      'Twilio',
      'Telnyx',
      'ElevenLabs',
      'Hume AI',
      'xAI Grok Voice',
      'OpenAI Realtime',
      'Deepgram',
    ],
    proof: [
      ['Dozens', 'of voice and agentic systems shipped — 100+ production n8n workflows behind them.'],
      ['35% engagement / 25% retention', 'lift via AI lifecycle workflows.'],
      ['25+ years', 'in marketing technology, CRM architecture and revenue operations.'],
    ],
    ctaHead: 'Want an agent with this kind of range?',
    fine:
      'Demo conversations run about two minutes. Nothing is recorded or stored. This page is not linked or indexed anywhere; it exists only for Upwork proposals.',
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

      <header className="uw-header">
        <div className="uw-brand">
          <LogoMark className="uw-logo" />
          <div>
            <span className="uw-wordmark">
              growthmindset<span className="uw-wordmark-ai">.ai</span>
            </span>
            <small>AI voice &amp; workflow automation</small>
          </div>
        </div>
        <div className="uw-badge">
          <span className="uw-dot" aria-hidden="true" /> Live agent — not a recording
        </div>
      </header>

      <div className="uw-grid">
        <section className="uw-hero">
          <h1 className={v.h1Fit ? 'uw-h1 uw-h1--fit' : 'uw-h1'}>
            {v.h1Plain}
            <br />
            <span className="uw-grad">{v.h1Grad}</span>
          </h1>
          <p className="uw-lede">{v.lede}</p>

          <ol className="uw-steps">
            {v.steps.map((step, i) => (
              <li key={step}>
                <span className="uw-num">{i + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          <div className="uw-panels">
            <div className="uw-stack">
              <div className="uw-stack-label">What’s running underneath</div>
              <div className="uw-chips">
                {v.chipsUnder.map((chip) => (
                  <span className="uw-chip" key={chip}>{chip}</span>
                ))}
              </div>
            </div>

            <div className="uw-stack">
              <div className="uw-stack-label">Deploys on your stack</div>
              <div className="uw-chips">
                {v.chipsDeploy.map((chip) => (
                  <span className="uw-chip" key={chip}>{chip}</span>
                ))}
              </div>
              <p className="uw-hint">{VENDOR_HINT}</p>
            </div>
          </div>

          {params.variant === 'conversational' ? (
            <div className="uw-stack">
              <div className="uw-stack-label">Her voice is a setting, not a rebuild</div>
              <p className="uw-hint" style={{ margin: 0 }}>
                You’re hearing Ara, one of xAI’s realtime voices. On a production build you pick any
                of them: the <strong>ElevenLabs Voice Library alone carries over 10,000 voices</strong>,
                on top of the stock voice sets from Hume, xAI, OpenAI and Deepgram. Swapping one is a
                single config value — her character doesn’t change.
              </p>
              <p className="uw-hint">
                Want it to sound like a specific person? Voice cloning is supported for an additional
                fee, with their recorded consent.
              </p>
            </div>
          ) : null}

          <div className="uw-stack">
            <div className="uw-stack-label">Shipped, in production</div>
            {v.proof.map(([lead, rest]) => (
              <p className="uw-hint uw-proofline" key={lead}>
                <strong>{lead}</strong> {rest}
              </p>
            ))}
          </div>

          <p className="uw-hint" style={{ marginTop: 18 }}>{CLOSING_HINT}</p>
        </section>

        <section>
          <div className="uw-shell">
            <VoiceDemo agent={v.agent} />
          </div>

          <div className="uw-cta">
            <h2>{v.ctaHead}</h2>
            <p className="uw-cta-main">Message me back on Upwork.</p>
            <p className="uw-cta-sub">Same thread this link came from — everything stays on the platform.</p>
          </div>

          <p className="uw-fine">{v.fine}</p>
        </section>
      </div>

      <footer className="uw-footer">
        <div>Growth Mindset Solutions — built by Matt Martelli</div>
        <div>Demo environment. Rate-limited and capped daily.</div>
      </footer>
    </main>
  );
}
