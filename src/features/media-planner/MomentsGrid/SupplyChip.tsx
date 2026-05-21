import { Box, Chip } from '@mui/material';
import type { MomentCardData } from './types';

// Shared pill style for the small status chips on a moment card (supply type,
// Refined, High/Standard).
export const pillSx = (bg: string, border: string, color: string) => ({
  height: 18,
  bgcolor: bg,
  border: `1px solid ${border}`,
  color,
  borderRadius: '20px',
  '& .MuiChip-label': { px: 0.75, fontSize: 9, fontWeight: 700, lineHeight: 1 },
});

// The supply-type chip: Live (red dot) / Organic Pause / VoD.
export function SupplyChip({ type }: { type: MomentCardData['supplyType'] }) {
  if (type === 'live') {
    return (
      <Chip
        size="small"
        icon={
          <Box
            component="span"
            sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: '#ef4444', boxShadow: '0 0 4px #ef4444', ml: '6px !important' }}
          />
        }
        label="Live"
        sx={pillSx('#fef2f2', '#fecaca', '#dc2626')}
      />
    );
  }
  if (type === 'organic') {
    return <Chip size="small" label="Organic Pause" sx={pillSx('#f0fdfa', '#99f6e4', '#0f766e')} />;
  }
  return <Chip size="small" label="VoD" sx={pillSx('#eff6ff', '#bfdbfe', '#1d4ed8')} />;
}
