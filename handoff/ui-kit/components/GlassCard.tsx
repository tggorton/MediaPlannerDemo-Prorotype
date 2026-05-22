import { Box, type BoxProps } from '@mui/material';
import { glass } from '../tokens';

type Variant = 'card' | 'dialog' | 'subtle';

/**
 * The KERV glass container — semi-transparent white + backdrop blur + white
 * "glass edge" + rounded corners + soft shadow. The ⚠️ prod-parity surface used
 * for every content/header box.
 *
 * @example <GlassCard sx={{ p: 4 }}>…</GlassCard>            // content card
 * @example <GlassCard variant="dialog">…</GlassCard>
 */
export function GlassCard({
  variant = 'card',
  sx = [],
  children,
  ...props
}: BoxProps & { variant?: Variant }) {
  return (
    <Box sx={[glass[variant] as object, ...(Array.isArray(sx) ? sx : [sx])]} {...props}>
      {children}
    </Box>
  );
}
