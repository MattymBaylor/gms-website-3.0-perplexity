'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Shared iframe wrapper for the live voice demos on the Upwork landing pages
 * (app/(upwork)). Generalized from components/sections/AgentFrame.tsx, which
 * is live on /demo and the home page and stays untouched.
 *
 * allow="microphone" is mandatory. Without it the card renders, the button
 * works, and the agent never hears anything — with no error shown anywhere.
 *
 * ?embed=1 strips the demo page down to the agent card; being inside an
 * iframe triggers the same mode, so the param is belt-and-braces.
 */
const AGENTS = {
  appointment: {
    src: '/demo-appointment?embed=1',
    title: 'Live AI appointment agent — Christina',
  },
  conversation: {
    src: '/demo-conversation?embed=1',
    title: 'Live conversational AI agent — June',
  },
} as const;

export type VoiceDemoAgent = keyof typeof AGENTS;

const MIN_HEIGHT = 420;

export function VoiceDemo({ agent }: { agent: VoiceDemoAgent }) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(760);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    let observer: ResizeObserver | undefined;
    // Same-origin frames are measured directly. The demo's own postMessage
    // height reports documentElement.scrollHeight, which can never fall below
    // the height the iframe already has, so alone it only ratchets upward —
    // it stays as a cross-origin fallback only.
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

  const { src, title } = AGENTS[agent];

  return (
    <div className="mx-auto w-full max-w-[600px]">
      <iframe
        ref={frameRef}
        src={src}
        title={title}
        allow="microphone"
        scrolling="no"
        className="block w-full border-0 bg-transparent"
        style={{ height, colorScheme: 'dark' }}
      />
    </div>
  );
}
