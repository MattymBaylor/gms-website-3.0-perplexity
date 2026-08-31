import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * HTTP Basic Auth for /playbook (old /command and /clients/rise 308 here).
 * Does not touch the public marketing site.
 *
 * Two logins. Override in Vercel env:
 *   RISE_GATE_USER / RISE_GATE_PASS / RISE_GATE_PASS_SHA256  → partner
 *   RISE_OWNER_USER / RISE_OWNER_PASS / RISE_OWNER_PASS_SHA256 → owner
 */
const PARTNER_USER = 'nick';
const PARTNER_PASS_SHA256 =
  '9d7abd1f07cae86e567ec84a45f1c08683575a40cb55ab753e71e466231b12ab';
const OWNER_USER = 'matt';
const OWNER_PASS_SHA256 =
  '8bb205233a5c942d19fe9b70aa43d259826fd3db7af2c66d267cb257eb0d3ff9';

export const config = {
  matcher: [
    '/playbook',
    '/playbook/:path*',
    '/command',
    '/command/:path*',
    '/clients/rise',
    '/clients/rise/:path*',
  ],
};

function unauthorized() {
  return new NextResponse('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Playbook", charset="UTF-8"',
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'no-store',
    },
  });
}

function timingEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

async function sha256hex(value: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function accounts() {
  const partnerUser = process.env.RISE_GATE_USER || PARTNER_USER;
  const ownerUser = process.env.RISE_OWNER_USER || OWNER_USER;
  const partnerHash = process.env.RISE_GATE_PASS
    ? await sha256hex(process.env.RISE_GATE_PASS)
    : (process.env.RISE_GATE_PASS_SHA256 || PARTNER_PASS_SHA256).toLowerCase();
  const ownerHash = process.env.RISE_OWNER_PASS
    ? await sha256hex(process.env.RISE_OWNER_PASS)
    : (process.env.RISE_OWNER_PASS_SHA256 || OWNER_PASS_SHA256).toLowerCase();
  return [
    { user: partnerUser, hash: partnerHash },
    { user: ownerUser, hash: ownerHash },
  ];
}

export async function middleware(req: NextRequest) {
  const header = req.headers.get('authorization') || '';
  if (!header.startsWith('Basic ')) return unauthorized();

  let decoded = '';
  try {
    decoded = atob(header.slice(6));
  } catch {
    return unauthorized();
  }

  const colon = decoded.indexOf(':');
  const user = colon === -1 ? decoded : decoded.slice(0, colon);
  const pass = colon === -1 ? '' : decoded.slice(colon + 1);
  const gotHash = await sha256hex(pass);
  const ok = (await accounts()).some((a) => timingEqual(user, a.user) && timingEqual(gotHash, a.hash));
  if (!ok) return unauthorized();

  const path = req.nextUrl.pathname;
  let dest: string | null = null;
  if (path === '/clients/rise' || path.startsWith('/clients/rise/')) {
    dest = path.replace(/^\/clients\/rise/, '/playbook');
  } else if (path === '/command' || path.startsWith('/command/')) {
    dest = path.replace(/^\/command/, '/playbook');
  }
  if (dest) {
    const url = req.nextUrl.clone();
    url.pathname = dest;
    const res = NextResponse.redirect(url, 308);
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return res;
  }

  const res = NextResponse.next();
  res.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return res;
}
