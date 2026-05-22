import { type ReactNode } from 'react';
import { Box } from '@mui/material';
import { color } from '../tokens';

export interface SegmentOption<T extends string = string> {
  value: T;
  label: string;
  icon?: ReactNode;
}

/**
 * Segmented control on a `--bg` track; active segment is a raised white pill with
 * magenta text. Used for the Step-2 input switch (Video/Brief/VAST Tag) and the
 * supply-type toggle (VoD/Organic Pause/Live).
 *
 * @example
 * <SegmentedToggle
 *   value={kind}
 *   onChange={setKind}
 *   options={[{value:'video',label:'Video'},{value:'brief',label:'Brief'},{value:'vast',label:'VAST Tag'}]}
 * />
 */
export function SegmentedToggle<T extends string = string>({
  options,
  value,
  onChange,
}: {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <Box sx={{ display: 'flex', gap: '2px', bgcolor: color.bg, border: `1px solid ${color.border.hairline}`, borderRadius: '8px', p: '3px' }}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <Box
            key={o.value}
            role="button"
            tabIndex={0}
            onClick={() => onChange(o.value)}
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.75,
              height: 30,
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: 11,
              fontWeight: 500,
              userSelect: 'none',
              whiteSpace: 'nowrap',
              transition: 'background .13s, color .13s',
              color: active ? color.primary.main : color.text.muted,
              bgcolor: active ? color.surface : 'transparent',
              boxShadow: active ? '0 1px 3px rgba(0,0,0,.07)' : 'none',
              '&:hover': { color: color.text.primary },
            }}
          >
            {o.icon}
            <span>{o.label}</span>
          </Box>
        );
      })}
    </Box>
  );
}
