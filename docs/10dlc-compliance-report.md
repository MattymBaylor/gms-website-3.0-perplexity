# A2P 10DLC / SMS Compliance Report

**Repository:** `MattymBaylor/gms-website-3.0-perplexity`
**Branch:** `compliance/10dlc-sms-consent`
**Date:** June 14, 2026
**Scope:** Bring growthmindset.ai into compliance with A2P 10DLC / SMS campaign registration requirements and eliminate CTA (call-to-action) verification failures.

---

## Summary

The site previously collected mobile phone numbers through its demo request form but had **no SMS opt-in checkbox, no SMS disclosure language, and no SMS sections in the legal pages** — the three most common reasons an A2P 10DLC campaign is rejected during CTA verification. This change adds an explicit, unchecked, standalone SMS consent checkbox to the phone-collecting form, records proof of consent on each submission, and publishes the required SMS disclosures in both the Privacy Policy and Terms & Conditions.

---

## Forms Updated

| Form | File | Collects Phone? | Change |
|------|------|-----------------|--------|
| Demo Request (Primary CTA) | `components/CTAForm.tsx` | Yes | Added unchecked SMS consent checkbox above submit; consent + timestamp stored in submission |
| Email Capture ("Free guide") | `components/sections/EmailCapture.tsx` | No (email only) | No change required — does not collect a phone number |

The Demo Request form (`CTAForm`) is rendered on the homepage and every industry landing page via `components/sections/PrimaryCTA.tsx`, so the consent control appears site-wide wherever a phone number is requested.

---

## Files Changed

| File | Purpose of change |
|------|-------------------|
| `components/CTAForm.tsx` | Added unchecked-by-default SMS consent checkbox directly above the submit button, with the exact required consent language, links to Privacy Policy and Terms & Conditions, validation requiring opt-in, and capture of consent + ISO opt-in timestamp into the submitted payload. |
| `app/api/lead/route.ts` | Accepts and forwards `sms_consent` and `sms_consent_timestamp` to the N8N lead pipeline so proof of consent is stored with each lead; rejects textable leads without consent. |
| `app/privacy/page.tsx` | Added **SMS Communications** section with required disclosures; bumped "Last updated" date. |
| `app/terms/page.tsx` | Added **SMS Terms of Service** section with required disclosures; bumped "Last updated" date. |
| `components/Footer.tsx` | Relabeled the Terms link as "Terms & Conditions" to match the consent copy (links unchanged). |
| `docs/10dlc-compliance-report.md` | This report. |

---

## SMS Consent Checkbox

**Location:** Demo Request form (`CTAForm`), directly above the "Request a Demo" submit button, on the homepage (`/`) and all industry pages.

**Behavior:**
- Unchecked by default — visitor must actively opt in.
- Standalone — not bundled with Terms acceptance or any other agreement.
- Submission is blocked (client and server side) until consent is given.
- Links to the **Privacy Policy** (`/privacy`) and **Terms & Conditions** (`/terms`) are shown immediately beneath the checkbox.

**Exact consent language:**

> I agree to receive SMS messages from Growth Mindset regarding my inquiry, appointments, requested services, and account updates. Message frequency varies. Message and data rates may apply. Reply STOP to opt out and HELP for assistance. Consent is not a condition of purchase.

**Proof of consent stored:** Each submission records `sms_consent: true` and an ISO-8601 `sms_consent_timestamp`, plus the verbatim consent language (in the emailed lead body), so the opt-in is auditable.

---

## Legal Page Disclosures

### Privacy Policy — `/privacy` → https://growthmindset.ai/privacy
New **SMS Communications** section covering: purpose of messages, "message frequency varies," "message and data rates may apply," STOP to opt out, HELP for assistance, and that **SMS consent is not shared with third parties or affiliates for marketing purposes**.

### Terms & Conditions — `/terms` → https://growthmindset.ai/terms
New **SMS Terms of Service** section covering: scope of messages, "message frequency varies," "message and data rates may apply," STOP to opt out, HELP for assistance, "consent is not a condition of purchase," and that wireless carriers are not liable for delayed or undelivered messages.

---

## SMS Consent Locations

| Element | URL / Location |
|---------|----------------|
| Opt-in checkbox | Demo form on `https://growthmindset.ai/` and every industry page (`/hvac`, `/roofing`, `/plumbing`, `/legal`, `/medical`, `/real-estate`, `/insurance`, `/locksmith`, `/property-management`, `/electrical`, `/home-services`, `/custom`) |
| Privacy Policy SMS section | `https://growthmindset.ai/privacy` |
| Terms SMS section | `https://growthmindset.ai/terms` |
| Footer legal links (every page) | Privacy Policy → `/privacy`, Terms & Conditions → `/terms` |

---

## Compliance Improvements (Summary)

1. **Explicit opt-in** — unchecked, standalone SMS consent checkbox added to the only phone-collecting form.
2. **Required disclosures at point of consent** — message types, frequency, rates, STOP/HELP, and "not a condition of purchase" shown next to the checkbox.
3. **Privacy Policy** now contains the SMS Communications disclosure, including no-third-party-sharing of consent.
4. **Terms & Conditions** now contains the SMS Terms of Service disclosure, including carrier-liability and not-a-condition-of-purchase language.
5. **Footer** links to both legal pages on every page (verified) and uses consistent "Terms & Conditions" labeling.
6. **Proof of consent** captured (boolean + timestamp + verbatim language) on every submission for audit during campaign review.

These changes align the site with the standard mobile-carrier (TCR/The Campaign Registry) CTA verification checklist for A2P 10DLC registration: a publicly visible, web-based opt-in with full SMS disclosures, plus matching Privacy Policy and Terms language.
