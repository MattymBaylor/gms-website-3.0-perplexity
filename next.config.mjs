import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export for preview hosting (S3). Set NEXT_EXPORT=1 to enable.
  // Production Vercel deploys leave this unset and run as a full Next app.
  output: process.env.NEXT_EXPORT ? 'export' : undefined,
  images: {
    unoptimized: process.env.NEXT_EXPORT ? true : false,
    formats: ['image/avif', 'image/webp'],
  },
  trailingSlash: process.env.NEXT_EXPORT ? true : false,
  // Allow .md / .mdx files to be treated as pages and content.
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  // The Seinfeld HQ ships as a static HTML file in /public/seinfeld-hq.
  // Rewrites only run in the Node server; in `export` mode the file is
  // served directly at /seinfeld-hq/index.html (which is fine).
  async rewrites() {
    if (process.env.NEXT_EXPORT) return [];
    return [
      { source: '/seinfeld-hq', destination: '/seinfeld-hq/index.html' },
    ];
  },
};

// Use the stable JS-based MDX compiler (not mdxRs) so the static-export
// build path keeps working. (Removed in the follow-up dual-mode cleanup.)
const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
