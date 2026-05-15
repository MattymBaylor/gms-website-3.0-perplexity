import type { Metadata } from 'next';
import { StubPage } from '@/components/StubPage';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles on AI voice agents, home services automation, and lead capture.',
  alternates: { canonical: '/blog' },
};

export default function BlogPage() {
  return (
    <StubPage
      eyebrow="Field notes"
      title="Blog"
      body={
        <>
          <p>
            The blog is being migrated off Blogger and onto the main site to
            recapture SEO authority. Posts will be served from a headless CMS
            (likely Sanity) or MDX files in the repo — TBD per the rebuild
            spec.
          </p>
          <p className="mt-4 text-ink-dim">
            Until then, the legacy archive lives at{' '}
            <a
              href="https://the-ai-mindset.blogspot.com"
              className="link-accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              the-ai-mindset.blogspot.com
            </a>
            .
          </p>
        </>
      }
    />
  );
}
