import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { getAllPosts } from '@/lib/blog';
import { PostThumb } from '@/components/blog/PostThumb';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Field notes on AI voice agents, home services automation, and turning missed calls into booked jobs.',
  alternates: { canonical: '/blog' },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <>
      <Nav />
      <main id="main" className="pt-32 pb-32 md:pt-40">
        <div className="container-prose">
          <div className="mx-auto max-w-5xl">
            <p className="eyebrow">Field notes</p>
            <h1 className="mt-3 text-h1 font-semibold text-ink">Blog</h1>
            <p className="mt-4 max-w-2xl text-lead text-ink-muted">
              How we build AI voice agents, what the data says about missed calls,
              and the systems behind the demos.
            </p>

            {posts.length === 0 ? (
              <p className="mt-12 text-ink-muted">New articles are on the way.</p>
            ) : (
              <div className="mt-12 grid gap-6 sm:grid-cols-2">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="card group block overflow-hidden p-0"
                  >
                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                      <PostThumb post={post} sizes="(max-width: 640px) 100vw, 50vw" />
                    </div>
                    <div className="p-6">
                      <p className="text-xs text-ink-dim">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <h2 className="mt-2 text-h3 font-semibold text-ink group-hover:text-accent">
                        {post.title}
                      </h2>
                      <p className="mt-2 line-clamp-3 text-sm text-ink-muted">
                        {post.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
