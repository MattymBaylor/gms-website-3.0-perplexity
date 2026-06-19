import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getAllPosts } from '@/lib/blog';
import { ArticleCarousel } from './ArticleCarousel';

/**
 * Homepage "Articles" section — a horizontal carousel of the latest blog
 * posts, sitting directly beneath <CaseStudies />. Horizontal scroll keeps
 * the homepage from growing taller as the article library builds up.
 */
export function LatestArticles() {
  const posts = getAllPosts().slice(0, 12);

  // No published posts yet — render nothing so the homepage stays clean.
  if (posts.length === 0) return null;

  return (
    <section id="articles" className="section" aria-labelledby="articles-heading">
      <div className="container-wide">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="eyebrow">From the blog</p>
            <h2 id="articles-heading" className="mt-3 text-h1 font-semibold text-ink">
              Articles &amp; Field Notes
            </h2>
            <p className="mt-4 text-lead text-ink-muted">
              Playbooks on AI voice agents, missed-call recovery, and automation
              for service businesses — fresh off the desk.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden shrink-0 items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-accent sm:inline-flex"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <ArticleCarousel posts={posts} />
      </div>
    </section>
  );
}
