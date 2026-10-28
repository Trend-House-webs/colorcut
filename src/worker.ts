/**
 * ColorCut - Cloudflare Worker Edge Handler
 * 
 * Production features:
 * 1. Permanent 301 redirect from HTTP to HTTPS preserving full pathname and query parameters.
 * 2. Dedicated, robust serving for /sitemap.xml (application/xml; charset=utf-8) and /robots.txt (text/plain; charset=utf-8).
 * 3. Real HTTP 404 response with branded 404.html and X-Robots-Tag: noindex, nofollow for any unknown route.
 * 4. Edge proxy for /imgly-data/* streaming neural model files with CORS and Cache-Control headers.
 * 5. Production Security Headers for all HTML views (CSP, HSTS, nosniff, SAMEORIGIN, Permissions-Policy).
 */

export interface Env {
  ASSETS: {
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
        const sitemapResponse = await env.ASSETS.fetch(request);
        if (sitemapResponse.status === 200 || sitemapResponse.status === 304) {
          const headers = new Headers(sitemapResponse.headers);
          headers.set('Content-Type', 'application/xml; charset=utf-8');
          headers.set('Cache-Control', 'public, max-age=3600, must-revalidate');
          headers.set('X-Content-Type-Options', 'nosniff');
          headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
          // Explicitly ensure no conflicting framing/CSP or noindex headers interfere with search engines
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
        const robotsResponse = await env.ASSETS.fetch(request);
        if (robotsResponse.status === 200 || robotsResponse.status === 304) {
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

      // 5. Fetch requested resource from static assets
      let response = await env.ASSETS.fetch(request);

      // If initial fetch returned 404, check clean informational routes
      if (response.status === 404) {
        const trimmed = url.pathname.replace(/\/$/, '');
        if (['/privacy', '/terms', '/about', '/how-it-works'].includes(trimmed)) {
          const routeUrl = new URL(`${trimmed}/index.html`, request.url);
          response = await env.ASSETS.fetch(new Request(routeUrl.toString(), request));
        }
      }

      // If the asset exists and is found (200, 304, etc.)
      if (response.status !== 404) {
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

      // 6. Issue B: Unknown route requested -> Return real HTTP 404 with 404.html content
      const notFoundUrl = new URL('/404.html', request.url);
      const notFoundResponse = await env.ASSETS.fetch(new Request(notFoundUrl.toString(), request));

      const notFoundHeaders = new Headers(notFoundResponse.headers);
      notFoundHeaders.set('Content-Type', 'text/html; charset=utf-8');
      notFoundHeaders.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      notFoundHeaders.set('X-Robots-Tag', 'noindex, nofollow');
      applyHtmlSecurityHeaders(notFoundHeaders, true);

      const notFoundBody = request.method === 'HEAD' ? null : notFoundResponse.body;
      return new Response(notFoundBody, {
        status: 404,
        statusText: 'Not Found',
        headers: notFoundHeaders,
      });
    } catch (err) {
      // Safety net to ensure unhandled errors never result in an unformatted Cloudflare 1101 crash
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
