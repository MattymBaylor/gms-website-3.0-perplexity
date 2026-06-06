import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

const BASE = 'https://growthmindset.ai';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/seinfeld-hq`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    // Industry pages
    { url: `${BASE}/hvac`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/roofing`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/plumbing`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/electrical`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/insurance`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/real-estate`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/locksmith`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/medical`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/property-management`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/home-services`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/custom`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ];

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
