# GrowthMindset.ai — Design System

**Brand:** GrowthMindset.ai (GMS) — the AI consultancy of **Matt Martelli**, *AI Systems Architect & Marketing/Sales Strategy*.
**Purpose of this system:** generate **tailored portfolio pages and strategic sales assets for prospective clients.** Every page should feel custom to the prospect while unmistakably belonging to the Matt Martelli / GrowthMindset brand.

> The thesis behind everything here: **"AI is the tool. The system is the product."** We don't sell tools or hype — we diagnose a business problem and architect the system that solves it.

---

## What this brand is

Matt Martelli has spent 25+ years building marketing, CRM, and operational systems. Today he architects **AI-powered ecosystems** — voice agents, multi-agent crews, marketing automation, CRM, and data pipelines — that produce **measurable business outcomes**. GrowthMindset.ai is the productized home for that work (AI voice agents, revenue recovery, marketing operations).

The audience for assets built with this system is **executive buyers** — owners, VPs, founders evaluating whether to bring Matt in. So the design language is **premium consulting**, not agency-portfolio or AI-startup. Clarity over decoration. Proof over promises.

### Reusable page modules (the point of this system)
Sales/portfolio pages are assembled from a fixed kit of sections so each prospect page feels custom but consistent:
1. **Hero / problem framing** — name the buyer's world in one line.
2. **"What I heard you asking"** — mirror their questions back as business problems.
3. **Diagnosis** — what's actually breaking and why.
4. **Case-study proof** — a real, comparable result.
5. **Workflow architecture** — the system, drawn as a diagram.
6. **Solution roadmap** — phased, practical.
7. **Example artifacts** — dashboards, agents, workflows.
8. **Expected outcomes** — quantified where honest.
9. **Next-step CTA** — make the next move obvious.

---

## Sources (for whoever maintains this)

You may not have access to all of these, but they are the source of truth for brand, copy, and visual decisions:

- **Logo package:** `uploads/GMS Logo files.zip` (extracted into `assets/brand/`) — wordmark, emblem, favicon, on-light / on-dark / on-gray lockups.
- **GitHub — design templates (attached):** https://github.com/MattymBaylor/claude-design-templates *(was empty / inaccessible at build time — re-share if it should seed templates).*
- **GitHub — personal site (primary brand & copy source):** https://github.com/MattymBaylor/mattmartelli-site — Next.js 15 + Tailwind. Design tokens in `tailwind.config.ts`; all copy is data-driven in `content/site.ts`, `content/projects.ts`, `content/diagrams.ts`. **The single best reference for voice and color.**
- **GitHub — GrowthMindset.ai website (v3.0):** https://github.com/MattymBaylor/gms-website-3.0-perplexity — the productized marketing site; confirms the dark + cyan brand surface and the orange CTA usage.
- Other relevant repos: `ai-workflow-portfolio`, `automation-portfolio`, `yelp-interactive-dashboard`, `maya-framework`, `growthmindset-ai`.

> Maintainer tip: explore the repos above to build higher-fidelity pages — `mattmartelli-site/content/*` contains real, reusable proof points, stats (with honest footnotes), and the exact tooling list.

---

## CONTENT FUNDAMENTALS — how we write

**Voice:** first-person singular, **"I"**, addressing the buyer as **"you."** Confident, calm, senior. Sounds like a principal consultant who has done this many times, not a vendor pitching. Never breathless.

**The core move:** lead with the **business problem**, then the **system**, then the **outcome** — never the technology. *"I start with the business problem, not the technology."* Tools are named only as interchangeable parts ("the framework is never the product").

**Sentence shape:** short, declarative, parallel. Headlines are often two beats with the emphasis on the second: *"AI is the tool. The system is the product."* / *"AI is the tool. **The system is the product.**"* Outcomes lead bullet points (*"Compresses response from hours to seconds."*).

**Casing:** Sentence case for body and most headings. Section eyebrows are **UPPERCASE mono** with wide tracking. Title Case is reserved for proper product names (Voice AI, Marketing Operations & CRM, Recruiter Fast Path). No ALL-CAPS shouting in body.

**Proof, honestly framed:** stats carry **superscript footnote markers** (¹–⁶) and a real source list. First-party results are labeled as *owned* and never inflated (*"cancellations dropped 38% — the same pattern fits any business that books appointments."*). Industry stats only *corroborate*.

**Emoji:** **none.** This is an executive brand. No emoji in copy, headings, or as icons.

**Vibe words:** architected, system, ecosystem, orchestration, measurable, production, end-to-end, leverage, recover, qualify, route, in-the-loop.

**Examples to imitate**
- Hero: *"AI is the tool. The system is the product."* + *"I've spent 25+ years building the marketing, CRM, and operational systems businesses rely on every day."*
- Diagnosis: *"Every missed call is lost revenue."*
- CTA: *"Tell me about the business problem. I'll tell you how I'd architect the system that solves it."*
- Closing: *"The future belongs to organizations that successfully combine AI, automation, data, and human expertise."*

**Avoid:** empty AI hype, "revolutionary/game-changing," walls of text, generic agency language, anything juvenile or template-mill.

---

## VISUAL FOUNDATIONS

**Two surfaces, one brand.**
- **Paper (default for sales/portfolio pages):** warm off-white `--surface-page` (#FBFAF8), ink text. Whitespace-led, editorial, premium. This is where "complex thinking feels simple."
- **Night (the brand's signature):** layered near-blacks (#0A0A0F → #171A24) with bright **cyan** signal. Used for the hero, section dividers, and "proof of work" / diagram panels — the moments that should feel like a systems command center.

A page rhythm alternates calm paper sections with one or two deliberate night panels. Never gradient-wash the whole page.

**Color**
- **Ink** (#16181D) and **paper** carry 90% of the page.
- **Cyan** is the brand signal: #00D4FF on night surfaces, deepened to **teal** #0B7A8C as the accent on paper (links, active states, diagram edges, small CTAs) so it stays premium rather than neon.
- **Amber** (#F5A524) marks the **human / outcome** — used sparingly, e.g. an outcome figure or a "you" highlight.
- **Indigo** #6366F1 and **green** #10B981 are tertiary (secondary edges; positive deltas). Use with restraint.
- Buyer takeaway: monochrome ink-on-paper, **one** confident accent at a time.

**Type**
- **Space Grotesk** — display: headlines, big numbers, eyebrows. Geometric, echoes the wordmark.
- **Inter** — body and UI.
- **JetBrains Mono** — eyebrows/kickers (uppercase, tracked), data labels, node tags, footnote markers, "architecture" motifs.
- Display headings are tightly tracked (`-0.025em`), large, and confident.

**Spacing & layout**
- 4px grid; **generous** section padding (96–128px). Content max 1216px; prose measure ~680px.
- Strong, simple grids. Modular cards. Clear section dividers (a hairline + a mono eyebrow).
- Diagrams and callouts are first-class: left-to-right flows, numbered "how it works" steps, stat callouts.

**Backgrounds & texture**
- Paper: flat, occasionally a **faint dot/line grid** (`--grid-faint`) behind diagrams only.
- Night: flat near-black; sparing **cyan glow** behind a focal element. No photographic hero backgrounds; imagery is product screenshots and architecture diagrams.
- Gradients only as a subtle cyan→indigo accent on a single element (a rule, an icon chip) — never a full-bleed wash.

**Borders, radii, cards**
- Hairline borders (`--border` #E2E2DF on paper; translucent slate on night).
- Radii are restrained: **12px** default card, 8px controls, up to 24px for large feature panels. Nothing bubbly.
- Cards: white surface, hairline border, **soft ambient shadow** (`--shadow-card`) — they lift gently, they don't float dramatically. On night, cards are `--night-2` with an inset top highlight.

**Elevation / shadow systems**
- Paper: soft, low, neutral ambient shadows (`--shadow-xs` → `--shadow-lg`).
- Night: inset top-light + deep drop (`--shadow-night`), plus a cyan **glow** ring for active/focal elements.

**Motion**
- Quiet and purposeful. `fade-up` (12px, 0.6s, ease-out) for section reveals; `pulse-soft` for live/active dots; animated dashed strokes for diagram edges (`dash`).
- Easing `cubic-bezier(0.22, 1, 0.36, 1)`. All motion respects `prefers-reduced-motion`. No bounce, no spin, no decorative loops on content.

**States**
- **Hover:** accent deepens (teal → teal-deep), or surface lifts one shadow step; links gain underline/brighten on night. Subtle, ~140–220ms.
- **Press:** slight darken + 1px settle (no dramatic shrink).
- **Focus:** visible 2px focus ring in `--focus-ring` (teal at 45%). Always visible — accessibility is non-negotiable in this brand.

**Transparency & blur**
- Sticky headers use a translucent surface + subtle backdrop blur. Glow uses translucent cyan. Otherwise surfaces are solid.

**Imagery vibe**
- Product screenshots (dashboards, agent builders, n8n canvases) shown in subtle device/browser frames. Dark, executive UI screenshots carry their own cyan/gradient data-viz. No stock photography of people; no clip-art.

---

## ICONOGRAPHY

- **System:** [Lucide](https://lucide.dev) — the exact icon set used on mattmartelli.com (`lucide-react`). Thin, consistent **1.75–2px stroke**, rounded line caps, geometric. Loaded from CDN (`lucide@latest`) in cards and kits. **Do not** hand-draw replacements or swap stroke weights.
- **Usage:** icons **clarify**, never decorate. Each icon maps to a concept (phone = inbound call, route = orchestration, gauge = scoring, calendar = scheduling). Default ink/teal; size 18–24px inline, 20–28px in feature chips. Never a random icon for flair.
- **Brand emblem:** the geometric "g" arrow mark (`assets/brand/emblem-*.svg`) — the only "logo-grade" mark. Use it for favicons, avatars, watermark, and the nav lockup. Not as a generic UI icon.
- **No emoji. No unicode dingbats** as icons. The only non-Lucide glyphs allowed are **superscript footnote markers** (¹²³…) in proof copy.
- **Architecture motifs:** small mono labels chained with `→` (e.g. `Call → Voice Agent → CRM → Scheduler → Follow-Up`) act as lightweight "iconography" for system flows.

---

## Index / manifest

**Root**
- `styles.css` — global entry (imports tokens + fonts). Consumers link this.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `fonts.css`.
- `README.md` — this guide. `SKILL.md` — Claude Code skill wrapper (*added on completion*).

**Assets** (`assets/`)
- `brand/` — wordmark (light/dark/gray bg), emblem (dark/white), favicon, hi-res lockups.

**Foundations** (Design System tab — `foundations/*.html`) — 16 specimen cards
- Colors (brand core, neutral ramp, semantic/status, night surfaces), Type (display, body, mono, scale), Spacing (scale, radii, shadows), Brand (wordmark, emblem).

**Components** (`components/<group>/`) — 11 primitives, one `<Name>.{jsx,d.ts,prompt.md}` each + one `*.card.html` per group
- `core/` — `Button`, `Badge`, `Eyebrow`
- `layout/` — `Card`, `SectionHeading`, `StatCallout`
- `sales/` — the prospect-page modules: `ProblemMirror` (what I heard you asking), `DepartmentCard` (the whole-business map), `FlowDiagram` (workflow architecture), `RoadmapStep` (solution roadmap), `Testimonial` (trust).

**UI kit** (`ui_kits/prospect_page/`) — *in progress*
- A full tailored **prospect sales page** (hero → what I heard → diagnosis → department map → proof → architecture → roadmap → outcomes → CTA), assembled from the components. `page.css` holds shared page-level layout helpers.

**Slides** (`slides/`) — *planned*
- Branded 16:9 sample slides for sales decks (title, problem, diagnosis, architecture, proof, roadmap, outcomes, CTA).

---

## A note on substitutions
- **Fonts:** Space Grotesk / Inter / JetBrains Mono are the *actual* production fonts (loaded from Google Fonts) — no substitution. The **logo wordmark** is a custom geometric typeface delivered as art (`assets/brand/`); do not retype it in a font — always place the supplied logo asset.
- **Icons:** Lucide is the real set — loaded from CDN rather than the repo's bundled `lucide-react`, but identical glyphs.
