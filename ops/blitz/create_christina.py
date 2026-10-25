"""Create or update the Christina blitz agent. Retell versioning: published versions are immutable,
so updates go: create draft agent version -> patch that version's LLM + agent -> publish."""
import json, os, urllib.request, sys

KEY = os.environ["RETELL_API_KEY"]
BASE = "https://api.retellai.com"
STATE = os.path.expanduser("~/blitz-scratch/christina_ids.json")


def call(method, path, body=None):
    req = urllib.request.Request(BASE + path, method=method,
                                 data=json.dumps(body).encode() if body is not None else None,
                                 headers={"Authorization": f"Bearer {KEY}", "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req) as r:
            t = r.read().decode()
            return r.status, (json.loads(t) if t else {})
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode()[:600]


prompt = open(os.path.expanduser("~/blitz-scratch/christina_prompt.md")).read()
ids = json.load(open(STATE)) if os.path.exists(STATE) else {}

llm_body = {
    "model": "gpt-4.1",
    "model_temperature": 0.4,
    "start_speaker": "agent",
    "begin_message": "Hi {{first_name}}, this is Christina, the AI receptionist for {{company_name}}. You asked for a demo a minute ago, so I called right back. That's what your homeowners would get. Got two minutes?",
    "general_prompt": prompt,
    "general_tools": [
        {"type": "end_call", "name": "end_call",
         "description": "End the call after saying goodbye, after a do-not-call request, when they are busy, or after the close."}
    ],
    "default_dynamic_variables": {
        "first_name": "there",
        "company_name": "your roofing company",
        "website": "your website",
        "business_brief": "No details were found on the website. Treat it as a general residential roofing company: repairs, replacements, storm and leak inspections.",
        "services_short": "roof repairs, replacements and storm inspections",
        "service_area": "your area",
    },
}

agent_body = {
    "agent_name": "GMS Blitz - Christina (prospect's AI receptionist demo)",
    "voice_id": "11labs-Cimo",
    "language": "en-US",
    "max_call_duration_ms": 125000,
    "end_call_after_silence_ms": 20000,
    "interruption_sensitivity": 0.8,
    "enable_backchannel": True,
    "webhook_url": "https://n8n.growthmindsetai.tech/webhook/gms-blitz-retell",
    "voicemail_option": {"action": {"type": "static_text", "text": "Hi {{first_name}}, this is Christina, the AI receptionist built for {{company_name}}. You asked for a demo and I missed you. I'm emailing you a link so you can talk to me in your browser anytime. Talk soon."}},
    "post_call_analysis_model": "gpt-4.1-mini",
    "post_call_analysis_data": [
        {"type": "boolean", "name": "requested_do_not_call", "description": "True if the person asked not to be called again or to be removed from the list."},
        {"type": "boolean", "name": "wants_meeting", "description": "True if the person agreed to or showed interest in a call with Matt / putting the AI on their real number."},
        {"type": "boolean", "name": "did_roleplay", "description": "True if the person played a homeowner or tested the agent with business questions."},
        {"type": "enum", "name": "interest_level", "description": "Overall interest in buying an AI receptionist.", "choices": ["hot", "warm", "cold", "unknown"]},
        {"type": "string", "name": "notable_quote", "description": "The single most telling thing the prospect said, verbatim, or empty."},
    ],
}

if "agent_id" not in ids:
    s, llm = call("POST", "/create-retell-llm", llm_body)
    print("llm", s, llm if s >= 300 else llm.get("llm_id"))
    if s >= 300: sys.exit(1)
    s, ag = call("POST", "/create-agent", {**agent_body, "response_engine": {"type": "retell-llm", "llm_id": llm["llm_id"]}})
    print("agent", s, ag if s >= 300 else ag.get("agent_id"))
    if s >= 300: sys.exit(1)
    ids = {"agent_id": ag["agent_id"], "llm_id": llm["llm_id"]}
    json.dump(ids, open(STATE, "w"))
    cur = ag
else:
    s, cur = call("GET", f"/get-agent/{ids['agent_id']}")
    if cur.get("is_published"):
        s, cur = call("POST", f"/create-agent-version/{ids['agent_id']}", {"base_version": cur["version"]})
        print("new draft", s, cur if s >= 300 else cur.get("version"))
        if s >= 300: sys.exit(1)
    eng = cur["response_engine"]
    s, r = call("PATCH", f"/update-retell-llm/{eng['llm_id']}?version={eng.get('version', 0)}", llm_body)
    print("llm update", s, r if s >= 300 else r.get("version"))
    if s >= 300: sys.exit(1)
    s, cur = call("PATCH", f"/update-agent/{ids['agent_id']}", agent_body)
    print("agent update", s, cur if s >= 300 else cur.get("version"))
    if s >= 300: sys.exit(1)

s, pub = call("POST", f"/publish-agent-version/{ids['agent_id']}", {"version": cur["version"]})
print("publish", cur["version"], s, pub if s >= 300 else "")
print(json.dumps(ids))
