import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string; // ISO: YYYY-MM-DD
  hero?: string; // path under /public, e.g. /blog/missed-calls.jpg
  heroAlt?: string;
  tags?: string[];
  author?: string;
  draft?: boolean;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

/**
 * Slugs intentionally hidden from all listings (the homepage "See It In
 * Action" grid and /blog) without deleting the source MDX files. Remove a
 * slug from this set to republish that post.
 */
const HIDDEN_SLUGS = new Set<string>([
  'seinfeld-ai-agents',
  'seinfeld-roofing-case-study',
]);

/** All published posts, newest first. Drafts and hidden slugs excluded. */
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, '');
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
    const { data } = matter(raw);
    return { slug, ...(data as PostFrontmatter) };
  });

  return posts
    .filter((p) => !HIDDEN_SLUGS.has(p.slug))
    .filter((p) => (process.env.NODE_ENV === 'production' ? !p.draft : true))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Slugs for generateStaticParams. */
export function getAllPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

/** Frontmatter for a single post (used by generateMetadata). */
export function getPostMeta(slug: string): PostMeta | null {
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf8');
  const { data } = matter(raw);
  return { slug, ...(data as PostFrontmatter) };
}

export const SITE_URL = 'https://growthmindset.ai';
