import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * HTTP Basic Auth for /clients/rise only.
 * Does not touch the public marketing site.
 *
 * Override in Vercel env:
 *   RISE_GATE_USER
 *   RISE_GATE_PASS          (plaintext — hashed at the edge)
 *   RISE_GATE_PASS_SHA256   (hex SHA-256, used if PASS is unset)
 */
const FALLBACK_USER = 'nick';
const FALLBACK_PASS_SHA256 =
  '9d7abd1f07cae86e567ec84a45f1c08683575a40cb55ab753e71e466231b12ab';

export const config = {
  matcher: ['/clients/rise', '/clients/rise/:path*'],
};

function unauthorized() {
  return new NextResponse('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Rise Renovation", charset="UTF-8"',
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

  const expectedUser = process.env.RISE_GATE_USER || FALLBACK_USER;
  const passPlain = process.env.RISE_GATE_PASS;
  const expectedHash = passPlain
    ? await sha256hex(passPlain)
    : (process.env.RISE_GATE_PASS_SHA256 || FALLBACK_PASS_SHA256).toLowerCase();

  const gotHash = await sha256hex(pass);
  if (!timingEqual(user, expectedUser) || !timingEqual(gotHash, expectedHash)) {
    return unauthorized();
  }

  const res = NextResponse.next();
  res.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return res;
}
