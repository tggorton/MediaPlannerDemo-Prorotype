// Deterministic color picker for "driver" labels.
// Ported from js/app.js (kervDriverColor).

export const KERV_DRIVER_PALETTE = [
  '#6366F1',
  '#06B6D4',
  '#10B981',
  '#F59E0B',
  '#EF4444',
  '#EC4899',
  '#8B5CF6',
  '#14B8A6',
  '#F97316',
  '#3B82F6',
  '#84CC16',
  '#A855F7',
] as const;

export function kervDriverColor(name: string | null | undefined): string {
  if (!name || name === '—') return '#8E8E93';
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = (h * 31 + name.charCodeAt(i)) >>> 0;
  }
  return KERV_DRIVER_PALETTE[h % KERV_DRIVER_PALETTE.length];
}
