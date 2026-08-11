'use client';

import { useEffect } from 'react';

/**
 * First-party click logging for the Upwork landing pages (?p=<proposal-slug>).
 * Posts once, same-origin, to /api/t — which relays server-side. No
 * third-party pixel ever loads on a page Upwork traffic lands on.
 */
export function Beacon({ variant }: { variant: string }) {
  useEffect(() => {
    try {
      const p = new URLSearchParams(window.location.search).get('p') ?? '';
      const body = JSON.stringify({ p, variant, r: document.referrer ?? '' });
      const blob = new Blob([body], { type: 'application/json' });
      const sent =
        typeof navigator.sendBeacon === 'function' && navigator.sendBeacon('/api/t', blob);
      if (!sent) {
        void fetch('/api/t', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body,
          keepalive: true,
        }).catch(() => undefined);
      }
    } catch {
      /* logging must never break the page */
    }
  }, [variant]);

  return null;
}
