/**
 * KERV UI Kit — Component Registry
 * ----------------------------------------------------------------------------
 * The single, queryable index of EVERY component in the system — the kit
 * primitives plus every component/bridge in the app — so anyone (human or AI)
 * can discover "what exists, where it lives, and how mature it is" without
 * grepping. Add an entry whenever you add a component; promote `status` as you
 * generalize an app component into a reusable kit primitive.
 */

export type ComponentStatus =
  | 'kit-ready' // generalized, reusable, lives in the kit
  | 'app-component' // app-specific React component (could be generalized later)
  | 'app-bridge' // legacy↔React MUI bridge (app infrastructure)
  | 'planned'; // future-state / not yet built for the kit

export type ComponentKind =
  | 'foundation' // tokens/theme
  | 'primitive' // GlassCard, StatusChip…
  | 'layout' // shell, header, sidebar
  | 'control' // inputs, toggles, sliders, selects, buttons
  | 'feedback' // dialog, snackbar, tooltip
  | 'data-display' // cards, tables, stats, rails
  | 'pattern'; // composed flows (page header, results layout)

export interface ComponentEntry {
  /** Unique component name. */
  name: string;
  kind: ComponentKind;
  status: ComponentStatus;
  /** Source path (kit-relative or repo-relative). */
  source: string;
  description: string;
  /** Tokens / kit primitives it relies on. */
  uses?: string[];
  /** SCREENS.md / COMPONENTS.md anchor for the human spec. */
  spec?: string;
}

export const componentRegistry: ComponentEntry[] = [
  // ── Foundations ────────────────────────────────────────────────────────────
  { name: 'tokens', kind: 'foundation', status: 'kit-ready', source: 'ui-kit/tokens.ts', description: 'All design tokens (color, gradient, glass, type, spacing, radii, shadows, motion, z, breakpoints).' },
  { name: 'kervTheme', kind: 'foundation', status: 'kit-ready', source: 'ui-kit/theme.ts', description: 'MUI theme built from tokens (palette, full typography scale, component overrides, glass/gradient extensions).', uses: ['tokens'] },

  // ── Kit primitives ──────────────────────────────────────────────────────────
  { name: 'GlassAppBackground', kind: 'layout', status: 'kit-ready', source: 'ui-kit/components/GlassAppBackground.tsx', description: 'Full-viewport branded gradient wrapper (prod-parity background).', uses: ['gradient'] },
  { name: 'GlassCard', kind: 'primitive', status: 'kit-ready', source: 'ui-kit/components/GlassCard.tsx', description: 'The glass container surface (card / dialog / subtle variants).', uses: ['glass'] },
  { name: 'PageHeader', kind: 'pattern', status: 'kit-ready', source: 'ui-kit/components/PageHeader.tsx', description: 'Two-box header card: back link + title + subtitle.', uses: ['GlassCard', 'typography'], spec: 'COMPONENTS.md#header-card' },
  { name: 'StatusChip', kind: 'primitive', status: 'kit-ready', source: 'ui-kit/components/StatusChip.tsx', description: 'Status pill (vod/live/organic/high/standard/refined).', uses: ['statusPalette'], spec: 'DESIGN-FOUNDATIONS.md#chips' },
  { name: 'KpiStat', kind: 'data-display', status: 'kit-ready', source: 'ui-kit/components/KpiStat.tsx', description: 'Labelled metric (eyebrow label + bold value, optional accent).', uses: ['typography'] },
  { name: 'SegmentedToggle', kind: 'control', status: 'kit-ready', source: 'ui-kit/components/SegmentedToggle.tsx', description: 'Segmented control (active = raised white pill). Input switch / supply-type toggle.', uses: ['color'] },
  { name: 'DetailList', kind: 'data-display', status: 'kit-ready', source: 'ui-kit/components/DetailList.tsx', description: 'Compact key/value list with hairline rows (asset details rail, stat blocks).', uses: ['color'] },

  // ── Themed MUI primitives (use MUI directly — styled by the kit theme) ───────
  { name: 'Button', kind: 'control', status: 'kit-ready', source: 'ui-kit/theme.ts (MuiButton)', description: 'Use MUI <Button>. Themed: 4px radius, flat; variants → primary/outlined/text/dark roles.', spec: 'DESIGN-FOUNDATIONS.md#buttons' },
  { name: 'TextField', kind: 'control', status: 'kit-ready', source: 'ui-kit/theme.ts (MuiOutlinedInput)', description: 'Use MUI <TextField>/<OutlinedInput>. Themed: 8px radius, white fill, magenta focus.' },
  { name: 'Chip', kind: 'primitive', status: 'kit-ready', source: 'ui-kit/theme.ts (MuiChip)', description: 'Use MUI <Chip> for generic pills; <StatusChip> for status. Themed: fully rounded, 10/700.' },
  { name: 'Dialog', kind: 'feedback', status: 'kit-ready', source: 'ui-kit/theme.ts (MuiDialog)', description: 'Use MUI <Dialog>. Themed: glass surface, 16px radius, layered shadow.' },
  { name: 'Tooltip', kind: 'feedback', status: 'kit-ready', source: 'ui-kit/theme.ts (MuiTooltip)', description: 'Use MUI <Tooltip>. Themed: dark pill, 11px. (App legacy uses MuiTipController bridge.)' },
  { name: 'Tabs', kind: 'control', status: 'kit-ready', source: 'ui-kit/theme.ts (MuiTabs/MuiTab)', description: 'Use MUI <Tabs>/<Tab>. Themed: magenta underline indicator, non-uppercase, magenta active.' },
  { name: 'Alert / Snackbar', kind: 'feedback', status: 'kit-ready', source: 'ui-kit/theme.ts (MuiAlert)', description: 'Use MUI <Alert>/<Snackbar>. Themed: 8px radius. (App legacy uses SnackbarBridge.)' },
  { name: 'Slider', kind: 'control', status: 'kit-ready', source: '@mui/material (color="primary")', description: 'Use MUI <Slider> in magenta. (App legacy uses MuiSliderBridge.)' },
  { name: 'Select', kind: 'control', status: 'kit-ready', source: '@mui/material', description: 'Use MUI <Select>. (App legacy uses MuiSelectBridge.)' },

  // ── App layout / chrome ──────────────────────────────────────────────────────
  { name: 'AppShell', kind: 'layout', status: 'app-component', source: 'src/layouts/AppShell.tsx', description: 'Two-column shell (sidebar | header+content) on the gradient.', spec: 'COMPONENTS.md#appshell' },
  { name: 'AppHeader', kind: 'layout', status: 'app-component', source: 'src/layouts/AppHeader.tsx', description: 'Top bar: brand lockup, profile menu/drawer (+ demo controls).', spec: 'COMPONENTS.md#appheader' },
  { name: 'Sidebar', kind: 'layout', status: 'app-component', source: 'src/layouts/Sidebar.tsx', description: 'Collapsible nav rail; 44px app-icon buttons.', spec: 'COMPONENTS.md#sidebar' },

  // ── Generic bridges (reusable infra) ──────────────────────────────────────────
  { name: 'useBridgeNodes', kind: 'foundation', status: 'app-bridge', source: 'src/bridges/useBridgeNodes.ts', description: 'Hook that finds legacy mount nodes for portaling MUI in.' },
  { name: 'MuiTipController', kind: 'feedback', status: 'app-bridge', source: 'src/bridges/MuiTipController.tsx', description: 'Global hover tooltip via data-mui-tip.' },
  { name: 'MuiSliderBridge', kind: 'control', status: 'app-bridge', source: 'src/bridges/MuiSliderBridge.tsx', description: 'MUI Slider bridged via data-mui-slider.' },
  { name: 'MuiSelectBridge', kind: 'control', status: 'app-bridge', source: 'src/bridges/MuiSelectBridge.tsx', description: 'MUI Select bridged via data-mui-select.' },
  { name: 'ProgressBarBridge', kind: 'feedback', status: 'app-bridge', source: 'src/bridges/ProgressBarBridge.tsx', description: 'Scan/progress bar mount → MUI LinearProgress.' },
  { name: 'SnackbarBridge', kind: 'feedback', status: 'app-bridge', source: 'src/bridges/SnackbarBridge.tsx', description: 'window.mp2Notify(msg) → MUI Snackbar w/ optional action link.' },

  // ── Auth ──────────────────────────────────────────────────────────────────────
  { name: 'AuthContext', kind: 'foundation', status: 'app-component', source: 'src/features/auth/AuthContext.tsx', description: 'Auth state/provider.' },
  { name: 'LoginScreen', kind: 'pattern', status: 'app-component', source: 'src/features/auth/LoginScreen.tsx', description: 'Login card.', spec: 'COMPONENTS.md#loginscreen' },

  // ── Media planner feature ──────────────────────────────────────────────────────
  { name: 'MomentCard', kind: 'data-display', status: 'app-component', source: 'src/features/media-planner/MomentsGrid/MomentCard.tsx', description: 'Moment card: media, chips, KPIs, channels, actions.', uses: ['MomentImage', 'StatusChip', 'KpiStat'], spec: 'COMPONENTS.md#moment-card' },
  { name: 'MomentImage', kind: 'primitive', status: 'app-component', source: 'src/features/media-planner/MomentsGrid/MomentImage.tsx', description: 'Card thumbnail (runtime fetch + bundled fallback).' },
  { name: 'SupplyChip', kind: 'primitive', status: 'app-component', source: 'src/features/media-planner/MomentsGrid/SupplyChip.tsx', description: 'App copy of the supply-type pill (see kit StatusChip).' },
  { name: 'MomentsGrid', kind: 'data-display', status: 'app-component', source: 'src/features/media-planner/MomentsGrid/MomentsGrid.tsx', description: 'Responsive grid of MomentCards (+ bridge).' },
  { name: 'MomentsFilter', kind: 'control', status: 'app-component', source: 'src/features/media-planner/MomentsFilter.tsx', description: 'Filters button + overlay panel (score/channel/cpm/platform).', spec: 'COMPONENTS.md#filters-panel' },
  { name: 'MomentTypeToggle', kind: 'control', status: 'app-component', source: 'src/features/media-planner/MomentTypeToggle.tsx', description: 'VoD/Organic/Live segmented toggle.' },
  { name: 'RefineModalBridge', kind: 'feedback', status: 'app-bridge', source: 'src/features/media-planner/RefineModalBridge.tsx', description: 'Refine-taxonomy modal (chart + vote rows).', spec: 'COMPONENTS.md#refine-taxonomy-modal' },
  { name: 'SaveMediaPlanDialog', kind: 'feedback', status: 'app-bridge', source: 'src/features/media-planner/SaveMediaPlanDialog.tsx', description: 'Name-and-save dialog.' },

  // ── Pages ───────────────────────────────────────────────────────────────────
  { name: 'MediaPlannerV2', kind: 'pattern', status: 'app-component', source: 'src/pages/MediaPlannerV2.tsx', description: 'Mounts the legacy media-planner flow + all its bridges.', spec: 'SCREENS.md#2-media-planner-demo' },
  { name: 'ContextualAdDemos', kind: 'pattern', status: 'app-component', source: 'src/pages/ContextualAdDemos.tsx', description: 'Placeholder page with FPO image.', spec: 'SCREENS.md#3-contextual-ad-demos' },
];

// ── Query helpers ───────────────────────────────────────────────────────────
export const byStatus = (s: ComponentStatus) => componentRegistry.filter((c) => c.status === s);
export const byKind = (k: ComponentKind) => componentRegistry.filter((c) => c.kind === k);
export const find = (name: string) => componentRegistry.find((c) => c.name === name);
/** Components that are reusable kit primitives today. */
export const kitComponents = () => byStatus('kit-ready');
/** App components that are good candidates to generalize into the kit next. */
export const promotionCandidates = () =>
  componentRegistry.filter((c) => c.status === 'app-component' && (c.kind === 'primitive' || c.kind === 'data-display' || c.kind === 'control'));

export default componentRegistry;
