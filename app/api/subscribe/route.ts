import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/subscribe — email capture for the AI Validation Panel gate.
 *
 * Behavior:
 *   - Validates the email format and source.
 *   - Always logs to function output (visible in the Netlify Functions log
 *     stream) so Matt sees every capture even before a webhook is wired.
 *   - Best-effort forwards to N8N_SUBSCRIBE_WEBHOOK_URL if it's set in env.
 *     A failed forward DOES NOT block the response — UX shouldn't depend on
 *     downstream plumbing.
 */

export const runtime = 'nodejs';
export const maxDuration = 10;

const WEBHOOK_URL = process.env.N8N_SUBSCRIBE_WEBHOOK_URL || '';

function sanitize(s: unknown, max: number): string {
  if (typeof s !== 'string') return '';
  return s.trim().slice(0, max);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let raw: any;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const email = sanitize(raw?.email, 200).toLowerCase();
  const source = sanitize(raw?.source, 80) || 'unknown';

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: 'Please enter a valid email address.' },
      { status: 422 },
    );
  }

  const capturedAt = new Date().toISOString();
  console.log(`[subscribe] ${email} | source=${source} | at=${capturedAt}`);

  if (WEBHOOK_URL) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5_000);
    try {
      const upstream = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email,
          source,
          captured_at: capturedAt,
        }),
        signal: controller.signal,
      });
      clearTimeout(timer);
      if (!upstream.ok) {
        console.warn(
          '[subscribe] webhook returned non-2xx:',
          upstream.status,
          await upstream.text().catch(() => ''),
        );
      }
    } catch (err) {
      clearTimeout(timer);
      console.warn('[subscribe] webhook forward failed:', err);
    }
  }

  return NextResponse.json({ ok: true });
}
