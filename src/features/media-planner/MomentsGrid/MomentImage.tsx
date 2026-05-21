import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { TV_QUERIES, imageCache, momentFallbackSrc } from './momentImages';

// The card's media thumbnail. Fetches the runtime image, falls back to a
// bundled image on failure, and finally to the video icon.
export function MomentImage({ name }: { name: string }) {
  const [src, setSrc] = useState<string | undefined>(() => imageCache.get(name));
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (imageCache.has(name)) {
      setSrc(imageCache.get(name));
      return;
    }
    let alive = true;
    const query = TV_QUERIES[name] || `${name} television show scene`;
    fetch(`/api/unsplash?q=${encodeURIComponent(query)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data) => {
        if (!data?.thumb || !alive) return;
        imageCache.set(name, data.thumb);
        setSrc(data.thumb);
      })
      .catch(() => {
        if (alive) setSrc(momentFallbackSrc(name)); // bundled fallback
      });
    return () => {
      alive = false;
    };
  }, [name]);

  return (
    <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {src && !failed ? (
        <Box
          component="img"
          src={src}
          alt=""
          onError={() => {
            const fb = momentFallbackSrc(name);
            if (src !== fb) setSrc(fb); // try bundled image before giving up
            else setFailed(true);
          }}
          sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <VideoLibraryIcon sx={{ fontSize: 22, color: 'var(--faint)', opacity: 0.4 }} />
      )}
    </Box>
  );
}
