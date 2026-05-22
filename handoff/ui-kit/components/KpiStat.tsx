import { Box, Typography } from '@mui/material';
import { color, typography } from '../tokens';

/**
 * A labelled metric (e.g. Est. Impr. / CPM / Inventory on a moment card, or the
 * Moments / Est. Impressions / Avg CPM stats on a saved plan). Uppercase eyebrow
 * label over a bold value. `accent` colors the value magenta.
 *
 * @example <KpiStat label="CPM" value="$24" />
 * @example <KpiStat label="Avg CPM" value="$25" accent />
 */
export function KpiStat({
  label,
  value,
  accent = false,
  align = 'left',
}: {
  label: string;
  value: string | number;
  accent?: boolean;
  align?: 'left' | 'right';
}) {
  return (
    <Box sx={{ textAlign: align }}>
      <Typography sx={{ ...typography.overline, color: color.text.faint, mb: '2px' }}>{label}</Typography>
      <Typography sx={{ ...typography.kpiValue, color: accent ? color.primary.main : color.text.primary }}>
        {value}
      </Typography>
    </Box>
  );
}
