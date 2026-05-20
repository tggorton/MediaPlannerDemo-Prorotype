import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useBridgeNodes } from '../utils/useBridgeNodes';

// MUI ToggleButtonGroup for the Moments-Match supply type (VoD / Organic Pause /
// Live). Reads/writes window.mp2MomentType via window.mp2SetMomentType, which
// re-renders the moment grid.
declare global {
  interface Window {
    mp2MomentType?: string;
    mp2SetMomentType?: (type: string) => void;
  }
}

const OPTIONS = [
  { value: 'ads', label: 'VoD' },
  { value: 'organic', label: 'Organic Pause' },
  { value: 'live', label: 'Live' },
];

function MomentTypeToggleControl() {
  const [value, setValue] = useState(() => window.mp2MomentType ?? 'ads');
  return (
    <ToggleButtonGroup
      exclusive
      size="small"
      value={value}
      onChange={(_, next) => {
        if (!next) return;
        setValue(next);
        window.mp2SetMomentType?.(next);
      }}
      sx={{
        bgcolor: 'var(--bg)',
        border: '1px solid var(--border)',
        borderRadius: '20px',
        p: '2px',
        '& .MuiToggleButton-root': {
          border: 'none',
          borderRadius: '16px !important',
          textTransform: 'none',
          fontSize: 11,
          fontWeight: 500,
          lineHeight: 1.4,
          px: 1.5,
          py: 0.5,
          color: 'var(--faint)',
          '&.Mui-selected': {
            bgcolor: 'var(--surface)',
            color: 'var(--text)',
            boxShadow: '0 1px 3px rgba(0,0,0,.1)',
            '&:hover': { bgcolor: 'var(--surface)' },
          },
        },
      }}
    >
      {OPTIONS.map((o) => (
        <ToggleButton key={o.value} value={o.value}>
          {o.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export function MomentTypeToggleBridge() {
  const nodes = useBridgeNodes('[data-moment-type-toggle]', 'momentTypeToggleId');
  return (
    <>
      {nodes.map((node) =>
        createPortal(<MomentTypeToggleControl />, node, node.dataset.momentTypeToggleId),
      )}
    </>
  );
}
