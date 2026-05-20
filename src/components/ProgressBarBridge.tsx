import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import LinearProgress from '@mui/material/LinearProgress';

// Bridges the legacy analysis progress bar to MUI <LinearProgress>. The legacy
// scan loop calls window.mp2SetProgress(pct) each tick; this component portals a
// determinate LinearProgress into #mp2-progress-mount.
declare global {
  interface Window {
    mp2SetProgress?: (pct: number) => void;
  }
}

export function ProgressBarBridge() {
  const [mountEl, setMountEl] = useState<HTMLElement | null>(null);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    window.mp2SetProgress = (value: number) => {
      const el = document.getElementById('mp2-progress-mount');
      setMountEl((prev) => (prev === el ? prev : el));
      setPct(value);
    };
    return () => {
      delete window.mp2SetProgress;
    };
  }, []);

  if (!mountEl) return null;

  return createPortal(
    <LinearProgress
      variant="determinate"
      value={Math.min(Math.max(pct, 0), 100)}
      sx={{ height: 6, borderRadius: 3, '& .MuiLinearProgress-bar': { borderRadius: 3 } }}
    />,
    mountEl,
  );
}
