import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { getAllPostSlugs, getPostMeta, SITE_URL } from '@/lib/blog';

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const meta = getPostMeta(params.slug);
  if (!meta) return {};
  const url = `${SITE_URL}/blog/${meta.slug}`;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/blog/${meta.slug}` },
    openGraph: {
      type: 'article',
      url,
      title: meta.title,
      description: meta.description,
      publishedTime: meta.date,
      images: meta.hero ? [{ url: meta.hero }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: meta.hero ? [meta.hero] : undefined,
    },
  };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const meta = getPostMeta(params.slug);
  if (!meta) notFound();

  // Dynamic import of the MDX file as a component.
  let Article: React.ComponentType;
  try {
    const mod = await import(`@/content/blog/${params.slug}.mdx`);
    Article = mod.default;
  } catch {
    notFound();
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    dateModified: meta.date,
    image: meta.hero ? `${SITE_URL}${meta.hero}` : undefined,
    author: { '@type': 'Person', name: meta.author ?? 'Matt Martelli' },
    publisher: {
      '@type': 'Organization',
      name: 'GrowthMindset.ai',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.svg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${meta.slug}` },
  };

  const dateLabel = new Date(meta.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <Nav />
      <main id="main" className="pt-32 pb-32 md:pt-40">
        <article className="container-prose">
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow">{dateLabel}</p>
            <h1 className="mt-3 text-h1 font-semibold text-ink">{meta.title}</h1>
            {meta.description && (
              <p className="mt-4 text-lead text-ink-muted">{meta.description}</p>
            )}

            {meta.hero && (
              <Image
                src={meta.hero}
                alt={meta.heroAlt ?? meta.title}
                width={1200}
                height={630}
                priority
                className="mt-8 rounded-card"
              />
            )}

            <div className="mt-10">
              <Article />
            </div>

            <div className="mt-16 border-t border-border pt-8">
              <Link href="/blog" className="btn-ghost">
                <ArrowRight size={16} className="rotate-180" /> All articles
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </>
  );
}
