import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Box, Button, Tab, Tabs } from '@mui/material';
import { useBridgeNodes } from '@/bridges/useBridgeNodes';

// Bridges the legacy "Refine Moment" modal's tab bar and footer actions to MUI.
// The taxonomy rows + Highcharts scatter inside stay legacy (dynamic list / chart
// — flagged for a future full React rewrite). Mount points:
//   <div data-refine-tabs='[{"id","label"},...]'>  → MUI Tabs (calls window.mp2RefineTab)
//   <div data-refine-actions data-name data-score data-assets> → Reset/Apply MUI Buttons
declare global {
  interface Window {
    mp2RefineTab?: (id: string) => void;
    mp2ResetRefinements?: () => void;
    mp2SubmitRefinements?: (name: string, score: number, assets: number) => void;
  }
}

function RefineTabs({ node }: { node: HTMLElement }) {
  let tabs: { id: string; label: string }[] = [];
  try {
    tabs = JSON.parse(node.dataset.refineTabs ?? '[]');
  } catch {
    tabs = [];
  }
  const [value, setValue] = useState(tabs[0]?.id ?? '');
  return (
    <Tabs
      value={value}
      onChange={(_, v) => {
        setValue(v);
        window.mp2RefineTab?.(v);
      }}
      variant="scrollable"
      scrollButtons="auto"
      textColor="primary"
      indicatorColor="primary"
      sx={{
        minHeight: 42,
        '& .MuiTab-root': { minHeight: 42, textTransform: 'none', fontSize: 13, fontWeight: 500 },
      }}
    >
      {tabs.map((t) => (
        <Tab key={t.id} value={t.id} label={t.label} />
      ))}
    </Tabs>
  );
}

function RefineActions({ node }: { node: HTMLElement }) {
  const name = node.dataset.name ?? '';
  const score = Number(node.dataset.score ?? 0);
  const assets = Number(node.dataset.assets ?? 0);
  return (
    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
      <Button variant="outlined" color="primary" onClick={() => window.mp2ResetRefinements?.()}>
        Reset all
      </Button>
      <Button variant="contained" onClick={() => window.mp2SubmitRefinements?.(name, score, assets)}>
        Apply Refinement
      </Button>
    </Box>
  );
}

export function RefineModalBridge() {
  const tabNodes = useBridgeNodes('[data-refine-tabs]', 'refineTabsId');
  const actionNodes = useBridgeNodes('[data-refine-actions]', 'refineActionsId');
  return (
    <>
      {tabNodes.map((n) => createPortal(<RefineTabs node={n} />, n, n.dataset.refineTabsId))}
      {actionNodes.map((n) => createPortal(<RefineActions node={n} />, n, n.dataset.refineActionsId))}
    </>
  );
}
