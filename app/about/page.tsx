import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { BrandName } from '@/components/BrandName';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Matt Martelli, Founder & Chief AI Architect at growthmindset.ai — production AI systems for real business outcomes.',
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'profile',
    url: '/about',
    title: 'About growthmindset.ai · Matt Martelli',
    description:
      'Founder & Chief AI Architect — production AI systems that are reliable, practical, and built for outcomes.',
    images: [
      {
        url: '/about/matt.webp',
        width: 800,
        height: 1000,
        alt: 'Matt Martelli, founder of growthmindset.ai',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About growthmindset.ai · Matt Martelli',
    description:
      'Founder & Chief AI Architect — production AI systems that are reliable, practical, and built for outcomes.',
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
                  alt="Matt Martelli, founder of growthmindset.ai"
                  width={800}
                  height={1000}
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="w-full rounded-2xl object-cover"
                  priority
                />
              </div>

              {/* Bio — hierarchy matches about.jpg reference */}
              <div>
                <h1 className="text-h1 font-semibold tracking-tight text-ink md:text-hero">
                  <BrandName />
                </h1>

                <p className="mt-3 text-lg font-medium text-ink md:text-xl">
                  Matt Martelli | Founder &amp; Chief AI Architect
                </p>

                <div className="mt-8 space-y-6 text-base leading-[1.75] text-ink-muted md:text-[1.05rem]">
                  <p>
                    My background spans operations, business building, automation,
                    and applied AI. I spend my time designing and deploying
                    production AI systems that help businesses operate more
                    efficiently, communicate more effectively, and scale without
                    adding unnecessary complexity.
                  </p>
                  <p>
                    I believe the most valuable AI systems are rarely the most
                    complicated. The best systems are reliable, practical, and
                    solve real problems for real people.
                  </p>
                  <p>
                    That&apos;s the standard we live by. Because at the end of
                    the day, businesses don&apos;t buy AI. They buy outcomes.
                  </p>
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
