"""GMS Blitz — Intake: lead webhook, Retell call events, queued 8am dialer, stuck-lead alert."""
import json, sys, os
sys.path.insert(0, os.path.expanduser("~/blitz-scratch"))
from wf_common import *

SUB = json.load(open(f"{HOME}/workflow_ids.json"))["brief_call"]
w = WF("GMS Blitz — Intake")

TZJS = "const NPA = %s;\nconst TEST = %s;\n" % (json.dumps(NPA, separators=(",", ":")), json.dumps(TEST_NUMBERS))
HOURS_JS = """
const localHour = tz => Number(new Intl.DateTimeFormat('en-US', {timeZone: tz, hour: 'numeric', hourCycle: 'h23'}).format(new Date()));
const inHours = (phone, tz) => TEST.includes(phone) || (localHour(tz) >= 8 && localHour(tz) < 21);
"""

def run_sub(name, pos):
    return w.add(name, "n8n-nodes-base.executeWorkflow", 1.2, {
        "workflowId": {"__rl": True, "mode": "id", "value": SUB}, "mode": "each",
        "options": {"waitForSubWorkflow": False}}, pos)

# ================= A. Lead in =================
hook = w.add("Lead In (POST /webhook/gms-blitz)", "n8n-nodes-base.webhook", 2.1,
             {"httpMethod": "POST", "path": "gms-blitz", "responseMode": "responseNode", "options": {}}, [0, 300],
             webhookId="6b1b7b7e-6a52-4f0e-9d8f-3c1a2b5e9a01")

norm = w.code("Normalize & Validate", TZJS + HOURS_JS + r"""
const raw = $input.first().json;
const b = raw.body && typeof raw.body === 'object' ? raw.body : raw;
if (b.probe === true || b.probe === 'true') return [{ json: { probe: true } }];
const clean = (s, n = 300) => (s == null ? '' : String(s)).trim().slice(0, n);
const digits = clean(b.phone).replace(/\D/g, '');
let phone = '';
if (digits.length === 10) phone = '+1' + digits;
else if (digits.length === 11 && digits[0] === '1') phone = '+' + digits;
let site = clean(b.website).replace(/\s+/g, '');
if (site && !/^https?:\/\//i.test(site)) site = 'https://' + site;
let host = '';
const hm = site.match(/^https?:\/\/([^\/?#:]+)/i);
if (hm) host = hm[1].replace(/^www\./i, '').toLowerCase();
const email = clean(b.email, 200).toLowerCase();
const consent = b.consent === true || ['true', 'on', 'yes', '1'].includes(String(b.consent).toLowerCase());
const errors = [];
if (!phone) errors.push('phone');
if (!host || !host.includes('.')) errors.push('website');
if (!consent) errors.push('consent');
if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.push('email');
const SOURCES = ['try', 'meta', 'linkedin', 'chatgpt', 'salesnav', 'test'];
const source = SOURCES.includes(clean(b.source)) ? clean(b.source) : 'unknown';
const tz = NPA[phone.slice(2, 5)] || 'America/New_York';
return [{ json: {
  probe: false, valid: errors.length === 0, errors,
  lead_id: 'bl_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
  source, first_name: clean(b.first_name, 60), last_name: clean(b.last_name, 60), email, phone,
  company_name: clean(b.company_name, 120), website: site, host, consent,
  consent_text: clean(b.consent_text, 600), sn_key: clean(b.k || b.sn_key, 40),
  tz, in_hours: phone ? inHours(phone, tz) : false, received_at: new Date().toISOString(),
} }];
""", [220, 300])

probe_if = w.iff("Probe?", "={{ $json.probe }}", [440, 300])
probe_ok = w.respond("Respond — Probe OK", [660, 120], '={{ { "ok": true, "probe": true } }}')
valid_if = w.iff("Valid?", "={{ $json.valid }}", [660, 400])
bad = w.respond("Respond — 400 Invalid", [880, 560], '={{ { "ok": false, "error": "invalid", "fields": $json.errors } }}', 400)

dnc = w.http("DNC Lookup", [880, 300], "GET", rows_url("blitz_dnc"), query={"filter": filt("phone", "$json.phone")})
recent = w.http("Recent Leads Lookup", [1100, 300], "GET", rows_url("blitz_leads"),
                query={"filter": filt("phone", "$('Normalize & Validate').item.json.phone")})
decide = w.code("Decide State", r"""
const L = $('Normalize & Validate').first().json;
const d = $('DNC Lookup').first().json, r = $('Recent Leads Lookup').first().json;
const dncRows = d.body && Array.isArray(d.body.data) ? d.body.data : null;
const prior = r.body && Array.isArray(r.body.data) ? r.body.data : [];
const recent = prior.filter(x => x.received_at && Date.now() - new Date(x.received_at).getTime() < 10 * 60 * 1000
  && !['rate_limited', 'dnc', 'invalid'].includes(x.status));
let state = 'calling';
if (dncRows === null) state = 'hold_dnc_check_failed';
else if (dncRows.length) state = 'dnc';
else if (recent.length) state = 'rate_limited';
else if (!L.in_hours) state = 'after_hours';
return [{ json: { ...L, state } }];
""", [1320, 300])

insert = w.http("Store Lead", [1540, 300], "POST", rows_url("blitz_leads"), full=False, never_error=False,
                on_error="continueErrorOutput",
                body="={{ JSON.stringify({returnType: 'all', data: [{lead_id: $json.lead_id, source: $json.source, first_name: $json.first_name, last_name: $json.last_name, email: $json.email, phone: $json.phone, company_name: $json.company_name, website: $json.website, consent: $json.consent, consent_text: $json.consent_text, sn_key: $json.sn_key, tz: $json.tz, status: $json.state, received_at: $json.received_at, alerted: false}]}) }}")
store_fail = w.respond("Respond — 500 Not Stored", [1760, 520], '={{ { "ok": false, "error": "store_failed" } }}', 500)
stored = w.code("Lead Stored", r"""
const L = $('Decide State').first().json;
const row = $input.first().json;
if (!row || !row.id) throw new Error('Store Lead returned no row id');
return [{ json: { ...L, row_id: row.id } }];
""", [1760, 300], onError="continueErrorOutput")
ok = w.respond("Respond — 200 Stored", [1980, 300], '={{ { "ok": true, "lead_id": $json.lead_id, "state": $json.state } }}')

is_calling = w.iff("State = calling?", "={{ $json.state === 'calling' }}", [2200, 300])
go = run_sub("Brief & Call", [2420, 200])
is_after = w.iff("After hours + email?", "={{ $json.state === 'after_hours' && !!$json.email }}", [2420, 420])
after_mail = w.email("Email — After Hours", [2640, 400], "={{ $json.email }}",
                     "Christina calls you at 8am (or talk to her now)",
                     "=<div style=\"font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:540px;font-size:16px;line-height:1.6\"><p>Hi {{ $json.first_name || 'there' }},</p><p>It's after hours your time, so Christina will call you at 8am, trained on {{ $json.host }}.</p><p>Can't wait? Talk to her right now in your browser: <a href=\"%s\">%s</a> (the browser version is our general roofing demo).</p><p>Matt Martelli<br>Growth Mindset AI</p></div>" % (BROWSER_LINK, BROWSER_LINK.replace("https://", "")))

w.chain(hook, norm, probe_if)
w.link(probe_if, probe_ok, 0)
w.link(probe_if, valid_if, 1)
w.link(valid_if, dnc, 0)
w.link(valid_if, bad, 1)
w.chain(dnc, recent, decide, insert)
w.link(insert, stored, 0)
w.link(insert, store_fail, 1)
w.link(stored, ok, 0)
w.link(stored, store_fail, 1)
w.link(ok, is_calling)
w.link(is_calling, go, 0)
w.link(is_calling, is_after, 1)
w.link(is_after, after_mail, 0)
ah_fail = w.http("Note After-Hours Email Failure", [2860, 480], "PATCH", rows_url("blitz_leads") + "/update",
                 body="={{ JSON.stringify({filter:{type:'and',filters:[{columnName:'id',condition:'eq',value:$('Lead Stored').item.json.row_id}]}, data:{error: 'after-hours email failed: ' + String($json.error && ($json.error.message || $json.error) || 'unknown').slice(0, 300)}}) }}")
w.link(after_mail, ah_fail, 1)

# ================= B. Retell call events =================
rhook = w.add("Retell Events (POST /webhook/gms-blitz-retell)", "n8n-nodes-base.webhook", 2.1,
              {"httpMethod": "POST", "path": "gms-blitz-retell", "responseMode": "onReceived", "options": {}}, [0, 1000],
              webhookId="6b1b7b7e-6a52-4f0e-9d8f-3c1a2b5e9a02")
parse = w.code("Parse Call Event", ("const AGENT = '%s';\n" % AGENT) + r"""
const b = $input.first().json.body || {};
const c = b.call || {};
if (b.event !== 'call_analyzed' || c.agent_id !== AGENT || !c.metadata || !c.metadata.row_id) return [];
const a = c.call_analysis || {}, x = a.custom_analysis_data || {};
const dur = c.duration_ms ? Math.round(c.duration_ms / 1000)
  : (c.end_timestamp && c.start_timestamp ? Math.round((c.end_timestamp - c.start_timestamp) / 1000) : 0);
const disc = c.disconnection_reason || '';
const missedReasons = ['dial_no_answer', 'dial_busy', 'dial_failed', 'voicemail_reached', 'user_declined', 'invalid_destination', 'machine_detected'];
const connected = !missedReasons.includes(disc) && !a.in_voicemail && dur >= 15;
return [{ json: {
  row_id: c.metadata.row_id, call_id: c.call_id, disconnection_reason: disc, duration_s: dur,
  connected, outcome: connected ? 'completed' : 'missed',
  summary: String(a.call_summary || '').slice(0, 2000), transcript: String(c.transcript || '').slice(0, 20000),
  recording_url: c.recording_url || '', interest_level: x.interest_level || 'unknown',
  wants_meeting: x.wants_meeting === true, requested_dnc: x.requested_do_not_call === true,
  did_roleplay: x.did_roleplay === true, notable_quote: String(x.notable_quote || '').slice(0, 500),
} }];
""", [220, 1000])
getrow = w.http("Get Lead Row", [440, 1000], "GET", rows_url("blitz_leads"), query={"filter": filt("id", "$json.row_id")})
merge = w.code("Merge Lead + Call", r"""
const E = $('Parse Call Event').first().json;
const r = $input.first().json;
const L = (r.body && r.body.data && r.body.data[0]) || {};
const email = L.email || '';
return [{ json: { ...L, ...E,
  add_dnc: E.requested_dnc,
  alert_matt: E.connected,
  send_after_call: E.connected && !!email && !E.requested_dnc,
  send_missed: !E.connected && !!email && !E.requested_dnc && L.status !== 'missed',
} }];
""", [660, 1000])
upd = w.http("Save Call Result", [880, 1000], "PATCH", rows_url("blitz_leads") + "/update",
             body="={{ JSON.stringify({filter:{type:'and',filters:[{columnName:'id',condition:'eq',value:$json.row_id}]}, data:{status: $json.requested_dnc ? 'dnc' : $json.outcome, call_status: 'ended', disconnection_reason: $json.disconnection_reason, duration_s: $json.duration_s, summary: $json.summary, transcript: $json.transcript, interest_level: $json.interest_level, wants_meeting: $json.wants_meeting, requested_dnc: $json.requested_dnc, notable_quote: $json.notable_quote, ended_at: new Date().toISOString()}}) }}")
if_dnc = w.iff("Add to DNC?", "={{ $('Merge Lead + Call').item.json.add_dnc }}", [1100, 820])
add_dnc = w.http("Insert DNC", [1320, 820], "POST", rows_url("blitz_dnc"),
                 body="={{ JSON.stringify({data:[{phone: $('Merge Lead + Call').item.json.phone, reason: 'asked on call', source_call_id: $('Merge Lead + Call').item.json.call_id, added_at: new Date().toISOString()}]}) }}")
if_hot = w.iff("Alert Matt?", "={{ $('Merge Lead + Call').item.json.alert_matt }}", [1100, 960])
M = "$('Merge Lead + Call').item.json"
hot = w.email("Email Matt — Demo Call Done", [1320, 960], MATT,
              "=BLITZ call: {{ %s.company_name }} ({{ %s.first_name }}) — {{ %s.interest_level }}{{ %s.wants_meeting ? ' — WANTS MEETING' : '' }}" % (M, M, M, M),
              ("=<div style=\"font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:600px;font-size:15px;line-height:1.5\">"
               "<h2 style=\"margin:0 0 6px\">{{ M.company_name }}</h2>"
               "<p style=\"margin:0 0 14px;color:#555\">{{ M.first_name }} {{ M.last_name }} · <a href=\"tel:{{ M.phone }}\">{{ M.phone }}</a> · {{ M.email || 'no email' }} · {{ M.website }} · source: {{ M.source }}</p>"
               "<p><b>Interest:</b> {{ M.interest_level }} · <b>Wants meeting:</b> {{ M.wants_meeting ? 'YES' : 'no' }} · <b>Role-played:</b> {{ M.did_roleplay ? 'yes' : 'no' }} · <b>Length:</b> {{ M.duration_s }}s</p>"
               "<p><b>Quote:</b> {{ M.notable_quote || '—' }}</p><p><b>Summary:</b> {{ M.summary }}</p>"
               "<p><a href=\"{{ M.recording_url }}\">Recording</a></p>"
               "<details><summary>Transcript</summary><pre style=\"white-space:pre-wrap;font-size:13px\">{{ M.transcript }}</pre></details></div>").replace("M.", M + "."))
if_after = w.iff("Send After-Call Email?", "={{ $('Merge Lead + Call').item.json.send_after_call }}", [1100, 1100])
after_call = w.email("Email Prospect — After Call", [1320, 1100], "={{ %s.email }}" % M, "Want her on your real number?",
                     ("=<div style=\"font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:540px;font-size:16px;line-height:1.6\">"
                      "<p>Hi {{ M.first_name || 'there' }},</p><p>Thanks for taking Christina's call. Everything she knew came from {{ M.website }} in about 30 seconds.</p>"
                      "<p>Grab 15 minutes and we'll map her to your real phone line: <a href=\"%s\">%s</a></p><p>Matt<br>Growth Mindset AI</p></div>" % (BOOKING_LINK, BOOKING_LINK.replace("https://", ""))).replace("M.", M + "."))
if_missed = w.iff("Send Missed Email?", "={{ $('Merge Lead + Call').item.json.send_missed }}", [1100, 1240])
missed = w.email("Email Prospect — Missed", [1320, 1240], "={{ %s.email }}" % M, "Christina tried you",
                 ("=<div style=\"font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:540px;font-size:16px;line-height:1.6\">"
                  "<p>Hi {{ M.first_name || 'there' }},</p><p>Your AI receptionist called but missed you. Talk to her anytime in your browser: <a href=\"%s\">%s</a></p>"
                  "<p>Or reply with a good time and she'll call back.</p><p>Matt<br>Growth Mindset AI</p></div>" % (BROWSER_LINK, BROWSER_LINK.replace("https://", ""))).replace("M.", M + "."))

w.chain(rhook, parse, getrow, merge, upd)
for a, b in [(if_dnc, add_dnc), (if_hot, hot), (if_after, after_call), (if_missed, missed)]:
    w.link(upd, a)
    w.link(a, b, 0)

# ================= C. Every 5 min: dial the 8am queue + stuck-lead alert =================
tick = w.add("Every 5 Minutes", "n8n-nodes-base.scheduleTrigger", 1.2,
             {"rule": {"interval": [{"field": "minutes", "minutesInterval": 5}]}}, [0, 1600])
queued = w.http("Get Queued Leads", [220, 1500], "GET", rows_url("blitz_leads"), query={"filter": filt("status", "'after_hours'")})
due = w.code("Due Now (8am–9pm local)", TZJS + HOURS_JS + r"""
const r = $input.first().json;
const rows = (r.body && r.body.data) || [];
return rows.filter(x => x.phone && inHours(x.phone, x.tz || 'America/New_York'))
  .slice(0, 20).map(x => ({ json: { ...x, row_id: x.id, host: ((String(x.website).match(/^https?:\/\/([^\/?#:]+)/i) || [])[1] || x.website).replace(/^www\./i, '') } }));
""", [440, 1500])
claim = w.http("Mark Dialing", [660, 1500], "PATCH", rows_url("blitz_leads") + "/update",
               body="={{ JSON.stringify({filter:{type:'and',filters:[{columnName:'id',condition:'eq',value:$json.row_id}]}, data:{status:'calling'}}) }}")
restore = w.code("Restore Lead", "return $('Due Now (8am–9pm local)').all().map(i => ({ json: i.json }));", [880, 1500])
go2 = run_sub("Brief & Call (queued)", [1100, 1500])

calling = w.http("Get Leads Still 'calling'", [220, 1700], "GET", rows_url("blitz_leads"), query={"filter": filt("status", "'calling'")})
stuck = w.code("Stuck > 5 min?", r"""
const r = $input.first().json;
const rows = ((r.body && r.body.data) || []).filter(x => !x.alerted && Date.now() - new Date(x.updatedAt || x.received_at).getTime() > 5 * 60 * 1000);
if (!rows.length) return [];
return [{ json: { ids: rows.map(x => x.id), list: rows.map(x => `${x.first_name} · ${x.company_name || x.website} · ${x.phone} · ${x.source} · since ${x.updatedAt}`).join('<br>') } }];
""", [440, 1700])
stuck_mail = w.email("Alert Matt — Leads Stuck", [660, 1700], MATT, "=BLITZ: {{ $json.ids.length }} lead(s) not called after 5 minutes",
                     "=<p>These leads were accepted but no call started. Call them by hand or check the GMS Blitz — Brief &amp; Call executions.</p><p>{{ $json.list }}</p>")
mark_alerted = w.code("Split Ids", "return $('Stuck > 5 min?').first().json.ids.map(id => ({ json: { row_id: id } }));", [880, 1700])
set_alerted = w.http("Mark Alerted", [1100, 1700], "PATCH", rows_url("blitz_leads") + "/update",
                     body="={{ JSON.stringify({filter:{type:'and',filters:[{columnName:'id',condition:'eq',value:$json.row_id}]}, data:{alerted:true}}) }}")

w.link(tick, queued)
w.link(tick, calling)
w.chain(queued, due, claim, restore, go2)
w.chain(calling, stuck, stuck_mail, mark_alerted, set_alerted)

# ================= Email failures are recorded on the lead row (watchdog counts them) =================
for n in w.nodes:
    if n["name"] in (after_mail, hot, after_call, missed):
        n["onError"] = "continueErrorOutput"
em_fail = w.http("Note Email Failure", [1540, 1100], "PATCH", rows_url("blitz_leads") + "/update",
                 body="={{ JSON.stringify({filter:{type:'and',filters:[{columnName:'id',condition:'eq',value:$('Merge Lead + Call').item.json.row_id}]}, data:{error: 'email failed: ' + String($json.error && ($json.error.message || $json.error) || 'unknown').slice(0, 300)}}) }}")
for e in (hot, after_call, missed):
    w.link(e, em_fail, 1)

# ================= D. Sales Nav prefill (GET /webhook/gms-blitz-prefill?k=) =================
phook = w.add("Prefill (GET /webhook/gms-blitz-prefill)", "n8n-nodes-base.webhook", 2.1,
              {"httpMethod": "GET", "path": "gms-blitz-prefill", "responseMode": "responseNode", "options": {}}, [0, 2000],
              webhookId="6b1b7b7e-6a52-4f0e-9d8f-3c1a2b5e9a03")
plook = w.http("Brief by Key", [220, 2000], "GET", rows_url("blitz_briefs"),
               query={"filter": filt("key", "String(($json.query || {}).k || '__none__').slice(0, 40)")})
pmap = w.code("Prefill Fields", r"""
const r = $input.first().json;
const b = (r.body && r.body.data && r.body.data[0]) || null;
return [{ json: b ? { ok: true, first_name: b.first_name || '', company_name: b.company_name || '', website: b.website || '' } : { ok: false } }];
""", [440, 2000])
presp = w.respond("Respond — Prefill", [660, 2000], "={{ $json }}")
w.chain(phook, plook, pmap, presp)

if __name__ == "__main__":
    print(upsert_workflow(w, "intake"))
