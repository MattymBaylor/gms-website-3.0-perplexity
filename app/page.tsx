import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/sections/Hero';
import { VideoExplainer } from '@/components/sections/VideoExplainer';
import { Testimonials } from '@/components/sections/Testimonials';
import { Industries } from '@/components/sections/Industries';
import { AppointmentAgent } from '@/components/sections/AppointmentAgent';
import { CaseStudies } from '@/components/sections/CaseStudies';
import { LivingFlow } from '@/components/sections/LivingFlow';
import { FreeTools } from '@/components/sections/FreeTools';
import { PrimaryCTA } from '@/components/sections/PrimaryCTA';
import { FAQ } from '@/components/sections/FAQ';

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main">
        {/* §1 Hero — Every Missed Call… */}
        <Hero />
        {/* §2 Testimonials marquee — under hero, above video (top of fold) */}
        <Testimonials />
        {/* §3 Video Explainer — See it in action */}
        <VideoExplainer videoId="6rEDK6LX_AA" />
        {/* §4 Industries */}
        <Industries />
        {/* §5 Appointment agent — Christina, live in the page */}
        <AppointmentAgent />
        {/* §6 Field Notes — featured article + bounded grid (full library at /blog) */}
        <CaseStudies />
        {/* §7 Living Flow — interactive map of AI + human handoffs */}
        <LivingFlow />
        {/* §8 Free Tools — AI Validation Panel callout */}
        <FreeTools />
        {/* §9 Primary CTA — the ONE call to action.
            The "Send Me the Guide" EmailCapture section used to sit directly above
            this and competed with it for the same visitor, asking for an email in
            exchange for a PDF instead of a demo. The component still exists and is
            used on blog posts, where the reader isn't ready to buy yet. Do not put
            a second form back on the home page. */}
        <PrimaryCTA />
        {/* §10 FAQ (canonical FAQPage schema lives here) */}
        <FAQ emitSchema />
      </main>
      <Footer />
    </>
  );
}
