// scripts/fetch-news.mjs — Groq Edition (complete)
import Parser from 'rss-parser';
import fs from 'fs/promises';
import path from 'path';

const parser = new Parser({
  timeout: 15000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  }
});

const RSS_FEEDS = [
  { url: 'https://businessday.ng/feed/', category: 'Business' },
  { url: 'https://nairametrics.com/feed/', category: 'Finance' },
  { url: 'https://punchng.com/topics/business/feed/', category: 'Economy' },
  { url: 'https://www.premiumtimesng.com/category/business/feed', category: 'Economy' },
  { url: 'https://www.thisdaylive.com/index.php/category/business/feed/', category: 'Business' },
];

const RELEVANT_KEYWORDS = [
  'mortgage', 'housing', 'loan', 'interest rate', 'CBN', 'MPR',
  'inflation', 'construction', 'cement', 'building material',
  'solar', 'energy', 'electricity tariff', 'fuel price', 'diesel',
  'car', 'vehicle', 'auto', 'import duty', 'customs',
  'salary', 'tax', 'pension', 'savings', 'budget',
  'real estate', 'property', 'rent', 'land',
  'business', 'startup', 'SME', 'entrepreneur',
];

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

// ---------------------------------------------------------------
// Discover available models from Groq
// ---------------------------------------------------------------
async function discoverModels(apiKey) {
  try {
    const res = await fetch('https://api.groq.com/openai/v1/models', {
      headers: { 'Authorization': `Bearer ${apiKey}` },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data
      .map(m => m.id)
     .filter(id =>
  !id.includes('whisper') &&
  !id.includes('guard') &&
  !id.includes('tts') &&
  !id.includes('embed') &&
  !id.includes('orpheus') &&
  !id.includes('arabic') &&
  !id.includes('vision') &&
  !id.includes('whisper') &&
  !id.includes('audio') &&
  !id.includes('stable-') &&
  !id.includes('canopylabs')
);
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------
// Fetch and filter news
// ---------------------------------------------------------------
async function fetchNews() {
  const allArticles = [];
  const cutoffDate = new Date(Date.now() - SEVEN_DAYS_MS);

  for (const feed of RSS_FEEDS) {
    try {
      console.log(`Fetching: ${feed.url}`);
      const parsed = await parser.parseURL(feed.url);
      for (const item of parsed.items.slice(0, 15)) {
        const pubDate = item.pubDate ? new Date(item.pubDate) : null;
        if (!pubDate || isNaN(pubDate.getTime()) || pubDate < cutoffDate) continue;

        const text = `${item.title || ''} ${item.contentSnippet || ''}`.toLowerCase();
        if (RELEVANT_KEYWORDS.some(kw => text.includes(kw.toLowerCase()))) {
          allArticles.push({
            title: item.title,
            link: item.link,
            snippet: (item.contentSnippet || '').slice(0, 500),
            pubDate: item.pubDate,
            category: feed.category,
            source: parsed.title,
          });
        }
      }
    } catch (err) {
      console.warn(`  Failed: ${err.message}`);
    }
  }

  const seen = new Set();
  const unique = allArticles.filter(a => {
    if (seen.has(a.title)) return false;
    seen.add(a.title);
    return true;
  });

  unique.sort((a, b) => new Date(b.pubDate || 0) - new Date(a.pubDate || 0));
  return unique.slice(0, 8);
}

// ---------------------------------------------------------------
// Call Groq with dynamic model fallback
// ---------------------------------------------------------------
async function callGroq(apiKey, prompt) {
  const MODELS = [
  'openai/gpt-oss-120b',
  'openai/gpt-oss-20b',
  'groq/compound',
  'groq/compound-mini',
];

  for (const model of MODELS) {
    try {
      console.log(`   Trying ${model}...`);
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
          max_tokens: 2048,
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        if (response.status === 429) {
          console.log(`   ⚠ ${model} rate limited, trying next`);
          continue;
        }
        console.log(`   ⚠ ${model} failed: ${errText.slice(0, 100)}`);
        continue;
      }

      const data = await response.json();
      const text = data.choices?.[0]?.message?.content;
      if (!text) {
        console.log(`   ⚠ ${model} returned empty`);
        continue;
      }
      console.log(`   ✓ Used ${model}`);
      return text;
    } catch (err) {
      console.log(`   ⚠ ${model} error: ${err.message.slice(0, 80)}`);
    }
  }
  throw new Error('All Groq models failed.');
}

// ---------------------------------------------------------------
// Generate blog post
// ---------------------------------------------------------------
async function generatePost(articles) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error('GROQ_API_KEY not set');

  const newsDigest = articles.map((a, i) =>
    `${i + 1}. "${a.title}" (${a.source})\n   ${a.snippet}`
  ).join('\n\n');

  const today = new Date().toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' });

  const bodyPrompt = `You are a financial journalist writing for BudgetPro, a Nigerian financial calculator site.

Today's date is ${today}.

Below are the top financial news stories from Nigeria, all published within the last 7 days:

${newsDigest}

Write a 700-800 word blog post that:
1. Opens with a compelling hook about the biggest story.
2. Focus on the SINGLE most important story. Use 1-2 supporting stories ONLY if they are directly related to the main topic.
3. Explains what each story means for the average Nigerian.
4. Includes specific numbers and data where available.
5. Ends with 2-3 actionable takeaways for readers.

CRITICAL RULES:
- Link to BudgetPro's calculators where relevant: mortgage.html, auto.html, construction.html, solar.html, business.html, income.html
- Use British/Nigerian English spelling.
- Use Nigerian Naira (₦) for all currency amounts.
- DO NOT invent statistics not present in the source articles.
- Write in a clear, accessible tone — no financial jargon.
- Do NOT reference the exact date of publication of source articles.
- If the top stories have NOTHING to do with mortgages, auto costs, construction, solar, business, or personal finance, write about the closest related story instead. Never combine unrelated topics.

Return ONLY the blog post body content in Markdown format. Do NOT include the title or metadata.`;

  const body = await callGroq(apiKey, bodyPrompt);

  const titlePrompt = `Pick the SINGLE most important story from the list below. Write a single-line SEO title (max 65 characters) about ONLY that one story. Never combine two unrelated topics.

Stories:

${articles.slice(0, 2).map(a => a.title).join('\n')}

Title:

${articles.slice(0, 2).map(a => a.title).join('\n')}

Return ONLY the title. No quotes. No prefix.`;

  let title = (await callGroq(apiKey, titlePrompt)).trim().replace(/^["']|["']$/g, '');
// Hard-truncate at 65 chars on a word boundary
if (title.length > 65) {
  title = title.slice(0, 65).replace(/\s+\S*$/, '') + '...';
}

  return { title, body };
}

// ---------------------------------------------------------------
// Markdown → HTML
// ---------------------------------------------------------------
function markdownToHtml(md) {
  return md
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .split('\n\n')
    .map(block => {
      block = block.trim();
      if (!block) return '';
      if (/^<h[1-6]/.test(block)) return block;
      if (/^[-*] /m.test(block)) {
        const items = block.split('\n').map(l => l.replace(/^[-*]\s+/, '').trim()).filter(Boolean);
        return '<ul>' + items.map(i => `<li>${i}</li>`).join('') + '</ul>';
      }
      return `<p>${block.replace(/\n/g, ' ')}</p>`;
    })
    .join('\n');
}

// ---------------------------------------------------------------
// Build HTML page
// ---------------------------------------------------------------
function buildHTML(title, body, articles) {
  const slug = title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);

  const htmlBody = markdownToHtml(body);
  const sourcesHtml = articles.map(a =>
    `<li><a href="${a.link}" target="_blank" rel="noopener">${a.title}</a> — <em>${a.source}</em></li>`
  ).join('\n');
  const date = new Date().toISOString().split('T')[0];

  return { slug, html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title} | BudgetPro Blog</title>
<meta name="description" content="${body.slice(0, 155).replace(/[#*\[\]]/g, '').trim()}...">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
body{font-family:'Inter',sans-serif;background:#0a1628;color:#edf1f7;line-height:1.75;margin:0;padding:0}
.wrap{max-width:780px;margin:0 auto;padding:60px 24px 80px}
h1{font-size:36px;font-weight:800;color:#f5a623;line-height:1.2;margin:0 0 16px}
h2{font-size:24px;font-weight:700;margin-top:36px;color:#edf1f7;border-left:4px solid #f5a623;padding-left:14px}
h3{font-size:18px;font-weight:700;margin-top:24px;color:#f5a623}
p{margin:14px 0;color:#c8d0dd}
ul{margin:14px 0;padding-left:22px;color:#c8d0dd}
li{margin:6px 0}
strong{color:#edf1f7}
a{color:#f5a623;text-decoration:none;border-bottom:1px solid #f5a623}
.meta{color:#5c6883;font-size:13px;margin-bottom:30px}
.sources{margin-top:50px;padding:20px;background:#0e1d34;border-radius:10px;border:1px solid #1c3358}
.sources h3{margin-top:0;color:#8a96ac;font-size:14px;text-transform:uppercase;letter-spacing:1px}
.sources ul{padding-left:18px}
.sources li{font-size:13.5px}
.nav{background:#0e1d34;padding:16px 24px;border-bottom:1px solid #1c3358}
.nav a{font-weight:700;font-size:15px;border:none}
.footer{text-align:center;color:#5c6883;font-size:13px;margin-top:60px;padding-top:24px;border-top:1px solid #1c3358}
</style>
</head>
<body>
<div class="nav"><a href="/index.html">← BudgetPro Home</a></div>
<div class="wrap">
<h1>${title}</h1>
<p class="meta">Published ${date} · Auto-generated from Nigerian financial news</p>
${htmlBody}
<div class="sources">
<h3>Sources</h3>
<ul>${sourcesHtml}</ul>
</div>
<div class="footer">© ${new Date().getFullYear()} BudgetPro — Know the True Cost. Avoid the Traps.</div>
</div>
</body>
</html>`, title, date };
}

// ---------------------------------------------------------------
// Main
// ---------------------------------------------------------------
async function main() {
  console.log('📰 Fetching news...');
  const articles = await fetchNews();
  console.log(`   Found ${articles.length} relevant articles`);

  if (articles.length === 0) {
    console.log('No relevant articles from the last 7 days. Skipping.');
    return;
  }

  console.log('🤖 Generating blog post with Groq...');
  const { title, body } = await generatePost(articles);
  console.log(`   Title: ${title}`);

  const { slug, html } = buildHTML(title, body, articles);

  const BLOG_DIR = path.join(process.cwd(), '..', 'blog');
  await fs.mkdir(BLOG_DIR, { recursive: true });
  await fs.writeFile(path.join(BLOG_DIR, `${slug}.html`), html, 'utf-8');
  console.log(`✅ Written: blog/${slug}.html`);

  const meta = { title, slug, date: new Date().toISOString(), articles: articles.length };
  await fs.writeFile(path.join(BLOG_DIR, `${slug}.json`), JSON.stringify(meta, null, 2), 'utf-8');

  if (process.env.GITHUB_OUTPUT) {
    await fs.appendFile(process.env.GITHUB_OUTPUT, `slug=${slug}\ntitle=${title}\n`);
  }
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});