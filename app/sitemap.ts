import type { MetadataRoute } from 'next';

const BASE = 'https://growthmindset.ai';

const INDUSTRY_SLUGS = [
  'hvac',
  'roofing',
  'plumbing',
  'electrical',
  'insurance',
  'real-estate',
  'legal',
  'medical',
  'locksmith',
  'property-management',
  'home-services',
  'custom',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,            lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/about`,       lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/blog`,        lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/seinfeld-hq`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ];

  const industries: MetadataRoute.Sitemap = INDUSTRY_SLUGS.map((slug) => ({
    url: `${BASE}/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...core, ...industries];
}
