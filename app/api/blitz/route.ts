import { NextRequest, NextResponse } from 'next/server';

/**
 * /api/blitz — GMS Demo Blitz ("your AI receptionist calls you in 60 seconds").
 *
 * POST: forwards a /try submission to the n8n workflow "GMS Blitz — Intake",
 *       which stores the lead in the blitz_leads data table and only THEN
 *       responds { ok, state }. The call is placed after that response.
 * GET ?k=<key>: returns the prefill (first name, company, website) for a
 *       Sales Navigator personal link. Nothing else from the brief is exposed.
 *
 * Same rule as /api/lead: THIS ROUTE MUST NEVER RETURN 2xx UNLESS THE LEAD IS
 * ACTUALLY STORED. n8n answers 200 only after the data-table insert succeeds;
 * anything else becomes a 502 and the page shows an honest error.
 */

export const runtime = 'edge';

const N8N = process.env.N8N_BLITZ_BASE_URL || 'https://n8n.growthmindsetai.tech/webhook';
const STATES = ['calling', 'after_hours', 'rate_limited', 'dnc', 'hold_dnc_check_failed'];

const s = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

async function forward(url: string, init: RequestInit, ms = 12_000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...init, signal: controller.signal, cache: 'no-store' });
  } finally {
    clearTimeout(timer);
  }
}

export async function POST(req: NextRequest) {
  let raw: any;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  // Watchdog probe: 200 only if the whole path to n8n answers.
  if (raw?.probe === true) {
    try {
      const up = await forward(`${N8N}/gms-blitz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ probe: true }),
      });
      return NextResponse.json({ ok: up.ok, probe: true }, { status: up.ok ? 200 : 502 });
    } catch {
      return NextResponse.json({ ok: false, probe: true }, { status: 502 });
    }
  }

  const payload = {
    source: ['try', 'chatgpt', 'salesnav'].includes(s(raw?.source, 20)) ? s(raw?.source, 20) : 'try',
    first_name: s(raw?.first_name, 60),
    email: s(raw?.email, 160).toLowerCase(),
    phone: s(raw?.phone, 32),
    website: s(raw?.website, 200),
    company_name: s(raw?.company_name, 120),
    k: s(raw?.k, 40),
    consent: raw?.consent === true,
    consent_text: s(raw?.consent_text, 600),
  };

  if (!payload.first_name || !payload.website || !payload.email || payload.phone.replace(/\D/g, '').length < 10) {
    return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 422 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(payload.email)) {
    return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 422 });
  }
  if (!payload.consent) {
    return NextResponse.json({ ok: false, error: 'consent_required' }, { status: 422 });
  }

  try {
    const up = await forward(`${N8N}/gms-blitz`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const body: any = await up.json().catch(() => null);
    if (up.status === 400) {
      return NextResponse.json({ ok: false, error: 'invalid', fields: body?.fields || [] }, { status: 422 });
    }
    if (!up.ok || body?.ok !== true || !STATES.includes(body?.state)) {
      console.error(`[blitz] LEAD NOT STORED — n8n ${up.status} for ${payload.website} ${payload.phone} <${payload.email}>`);
      return NextResponse.json({ ok: false, error: 'not_stored' }, { status: 502 });
    }
    return NextResponse.json({ ok: true, state: body.state });
  } catch (err) {
    console.error(`[blitz] LEAD NOT STORED — n8n unreachable for ${payload.website} ${payload.phone} <${payload.email}>`, err);
    return NextResponse.json({ ok: false, error: 'not_stored' }, { status: 502 });
  }
}

export async function GET(req: NextRequest) {
  const k = s(req.nextUrl.searchParams.get('k'), 40);
  if (!/^[a-z0-9]{3,40}$/i.test(k)) return NextResponse.json({ ok: false }, { status: 404 });
  try {
    const up = await forward(`${N8N}/gms-blitz-prefill?k=${encodeURIComponent(k)}`, { method: 'GET' }, 6_000);
    const body: any = await up.json().catch(() => null);
    if (!up.ok || !body?.ok) return NextResponse.json({ ok: false }, { status: 404 });
    return NextResponse.json({
      ok: true,
      first_name: s(body.first_name, 60),
      company_name: s(body.company_name, 120),
      website: s(body.website, 200),
    });
  } catch {
    return NextResponse.json({ ok: false }, { status: 404 });
  }
}
