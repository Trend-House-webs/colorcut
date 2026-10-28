import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';

function statusAndRoutingPlugin(): Plugin {
  const getSecurityHeaders = (req: any): Record<string, string> => {
    const proto = req.headers['x-forwarded-proto'];
    const host = req.headers['host'] || '';

    const headers: Record<string, string> = {
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
    };

    if (proto === 'https' || host.includes('workers.dev')) {
      headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains; preload';
      headers['X-Frame-Options'] = 'SAMEORIGIN';
    }

    return headers;
  };

  const devHandler = (req: any, res: any, next: any) => {
    const rawUrl = req.url || '/';
    const parsedUrl = new URL(rawUrl, 'http://localhost');
    const pathname = parsedUrl.pathname;
    const proto = req.headers['x-forwarded-proto'];
    const host = req.headers['host'] || '';

    const securityHeaders = getSecurityHeaders(req);
    for (const [k, v] of Object.entries(securityHeaders)) {
      res.setHeader(k, v);
    }

    // 1. Issue A: Check for HTTP protocol via headers
    if (proto === 'http' && (host.includes('workers.dev') || host.includes('colorcut'))) {
      const httpsUrl = `https://${host}${rawUrl}`;
      res.writeHead(301, {
        Location: httpsUrl,
        'Content-Type': 'text/plain; charset=utf-8',
        ...securityHeaders,
      });
      res.end(`301 Moved Permanently: Redirecting to ${httpsUrl}`);
      return;
    }

    // 2. In Vite dev server, allow all valid application routes and internal assets to be transformed natively
    const trimmedPath = pathname.replace(/\/$/, '') || '/';
    const validPublicRoutes = ['/', '/index.html', '/privacy', '/terms', '/about', '/how-it-works'];

    if (
      validPublicRoutes.includes(trimmedPath) ||
      pathname.startsWith('/@') ||
      pathname.startsWith('/__') ||
      pathname.startsWith('/src/') ||
      pathname.startsWith('/node_modules/') ||
      pathname.startsWith('/imgly-data/') ||
      pathname.startsWith('/assets/') ||
      pathname.startsWith('/favicon')
    ) {
      return next();
    }

    // Check if the requested file exists in public/
    const publicFilePath = path.resolve('public', pathname.replace(/^\//, ''));
    if (fs.existsSync(publicFilePath) && fs.statSync(publicFilePath).isFile()) {
      return next();
    }

    // 3. Issue B: Unknown route requested -> Return genuine HTTP 404
    const notFoundHtmlPath = path.resolve('public', '404.html');
    let notFoundContent = '<!doctype html><html><body><h1>404 Not Found</h1></body></html>';
    try {
      if (fs.existsSync(notFoundHtmlPath)) {
        notFoundContent = fs.readFileSync(notFoundHtmlPath, 'utf-8');
      }
    } catch {}

    res.writeHead(404, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'X-Robots-Tag': 'noindex, nofollow',
      ...securityHeaders,
    });
    res.end(notFoundContent);
  };

  const previewHandler = (req: any, res: any, next: any) => {
    const rawUrl = req.url || '/';
    const parsedUrl = new URL(rawUrl, 'http://localhost');
    const pathname = parsedUrl.pathname;
    const proto = req.headers['x-forwarded-proto'];
    const host = req.headers['host'] || '';

    const securityHeaders = getSecurityHeaders(req);
    for (const [k, v] of Object.entries(securityHeaders)) {
      res.setHeader(k, v);
    }

    if (proto === 'http' && (host.includes('workers.dev') || host.includes('colorcut'))) {
      const httpsUrl = `https://${host}${rawUrl}`;
      res.writeHead(301, {
        Location: httpsUrl,
        'Content-Type': 'text/plain; charset=utf-8',
        ...securityHeaders,
      });
      res.end(`301 Moved Permanently: Redirecting to ${httpsUrl}`);
      return;
    }

    const trimmedPath = pathname.replace(/\/$/, '') || '/';
    const validPublicRoutes = ['/', '/index.html', '/privacy', '/terms', '/about', '/how-it-works'];

    // In preview mode, serve prerendered clean routes
    if (['/privacy', '/terms', '/about', '/how-it-works'].includes(trimmedPath)) {
      const distRoutePath = path.resolve('dist', trimmedPath.slice(1), 'index.html');
      if (fs.existsSync(distRoutePath)) {
        const content = fs.readFileSync(distRoutePath, 'utf-8');
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=utf-8',
          ...securityHeaders,
        });
        res.end(content);
        return;
      }
    }

    // Check if file exists in dist/ or public/
    const distFilePath = path.resolve('dist', pathname.replace(/^\//, ''));
    if (fs.existsSync(distFilePath) && fs.statSync(distFilePath).isFile()) {
      return next();
    }

    const publicFilePath = path.resolve('public', pathname.replace(/^\//, ''));
    if (fs.existsSync(publicFilePath) && fs.statSync(publicFilePath).isFile()) {
      return next();
    }

    if (validPublicRoutes.includes(trimmedPath) || pathname.startsWith('/imgly-data/')) {
      return next();
    }

    // Unknown route in preview -> genuine 404
    const notFoundHtmlPath = path.resolve('public', '404.html');
    let notFoundContent = '<!doctype html><html><body><h1>404 Not Found</h1></body></html>';
    try {
      if (fs.existsSync(notFoundHtmlPath)) {
        notFoundContent = fs.readFileSync(notFoundHtmlPath, 'utf-8');
      }
    } catch {}

    res.writeHead(404, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'X-Robots-Tag': 'noindex, nofollow',
      ...securityHeaders,
    });
    res.end(notFoundContent);
  };

  return {
    name: 'status-and-routing-plugin',
    configureServer(server) {
      server.middlewares.use(devHandler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(previewHandler);
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), statusAndRoutingPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname ?? '.', '.'),
      },
    },
    server: {
      proxy: {
        '/imgly-data': {
          target: 'https://staticimgly.com/@imgly/background-removal-data/1.7.0/dist',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/imgly-data/, ''),
        },
      },
      allowedHosts: true,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
              return 'vendor-react';
            }
          },
        },
      },
    },
  };
});

