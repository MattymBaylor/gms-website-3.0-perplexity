import json, os, uuid

HOME = os.path.expanduser("~/blitz-scratch")
TABLES = json.load(open(f"{HOME}/tables.json"))
CREDS = json.load(open(f"{HOME}/creds.json"))
AGENT = json.load(open(f"{HOME}/christina_ids.json"))["agent_id"]
NPA = json.load(open(f"{HOME}/npa_tz.json"))
NPA["907"] = "America/Anchorage"

API = "https://n8n.growthmindsetai.tech/api/v1"
FROM_NUMBER = "+12393635760"
BOOKING_LINK = "https://growthmindset.ai/#cta"
BROWSER_LINK = "https://growthmindset.ai/demo"
MATT = "matt@growthmindset.ai"
FROM = "Matt Martelli <matt@growthmindset.ai>"
TEST_NUMBERS = ["+12146088290", "+12395550100"]

N8N_CRED = {"httpHeaderAuth": {"id": CREDS["n8n_api"], "name": "n8n API (GMS Blitz)"}}
RETELL_CRED = {"httpBearerAuth": {"id": CREDS["retell"], "name": "Retell (GMS Blitz)"}}
OPENAI_CRED = {"openAiApi": {"id": "jJ4pSkfVC06XtqNb", "name": "OpenAi account"}}
SMTP_CRED = {"smtp": {"id": "dLzNWGaf1zYvEzu5", "name": "Gmail SMTP - matt@growthmindset.ai"}}


class WF:
    def __init__(self, name):
        self.name, self.nodes, self.conn, self.y = name, [], {}, 0

    def add(self, name, type_, ver, params, pos, creds=None, **extra):
        n = {"id": str(uuid.uuid5(uuid.NAMESPACE_DNS, self.name + name)), "name": name, "type": type_,
             "typeVersion": ver, "position": pos, "parameters": params}
        if creds:
            n["credentials"] = creds
        n.update(extra)
        self.nodes.append(n)
        return name

    def link(self, a, b, out=0):
        m = self.conn.setdefault(a, {"main": []})["main"]
        while len(m) <= out:
            m.append([])
        m[out].append({"node": b, "type": "main", "index": 0})

    def chain(self, *names):
        for a, b in zip(names, names[1:]):
            self.link(a, b)

    def body(self):
        return {"name": self.name, "nodes": self.nodes, "connections": self.conn,
                "settings": {"executionOrder": "v1", "timezone": "America/New_York",
                             "saveDataErrorExecution": "all", "saveDataSuccessExecution": "all"}}

    # ---- node helpers ----
    def code(self, name, js, pos, **extra):
        return self.add(name, "n8n-nodes-base.code", 2, {"jsCode": js}, pos, **extra)

    def http(self, name, pos, method, url, *, cred="n8n", body=None, query=None, headers=None,
             full=True, never_error=True, timeout=20000, text=False, on_error=None):
        p = {"method": method, "url": url, "options": {"timeout": timeout}}
        if cred == "n8n":
            p.update({"authentication": "genericCredentialType", "genericAuthType": "httpHeaderAuth"})
            creds = N8N_CRED
        elif cred == "retell":
            p.update({"authentication": "genericCredentialType", "genericAuthType": "httpBearerAuth"})
            creds = RETELL_CRED
        elif cred == "openai":
            p.update({"authentication": "predefinedCredentialType", "nodeCredentialType": "openAiApi"})
            creds = OPENAI_CRED
        else:
            creds = None
        if body is not None:
            if body.startswith("={{") and body.rstrip().endswith("}}"):
                inner = body.rstrip()[3:-2]
                while "}}" in inner:
                    inner = inner.replace("}}", "} }")
                body = "={{" + inner + "}}"
            p.update({"sendBody": True, "specifyBody": "json", "jsonBody": body})
        if query:
            p.update({"sendQuery": True, "queryParameters": {"parameters": [{"name": k, "value": v} for k, v in query.items()]}})
        if headers:
            p.update({"sendHeaders": True, "headerParameters": {"parameters": [{"name": k, "value": v} for k, v in headers.items()]}})
        resp = {}
        if full:
            resp["fullResponse"] = True
        if never_error:
            resp["neverError"] = True
        if text:
            resp["responseFormat"] = "text"
        if resp:
            p["options"]["response"] = {"response": resp}
        extra = {}
        if on_error:
            extra["onError"] = on_error
        return self.add(name, "n8n-nodes-base.httpRequest", 4.2, p, pos, creds, **extra)

    def iff(self, name, expr, pos):
        return self.add(name, "n8n-nodes-base.if", 2.2, {"conditions": {
            "options": {"caseSensitive": True, "leftValue": "", "typeValidation": "loose"},
            "conditions": [{"id": str(uuid.uuid4()), "leftValue": expr,
                            "operator": {"type": "boolean", "operation": "true", "singleValue": True}}],
            "combinator": "and"}, "options": {}}, pos)

    def email(self, name, pos, to, subject, html, on_error="continueRegularOutput"):
        return self.add(name, "n8n-nodes-base.emailSend", 2.1, {
            "fromEmail": FROM, "toEmail": to, "subject": subject, "emailFormat": "html", "html": html,
            "options": {"appendAttribution": False}}, pos, SMTP_CRED, onError=on_error)

    def respond(self, name, pos, body_expr, code=200):
        return self.add(name, "n8n-nodes-base.respondToWebhook", 1.5, {
            "respondWith": "json", "responseBody": body_expr, "options": {"responseCode": code}}, pos)


def rows_url(table):
    return f"{API}/data-tables/{TABLES[table]}/rows"


def filt(col, expr):
    """query filter expression: col eq <n8n expression>"""
    return "={{ JSON.stringify({type:'and',filters:[{columnName:'%s',condition:'eq',value:%s}]}) }}" % (col, expr)


def upsert_workflow(wf, key):
    import sys
    sys.path.insert(0, HOME)
    from n8n import api
    ids_path = f"{HOME}/workflow_ids.json"
    ids = json.load(open(ids_path)) if os.path.exists(ids_path) else {}
    body = wf.body()
    if key in ids:
        s, r = api("PUT", f"/workflows/{ids[key]}", body)
    else:
        s, r = api("POST", "/workflows", body)
    print(key, s, r if s >= 300 else r.get("id"))
    if s < 300:
        ids[key] = r["id"]
        json.dump(ids, open(ids_path, "w"))
    return ids.get(key)
