# BudgetPro Internal Linking Strategy

## Goal
Maximize SEO value by creating a web of internal links that:
1. Help users discover related calculators
2. Distribute page authority (especially from high-traffic pages)
3. Improve crawlability for Google

---

## INTERNAL LINK STRUCTURE

### 1. Global Navigation (Every Page)
**Location:** Header sticky nav + footer  
**Links to include:**
- Home `/` (logo)
- All 6 calculators: `/mortgage.html`, `/auto.html`, `/construction.html`, `/solar.html`, `/business.html`, `/income.html`
- Blog: `/blog/`
- Legal: `/privacy.html`, `/terms.html`

**Anchor text:** Use calculator names, not "click here"
- ✅ "Mortgage Calculator"
- ❌ "Click to access"

---

### 2. Homepage Internal Links (`/index.html`)
**Current:** 6 calculator cards linking to each tool (good!)

**Additions:**
- Add a "Latest blog posts" section at bottom → links to 3 newest blog posts
- Add "Help" section: "New here? [Read our financial planning guide →](/blog/financial-planning-roadmap)"
- Footer: "[Explore the blog →](/blog/)"

---

### 3. Calculator Pages (Cross-Linking)

#### 3a. Mortgage Calculator (`/mortgage.html`)
**Contextual links within calculator:**
- Below affordability check: "Ready to build? [Try the Construction Calculator →](/construction.html)"
- Below results: "Calculating your down payment? [Check your income goals →](/income.html)"
- In header: Quick link to blog post "[How to Use This Calculator →](/blog/how-to-use-mortgage-calculator)"

**In footer:**
- "Also popular: [Auto Loan Calculator](/auto.html) | [Solar ROI Calculator](/solar.html) | [Business Startup Calculator](/business.html)"

#### 3b. Solar Calculator (`/solar.html`)
**Contextual links:**
- Below ROI calculation: "Does this fit your budget? [Try the Mortgage Calculator →](/mortgage.html)"
- In summary: "Calculating long-term savings? [Plan your income goals →](/income.html)"
- Header: "[Learn more in our blog →](/blog/how-to-use-solar-calculator)"

#### 3c. Construction Calculator (`/construction.html`)
**Contextual links:**
- Below cost estimate: "Compare to mortgage costs [Mortgage Calculator](/mortgage.html)"
- Related: "[Solar ROI if you install panels →](/solar.html)"

#### 3d. Business Calculator (`/business.html`)
**Contextual links:**
- Below runway calculation: "Your personal income matters. [Check your savings rate →](/income.html)"
- After funding needed: "Consider financing? [Auto loan rates here →](/auto.html)"

#### 3e. Auto Calculator (`/auto.html`)
**Contextual links:**
- Below monthly payment: "Ensure you can afford this. [Check your income→](/income.html)"
- Related: "[Mortgage affordability →](/mortgage.html)"

#### 3f. Income & Savings Calculator (`/income.html`)
**Contextual links:**
- After showing 50/30/20 breakdown: "Ready to invest? [Solar ROI →](/solar.html) | [Business plan →](/business.html)"
- Below savings goal: "Plan property purchase? [Mortgage calculator →](/mortgage.html)"

---

### 4. Blog Posts (Heavy Internal Linking)

#### Rule: Minimum 2–4 internal links per post, maximum 6

**Types of blog links:**

1. **Direct calculator links** (with context)
   - ✅ "Open the [Mortgage Calculator](/mortgage.html) to check your affordability ratio."
   - ❌ "[Mortgage Calculator](/mortgage.html)" (no context)

2. **Related blog posts** (similar topics)
   - End of post: "Read next: [How to Use the Auto Calculator →](/blog/how-to-use-auto-calculator)"

3. **FAQ links** (if you create an FAQ page)
   - "More questions? [Check our FAQ →](/blog/faq)"

4. **Navigation links** (homepage, blog index)
   - "Back to all tools: [BudgetPro home →](/)"
   - "See all posts: [Blog index →](/blog/)"

#### Example: Blog post "How to Use the Mortgage Calculator"

```markdown
## Introduction
Learn to use the [BudgetPro Mortgage Calculator](/mortgage.html) to understand your true affordability...

## Section 1: Understanding PITI
The mortgage calculator breaks down your payment into Principal, Interest, Tax, and Insurance...

## Section 2: The Affordability Check
The calculator applies the 28/36 rule. Explore this further in our [comprehensive financial planning guide](/blog/financial-planning-roadmap)...

## Section 3: Comparing Scenarios
Try the calculator now. If you're also planning construction, check the [Construction Cost Estimator](/construction.html) to compare...

## Closing CTA
Ready? [Open the Mortgage Calculator →](/mortgage.html)

### Related Posts
- [Financial Planning Roadmap for Everyone](/blog/financial-planning-roadmap)
- [How to Use the Solar Calculator](/blog/how-to-use-solar-calculator)
```

---

### 5. Footer (Every Page)

**Recommended footer structure:**

```
[Home] [Blog] [Privacy] [Terms]

Calculators: [Mortgage] [Auto] [Construction] [Solar] [Business] [Savings]

[Email signup]

© 2026 BudgetPro | [Privacy Policy] [Terms of Service]
```

**All of these are internal links.**

---

### 6. 404 Page
**File:** `src/pages/404.astro`

**Content:**
```
Oops, page not found.

Try these instead:
- [Home](/index.html)
- [All Calculators](/index.html#calculators)
- [Blog](/blog/)
- [Contact Us]

Popular Tools:
- [Mortgage Calculator](/mortgage.html)
- [Solar ROI Calculator](/solar.html)
- [Business Calculator](/business.html)
```

---

## ANCHOR TEXT BEST PRACTICES

### DO:
- ✅ Use descriptive, keyword-rich text: "[Mortgage calculator with local data](/mortgage.html)"
- ✅ Vary anchor text: Sometimes use "calculator," sometimes "tool," sometimes "guide"
- ✅ Include the calculator name: Helps users + SEO

### DON'T:
- ❌ "Click here," "Link," "Read more" (generic, no SEO value)
- ❌ Exact match keywords on every link (looks manipulative to Google)
- ❌ Over-link: More than 6 internal links per page dilutes value

### ANCHOR TEXT PATTERNS

| Calculator | Anchor Variations |
|-----------|------------------|
| Mortgage | "Mortgage Calculator," "Check your affordability," "Calculate your PITI," "Home affordability tool" |
| Solar | "Solar ROI calculator," "25-year savings projection," "Solar payback calculator," "System cost estimator" |
| Auto | "Auto loan calculator," "Vehicle affordability," "Monthly car payment," "Drive-away price calculator" |
| Business | "Business startup calculator," "Runway estimator," "Funding needs calculator," "Break-even calculator" |
| Construction | "Construction cost estimator," "Build budget calculator," "Cost breakdown tool" |
| Income | "Income & savings calculator," "50/30/20 budgeting," "Financial independence calculator," "Savings goal planner" |

---

## INTERNAL LINKING AUDIT CHECKLIST

Before launch, verify:

- [ ] Every calculator page links to at least 2 other calculators
- [ ] Homepage has links to blog posts (section at bottom)
- [ ] Blog posts have 2–4 calculator links (contextual, not forced)
- [ ] All calculator pages have a nav link to the blog
- [ ] Footer appears on all pages with links to key pages
- [ ] No broken internal links (404s)
- [ ] Canonical tags on all pages (prevent duplicate content issues)
- [ ] Breadcrumb navigation on blog posts (Home > Blog > [Post Name])

---

## BREADCRUMB SCHEMA (For Blog Posts)

Add this to each blog post:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://budgetpro.com.ng/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://budgetpro.com.ng/blog/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "How to Use the Mortgage Calculator",
      "item": "https://budgetpro.com.ng/blog/how-to-use-mortgage-calculator/"
    }
  ]
}
</script>
```

---

## MEASURING SUCCESS

Track these metrics monthly in GA4:

1. **Internal link clicks:** Compare traffic from internal links vs. external
2. **Page depth:** How many pages does an average user visit per session?
3. **Average session duration:** Users who click internal links stay longer
4. **Conversion rate:** Do users of one calculator visit others?

**Expected improvement:**
- Month 1: +10% average pages/session
- Month 3: +25% average session duration
- Month 6: 40% of users visit 2+ calculators per session

