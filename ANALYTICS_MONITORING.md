# BudgetPro Analytics & Monitoring Dashboard

## Monthly KPI Dashboard (Track These)

### TRAFFIC METRICS

| KPI | Target | How to Measure | Tool |
|-----|--------|-----------------|------|
| Monthly unique visitors | 2,500+ | GA4 → Acquisition → User overview | GA4 |
| Sessions | 3,500+ | GA4 → Total sessions | GA4 |
| Bounce rate | <60% | GA4 → Behavior → Bounce rate | GA4 |
| Average session duration | >2 min | GA4 → Engagement → Session duration | GA4 |
| Pages per session | 1.5+ | GA4 → Behavior → Pages per session | GA4 |

### CALCULATOR ENGAGEMENT

| KPI | Target | How to Measure | Tool |
|-----|--------|-----------------|------|
| Total calculator views | 1,000+ | GA4 event `calculator_view` count | GA4 |
| Mortgage calculator visits | 400+ | GA4 event filter by `calculator_type: mortgage` | GA4 |
| Solar calculator visits | 300+ | GA4 event filter by `calculator_type: solar` | GA4 |
| Result view rate | 60% | `calculator_result_view` / `calculator_view` | GA4 |
| PDF downloads | 100+ | GA4 event `pdf_download` count | GA4 |
| Average time in calculator | >3 min | Session duration for /mortgage.html, /solar.html, etc. | GA4 |

### BLOG METRICS

| KPI | Target | How to Measure | Tool |
|-----|--------|-----------------|------|
| Blog visitors | 800+ | GA4 → Pages → /blog/* | GA4 |
| Blog posts published | 12+ | Count in Supabase `posts` table | Supabase |
| Blog pageviews | 1,200+ | GA4 → Total page views for /blog/* | GA4 |
| Blog avg. time on page | >2 min | GA4 → Engagement by page | GA4 |
| Email signups | 100+ | Supabase `email_subscribers` count | Supabase |
| Comment rate | 5–10 | Supabase `comments` count / blog `posts` count | Supabase |

### CONVERSION METRICS

| KPI | Target | How to Measure | Tool |
|-----|--------|-----------------|------|
| Email subscribers | 500+ | Supabase `email_subscribers` table | Supabase |
| Subscriber growth rate | +10% MoM | (Current - Previous) / Previous × 100 | Supabase |
| Referral traffic | 300+ visits | GA4 → Acquisition → Traffic by source (filter: referral) | GA4 |
| Organic search traffic | 600+ visits | GA4 → Acquisition → by source (filter: organic) | GA4 |
| Direct traffic | 400+ visits | GA4 → Acquisition → direct | GA4 |

### PAID AD METRICS (If Running Ads)

| KPI | Target | CPA/ROAS |
|-----|--------|----------|
| Google Ads spend | $300 | Track separately |
| Google Ads visitors | 500+ | Cost per visit: $0.60 |
| Facebook Ads spend | $200 | Track separately |
| Facebook Ads visitors | 400+ | Cost per visit: $0.50 |
| Total cost per visitor (all paid) | — | $0.12–0.15 |
| Cost per email signup | <$2 | Spend / subscribers |

---

## MONTHLY REPORT TEMPLATE

### Report Date: [MONTH YEAR]
### Reporting Period: [Date Range]

---

#### EXECUTIVE SUMMARY
- Total visitors: [X]
- Total calculator interactions: [X]
- Email subscribers gained: [X]
- Top calculator: [Name] ([% of traffic])
- Top blog post: [Title] ([pageviews])

---

#### TRAFFIC OVERVIEW

**Overall Traffic Trend (vs. Last Month)**
- Visitors: [X] (+/-Y%)
- Sessions: [X] (+/-Y%)
- Bounce rate: X%
- Avg. session duration: X min

**Traffic by Source**
```
Organic Search: 45% (600 visitors)
Direct: 30% (400 visitors)
Referral: 15% (200 visitors)
Social: 7% (100 visitors)
Paid (Google Ads): 2% (25 visitors) [if running]
Paid (Facebook): 1% (15 visitors) [if running]
```

**Top Referrers (if applicable)**
1. reddit.com: 80 visits
2. twitter.com: 60 visits
3. product-hunt.com: 40 visits

---

#### CALCULATOR PERFORMANCE

**Top 3 Calculators (by views)**
| Calculator | Views | Avg. Time | Result Views | PDF Downloads |
|-----------|-------|----------|--------------|----------------|
| Mortgage | 420 | 4.2 min | 252 (60%) | 42 |
| Solar | 340 | 5.1 min | 238 (70%) | 58 |
| Business | 180 | 3.8 min | 99 (55%) | 18 |
| Construction | 140 | 3.5 min | 70 (50%) | 12 |
| Auto | 130 | 3.2 min | 68 (52%) | 10 |
| Income | 90 | 3.1 min | 45 (50%) | 8 |

**Key Observations:**
- Solar has highest result view rate (70%) → users engage deeper
- Mortgage has most PDFs (42) → strong intent to take action
- Construction has lowest engagement → consider adding tutorial/guide

---

#### BLOG PERFORMANCE

**Top 5 Blog Posts (by pageviews)**
| Post Title | Pageviews | Avg. Time | Scroll Depth | Email Signups |
|-----------|----------|----------|--------------|----------------|
| Financial Planning Roadmap | 220 | 4.2 min | 85% | 32 |
| How to Use Mortgage Calc | 180 | 3.8 min | 78% | 18 |
| Solar ROI Data Report | 150 | 5.1 min | 92% | 28 |
| How to Use Solar Calc | 120 | 3.5 min | 72% | 14 |
| User Spotlight: Chioma | 90 | 2.8 min | 65% | 8 |

**Blog Stats**
- Total blog pageviews: 760
- Avg. blog post engagement: 3.9 min
- Total comments: 18 (+5 from last month)
- Email signups from blog: 100 (+15 from last month)

**Key Observations:**
- Mega-posts (1500+ words) get 2.5x more time on page
- Posts with clear CTAs get 20% more email signups
- Comments trending up → community engagement growing

---

#### EMAIL & COMMUNITY

**Email Subscribers**
- Total subscribers: 580 (+80 this month)
- Monthly growth rate: +16%
- Unsubscribe rate: 2%
- Open rate (last newsletter): 28%
- Click rate: 4.5%

**Blog Community**
- Total published posts: 12
- Comments per post: 1.5 avg
- User-generated posts (if enabled): 3
- Most active user: @[username] (8 comments)

---

#### TRAFFIC BY DEVICE

| Device | Sessions | Bounce Rate | Avg. Duration | Conversion Rate |
|--------|----------|-------------|----------------|-----------------|
| Mobile | 1,850 (53%) | 62% | 1.8 min | 8% |
| Desktop | 1,470 (42%) | 48% | 3.2 min | 12% |
| Tablet | 180 (5%) | 55% | 2.1 min | 9% |

**Key Observations:**
- Mobile majority (53%) but has higher bounce
- Desktop has 50% better conversion rate
- Consider mobile UX improvements → add mobile-specific CTAs

---

#### GEOGRAPHY BREAKDOWN

| Country | Sessions | Bounce Rate | Goal Completions |
|---------|----------|-------------|------------------|
| Nigeria | 1,200 | 58% | 85 |
| United States | 650 | 52% | 52 |
| Kenya | 280 | 61% | 18 |
| United Kingdom | 200 | 50% | 18 |
| Canada | 170 | 49% | 15 |
| Other | 220 | 55% | 15 |

**Key Observations:**
- Nigeria = 34% of traffic (expected, domain .ng)
- US second (18%) → strong international appeal
- Africa combined = 48% of traffic ✓ (Africa-first positioning working)

---

#### PAID ADS PERFORMANCE (If Running)

**Google Ads**
- Spend: $300
- Clicks: 500
- Visitors: 450
- CPA: $0.67
- ROAS: 2.1:1
- Top keyword: "mortgage calculator" (120 clicks)

**Facebook Ads**
- Spend: $200
- Impressions: 25,000
- Clicks: 380
- Visitors: 280
- CPA: $0.71
- Email signups: 35 (6.7% conversion)

**Key Observations:**
- Google search outperforming Facebook (higher CPA but more intent)
- Facebook email signups cheaper ($5.71/sub) vs. organic

---

#### GOALS & NEXT MONTH'S TARGETS

**Achieved This Month:**
- ✓ Traffic +15% YoY
- ✓ Email subscribers +80 (+16% growth)
- ✓ Solar calculator engagement +12%

**Missed:**
- ❌ Construction calculator target (140 vs. 250 target)
- ❌ Blog comments target (18 vs. 30 target)

**Next Month Priorities:**
1. Write 3 new blog posts focused on Construction (tutorial + case study + industry insights)
2. Boost Construction calculator on-page with "Why construction matters" section
3. Run Facebook retargeting campaign to past calculator viewers
4. Set up weekly email digest (boost engagement)

**Budget Allocation (Next Month):**
- SEO/blog content: 40% of effort
- Paid ads: +$100 (increase to $400 total)
- Community engagement (blog comments): +1 post/week

---

## DASHBOARDS TO SET UP

### 1. GA4 Custom Dashboard (Create in GA4)

**Widgets to include:**
- Metric: Total users (top left)
- Metric: Sessions (top right)
- Metric: Average session duration
- Chart: Traffic by source (pie chart)
- Chart: Calculator views trend (line chart, 30-day)
- Chart: Top pages (table)
- Chart: Device breakdown

**Access:** Dashboard > Create new > Add widgets

### 2. Supabase Analytics View (SQL Query)

```sql
-- Monthly Blog & Email Stats

SELECT 
  DATE_TRUNC('month', created_at) as month,
  COUNT(DISTINCT id) as new_posts,
  COUNT(DISTINCT user_id) as unique_authors,
  (SELECT COUNT(*) FROM comments WHERE created_at > NOW() - INTERVAL '30 days') as total_comments,
  (SELECT COUNT(*) FROM email_subscribers WHERE created_at > NOW() - INTERVAL '30 days') as new_subscribers
FROM posts
WHERE created_at > NOW() - INTERVAL '12 months'
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY month DESC;
```

**Save as:** "Monthly Blog & Email Report"

### 3. Google Ads Dashboard (If Running Ads)

**Link:** https://ads.google.com → Campaigns → Performance view

**Key metrics to track daily:**
- Spend
- Clicks
- Cost per click (CPC)
- Conversions (via GA4 link)
- ROAS

### 4. Custom Reporting Tool (Optional, for automation)

**Setup:** Google Sheets + Google Analytics Connector

**Create a tab for each:**
- Traffic Summary (daily auto-update)
- Blog Performance
- Paid ads ROI
- Monthly targets vs. actuals

**Share with:** Team/stakeholders

---

## MONTHLY REVIEW MEETING AGENDA (30 mins)

1. **Traffic review** (5 min)
   - Is traffic growing?
   - Which sources are strongest?
   - Any anomalies?

2. **Calculator performance** (5 min)
   - Which tools are most used?
   - Engagement rates (time on page, result views)?
   - PDF downloads trend?

3. **Blog & community** (5 min)
   - Posts published this month?
   - Subscriber growth?
   - Blog comment activity?

4. **Paid ads** (5 min)
   - ROI trending positive?
   - Budget allocation working?
   - Any keywords to pause/expand?

5. **Wins & issues** (5 min)
   - What went well?
   - What underperformed?
   - Next month priorities

6. **Budget decisions** (5 min)
   - Increase/decrease spend?
   - New initiatives?
   - Adjustments needed?

---

## ANNUAL GOALS (12-Month Projection)

### Target Metrics (End of Year 1)
- **Monthly visitors:** 15,000+
- **Total calculator interactions:** 18,000+ (annual)
- **Email subscribers:** 2,500+
- **Blog posts published:** 50+
- **Monthly blog pageviews:** 5,000+
- **Paid ads ROAS:** 2.5:1 or better
- **Organic traffic % of total:** 60%+

### Budget Allocation (Annual)
- Content creation (blog): 30%
- Paid ads: 25%
- SEO/technical: 20%
- Community management: 15%
- Tools/analytics: 10%

