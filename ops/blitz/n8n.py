"""Tiny n8n API helper. Usage: import n8n; n8n.api('GET', '/workflows')"""
import json, os, urllib.request

BASE = "https://n8n.growthmindsetai.tech/api/v1"
KEY = os.environ["N8N_API_KEY"]


def api(method, path, body=None):
    req = urllib.request.Request(BASE + path, method=method,
                                 data=json.dumps(body).encode() if body is not None else None,
                                 headers={"X-N8N-API-KEY": KEY, "Content-Type": "application/json",
                                          "Accept": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            t = r.read().decode()
            return r.status, (json.loads(t) if t else {})
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode()[:1500]
