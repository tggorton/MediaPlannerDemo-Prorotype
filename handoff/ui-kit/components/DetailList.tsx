import { type ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import { color } from '../tokens';

export interface DetailRow {
  label: string;
  value: ReactNode;
}

/**
 * A compact key/value list with hairline rows — the asset details rail
 * (Advertiser, Domain, Duration, Lookback…) and similar metadata blocks. Labels
 * are faint, values are primary and right-aligned.
 *
 * @example
 * <DetailList rows={[{label:'Advertiser', value:'Kroger'}, {label:'Duration', value:'30s'}]} />
 */
export function DetailList({ rows }: { rows: DetailRow[] }) {
  return (
    <Box>
      {rows.map((r, i) => (
        <Box
          key={i}
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', py: '4px', borderBottom: `1px solid ${color.border.hairline}` }}
        >
          <Typography component="span" sx={{ fontSize: 10, color: color.text.faint, mr: '6px', flexShrink: 0 }}>
            {r.label}
          </Typography>
          <Typography component="span" sx={{ fontSize: 10, fontWeight: 500, color: color.text.primary, textAlign: 'right', wordBreak: 'break-all' }}>
            {r.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
