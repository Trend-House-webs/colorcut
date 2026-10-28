import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App';
import { FAQ_ITEMS } from '../src/data/samples';

async function prerenderHomepage() {
  console.log('⚡ Starting ColorCut static homepage prerender...');

  const distIndexPath = path.resolve('dist', 'index.html');
  if (!fs.existsSync(distIndexPath)) {
    console.error('❌ dist/index.html not found! Run "vite build" first.');
    process.exit(1);
  }

  const rawHtml = fs.readFileSync(distIndexPath, 'utf-8');

  // Render the full React application in its initial 'home' state
  const renderedApp = renderToString(React.createElement(App));

  // Verify critical content elements in the rendered markup
  const checks = [
    { name: 'Primary H1 tag', test: renderedApp.includes('<h1') && renderedApp.includes('Remove Backgrounds.') },
    { name: 'Instructions (How It Works)', test: renderedApp.includes('How ColorCut Works') && renderedApp.includes('Upload an Image') },
    { name: 'Supported formats metadata', test: renderedApp.includes('JPG, PNG, WebP') && renderedApp.includes('Max 10MB') },
    { name: 'All FAQ questions', test: FAQ_ITEMS.every(faq => renderedApp.includes(faq.question)) },
    { name: 'All FAQ answers', test: FAQ_ITEMS.every(faq => renderedApp.includes(faq.answer)) },
    { name: 'Crawlable section links', test: renderedApp.includes('href="#how-it-works"') && renderedApp.includes('href="#faq"') },
  ];

  let allPassed = true;
  for (const check of checks) {
    if (check.test) {
      console.log(`  ✓ Verified: ${check.name}`);
    } else {
      console.error(`  ✗ Missing in render: ${check.name}`);
      allPassed = false;
    }
  }

  if (!allPassed) {
    console.error('❌ Prerender content validation failed.');
    process.exit(1);
  }

  // Inject rendered HTML into <div id="root">...</div> using resilient regex
  const rootRegex = /<div id="root">[\s\S]*?<\/div>/;
  if (!rootRegex.test(rawHtml)) {
    console.error('❌ Target <div id="root"></div> not found in dist/index.html');
    process.exit(1);
  }

  const prerenderedDistHtml = rawHtml.replace(rootRegex, `<div id="root">${renderedApp}</div>`);
  fs.writeFileSync(distIndexPath, prerenderedDistHtml, 'utf-8');
  console.log(`✅ Successfully prerendered homepage HTML into dist/index.html (${prerenderedDistHtml.length} bytes)`);

  // Also synchronize root index.html so local dev and direct crawls immediately receive prerendered content
  const rootIndexPath = path.resolve('index.html');
  if (fs.existsSync(rootIndexPath)) {
    const rawRootHtml = fs.readFileSync(rootIndexPath, 'utf-8');
    if (rootRegex.test(rawRootHtml)) {
      const prerenderedRootHtml = rawRootHtml.replace(rootRegex, `<div id="root">${renderedApp}</div>`);
      fs.writeFileSync(rootIndexPath, prerenderedRootHtml, 'utf-8');
      console.log(`✅ Also synchronized prerendered HTML into root index.html (${prerenderedRootHtml.length} bytes)`);
    }
  }
}

prerenderHomepage().catch(err => {
  console.error('❌ Error during prerender:', err);
  process.exit(1);
});
