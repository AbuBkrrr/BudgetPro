# BudgetPro Astro Blog — Pre-Launch Checklist

Complete ALL items below and provide the credentials at the end. I'll then proceed with Phase 1.

---

## ✅ SUPABASE SETUP

- [ ] Create Supabase project at https://supabase.com/dashboard
  - Project name: `budgetpro`
  - Email: `aibrainsventures@gmail.com`
  - Database password: (save securely)
  - Region: (choose appropriate region)
- [ ] Wait ~5 minutes for project initialization
- [ ] Navigate to **Settings > API**
- [ ] Copy and save:
  - [ ] `Project URL` (e.g., `https://xxxxx.supabase.co`)
  - [ ] `anon public` key
  - [ ] `service_role` key (SECRET — do NOT share)

---

## ✅ GOOGLE OAUTH SETUP

- [ ] Go to https://console.cloud.google.com/
- [ ] Create new project or select existing: `budgetpro`
- [ ] Enable **Google+ API**
- [ ] Go to **Credentials** > **Create Credentials** > **OAuth 2.0 Client ID**
  - [ ] Select **Web application**
  - [ ] Add Authorized Redirect URIs:
    - `http://localhost:3000/blog/auth/google/callback`
    - `https://budgetpro-astro.vercel.app/blog/auth/google/callback`
    - `https://budgetpro.com.ng/blog/auth/google/callback`
  - [ ] Copy **Client ID** and **Client Secret** (keep secret safe)

---

## ✅ SUPABASE SCHEMA & STORAGE

- [ ] In Supabase Dashboard, go to **SQL Editor**
- [ ] Click **New Query**
- [ ] Paste the contents of `SUPABASE_SCHEMA.sql`
- [ ] Click **Run** and verify success
- [ ] Go to **Storage** > **Create new bucket**
  - [ ] Bucket name: `media`
  - [ ] Uncheck **Private bucket** (make public)
  - [ ] Create bucket
- [ ] Select `media` bucket > go to **Policies**
- [ ] Add policy: "For public buckets, allow read access"
- [ ] Add policy: "Allow authenticated users to upload"

---

## ✅ PROVIDE CREDENTIALS

Once you've completed all items above, reply with:

```
SUPABASE_URL: https://your-project.supabase.co
SUPABASE_ANON_KEY: eyJhbGc...
SUPABASE_SERVICE_KEY: eyJhbGc... (server-side only)
GOOGLE_CLIENT_ID: 123456...
GOOGLE_CLIENT_SECRET: [REDACTED]
```

(I'll handle GitHub setup separately with your PAT token once Phase 1 is ready.)

---

## ESTIMATED TIME

- Supabase setup: ~5–10 minutes
- Google OAuth: ~10 minutes
- Supabase schema: ~2 minutes
- **Total: ~20 minutes**

Once you provide credentials, Phase 1 begins immediately.

