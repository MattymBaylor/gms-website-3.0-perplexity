'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

/**
 * Appointment agent — Christina, live in the page.
 *
 * The demo is served from this site (public/appointment-demo/index.html, exposed
 * at the clean path /appointment-demo by a rewrite in next.config.mjs) so the
 * iframe is same-origin and the home page never depends on a second domain.
 * That file is a verbatim copy of realtime.html in MattymBaylor/gms-voice-demo
 * plus one appended <style id="gms-site-skin"> block that maps the demo onto this
 * site's palette and type. When the agent's page changes upstream, re-copy it and
 * re-append that block.
 *
 * ?embed=1 strips the demo's own header, footer and hero down to the bare card.
 *
 * allow="microphone" is mandatory. Without it the card renders, the button works,
 * and the agent never hears a word — with no error message anywhere.
 */
const SRC = '/demo-appointment?embed=1';
const MIN_HEIGHT = 420;

export function AppointmentAgent() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(760);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    let observer: ResizeObserver | undefined;
    // Once we can read the frame directly we stop trusting its postMessage:
    // the demo reports documentElement.scrollHeight, which can never fall below
    // the height we already gave the iframe, so on its own it only ratchets up.
    let measuredDirectly = false;

    const measure = () => {
      const body = frame.contentDocument?.body;
      if (!body) return false;
      const next = Math.ceil(body.getBoundingClientRect().height);
      if (next <= 0) return false;
      measuredDirectly = true;
      setHeight(Math.max(MIN_HEIGHT, next));
      return true;
    };

    const attach = () => {
      try {
        if (!measure()) return;
        const body = frame.contentDocument?.body;
        if (body && typeof ResizeObserver !== 'undefined') {
          observer?.disconnect();
          observer = new ResizeObserver(() => {
            try {
              measure();
            } catch {
              /* frame navigated away */
            }
          });
          observer.observe(body);
        }
      } catch {
        /* cross-origin — fall back to the postMessage below */
      }
    };

    // Fallback for a cross-origin host (e.g. if this ever points at GitHub Pages).
    const onMessage = (event: MessageEvent) => {
      if (measuredDirectly) return;
      if (event.source !== frame.contentWindow) return;
      const next = (event.data as { gmsVoiceDemoHeight?: unknown } | null)?.gmsVoiceDemoHeight;
      if (typeof next !== 'number' || !Number.isFinite(next)) return;
      setHeight(Math.max(MIN_HEIGHT, Math.ceil(next)));
    };

    frame.addEventListener('load', attach);
    window.addEventListener('message', onMessage);
    attach();

    return () => {
      observer?.disconnect();
      frame.removeEventListener('load', attach);
      window.removeEventListener('message', onMessage);
    };
  }, []);

  return (
    <section
      id="appointment-agent"
      className="section"
      aria-labelledby="appointment-agent-heading"
    >
      <div className="container-wide">
        <div className="mb-10 mx-auto max-w-2xl text-center">
          <p className="eyebrow">Live demo</p>
          <h2
            id="appointment-agent-heading"
            className="mt-3 text-h1 font-semibold text-ink"
          >
            Talk to the Agent Yourself
          </h2>
          <p className="mt-4 text-lead text-ink-muted">
            Christina confirms online appointments. She&rsquo;s answering right now &mdash;
            a live agent, not a recording. Push back on her, move the date, tell her you
            never booked it, and listen to what she does with that.
          </p>
        </div>

        <div className="mx-auto w-full max-w-[600px]">
          <iframe
            ref={frameRef}
            src={SRC}
            title="Live AI appointment agent"
            allow="microphone"
            loading="lazy"
            scrolling="no"
            className="block w-full border-0 bg-transparent"
            style={{ height, colorScheme: 'dark' }}
          />
        </div>

        <div className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-sm leading-relaxed text-ink-muted">
            The brain &mdash; the prompt, the objection policy, the handoff rules &mdash;
            lives in the orchestration layer, not the vendor. Already on Retell, Vapi,
            Bland or LiveKit? We build into it. Not yet? We recommend one and you keep the
            account. The voice is a config value, not a rebuild. In production this gets
            real telephony, a dedicated number, recording, transcripts and post-call
            analysis.
          </p>
          <p className="mt-4">
            <Link
              href="/demo-appointment"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent transition-colors hover:text-white"
            >
              Open full screen
              <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
