import { useEffect, useState } from 'react';
import { IconButton, Link, Paper, Snackbar, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';

// Singleton MUI Snackbar bridge: legacy code calls window.mp2Notify(message, opts)
// to surface a transient toast (e.g. "Media plan saved"). Mounted once in
// MediaPlannerV2. See the mui-consistency skill — legacy can't import MUI, so it
// fires a window function and React renders the real component.
//
// opts.actionLabel + opts.planIdx render a link that opens the saved plan
// (calls the legacy window.mp2ShowMediaPlanDetail).
type NotifyOpts = { actionLabel?: string; planIdx?: number };

declare global {
  interface Window {
    mp2Notify?: (message: string, opts?: NotifyOpts) => void;
    mp2ShowMediaPlanDetail?: (idx: number) => void;
  }
}

export function SnackbarBridge() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [action, setAction] = useState<{ label: string; planIdx: number } | null>(null);

  useEffect(() => {
    window.mp2Notify = (msg, opts = {}) => {
      setMessage(msg);
      setAction(
        opts.actionLabel && typeof opts.planIdx === 'number'
          ? { label: opts.actionLabel, planIdx: opts.planIdx }
          : null,
      );
      setOpen(true);
    };
    return () => {
      delete window.mp2Notify;
    };
  }, []);

  const close = () => setOpen(false);
  const handleAction = () => {
    if (action) window.mp2ShowMediaPlanDetail?.(action.planIdx);
    close();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={(_, reason) => {
        if (reason !== 'clickaway') close();
      }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Paper
        elevation={6}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          pl: 1.75,
          pr: 1,
          py: 1,
          borderRadius: 2,
          minWidth: 320,
          maxWidth: 520,
          bgcolor: '#fff',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 6px 24px rgba(0,0,0,0.14)',
        }}
      >
        <CheckCircleOutlineIcon sx={{ color: 'success.main', fontSize: 22, flexShrink: 0 }} />
        <Typography sx={{ flex: 1, fontSize: 14, color: 'text.primary', lineHeight: 1.4 }}>
          {message}
        </Typography>
        {action && (
          <Link
            component="button"
            onClick={handleAction}
            sx={{
              fontSize: 14,
              fontWeight: 600,
              color: 'primary.main',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            {action.label}
          </Link>
        )}
        <IconButton size="small" onClick={close} sx={{ color: 'text.secondary', flexShrink: 0 }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Paper>
    </Snackbar>
  );
}
