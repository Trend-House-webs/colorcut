/**
 * ColorCut - Cloudflare Worker Edge Handler
 * 
 * Features:
 * 1. Permanent 301 redirect from HTTP to HTTPS preserving full pathname and query parameters.
 * 2. Real HTTP 404 response with branded 404.html for any non-existent route or arbitrary path.
 * 3. Edge proxy for /imgly-data/* streaming neural model files with CORS and Cache-Control headers.
 * 4. Correct 200 serving for the homepage, robots.txt, sitemap.xml, and static assets.
 */

export interface Env {
  ASSETS: {
    fetch: (request: Request | string) => Promise<Response>;
  };
}

/**
 * Production Security Headers Configuration
 * - X-Content-Type-Options: nosniff prevents MIME sniffing attacks
 * - Referrer-Policy: strict-origin-when-cross-origin preserves privacy while retaining origin
 * - X-Frame-Options: SAMEORIGIN guards against clickjacking in legacy user-agents
 * - Permissions-Policy: restricts unnecessary device APIs (camera, microphone, geolocation)
 * - Content-Security-Policy: carefully configured to allow:
 *     * Inline scripts & font preloader (unsafe-inline)
 *     * WebAssembly SIMD ONNX inference (wasm-unsafe-eval)
 *     * Background Web Workers from blob URLs (worker-src blob:)
 *     * Model weights from local proxy and staticimgly CDN
 *     * Google Fonts stylesheets and woff2 font files
 *     * User photo uploads and canvas exports (blob:, data:)
 *     * Framing restriction (frame-ancestors 'self')
 * - Strict-Transport-Security: max-age=31536000; includeSubDomains; preload (enforced over HTTPS)
 */
const SECURITY_HEADERS: Record<string, string> = {
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

function withSecurityHeaders(response: Response, isHttps = true): Response {
  const headers = new Headers(response.headers);
  for (const [key, val] of Object.entries(SECURITY_HEADERS)) {
    headers.set(key, val);
  }
  if (isHttps) {
    headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }

  const body = (response.status === 204 || response.status === 304) ? null : response.body;
  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // 1. Issue A: Permanent HTTP to HTTPS redirect (HTTP 301)
    const proto = request.headers.get('x-forwarded-proto') || (url.protocol.replace(':', ''));
    if (proto === 'http' || url.protocol === 'http:') {
      url.protocol = 'https:';
      url.port = '';
      return Response.redirect(url.toString(), 301);
    }

    // 2. Production AI model proxy: route /imgly-data/* to official CDN
    // This guarantees that in production, model and wasm requests receive binary/json data, NEVER HTML!
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

    // 3. Fetch the requested resource from static assets
    let response = await env.ASSETS.fetch(request);

    // If initial fetch returned 404, check if this is a known clean informational route
    if (response.status === 404) {
      const trimmed = url.pathname.replace(/\/$/, '');
      if (['/privacy', '/terms', '/about', '/how-it-works'].includes(trimmed)) {
        const routeUrl = new URL(`${trimmed}/index.html`, request.url);
        response = await env.ASSETS.fetch(new Request(routeUrl.toString(), request));
      }
    }

    // If the asset exists and is found (200, 304, etc.), return with security headers
    if (response.status !== 404) {
      return withSecurityHeaders(response, true);
    }

    // 4. Issue B: Unknown route requested.
    // Return real HTTP 404 with 404.html content
    const notFoundUrl = new URL('/404.html', request.url);
    const notFoundResponse = await env.ASSETS.fetch(new Request(notFoundUrl.toString(), request));

    if (notFoundResponse.status === 200) {
      const headers = new Headers(notFoundResponse.headers);
      headers.set('Content-Type', 'text/html; charset=utf-8');
      headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      headers.set('X-Robots-Tag', 'noindex, nofollow');

      const custom404 = new Response(notFoundResponse.body, {
        status: 404,
        statusText: 'Not Found',
        headers,
      });
      return withSecurityHeaders(custom404, true);
    }

    // Fallback if 404.html is not found
    const fallback404 = new Response('404 Not Found', {
      status: 404,
      statusText: 'Not Found',
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    });
    return withSecurityHeaders(fallback404, true);
  },
};
