# GMS Demo Blitz — backend

Tap ad → form → Christina (AI receptionist trained on the prospect's website) calls them within ~60 s.
Plan doc: https://claude.ai/artifact/PYnmhZ9pTFNcSrjKQGYS8P

## What runs where

| Piece | Where | ID |
|---|---|---|
| Christina (outbound demo agent) | Retell | `agent_657a3eb34f8a23fe37931ab3df` (LLM `llm_ed8de5d0deeeeb60999173141607`), voice 11labs-Cimo, 2-min cap |
| Caller number | Retell / Twilio BYOC | +1 239-363-5760 (used via `override_agent_id`; the number's own agent is untouched) |
| GMS Blitz — Intake | n8n | `FE3ad5lfP1CqXxqb` — lead webhook, Retell events, 5-min queue dialer + stuck alert, Sales Nav prefill |
| GMS Blitz — Brief & Call | n8n | `ZPuleElpUYcLevhq` — DNC re-check → scrape (r.jina.ai, direct fallback) → gpt-4.1-mini brief → Retell call |
| GMS Blitz — Sales Nav Brief | n8n | `WyoL1MD16RQDIIJM` — token-protected; builds a brief + short key per prospect |
| GMS Blitz — Watchdog | n8n | `HqIU6KPKamwnNNHG` — daily 7:05am ET, emails only on failure, SMS fallback if email fails |
| Lead store | n8n Data Tables | `blitz_leads` g1lX4T87SuAaUziw · `blitz_dnc` b1Zvasl2OVxAzPNL · `blitz_briefs` PIc85OfoA7WjjIl5 |
| /try + /api/blitz | growthmindset.ai (PR #48, branch feat/blitz-try) | |

Why n8n Data Tables, not Supabase: the only reachable Supabase org is Rise Renovation's (client), and the old GMS
projects no longer resolve. The site's existing lead pipeline already logs to an n8n data table.

## Webhooks

- `POST /webhook/gms-blitz` — `{source, first_name, last_name?, email, phone, website, company_name?, k?, consent:true, consent_text}`.
  Returns 200 `{ok, lead_id, state}` only after the row is stored. States: `calling`, `after_hours` (queued for 8am local),
  `rate_limited` (same number within 10 min), `dnc`, `hold_dnc_check_failed`. 400 = invalid, 500 = not stored. `{probe:true}` → 200.
- `POST /webhook/gms-blitz-retell` — Retell `call_analyzed` events → saves transcript/summary/analysis, DNC, emails.
- `GET /webhook/gms-blitz-prefill?k=` — first name / company / website for a Sales Nav key.
- `POST /webhook/gms-blitz-brief` (header `X-Blitz-Token`) — one prospect → brief + key + link.

Meta and LinkedIn leads: point a Zapier "New Lead" zap (Facebook Lead Ads / LinkedIn Lead Gen Forms) at
`/webhook/gms-blitz` with source `meta` / `linkedin`, mapping first_name, email, phone, the website question, and
`consent: true` + the disclaimer text.

## Lead statuses

`calling` → `called` → `completed` | `missed` | `dnc`; `call_failed` (Matt emailed); `after_hours` (dialed by the 5-min
queue once it's 8am–9pm in the prospect's area-code time zone). Test numbers that skip the hours gate: Matt's cell and
the fictional 239-555-0100.

## Scripts (run on the Mac with `source ~/dev/ops-health-dashboard/.env.local` for N8N_API_KEY / RETELL_API_KEY)

- `create_christina.py` — create/update + publish Christina from `christina_prompt.md` (Retell versions are immutable once published; the script makes a new draft version, patches it, publishes).
- `wf_brief_call.py`, `wf_intake.py`, `wf_watchdog.py`, `wf_salesnav.py` — generate and upsert the n8n workflows (`wf_common.py` holds IDs and settings).
- `salesnav_batch.py prospects.csv` — Sales Nav CSV → `prospects_links.csv` with each personal link, connection note and InMail.
- `test_call.py +1XXXXXXXXXX` — Christina-only test call with a canned ABC Roofing brief.
- `show_leads.py [-v] [--execs]`, `show_exec.py <id>` — inspect leads / executions.
