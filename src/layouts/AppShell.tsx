import { useState, type ReactNode } from 'react';
import { Box } from '@mui/material';
import { Sidebar } from '../components/Sidebar';
import { AppHeader } from '../components/AppHeader';
import { MuiTipController } from '../components/MuiTipController';

const COL_EXPANDED = 240;
const COL_COLLAPSED = 68;
const SHELL_TRANSITION = 'width 0.22s cubic-bezier(0.4, 0, 0.2, 1)';

/**
 * Authenticated layout. Two columns:
 *   LEFT  — <BrandHeader> over <Sidebar>. The column width animates between
 *           collapsed (68px) and expanded (240px) when the user toggles the
 *           rail. <BrandHeader> and <Sidebar> are separate components but
 *           share that width so they grow/shrink as a unit.
 *   RIGHT — <AppHeader> over the page content. Width is flex:1 so it
 *           naturally widens when the left column collapses.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(true);
  const toggle = () => setCollapsed((c) => !c);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box
        sx={{
          width: collapsed ? COL_COLLAPSED : COL_EXPANDED,
          transition: SHELL_TRANSITION,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          // Semi-transparent so the kit's gradient (painted by <KitAppShell>)
          // bleeds through. Border + soft shadow mirror the glassSection
          // primitive from kerv-one-theme.
          bgcolor: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(8px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.8)',
          boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.04)',
          overflow: 'hidden',
        }}
      >
        <Sidebar collapsed={collapsed} onToggle={toggle} />
      </Box>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <AppHeader />
        <Box className="content" sx={{ flex: 1, overflowY: 'auto', p: { xs: '12px', sm: '16px', md: '20px 28px' } }}>
          {children}
        </Box>
      </Box>
      <MuiTipController />
    </Box>
  );
}
