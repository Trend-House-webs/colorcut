/**
 * ColorCut - Cloudflare Pages / Workers static edge entry point (_worker.js)
 */
const SECURITY_HEADERS = {
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

function withSecurityHeaders(response, isHttps = true) {
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
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. Issue A: Permanent HTTP to HTTPS redirect (HTTP 301)
    const proto = request.headers.get('x-forwarded-proto') || (url.protocol.replace(':', ''));
    if (proto === 'http' || url.protocol === 'http:') {
      url.protocol = 'https:';
      url.port = '';
      return Response.redirect(url.toString(), 301);
    }

    // 2. Production AI model proxy: route /imgly-data/* to official CDN
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

    // 3. Fetch requested asset from ASSETS binding
    let response = await env.ASSETS.fetch(request);

    // If initial fetch returned 404, check if this is a known clean informational route
    if (response.status === 404) {
      const trimmed = url.pathname.replace(/\/$/, '');
      if (['/privacy', '/terms', '/about', '/how-it-works'].includes(trimmed)) {
        const routeUrl = new URL(`${trimmed}/index.html`, request.url);
        response = await env.ASSETS.fetch(new Request(routeUrl.toString(), request));
      }
    }

    if (response.status !== 404) {
      return withSecurityHeaders(response, true);
    }

    // 4. Issue B: Return genuine HTTP 404 for unknown routes
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
