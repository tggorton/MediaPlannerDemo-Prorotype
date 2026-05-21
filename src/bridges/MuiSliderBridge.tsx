import { useState } from 'react';
import { createPortal } from 'react-dom';
import Slider from '@mui/material/Slider';
import { useBridgeNodes } from '@/bridges/useBridgeNodes';

// Generic bridge: any legacy element marked with data-mui-slider gets a real
// MUI <Slider> portaled into it. Configured via data attributes:
//   data-min, data-max, data-step  — numeric bounds
//   data-value                     — "n" (single) or "low,high" (range)
//   data-range="1"                 — render a two-thumb range slider
//   data-on-input="fnName"         — window fn called on each change
//   data-on-commit="fnName"        — window fn called on drag release (optional)
// Range sliders invoke fn(low, high); single sliders invoke fn(value).

function invoke(name: string | undefined, value: number | number[]) {
  if (!name) return;
  const fn = (window as unknown as Record<string, ((...a: number[]) => void) | undefined>)[name];
  if (typeof fn === 'function') fn(...(Array.isArray(value) ? value : [value]));
}

function BridgedSlider({ node }: { node: HTMLElement }) {
  const min = Number(node.dataset.min ?? 0);
  const max = Number(node.dataset.max ?? 100);
  const step = Number(node.dataset.step ?? 1);
  const isRange = node.dataset.range === '1';
  const [value, setValue] = useState<number | number[]>(
    isRange ? (node.dataset.value ?? '0,0').split(',').map(Number) : Number(node.dataset.value ?? 0),
  );

  return (
    <Slider
      size="small"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(_, next) => {
        setValue(next);
        invoke(node.dataset.onInput, next);
      }}
      onChangeCommitted={(_, next) => invoke(node.dataset.onCommit, next)}
      sx={{ color: 'primary.main', py: '4px' }}
    />
  );
}

export function MuiSliderBridge() {
  const nodes = useBridgeNodes('[data-mui-slider]', 'sliderId');
  return (
    <>
      {nodes.map((node) => createPortal(<BridgedSlider node={node} />, node, node.dataset.sliderId))}
    </>
  );
}
