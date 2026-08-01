import type { Metadata } from 'next';
import './eara.css';

export const metadata: Metadata = {
  title: 'Enterprise AI Readiness Assessment',
  description:
    'A guided enterprise AI readiness diagnostic across strategy, data, processes, governance, people, and technology.',
  alternates: { canonical: '/eara' },
  robots: { index: false, follow: false },
};

export default function EaraLayout({ children }: { children: React.ReactNode }) {
  return children;
}
