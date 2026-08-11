import createMDX from '@next/mdx';
import remarkFrontmatter from 'remark-frontmatter';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'd8j0ntlcm91z4.cloudfront.net' },
    ],
  },
  // Allow .md / .mdx files to be treated as pages and content.
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  // Static HTML apps shipped from /public are served at clean paths via these rewrites
  // (the Node server on Vercel maps the bare path to the folder's index.html).
  async rewrites() {
    return [
      { source: '/seinfeld-hq', destination: '/seinfeld-hq/index.html' },
      { source: '/games', destination: '/games/index.html' },
      { source: '/org-chart', destination: '/org-chart/index.html' },
      { source: '/vault', destination: '/vault/index.html' },
      { source: '/gotar-loop', destination: '/gotar-loop/index.html' },
      { source: '/demo-appointment', destination: '/demo-appointment/index.html' },
    ];
  },
  // /vault is reachable but unlisted: noindex header, no robots.txt entry
  // (a Disallow line in the public robots.txt would advertise the path).
  async headers() {
    return [
      {
        source: '/vault/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/vault',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
};

// We use the default JS-based MDX compiler (mdxRs disabled) so that
// custom remark/rehype plugins can run. remark-frontmatter is what
// recognizes the YAML block at the top of each blog post as metadata
// instead of rendering it as page content. (gray-matter still does the
// parallel metadata parsing in lib/blog.ts for the sitemap/route data.)
const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkFrontmatter],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
