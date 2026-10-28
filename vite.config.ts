import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';

function statusAndRoutingPlugin(): Plugin {
  const notFoundHandler = (req: any, res: any, next: any) => {
    const rawUrl = req.url || '/';
    const parsedUrl = new URL(rawUrl, 'http://localhost');
    const pathname = parsedUrl.pathname;

    // 1. Issue A: Check for HTTP protocol via headers
    const proto = req.headers['x-forwarded-proto'];
    const host = req.headers['host'] || '';
    if (proto === 'http' && (host.includes('workers.dev') || host.includes('colorcut'))) {
      const httpsUrl = `https://${host}${rawUrl}`;
      res.writeHead(301, {
        Location: httpsUrl,
        'Content-Type': 'text/plain; charset=utf-8',
      });
      res.end(`301 Moved Permanently: Redirecting to ${httpsUrl}`);
      return;
    }

    // 2. Allow known valid routes and application paths:
    // - Root / homepage: '/' or '/index.html'
    // - Vite internal dev assets: starts with '/@', '/__', '/src/', '/node_modules/'
    // - Static assets proxy: starts with '/imgly-data/'
    if (
      pathname === '/' ||
      pathname === '/index.html' ||
      pathname.startsWith('/@') ||
      pathname.startsWith('/__') ||
      pathname.startsWith('/src/') ||
      pathname.startsWith('/node_modules/') ||
      pathname.startsWith('/imgly-data/')
    ) {
      return next();
    }

    // Check if the requested file exists in public/ or dist/
    const publicFilePath = path.resolve('public', pathname.replace(/^\//, ''));
    if (fs.existsSync(publicFilePath) && fs.statSync(publicFilePath).isFile()) {
      return next();
    }

    const distFilePath = path.resolve('dist', pathname.replace(/^\//, ''));
    if (fs.existsSync(distFilePath) && fs.statSync(distFilePath).isFile()) {
      return next();
    }

    // 3. Issue B: Unknown route requested.
    // Return genuine HTTP 404 with branded 404.html content
    const notFoundHtmlPath = path.resolve('public', '404.html');
    let notFoundContent = '<!doctype html><html><body><h1>404 Not Found</h1></body></html>';
    try {
      if (fs.existsSync(notFoundHtmlPath)) {
        notFoundContent = fs.readFileSync(notFoundHtmlPath, 'utf-8');
      }
    } catch {
      // fallback to default string
    }

    res.writeHead(404, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'X-Robots-Tag': 'noindex, nofollow',
    });
    res.end(notFoundContent);
  };

  return {
    name: 'status-and-routing-plugin',
    configureServer(server) {
      server.middlewares.use(notFoundHandler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(notFoundHandler);
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

