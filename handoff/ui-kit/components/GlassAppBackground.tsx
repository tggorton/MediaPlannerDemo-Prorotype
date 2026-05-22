import { Box, type BoxProps } from '@mui/material';
import { gradient } from '../tokens';

/**
 * Paints the branded KERV gradient across the full viewport, fixed while content
 * scrolls. Wrap the whole app. This is the ⚠️ prod-parity background.
 *
 * @example
 * <GlassAppBackground>
 *   <AppHeader />
 *   <GlassCard sx={{ m: 4 }}>…</GlassCard>
 * </GlassAppBackground>
 */
export function GlassAppBackground({ children, sx = [], ...props }: BoxProps) {
  return (
    <Box
      sx={[
        {
          minHeight: '100vh',
          background: gradient,
          backgroundAttachment: 'fixed',
          display: 'flex',
          flexDirection: 'column',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      {children}
    </Box>
  );
}
