import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const SITE_URL = 'https://growthmindset.ai';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'growthmindset.ai — AI Voice Agents for Home Service Contractors',
    template: '%s · growthmindset.ai',
  },
  description:
    'AI that answers your phone, qualifies the lead, and books the job — before they hang up. 24/7 voice agents built for HVAC, roofing, plumbing, and home services.',
  keywords: [
    'AI voice agent',
    'home service AI',
    'HVAC answering service',
    'roofing lead capture',
    'AI receptionist',
    'missed call recovery',
  ],
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'growthmindset.ai',
    title: 'Every Missed Call Is a Job You\'ll Never Know You Lost',
    description:
      'AI that answers your phone, qualifies the lead, and books the job — before they hang up.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'growthmindset.ai — AI Voice Agents for Home Service Contractors' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'growthmindset.ai',
    description: 'AI voice agents for home service contractors.',
    images: ['/opengraph-image'],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'growthmindset.ai',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    sameAs: [
      'https://www.linkedin.com/in/mattmartelli',
      'https://www.youtube.com/@matt_martelli',
    ],
    description: 'AI voice agents for home service contractors.',
  };

  return (
    <html lang="en" className={inter.variable}>
      <body>
        {/* Skip nav for keyboard users */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-btn focus:bg-accent focus:px-4 focus:py-2 focus:text-bg focus:font-semibold"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
