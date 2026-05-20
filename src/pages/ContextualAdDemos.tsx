import { Box, Typography } from '@mui/material';

// Placeholder page — just the title in the standard glass card for now.
export function ContextualAdDemos() {
  return (
    <Box className="cs-card" sx={{ p: 4 }}>
      <Typography sx={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.5px', color: 'text.primary' }}>
        Contextual Ad Demos
      </Typography>
    </Box>
  );
}
