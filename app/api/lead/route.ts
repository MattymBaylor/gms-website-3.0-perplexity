import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/lead
 *
 * Receives the demo CTA form payload and forwards it to the N8N webhook
 * "GMS Website — Demo Request Intake", which emails Matt the lead and then
 * sends the visitor their 24-hour confirmation.
 *
 * Server-side forwarding (instead of fetching N8N directly from the
 * browser) lets us:
 *   • hide the webhook URL from the client bundle (env var)
 *   • validate and shape the payload
 *   • add a timeout without leaking upstream errors to the visitor
 *
 * The payload also carries the visitor's explicit SMS opt-in
 * (sms_consent) plus the timestamp it was given, so proof of consent is
 * stored alongside every lead for A2P 10DLC compliance.
 *
 * HISTORY — read before changing this file.
 * Until 2026-08-11 CTAForm never called this route at all. It set
 * `window.location.href` to a `mailto:` link and then showed a success
 * screen unconditionally. On any device without a configured mail handler
 * that is a no-op, and every lead was lost silently for months.
 *
 * The rule that came out of it: THIS ROUTE MUST NEVER RETURN 2xx UNLESS THE
 * LEAD IS ACTUALLY CAPTURED. A visitor seeing an honest error is recoverable.
 * A visitor seeing a fake "thanks!" is a lead that no longer exists.
 */

export const runtime = 'edge';

const WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL ||
  'https://n8n.growthmindsetai.tech/webhook/gms-website-demo-request';

interface LeadPayload {
  first_name: string;
  business_name: string;
  phone: string;
  email: string;
  website: string;
  sms_consent: boolean;
  sms_consent_timestamp: string;
  consent_language: string;
  source: string;
}

function sanitize(s: unknown, max = 200): string {
  if (typeof s !== 'string') return '';
  return s.trim().slice(0, max);
}

export async function POST(req: NextRequest) {
  let raw: any;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const smsConsent = raw?.sms_consent === true || raw?.sms_consent === 'true';

  const payload: LeadPayload = {
    first_name: sanitize(raw?.first_name, 80),
    business_name: sanitize(raw?.business_name, 120),
    phone: sanitize(raw?.phone, 32),
    email: sanitize(raw?.email, 160).toLowerCase(),
    website: sanitize(raw?.website, 200),
    sms_consent: smsConsent,
    sms_consent_timestamp:
      sanitize(raw?.sms_consent_timestamp, 40) ||
      (smsConsent ? new Date().toISOString() : ''),
    consent_language: sanitize(raw?.consent_language, 600),
    source: sanitize(raw?.source, 300) || 'growthmindset.ai',
  };

  // Required field check. Email is required: it is how the finished agent is delivered.
  if (
    !payload.first_name ||
    !payload.business_name ||
    !payload.phone ||
    !payload.email
  ) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 422 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(payload.email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 422 });
  }

  // SMS opt-in is required before we forward a textable lead.
  if (!payload.sms_consent) {
    return NextResponse.json(
      { error: 'SMS consent is required to submit this form.' },
      { status: 422 },
    );
  }

  // Forward with a 15s timeout. The upstream workflow emails Matt BEFORE it
  // responds, so a 2xx here means the lead is genuinely in his inbox.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15_000);

  try {
    const upstream = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (!upstream.ok) {
      // Don't surface upstream details to the client, but do log loudly —
      // and do NOT tell the visitor this worked.
      console.error(
        `[lead] LEAD DROPPED — n8n returned ${upstream.status} for ${payload.business_name} <${payload.email}> ${payload.phone}`,
      );
      return NextResponse.json(
        { error: 'Lead could not be submitted. Please try again.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    clearTimeout(timer);
    console.error(
      `[lead] LEAD DROPPED — n8n unreachable for ${payload.business_name} <${payload.email}> ${payload.phone}`,
      err,
    );
    return NextResponse.json(
      { error: 'Network error. Please try again.' },
      { status: 502 },
    );
  }
}
