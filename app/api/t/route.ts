/**
 * First-party click log for the Upwork landing pages (?p= proposal slug).
 *
 * The visitor's browser only ever talks to this origin; the relay to Matt's
 * n8n happens server-side. console.log is the backup sink (Vercel runtime
 * logs). This endpoint must never fail the page: always 204.
 */
const SINK = 'https://n8n.growthmindsetai.tech/webhook/gms-upwork-click';

export async function POST(req: Request) {
  try {
    const data = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const payload = {
      p: typeof data.p === 'string' ? data.p.slice(0, 120) : '',
      variant: typeof data.variant === 'string' ? data.variant.slice(0, 40) : '',
      r: typeof data.r === 'string' ? data.r.slice(0, 300) : '',
      ua: req.headers.get('user-agent') ?? '',
      ts: new Date().toISOString(),
    };
    console.log('[upwork-click]', JSON.stringify(payload));
    await fetch(SINK, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-gms-beacon': 'uw-lp-1' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(3000),
    }).catch(() => undefined);
  } catch {
    /* never fail */
  }
  return new Response(null, { status: 204 });
}
