import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useBridgeNodes } from '../utils/useBridgeNodes';

// Full React/MUI rewrite of the Moments-Match card grid. Legacy
// mp2RenderMomentCards() publishes the filtered card data on
// window.mp2MomentCardsData and calls window.mp2NotifyMomentsGrid() to trigger a
// re-read. Card behaviors (select / refine / examples / reset) call the existing
// legacy window functions so the rest of the app (media-plan panel, refine
// modal, refined stats) keeps working.
type MomentCardData = {
  name: string;
  score: number;
  assets: number;
  impM: string | number;
  cpm: number;
  inventory: number;
  channels: string[];
  refined: boolean;
  isHigh: boolean;
  supplyType: 'ads' | 'organic' | 'live';
};

declare global {
  interface Window {
    mp2MomentCardsData?: MomentCardData[];
    mp2NotifyMomentsGrid?: () => void;
    mp2SelectedMoments?: Record<string, boolean>;
    mp2ToggleMomentCard?: (name: string) => void;
    mp2OpenMomentModal?: (name: string, score: number, assets: number) => void;
    mp2ShowExamples?: (name: string, score: number, assets: number, btn: HTMLElement) => void;
    mp2ResetCard?: (name: string) => void;
  }
}

const TV_QUERIES: Record<string, string> = {
  'Family Dinner Time': 'family dinner tv show scene',
  'Grocery Shopping': 'cooking show food network television host',
  'Healthy Eating': 'cooking show kitchen television chef healthy',
  'Meal Prep & Cooking': 'cooking show chef kitchen television',
  'Fresh Produce': 'cooking show vegetables chef television',
  'Weekend BBQ': 'outdoor cooking show bbq television',
  'Quick & Easy Meals': 'cooking show recipe television host',
  'Home Cooking': 'home cooking television show chef',
  'Family Life': 'family television sitcom show scene',
  'Snack & Entertaining': 'television show party entertaining scene',
  'Budget Living': 'reality tv show home lifestyle',
  'Lifestyle & Wellness': 'wellness lifestyle television show host',
  'Food Discovery': 'food travel television show chef',
  'Kids & Family': 'kids family television show scene',
  'Community & Local': 'community television show neighborhood',
  'Seasonal Celebrations': 'holiday television show celebration family',
};

// Module-level cache so images survive grid remounts (type change / reset).
const imageCache = new Map<string, string>();

const pillSx = (bg: string, border: string, color: string) => ({
  height: 18,
  bgcolor: bg,
  border: `1px solid ${border}`,
  color,
  borderRadius: '20px',
  '& .MuiChip-label': { px: 0.75, fontSize: 9, fontWeight: 700, lineHeight: 1 },
});

function SupplyChip({ type }: { type: MomentCardData['supplyType'] }) {
  if (type === 'live') {
    return (
      <Chip
        size="small"
        icon={
          <Box
            component="span"
            sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: '#ef4444', boxShadow: '0 0 4px #ef4444', ml: '6px !important' }}
          />
        }
        label="Live"
        sx={pillSx('#fef2f2', '#fecaca', '#dc2626')}
      />
    );
  }
  if (type === 'organic') {
    return <Chip size="small" label="Organic Pause" sx={pillSx('#f0fdfa', '#99f6e4', '#0f766e')} />;
  }
  return <Chip size="small" label="VoD" sx={pillSx('#eff6ff', '#bfdbfe', '#1d4ed8')} />;
}

function MomentImage({ name }: { name: string }) {
  const [src, setSrc] = useState<string | undefined>(() => imageCache.get(name));

  useEffect(() => {
    if (imageCache.has(name)) {
      setSrc(imageCache.get(name));
      return;
    }
    let alive = true;
    const query = TV_QUERIES[name] || `${name} television show scene`;
    fetch(`/api/unsplash?q=${encodeURIComponent(query)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data) => {
        if (!data?.thumb || !alive) return;
        imageCache.set(name, data.thumb);
        setSrc(data.thumb);
      })
      .catch(() => {
        /* keep placeholder */
      });
    return () => {
      alive = false;
    };
  }, [name]);

  return (
    <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {src ? (
        <Box component="img" src={src} alt="" sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      ) : (
        <VideoLibraryIcon sx={{ fontSize: 22, color: 'var(--faint)', opacity: 0.4 }} />
      )}
    </Box>
  );
}

function MomentCard({ card, onChanged }: { card: MomentCardData; onChanged: () => void }) {
  const selected = !!window.mp2SelectedMoments?.[card.name];
  const visibleCh = card.channels.slice(0, 3);
  const extraCh = card.channels.slice(3);

  const toggle = () => {
    window.mp2ToggleMomentCard?.(card.name);
    onChanged();
  };

  return (
    <Box
      onClick={toggle}
      sx={{
        cursor: 'pointer',
        bgcolor: 'var(--surface)',
        border: selected ? '2px solid' : '1px solid var(--border)',
        borderColor: selected ? 'primary.main' : 'var(--border)',
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'border-color .12s, box-shadow .12s',
        '&:hover': { boxShadow: '0 2px 10px rgba(0,0,0,.07)' },
      }}
    >
      {/* media */}
      <Box sx={{ position: 'relative', width: '100%', pt: '44%' }}>
        <MomentImage name={card.name} />
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{ position: 'absolute', top: 6, left: 6, zIndex: 2, bgcolor: 'rgba(255,255,255,.88)', borderRadius: 1, boxShadow: '0 1px 3px rgba(0,0,0,.2)', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Checkbox
            checked={selected}
            onChange={toggle}
            size="small"
            sx={{ p: 0, '& .MuiSvgIcon-root': { fontSize: 15 } }}
          />
        </Box>
        <Box sx={{ position: 'absolute', top: 6, right: 6, display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {card.refined && (
            <>
              <Tooltip title="Reset to original" arrow placement="top">
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.mp2ResetCard?.(card.name);
                  }}
                  sx={{ p: '2px', bgcolor: 'rgba(255,255,255,.9)', color: 'primary.main', boxShadow: '0 1px 3px rgba(0,0,0,.2)', '&:hover': { bgcolor: '#fff' } }}
                >
                  <RefreshIcon sx={{ fontSize: 13 }} />
                </IconButton>
              </Tooltip>
              <Chip size="small" label="Refined" sx={pillSx('rgba(237,0,94,.9)', 'rgba(237,0,94,.9)', '#fff')} />
            </>
          )}
          <SupplyChip type={card.supplyType} />
          <Chip
            size="small"
            label={card.isHigh ? 'High' : 'Standard'}
            sx={card.isHigh ? pillSx('#f0fdf4', '#bbf7d0', '#16a34a') : pillSx('#fffbeb', '#fde68a', '#d97706')}
          />
        </Box>
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 28, background: 'linear-gradient(to top,rgba(0,0,0,.4),transparent)' }} />
      </Box>

      {/* body */}
      <Box sx={{ p: '9px 10px 11px', position: 'relative' }}>
        <Typography sx={{ fontSize: 11, fontWeight: 600, color: 'var(--text)', mb: 1, lineHeight: 1.3 }}>
          {card.name}
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 0.75, mb: 0.75 }}>
          <KpiCell label="Est. Impr." value={`${card.impM}M`} />
          <KpiCell label="CPM" value={`$${card.cpm}`} />
          <KpiCell label="Inventory" value={card.inventory.toLocaleString()} />
        </Box>

        <Box sx={{ mb: 1.25 }}>
          <Typography sx={kpiLabelSx}>Channels</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px', mt: '1px' }}>
            {visibleCh.map((ch, i) => (
              <Box key={ch} sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                {i > 0 && <Box component="span" sx={{ color: 'var(--faint)', fontSize: 10 }}>·</Box>}
                <Typography component="span" sx={{ fontSize: 10, fontWeight: 500, color: 'var(--text)' }}>
                  {ch}
                </Typography>
              </Box>
            ))}
            {extraCh.length > 0 && (
              <Tooltip
                arrow
                placement="top"
                title={
                  <Box>
                    <Box sx={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.5px', opacity: 0.7, mb: 0.5 }}>
                      Channels included
                    </Box>
                    {card.channels.map((ch) => (
                      <Box key={ch}>{ch}</Box>
                    ))}
                  </Box>
                }
              >
                <Box
                  component="span"
                  onClick={(e) => e.stopPropagation()}
                  sx={{ ml: '3px', fontSize: 9, fontWeight: 600, color: 'var(--muted)', bgcolor: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '20px', px: 0.625, cursor: 'default', whiteSpace: 'nowrap' }}
                >
                  +{extraCh.length}
                </Box>
              </Tooltip>
            )}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.625 }}>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            startIcon={<FilterListIcon sx={{ fontSize: 13 }} />}
            onClick={(e) => {
              e.stopPropagation();
              window.mp2OpenMomentModal?.(card.name, card.score, card.assets);
            }}
            sx={{ flex: 1, textTransform: 'none', fontSize: 10, py: 0.5, minHeight: 0 }}
          >
            Refine Taxonomies
          </Button>
          <Tooltip title="Show examples" arrow placement="top">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                window.mp2ShowExamples?.(card.name, card.score, card.assets, e.currentTarget);
              }}
              sx={{ border: '1px solid var(--border-md, rgba(0,0,0,0.12))', borderRadius: 1, color: 'var(--muted)' }}
            >
              <VideoLibraryIcon sx={{ fontSize: 15 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}

const kpiLabelSx = { fontSize: 9, textTransform: 'uppercase', letterSpacing: '.4px', color: 'var(--faint)', mb: '2px' } as const;

function KpiCell({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Typography sx={kpiLabelSx}>{label}</Typography>
      <Typography sx={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>{value}</Typography>
    </Box>
  );
}

function MomentsGridContent() {
  const [, setVersion] = useState(0);

  useEffect(() => {
    window.mp2NotifyMomentsGrid = () => setVersion((v) => v + 1);
    return () => {
      delete window.mp2NotifyMomentsGrid;
    };
  }, []);

  const cards = window.mp2MomentCardsData ?? [];
  const bump = () => setVersion((v) => v + 1);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 210px), 1fr))', gap: '10px', pb: 2 }}>
      {cards.map((card) => (
        <MomentCard key={card.name} card={card} onChanged={bump} />
      ))}
    </Box>
  );
}

export function MomentsGridBridge() {
  const nodes = useBridgeNodes('[data-moments-grid]', 'momentsGridId');
  return (
    <>
      {nodes.map((node) => createPortal(<MomentsGridContent />, node, node.dataset.momentsGridId))}
    </>
  );
}
