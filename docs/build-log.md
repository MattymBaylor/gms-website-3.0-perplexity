# growthmindset.ai — build log

Dated entries capturing the *moves* — decisions, components shipped, deck-worthy beats tagged `[DECK]`.

---

## 2026-06-09 — `/saas/ai-validation-panel` shipped (LinkedIn-article lead magnet)

**What:** New page + API route for an "AI Validation Panel" — paste audience / goal / message variants, get a Claude-judged winner + objections + improved rewrites in ~15s.

**Files:**
- `app/saas/ai-validation-panel/page.tsx` — server component, metadata, brand chrome.
- `app/saas/ai-validation-panel/ValidationPanel.tsx` — client form + result UI.
- `app/api/validate/route.ts` — Node runtime, plain `fetch` to Anthropic, defensive JSON parsing, friendly error envelope on every failure mode.
- `.env.example` — added `ANTHROPIC_API_KEY`.

**Decisions:**
- Route under `/saas/*` (not `/tools/*` or root) so future SaaS-style free utilities share a namespace.
- Used `claude-sonnet-4-6` — smart enough for persona reasoning, fast enough for ~15s UX, cheaper than Opus for a public free tool. Easy swap if quality drops.
- No SDK dependency — plain `fetch` to the Messages API. Keeps the bundle lean and matches the existing `/api/lead` pattern.
- Defensive JSON extractor (strips code fences, finds outermost `{…}`) so we don't blow up on a stray prose preamble.
- Three layered failure messages: missing key → server-config error; upstream 4xx/5xx → "panel couldn't run"; bad JSON → "unexpected shape"; timeout → "try fewer messages". Each surfaces in the same alert box; no client crashes.
- "Load sample" button so first-time visitors from the LinkedIn article see a real result without typing.
- Disclaimer line: *"Runs on Claude. Your inputs are sent server-side to Anthropic and are not stored."* — honest framing per Principle 6.

**Verified in browser preview (`localhost:3003`):**
- Page renders with Nav + Footer chrome and brand tokens (cyan eyebrow, orange CTA).
- Sample loader populates all three fields.
- Form submits to `/api/validate`; missing-key path returns clean error and renders in a red-tinted `role="alert"` block.
- No console errors.

**Before going live:**
1. Set `ANTHROPIC_API_KEY` in Vercel project env (production + preview).
2. Optional: add a link in `Nav.tsx` or homepage so the page is discoverable beyond the LinkedIn article.

**`[DECK]`** — *Free-tool lead magnet pattern.* This is the first `/saas/*` page. Same playbook every time: LinkedIn article → free Claude-powered tool that solves one narrow marketing problem → result page hints at the bigger system. Cheap to build (one afternoon), expensive to copy (each one teaches us something about which marketing pains buyers will actually pay to fix). Worth productizing as a repeatable consulting offer.

### 2026-06-09 — same-day follow-ups

**Brand pass on `/saas/ai-validation-panel`:** swapped orange CTA → blue (matches the black/white/blue palette Matt called for this page). Header rewritten to lead with the `$20K vs $1` framing from the LinkedIn article. Added a two-card "What you give us / What you get back" explainer above the form. Locked the prompt to "exactly 4 distinct personas" so the tool matches the article's "four independent personas" line.

**Home page integration:** new `components/sections/FreeTools.tsx` section ("Pressure-test your marketing for a dollar") slotted between `CaseStudies` and `EmailCapture` on `/`. Same card pattern as `EmailCapture`, blue CTA matching the tool page, `Try the AI Validation Panel →` button linking to `/saas/ai-validation-panel`. Built as a single-tool section but structured to extend to multiple tools later.

**Carryover punch list:**
- Set `ANTHROPIC_API_KEY` in Vercel before the LinkedIn article goes live.
- The Nav still shows the orange `Get Your Free Demo` CTA site-wide. Three options when ready: leave it, swap that one Nav button to blue, or hide it on `/saas/*` so the tool feels stand-alone.

### 2026-07-03 — Seinfeld HQ chat backend: dead Supabase proxy → n8n webhook

**What:** The live demo's AI chat had been dead — `PROXY_URL` in `public/seinfeld-hq/index.html` pointed at a paused Supabase Edge Function. Swapped it to the self-hosted n8n webhook (`n8n.growthmindsetai.tech/webhook/seinfeld-chat`, gpt-4o via stored credential) in a strictly one-line PR (#37, open, unmerged). Same session: locked the n8n webhook's CORS from `*` down to `https://growthmindset.ai,https://www.growthmindset.ai`.

**Decisions:**
- One-line diff, no file regeneration — the frontend consumes a stable contract (POST `{messages}` → OpenAI-shaped JSON), so swapping vendors is a URL edit, nothing more.
- CORS locked to apex + www only. Checked first: the demo isn't embedded anywhere else (not on mattmartelli.com). Known tradeoff: Vercel *preview* deploys have dynamic URLs, so their chat is CORS-blocked — add an origin later if it ever matters. CORS is browser-side hygiene, not auth; the webhook still has no auth (candidate for a later pass).
- Verified before/after from the edge: preflight from both allowed origins echoes the right `Access-Control-Allow-Origin`; foreign origins get a non-matching header (browser rejects). Live POST through the locked webhook returned a real Jerry line.

**Parked:** rotating the OpenAI key that was hardcoded in the old Supabase function — Matt's call, logged in open commitments. Before rotating, check whether it's the same key behind the n8n "OpenAi account" credential (if so, rotation must update that credential too).

**`[DECK]`** — *Swap the backend under a live demo with a one-line diff.* Because the chat frontend was written against a stable proxy contract, moving from a managed Supabase function to a self-hosted n8n workflow was a URL change — and the new endpoint was CORS-locked and verified the same hour. The pattern: put a dumb proxy contract between demo frontends and whatever AI backend is cheapest/healthiest this month.

### 2026-07-03 — 12 industry-specific "missed-call math" animated explainers

**What:** Replaced the generic YouTube explainer embed on all 12 industry pages with `MissedCallMath` — an animated 4-scene explainer (SWFL scenario → missed-call counter → the revenue equation with live count-up → the AI-answers flip) driven by per-industry economics in `content/industry-economics.ts`. Autoplays on scroll-into-view, scene dots + replay, honors `prefers-reduced-motion`. Homepage keeps the brand video; industry pages get the math.

**Research:** 12-agent parallel fan-out (one pricing scout per industry, forced JSON schema, 40-word basis ceiling) priced the average sale for each trade in Naples/Fort Myers/Miami — from a $175 locksmith call to a $28K hurricane-code roof replacement. Sources cited inline as comments in the data file. ~43 seconds wall-clock for all 12.

**Decisions:**
- One shared component + a typed data record, not 12 bespoke components — adding industry #13 is a config entry, not a build.
- Honest framing throughout: figures labeled as illustrations, assumptions (missed calls/week, close rate) printed in the fine print, insurance shows *commission* not premium, real estate uses a 5% close rate so the number survives a skeptical read.
- `economics` prop falls back to the old `VideoExplainer` when absent, so the video path still exists for future pages.

**Verified:** production build green (33/33 pages); Playwright run confirmed scene auto-advance and the exact math on `/hvac` ($44,200/mo) and `/legal` ($11,550/mo).

**`[DECK]`** — *A 12-agent research swarm priced 12 local-service verticals in 43 seconds, and the numbers went straight into production animations the same hour.* The pattern: forced-schema pricing scouts → typed config file → one data-driven animation component. Research-to-pixels with no copy-paste step in between.

### 2026-07-04 — All 12 video cuts wired + homepage heading de-dupe

**What:** Wired all 12 Claude Design per-industry explainer cuts (YouTube) into their pages — a page's own cut wins the explainer slot, pages without one keep the MissedCallMath animation (roofing is the only one left). Then fixed the duplicate headline Matt screenshotted: the video section keeps "See it in action"; the article showcase (CaseStudies) is now "The blog / Field Notes". Capped its grid at featured + 6 so homepage and industry pages stay bounded as the blog grows, and removed the redundant LatestArticles carousel from the homepage (same posts as the section above it; nothing linked to #articles). `#case-studies` anchor preserved — both hero "see the results/breakdown" buttons still land.

**Note:** `LatestArticles.tsx` / `ArticleCarousel.tsx` are now unused — kept in the tree for potential reuse; delete in a future cleanup pass if still unused.

**`[DECK]`** — *Every industry page now runs the full ladder: produced 30s video cut (Claude Design → YouTube) with an animated in-page fallback, all deployed same-day as the cuts were uploaded.*

### 2026-07-04 — Free-guide email capture: stub → real pipeline

**What:** Matt tested the "True Cost of Missed Calls" form and got nothing. Root cause was three stacked gaps: the form was a stub (fake delay + success message, no request), the n8n "GMS Website - Email Subscriber" workflow was cloned in May but never activated (and had no email step), and the guide PDF didn't exist. Fixed all three: authored a 4-page SWFL guide (Typst source in docs/guides/, compiled to public/guides/), wired the form → /api/subscribe → n8n webhook (Vercel env), rebuilt the n8n workflow (respond fast → Google Sheet capture → guide email to visitor, cc matt@growthmindset.ai) and activated it. Success state now delivers the guide by instant download, so delivery never depends on SMTP.

**Gotcha worth remembering:** the repo folder was Vercel-linked to a stale duplicate project (gms-website-3-0-perplexity) while growthmindset.ai is actually served by project **gms-site** — the env var silently went to the wrong project first. Relinked the folder to gms-site; deploys are git-triggered on that project.

**Open item:** the n8n SMTP credential "Gmail SMTP - matt@growthmindset.ai" is dead (Google 535 BadCredentials — app password revoked). Until Matt mints a new app password and updates that credential, the visitor/cc email step fails (loudly, in n8n executions); captures + instant download are unaffected. Longer term this is the 1Password/op-service-account tech-debt item.

**`[DECK]`** — *"I entered my email and got nothing" → full diagnosis and rebuild of the lead-magnet pipeline (guide authored, API wired, n8n workflow repaired + activated, wrong-Vercel-project caught via log footer) in one session, verified with live executions.*

## 2026-07-10 — `/vault` — unlisted consulting library shipped

**What:** The Claude Design "GMS Consulting Library" handoff is live as a static HTML app at `growthmindset.ai/vault` — the shelf landing page plus all three documents (Voice Agent Implementation Guide ×3pp, Enterprise AI Integration Playbook ×11pp, GMOS v2 ×22pp) in screen + print versions, brand SVGs, and the design-system token bundle.

**Decisions:**
- **Reachable-but-unlisted, not password-protected.** Matt's call: "not critical information… nobody is going to go to vault." `X-Robots-Tag: noindex, nofollow` via `next.config.mjs` headers on `/vault/:path*`, plus a `<meta name="robots">` in the page. Deliberately NOT in `robots.txt` — a `Disallow: /vault` line in a public file would advertise the exact path we're hiding.
- **House pattern reused:** static app in `public/` + extensionless rewrite (`/vault` → `/vault/index.html`), same as `/seinfeld-hq`, `/games`, `/org-chart`.
- **`<base href="/vault/">` fix:** served at the extensionless path, all relative refs (`support.js`, `_ds/`, sibling docs) resolved against site root and silently 404'd — the page rendered but never hydrated (`{{ asOf }}` showed raw). One base tag fixed every reference at once.
- Kebab-case filenames (`gmos.html`, `enterprise-playbook.html`, …) instead of the handoff's spaced names; library hrefs repointed with print-variants replaced first so the plain names don't eat them.
- GMOS is marked INTERNAL / NOT FOR DISTRIBUTION — flagged once that obscurity-only exposes it; Matt accepted. If that changes, gate `/vault/gmos*` specifically.

**Verified:** local dev — library hydrates (UPDATED JULY 2026, emblem watermark, halos), GMOS renders, headers confirmed on all `/vault` paths and absent on `/`. Preview deploy green. Follow-ups parked: real PDFs from the `-print` pages (currently print-dialog flow, as designed), optional `vault.growthmindset.ai` alias.

**`[DECK]`** — *Design-tool handoff to live URL in one session: unzip → rename → one `<base>` tag → noindex headers → deployed.* The interesting beat is the negative decision: keeping the hidden path OUT of robots.txt, because robots.txt is the first place anyone looks for what you're hiding.

**Addendum (same day):** Added section **04 — FIELD NOTES** to the vault — the two "Who Audits the Robots?" papers (*Paying Agents to Find Truth*, *Standing Watch*, 5pp each) as real static PDFs, styled on the print-library panel pattern; pipeline/print renumbered 05/06, hero stats now 5 docs · 46pp. Skipped `reward-engineering.pdf` (undesigned draft render of the same Paying-Agents essay — duplicate). Matt confirmed: print-dialog PDF flow stays, subdomain alias deferred ("push"). Learned + memorized: **gms-site auto-deploys on push to main** (Git-connected), unlike mattmartelli-site — a push there IS a prod deploy.
