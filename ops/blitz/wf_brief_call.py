"""GMS Blitz — Brief & Call (sub-workflow). Input item = lead (row_id, phone, first_name, company_name, website, host, sn_key, ...)."""
import json, sys, os
sys.path.insert(0, os.path.expanduser("~/blitz-scratch"))
from wf_common import *

w = WF("GMS Blitz — Brief & Call")
T = w.add("When Called by Intake", "n8n-nodes-base.executeWorkflowTrigger", 1.1, {"inputSource": "passthrough"}, [0, 300])

dnc = w.http("DNC Re-check", [220, 300], "GET", rows_url("blitz_dnc"),
             query={"filter": filt("phone", "$json.phone")})
brief = w.http("Prebuilt Brief Lookup", [440, 300], "GET", rows_url("blitz_briefs"),
               query={"filter": filt("key", "$('When Called by Intake').item.json.sn_key || '__none__'")})

route = w.code("Route", r"""
const L = $('When Called by Intake').first().json;
const d = $('DNC Re-check').first().json;
const dncRows = (d.body && Array.isArray(d.body.data)) ? d.body.data : null;
const b = $('Prebuilt Brief Lookup').first().json;
const pre = (b.body && Array.isArray(b.body.data) && b.body.data[0]) || null;
const out = { ...L, dnc_check_ok: dncRows !== null, dnc: !!(dncRows && dncRows.length) };
if (pre && pre.brief_ok) {
  Object.assign(out, { prebuilt: true, business_brief: pre.business_brief, services_short: pre.services_short,
    service_area: pre.service_area, brief_ok: true,
    company_name: L.company_name || pre.company_name, first_name: L.first_name || pre.first_name });
} else out.prebuilt = false;
// fail closed: if we could not read the DNC list, do not dial
out.stop = out.dnc || !out.dnc_check_ok;
return [{ json: out }];
""", [660, 300])

stop_if = w.iff("Stop? (DNC)", "={{ $json.stop }}", [880, 300])
mark_dnc = w.http("Mark Not Dialed", [1100, 120], "PATCH", rows_url("blitz_leads") + "/update",
                  body="={{ JSON.stringify({filter:{type:'and',filters:[{columnName:'id',condition:'eq',value:$json.row_id}]}, data:{status: $json.dnc ? 'dnc' : 'hold_dnc_check_failed', error: $json.dnc ? '' : 'DNC lookup failed; not dialed'}}) }}")
need_scrape = w.iff("Need Scrape?", "={{ !$json.prebuilt }}", [1100, 400])

jina = w.http("Scrape (Reader)", [1320, 500], "GET", "={{ 'https://r.jina.ai/' + $json.website }}", cred=None,
              headers={"X-Return-Format": "markdown", "X-Timeout": "20"}, text=True, timeout=30000,
              on_error="continueRegularOutput")
direct = w.http("Scrape (Direct)", [1540, 500], "GET", "={{ $('Route').item.json.website }}", cred=None,
                headers={"User-Agent": "Mozilla/5.0 (compatible; GMSBlitzBot/1.0)"}, text=True, timeout=15000,
                on_error="continueRegularOutput")

prep = w.code("Page Text", r"""
const L = $('Route').first().json;
const strip = h => String(h || '').replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ')
  .replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
let reader = '';
try { const r = $('Scrape (Reader)').first().json; if ((r.statusCode||0) < 300) reader = String(r.body || r.data || ''); } catch (e) {}
let direct = '';
try { const r = $('Scrape (Direct)').first().json; if ((r.statusCode||0) < 300) direct = strip(r.body || r.data || ''); } catch (e) {}
const text = (reader.length >= 400 ? reader : (reader + '\n' + direct)).slice(0, 14000);
return [{ json: { ...L, page_text: text, scrape_chars: text.length } }];
""", [1760, 500])

llm = w.http("Write Brief (LLM)", [1980, 500], "POST", "https://api.openai.com/v1/chat/completions", cred="openai",
             timeout=30000, on_error="continueRegularOutput",
             body=r"""={{ JSON.stringify({
  model: 'gpt-4.1-mini', temperature: 0.2, response_format: {type: 'json_object'},
  messages: [
    {role: 'system', content: 'You prepare a fact sheet for an AI receptionist that will answer phones for this company. Use ONLY facts stated in the page text. Never invent prices, licenses, warranties, financing terms, years in business, awards or reviews. Return JSON with keys: company_name (string, the business name as written on the site), services_short (string, max 12 words, comma list, lowercase, e.g. "roof replacements, leak repair and storm inspections"), service_area (string, max 8 words, cities/counties/region, or "" if not stated), business_brief (string, max 170 words, plain sentences: what they do, service area, hours, emergency service, and warranty/financing/reviews ONLY if stated; never write sentences about what is missing or not stated), facts_found (integer count of concrete facts you used).'},
    {role: 'user', content: 'Website: ' + $json.host + '\nCompany name from the form (may be blank): ' + ($json.company_name || '') + '\n\nPAGE TEXT:\n' + ($json.page_text || '(empty)')}
  ]}) }}""")

build = w.code("Build Brief", r"""
let L;
try { L = $('Page Text').first().json; } catch (e) { L = $('Route').first().json; }
if (L.prebuilt) return [{ json: L }];
let j = {};
try { j = JSON.parse($input.first().json.body.choices[0].message.content); } catch (e) {}
const nameFromHost = h => String(h||'').split('.')[0].replace(/[-_]+/g,' ').replace(/\b\w/g, c => c.toUpperCase());
const company = (L.company_name || j.company_name || nameFromHost(L.host) || 'your roofing company').slice(0, 80);
const ok = (j.facts_found || 0) >= 3 && String(j.business_brief || '').length > 80;
const out = { ...L, company_name: company, brief_ok: ok };
delete out.page_text;
if (ok) {
  out.business_brief = String(j.business_brief).slice(0, 1400);
  out.services_short = String(j.services_short || 'roof repairs, replacements and storm inspections').slice(0, 120);
  out.service_area = String(j.service_area || 'your area').slice(0, 80) || 'your area';
} else {
  out.business_brief = company + ' is a roofing company (website: ' + L.host + '). The website could not be read in detail, so treat it as a general residential roofing company: repairs, replacements, leak and storm damage inspections. Say honestly that you could not read much from their site if asked about specifics.';
  out.services_short = 'roof repairs, replacements and storm inspections';
  out.service_area = 'your area';
}
return [{ json: out }];
""", [2200, 300])

call = w.http("Place Call (Retell)", [2420, 300], "POST", "https://api.retellai.com/v2/create-phone-call", cred="retell",
              timeout=30000, on_error="continueRegularOutput",
              body="={{ JSON.stringify({from_number: '%s', to_number: $json.phone, override_agent_id: '%s', metadata: {lead_id: $json.lead_id, row_id: $json.row_id, source: $json.source}, retell_llm_dynamic_variables: {first_name: $json.first_name || 'there', company_name: $json.company_name, website: $json.host, business_brief: $json.business_brief, services_short: $json.services_short, service_area: $json.service_area}}) }}" % (FROM_NUMBER, AGENT))

result = w.code("Call Result", r"""
const L = $('Build Brief').first().json;
const r = $input.first().json || {};
const ok = (r.statusCode === 200 || r.statusCode === 201) && r.body && r.body.call_id;
const err = ok ? '' : ('Retell ' + (r.statusCode || 'no response') + ': ' + JSON.stringify(r.body || r.error || '').slice(0, 400));
return [{ json: { ...L, call_ok: !!ok, call_id: ok ? r.body.call_id : '', call_error: err } }];
""", [2640, 300])

save = w.http("Save Call Start", [2860, 300], "PATCH", rows_url("blitz_leads") + "/update",
              body="={{ JSON.stringify({filter:{type:'and',filters:[{columnName:'id',condition:'eq',value:$json.row_id}]}, data:{status: $json.call_ok ? 'called' : 'call_failed', call_id: $json.call_id, called_at: new Date().toISOString(), company_name: $json.company_name, brief_ok: $json.brief_ok, business_brief: $json.business_brief, services_short: $json.services_short, service_area: $json.service_area, error: $json.call_error}}) }}")
failed = w.iff("Call Failed?", "={{ !$('Call Result').item.json.call_ok }}", [3080, 300])
alert = w.email("Alert Matt — Call Failed", [3300, 220], MATT,
                "=BLITZ: call FAILED for {{ $('Call Result').item.json.company_name }} ({{ $('Call Result').item.json.phone }})",
                "=<p>The outbound demo call did not start.</p><p><b>Lead:</b> {{ $('Call Result').item.json.first_name }} · {{ $('Call Result').item.json.company_name }} · {{ $('Call Result').item.json.phone }} · {{ $('Call Result').item.json.email }} · {{ $('Call Result').item.json.website }} · source {{ $('Call Result').item.json.source }}</p><p><b>Error:</b> {{ $('Call Result').item.json.call_error }}</p><p>Call them back by hand, or fix and re-queue (set status to after_hours in the blitz_leads data table).</p>")

w.chain(T, dnc, brief, route, stop_if)
w.link(stop_if, mark_dnc, 0)
w.link(stop_if, need_scrape, 1)
w.link(need_scrape, jina, 0)
w.link(need_scrape, build, 1)
reader_ok = w.iff("Reader Got Text?", "={{ ($json.statusCode || 0) < 300 && String($json.body || $json.data || '').length >= 400 }}", [1430, 650])
w.link(jina, reader_ok)
w.link(reader_ok, prep, 0)
w.link(reader_ok, direct, 1)
w.chain(direct, prep, llm, build, call, result, save, failed)
w.link(failed, alert, 0)

if __name__ == "__main__":
    print(upsert_workflow(w, "brief_call"))
