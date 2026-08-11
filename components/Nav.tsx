'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Logo } from './Logo';

const industries = [
  { href: '/hvac', label: 'HVAC' },
  { href: '/roofing', label: 'Roofing' },
  { href: '/plumbing', label: 'Plumbing' },
  { href: '/electrical', label: 'Electrical' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const industriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close the desktop dropdown on Escape or outside pointer-down
  useEffect(() => {
    if (!industriesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIndustriesOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (
        industriesRef.current &&
        !industriesRef.current.contains(e.target as Node)
      ) {
        setIndustriesOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [industriesOpen]);

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-border bg-bg/70 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      ].join(' ')}
    >
      <div className="container-wide flex h-16 items-center justify-between">
        <Link href="/" aria-label="growthmindset.ai home" className="shrink-0">
          <Logo />
        </Link>

        {/* Desktop links */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {/* Industries dropdown */}
          <div
            ref={industriesRef}
            className="relative"
            onMouseEnter={() => setIndustriesOpen(true)}
            onMouseLeave={() => setIndustriesOpen(false)}
          >
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={industriesOpen}
              onClick={() => setIndustriesOpen((v) => !v)}
              onFocus={() => setIndustriesOpen(true)}
              className="flex items-center gap-1 text-sm text-ink-muted transition-colors hover:text-ink"
            >
              Industries
              <ChevronDown
                size={15}
                className={[
                  'transition-transform duration-200',
                  industriesOpen ? 'rotate-180' : '',
                ].join(' ')}
                aria-hidden="true"
              />
            </button>

            <div
              className={[
                'absolute left-0 top-full pt-3 transition-opacity duration-150',
                industriesOpen
                  ? 'pointer-events-auto opacity-100'
                  : 'pointer-events-none opacity-0',
              ].join(' ')}
            >
              <div className="min-w-44 rounded-btn border border-border bg-bg/95 p-2 backdrop-blur-md">
                {industries.map((i) => (
                  <Link
                    key={i.href}
                    href={i.href}
                    className="block rounded-btn px-3 py-2 text-sm text-ink-muted transition-colors hover:bg-white/5 hover:text-ink"
                  >
                    {i.label}
                  </Link>
                ))}
                <Link
                  href="/#industries"
                  className="mt-1 block border-t border-border px-3 pt-3 pb-2 text-sm text-ink transition-colors hover:bg-white/5"
                >
                  See all industries →
                </Link>
              </div>
            </div>
          </div>

          <Link
            href="/blog"
            className="text-sm text-ink-muted transition-colors hover:text-ink"
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="text-sm text-ink-muted transition-colors hover:text-ink"
          >
            About
          </Link>
          <a href="/#cta" className="btn-primary">
            Get My Free Demo
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="rounded-btn p-2 text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={[
          'md:hidden overflow-hidden border-t border-border bg-bg/95 backdrop-blur-md transition-[max-height,opacity] duration-300',
          open ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0',
        ].join(' ')}
      >
        <nav className="container-wide flex flex-col gap-1 py-4" aria-label="Mobile">
          {/* Industries group */}
          <p className="px-3 pt-2 pb-1 text-xs uppercase tracking-wide text-ink-dim">
            Industries
          </p>
          {industries.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              onClick={() => setOpen(false)}
              className="rounded-btn px-3 py-3 text-base text-ink hover:bg-white/5"
            >
              {i.label}
            </Link>
          ))}
          <Link
            href="/#industries"
            onClick={() => setOpen(false)}
            className="rounded-btn px-3 py-3 text-base text-ink-muted hover:bg-white/5"
          >
            See all industries →
          </Link>

          <div className="my-2 border-t border-border" />

          <Link
            href="/blog"
            onClick={() => setOpen(false)}
            className="rounded-btn px-3 py-3 text-base text-ink hover:bg-white/5"
          >
            Blog
          </Link>
          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className="rounded-btn px-3 py-3 text-base text-ink hover:bg-white/5"
          >
            About
          </Link>
          <a
            href="/#cta"
            onClick={() => setOpen(false)}
            className="btn-primary mt-2 w-full"
          >
            Get My Free Demo
          </a>
        </nav>
      </div>
    </header>
  );
}
