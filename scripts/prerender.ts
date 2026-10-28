import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App';
import { FAQ_ITEMS } from '../src/data/samples';
import { ViewState } from '../src/types';

interface PageConfig {
  path: string;
  view: ViewState;
  title: string;
  description: string;
  canonical: string;
  expectedH1: string;
}

const PRODUCTION_ORIGIN = 'https://color.cutfree.workers.dev';

const PAGES: PageConfig[] = [
  {
    path: '/',
    view: 'home',
    title: 'ColorCut AI — Free AI Background Remover & Color Changer',
    description: 'Instantly remove image backgrounds and replace them with clean, professional solid colors. Free, simple, and client-side processing.',
    canonical: `${PRODUCTION_ORIGIN}/`,
    expectedH1: 'Remove Backgrounds.',
  },
  {
    path: '/how-it-works',
    view: 'how-it-works',
    title: 'How ColorCut Works — In-Browser Background Removal & Color Changing',
    description: 'Step-by-step workflow guide to uploading images, running neural background segmentation, and exporting transparent PNGs or solid-color JPGs.',
    canonical: `${PRODUCTION_ORIGIN}/how-it-works`,
    expectedH1: 'How ColorCut Works',
  },
  {
    path: '/about',
    view: 'about',
    title: 'About ColorCut — In-Browser Background Removal Architecture',
    description: "Explore ColorCut's client-side architecture using ONNX Runtime, WebAssembly, and HTML5 Canvas for fast, private background removal.",
    canonical: `${PRODUCTION_ORIGIN}/about`,
    expectedH1: 'About ColorCut',
  },
  {
    path: '/privacy',
    view: 'privacy',
    title: 'Privacy Policy — ColorCut AI Background Remover',
    description: 'Learn how ColorCut isolates photos locally in your browser memory via WebAssembly with zero server uploads and zero tracking cookies.',
    canonical: `${PRODUCTION_ORIGIN}/privacy`,
    expectedH1: 'ColorCut Privacy Policy',
  },
  {
    path: '/terms',
    view: 'terms',
    title: 'Terms of Use — ColorCut AI Background Remover',
    description: "Terms of use, licensing, and acceptable use guidelines for ColorCut's free client-side image editing application.",
    canonical: `${PRODUCTION_ORIGIN}/terms`,
    expectedH1: 'ColorCut Terms of Use',
  },
];

async function prerenderAllPages() {
  console.log('⚡ Starting ColorCut static pages prerender pipeline...');

  const distIndexPath = path.resolve('dist', 'index.html');
  if (!fs.existsSync(distIndexPath)) {
    console.error('❌ dist/index.html not found! Run "vite build" first.');
    process.exit(1);
  }

  const baseHtmlTemplate = fs.readFileSync(distIndexPath, 'utf-8');
  const rootRegex = /<div id="root">[\s\S]*?<\/div>/;

  for (const page of PAGES) {
    console.log(`\n📄 Prerendering [${page.path}] (view: ${page.view})...`);

    // Render the React application in the specific view state
    const renderedApp = renderToString(React.createElement(App, { initialView: page.view } as any));

    // Verify exactly one primary H1 and expected heading content
    const h1Matches = renderedApp.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
    if (!h1Matches || h1Matches.length !== 1) {
      console.error(`❌ Page ${page.path} does not have exactly one H1 tag! Found: ${h1Matches ? h1Matches.length : 0}`);
      process.exit(1);
    }

    if (!h1Matches[0].includes(page.expectedH1)) {
      console.error(`❌ Page ${page.path} H1 does not contain expected text "${page.expectedH1}". Got: ${h1Matches[0]}`);
      process.exit(1);
    }
    console.log(`  ✓ Verified exactly 1 primary H1: "${page.expectedH1}"`);

    // Page-specific content validations
    if (page.view === 'home') {
      const allFaqsPresent = FAQ_ITEMS.every(faq => renderedApp.includes(faq.question) && renderedApp.includes(faq.answer));
      if (!allFaqsPresent) {
        console.error('❌ Homepage missing some FAQ items in prerender.');
        process.exit(1);
      }
      console.log('  ✓ Verified all 7 FAQ questions and answers in homepage markup');
    }

    // Replace metadata in HTML template
    let pageHtml = baseHtmlTemplate;

    // 1. Title tag
    pageHtml = pageHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${page.title}</title>`);

    // 2. Meta description
    pageHtml = pageHtml.replace(
      /<meta\s+name="description"\s+content="[^"]*"/i,
      `<meta name="description" content="${page.description}"`
    );

    // 3. Canonical link
    pageHtml = pageHtml.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"/i,
      `<link rel="canonical" href="${page.canonical}"`
    );

    // 4. OpenGraph tags
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:title"\s+content="[^"]*"/i,
      `<meta property="og:title" content="${page.title}"`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:description"\s+content="[^"]*"/i,
      `<meta property="og:description" content="${page.description}"`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:url"\s+content="[^"]*"/i,
      `<meta property="og:url" content="${page.canonical}"`
    );

    // 5. Twitter tags
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"/i,
      `<meta name="twitter:title" content="${page.title}"`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"/i,
      `<meta name="twitter:description" content="${page.description}"`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:url"\s+content="[^"]*"/i,
      `<meta name="twitter:url" content="${page.canonical}"`
    );

    // 6. Inject prerendered content into <div id="root">...</div>
    pageHtml = pageHtml.replace(rootRegex, `<div id="root">${renderedApp}</div>`);

    // Write file outputs
    if (page.path === '/') {
      fs.writeFileSync(distIndexPath, pageHtml, 'utf-8');
      console.log(`  ✓ Written to dist/index.html (${pageHtml.length} bytes)`);
    } else {
      const routeFolder = path.resolve('dist', page.path.slice(1));
      if (!fs.existsSync(routeFolder)) {
        fs.mkdirSync(routeFolder, { recursive: true });
      }
      const routeIndexPath = path.join(routeFolder, 'index.html');
      const flatHtmlPath = path.resolve('dist', `${page.path.slice(1)}.html`);

      fs.writeFileSync(routeIndexPath, pageHtml, 'utf-8');
      fs.writeFileSync(flatHtmlPath, pageHtml, 'utf-8');
      console.log(`  ✓ Written to dist${page.path}/index.html and dist${page.path}.html (${pageHtml.length} bytes)`);
    }
  }

  console.log('\n🎉 Prerendering completed successfully for all 5 public routes!');
}

prerenderAllPages().catch(err => {
  console.error('❌ Prerendering failed:', err);
  process.exit(1);
});
