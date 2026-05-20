import { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Link,
  Popover,
  Radio,
  RadioGroup,
  Slider,
  TextField,
  Typography,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import { useBridgeNodes } from '../utils/useBridgeNodes';

// React/MUI rewrite of the Moments-Match "Filters" control (button + panel).
// Reads/writes the legacy filter state on window and re-renders the moment
// cards via window.mp2RenderMomentCards() — which (after the legacy split)
// updates only the card grid, not the header, so this button stays mounted and
// the popover stays open while the user toggles filters.
declare global {
  interface Window {
    mp2MfScore?: string;
    mp2MfChannels?: string[];
    mp2MfCpmMin?: number;
    mp2MfCpmMax?: number;
    mp2MfPlatforms?: string[];
    MP2_MF_ALL_CHANNELS?: string[];
    MP2_MF_ALL_PLATFORMS?: string[];
    mp2RenderMomentCards?: () => void;
  }
}

const SCORE_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'high', label: 'High Match' },
  { value: 'standard', label: 'Standard Match' },
];

const accordionSx = {
  boxShadow: 'none',
  '&:before': { display: 'none' },
  borderBottom: '1px solid var(--border)',
  '&.Mui-expanded': { margin: 0 },
};
const summarySx = {
  minHeight: 40,
  px: 0,
  '& .MuiAccordionSummary-content': { my: 1 },
  '&.Mui-expanded': { minHeight: 40 },
};
const checkboxLabelSx = {
  m: 0,
  '& .MuiFormControlLabel-label': { fontSize: 12 },
};

function rerender() {
  window.mp2RenderMomentCards?.();
}

function MomentsFilterButton() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [score, setScore] = useState(() => window.mp2MfScore ?? 'all');
  const [channels, setChannels] = useState<string[]>(() => window.mp2MfChannels ?? []);
  const [cpm, setCpm] = useState<number[]>(() => [window.mp2MfCpmMin ?? 0, window.mp2MfCpmMax ?? 50]);
  const [platforms, setPlatforms] = useState<string[]>(() => window.mp2MfPlatforms ?? []);
  const [search, setSearch] = useState('');

  const allChannels = window.MP2_MF_ALL_CHANNELS ?? [];
  const allPlatforms = window.MP2_MF_ALL_PLATFORMS ?? [];

  const activeCount =
    (score !== 'all' ? 1 : 0) + channels.length + (cpm[0] > 0 || cpm[1] < 50 ? 1 : 0) + platforms.length;

  const openPanel = (e: React.MouseEvent<HTMLElement>) => {
    // Re-sync from the legacy globals in case they changed elsewhere.
    setScore(window.mp2MfScore ?? 'all');
    setChannels(window.mp2MfChannels ?? []);
    setCpm([window.mp2MfCpmMin ?? 0, window.mp2MfCpmMax ?? 50]);
    setPlatforms(window.mp2MfPlatforms ?? []);
    setAnchorEl(e.currentTarget);
  };

  const commitScore = (value: string) => {
    setScore(value);
    window.mp2MfScore = value;
    rerender();
  };

  const toggleChannel = (ch: string, checked: boolean) => {
    const next = checked ? [...channels, ch] : channels.filter((c) => c !== ch);
    setChannels(next);
    window.mp2MfChannels = next;
    rerender();
  };
  const allChannelsSelected = () => {
    setChannels([]);
    window.mp2MfChannels = [];
    rerender();
  };

  const togglePlatform = (p: string, checked: boolean) => {
    const next = checked ? [...platforms, p] : platforms.filter((v) => v !== p);
    setPlatforms(next);
    window.mp2MfPlatforms = next;
    rerender();
  };
  const allPlatformsSelected = () => {
    setPlatforms([]);
    window.mp2MfPlatforms = [];
    rerender();
  };

  const commitCpm = (value: number[]) => {
    setCpm(value);
    window.mp2MfCpmMin = value[0];
    window.mp2MfCpmMax = value[1];
    rerender();
  };

  const clearAll = () => {
    setScore('all');
    setChannels([]);
    setCpm([0, 50]);
    setPlatforms([]);
    window.mp2MfScore = 'all';
    window.mp2MfChannels = [];
    window.mp2MfCpmMin = 0;
    window.mp2MfCpmMax = 50;
    window.mp2MfPlatforms = [];
    rerender();
  };

  const filteredChannels = allChannels.filter((ch) => ch.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        color={activeCount > 0 ? 'primary' : 'inherit'}
        startIcon={<FilterListIcon />}
        onClick={openPanel}
        sx={{
          height: 30,
          textTransform: 'none',
          fontSize: 12,
          borderColor: activeCount > 0 ? 'primary.main' : 'var(--border-md, rgba(0,0,0,0.12))',
          color: activeCount > 0 ? 'primary.main' : 'text.secondary',
        }}
      >
        Filters
        {activeCount > 0 && (
          <Box
            component="span"
            sx={{
              ml: 0.75,
              bgcolor: 'primary.main',
              color: '#fff',
              borderRadius: '10px',
              fontSize: 10,
              fontWeight: 700,
              minWidth: 16,
              height: 16,
              px: 0.5,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: 1,
            }}
          >
            {activeCount}
          </Box>
        )}
      </Button>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { sx: { width: 280, mt: 0.5, borderRadius: 2 } } }}
      >
        <Box sx={{ px: 1.75, pt: 1.5, pb: 0.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography sx={{ fontSize: 13, fontWeight: 600 }}>Filters</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {activeCount > 0 && (
                <Link component="button" underline="hover" onClick={clearAll} sx={{ fontSize: 11, color: 'text.disabled' }}>
                  Clear all
                </Link>
              )}
              <IconButton size="small" onClick={() => setAnchorEl(null)} sx={{ color: 'text.disabled' }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* Match Score */}
          <Accordion defaultExpanded disableGutters sx={accordionSx}>
            <AccordionSummary expandIcon={<ExpandMoreIcon fontSize="small" />} sx={summarySx}>
              <Typography sx={{ fontSize: 11, fontWeight: 600 }}>Match Score</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0, pt: 0, pb: 1 }}>
              <RadioGroup value={score} onChange={(_, v) => commitScore(v)}>
                {SCORE_OPTIONS.map((o) => (
                  <FormControlLabel
                    key={o.value}
                    value={o.value}
                    control={<Radio size="small" />}
                    label={o.label}
                    sx={checkboxLabelSx}
                  />
                ))}
              </RadioGroup>
            </AccordionDetails>
          </Accordion>

          {/* Channel */}
          <Accordion disableGutters sx={accordionSx}>
            <AccordionSummary expandIcon={<ExpandMoreIcon fontSize="small" />} sx={summarySx}>
              <Typography sx={{ fontSize: 11, fontWeight: 600 }}>Channel</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0, pt: 0, pb: 1 }}>
              <TextField
                size="small"
                placeholder="Search…"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ mb: 1, '& .MuiInputBase-input': { fontSize: 12, py: 0.75 } }}
              />
              <Box sx={{ maxHeight: 140, overflowY: 'auto' }}>
                <FormControlLabel
                  control={<Checkbox size="small" checked={channels.length === 0} onChange={allChannelsSelected} />}
                  label="All"
                  sx={checkboxLabelSx}
                />
                {filteredChannels.map((ch) => (
                  <FormControlLabel
                    key={ch}
                    control={
                      <Checkbox
                        size="small"
                        checked={channels.includes(ch)}
                        onChange={(e) => toggleChannel(ch, e.target.checked)}
                      />
                    }
                    label={ch}
                    sx={{ ...checkboxLabelSx, display: 'flex' }}
                  />
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* CPM */}
          <Accordion disableGutters sx={accordionSx}>
            <AccordionSummary expandIcon={<ExpandMoreIcon fontSize="small" />} sx={summarySx}>
              <Typography sx={{ fontSize: 11, fontWeight: 600 }}>CPM</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0.5, pt: 0, pb: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>CPM Range</Typography>
                <Typography sx={{ fontSize: 11, fontWeight: 600 }}>
                  ${cpm[0]} – ${cpm[1]}
                </Typography>
              </Box>
              <Slider
                size="small"
                min={0}
                max={50}
                value={cpm}
                onChange={(_, v) => setCpm(v as number[])}
                onChangeCommitted={(_, v) => commitCpm(v as number[])}
                sx={{ color: 'primary.main' }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: 10, color: 'text.disabled' }}>$0</Typography>
                <Typography sx={{ fontSize: 10, color: 'text.disabled' }}>$50</Typography>
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Platform */}
          <Accordion disableGutters sx={{ ...accordionSx, borderBottom: 'none' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon fontSize="small" />} sx={summarySx}>
              <Typography sx={{ fontSize: 11, fontWeight: 600 }}>Platform</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0, pt: 0, pb: 1 }}>
              <FormControlLabel
                control={<Checkbox size="small" checked={platforms.length === 0} onChange={allPlatformsSelected} />}
                label="All"
                sx={checkboxLabelSx}
              />
              {allPlatforms.map((p) => (
                <FormControlLabel
                  key={p}
                  control={
                    <Checkbox
                      size="small"
                      checked={platforms.includes(p)}
                      onChange={(e) => togglePlatform(p, e.target.checked)}
                    />
                  }
                  label={p}
                  sx={{ ...checkboxLabelSx, display: 'flex' }}
                />
              ))}
            </AccordionDetails>
          </Accordion>
        </Box>
      </Popover>
    </>
  );
}

export function MomentsFilterBridge() {
  const nodes = useBridgeNodes('[data-moments-filter]', 'momentsFilterId');
  return (
    <>
      {nodes.map((node) => createPortal(<MomentsFilterButton />, node, node.dataset.momentsFilterId))}
    </>
  );
}
