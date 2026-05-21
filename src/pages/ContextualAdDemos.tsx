import { Box, Typography } from '@mui/material';

// Placeholder page — title plus a static placeholder screenshot in the main area.
export function ContextualAdDemos() {
  return (
    <Box className="cs-card" sx={{ p: 4 }}>
      <Typography sx={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.5px', color: 'text.primary', mb: 3 }}>
        Contextual Ad Demos
      </Typography>
      <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
        <Box
          component="img"
          src="/assets/contextual-ad-demo.png"
          alt="Contextual ad demo placeholder"
          sx={{ display: 'block', width: '100%', height: 'auto' }}
        />
        {/* FPO (For Placement Only) overlay — makes clear this is a placeholder. */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: 'clamp(72px, 18vw, 320px)',
              letterSpacing: '0.08em',
              color: 'rgba(255,255,255,0.55)',
              textShadow: '0 2px 24px rgba(0,0,0,0.35)',
              userSelect: 'none',
              lineHeight: 1,
            }}
          >
            FPO
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
