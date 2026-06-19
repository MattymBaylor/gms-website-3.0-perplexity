import { Mic } from 'lucide-react';

const SHOW = {
  apple: 'https://podcasts.apple.com/us/podcast/matt-maya-show/id1896938560',
  spotify: 'https://open.spotify.com/show/033eA9NTuNMrGo6Wt6NjGl',
  amazon: 'https://music.amazon.com/podcasts/2d5f5247-5798-4070-9b00-6ee01cb124bc/matt-maya-show',
};

function AppleLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="mmApple" x1="12" y1="0" x2="12" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F452FF" />
          <stop offset="1" stopColor="#832BC1" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="5.5" fill="url(#mmApple)" />
      <circle cx="12" cy="8.8" r="2.3" fill="#fff" />
      <path d="M9.2 11.8c.45.95 1.2 1.45 2.8 1.45s2.35-.5 2.8-1.45c.2-.45-.15-.78-.55-.5-.65.46-1.35.66-2.25.66s-1.6-.2-2.25-.66c-.4-.28-.75.05-.55.5z" fill="#fff" />
      <path d="M9.6 18.2c.4 1.15 1.05 1.8 2.4 1.8s2-.65 2.4-1.8c.5-1.45.55-2.95.15-3.7-.4-.72-1.35-1.05-2.55-1.05s-2.15.33-2.55 1.05c-.4.75-.35 2.25.15 3.7z" fill="#fff" />
    </svg>
  );
}

function SpotifyLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#1ED760" />
      <path fill="#000" d="M17.6 10.8a.9.9 0 0 1-.46-.12c-2.88-1.7-7.5-1.86-10.32-1a.9.9 0 1 1-.52-1.72c3.3-1 8.72-.8 12.18 1.25a.9.9 0 0 1-.88 1.59zm-.15 2.6a.75.75 0 0 1-1.03.25c-2.46-1.51-6.2-1.95-9.11-1.07a.75.75 0 1 1-.43-1.44c3.32-1 7.45-.5 10.27 1.23.35.21.46.67.3 1.03zm-1.12 2.52a.6.6 0 0 1-.82.2c-2.15-1.32-4.85-1.62-8.03-.9a.6.6 0 1 1-.27-1.16c3.48-.8 6.47-.45 8.88 1.02.28.17.37.55.24.84z" />
    </svg>
  );
}

function AmazonLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="5.5" fill="#25D1DA" />
      <circle cx="12" cy="10.6" r="5" fill="#0B2540" />
      <path d="M10.4 8.5v4.2l3.4-2.1z" fill="#25D1DA" />
      <path d="M7.7 15.8c2.7 1.5 5.9 1.5 8.6 0" stroke="#0B2540" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

const PLATFORMS = [
  { name: 'Apple Podcasts', href: SHOW.apple, Logo: AppleLogo },
  { name: 'Spotify', href: SHOW.spotify, Logo: SpotifyLogo },
  { name: 'Amazon Music', href: SHOW.amazon, Logo: AmazonLogo },
];

export function Podcast() {
  return (
    <section className="section" aria-labelledby="podcast-heading">
      <div className="container-prose">
        <div className="card mx-auto max-w-2xl p-8 md:p-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-accent">
            <Mic size={12} aria-hidden="true" />
            New · Podcast
          </div>

          <h2 id="podcast-heading" className="mt-5 text-h2 font-semibold text-ink">
            The Matt &amp; Maya Show
          </h2>

          <p className="mt-4 text-ink-muted">
            People, patterns, and the beautiful collision between human instinct and
            machine intelligence — every episode is a conversation between Matt and{' '}
            <span className="text-ink">Maya</span>, an AI co-host. New episodes
            streaming now.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            {PLATFORMS.map(({ name, href, Logo }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Listen to the Matt & Maya Show on ${name}`}
                className="inline-flex items-center gap-2.5 rounded-xl px-4 py-2.5 transition hover:-translate-y-px"
                style={{ background: '#121216', border: '1px solid rgba(255,255,255,0.14)' }}
              >
                <Logo />
                <span className="flex flex-col leading-tight text-left">
                  <span className="text-[10px] uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    Listen on
                  </span>
                  <span className="text-sm font-semibold" style={{ color: '#fff' }}>
                    {name}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
