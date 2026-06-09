# Netlify deploy playbook — Next.js + API routes

Captured live during the AI Validation Panel deploy on 2026-06-10. Use this for any future Next.js → Netlify deploy on a free dev plan.

**Total time when you know the path:** ~12 minutes including the env-var step. When you don't know the path: ~90 minutes (don't ask how I know).

---

## Prerequisites (have these before you start)

- [ ] Repo is on GitHub with the code you want to deploy on `main`
- [ ] You're logged into Netlify with the same identity that has access to the GitHub repo
- [ ] **Env var values ready in 1Password or a locked Notes file** — never paste them into chat with an LLM, ever
- [ ] You know whether the repo uses any server-side API routes (matters because Netlify handles those via Functions automatically — but you need to know they're there)

---

## The deploy flow — every click

### 1. Start the import

1. **app.netlify.com** → top right **Add new site** (or "New project" on the landing screen)
2. Choose **Import an existing project**

   You'll see three options on the "Let's create your new project" page:
   - Upload your project files (drag-drop) — **don't use for Next.js**; no auto-deploy on git push
   - Import a Git repository — **this one** ✓
   - Start building with an AI agent — not for our use case

3. Under "Import a Git repository," click **GitHub**

   *Authorize Netlify ↔ GitHub if prompted. First time only.*

### 2. Pick the repo

4. You'll see "Let's deploy your project with…" and a list of your GitHub repos
5. **The list is paginated and NOT ordered by recency.** If your repo isn't in the first few visible, use the **"Search your repos"** box top right — search by a unique slug from the repo name (e.g. `perplexity`, not just `gms`)
6. Click the right repo

### 3. Configure the project

7. **"Review configuration for [repo-name]"** screen appears.

   - **Project name:** type something memorable — this is your `*.netlify.app` URL. For this deploy we used `growthmindset-ai-validation-panel` → `growthmindset-ai-validation-panel.netlify.app`. Way better than the auto-generated `radiant-pony-9c8f3a` for sharing.
   - **Team:** leave as your default team
   - **Branch to deploy:** `main` (default)
   - **Netlify auto-detects Next.js.** You'll see *"This is a Next.js project."* — leave the build settings alone.
   - **Base directory:** leave blank (root)
   - **Build command:** `npm run build` (auto-filled)
   - **Publish directory:** `.next` (auto-filled)
   - **Functions directory:** `netlify/functions` (auto-filled; Next.js API routes route through this transparently)

### 4. Set environment variables BEFORE first deploy

8. **Scroll down** past Functions directory. There's an **"Add environment variables"** section.

   *This is the only screen in the whole flow where adding env vars is one click. After deploy, adding them takes 3 clicks PLUS a manual redeploy. Do it here.*

9. For each env var:
   - Key: `EXAMPLE_API_KEY`
   - Value: paste from 1Password
   - Scope: leave defaults (Builds, Functions, Runtime, Post-processing all checked)
   - Click **Add another variable** for the next one if needed

### 5. Deploy

10. Scroll to the very bottom → click **Deploy [project-name]**
11. You land on the project overview page. **"Project deploy in progress"** with a yellow dot. Build takes ~3-4 min for a typical Next.js app.
12. When you see **"Published"** with the green dot, the URL works. Click it to verify.

---

## Gotchas we hit tonight

These are real wrong turns. Don't repeat them.

### Wrong screen #1 — Team Settings → Environment variables

This screen is **paid only** ("Upgrade to unlock"). It is for *shared* env vars across all sites in a team — a Pro feature.

**The free, per-project env vars live at:** site → Site configuration → Environment variables. NOT under Team Settings.

If you see "Upgrade to unlock" — you're on the wrong screen. Back out.

### Wrong screen #2 — Repo picker doesn't show recent repos first

The "Search your repos" box at the top right is the only reliable way to find a recently-pushed repo. Don't scroll the list hoping to find it.

### Gotcha #3 — Creating an empty stub site

If you click through the import flow but bail before the final "Deploy" click, Netlify still creates a project shell with an empty deploy. You end up with multiple stub sites and a confusing dashboard.

**Fix:** every time you start the import flow, COMMIT to completing it (or actively delete the stub from Settings → Delete Project).

---

## Updating env vars on an EXISTING site

If you added the wrong value, forgot a variable, or need to rotate a key:

1. app.netlify.com → click the site
2. Left sidebar: **Site configuration** → **Environment variables**
3. Edit the existing variable or **Add a variable**
4. **Trigger a redeploy:** Deploys tab → **Trigger deploy** dropdown → **Deploy site**
   - *(Env var changes don't auto-redeploy. You have to trigger it.)*

---

## Verifying a fresh deploy works

For an app with server-side API routes (like the AI Validation Panel):

1. Load the live URL
2. Test the user flow that hits the API
3. If you get a **502** from a server route:
   - Open the Netlify dashboard → site → **Logs** → **Functions**
   - Look for the failing function name (matches your API route path)
   - Common cause: **missing/wrong env var.** Fix the var, redeploy.
4. If you get a **404** on the live URL:
   - Check that the build actually succeeded (Deploys tab → look for the green "Published" tag)
   - Open the deploy log if it says "Failed" — usually a TypeScript or build error

---

## Why this lives in the repo, not in Notes

This is the **dog-food principle**: anything we'd recommend to a client, we document for ourselves first. Next time a client asks "how do we deploy our Next.js app to Netlify?" — we don't open Google. We open this file.

Next deploy in this repo: when env values change, update them in Netlify and trigger redeploy. When the code changes, push to `main` and Netlify auto-deploys.
