import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/sections/Hero';
import { VideoExplainer } from '@/components/sections/VideoExplainer';
import { Testimonials } from '@/components/sections/Testimonials';
import { Industries } from '@/components/sections/Industries';
import { CaseStudies } from '@/components/sections/CaseStudies';
import { LivingFlow } from '@/components/sections/LivingFlow';
import { FreeTools } from '@/components/sections/FreeTools';
import { EmailCapture } from '@/components/sections/EmailCapture';
import { PrimaryCTA } from '@/components/sections/PrimaryCTA';
import { FAQ } from '@/components/sections/FAQ';

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main">
        {/* §1 Hero — Every Missed Call… */}
        <Hero />
        {/* §2 Video Explainer — See it in action (extra top pad vs hero) */}
        <VideoExplainer videoId="6rEDK6LX_AA" />
        {/* §3 Testimonials marquee — side-faded ticker */}
        <Testimonials />
        {/* §4 Industries */}
        <Industries />
        {/* §5 Field Notes — featured article + bounded grid (full library at /blog) */}
        <CaseStudies />
        {/* §6 Living Flow — interactive map of AI + human handoffs */}
        <LivingFlow />
        {/* §7 Free Tools — AI Validation Panel callout */}
        <FreeTools />
        {/* §8 Email Capture */}
        <EmailCapture />
        {/* §9 Primary CTA */}
        <PrimaryCTA />
        {/* §10 FAQ (canonical FAQPage schema lives here) */}
        <FAQ emitSchema />
      </main>
      <Footer />
    </>
  );
}
