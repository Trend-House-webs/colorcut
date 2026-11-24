import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App';
import { SITE_ORIGIN } from '../src/config';
import { FAQ_ITEMS } from '../src/data/samples';
import { ViewState } from '../src/types';

interface PageConfig {
  path: string;
  view: ViewState;
  title: string;
  description: string;
  canonical: string;
  expectedH1: string;
  breadcrumb?: { name: string; url: string }[];
}

const PAGES: PageConfig[] = [
  {
    path: '/',
    view: 'home',
    title: 'Free AI Background Remover & Color Changer — CutColor',
    description: 'Remove image backgrounds online for free, download a transparent PNG, or add a solid-color background. No account or watermark required.',
    canonical: `${SITE_ORIGIN}/`,
    expectedH1: 'Free AI Background Remover',
  },
  {
    path: '/how-it-works',
    view: 'how-it-works',
    title: 'How to Remove a Background from an Image Online — CutColor',
    description: 'Learn how to remove an image background, create a transparent PNG, and add a solid-color background in your browser.',
    canonical: `${SITE_ORIGIN}/how-it-works`,
    expectedH1: 'How to Remove a Background from an Image Online',
    breadcrumb: [
      { name: 'Home', url: `${SITE_ORIGIN}/` },
      { name: 'How It Works', url: `${SITE_ORIGIN}/how-it-works` },
    ],
  },
  {
    path: '/about',
    view: 'about',
    title: 'About CutColor — Private In-Browser Background Removal',
    description: "Explore CutColor's client-side architecture using ONNX Runtime, WebAssembly, and HTML5 Canvas for fast, private background removal.",
    canonical: `${SITE_ORIGIN}/about`,
    expectedH1: 'About CutColor',
    breadcrumb: [
      { name: 'Home', url: `${SITE_ORIGIN}/` },
      { name: 'About', url: `${SITE_ORIGIN}/about` },
    ],
  },
  {
    path: '/contact',
    view: 'contact',
    title: 'Contact Us — CutColor Support & Feedback',
    description: 'Contact the CutColor team for technical support, bug reports, and questions about our client-side AI background remover.',
    canonical: `${SITE_ORIGIN}/contact`,
    expectedH1: 'Contact Us',
    breadcrumb: [
      { name: 'Home', url: `${SITE_ORIGIN}/` },
      { name: 'Contact', url: `${SITE_ORIGIN}/contact` },
    ],
  },
  {
    path: '/privacy',
    view: 'privacy',
    title: 'Privacy Policy — CutColor AI Background Remover',
    description: 'Learn how CutColor isolates photos locally in your browser memory via WebAssembly with zero server uploads and zero tracking cookies.',
    canonical: `${SITE_ORIGIN}/privacy`,
    expectedH1: 'CutColor Privacy Policy',
    breadcrumb: [
      { name: 'Home', url: `${SITE_ORIGIN}/` },
      { name: 'Privacy Policy', url: `${SITE_ORIGIN}/privacy` },
    ],
  },
  {
    path: '/terms',
    view: 'terms',
    title: 'Terms of Use — CutColor AI Background Remover',
    description: "Terms of use, licensing, and acceptable use guidelines for CutColor's free client-side image editing application.",
    canonical: `${SITE_ORIGIN}/terms`,
    expectedH1: 'CutColor Terms of Use',
    breadcrumb: [
      { name: 'Home', url: `${SITE_ORIGIN}/` },
      { name: 'Terms of Use', url: `${SITE_ORIGIN}/terms` },
    ],
  },
  {
    path: '/how-to-make-a-background-transparent',
    view: 'transparent-png-guide',
    title: 'How to Make an Image Background Transparent Online — CutColor',
    description: "Learn how to remove an image background online and download a transparent PNG using CutColor's browser-based tool.",
    canonical: `${SITE_ORIGIN}/how-to-make-a-background-transparent`,
    expectedH1: 'How to Make an Image Background Transparent',
    breadcrumb: [
      { name: 'Home', url: `${SITE_ORIGIN}/` },
      { name: 'How It Works', url: `${SITE_ORIGIN}/how-it-works` },
      { name: 'Transparent PNG Guide', url: `${SITE_ORIGIN}/how-to-make-a-background-transparent` },
    ],
  },
  {
    path: '/white-background-for-product-photos',
    view: 'white-background-guide',
    title: 'Make a Product Photo Background White Online — CutColor',
    description: "Remove a product photo's background and give it a solid white background with CutColor's browser-based image tool.",
    canonical: `${SITE_ORIGIN}/white-background-for-product-photos`,
    expectedH1: 'Make Product Photo Backgrounds White Online',
    breadcrumb: [
      { name: 'Home', url: `${SITE_ORIGIN}/` },
      { name: 'How It Works', url: `${SITE_ORIGIN}/how-it-works` },
      { name: 'White Background for Product Photos', url: `${SITE_ORIGIN}/white-background-for-product-photos` },
    ],
  },
  {
    path: '/change-photo-background-color',
    view: 'change-color-guide',
    title: 'Change a Photo Background Color Online — CutColor',
    description: 'Remove an image background and choose a solid background color online with CutColor. Preview your result and download the finished image.',
    canonical: `${SITE_ORIGIN}/change-photo-background-color`,
    expectedH1: 'Change a Photo Background Color Online',
    breadcrumb: [
      { name: 'Home', url: `${SITE_ORIGIN}/` },
      { name: 'How It Works', url: `${SITE_ORIGIN}/how-it-works` },
      { name: 'Change Photo Background Color', url: `${SITE_ORIGIN}/change-photo-background-color` },
    ],
  },
];

async function prerenderAllPages() {
  console.log('⚡ Starting CutColor static pages prerender pipeline...');

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
      const normalizedHtml = renderedApp
        .replace(/&#x27;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&');
      const allFaqsPresent = FAQ_ITEMS.every(
        faq => normalizedHtml.includes(faq.question) && normalizedHtml.includes(faq.answer)
      );
      if (!allFaqsPresent) {
        console.error('❌ Homepage missing some FAQ items in prerender.');
        process.exit(1);
      }
      console.log(`  ✓ Verified all ${FAQ_ITEMS.length} FAQ questions and answers in homepage markup`);
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

    // 6. Schema.org Structured Data: Inject BreadcrumbList for supporting pages
    if (page.breadcrumb && page.breadcrumb.length > 0) {
      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': page.breadcrumb.map((item, idx) => ({
          '@type': 'ListItem',
          'position': idx + 1,
          'name': item.name,
          'item': item.url,
        })),
      };
      const jsonLdString = JSON.stringify(breadcrumbSchema, null, 2);
      pageHtml = pageHtml.replace(
        /<script type="application\/ld\+json">[\s\S]*?<\/script>/i,
        `<script type="application/ld+json">\n${jsonLdString}\n    </script>`
      );
    }

    // Validate JSON-LD syntax on every prerendered page
    const jsonLdMatches = pageHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi) || [];
    for (const block of jsonLdMatches) {
      const inner = block.replace(/<script type="application\/ld\+json">/i, '').replace(/<\/script>/i, '').trim();
      JSON.parse(inner);
    }
    console.log(`  ✓ Validated ${jsonLdMatches.length} JSON-LD structured data block(s)`);

    // 7. Inject prerendered content into <div id="root">...</div>
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

  console.log(`\n🎉 Prerendering completed successfully for all ${PAGES.length} public routes!`);
}

prerenderAllPages().catch(err => {
  console.error('❌ Prerendering failed:', err);
  process.exit(1);
});
