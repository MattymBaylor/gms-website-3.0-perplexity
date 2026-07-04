import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { getAllPosts } from '@/lib/blog';
import { PostThumb } from '@/components/blog/PostThumb';

export function CaseStudies() {
  const posts = getAllPosts();
  // Featured + a bounded grid; the full library lives at /blog.
  const [featured, ...others] = posts;
  const rest = others.slice(0, 6);

  // If there are no posts at all, render nothing — the section disappears
  // gracefully rather than showing an empty grid.
  if (!featured) {
    return null;
  }

  return (
    <section
      id="case-studies"
      className="section"
      aria-labelledby="case-studies-heading"
    >
      <div className="container-wide">
        <div className="mb-14 max-w-2xl mx-auto text-center">
          <p className="eyebrow">The blog</p>
          <h2 id="case-studies-heading" className="mt-3 text-h1 font-semibold text-ink">
            Field Notes
          </h2>
          <p className="mt-4 text-lead text-ink-muted">
            How the system actually works — straight from the team building it.
          </p>
        </div>

        {/* Featured: most recent article */}
        <Link
          href={`/blog/${featured.slug}`}
          className="group card mb-6 block overflow-hidden border-0 p-0 ring-1 ring-accent/20 transition-all hover:ring-accent/50"
          aria-label={`Read featured article: ${featured.title}`}
        >
          <div className="grid md:grid-cols-[1.4fr_1fr]">
            <div className="relative aspect-[16/9] overflow-hidden bg-bg-elevated md:aspect-auto md:min-h-[260px]">
              <PostThumb post={featured} sizes="(max-width: 768px) 100vw, 60vw" priority />
              <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-cta px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                <Sparkles size={12} /> Featured
              </span>
            </div>
            <div className="flex flex-col justify-center gap-3 p-6 md:p-8">
              <h3 className="text-h3 font-semibold text-ink transition-colors group-hover:text-accent">
                {featured.title}
              </h3>
              <p className="text-sm text-ink-muted">{featured.description}</p>
              <span className="mt-2 inline-flex items-center gap-1.5 text-sm text-accent">
                Read the article <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </Link>

        {/* Article grid */}
        {rest.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group card block overflow-hidden border-0 p-0"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <PostThumb
                    post={post}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-col gap-2 p-5">
                  <h3 className="line-clamp-2 text-h3 font-semibold text-ink transition-colors group-hover:text-accent">
                    {post.title}
                  </h3>
                  <p className="line-clamp-3 text-sm text-ink-muted">{post.description}</p>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-sm text-accent">
                    Read article <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Read all articles */}
        <div className="mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-accent"
          >
            Read all articles <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
