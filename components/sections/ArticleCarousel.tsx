'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import type { PostMeta } from '@/lib/blog';
import { PostThumb } from '@/components/blog/PostThumb';

/**
 * Accessible, dependency-free horizontal carousel built on native CSS
 * scroll-snap. Touch / trackpad users swipe; desktop users get prev/next
 * buttons. No external carousel library, no layout shift, SSR-friendly.
 */
export function ArticleCarousel({ posts }: { posts: PostMeta[] }) {
  const railRef = useRef<HTMLUListElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const sync = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanLeft(scrollLeft > 8);
    setCanRight(scrollLeft + clientWidth < scrollWidth - 8);
  }, []);

  useEffect(() => {
    sync();
    const el = railRef.current;
    if (!el) return;
    el.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      el.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [sync]);

  const nudge = useCallback((dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-card]');
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.9;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  }, []);

  if (posts.length === 0) return null;

  return (
    <div>
      {/* Prev / Next — desktop only; mobile users swipe the rail */}
      <div className="mb-4 hidden justify-end gap-2 sm:flex">
        <button
          type="button"
          onClick={() => nudge(-1)}
          disabled={!canLeft}
          aria-label="Previous articles"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-elevated text-ink transition hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          disabled={!canRight}
          aria-label="Next articles"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-elevated text-ink transition hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <ul
        ref={railRef}
        aria-label="Blog articles"
        tabIndex={0}
        className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {posts.map((post) => (
          <li key={post.slug} data-card className="w-[280px] shrink-0 snap-start sm:w-[320px]">
            <Link
              href={`/blog/${post.slug}`}
              className="group card flex h-full flex-col overflow-hidden border-0 p-0"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <PostThumb post={post} sizes="320px" />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <p className="text-xs text-ink-dim">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
                <h3 className="line-clamp-2 text-h3 font-semibold text-ink transition-colors group-hover:text-accent">
                  {post.title}
                </h3>
                <p className="line-clamp-3 text-sm text-ink-muted">{post.description}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm text-accent">
                  Read article <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          </li>
        ))}

        {/* Trailing card → full blog index */}
        <li className="w-[280px] shrink-0 snap-start sm:w-[320px]">
          <Link
            href="/blog"
            className="group card flex h-full min-h-[220px] flex-col items-center justify-center gap-3 border border-dashed border-border text-center text-ink-muted transition hover:border-accent hover:text-accent"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border transition group-hover:border-accent">
              <ArrowRight size={20} />
            </span>
            <span className="text-sm font-medium">View all articles</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
