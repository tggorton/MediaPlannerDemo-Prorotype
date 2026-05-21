import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import KeyboardDoubleArrowRight from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeft from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { NAV_CONFIG } from '@/data/navConfig';

type SidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
};

/**
 * Left-column nav rail. Renders only the collapse toggle + nav items; the
 * brand lockup lives in <AppHeader>. Uses MUI <ListItemButton> with the kit's
 * action.selected token, so active items render as a grey rounded square
 * (not the previous magenta bar + magenta accent text).
 */
export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const [sectionCollapsed, setSectionCollapsed] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) =>
    setSectionCollapsed((prev) => ({ ...prev, [section]: !prev[section] }));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      {/* Collapse toggle row */}
      <Box
        sx={{
          pt: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-end',
          px: collapsed ? 0 : 1.5,
          flexShrink: 0,
        }}
      >
        <IconButton
          onClick={onToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          sx={{ color: 'grey.500', width: 44, height: 44, borderRadius: 2 }}
        >
          {collapsed ? (
            <KeyboardDoubleArrowRight fontSize="small" />
          ) : (
            <KeyboardDoubleArrowLeft fontSize="small" />
          )}
        </IconButton>
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', pt: '16px' }}>
        {NAV_CONFIG.map((sec) => {
          const sectionIsCollapsed = !!sectionCollapsed[sec.section];
          return (
            <Box key={sec.section}>
              {!collapsed && (
                <Box
                  onClick={() => toggleSection(sec.section)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: 2,
                    py: 0.75,
                    fontSize: 10,
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.6px',
                    color: 'grey.400',
                    cursor: 'pointer',
                    '&:hover': { color: 'grey.500' },
                  }}
                >
                  <span>{sec.section}</span>
                  <Box sx={{ opacity: 0.5, display: 'flex' }}>
                    {sectionIsCollapsed ? <ExpandMore fontSize="small" /> : <ExpandLess fontSize="small" />}
                  </Box>
                </Box>
              )}

              {(collapsed || !sectionIsCollapsed) && (
                <List dense disablePadding sx={{ px: collapsed ? 1 : 1.25 }}>
                  {sec.items.map((item) => {
                    const isActive = location.pathname === item.path;

                    // Square button shape: the icon container is the visible
                    // active state, not the whole row.
                    const button = (
                      <ListItemButton
                        component={item.disabled ? 'div' : Link}
                        to={item.disabled ? undefined : item.path}
                        disabled={item.disabled}
                        selected={isActive}
                        sx={{
                          minHeight: 44,
                          borderRadius: 2,
                          py: 0.5,
                          mb: collapsed ? 2 : 0.5,
                          justifyContent: collapsed ? 'center' : 'flex-start',
                          ...(collapsed
                            ? { width: 44, minWidth: 44, height: 44, p: 0, mx: 'auto' }
                            : { px: 1 }),
                          // Override MUI's default selected hover so it stays
                          // the kit's grey rather than blending with primary.
                          '&.Mui-selected': {
                            bgcolor: 'action.selected',
                            '&:hover': { bgcolor: 'action.selected' },
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            color: 'grey.500',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 24,
                            height: 24,
                            mr: collapsed ? 0 : 1.25,
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>
                        {!collapsed && (
                          <ListItemText
                            primary={item.label}
                            slotProps={{
                              primary: {
                                sx: {
                                  fontSize: 13,
                                  fontWeight: isActive ? 500 : 400,
                                  color: 'text.primary',
                                  whiteSpace: 'nowrap',
                                },
                              },
                            }}
                          />
                        )}
                      </ListItemButton>
                    );

                    return collapsed ? (
                      <Tooltip key={item.id} title={item.label} placement="right">
                        <span>{button}</span>
                      </Tooltip>
                    ) : (
                      <Box key={item.id}>{button}</Box>
                    );
                  })}
                </List>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
