import type { MetadataRoute } from 'next';

const BASE = 'https://growthmindset.ai';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/`,             lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/hvac`,         lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/about`,        lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/blog`,         lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/seinfeld-hq`,  lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ];
}
