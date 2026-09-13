# BudgetPro Partner Outreach List (20+ Fintech/Financial Sites)

**Goal:** Secure backlinks, guest posts, or calculator embeds to drive referral traffic.

---

## TIER 1: High-Authority Finance Sites (US/Global)

These sites have massive reach, strong SEO juice, and financial audiences.

| Site | Domain Authority | Contact | Pitch | Format |
|------|-----------------|---------|-------|--------|
| NerdWallet | 80+ | partnerships@nerdwallet.com | "Free calculator tools for mortgage/auto/solar" | Embed/Link |
| The Balance | 78+ | editorial@investopedia.com | "Educational financial tools" | Guest post |
| Investopedia | 77+ | editorial@investopedia.com | "Free multi-country calculators" | Feature |
| Bankrate | 75+ | press@bankrate.com | "Solar ROI & mortgage tools" | Partner |
| Credit Karma | 72+ | partnerships@creditkarma.intuit.com | "Free editable calculators" | Link |
| Kiplinger | 70+ | editorial@kiplinger.com | "Personal finance calculators" | Guest article |
| SmartAsset | 68+ | partnerships@smartasset.com | "Multi-country financial tools" | Embed/Link |
| The Motley Fool | 68+ | feedback@fool.com | "Free financial planning tools" | Link |

---

## TIER 2: African/Emerging Markets Focus (High Intent)

These sites serve African audiences directly — HIGHEST conversion potential.

| Site | Country | Contact | Pitch | Format |
|------|---------|---------|-------|--------|
| Futuregrowth | South Africa | hello@futuregrowth.co.za | "Free tools for African savers" | Partner |
| Standardbank FE | South Africa | partnerships@sbsa.co.za | "Education & tools for customers" | Link |
| M-PESA/Fintech Blog | Kenya | press@safaricom.co.ke | "Mobile-first financial calculators" | Feature |
| Crunchbase Africa | Multicountry | press@crunchbase.com | "Financial tool for startups" | Link |
| Disrupt Africa | Kenya/Nigeria | hello@disruptafrica.com | "Fintech tool for entrepreneurs" | Feature |
| Techcabal | Nigeria | hello@techcabal.com | "Financial tool for Nigerian entrepreneurs" | Feature |
| BusinessAgro | Nigeria | press@businessagro.com.ng | "Tools for agric entrepreneurs" | Link |
| eMoneyGO | Nigeria | hello@emoney-go.com | "Financial literacy tools" | Partner |
| FarmCrowdy Blog | Nigeria | press@farmcrowdy.com | "Rural entrepreneur calculators" | Guest post |
| Flutterwave Blog | Nigeria | press@flutterwave.com | "Financial tools roundup" | Link |

---

## TIER 3: Fintech & SaaS Communities

These audiences are tech-savvy and love free tools.

| Platform | Type | Contact | Pitch |
|----------|------|---------|-------|
| Product Hunt | Community | support@producthunt.com | "Launch day: Multi-country calculators" |
| Indie Hackers | Community | founders@indiehackers.com | "How I built free calculators for 20 countries" |
| Show HN (Hacker News) | Community | hn@ycombinator.com | "Show HN: Open-source calculator suite" |
| Dev.to | Blogging | hello@dev.to | "Technical deep-dive on calculator architecture" |
| Medium | Blogging | partner@medium.com | "Financial literacy stories & tutorials" |
| Substack | Email Newsletter | partnerships@substack.com | "Sponsorship of finance newsletters" |

---

## TIER 4: Educational & Non-Profit (Brand + SEO)

These sites might not drive massive traffic, but massive SEO authority + credibility.

| Site | Type | Contact | Pitch |
|------|------|---------|-------|
| Khan Academy | Educational | contact@khanacademy.org | "Free financial literacy tools" |
| OpenStax | Open Educational | hello@openstax.org | "Open-source calculator for economics courses" |
| Coursera | Platform | partnerships@coursera.org | "Tools for finance courses" |
| Udemy | Platform | instructor-support@udemy.com | "Tools for financial planning courses" |
| Wikipedia | Reference | <country>-wiki community | "Link from finance calculator pages" |

---

## TIER 5: Social + Community (Viral Potential)

Less formal but high viral potential.

| Platform | Niche | Strategy |
|----------|-------|----------|
| Reddit | r/personalfinance | Post tips linking to relevant calculators (no spam) |
| Reddit | r/FinancialCareers | Comment in threads where calculator helps |
| Quora | Personal Finance | Answer questions, link as resource |
| Twitter/X | Finance Community | Engage with finance influencers, share insights |
| LinkedIn | B2B Finance | Post calculator tutorials for professionals |
| YouTube | Finance Channels | Sponsor or provide calculator for video |

---

## OUTREACH EMAIL TEMPLATE

```
Subject: Free Multi-Country Financial Calculators [Potential Partnership]

Hi [Contact Name],

I built BudgetPro — a suite of 6 free financial calculators (mortgage, solar, auto, construction, business, income) serving 20 countries.

Unlike US-only tools, our calculators use live local data for each country: real interest rates, tax structures, electricity tariffs, etc. Every number is editable, so users customize it for their exact scenario.

We've had [X] users in the last [Y] months, and I think your audience would find these helpful. I'd love to [CHOOSE ONE]:

Option A: Add a link to your resources/tools page
Option B: Write a guest post on "6 free financial calculators every person needs"
Option C: Embed the calculators directly on your site (iframe, no friction)
Option D: Discuss a partnership or sponsorship

You can demo the calculators here: https://budgetpro.com.ng

Would any of these interest you? Happy to chat over a quick call.

Best,
[Your Name]
BudgetPro
press@budgetpro.com.ng

---
P.S. We're fully free, no ads or tracking, and open to collaborations with aligned missions.
```

---

## OUTREACH SEQUENCE

### Week 1–2: Tier 1 Outreach (NerdWallet, Bankrate, etc.)
- Send personalized emails to 5–8 sites
- No mass emails — each one custom
- Follow up after 1 week if no response

### Week 3–4: Tier 2 Outreach (African Sites)
- Same approach, 8–10 emails
- Emphasize local data advantage

### Week 5–6: Tier 3 + 4 (Community Launches)
- Product Hunt launch (coordinated marketing push)
- Indie Hackers post
- Hacker News submission

### Week 7+: Ongoing Relationship Building
- Twitter engagement with finance accounts
- Reddit thoughtful contributions (no spamming)
- Email newsletter sponsorships (when budget allows)

---

## TRACKING RESULTS

Create a Supabase table to track outreach:

```sql
CREATE TABLE partnerships (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  site_name TEXT NOT NULL,
  site_url TEXT,
  contact_email TEXT,
  tier INT, -- 1, 2, 3, etc.
  outreach_date DATE,
  response_date DATE,
  status TEXT, -- 'not_contacted', 'sent', 'responded', 'agreed', 'live'
  notes TEXT,
  referral_traffic BIGINT DEFAULT 0, -- Monthly traffic from this partner
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_partnerships_status ON partnerships(status);
```

---

## MONTHLY OUTREACH GOALS

- **Month 1:** 20 outreach emails sent, 2–3 links secured
- **Month 2:** 20 more emails, 4–5 live links
- **Month 3:** 30 emails, guest post published, 5–6 partners
- **Month 6:** 20+ active partner links, 2–3 major embeds, 500–1000 referral visits/month

---

## PARTNERSHIP SUCCESS STORIES TO Share

Once you secure partnerships, document + share:

- "We partnered with [Big Site]. Here's what happened to our traffic" (LinkedIn post)
- "How a small tool went viral with strategic partnerships" (blog post)
- This builds social proof for future partners

