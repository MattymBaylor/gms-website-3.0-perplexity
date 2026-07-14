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
        background: #0a0a0a !important;
      }
      body { position: relative !important; margin: 0 !important; }
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
    <div className="relative w-full overflow-hidden overscroll-none bg-[#0a0a0a] [touch-action:pan-x]">
      <iframe
        ref={ref}
        src={src}
        title={title}
        onLoad={lockScroll}
        className="block h-[min(82vh,880px)] min-h-[480px] w-full border-0 bg-[#0a0a0a] sm:min-h-[600px] lg:min-h-[720px]"
        loading="lazy"
        allow="fullscreen"
        style={{ backgroundColor: '#0a0a0a', colorScheme: 'dark' }}
        {...({ scrolling: 'no' } as IframeHTMLAttributes<HTMLIFrameElement>)}
      />
    </div>
  );
}
