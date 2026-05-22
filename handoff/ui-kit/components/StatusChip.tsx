import { Box, Chip, type ChipProps } from '@mui/material';
import { statusPalette } from '../tokens';

export type StatusKind = keyof typeof statusPalette; // 'vod' | 'live' | 'organic' | 'high' | 'standard' | 'refined'

const LABELS: Record<StatusKind, string> = {
  vod: 'VoD',
  live: 'Live',
  organic: 'Organic Pause',
  high: 'High',
  standard: 'Standard',
  refined: 'Refined',
};

/**
 * The kit's status pill (supply type / match quality / refined). Fully rounded,
 * 10px/700, height 18px, palette-driven. `live` gets a glowing dot.
 *
 * @example <StatusChip kind="vod" />  <StatusChip kind="high" />
 */
export function StatusChip({ kind, label, ...props }: { kind: StatusKind; label?: string } & Omit<ChipProps, 'label'>) {
  const p = statusPalette[kind];
  return (
    <Chip
      size="small"
      label={label ?? LABELS[kind]}
      icon={
        kind === 'live' ? (
          <Box
            component="span"
            sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: (statusPalette.live as { dot: string }).dot, boxShadow: `0 0 4px ${(statusPalette.live as { dot: string }).dot}`, ml: '6px !important' }}
          />
        ) : undefined
      }
      sx={{
        height: 18,
        borderRadius: '20px',
        bgcolor: p.bg,
        border: `1px solid ${p.border}`,
        color: p.text,
        '& .MuiChip-label': { px: 0.75, fontSize: 9, fontWeight: 700, lineHeight: 1 },
      }}
      {...props}
    />
  );
}
