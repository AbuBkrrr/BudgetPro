// scripts/update-blog-index.mjs
// Reads all blog/*.json files and regenerates blog.html index page.

import fs from 'fs/promises';
import path from 'path';

async function main() {
  const blogDir = 'blog';
  let files;
  try {
    files = await fs.readdir(blogDir);
  } catch {
    console.log('No blog directory found. Skipping.');
    return;
  }

  const posts = [];
  for (const file of files) {
    if (!file.endsWith('.json')) continue;
    try {
      const raw = await fs.readFile(path.join(blogDir, file), 'utf-8');
      const meta = JSON.parse(raw);
      posts.push(meta);
    } catch (err) {
      console.warn(`Skipping ${file}: ${err.message}`);
    }
  }

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  const cards = posts.map(p => `
    <a href="blog/${p.slug}.html" class="post-card">
      <div class="post-date">${new Date(p.date).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
      <h3>${p.title}</h3>
      <span class="read-more">Read article →</span>
    </a>
  `).join('\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>BudgetPro Blog — Nigerian Financial News & Insights</title>
<meta name="description" content="Daily insights on Nigerian mortgages, auto costs, construction, solar, business and personal finance — with free calculators.">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  body { font-family: 'Inter', sans-serif; background: #0a1628; color: #edf1f7; margin: 0; padding: 0; }
  .wrap { max-width: 900px; margin: 0 auto; padding: 60px 24px 80px; }
  h1 { font-size: 40px; font-weight: 800; color: #edf1f7; margin: 0 0 10px; }
  h1 span { color: #f5a623; }
  .lede { color: #8a96ac; font-size: 17px; margin-bottom: 44px; }
  .post-card { display: block; background: #0e1d34; border: 1px solid #1c3358; border-radius: 14px; padding: 26px 28px; margin-bottom: 20px; text-decoration: none; color: inherit; transition: transform .15s, border-color .15s; }
  .post-card:hover { transform: translateY(-3px); border-color: #f5a623; }
  .post-date { color: #5c6883; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
  .post-card h3 { font-size: 22px; font-weight: 700; color: #edf1f7; margin: 0 0 10px; }
  .read-more { color: #f5a623; font-weight: 600; font-size: 14px; }
  .nav { background: #0e1d34; padding: 16px 24px; border-bottom: 1px solid #1c3358; }
  .nav a { color: #f5a623; font-weight: 700; font-size: 15px; text-decoration: none; }
  .footer { text-align: center; color: #5c6883; font-size: 13px; margin-top: 60px; padding-top: 24px; border-top: 1px solid #1c3358; }
  .empty { text-align: center; color: #5c6883; padding: 40px 0; }
</style>
</head>
<body>
<div class="nav"><a href="index.html">← BudgetPro Home</a></div>
<div class="wrap">
<h1>BudgetPro <span>Blog</span></h1>
<p class="lede">Daily insights on Nigerian mortgages, auto costs, construction, solar, and personal finance.</p>
${posts.length ? cards : '<div class="empty">No posts yet. Check back soon.</div>'}
<div class="footer">© ${new Date().getFullYear()} BudgetPro — Know the True Cost. Avoid the Traps.</div>
</div>
</body>
</html>`;

  await fs.writeFile('blog.html', html, 'utf-8');
  console.log(`✅ blog.html regenerated with ${posts.length} posts`);
}

main().catch(err => { console.error(err); process.exit(1); });