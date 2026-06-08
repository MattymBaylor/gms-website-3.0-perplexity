import { ImageResponse } from 'next/og';

/**
 * Dynamic homepage Open Graph card.
 * Served at /opengraph-image and consumed by the homepage <meta og:image>
 * (and inherited by every sub-route that doesn't override openGraph.images).
 *
 * Rendered server-side via next/og's Satori — no static asset to maintain.
 * Replaces the broken /og-image.png reference that previously 404'd on
 * every homepage share.
 */

export const runtime = 'edge';
export const alt =
  'growthmindset.ai — AI Voice Agents for Home Service Contractors';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#0a0a0a',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Ambient cyan glow behind the content */}
        <div
          style={{
            position: 'absolute',
            top: '-200px',
            left: '50%',
            width: '900px',
            height: '500px',
            transform: 'translateX(-50%)',
            background:
              'radial-gradient(ellipse at center, rgba(0,212,255,0.18) 0%, transparent 60%)',
            display: 'flex',
          }}
        />

        {/* Brand mark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '260px',
            flexShrink: 0,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <svg
            width="220"
            height="233"
            viewBox="0 0 366.32 387.8"
            fill="#f5f5f5"
          >
            <polygon points="255.19 280.02 196.93 387.8 308.06 387.8 366.32 280.02 255.19 280.02" />
            <path d="M173.18,172.25l-116.51,215.55h111.13l63.66-117.78c23.86-44.15-8.11-97.76-58.29-97.76" />
            <path d="M174.18,116.51h58.84L183.78,0,0,116.51h63.04L10.65,213.44c-23.86,44.15,8.11,97.76,58.29,97.76l105.24-194.7Z" />
          </svg>
        </div>

        {/* Text */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
            paddingLeft: '60px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: '22px',
              color: '#00d4ff',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              marginBottom: '28px',
              fontWeight: 500,
              display: 'flex',
            }}
          >
            growthmindset.ai
          </div>

          <div
            style={{
              fontSize: '62px',
              fontWeight: 700,
              lineHeight: 1.05,
              color: '#f5f5f5',
              letterSpacing: '-1.5px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ display: 'flex' }}>Every Missed Call Is a Job</span>
            <span style={{ color: '#9ca3af', display: 'flex' }}>
              You&apos;ll Never Know You Lost
            </span>
          </div>

          <div
            style={{
              fontSize: '24px',
              color: '#9ca3af',
              marginTop: '32px',
              fontWeight: 400,
              display: 'flex',
            }}
          >
            AI voice agents for home service contractors.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
