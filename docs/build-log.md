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
