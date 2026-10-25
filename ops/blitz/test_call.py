import json, os, sys, time, urllib.request

KEY = os.environ["RETELL_API_KEY"]
ids = json.load(open(os.path.expanduser("~/blitz-scratch/christina_ids.json")))
body = {
    "from_number": "+12393635760",
    "to_number": sys.argv[1],
    "override_agent_id": ids["agent_id"],
    "metadata": {"source": "manual_test"},
    "retell_llm_dynamic_variables": {
        "first_name": "Matt",
        "company_name": "ABC Roofing",
        "website": "abcroofing.com",
        "services_short": "roof replacements, leak repair and storm damage inspections",
        "service_area": "Naples, Bonita Springs and Fort Myers",
        "business_brief": "ABC Roofing is a family-owned residential roofing company in Naples, Florida. Services: shingle, tile and metal roof replacement; leak repair; free storm and hail damage inspections; help with insurance claims. Service area: Collier and Lee counties (Naples, Bonita Springs, Estero, Fort Myers). Hours listed: Mon-Fri 7am-5pm, emergency tarping 24/7. Mentions financing available (no terms listed). No prices listed.",
    },
}
req = urllib.request.Request("https://api.retellai.com/v2/create-phone-call", method="POST",
                             data=json.dumps(body).encode(),
                             headers={"Authorization": f"Bearer {KEY}", "Content-Type": "application/json"})
try:
    with urllib.request.urlopen(req) as r:
        d = json.loads(r.read())
        print(r.status, d.get("call_id"), d.get("call_status"))
        cid = d["call_id"]
except urllib.error.HTTPError as e:
    print(e.code, e.read().decode()[:500]); sys.exit(1)

for _ in range(20):
    time.sleep(6)
    g = urllib.request.Request(f"https://api.retellai.com/v2/get-call/{cid}", headers={"Authorization": f"Bearer {KEY}"})
    with urllib.request.urlopen(g) as r:
        d = json.loads(r.read())
    print(d.get("call_status"), d.get("disconnection_reason"))
    if d.get("call_status") in ("ended", "error", "not_connected"):
        break
