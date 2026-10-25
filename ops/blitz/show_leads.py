import json, os, sys
sys.path.insert(0, os.path.expanduser("~/blitz-scratch"))
from n8n import api
T = json.load(open(os.path.expanduser("~/blitz-scratch/tables.json")))
s, r = api("GET", f"/data-tables/{T['blitz_leads']}/rows?limit=50")
for x in r.get("data", []):
    print(x["id"], x["status"], x["phone"], x["company_name"], "| brief_ok", x["brief_ok"], "| call", x["call_id"], "| err", (x["error"] or "")[:200])
    if "-v" in sys.argv:
        print("   services:", x["services_short"], "| area:", x["service_area"])
        print("   brief:", (x["business_brief"] or "")[:700])
if "--execs" in sys.argv:
    ids = json.load(open(os.path.expanduser("~/blitz-scratch/workflow_ids.json")))
    for k, wid in ids.items():
        s, e = api("GET", f"/executions?workflowId={wid}&limit=5")
        for ex in e.get("data", []):
            print(k, ex["id"], ex["status"], ex.get("startedAt"), ex.get("stoppedAt"))
