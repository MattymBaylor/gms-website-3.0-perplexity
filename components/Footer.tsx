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

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg-elevated/40">
      <div className="container-wide py-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <Link href="/" aria-label="GrowthMindset.ai home">
            <Logo />
          </Link>

          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-ink-muted"
          >
            <Link href="/#industries" className="hover:text-ink">Industries</Link>
            <Link href="/blog" className="hover:text-ink">Blog</Link>
            <Link href="/about" className="hover:text-ink">About</Link>
            <Link href="/privacy" className="hover:text-ink">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-ink">Terms</Link>
          </nav>

          <div className="flex items-center gap-3 text-ink-muted">
            <a
              href="https://www.linkedin.com/in/mattmartelli"
              aria-label="LinkedIn"
              className="rounded-full p-2 transition-colors hover:bg-white/5 hover:text-ink"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://www.youtube.com/@matt_martelli"
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

        <p className="mt-8 text-center text-xs text-ink-dim md:text-left">
          © {year} GrowthMindset.ai. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
