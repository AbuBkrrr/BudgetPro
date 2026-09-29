// scripts/fetch-news.mjs
// Fetches Nigerian financial news from RSS feeds,
// then generates a blog post via Groq (primary) with Gemini fallback.

import Parser from 'rss-parser';
import Groq from 'groq-sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs/promises';
import path from 'path';

const parser = new Parser({
  timeout: 10000,
  headers: { 'User-Agent': 'BudgetPro-Bot/1.0' }
});

// ---------------------------------------------------------------
// RSS FEEDS — Nigerian finance, housing, energy, business
// ---------------------------------------------------------------
const RSS_FEEDS = [
  { url: 'https://businessday.ng/feed/', category: 'Business' },
  { url: 'https://nairametrics.com/feed/', category: 'Finance' },
  { url: 'https://punchng.com/topics/business/feed/', category: 'Economy' },
  { url: 'https://guardian.ng/category/business-services/feed/', category: 'Business' },
  { url: 'https://www.premiumtimesng.com/category/business/feed', category: 'Economy' },
  { url: 'https://www.thisdaylive.com/index.php/category/business/feed/', category: 'Business' },
];

// ---------------------------------------------------------------
// GROQ MODEL CHAIN (primary provider)
// Ordered: best quality first, fastest/most-available last.
// ---------------------------------------------------------------
const GROQ_MODELS = [
  'llama-3.3-70b-versatile',
  'meta-llama/llama-4-maverick-17b-128e-instruct',
  'meta-llama/llama-4-scout-17b-16e-instruct',
  'qwen/qwen3-32b',
  'llama-3.1-8b-instant',
];

// ---------------------------------------------------------------
// GEMINI MODEL CHAIN (fallback provider)
// ---------------------------------------------------------------
const GEMINI_MODELS = [
  'gemini-3.8-flash',
  'gemini-3.7-flash',
  'gemini-3.6-flash',
  'gemini-3.5-flash',
];

// ---------------------------------------------------------------
// Keyword filter
// ---------------------------------------------------------------
const RELEVANT_KEYWORDS = [
  'mortgage', 'housing', 'loan', 'interest rate', 'CBN', 'MPR',
  'inflation', 'construction', 'cement', 'building material',
  'solar', 'energy', 'electricity tariff', 'fuel price', 'diesel',
  'car', 'vehicle', 'auto', 'import duty', 'customs',
  'salary', 'tax', 'pension', 'savings', 'budget',
  'real estate', 'property', 'rent', 'land',
  'business', 'startup', 'SME', 'entrepreneur',
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------------------------------------------------------------
// Fetch and filter news
// ---------------------------------------------------------------
async function fetchNews() {
  const allArticles = [];
  for (const feed of RSS_FEEDS) {
    try {
      console.log(`Fetching: ${feed.url}`);
      const parsed = await parser.parseURL(feed.url);
      for (const item of parsed.items.slice(0, 10)) {
        const text = `${item.title || ''} ${item.contentSnippet || ''}`.toLowerCase();
        const isRelevant = RELEVANT_KEYWORDS.some(kw => text.includes(kw.toLowerCase()));
        if (isRelevant) {
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
      console.warn(`Failed to fetch ${feed.url}: ${err.message}`);
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
// GROQ CALLER — with retry + model fallback
// ---------------------------------------------------------------
async function callGroq(prompt) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.log('   ⚠️  GROQ_API_KEY not set — skipping Groq');
    return null;
  }

  const client = new Groq({ apiKey });
  let lastError = null;

  for (let mi = 0; mi < GROQ_MODELS.length; mi++) {
    const model = GROQ_MODELS[mi];
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(`   🟢 [Groq ${mi + 1}/${GROQ_MODELS.length}] ${model} (attempt ${attempt}/3)`);
        const completion = await client.chat.completions.create({
          messages: [{ role: 'user', content: prompt }],
          model,
          temperature: 0.7,
          max_tokens: 4000,
        });
        const text = completion.choices?.[0]?.message?.content || '';
        if (!text || text.trim().length < 20) {
          throw new Error('Empty response from Groq');
        }
        console.log(`   ✅ Groq success with ${model}`);
        return text;
      } catch (err) {
        lastError = err;
        const msg = String(err.message || err);
        const isTransient =
          /\b(429|500|502|503|504)\b/.test(msg) ||
          /rate[_\s-]?limit|overloaded|timeout|unavailable/i.test(msg);

        if (!isTransient) {
          console.log(`   ❌ Groq ${model} non-retryable: ${msg.slice(0, 100)}`);
          break; // next model
        }
        if (attempt < 3) {
          const delay = Math.min(8000, Math.pow(2, attempt) * 1000) + Math.floor(Math.random() * 1000);
          console.log(`   ⚠️  Groq rate-limited. Retrying in ${(delay / 1000).toFixed(1)}s...`);
          await sleep(delay);
        }
      }
    }
    console.log(`   ↪️  Groq ${model} exhausted. Next model...`);
  }

  console.log(`   ❌ All Groq models failed. Last error: ${lastError?.message}`);
  return null;
}

// ---------------------------------------------------------------
// GEMINI CALLER — with retry + model fallback
// ---------------------------------------------------------------
async function callGemini(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.log('   ⚠️  GEMINI_API_KEY not set — skipping Gemini');
    return null;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  let lastError = null;

  for (let mi = 0; mi < GEMINI_MODELS.length; mi++) {
    const modelName = GEMINI_MODELS[mi];
    let model;
    try {
      model = genAI.getGenerativeModel({ model: modelName });
    } catch (e) {
      console.log(`   ⚠️  Cannot init ${modelName}: ${e.message}`);
      continue;
    }

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(`   🔵 [Gemini ${mi + 1}/${GEMINI_MODELS.length}] ${modelName} (attempt ${attempt}/3)`);
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        if (!text || text.trim().length < 20) throw new Error('Empty response');
        console.log(`   ✅ Gemini success with ${modelName}`);
        return text;
      } catch (err) {
        lastError = err;
        const msg = String(err.message || err);
        const isGone = /\b404\b/.test(msg) || /no longer available|not found|deprecated/i.test(msg);
        const isTransient =
          /\b(503|500|429)\b/.test(msg) ||
          /overloaded|high demand|unavailable|resource[_\s-]?exhausted/i.test(msg);

        if (isGone) { console.log(`   ❌ ${modelName} retired — skip`); break; }
        if (!isTransient) { console.log(`   ❌ ${modelName} non-retryable`); break; }
        if (attempt < 3) {
          const delay = Math.min(8000, Math.pow(2, attempt) * 1000) + Math.floor(Math.random() * 1000);
          console.log(`   ⚠️  Gemini overloaded. Retrying in ${(delay / 1000).toFixed(1)}s...`);
          await sleep(delay);
        }
      }
    }
    console.log(`   ↪️  Gemini ${modelName} exhausted. Next model...`);
  }

  console.log(`   ❌ All Gemini models failed. Last error: ${lastError?.message}`);
  return null;
}

// ---------------------------------------------------------------
// MASTER CALLER — Groq first, Gemini as backup
// ---------------------------------------------------------------
async function callLLM(prompt) {
  const groqResult = await callGroq(prompt);
  if (groqResult) return groqResult;

  console.log('   🔄 Groq failed. Switching to Gemini fallback...');
  const geminiResult = await callGemini(prompt);
  if (geminiResult) return geminiResult;

  throw new Error('All LLM providers failed');
}

// ---------------------------------------------------------------
// Generate blog post
// ---------------------------------------------------------------
async function generatePost(articles) {
  const newsDigest = articles.map((a, i) =>
    `${i + 1}. "${a.title}" (${a.source})\n   ${a.snippet}`
  ).join('\n\n');

  const bodyPrompt = `You are a financial journalist writing for BudgetPro, a Nigerian financial calculator site.

Below are the top financial news stories from Nigeria today:

${newsDigest}

Write a 700-800 word blog post that:

1. Opens with a compelling hook about the biggest story
2. Covers 3-4 of the most relevant stories with context
3. Explains what each story means for the average Nigerian
4. Includes specific numbers and data where available
5. Ends with 2-3 actionable takeaways for readers

CRITICAL RULES:
- Link to BudgetPro's calculators where relevant: mortgage.html, auto.html, construction.html, solar.html, business.html, income.html
- Use British/Nigerian English spelling
- Use Nigerian Naira (₦) for all currency amounts
- DO NOT invent statistics not present in the source articles
- Write in a clear, accessible tone — no financial jargon

Return ONLY the blog post body content in Markdown format. Do NOT include the title or metadata.`;

  console.log('🤖 Generating blog post body...');
  const body = await callLLM(bodyPrompt);

  const titlePrompt = `Write a single-line SEO-optimized blog post title (max 70 characters) for a Nigerian financial blog post based on these stories:

${articles.slice(0, 2).map(a => a.title).join('\n')}

Return ONLY the title. No quotes. No "Title:" prefix.`;

  console.log('🤖 Generating title...');
  const titleRaw = await callLLM(titlePrompt);
  const title = titleRaw.trim().replace(/^["']|["']$/g, '').split('\n')[0].slice(0, 100);

  return { title, body };
}

// ---------------------------------------------------------------
// Convert markdown to HTML
// ---------------------------------------------------------------
function markdownToHtml(md) {
  return md
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/^\- (.*$)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/\n\n/g, '</p><p>')
    .split('\n').filter(line => line.trim())
    .map(line => {
      if (line.startsWith('<h') || line.startsWith('<ul') || line.startsWith('<li')) return line;
      return `<p>${line}</p>`;
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
  body { font-family: 'Inter', sans-serif; background: #0a1628; color: #edf1f7; line-height: 1.75; margin: 0; padding: 0; }
  .wrap { max-width: 780px; margin: 0 auto; padding: 60px 24px 80px; }
  h1 { font-size: 36px; font-weight: 800; color: #f5a623; line-height: 1.2; margin: 0 0 16px; }
  h2 { font-size: 24px; font-weight: 700; margin-top: 36px; color: #edf1f7; border-left: 4px solid #f5a623; padding-left: 14px; }
  h3 { font-size: 18px; font-weight: 700; margin-top: 24px; color: #f5a623; }
  p { margin: 14px 0; color: #c8d0dd; }
  ul, ol { margin: 14px 0; padding-left: 22px; color: #c8d0dd; }
  li { margin: 6px 0; }
  strong { color: #edf1f7; }
  a { color: #f5a623; text-decoration: none; border-bottom: 1px solid #f5a623; }
  .meta { color: #5c6883; font-size: 13px; margin-bottom: 30px; }
  .sources { margin-top: 50px; padding: 20px; background: #0e1d34; border-radius: 10px; border: 1px solid #1c3358; }
  .sources h3 { margin-top: 0; color: #8a96ac; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }
  .sources ul { padding-left: 18px; }
  .sources li { font-size: 13.5px; }
  .nav { background: #0e1d34; padding: 16px 24px; border-bottom: 1px solid #1c3358; }
  .nav a { font-weight: 700; font-size: 15px; border: none; }
  .footer { text-align: center; color: #5c6883; font-size: 13px; margin-top: 60px; padding-top: 24px; border-top: 1px solid #1c3358; }
</style>
</head>
<body>
<div class="nav"><a href="index.html">← BudgetPro Home</a></div>
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
</html>`,
    title, date };
}

// ---------------------------------------------------------------
// Main
// ---------------------------------------------------------------
async function main() {
  console.log('📰 Fetching news...');
  const articles = await fetchNews();
  console.log(`   Found ${articles.length} relevant articles`);

  if (articles.length === 0) {
    console.log('No relevant articles found. Skipping.');
    return;
  }

  console.log('🤖 Generating blog post...');
  const { title, body } = await generatePost(articles);
  console.log(`   Title: ${title}`);

  const { slug, html } = buildHTML(title, body, articles);
  const outputPath = path.join('blog', `${slug}.html`);
  await fs.writeFile(outputPath, html, 'utf-8');
  console.log(`✅ Written: ${outputPath}`);

  const meta = { title, slug, date: new Date().toISOString(), articles: articles.length };
  const metaPath = path.join('blog', `${slug}.json`);
  await fs.writeFile(metaPath, JSON.stringify(meta, null, 2), 'utf-8');

  if (process.env.GITHUB_OUTPUT) {
    await fs.appendFile(process.env.GITHUB_OUTPUT, `slug=${slug}\ntitle=${title}\n`);
  }
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
