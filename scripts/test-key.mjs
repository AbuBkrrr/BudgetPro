import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('❌ GEMINI_API_KEY not set');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

// Try models in order of preference. First one that responds wins.
const MODELS = [
  'gemini-3.1-flash-lite',
  'gemini-3.5-flash',
  'gemini-3.8-flash',
  'gemini-2.5-flash-lite',
  'gemini-2.5-pro',
];

async function tryModel(model) {
  try {
    process.stdout.write(`  Trying ${model}... `);
    const response = await ai.models.generateContent({
      model,
      contents: 'Reply with exactly: OK',
    });
    console.log('✅');
    return { model, ok: true, text: response.text };
  } catch (err) {
    const msg = err.message || '';
    if (msg.includes('503') || msg.includes('high demand')) {
      console.log('⚠️  busy');
    } else if (msg.includes('404') || msg.includes('not found') || msg.includes('no longer available')) {
      console.log('❌ not available');
    } else if (msg.includes('429')) {
      console.log('⚠️  rate limited');
    } else {
      console.log('❌', msg.slice(0, 100));
    }
    return { model, ok: false };
  }
}

async function main() {
  console.log('Key prefix:', apiKey.slice(0, 6) + '...\n');
  console.log('Searching for an available model...\n');

  for (const model of MODELS) {
    const result = await tryModel(model);
    if (result.ok) {
      console.log(`\n✅ WORKING MODEL FOUND: ${result.model}`);
      console.log(`   Response: ${result.text.trim()}`);
      console.log(`\nUse this model in fetch-news.mjs and test-key.mjs.`);
      return;
    }
  }

  console.log('\n❌ No models responded. All are either busy or unavailable.');
  console.log('   This is a Google-side capacity issue. Wait 10-15 minutes and try again.');
  process.exit(1);
}

main();