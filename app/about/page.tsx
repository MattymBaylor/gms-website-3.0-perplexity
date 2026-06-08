import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About',
  description:
    'The story behind GrowthMindset.ai — AI voice agents for home service contractors.',
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'profile',
    url: '/about',
    title: 'About GrowthMindset.ai · Matt Martelli',
    description:
      'How GrowthMindset.ai started, who built it, and the philosophy behind the voice agents we ship.',
    images: [{ url: '/about/matt.webp', width: 800, height: 1000, alt: 'Matt Martelli, founder of GrowthMindset.ai' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About GrowthMindset.ai · Matt Martelli',
    description:
      'How GrowthMindset.ai started, who built it, and the philosophy behind the voice agents we ship.',
    images: ['/about/matt.webp'],
  },
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main id="main" className="pt-32 pb-32 md:pt-40">
        <div className="container-prose">
          {/* About Matt */}
          <section className="mx-auto max-w-5xl">
            <div className="grid items-start gap-10 md:grid-cols-[400px_1fr] md:gap-12">
              {/* Photo */}
              <div className="mx-auto w-full max-w-[400px] md:mx-0">
                <Image
                  src="/about/matt.webp"
                  alt="Matt Martelli, founder of GrowthMindset.ai"
                  width={800}
                  height={1000}
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="w-full rounded-2xl object-cover"
                />
              </div>

              {/* Bio */}
              <div>
                <h1 className="text-h2 font-semibold text-ink">About GrowthMindset.ai</h1>

                <div className="mt-6 space-y-5 leading-relaxed text-ink-muted">
                  <p>I&apos;m Matt Martelli, founder of GrowthMindset.ai.</p>
                  <p>
                    My background spans operations, business building,
                    automation, and applied AI.
                  </p>
                  <p>
                    I spend my time designing and deploying production AI
                    systems that help businesses operate more efficiently,
                    communicate more effectively, and scale without adding
                    unnecessary complexity.
                  </p>
                  <p>
                    I believe the most valuable AI systems are rarely the most
                    complicated.
                  </p>
                  <p>
                    The best systems are reliable, practical, and solve real
                    problems for real people.
                  </p>
                  <p>That&apos;s the standard we build toward at GrowthMindset.ai.</p>
                  <p>
                    Because at the end of the day, businesses don&apos;t buy
                    AI.
                  </p>
                  <p>They buy outcomes.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Back home */}
          <div className="mx-auto mt-20 max-w-3xl">
            <Link href="/" className="btn-ghost">
              <ArrowLeft size={16} /> Back home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
