import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/sections/Hero';
import { VideoExplainer } from '@/components/sections/VideoExplainer';
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
        {/* Testimonials marquee — parked until Matt picks the final quotes */}
        {/* §3 Industries */}
        <Industries />
        {/* §4 Field Notes — featured article + bounded grid (full library at /blog) */}
        <CaseStudies />
        {/* §5 Living Flow — interactive map of AI + human handoffs */}
        <LivingFlow />
        {/* §6 Free Tools — AI Validation Panel callout */}
        <FreeTools />
        {/* §7 Email Capture */}
        <EmailCapture />
        {/* §8 Primary CTA */}
        <PrimaryCTA />
        {/* §9 FAQ (canonical FAQPage schema lives here) */}
        <FAQ emitSchema />
      </main>
      <Footer />
    </>
  );
}
