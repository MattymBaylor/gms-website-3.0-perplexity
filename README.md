# GrowthMindset.ai — Next.js Rebuild (v3.0)

Implementation of [`GMS_Website_Rebuild_Spec.md`](../GMS_Website_Rebuild_Spec.md). Built with **Next.js 14 (App Router)**, **Tailwind CSS**, **Framer Motion**, and **lucide-react**. Deploys natively to Vercel.

## What's built

| Route             | Status   | Source                                          |
| ----------------- | -------- | ----------------------------------------------- |
| `/`               | ✅ Full   | `app/page.tsx` — all 8 sections from spec §2    |
| `/hvac`           | ✅ Full   | `app/hvac/page.tsx` — uses `IndustryPage` template |
| `/seinfeld-hq`    | ✅ Static | `public/seinfeld-hq/index.html` + assets        |
| `/about`          | 🟡 Stub  | Replace bio + E-E-A-T content                   |
| `/blog`           | 🟡 Stub  | Pending Blogger migration to MDX/Sanity         |
| `/privacy`, `/terms` | 🟡 Stub | Legal copy needed                            |
| `/api/lead`       | ✅ Live   | Edge route → N8N webhook (`Sam Outbound`)       |

Other industry pages (`/roofing`, `/plumbing`, etc.) are stubbed via the Industries modal. They're trivial to spin up: copy `app/hvac/page.tsx`, change the props passed to `<IndustryPage>`.

## Quickstart

```bash
npm install      # or pnpm install
cp .env.example .env.local
npm run dev      # http://localhost:3000
```

## Project structure

```
app/
  layout.tsx              # root layout, fonts, metadata, JSON-LD
  page.tsx                # homepage (assembles all 8 sections)
  globals.css             # Tailwind layers + design tokens
  hvac/page.tsx           # HVAC industry landing page
  about|blog|privacy|terms/page.tsx
  api/lead/route.ts       # Edge route → N8N webhook
  sitemap.ts | robots.ts  # SEO
  icon.svg                # favicon
components/
  Nav.tsx, Footer.tsx, Logo.tsx, Modal.tsx
  HeroBlueprint.tsx       # the centerpiece 7-node circuit animation
  CTAForm.tsx             # primary demo form
  IndustryPage.tsx        # reusable industry template
  StubPage.tsx
  sections/
    Hero.tsx
    VideoExplainer.tsx
    Industries.tsx        # 12 industry tiles + modal
    CaseStudies.tsx       # horizontal scroller + modal, Seinfeld flagship
    EmailCapture.tsx
    PrimaryCTA.tsx
    FAQ.tsx
public/
  logo.svg, logo-mono.svg
  seinfeld-hq/            # the existing interactive piece, dropped in
```

## Design tokens (Tailwind)

Defined in `tailwind.config.ts`:

| Token            | Value     | Use                            |
| ---------------- | --------- | ------------------------------ |
| `bg-bg`          | `#0a0a0a` | Page background                |
| `bg-bg-elevated` | `#111113` | Modal & elevated surfaces      |
| `bg-bg-card`     | `#141417` | Card backgrounds               |
| `text-accent`    | `#00d4ff` | Highlights, links, active      |
| `bg-cta`         | `#f97316` | **Primary CTA buttons only**   |
| `text-success`   | `#10b981` | Success states                 |
| `border-border`  | `rgba(255,255,255,0.07)` | Default soft border |

Per the spec, orange is reserved exclusively for the primary action button. Cyan is the only accent.

## Adding a new industry page

```tsx
// app/roofing/page.tsx
import { IndustryPage } from '@/components/IndustryPage';

export const metadata = { title: 'AI Voice Agent for Roofers', /* … */ };

export default function RoofingPage() {
  return (
    <IndustryPage
      name="Roofing"
      title="AI Voice Agent for Roofers"
      headline="When the Storm Stops, the Phones Don't"
      headlineSecondary="Be First, Every Time"
      sub="..."
      trust="Built for storm response + insurance jobs"
      bullets={[ /* 5-6 industry-specific bullets */ ]}
    />
  );
}
```

Then flip the `pageBuilt` flag for that slug in `components/sections/Industries.tsx` so the "See full details →" button appears in the modal.

## Demo form pipeline

The CTA form posts JSON to **`/api/lead`** (an Edge route), which validates and forwards to the existing N8N webhook. Webhook URL is configurable via `N8N_WEBHOOK_URL`; the production URL is the fallback.

Payload schema (matches spec §5):

```json
{
  "first_name":       "string",
  "business_name":    "string",
  "business_address": "string",
  "phone":            "string"
}
```

## Hero blueprint animation

The 7-node circuit lives in `components/HeroBlueprint.tsx`. Each node has a label, stat, and source. The pulse traverses a single SVG path (`<animateMotion>`) for a smooth cyclic loop. A `setInterval` keyed to the same cycle duration drives which stat tooltip is visible, so the copy is in sync with the visual pulse without needing a JS animation library to compute path tangents.

On screens < 640px the blueprint collapses to a vertical timeline (same content, no SVG motion).

## Open items (per spec)

- [ ] Wire **email capture** to Mailchimp/ConvertKit/N8N (currently stubbed in `EmailCapture.tsx`)
- [ ] Replace placeholder case studies with real customer outcomes
- [ ] Build out remaining industry pages from the `IndustryPage` template
- [ ] Migrate blog from Blogger (JSONP) to MDX/Sanity
- [ ] Add Google Analytics 4 + Google Tag Manager
- [ ] Generate a real `/public/og-image.png` (1200×630) for social previews
- [ ] Legal copy for `/privacy` and `/terms`
- [ ] Confirm trust signal ("50+ home service businesses" placeholder)

## Deploy

Vercel: connect the repo, set `N8N_WEBHOOK_URL` in environment variables, deploy. The `seinfeld-hq` static asset and all character images are bundled in `public/` and served at `/seinfeld-hq` via a Next rewrite (see `next.config.mjs`).
