"""GMS Blitz — Sales Nav Brief: POST one prospect -> scrape -> brief -> blitz_briefs row with a short key.
Protected by a header token (X-Blitz-Token). Used by salesnav_batch.py."""
import json, sys, os, secrets
sys.path.insert(0, os.path.expanduser("~/blitz-scratch"))
from wf_common import *
from n8n import api

tok_path = f"{HOME}/salesnav_token.json"
if os.path.exists(tok_path):
    tok = json.load(open(tok_path))
else:
    token = secrets.token_urlsafe(24)
    s, r = api("POST", "/credentials", {"name": "GMS Blitz batch token", "type": "httpHeaderAuth",
                                         "data": {"name": "X-Blitz-Token", "value": token}})
    print("token cred", s, r if s >= 300 else r["id"])
    tok = {"token": token, "cred_id": r["id"]}
    json.dump(tok, open(tok_path, "w"))

# reuse the scrape + LLM nodes' logic from Brief & Call, simplified
import importlib.util
spec = importlib.util.spec_from_file_location("bc", f"{HOME}/wf_brief_call.py")

w = WF("GMS Blitz — Sales Nav Brief")
hook = w.add("Prospect In (POST /webhook/gms-blitz-brief)", "n8n-nodes-base.webhook", 2.1,
             {"httpMethod": "POST", "path": "gms-blitz-brief", "responseMode": "responseNode",
              "authentication": "headerAuth", "options": {}}, [0, 300],
             {"httpHeaderAuth": {"id": tok["cred_id"], "name": "GMS Blitz batch token"}},
             webhookId="6b1b7b7e-6a52-4f0e-9d8f-3c1a2b5e9a04")
norm = w.code("Normalize", r"""
const b = $input.first().json.body || {};
const clean = (s, n = 200) => (s == null ? '' : String(s)).trim().slice(0, n);
let site = clean(b.website).replace(/\s+/g, '');
if (site && !/^https?:\/\//i.test(site)) site = 'https://' + site;
const hm = site.match(/^https?:\/\/([^\/?#:]+)/i);
const host = hm ? hm[1].replace(/^www\./i, '').toLowerCase() : '';
const abc = 'abcdefghjkmnpqrstuvwxyz23456789';
let key = ''; for (let i = 0; i < 6; i++) key += abc[Math.floor(Math.random() * abc.length)];
return [{ json: { valid: !!host, key, first_name: clean(b.first_name, 60), last_name: clean(b.last_name, 60),
  company_name: clean(b.company_name, 120), website: site, host, linkedin_url: clean(b.linkedin_url, 300) } }];
""", [220, 300])
jina = w.http("Scrape (Reader)", [440, 300], "GET", "={{ 'https://r.jina.ai/' + $json.website }}", cred=None,
              headers={"X-Return-Format": "markdown", "X-Timeout": "25"}, text=True, timeout=40000,
              on_error="continueRegularOutput")
llm = w.http("Write Brief (LLM)", [660, 300], "POST", "https://api.openai.com/v1/chat/completions", cred="openai",
             timeout=40000, on_error="continueRegularOutput",
             body=r"""={{ JSON.stringify({
  model: 'gpt-4.1-mini', temperature: 0.2, response_format: {type: 'json_object'},
  messages: [
    {role: 'system', content: 'You prepare a fact sheet for an AI receptionist that will answer phones for this company. Use ONLY facts stated in the page text. Never invent prices, licenses, warranties, financing terms, years in business, awards or reviews. Return JSON with keys: company_name (string, the business name as written on the site), services_short (string, max 12 words, comma list, lowercase), service_area (string, max 8 words, cities/counties/region, or "" if not stated), business_brief (string, max 170 words, plain sentences: what they do, service area, hours, emergency service, and warranty/financing/reviews ONLY if stated; never write sentences about what is missing), facts_found (integer).'},
    {role: 'user', content: 'Website: ' + $('Normalize').item.json.host + '\nCompany name (may be blank): ' + $('Normalize').item.json.company_name + '\n\nPAGE TEXT:\n' + String($json.body || $json.data || '(empty)').slice(0, 14000)}
  ]}) }}""")
build = w.code("Build Row", r"""
const L = $('Normalize').first().json;
let j = {};
try { j = JSON.parse($input.first().json.body.choices[0].message.content); } catch (e) {}
const ok = (j.facts_found || 0) >= 3 && String(j.business_brief || '').length > 80;
return [{ json: { key: L.key, first_name: L.first_name, last_name: L.last_name,
  company_name: L.company_name || j.company_name || '', website: L.website, linkedin_url: L.linkedin_url,
  business_brief: ok ? String(j.business_brief).slice(0, 1400) : '', services_short: ok ? String(j.services_short || '') : '',
  service_area: ok ? String(j.service_area || '') || 'your area' : '', brief_ok: ok, created_at: new Date().toISOString() } }];
""", [880, 300])
ins = w.http("Store Brief", [1100, 300], "POST", rows_url("blitz_briefs"), full=False, never_error=False,
             on_error="continueErrorOutput", body="={{ JSON.stringify({returnType: 'id', data: [$json]}) }}")
ok = w.respond("Respond — Brief", [1320, 220],
               "={{ { ok: true, key: $('Build Row').item.json.key, brief_ok: $('Build Row').item.json.brief_ok, company_name: $('Build Row').item.json.company_name, link: 'https://growthmindset.ai/try?k=' + $('Build Row').item.json.key } }}")
bad = w.respond("Respond — Failed", [1320, 420], '={{ { "ok": false } }}', 500)
w.chain(hook, norm, jina, llm, build, ins)
w.link(ins, ok, 0)
w.link(ins, bad, 1)

if __name__ == "__main__":
    wid = upsert_workflow(w, "salesnav")
    print("activate", api("POST", f"/workflows/{wid}/activate")[0])
