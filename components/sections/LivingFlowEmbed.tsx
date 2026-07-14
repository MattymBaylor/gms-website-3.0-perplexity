'use client';

import { useCallback, useRef, type IframeHTMLAttributes } from 'react';

/**
 * Locks the Living Flow standalone canvas inside a fixed iframe so it doesn't
 * create an internal scroll surface on the marketing page.
 */
export function LivingFlowEmbed({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  const ref = useRef<HTMLIFrameElement>(null);

  const lockScroll = useCallback(() => {
    const doc = ref.current?.contentDocument;
    if (!doc?.documentElement) return;

    const id = 'gms-living-flow-embed-lock';
    if (doc.getElementById(id)) return;

    const style = doc.createElement('style');
    style.id = id;
    style.textContent = `
      html, body {
        height: 100% !important;
        max-height: 100% !important;
        min-height: 0 !important;
        overflow: hidden !important;
        overscroll-behavior: none !important;
      }
      body { position: relative !important; }
      body > *:first-child { max-height: 100% !important; }
    `;
    doc.head.appendChild(style);

    const obs = new MutationObserver(() => {
      if (!doc.getElementById(id) && doc.head) {
        doc.head.appendChild(style.cloneNode(true));
      }
      doc.documentElement.style.overflow = 'hidden';
      if (doc.body) {
        doc.body.style.overflow = 'hidden';
        doc.body.style.minHeight = '0';
        doc.body.style.height = '100%';
      }
    });
    obs.observe(doc.documentElement, { childList: true, subtree: true });
    window.setTimeout(() => obs.disconnect(), 8000);
  }, []);

  return (
    <div className="relative w-full overflow-hidden overscroll-none rounded-xl border border-border bg-bg [touch-action:pan-x]">
      <iframe
        ref={ref}
        src={src}
        title={title}
        onLoad={lockScroll}
        className="block h-[min(88vh,960px)] min-h-[520px] w-full border-0 sm:min-h-[640px] lg:min-h-[760px]"
        loading="lazy"
        allow="fullscreen"
        {...({ scrolling: 'no' } as IframeHTMLAttributes<HTMLIFrameElement>)}
      />
    </div>
  );
}
