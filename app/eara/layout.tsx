import type { Metadata } from 'next';
import './eara.css';

const title = 'Enterprise AI Readiness Assessment';
const description =
  'Evaluate readiness across strategy, data, processes, governance, people, and technology—and generate a prioritized roadmap.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/eara' },
  robots: { index: false, follow: false },
  openGraph: {
    type: 'website',
    url: 'https://growthmindset.ai/eara',
    siteName: 'growthmindset.ai',
    title,
    description,
  },
  twitter: {
    card: 'summary',
    title,
    description,
  },
};

export default function EaraLayout({ children }: { children: React.ReactNode }) {
  return children;
}
