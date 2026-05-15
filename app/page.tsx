import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/sections/Hero';
import { VideoExplainer } from '@/components/sections/VideoExplainer';
import { Industries } from '@/components/sections/Industries';
import { CaseStudies } from '@/components/sections/CaseStudies';
import { EmailCapture } from '@/components/sections/EmailCapture';
import { PrimaryCTA } from '@/components/sections/PrimaryCTA';
import { FAQ } from '@/components/sections/FAQ';

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main">
        {/* §1 Hero */}
        <Hero />
        {/* §2 Video Explainer */}
        <VideoExplainer />
        {/* §3 Industries */}
        <Industries />
        {/* §4 Case Studies (incl. Seinfeld flagship) */}
        <CaseStudies />
        {/* §5 Email Capture */}
        <EmailCapture />
        {/* §6 Primary CTA */}
        <PrimaryCTA />
        {/* §7 FAQ */}
        <FAQ />
      </main>
      {/* §8 Footer */}
      <Footer />
    </>
  );
}
