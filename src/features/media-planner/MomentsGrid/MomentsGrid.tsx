import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Box } from '@mui/material';
import { useBridgeNodes } from '@/bridges/useBridgeNodes';
import type { MomentCardData } from './types';
import { MomentCard } from './MomentCard';

// React/MUI rewrite of the Moments-Match card grid. The legacy
// mp2RenderMomentCards() publishes the filtered card data on
// window.mp2MomentCardsData and calls window.mp2NotifyMomentsGrid() to trigger a
// re-read; the cards call back into the legacy window functions (see ./types)
// so the media-plan panel, refine modal, and refined stats stay in sync.
//
// Sub-components live alongside this file:
//   MomentCard.tsx    — one card (chips, KPIs, channels, actions)
//   MomentImage.tsx   — the card thumbnail (fetch + fallback)
//   SupplyChip.tsx    — supply-type/status pills (+ shared pillSx)
//   momentImages.ts   — image queries / bundled fallbacks / cache
//   types.ts          — MomentCardData + the legacy window globals
function MomentsGridContent() {
  const [, setVersion] = useState(0);

  useEffect(() => {
    window.mp2NotifyMomentsGrid = () => setVersion((v) => v + 1);
    return () => {
      delete window.mp2NotifyMomentsGrid;
    };
  }, []);

  const cards: MomentCardData[] = window.mp2MomentCardsData ?? [];
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
