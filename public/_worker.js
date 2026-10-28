/**
 * ColorCut - Cloudflare Pages / Workers static edge entry point (_worker.js)
 */
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

        return new Response(upstreamResponse.body, {
          status: upstreamResponse.status,
          statusText: upstreamResponse.statusText,
          headers,
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: 'Failed to fetch upstream model data', details: String(err) }), {
          status: 502,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    // 3. Fetch requested asset from ASSETS binding
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) {
      return response;
    }

    // 4. Issue B: Return genuine HTTP 404 for unknown routes
    const notFoundUrl = new URL('/404.html', request.url);
    const notFoundResponse = await env.ASSETS.fetch(new Request(notFoundUrl.toString(), request));

    if (notFoundResponse.status === 200) {
      const headers = new Headers(notFoundResponse.headers);
      headers.set('Content-Type', 'text/html; charset=utf-8');
      headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      headers.set('X-Robots-Tag', 'noindex, nofollow');

      return new Response(notFoundResponse.body, {
        status: 404,
        statusText: 'Not Found',
        headers,
      });
    }

    return new Response('404 Not Found', {
      status: 404,
      statusText: 'Not Found',
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    });
  },
};
