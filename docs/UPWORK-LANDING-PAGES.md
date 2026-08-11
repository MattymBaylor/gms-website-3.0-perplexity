# Upwork Landing Pages — Build Brief & Continuation Prompt

**Repo:** `MattymBaylor/gms-website-3.0-perplexity` (Next.js App Router + TypeScript, Vercel)
**Lives at:** `docs/UPWORK-LANDING-PAGES.md`
**Written:** 2026-08-11 · Author: prior Claude session · **Read this whole file before writing code.**

---

## 1. Why these pages exist

Matt bids on Upwork. Upwork proposals are plain text — no embeds, no preview cards. The only
way to show a prospect the live voice agent is to paste a URL they click out to. These pages
are what sits at the other end of that URL.

They are **not** marketing pages. They convert a skeptical buyer who is mid-way through
reading thirty proposals. They have one job: get the demo started in under ten seconds, then
get the visitor back to Upwork Messages.

## 2. ⚠️ COMPLIANCE — read twice, this is an account-loss risk

Upwork's rules on **circumvention** are explicit and the penalty is loss of talent badges or
permanent account closure. Verified from Upwork's help centre on 2026-08-11:

> "Sharing forms of outside communication (or any other form of contact outside Upwork)
> before a contract starts is circumvention, which is against our Terms of Service."

Also explicitly prohibited pre-contract: off-platform payment, moving to Telegram/WhatsApp,
and discussing goals/deliverables/costs/deadlines anywhere but Upwork.

**What is genuinely unresolved:** Upwork's documentation does not address linking to your own
portfolio or demo site pre-contract. It is neither permitted nor prohibited in writing. Matt
has been advised to ask Upwork support directly for a definitive answer on his account. **If
that answer has come back, it overrides everything in this section — ask Matt before building.**
(Checked 2026-08-11: no answer yet. Building proceeded under the caution rules below.)

### Hard rules for every page in this set

| Never put on these pages | Why |
|---|---|
| Contact form of any kind | Reads as pre-contract solicitation |
| Email address | Named contact info |
| Phone number | Named contact info — **check the global footer, this is where it hides** |
| Chat widget / Intercom / Crisp | Outside communication channel |
| Calendly or any booking link | Both a TOS risk and against Matt's own standing rule |
| Social icons linking to DMs | Outside communication channel |
| Site nav that reaches any of the above | Indirect path to the same problem |

**The only CTA:** *"Message me back on Upwork."* Plain text. Not a link.

Do not import the site's global `<Header>` or `<Footer>` into these routes. Give the route
segment its own minimal `layout.tsx`. If the shared layout is inherited from a parent, use a
route group to escape it.

## 3. Hidden from search

These must not be indexed, must not appear in nav, must not appear in the sitemap.

```tsx
// in each page.tsx
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true,
            googleBot: { index: false, follow: false } },
};
```

Also keep these routes out of `app/sitemap.ts` and never link to them from the public site.
**Robots note — the build deviates from this brief's original instruction here, deliberately:**
no `Disallow: /upwork/` line was added to `app/robots.ts`, because a Disallow line *advertises*
the path to anyone who reads robots.txt. The repo's own `/vault` convention is used instead:
`X-Robots-Tag: noindex, nofollow` headers in `next.config.mjs`, plus the per-page metadata
above, plus absence from sitemap and nav. Same intent — hidden — without publishing the URL.

## 4. Verified technical facts — don't re-derive these

**The existing demo is a static file, not a Next page.** Confirmed by fetching it live:
`https://growthmindset.ai/demo-appointment` returns 143,607 bytes,
`md5 003813816ff0e04a971867c8ece67629`, with **no `__NEXT_DATA__` and no `/_next/static`
references**. It is served straight out of `public/` with `x-matched-path: /demo-appointment`.

**Two demo agents exist:**

| Agent | URL | Use for |
|---|---|---|
| Christina — appointment confirmation, home services | `/demo-appointment` | Voice, receptionist, call-centre, home-services posts |
| June — open conversational, no script, no sales | `/demo-conversation` | Conversational AI, chatbot, persona, dialog-design posts |

**`/demo-conversation` correction (2026-08-11 build):** this route did NOT exist when the
build started — not on `origin/main`, not in git history, 404 live. It was created during the
build by porting June **byte-identical** from `gms-voice-demo` `origin/main:talk.html` into
`public/demo-conversation/index.html`, plus a rewrite in `next.config.mjs`. Section 9's
"talk.html is superseded" was wrong as of 2026-08-11: `talk.html` is June's only and current
build (verified unchanged upstream while 19 Christina-only commits landed). Keep the copy
byte-identical to upstream `talk.html` when resyncing — no skin blocks on this one.

**`?embed=1` strips the demo's own header, hero and footer**, leaving just the agent card —
page height drops 2012px → 751px. Being inside an iframe auto-triggers the same mode, so the
param is belt-and-braces. **Always use it on these pages.**

**`allow="microphone"` on the iframe is mandatory.** Without it the browser silently denies
mic access inside the frame and the demo dies with no visible error. This is the single most
common way to ship these broken. The shared `<VoiceDemo />` component exists partly so this
attribute cannot be forgotten.

**Token origin allowlist.** The demos fetch a short-lived token from
`https://n8n.growthmindsetai.tech/webhook/gms-demo-token`, which enforces an origin allowlist:
`growthmindset.ai`, `www.growthmindset.ai`, `mattymbaylor.github.io`. Because these pages are
on growthmindset.ai, **no backend change is needed.** If the demo is ever served from another
host, add it to `ALLOWED_ORIGINS` in n8n workflow `zAX2ZFQ2njcnwrAO`, node "Token gate", first
— otherwise every visitor gets "Sorry, I couldn't get a line out." (This also means the live
call does NOT connect on Vercel *preview* deployments — preview origins aren't allowlisted.
Layout and copy verify on previews; the call itself verifies on production origin.)

Both demos cap at 120 seconds with an in-character wrap-up, so a page can honestly say
"about two minutes."

## 5. The look — these are the real tokens

Lifted verbatim from the shipped demo so the wrapper page and the embedded card read as one
surface. Dark, high-contrast, blue-to-mint accent.

```css
--bg:      #080b14;   /* page background */
--panel:   #0e1424;
--panel-2: #121a2e;
--line:    #1e2a44;   /* borders */
--ink:     #eef2fb;   /* primary text */
--muted:   #8d9bb8;   /* secondary text */
--accent:  #3d7bfd;   /* primary blue — buttons, focus rings */
--accent-2:#5ce1b9;   /* mint — "live" states, speaking indicator */
--danger:  #ff6b6b;
--warn:    #ffc46b;
--radius:  14px;
--font: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, Roboto, Helvetica, Arial, sans-serif;
```

Signature treatments worth reproducing: soft radial gradient washes behind the hero
(`rgba(61,123,253,.16)` top-left, `rgba(92,225,185,.10)` top-right), a 1px `--line` border with
a subtle inset white top-highlight on cards, and a pill "live" badge in `--accent-2` with a
slow pulsing dot. Content column maxes at ~600px for the demo card, ~720px for copy.

## 6. Page structure

```
app/(upwork)/upwork/[variant]/page.tsx   ← route group; root layout is bare, no escape needed
app/(upwork)/layout.tsx                  ← minimal: no header, no footer, no nav
app/(upwork)/upwork.css                  ← the §5 tokens, scoped under .uw-root
app/(upwork)/upwork/beacon.tsx           ← first-party ?p= click logging
components/VoiceDemo.tsx                 ← shared iframe wrapper (allow="microphone")
app/api/t/route.ts                       ← beacon relay → n8n, console.log backup
```

Variants to support, driven by the proposal being sent:

| Path | Agent | Headline angle | Status |
|---|---|---|---|
| `/upwork/voice` | Christina | Generic voice / receptionist | **live in v1** |
| `/upwork/conversational` | June | Range, persona, dialog design | **live in v1** |
| `/upwork/hvac`, `/roofing`, `/plumbing` | Christina | Named trade in the H1 | config entry away |
| `/upwork/automation` | either | n8n / workflow posts — lead with the 100+ count | config entry away |

New variants are entries in the `VARIANTS` map in `app/(upwork)/upwork/[variant]/page.tsx` —
copy, agent choice and proof selection only. `dynamicParams = false` 404s everything unlisted.

Above the fold: one-line headline naming *their* problem, the live demo, and a three-item
"what to try" list — interrupt her, ask her something she can't know, tell her to cancel.
That third one matters most: watching her decline to fabricate an answer is what closes a
buyer, because hallucination is the fear they arrived with.

Below: proof, then the Upwork CTA. Nothing else.

## 7. Proof points — the only claims allowed on these pages

Do not invent metrics, timelines, client names, or capabilities. This list is exhaustive:

- **100+ production n8n workflows** shipped
- **Dozens of voice and agentic systems** shipped
- Call-centre confirmation voice AI: cancellation rate **38% → 27%**, 60 reps, ~$22K in sales
- SMS + self-scheduling behind **$750K/month** in booked business
- **35% engagement / 25% retention** lift via AI lifecycle workflows
- 25+ years in marketing technology, CRM architecture and revenue operations
- Stack: Vapi, Retell AI, ElevenLabs, Twilio, **Five9 (yes) / Genesys (never claim)**, n8n,
  LangChain, LangGraph, Claude, OpenAI, HubSpot, Salesforce, Supabase, Python/FastAPI

Client names: "Home Genius Exteriors" and "Expo Home Improvement" appear in Matt's Upwork
employment history and are his to cite. The demo itself uses a **fictional** company, "Quality
Home Services," and the page must keep that disclaimer visible.

## 8. Measurement

Per-proposal tracking param — `?p=<slug>` — logged first-party. The page's `<Beacon />` posts
once to same-origin `/api/t`, which relays server-side to the n8n webhook
`https://n8n.growthmindsetai.tech/webhook/gms-upwork-click` (header `x-gms-beacon: uw-lp-1`)
and mirrors to `console.log` (Vercel runtime logs) as backup. No third-party pixel on a page
Upwork traffic lands on. Slug convention: one slug per proposal, e.g. `?p=2026-08-12-hvac-tx`.

## 9. Do not

- Do not add these to the sitemap, nav, or any internal link from the public site.
- Do not put a form on them. Re-read section 2 if tempted.
- Do not copy the demo HTML onto another domain without adding that origin to the n8n allowlist.
- Do not use `classic.html` from the demo repo — superseded. (`talk.html` IS current June —
  see the §4 correction.)
- Do not remove `allow="microphone"`.
- Do not claim Genesys experience anywhere.
- Do not touch `components/sections/AgentFrame.tsx` — it is live on `/demo` and the home page.
  The Upwork pages use `components/VoiceDemo.tsx`.

## 10. Decisions made 2026-08-11 (v1 build)

Asked and answered by Matt:

1. **Upwork support ruling:** no answer yet. Built under the caution rules; the ruling gates
   *sending* the links, not the pages existing.
2. **Variants:** `/upwork/voice` + `/upwork/conversational` first. Others are config entries.
3. **Base:** fresh from the §5 demo tokens (not stripped-down public pages) — zero chance a
   footer phone number or CTAForm survives. VoiceDemo reuses AgentFrame's proven sizing logic.

4. **v1.1 (same day):** Matt reviewed v1 and asked for talk.html's landing grammar instead of
   the single-column layout — brand header + live badge, two-column grid (hero, numbered
   steps, skill-chip stacks left; haloed demo card + Upwork CTA panel right), plain two-line
   footer. Rebuilt to mirror it, class-for-class where possible (`uw-` prefixed, scoped under
   `.uw-root`). Compliance rules unchanged: still zero links and zero contact affordances —
   the header brand and footer are plain text, unlike talk.html there is nothing clickable.
