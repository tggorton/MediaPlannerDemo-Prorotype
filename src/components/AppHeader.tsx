import { useState, type MouseEvent as ReactMouseEvent } from 'react';
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../contexts/AuthContext';

/**
 * Right-column header. Sits to the right of the sidebar; width grows/shrinks
 * with the sidebar's collapse state. Holds the brand lockup
 * (K logo + " | Sales Demo Tool") on the left and the profile menu on the
 * right, plus a slide-out Profile drawer for editing the display name.
 */
export function AppHeader() {
  const { user, logout, updateName } = useAuth();
  const [profileMenuAnchor, setProfileMenuAnchor] = useState<HTMLElement | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [nameDraft, setNameDraft] = useState('');

  const openProfileMenu = (event: ReactMouseEvent<HTMLElement>) => setProfileMenuAnchor(event.currentTarget);
  const closeProfileMenu = () => setProfileMenuAnchor(null);

  const openProfile = () => {
    setNameDraft(user?.displayName ?? '');
    setProfileOpen(true);
    closeProfileMenu();
  };
  const closeProfile = () => setProfileOpen(false);

  const handleSignOut = () => {
    closeProfileMenu();
    logout();
  };

  const trimmedDraft = nameDraft.trim();
  const canSave = trimmedDraft.length > 0 && trimmedDraft !== user?.displayName;

  const handleSave = () => {
    if (!canSave) return;
    updateName(trimmedDraft);
    closeProfile();
  };

  return (
    <Box
      component="header"
      sx={{
        flexShrink: 0,
        minHeight: 72,
        pt: '20px',
        px: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'transparent',
      }}
    >
      <Stack direction="row" alignItems="center" spacing="15px">
        <Box
          component="img"
          src="/assets/kerv-logo.svg"
          alt="Kerv logo"
          sx={{ width: 40, height: 40, display: 'block' }}
        />
        <Typography
          color="text.primary"
          sx={{ fontWeight: 500, fontSize: 22, lineHeight: '32px', opacity: 0.87, whiteSpace: 'nowrap' }}
        >
          |&nbsp;&nbsp;Sales Demo Tool
        </Typography>
      </Stack>

      <IconButton sx={{ color: 'primary.main' }} onClick={openProfileMenu} aria-label="Open profile menu">
        <PersonIcon />
      </IconButton>

      <Menu
        anchorEl={profileMenuAnchor}
        open={Boolean(profileMenuAnchor)}
        onClose={closeProfileMenu}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{
          paper: { sx: { minWidth: 240, borderRadius: 1.5, mt: 0.8 } },
        }}
      >
        <Box sx={{ px: 2, py: 1.25 }}>
          <Typography sx={{ fontSize: 15, fontWeight: 600, color: 'text.primary', lineHeight: 1.3 }}>
            {user?.displayName ?? 'Guest'}
          </Typography>
          <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.3, mt: 0.25 }}>
            {user?.email ?? ''}
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={openProfile} sx={{ py: 1.25 }}>
          <ListItemIcon sx={{ color: 'text.secondary' }}>
            <PersonOutlineIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleSignOut} sx={{ py: 1.25 }}>
          <ListItemIcon sx={{ color: 'text.secondary' }}>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </Menu>

      <Drawer
        anchor="right"
        open={profileOpen}
        onClose={closeProfile}
        slotProps={{ paper: { sx: { width: 380, maxWidth: '100vw', display: 'flex', flexDirection: 'column' } } }}
      >
        {/* Header */}
        <Box
          sx={{
            px: 3,
            py: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}
        >
          <Typography sx={{ fontSize: 22, fontWeight: 600, color: 'text.primary' }}>Profile</Typography>
          <IconButton onClick={closeProfile} aria-label="Close profile" sx={{ color: 'text.secondary' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />

        {/* Body */}
        <Box sx={{ flex: 1, overflowY: 'auto', px: 3, py: 3 }}>
          <TextField
            label="Name"
            fullWidth
            value={nameDraft}
            onChange={(e) => setNameDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSave();
              }
            }}
            sx={{ mb: 3.5 }}
          />

          <Box sx={{ mb: 3 }}>
            <Typography sx={{ fontSize: 15, color: 'text.secondary', mb: 0.5 }}>Email</Typography>
            <Typography sx={{ fontSize: 18, color: 'text.primary' }}>{user?.email ?? '—'}</Typography>
          </Box>

          <Box>
            <Typography sx={{ fontSize: 15, color: 'text.secondary', mb: 0.5 }}>Organization</Typography>
            <Typography sx={{ fontSize: 18, color: 'text.primary' }}>{user?.organization ?? '—'}</Typography>
          </Box>
        </Box>

        {/* Footer */}
        <Divider />
        <Box sx={{ px: 3, py: 2, display: 'flex', justifyContent: 'flex-end', gap: 1, flexShrink: 0 }}>
          <Button onClick={closeProfile} variant="outlined" color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" disabled={!canSave}>
            Save
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}
