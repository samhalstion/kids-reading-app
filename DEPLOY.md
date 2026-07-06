# Deploying Monster Reader

Monster Reader is a static single-page app (Vite build → `dist/`). It uses **hash
routing**, so it works on any static host with **no server configuration**.
Pick one of the options below.

## Option A — Vercel dashboard import (recommended, ~2 minutes)

This is the easiest path and gives you automatic production deploys on every push
to `main`, plus a preview URL for every pull request — all handled by Vercel's
GitHub App, with no secrets to manage.

1. Go to **https://vercel.com/new**.
2. **Import** the `samhalstion/faceless-videos` repository (authorize the Vercel
   GitHub App for the repo if prompted).
3. Vercel auto-detects the Vite framework. Confirm the defaults:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
   - **Install command:** `npm install`
4. Click **Deploy**. You'll get a private URL like
   `https://faceless-videos.vercel.app` (rename it under Project → Settings →
   Domains). Open it on the tablet and "Add to Home Screen" to install the PWA.

Keep the project **private** to your Vercel account — no extra sharing needed.

## Option B — CI deploy via GitHub Actions (already wired up)

A workflow at `.github/workflows/deploy.yml` builds, tests, and deploys to Vercel
on every push to `main`. It **safely skips** if the secrets below aren't set, so
it never fails your build unexpectedly.

To enable it, add three repository secrets (GitHub → Settings → Secrets and
variables → Actions):

| Secret | Where to get it |
|--------|-----------------|
| `VERCEL_TOKEN` | https://vercel.com/account/tokens |
| `VERCEL_ORG_ID` | run `vercel link` locally, then read `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | same `.vercel/project.json` |

> Use **either** Option A or Option B, not both — they'd deploy the same site twice.

## Option C — Vercel CLI (one-off, from your machine)

```bash
npm i -g vercel
vercel login
vercel --prod        # from the repo root; follow the prompts once
```

## Local check before deploying

```bash
npm install
npm test          # 30 tests — verifies every lesson's content is decodable
npm run build     # outputs dist/
npm run preview   # serve the production build at http://localhost:4173
```
