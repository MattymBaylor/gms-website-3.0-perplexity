"""GMS Blitz — Watchdog: daily 7:05am ET. Emails Matt ONLY on failure (silence = healthy).
If the email itself fails (e.g. Gmail credential broken), falls back to an SMS to Matt."""
import json, sys, os
sys.path.insert(0, os.path.expanduser("~/blitz-scratch"))
from wf_common import *

w = WF("GMS Blitz — Watchdog")
tick = w.add("Daily 7:05am ET", "n8n-nodes-base.scheduleTrigger", 1.2,
             {"rule": {"interval": [{"field": "cronExpression", "expression": "5 7 * * *"}]}}, [0, 300])
p1 = w.http("Probe n8n Intake", [220, 300], "POST", "https://n8n.growthmindsetai.tech/webhook/gms-blitz", cred=None,
            body='={{ JSON.stringify({probe: true}) }}', on_error="continueRegularOutput")
p2 = w.http("Probe growthmindset.ai/api/blitz", [440, 300], "POST", "https://growthmindset.ai/api/blitz", cred=None,
            body='={{ JSON.stringify({probe: true}) }}', on_error="continueRegularOutput")
p3 = w.http("Probe Retell", [660, 300], "GET", "https://api.retellai.com/v2/list-phone-numbers", cred="retell",
            on_error="continueRegularOutput")
p4 = w.http("Leads (all)", [880, 300], "GET", rows_url("blitz_leads"), query={"limit": "250", "sortBy": "id:desc"},
            on_error="continueRegularOutput")
judge = w.code("Anything Wrong?", ("const FROM_NUMBER = '%s';\n" % FROM_NUMBER) + r"""
const g = n => { try { return $(n).first().json; } catch (e) { return {}; } };
const a = g('Probe n8n Intake'), b = g('Probe growthmindset.ai/api/blitz'), c = g('Probe Retell'), d = g('Leads (all)');
const problems = [];
if (!(a.statusCode === 200 && a.body && a.body.ok)) problems.push(`n8n intake webhook probe failed (HTTP ${a.statusCode || 'none'})`);
if (b.statusCode !== 200) problems.push(`growthmindset.ai/api/blitz probe failed (HTTP ${b.statusCode || 'none'})` + (b.statusCode === 404 ? ' — /try PR not merged/deployed yet?' : ''));
const nums = (c.body && c.body.items) || [];
if (c.statusCode !== 200) problems.push(`Retell API check failed (HTTP ${c.statusCode || 'none'}) — key or billing`);
else if (!nums.some(n => n.phone_number === FROM_NUMBER)) problems.push(`Retell no longer lists the caller number ${FROM_NUMBER}`);
const rows = (d.body && d.body.data) || [];
if (d.statusCode !== 200) problems.push('Could not read the blitz_leads data table');
const day = rows.filter(r => Date.now() - new Date(r.createdAt).getTime() < 24 * 3600 * 1000);
const failed = day.filter(r => r.status === 'call_failed');
const held = day.filter(r => String(r.status).startsWith('hold'));
const mailErr = day.filter(r => String(r.error || '').includes('email failed'));
const queued = rows.filter(r => r.status === 'after_hours' && Date.now() - new Date(r.createdAt).getTime() > 14 * 3600 * 1000);
if (failed.length) problems.push(`${failed.length} call(s) failed to start in the last 24h: ` + failed.map(r => `${r.company_name || r.website} ${r.phone}: ${r.error}`).join('; '));
if (held.length) problems.push(`${held.length} lead(s) held (DNC check failed) in the last 24h — call by hand: ` + held.map(r => `${r.first_name} ${r.phone}`).join(', '));
if (mailErr.length) problems.push(`${mailErr.length} follow-up email(s) failed in the last 24h: ${mailErr[0].error}`);
if (queued.length) problems.push(`${queued.length} after-hours lead(s) queued over 14h and never dialed`);
const stats = `Last 24h: ${day.length} leads, ${day.filter(r => r.status === 'completed').length} connected calls, ${day.filter(r => r.status === 'missed').length} missed.`;
if (!problems.length) return [];
return [{ json: { problems, html: '<p><b>GMS Blitz watchdog found problems:</b></p><ul>' + problems.map(p => `<li>${p}</li>`).join('') + `</ul><p>${stats}</p>`,
  sms: ('GMS Blitz watchdog: ' + problems.join(' | ')).slice(0, 600) } }];
""", [1100, 300])
mail = w.email("Email Matt — Watchdog", [1320, 300], MATT, "=BLITZ WATCHDOG: {{ $json.problems.length }} problem(s)",
               "={{ $json.html }}", on_error="continueErrorOutput")
sms = w.add("SMS Matt (email failed)", "n8n-nodes-base.twilio", 1, {
    "from": FROM_NUMBER, "to": "+12146088290",
    "message": "={{ $('Anything Wrong?').item.json.sms }} (Email alert also failed: check n8n Gmail credentials.)",
    "options": {}}, [1540, 420], {"twilioApi": {"id": "UhmUDokbtVq06PDe", "name": "Twilio - Growth Mindset"}},
    onError="continueRegularOutput")
w.chain(tick, p1, p2, p3, p4, judge, mail)
w.link(mail, sms, 1)

if __name__ == "__main__":
    wid = upsert_workflow(w, "watchdog")
    from n8n import api
    print("activate", api("POST", f"/workflows/{wid}/activate")[0])
