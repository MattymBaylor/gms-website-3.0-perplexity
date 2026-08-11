'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Bare, self-sizing frame around the appointment agent.
 *
 * No heading and no copy — the page around it supplies those. Rendered from
 * /demo-appointment?embed=1, which strips the demo's own header, hero and
 * footer down to the card.
 *
 * allow="microphone" is mandatory. Without it the card renders, the button
 * works, and the agent never hears anything — with no error shown anywhere.
 */
const SRC = '/demo-appointment?embed=1';
const MIN_HEIGHT = 420;

export function AgentFrame() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(760);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    let observer: ResizeObserver | undefined;
    // Once the frame is readable we stop trusting its postMessage: the demo
    // reports documentElement.scrollHeight, which can never fall below the
    // height we already gave the iframe, so alone it only ratchets upward.
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
    <div className="mx-auto w-full max-w-[600px]">
      <iframe
        ref={frameRef}
        src={SRC}
        title="Live AI appointment agent"
        allow="microphone"
        scrolling="no"
        className="block w-full border-0 bg-transparent"
        style={{ height, colorScheme: 'dark' }}
      />
    </div>
  );
}
