"""Sales Nav batch: CSV in (first_name,last_name,company_name,website,linkedin_url) -> pre-built briefs ->
CSV out with each prospect's personal /try?k= link and ready-to-paste connection note + InMail.
Usage: python3 salesnav_batch.py prospects.csv  (writes prospects_links.csv next to it)"""
import csv, json, os, sys, time, urllib.request

tok = json.load(open(os.path.expanduser("~/blitz-scratch/salesnav_token.json")))["token"]
URL = "https://n8n.growthmindsetai.tech/webhook/gms-blitz-brief"
src = sys.argv[1]
out = os.path.splitext(src)[0] + "_links.csv"

rows = list(csv.DictReader(open(src, newline="", encoding="utf-8-sig")))
norm = lambda r, *ks: next((r[k].strip() for k in r if k and k.strip().lower().replace(" ", "_") in ks and r[k]), "")
results = []
for i, r in enumerate(rows, 1):
    p = {"first_name": norm(r, "first_name", "first"), "last_name": norm(r, "last_name", "last"),
         "company_name": norm(r, "company_name", "company", "account_name"),
         "website": norm(r, "website", "company_website", "url", "domain"),
         "linkedin_url": norm(r, "linkedin_url", "profile_url", "linkedin")}
    if not p["website"]:
        print(f"{i}/{len(rows)} SKIP no website: {p['first_name']} {p['company_name']}")
        continue
    req = urllib.request.Request(URL, method="POST", data=json.dumps(p).encode(),
                                 headers={"Content-Type": "application/json", "X-Blitz-Token": tok})
    try:
        d = json.loads(urllib.request.urlopen(req, timeout=90).read())
    except Exception as e:
        print(f"{i}/{len(rows)} FAIL {p['website']}: {e}")
        continue
    site = p["website"].replace("https://", "").replace("http://", "").rstrip("/")
    note = f"Hi {p['first_name']}, I build AI receptionists for roofing companies. I trained one on {site}. Tap and she'll call your cell in about a minute. Try to stump her: {d['link']}"
    inmail = (f"Hi {p['first_name']}, quick one. I build AI receptionists for roofing companies, and instead of pitching you I built one off your website. "
              f"She already knows your services and service area.\n\nTap here, enter your mobile, and she'll call you in about a minute: {d['link']}\n\n"
              "Play a homeowner with a leak and see if she books it. Two minutes, and you'll know if it's worth a conversation.\n\nMatt Martelli, Growth Mindset AI")
    results.append({**p, "company_name": p["company_name"] or d.get("company_name", ""), "key": d["key"], "link": d["link"],
                    "brief_ok": d["brief_ok"], "connection_note": note, "inmail_subject": f"I trained an AI receptionist on {site}",
                    "inmail_body": inmail})
    print(f"{i}/{len(rows)} ok {d['key']} brief_ok={d['brief_ok']} {site}")
    time.sleep(3.5)  # stay under the free reader's rate limit

with open(out, "w", newline="", encoding="utf-8") as f:
    wtr = csv.DictWriter(f, fieldnames=list(results[0].keys()) if results else ["link"])
    wtr.writeheader()
    wtr.writerows(results)
print("wrote", out, len(results), "rows")
