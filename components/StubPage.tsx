import Link from 'next/link';
import { Nav } from './Nav';
import { Footer } from './Footer';
import { ArrowRight } from 'lucide-react';

interface StubPageProps {
  eyebrow?: string;
  title: string;
  body: React.ReactNode;
}

/**
 * Minimal placeholder page used until full pages are migrated
 * (Blog from Blogger, About bio, legal pages).
 */
export function StubPage({ eyebrow, title, body }: StubPageProps) {
  return (
    <>
      <Nav />
      <main id="main" className="pt-32 pb-32 md:pt-40">
        <div className="container-prose">
          <div className="mx-auto max-w-3xl">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1 className="mt-3 text-h1 font-semibold text-ink">{title}</h1>
            <div className="prose mt-8 max-w-none text-ink-muted">{body}</div>
            <div className="mt-12">
              <Link href="/" className="btn-ghost">
                <ArrowRight size={16} className="rotate-180" /> Back home
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
