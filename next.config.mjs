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
  // The Seinfeld HQ ships as a static HTML file in /public/seinfeld-hq,
  // served via this rewrite by the Node server on Vercel.
  async rewrites() {
    return [
      { source: '/seinfeld-hq', destination: '/seinfeld-hq/index.html' },
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
