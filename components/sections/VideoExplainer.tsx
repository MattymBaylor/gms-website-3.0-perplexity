'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';

/**
 * Lazy-loaded explainer video section.
 * - `src` (self-hosted mp4, e.g. /videos/missed-call-explainer.mp4) takes
 *   precedence over `videoId` (YouTube).
 * - YouTube renders a poster facade until clicked — keeps initial page weight light.
 */
export interface VideoExplainerProps {
  /** YouTube id. Defaults to the 30s missed-call explainer. */
  videoId?: string;
  /** Self-hosted mp4 path; takes precedence over videoId. */
  src?: string;
  /** Poster image (used for the self-hosted variant, or to override the YT thumb). */
  poster?: string;
  eyebrow?: string;
  heading?: string;
}

export function VideoExplainer({
  videoId = 'bF7DsaHtUcQ',
  src,
  poster,
  eyebrow = 'In 30 seconds',
  heading = 'See it in action',
}: VideoExplainerProps) {
  const [active, setActive] = useState(false);
  const ytPoster = poster ?? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <section className="section" aria-labelledby="video-heading">
      <div className="container-prose">
        <div className="mb-10 text-center">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="video-heading" className="mt-3 text-h1 font-semibold text-ink">
            {heading}
          </h2>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-card border border-border bg-bg-card">
          {src ? (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={src}
              poster={poster}
              controls
              playsInline
              preload="metadata"
            />
          ) : active ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
              title="growthmindset.ai — 30 second explainer"
              allow="accelerated-2d-canvas; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setActive(true)}
              className="group absolute inset-0 flex items-center justify-center"
              aria-label="Play explainer video"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ytPoster}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
                loading="lazy"
              />
              <span
                className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-cta text-white shadow-[0_8px_40px_rgba(249,115,22,0.45)] transition-transform group-hover:scale-105"
                aria-hidden="true"
              >
                <Play size={28} className="translate-x-0.5" fill="currentColor" />
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
