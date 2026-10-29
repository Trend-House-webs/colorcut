/**
 * ColorCut - Cloudflare Worker Edge Handler
 * 
 * Production features:
 * 1. Permanent 301 redirect from HTTP to HTTPS preserving full pathname and query parameters.
 * 2. Dedicated, robust serving for /sitemap.xml (application/xml; charset=utf-8) and /robots.txt (text/plain; charset=utf-8).
 * 3. Real HTTP 404 response with branded 404 HTML, X-Robots-Tag: noindex, nofollow, and complete safety even if asset binding is missing.
 * 4. Edge proxy for /imgly-data/* streaming neural model files with CORS and Cache-Control headers.
 * 5. Production Security Headers for all HTML views (CSP, HSTS, nosniff, SAMEORIGIN, Permissions-Policy).
 */

export interface Env {
  ASSETS?: {
    fetch: (request: Request | string) => Promise<Response>;
  };
}

/**
 * Production Security Headers Configuration for HTML views
 */
const HTML_SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'SAMEORIGIN',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' blob: https://staticimgly.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https://color.cutfree.workers.dev",
    "connect-src 'self' blob: data: https://staticimgly.com https://fonts.googleapis.com https://fonts.gstatic.com",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "frame-ancestors 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join('; '),
};

function applyHtmlSecurityHeaders(headers: Headers, isHttps = true): void {
  for (const [key, val] of Object.entries(HTML_SECURITY_HEADERS)) {
    headers.set(key, val);
  }
  if (isHttps) {
    headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }
}

/**
 * Branded 404 HTML template embedded directly in the Worker to guarantee
 * genuine HTTP 404 rendering without ever throwing 'undefined fetch' errors.
 */
const BRANDED_404_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>404 — Page Not Found | ColorCut AI</title>
    <meta name="description" content="The page you requested could not be found. Return to ColorCut AI to remove image backgrounds and replace colors." />
    <meta name="robots" content="noindex, nofollow" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet" />
    <style>
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background-color: #FFFFFF; color: #111827; min-height: 100vh;
        display: flex; flex-direction: column; justify-content: space-between;
        -webkit-font-smoothing: antialiased;
      }
      header { border-bottom: 1px solid #E5E7EB; padding: 1rem 1.5rem; background: #FFFFFF; }
      .header-container { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
      .brand { display: flex; align-items: center; gap: 0.625rem; text-decoration: none; color: #111827; }
      .brand-icon { width: 36px; height: 36px; border-radius: 12px; background: #FFFFFF; border: 1px solid #E5E7EB; display: flex; align-items: center; justify-content: center; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04); }
      .brand-name { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 1.25rem; letter-spacing: -0.02em; }
      main { flex: 1; display: flex; align-items: center; justify-content: center; padding: 3rem 1.5rem; }
      .card { max-width: 540px; width: 100%; text-align: center; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 20px; padding: 2.75rem 2rem; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03); }
      .status-pill { display: inline-flex; align-items: center; gap: 0.375rem; padding: 0.35rem 0.85rem; border-radius: 9999px; background-color: #FEF2F2; border: 1px solid #FEE2E2; color: #DC2626; font-size: 0.8125rem; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 1.25rem; }
      h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2.25rem; font-weight: 700; line-height: 1.2; letter-spacing: -0.02em; color: #111827; margin-bottom: 0.875rem; }
      p { font-size: 1rem; line-height: 1.6; color: #4B5563; margin-bottom: 2rem; }
      .btn-primary { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; background-color: #4F46E5; color: #FFFFFF; font-weight: 600; font-size: 0.9375rem; padding: 0.75rem 1.5rem; border-radius: 12px; text-decoration: none; transition: background-color 0.15s ease, box-shadow 0.15s ease; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25); }
      .btn-primary:hover { background-color: #4338CA; box-shadow: 0 6px 16px rgba(79, 70, 229, 0.35); }
      .nav-links { margin-top: 1.75rem; padding-top: 1.5rem; border-top: 1px solid #F3F4F6; display: flex; justify-content: center; gap: 1.5rem; font-size: 0.875rem; }
      .nav-links a { color: #6B7280; text-decoration: none; transition: color 0.15s ease; }
      .nav-links a:hover { color: #111827; }
      footer { border-top: 1px solid #E5E7EB; padding: 1.5rem; text-align: center; font-size: 0.8125rem; color: #6B7280; background: #FFFFFF; }
    </style>
  </head>
  <body>
    <header>
      <div class="header-container">
        <a href="/" class="brand">
          <div class="brand-icon">
            <svg viewBox="0 0 128 128" width="26" height="26" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="logoBlueCyan" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#1E40AF" />
                  <stop offset="40%" stop-color="#2563EB" />
                  <stop offset="80%" stop-color="#0284C7" />
                  <stop offset="100%" stop-color="#06B6D4" />
                </linearGradient>
                <linearGradient id="logoMagentaOrange" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#9333EA" />
                  <stop offset="30%" stop-color="#DB2777" />
                  <stop offset="70%" stop-color="#EA580C" />
                  <stop offset="100%" stop-color="#F59E0B" />
                </linearGradient>
              </defs>
              <path d="M 64 22 C 40.8 22 22 40.8 22 64 C 22 87.2 40.8 106 64 106 C 72 106 79.5 103.7 85.8 99.8 L 76.5 83.5 C 72.8 85.7 68.6 87 64 87 C 51.3 87 41 76.7 41 64 C 41 51.3 51.3 41 64 41 C 72.2 41 79.4 45.3 83.4 51.8 L 98.2 40.5 C 90.7 29.2 78.2 22 64 22 Z" fill="url(#logoBlueCyan)" />
              <path d="M 76 44 C 55.5 44 39 60.5 39 81 C 39 101.5 55.5 118 76 118 C 96.5 118 113 101.5 113 81 L 94 81 C 94 91 85.9 99 76 99 C 66.1 99 58 90.9 58 81 C 58 71.1 66.1 63 76 63 C 83.5 63 89.8 67.6 92.5 74 L 111.5 74 C 107.5 56.6 93.3 44 76 44 Z" fill="url(#logoMagentaOrange)" />
            </svg>
          </div>
          <span class="brand-name">ColorCut</span>
        </a>
        <a href="/" class="btn-primary" style="padding: 0.5rem 1rem; font-size: 0.875rem;">Open Tool</a>
      </div>
    </header>
    <main>
      <div class="card">
        <div class="status-pill">HTTP 404 &bull; Not Found</div>
        <h1>Page Not Found</h1>
        <p>The page or URL you requested does not exist on ColorCut. Please check the address or return to the background remover tool.</p>
        <a href="/" class="btn-primary">Return to ColorCut Homepage &rarr;</a>
        <div class="nav-links">
          <a href="/how-it-works">How It Works</a>
          <a href="/about">About</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </div>
      </div>
    </main>
    <footer>
      &copy; 2026 ColorCut AI. All rights reserved. Client-side neural background removal.
    </footer>
  </body>
</html>`;

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      const url = new URL(request.url);

      // 1. Issue A: Permanent HTTP to HTTPS redirect (HTTP 301)
      const proto = request.headers.get('x-forwarded-proto') || url.protocol.replace(':', '');
      const cfVisitor = request.headers.get('cf-visitor');
      const isHttp = proto === 'http' || url.protocol === 'http:' || (cfVisitor && cfVisitor.includes('"scheme":"http"'));

      if (isHttp) {
        url.protocol = 'https:';
        url.port = '';
        return Response.redirect(url.toString(), 301);
      }

      // 2. Direct, reliable serving for /sitemap.xml with exact XML content-type and cache headers
      if (url.pathname === '/sitemap.xml') {
        let sitemapResponse: Response | null = null;
        if (env?.ASSETS?.fetch) {
          try {
            sitemapResponse = await env.ASSETS.fetch(request);
          } catch {
            sitemapResponse = null;
          }
        }

        if (sitemapResponse && (sitemapResponse.status === 200 || sitemapResponse.status === 304)) {
          const headers = new Headers(sitemapResponse.headers);
          headers.set('Content-Type', 'application/xml; charset=utf-8');
          headers.set('Cache-Control', 'public, max-age=3600, must-revalidate');
          headers.set('X-Content-Type-Options', 'nosniff');
          headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
          headers.delete('X-Robots-Tag');
          return new Response(sitemapResponse.body, {
            status: sitemapResponse.status,
            statusText: sitemapResponse.statusText,
            headers,
          });
        }
      }

      // 3. Direct, reliable serving for /robots.txt with exact text/plain content-type
      if (url.pathname === '/robots.txt') {
        let robotsResponse: Response | null = null;
        if (env?.ASSETS?.fetch) {
          try {
            robotsResponse = await env.ASSETS.fetch(request);
          } catch {
            robotsResponse = null;
          }
        }

        if (robotsResponse && (robotsResponse.status === 200 || robotsResponse.status === 304)) {
          const headers = new Headers(robotsResponse.headers);
          headers.set('Content-Type', 'text/plain; charset=utf-8');
          headers.set('Cache-Control', 'public, max-age=3600, must-revalidate');
          headers.set('X-Content-Type-Options', 'nosniff');
          headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
          return new Response(robotsResponse.body, {
            status: robotsResponse.status,
            statusText: robotsResponse.statusText,
            headers,
          });
        }
      }

      // 4. Production AI model proxy: route /imgly-data/* to official CDN
      if (url.pathname.startsWith('/imgly-data/')) {
        const assetSubPath = url.pathname.replace(/^\/imgly-data\//, '');
        const upstreamUrl = `https://staticimgly.com/@imgly/background-removal-data/1.7.0/dist/${assetSubPath}${url.search}`;
        
        try {
          const upstreamResponse = await fetch(upstreamUrl, {
            headers: {
              'User-Agent': request.headers.get('User-Agent') || 'ColorCut-Worker',
              'Accept': request.headers.get('Accept') || '*/*',
            },
          });

          const headers = new Headers(upstreamResponse.headers);
          headers.set('Access-Control-Allow-Origin', '*');
          headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
          headers.set('Cache-Control', 'public, max-age=31536000, immutable');
          headers.set('X-Content-Type-Options', 'nosniff');
          headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
          headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

          return new Response(upstreamResponse.body, {
            status: upstreamResponse.status,
            statusText: upstreamResponse.statusText,
            headers,
          });
        } catch (err) {
          return new Response(JSON.stringify({ error: 'Failed to fetch upstream model data', details: String(err) }), {
            status: 502,
            headers: {
              'Content-Type': 'application/json',
              'X-Content-Type-Options': 'nosniff',
              'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
            },
          });
        }
      }

      // 5. Fetch requested resource from static assets if available
      let response: Response | null = null;
      if (env?.ASSETS?.fetch) {
        try {
          response = await env.ASSETS.fetch(request);
        } catch {
          response = null;
        }
      }

      // If initial fetch returned 404, check clean informational routes
      if (response && response.status === 404 && env?.ASSETS?.fetch) {
        const trimmed = url.pathname.replace(/\/$/, '');
        if (['/privacy', '/terms', '/about', '/how-it-works'].includes(trimmed)) {
          const routeUrl = new URL(`${trimmed}/index.html`, request.url);
          try {
            response = await env.ASSETS.fetch(new Request(routeUrl.toString(), request));
          } catch {
            // Keep previous response
          }
        }
      }

      // If the asset exists and is found (200, 304, etc.)
      if (response && response.status !== 404) {
        const headers = new Headers(response.headers);
        const contentType = headers.get('content-type') || '';
        
        // Apply HTML security headers to HTML documents
        if (contentType.includes('text/html') || url.pathname === '/' || !url.pathname.includes('.')) {
          applyHtmlSecurityHeaders(headers, true);
        } else {
          headers.set('X-Content-Type-Options', 'nosniff');
          headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
        }

        const body = (response.status === 204 || response.status === 304 || request.method === 'HEAD') ? null : response.body;
        return new Response(body, {
          status: response.status,
          statusText: response.statusText,
          headers,
        });
      }

      // 6. Fix 1: Unknown route requested -> Return genuine HTTP 404 with branded 404 HTML
      // We safely try to fetch 404.html from assets, with guaranteed embedded fallback
      let notFoundHtml = BRANDED_404_HTML;
      if (env?.ASSETS?.fetch) {
        try {
          const notFoundUrl = new URL('/404.html', request.url);
          const notFoundAssetResponse = await env.ASSETS.fetch(new Request(notFoundUrl.toString(), request));
          if (notFoundAssetResponse.status === 200) {
            notFoundHtml = await notFoundAssetResponse.text();
          }
        } catch {
          notFoundHtml = BRANDED_404_HTML;
        }
      }

      const notFoundHeaders = new Headers();
      notFoundHeaders.set('Content-Type', 'text/html; charset=utf-8');
      notFoundHeaders.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      notFoundHeaders.set('X-Robots-Tag', 'noindex, nofollow');
      applyHtmlSecurityHeaders(notFoundHeaders, true);

      const notFoundBody = request.method === 'HEAD' ? null : notFoundHtml;
      return new Response(notFoundBody, {
        status: 404,
        statusText: 'Not Found',
        headers: notFoundHeaders,
      });
    } catch (err) {
      // Emergency safety net ensuring unhandled errors never throw Cloudflare 1101
      return new Response(`Server Error: ${err instanceof Error ? err.message : String(err)}`, {
        status: 500,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'X-Robots-Tag': 'noindex, nofollow',
        },
      });
    }
  },
};
