import { useCallback, useEffect, useRef, useState } from 'react';
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
  Paper,
  Radio,
  RadioGroup,
  Slider,
  TextField,
  Typography,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import { useBridgeNodes } from '@/bridges/useBridgeNodes';

// React/MUI rewrite of the Moments-Match "Filters" control (button + panel).
// Reads/writes the legacy filter state on window and re-renders the moment
// cards via window.mp2RenderMomentCards() — which (after the legacy split)
// updates only the card grid, not the header, so this button stays mounted and
// the panel stays open while the user toggles filters.
//
// The panel is an overlay anchored INTO the `.content` scroll container (not a
// MUI Popover/Modal). A Popover renders in a viewport-fixed layer and locks
// page scroll, so a tall panel's overflow below the fold is unreachable. As an
// absolutely-positioned child of the scroller it can break past the white card
// and, because abs-positioned children extend their scroller's height, the page
// scrolls naturally to reveal the rest.
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

const PANEL_W = 380;

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
const checkGridSx = { display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 1 };

function rerender() {
  window.mp2RenderMomentCards?.();
}

function MomentsFilterButton() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [scroller, setScroller] = useState<HTMLElement | null>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  const [score, setScore] = useState(() => window.mp2MfScore ?? 'all');
  const [channels, setChannels] = useState<string[]>(() => window.mp2MfChannels ?? []);
  const [cpm, setCpm] = useState<number[]>(() => [window.mp2MfCpmMin ?? 0, window.mp2MfCpmMax ?? 50]);
  const [platforms, setPlatforms] = useState<string[]>(() => window.mp2MfPlatforms ?? []);
  const [search, setSearch] = useState('');

  const allChannels = window.MP2_MF_ALL_CHANNELS ?? [];
  const allPlatforms = window.MP2_MF_ALL_PLATFORMS ?? [];

  const activeCount =
    (score !== 'all' ? 1 : 0) + channels.length + (cpm[0] > 0 || cpm[1] < 50 ? 1 : 0) + platforms.length;

  // Position the panel below the button, right-aligned, in the scroll
  // container's coordinate space so it scrolls with the page.
  const computePos = useCallback(() => {
    const btn = btnRef.current;
    const sc = btn?.closest('.content') as HTMLElement | null;
    if (!btn || !sc) return;
    const br = btn.getBoundingClientRect();
    const cr = sc.getBoundingClientRect();
    const top = br.bottom - cr.top + sc.scrollTop + 6;
    const left = Math.max(8, br.right - cr.left + sc.scrollLeft - PANEL_W);
    setScroller(sc);
    setPos({ top, left });
  }, []);

  const openPanel = () => {
    // Re-sync from the legacy globals in case they changed elsewhere.
    setScore(window.mp2MfScore ?? 'all');
    setChannels(window.mp2MfChannels ?? []);
    setCpm([window.mp2MfCpmMin ?? 0, window.mp2MfCpmMax ?? 50]);
    setPlatforms(window.mp2MfPlatforms ?? []);
    computePos();
    setOpen(true);
  };
  const close = () => setOpen(false);

  // Keep aligned if the window resizes while open.
  useEffect(() => {
    if (!open) return;
    const onResize = () => computePos();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [open, computePos]);

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t) || btnRef.current?.contains(t)) return;
      close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

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
        ref={btnRef}
        variant="outlined"
        size="small"
        color={activeCount > 0 ? 'primary' : 'inherit'}
        startIcon={<FilterListIcon />}
        onClick={() => (open ? close() : openPanel())}
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

      {open && scroller && pos &&
        createPortal(
          <Paper
            ref={panelRef}
            elevation={8}
            sx={{
              position: 'absolute',
              top: pos.top,
              left: pos.left,
              width: PANEL_W,
              borderRadius: 2,
              zIndex: 1200,
              px: 1.75,
              pt: 1.5,
              pb: 0.5,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography sx={{ fontSize: 13, fontWeight: 600 }}>Filters</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {activeCount > 0 && (
                  <Link component="button" underline="hover" onClick={clearAll} sx={{ fontSize: 11, color: 'text.disabled' }}>
                    Clear all
                  </Link>
                )}
                <IconButton size="small" onClick={close} sx={{ color: 'text.disabled' }}>
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
                <RadioGroup row value={score} onChange={(_, v) => commitScore(v)} sx={{ gap: 1 }}>
                  {SCORE_OPTIONS.map((o) => (
                    <FormControlLabel
                      key={o.value}
                      value={o.value}
                      control={<Radio size="small" />}
                      label={o.label}
                      sx={{ ...checkboxLabelSx, mr: 0 }}
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
                <Box sx={checkGridSx}>
                  <FormControlLabel
                    control={<Checkbox size="small" checked={channels.length === 0} onChange={allChannelsSelected} />}
                    label="All"
                    sx={{ ...checkboxLabelSx, gridColumn: '1 / -1' }}
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
                <Box sx={checkGridSx}>
                  <FormControlLabel
                    control={<Checkbox size="small" checked={platforms.length === 0} onChange={allPlatformsSelected} />}
                    label="All"
                    sx={{ ...checkboxLabelSx, gridColumn: '1 / -1' }}
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
                </Box>
              </AccordionDetails>
            </Accordion>
          </Paper>,
          scroller,
        )}
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
