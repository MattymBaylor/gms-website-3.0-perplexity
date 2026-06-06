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
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main id="main" className="pt-32 pb-32 md:pt-40">
        <div className="container-prose">
          {/* §1 About GrowthMindset.ai */}
          <section className="mx-auto max-w-3xl">
            <p className="eyebrow">Who we are</p>
            <h1 className="mt-3 text-h1 font-semibold text-ink">
              About GrowthMindset.ai
            </h1>

            <div className="mt-8 space-y-5 leading-relaxed text-ink-muted">
              <p>
                GrowthMindset.ai exists because most businesses don&apos;t have
                a lead problem.
              </p>
              <p>They have a response problem.</p>
              <p>A customer calls. Nobody answers.</p>
              <p>The customer moves on.</p>
              <p>The opportunity is gone.</p>
              <p>
                After spending years building businesses and working directly
                with operators, I kept seeing the same pattern repeat itself.
                Companies would invest heavily in marketing, advertising,
                referrals, websites, SEO, and sales efforts — only to lose
                revenue because nobody picked up the phone quickly enough.
              </p>
              <p>The technology to solve that problem finally exists.</p>
              <p>
                Today, GrowthMindset.ai builds AI voice agents and automation
                systems that help businesses respond instantly, qualify
                opportunities, automate routine conversations, and create
                better customer experiences.
              </p>
              <p>Our focus isn&apos;t AI for the sake of AI.</p>
              <p>It&apos;s practical systems that solve operational bottlenecks.</p>
              <p>
                That might mean answering every inbound call, qualifying leads
                before they reach a salesperson, automating scheduling,
                routing conversations to the right person, or connecting
                customer interactions directly into business workflows.
              </p>
              <p>
                Behind the scenes, these systems can involve voice AI, agentic
                workflows, automation platforms, CRM integrations, retrieval
                systems, and custom software.
              </p>
              <p>Customers don&apos;t need to care about any of that.</p>
              <p>They care that calls get answered.</p>
              <p>Appointments get booked.</p>
              <p>Leads get followed up with.</p>
              <p>And opportunities stop slipping through the cracks.</p>
            </div>
          </section>

          {/* §2 About Matt */}
          <section className="mx-auto mt-24 max-w-5xl">
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
                <h2 className="text-h2 font-semibold text-ink">About Matt</h2>

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
