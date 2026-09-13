# BudgetPro Paid Traffic Strategy (Google Ads + Facebook Ads)

---

## GOOGLE ADS STRATEGY

### Campaign 1: Search — Calculator Intent

**Goal:** Capture users actively searching for calculators  
**Budget:** $150/month  
**Timeline:** Month 1–3

#### Keywords (Match Type: Exact + Phrase)

```
Exact Match:
"mortgage calculator"
"solar ROI calculator"
"auto loan calculator"
"business startup calculator"
"construction cost calculator"
"income calculator"

Phrase Match:
"financial calculator [country]"
"free mortgage calculator"
"multi-country calculator"
"editable financial tools"
"calculator with local data"
"international finance tools"

NOT: "mortgage calculator Nigeria" (too country-specific)
```

#### Ads (Write 3 variations per keyword)

**Ad Set 1: Mortgage Calculator**
- Headline 1: "Calculate Your Mortgage Payment"
- Headline 2: "20 Countries. Live Local Data."
- Headline 3: "Free Editable Affordability Check"
- Description: "Understand your true PITI payment across 20 countries. Edit rates for your exact scenario. No sign-up required."
- Landing page: `/mortgage.html`
- CTA: "Open Calculator"

**Ad Set 2: Multi-Tool**
- Headline 1: "6 Financial Calculators in One"
- Headline 2: "Mortgage, Solar, Auto, Business & More"
- Headline 3: "20 Countries, All Free, 100% Editable"
- Description: "Plan your finances with BudgetPro's integrated calculator suite. Mortgage, solar, business, construction — all with live local data."
- Landing page: `/index.html`
- CTA: "See All Tools"

**Ad Set 3: Education-Focused**
- Headline 1: "Understand Your Real Affordability"
- Headline 2: "Financial Clarity in 3 Minutes"
- Headline 3: "Global Rates, Local Insights"
- Description: "BudgetPro makes financial planning transparent. See what you can actually afford before you commit to big purchases."
- Landing page: `/blog/financial-planning-roadmap`
- CTA: "Learn More"

#### Bidding Strategy
- Bid strategy: **Maximize conversions**
- Target CPA: **$1.50** (you paying $1.50 per calculator view)
- Conversion: "Calculator view" event tracked via GA4

#### Budget Allocation
- Mortgage: 40% ($60) — highest search volume
- Solar: 25% ($37.50) — high intent (ROI searchers)
- All calculators: 20% ($30) — brand awareness
- Auto + Business: 15% ($22.50) — secondary

---

### Campaign 2: Display — Retargeting

**Goal:** Re-engage users who visited but didn't convert  
**Budget:** $100/month  
**Timeline:** Month 1–6

#### Audience: Website Visitors (Last 30 days)
- Users who visited `/mortgage.html` but didn't trigger "calculator_result_view"
- Users who visited `/blog/` but didn't view calculators
- Users on `/index.html` for <30 seconds

#### Ads (Responsive Display)
- 1200×628 header image: "See your real mortgage affordability — 3 minutes"
- 300×250 sidebar: "Solar calculator: 25-year ROI"
- 160×600 skyscraper: "Free financial tools"

#### Bid Strategy
- Target CPA: **$0.75** (cheaper retargeting)
- Networks: Google Display Network (GDN), YouTube

---

### Campaign 3: YouTube — Video Ads

**Goal:** Brand awareness + education  
**Budget:** $50/month  
**Timeline:** Month 2+

#### Skippable In-Stream Ad (15 seconds)
- Video: Screen recording of solar calculator demo (30 sec, edited to 15)
- Headline: "Calculate Your Solar ROI"
- Description: "BudgetPro's solar calculator shows you real payback periods across 20 countries."
- Landing page: `/solar.html`
- Targeting: Audience interested in "Solar energy," "Clean energy," "Personal finance"

---

## FACEBOOK & INSTAGRAM ADS STRATEGY

### Campaign 1: Awareness — Finance-Conscious Audiences

**Goal:** Build brand awareness among target demographic  
**Budget:** $100/month  
**Timeline:** Month 1+

#### Target Audience
- Age: 25–55
- Interests: "Personal Finance," "Investing," "Real Estate," "Entrepreneurship," "Green Energy"
- Geography: Nigeria, Kenya, South Africa, UK, US, Canada (start with Nigeria, scale to others)
- Income level: Middle to upper-middle class
- Behavior: Page visitors interested in financial services

#### Creative 1: Mortgage Hook
- Image: Screenshot of mortgage calculator with "₦280k/month" displayed
- Headline: "You CAN afford a house — here's how much"
- Description: "Most people underestimate their monthly payment. Try our free mortgage calculator. Takes 3 minutes, might save you ₦millions."
- CTA: "Use Calculator"

#### Creative 2: Startup Pitch
- Image: Young entrepreneur with laptop + icon overlay of ₦ symbol
- Headline: "How much capital do you really need?"
- Description: "BudgetPro's business calculator tells you upfront. Registration + fit-out + 6-month runway. Know your real number."
- CTA: "Calculate Now"

#### Creative 3: Solar Savings
- Image: House with solar panels + savings chart
- Headline: "Save ₦13.5M over 25 years ☀️"
- Description: "See your solar ROI before you invest. BudgetPro's calculator includes 20 countries' real rates."
- CTA: "See Your Payback"

#### Bidding Strategy
- Objective: **Traffic** (maximize clicks to website)
- Bid: $0.30–0.50 CPC (cost per click)
- Placement: Automatic (Facebook, Instagram, Audience Network)

---

### Campaign 2: Conversion — Blog/Email Signup

**Goal:** Drive blog subscribers and email list growth  
**Budget:** $50/month  
**Timeline:** Month 2+

#### Target Audience
- Same as Campaign 1, but **add:**
- Website visitors (30-day window) who didn't convert

#### Creative: Newsletter Signup
- Image: Newsletter cover with "5K+ subscribe to BudgetPro weekly tips"
- Headline: "Get Weekly Financial Tips"
- Description: "Join people planning smarter finances. Learn calculator tricks, personal finance hacks, and market insights."
- CTA: "Subscribe Free"
- Landing: Lead form (Facebook Lead Ads)

#### Lead Form Fields
- Email (required)
- First name (optional)
- Country (optional dropdown)

#### Bidding Strategy
- Objective: **Lead generation**
- Target cost per lead: **$0.50**

---

### Campaign 3: Retargeting — High-Intent

**Goal:** Convert cart abandoners / interested users  
**Budget:** $50/month  
**Timeline:** Month 1+

#### Audiences
1. **Hot audience:** Visited `/mortgage.html` + spent 3+ minutes (last 7 days)
2. **Warm audience:** Visited any calculator page (last 14 days)
3. **Cold audience:** Visited homepage only (last 30 days)

#### Creative: Social Proof
- Carousel: 3 calculator screenshots
  - Slide 1: Mortgage affordability check
  - Slide 2: Solar 25-year projection
  - Slide 3: Business runway
- Headline: "You viewed our mortgage calculator 3 days ago"
- Description: "Finished your calculation? Get the full breakdown + PDF report. See your real affordability."
- CTA: "Open Calculator"

#### Bidding Strategy
- Objective: **Conversions** (maximize calculator views)
- Target CPA: **$1.00**

---

## BUDGET ALLOCATION (Monthly)

| Channel | Campaign | Budget | CPA Target | Goal |
|---------|----------|--------|-----------|------|
| Google Ads | Search | $150 | $1.50 | 100 calc views |
| Google Ads | Display | $100 | $0.75 | 130 retarget views |
| Google Ads | YouTube | $50 | — | Brand awareness |
| Facebook | Awareness | $100 | — | 5000 impressions |
| Facebook | Lead Gen | $50 | $0.50 | 100 email signups |
| Facebook | Retargeting | $50 | $1.00 | 50 conversions |
| **TOTAL** | | **$500** | — | — |

**Month 1 recommendation:** Start at $200 total ($100 Google, $100 Facebook), scale based on results.

---

## EXPECTED RESULTS (First 90 Days)

### Month 1
- Total spend: $200
- Estimated visitors: 600–800
- Calculator views: 150–200
- Blog signups: 30–40
- Blog traffic: 80 visits

### Month 2
- Total spend: $350
- Estimated visitors: 1200–1500
- Calculator views: 300–400
- Blog signups: 70–100
- Blog traffic: 250 visits

### Month 3
- Total spend: $500
- Estimated visitors: 2000–2500
- Calculator views: 500–700
- Blog signups: 150–200
- Blog traffic: 500+ visits

**Cumulative 90-day results:**
- ~4500 visitors
- ~1000 calculator interactions
- ~250 email subscribers
- ~1000 blog pageviews
- **Cost per visitor: $0.11**
- **Cost per qualified lead (email): $2.00**

---

## OPTIMIZATION RULES (Monthly Reviews)

### If CTR <1%
- Pause underperforming keywords
- A/B test new headlines
- Increase bid on high-performers

### If ROAS <2:1 (Revenue/Spend)
- For awareness campaigns, acceptable (brand building)
- For conversion campaigns, reduce bid or pause

### If CPA <$1
- Increase budget by 20%
- Expand targeting

### If CPA >$2
- Pause underperforming audience segments
- Refine targeting (narrower interests)

---

## CONVERSION TRACKING (Required)

### GA4 Events to Track
```
1. calculator_view — User opened any calculator
2. calculator_result_view — User scrolled to results
3. pdf_download — User downloaded PDF
4. email_signup — User signed up for newsletter
5. blog_post_view — User viewed a blog post
```

### Link UTM Parameters

**Google Ads Search:**
```
https://budgetpro.com.ng/mortgage.html?utm_source=google&utm_medium=search&utm_campaign=mortgage_intent&utm_content=headline_1
```

**Facebook Display:**
```
https://budgetpro.com.ng/?utm_source=facebook&utm_medium=social&utm_campaign=awareness_mortgage&utm_content=creative_1
```

---

## A/B TESTING CALENDAR

| Week | Test | Variables |
|------|------|-----------|
| 1–2 | Headlines | 3 variants per ad set |
| 3–4 | Images | Photo vs. screenshot |
| 5–6 | CTA | "Open," "Calculate," "Try Now" |
| 7–8 | Audience | Age ranges + interests |
| 9–10 | Landing page | Calculator vs. blog vs. homepage |
| 11–12 | Budget allocation | Shift $$ to top performers |

---

## PLATFORM SETUP CHECKLIST

### Google Ads
- [ ] Create Google Ads account
- [ ] Link to GA4 (conversion tracking)
- [ ] Set up conversion goals (calculator_view event)
- [ ] Create search campaign
- [ ] Add negative keywords (avoid: "free," "pirated," non-intent terms)
- [ ] Set up daily budget alerts

### Facebook Ads
- [ ] Create Facebook Business account
- [ ] Install Pixel on website
- [ ] Create conversions (calculator_view, email_signup)
- [ ] Build custom audiences (website visitors)
- [ ] Upload lookalike audiences (based on email subscribers)
- [ ] Create ad account + campaigns

### Monitoring
- [ ] Set up daily spend alerts ($20 overage = pause)
- [ ] Weekly performance review (GA4 dashboard)
- [ ] Monthly ROI calculation
- [ ] Quarterly strategy adjustment

