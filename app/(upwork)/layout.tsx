import type { Metadata } from 'next';
import './upwork.css';

/**
 * Upwork proposal landing pages — deliberately bare.
 *
 * No site Nav, no Footer, no forms, no contact affordances of any kind.
 * Read docs/UPWORK-LANDING-PAGES.md before touching anything under this
 * route group — it carries Upwork-compliance constraints that can cost
 * Matt his account if broken.
 */
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function UpworkLayout({ children }: { children: React.ReactNode }) {
  return <div className="uw-root">{children}</div>;
}
