import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/lead
 *
 * Receives the demo CTA form payload and forwards it to the N8N webhook
 * that drives the existing voice-agent pipeline (Sam Outbound).
 *
 * Server-side forwarding (instead of fetching N8N directly from the
 * browser) lets us:
 *   • hide the webhook URL from the client bundle (env var)
 *   • validate and shape the payload
 *   • add timeout + retry logic without leaking errors to the visitor
 */

export const runtime = 'edge';

const WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL ||
  'https://n8n.growthmindsetai.tech/webhook/44956247-3835-4500-87b4-dafc40c6b0a9';

interface LeadPayload {
  first_name: string;
  business_name: string;
  business_address: string;
  phone: string;
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

  const payload: LeadPayload = {
    first_name: sanitize(raw?.first_name, 80),
    business_name: sanitize(raw?.business_name, 120),
    business_address: sanitize(raw?.business_address, 200),
    phone: sanitize(raw?.phone, 32),
  };

  // Required field check
  if (
    !payload.first_name ||
    !payload.business_name ||
    !payload.business_address ||
    !payload.phone
  ) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 422 });
  }

  // Forward with a 10s timeout
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000);

  try {
    const upstream = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (!upstream.ok) {
      // Don't surface upstream details to the client.
      console.error('N8N upstream non-2xx:', upstream.status);
      return NextResponse.json(
        { error: 'Lead could not be submitted. Please try again.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    clearTimeout(timer);
    console.error('N8N forward failed:', err);
    return NextResponse.json(
      { error: 'Network error. Please try again.' },
      { status: 502 },
    );
  }
}
