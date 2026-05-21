import { fileURLToPath, URL } from 'node:url';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// Dev-only stub for /api/unsplash. The production endpoint at api/unsplash.js
// hits Unsplash with UNSPLASH_ACCESS_KEY; locally we don't have that key, so
// we proxy to LoremFlickr — which returns Creative Commons Flickr photos
// matching the query keywords (Picsum, the obvious alternative, ignores
// keywords entirely and was returning unrelated landscape shots).
function unsplashPlaceholderPlugin(): Plugin {
  // Deterministic hash → stable image per query within a session.
  const hash = (s: string) => {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = ((h * 31 + s.charCodeAt(i)) | 0) >>> 0;
    return h;
  };

  return {
    name: 'unsplash-placeholder',
    configureServer(server) {
      server.middlewares.use('/api/unsplash', (req, res) => {
        const fullUrl = new URL(`http://localhost${req.originalUrl ?? req.url ?? ''}`);
        const q = fullUrl.searchParams.get('q') ?? 'placeholder';

        // LoremFlickr takes comma-separated keywords. Strip filler words that
        // hurt match quality (the vanilla queries include "tv show scene" etc.,
        // which LoremFlickr can't usefully match) and keep the first 4.
        const stopWords = new Set([
          'tv', 'show', 'scene', 'host', 'television', 'a', 'the', 'and', 'or',
        ]);
        const keywords = q
          .toLowerCase()
          .replace(/[^a-z0-9\s&]/g, ' ')
          .split(/\s+/)
          .filter((w) => w && !stopWords.has(w))
          .slice(0, 4)
          .join(',') || 'food';

        const lock = hash(q);
        const payload = {
          url: `https://loremflickr.com/800/450/${keywords}?lock=${lock}`,
          thumb: `https://loremflickr.com/400/225/${keywords}?lock=${lock}`,
          alt: q,
          credit: 'LoremFlickr (dev placeholder, CC photos from Flickr)',
          creditLink: 'https://loremflickr.com/',
        };
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(JSON.stringify(payload));
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), unsplashPlaceholderPlugin()],
  resolve: {
    // `@/` → src/ so imports stay clean across the feature-based folders.
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  server: {
    port: 3000,
    strictPort: true,
  },
});
