import Link from 'next/link';
import { Linkedin, Youtube } from 'lucide-react';
import { Logo } from './Logo';

// TikTok icon (lucide doesn't ship one — small inline)
function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M19.6 6.32a4.85 4.85 0 0 1-3.77-2.05 4.79 4.79 0 0 1-.81-2.27h-3.6v13.06a2.78 2.78 0 1 1-2.79-2.78c.27 0 .53.04.78.11V8.74a6.4 6.4 0 0 0-.78-.05A6.46 6.46 0 1 0 15.02 15V8.78a8.4 8.4 0 0 0 4.92 1.58V6.78c-.11 0-.22-.01-.34-.02v-.44z" />
    </svg>
  );
}

const SOLUTIONS = [
  { href: '/hvac', label: 'HVAC' },
  { href: '/roofing', label: 'Roofing' },
  { href: '/plumbing', label: 'Plumbing' },
  { href: '/electrical', label: 'Electrical' },
  { href: '/locksmith', label: 'Locksmith' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg-elevated/40">
      <div className="container-wide py-14">
        {/* Top row: logo + social */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <Link href="/" aria-label="GrowthMindset.ai home">
            <Logo />
          </Link>

          <div className="flex items-center gap-4 text-ink-muted">
            <a
              href="https://linkedin.com/company/growthmindset-ai"
              aria-label="LinkedIn"
              className="rounded-full p-2 transition-colors hover:bg-white/5 hover:text-ink"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://youtube.com/@growthmindset-ai"
              aria-label="YouTube"
              className="rounded-full p-2 transition-colors hover:bg-white/5 hover:text-ink"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube size={18} />
            </a>
            <a
              href="https://tiktok.com/@growthmindset.ai"
              aria-label="TikTok"
              className="rounded-full p-2 transition-colors hover:bg-white/5 hover:text-ink"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TikTokIcon />
            </a>
          </div>
        </div>

        {/* Link columns */}
        <nav aria-label="Footer" className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-dim">
              Solutions
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-muted">
              {SOLUTIONS.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="hover:text-ink">
                    {s.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/#industries" className="text-accent hover:text-ink">
                  All industries →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-dim">
              Resources
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-muted">
              <li>
                <Link href="/blog" className="hover:text-ink">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/seinfeld-hq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink"
                >
                  Seinfeld HQ ↗
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-dim">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-muted">
              <li>
                <Link href="/about" className="hover:text-ink">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-ink">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-ink">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <p className="mt-12 text-xs text-ink-dim">
          © {year} GrowthMindset.ai. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
