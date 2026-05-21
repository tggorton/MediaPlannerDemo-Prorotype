// Build a LoremFlickr placeholder response (keyword-matched CC Flickr photos).
// Mirrors the Vite dev middleware (see vite.config.ts) so deployed images match
// the local experience without needing an Unsplash key. Used when no key is
// configured, or when a real Unsplash lookup returns nothing / errors.
function loremFlickr(q) {
  const stopWords = new Set(['tv', 'show', 'scene', 'host', 'television', 'a', 'the', 'and', 'or']);
  const keywords =
    q
      .toLowerCase()
      .replace(/[^a-z0-9\s&]/g, ' ')
      .split(/\s+/)
      .filter((w) => w && !stopWords.has(w))
      .slice(0, 4)
      .join(',') || 'food';
  let h = 0;
  for (let i = 0; i < q.length; i++) h = ((h * 31 + q.charCodeAt(i)) | 0) >>> 0;
  return {
    url: `https://loremflickr.com/800/450/${keywords}?lock=${h}`,
    thumb: `https://loremflickr.com/400/225/${keywords}?lock=${h}`,
    alt: q,
    credit: 'LoremFlickr (CC photos from Flickr)',
    creditLink: 'https://loremflickr.com/',
  };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Missing query param q' });

  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) return res.status(200).json(loremFlickr(q));

  try {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(q)}&per_page=1&orientation=landscape&client_id=${key}`;
    const r = await fetch(url);
    const data = await r.json();
    const photo = data.results && data.results[0];
    if (!photo) return res.status(200).json(loremFlickr(q));
    res.status(200).json({
      url: photo.urls.regular,
      thumb: photo.urls.small,
      alt: photo.alt_description || q,
      credit: photo.user.name,
      creditLink: photo.user.links.html + '?utm_source=kerv_platform&utm_medium=referral',
    });
  } catch {
    res.status(200).json(loremFlickr(q));
  }
}
