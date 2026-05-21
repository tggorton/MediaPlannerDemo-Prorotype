import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Box, FormControl, MenuItem, Select } from '@mui/material';
import { useBridgeNodes } from '@/bridges/useBridgeNodes';

// Generic bridge: any legacy element marked with data-mui-select gets a real
// MUI <Select> portaled into it (so the menu uses MUI's popover/elevation, not
// the native browser dropdown). Configured via data attributes:
//   data-options='["a","b"]'   — JSON array of option strings
//   data-value="…"             — current value ('' = nothing selected)
//   data-placeholder="…"       — shown when value is ''
//   data-on-change="fnName"    — window fn called with the new value

function invoke(name: string | undefined, value: string) {
  if (!name) return;
  const fn = (window as unknown as Record<string, ((v: string) => void) | undefined>)[name];
  if (typeof fn === 'function') fn(value);
}

function BridgedSelect({ node }: { node: HTMLElement }) {
  let options: string[] = [];
  try {
    options = JSON.parse(node.dataset.options ?? '[]') as string[];
  } catch {
    options = [];
  }
  const placeholder = node.dataset.placeholder ?? 'Select…';
  const [value, setValue] = useState(node.dataset.value ?? '');

  return (
    <FormControl fullWidth size="small">
      <Select
        value={value}
        displayEmpty
        onChange={(e) => {
          const v = e.target.value as string;
          setValue(v);
          invoke(node.dataset.onChange, v);
        }}
        renderValue={(v) =>
          v ? (v as string) : <Box component="span" sx={{ color: 'var(--faint)' }}>{placeholder}</Box>
        }
        sx={{
          bgcolor: 'var(--surface)',
          fontSize: 13,
          borderRadius: 1, // 4px — matches the kit button radius
          '& .MuiSelect-select': { py: '8px' },
        }}
        MenuProps={{ slotProps: { paper: { sx: { borderRadius: 1.5, mt: 0.5 } } } }}
      >
        {options.map((o) => (
          <MenuItem key={o} value={o} sx={{ fontSize: 13 }}>
            {o}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export function MuiSelectBridge() {
  const nodes = useBridgeNodes('[data-mui-select]', 'muiSelectId');
  return (
    <>
      {nodes.map((node) => createPortal(<BridgedSelect node={node} />, node, node.dataset.muiSelectId))}
    </>
  );
}
