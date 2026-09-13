# BudgetPro Community Blog — Complete Setup Guide

## STEP 1: Create Supabase Project

1. Go to https://supabase.com/dashboard
2. Sign in or create an account with `aibrainsventures@gmail.com`
3. Click **"New Project"**
   - Name: `budgetpro`
   - Database Password: Generate a strong password (save it securely)
   - Region: Choose closest to your users (e.g., `us-east-1` if you're in Nigeria, use `eu-west-1`)
4. Wait for the project to initialize (~5 minutes)
5. Once ready, go to **Settings > API** and copy:
   - `Project URL` (e.g., `https://xxxxxxxxxxxx.supabase.co`)
   - `anon public` key under "Project API keys"
   - `service_role` key (keep this SECRET — server-side only)

**Save these somewhere safe. You'll need them in the next steps.**

---

## STEP 2: Create Google OAuth Credentials

1. Go to https://console.cloud.google.com/
2. Create a **New Project** named `budgetpro` (if you don't have one already)
3. Enable the **Google+ API**:
   - Search for "Google+ API" in the search bar
   - Click it, then click **Enable**
4. Go to **Credentials** (left sidebar)
5. Click **Create Credentials** > **OAuth 2.0 Client ID**
   - Choose **Web application**
   - Add Authorized Redirect URIs:
     - `http://localhost:3000/blog/auth/google/callback` (for local testing)
     - `https://budgetpro-astro.vercel.app/blog/auth/google/callback` (replace with your actual Vercel domain)
     - `https://budgetpro.com.ng/blog/auth/google/callback` (production)
   - Copy your **Client ID** and **Client Secret**

**Do NOT share the Client Secret. Keep it secure.**

---

## STEP 3: Set Up Supabase Schema & Storage

You can use the Supabase SQL editor to run the schema. I'll provide the SQL in `SUPABASE_SCHEMA.sql`.

1. In Supabase Dashboard, go to **SQL Editor**
2. Click **New Query**
3. Paste the contents of `SUPABASE_SCHEMA.sql` (see below)
4. Click **Run**
5. Repeat for any additional queries

---

## STEP 4: Create Storage Bucket

1. Go to **Storage** in Supabase Dashboard
2. Click **Create new bucket**
   - Name: `media`
   - Uncheck **Private bucket** (make it public)
3. Click **Create**
4. Select the `media` bucket, go to **Policies**
5. Click **New policy**
   - Use template: **For public buckets, allow read access**
   - Click **Review**, then **Save policy**
6. Click **New policy** again
   - Use template: **Allow authenticated users to upload**
   - Click **Review**, then **Save policy**

---

## STEP 5: Environment Variables

Create a `.env.local` file in the Astro project root (`C:\Users\DELL\budgetpro-astro`):

```env
PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id-here
SUPABASE_SERVICE_KEY=your-service-role-key-here
```

**IMPORTANT:**
- `PUBLIC_*` keys are safe to expose in the frontend (they're restricted by RLS)
- `SUPABASE_SERVICE_KEY` must NEVER be in client code — only in server env vars and GitHub Actions secrets

---

## STEP 6: GitHub Setup

You'll provide me with your GitHub PAT token, and I'll:
1. Create the `budgetpro-astro` repo
2. Configure GitHub Secrets:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_KEY`
   - `VERCEL_TOKEN` (if using automated deployment)

---

## NEXT: Run Phase 1 Locally

Once you've completed Steps 1–5 and provided me the credentials, I'll scaffold the Astro project and we'll verify everything works locally with `npm run dev`.

