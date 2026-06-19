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

/**
 * Hero art for posts whose MDX frontmatter doesn't declare its own `hero`.
 * Keyed by slug. Lets us give a post card/hero artwork without editing the
 * post body. Frontmatter always wins: an override only applies when the post
 * has no `hero` of its own, so adding `hero:` to the MDX later silently
 * supersedes the matching entry here.
 */
const HERO_OVERRIDES: Record<string, { hero: string; heroAlt: string }> = {
  'review-requests': {
    hero: 'https://d8j0ntlcm91z4.cloudfront.net/user_2x6GIJJShG79O7fFfTL1wGNeYpm/hf_20260619_152100_e9af61de-9170-4d75-bce5-223c62940fe6.png',
    heroAlt:
      "A homeowner's hand holding a smartphone showing five gold rating stars in a sunlit kitchen, a home-service contractor smiling out of focus behind",
  },
  'appointment-reminders': {
    hero: 'https://d8j0ntlcm91z4.cloudfront.net/user_2x6GIJJShG79O7fFfTL1wGNeYpm/hf_20260619_153217_60c0a46c-4d56-4dbd-aa55-1609a298052e.png',
    heroAlt:
      'A uniformed home-service technician arriving on time at a suburban front porch at golden hour as a homeowner opens the door, service van in the driveway',
  },
};

/** Apply a HERO_OVERRIDES entry when the post declares no hero of its own. */
function withHero(meta: PostMeta): PostMeta {
  if (meta.hero) return meta;
  const override = HERO_OVERRIDES[meta.slug];
  return override ? { ...meta, ...override } : meta;
}

/** All published posts, newest first. Drafts and hidden slugs excluded. */
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, '');
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
    const { data } = matter(raw);
    return withHero({ slug, ...(data as PostFrontmatter) });
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
  return withHero({ slug, ...(data as PostFrontmatter) });
}

export const SITE_URL = 'https://growthmindset.ai';
