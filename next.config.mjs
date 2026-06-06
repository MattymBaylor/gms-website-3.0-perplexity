import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
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

// Full Next app on Vercel (no static export), so the faster Rust MDX
// compiler is safe to use.
const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
