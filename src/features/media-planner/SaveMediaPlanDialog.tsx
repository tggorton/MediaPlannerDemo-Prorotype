import { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

// Bridge between the legacy vanilla-JS media planner and the React/MUI shell.
// The legacy save flow calls window.openSaveMediaPlanDialog(defaultName, onConfirm);
// this component mounts the listener, renders the dialog, and invokes onConfirm
// with the user's chosen name so the legacy code can write the plan.
declare global {
  interface Window {
    openSaveMediaPlanDialog?: (
      defaultName: string,
      onConfirm: (name: string) => void,
    ) => void;
  }
}

export function SaveMediaPlanDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [confirmFn, setConfirmFn] = useState<((name: string) => void) | null>(null);

  useEffect(() => {
    window.openSaveMediaPlanDialog = (defaultName, onConfirm) => {
      setName(defaultName);
      setConfirmFn(() => onConfirm);
      setOpen(true);
    };
    return () => {
      delete window.openSaveMediaPlanDialog;
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
    setConfirmFn(null);
  };

  const handleSave = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    confirmFn?.(trimmed);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: 600 }}>Save Media Plan</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Plan name"
          fullWidth
          value={name}
          onChange={(event) => setName(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              handleSave();
            }
          }}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} variant="outlined" color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" disabled={!name.trim()}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
