import json, os, sys
sys.path.insert(0, os.path.expanduser("~/blitz-scratch"))
from n8n import api
s, e = api("GET", f"/executions/{sys.argv[1]}?includeData=true")
rd = e["data"]["resultData"]
print("ERR:", json.dumps(rd.get("error"))[:600] if rd.get("error") else None, "| last:", rd.get("lastNodeExecuted"))
for k, v in rd["runData"].items():
    o = v[0]
    outs = (o.get("data") or {}).get("main") or []
    first = None
    for d in outs:
        if d:
            first = d[0].get("json"); break
    print("-", k, o.get("executionStatus"), "items:", [len(d or []) for d in outs],
          json.dumps(first)[:int(sys.argv[2]) if len(sys.argv) > 2 else 250] if first else "",
          json.dumps(o.get("error"))[:300] if o.get("error") else "")
