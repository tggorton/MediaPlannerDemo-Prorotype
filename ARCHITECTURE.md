# Architecture & where things live

A quick map so any engineer can find the right file fast. This is a **React +
MUI (Vite)** shell that mounts a large **legacy vanilla-JS app** and bridges
real MUI components into it.

## The two halves

| Half | Where | What it is |
|------|-------|-----------|
| **React app** | `src/` | The shell: routing, layout/chrome, auth, and React/MUI components that bridge into the legacy app. |
| **Legacy app** | `public/legacy/*.js` | The Media Planner itself — `media-planner-v2.js` renders HTML strings into a mount point. Cannot import MUI, so it talks to React via **bridges**. |

Path alias: **`@/` → `src/`** (configured in `vite.config.ts` + `tsconfig.app.json`). Import as `@/bridges/...`, `@/features/...`, etc.

## `src/` layout (feature-based)

```
src/
  main.tsx, App.tsx        Entry + routing (BrowserRouter, route → page)
  layouts/                 App frame / chrome
    AppShell.tsx             Two-column shell (sidebar | header+content)
    AppHeader.tsx            Top bar: brand lockup (→ Generate), profile, reset
    Sidebar.tsx              Collapsible nav rail
  bridges/                 GENERIC legacy↔React bridges (reusable by any feature)
    useBridgeNodes.ts        MutationObserver hook that finds legacy mount nodes
    MuiTipController.tsx     Global tooltip (data-mui-tip)
    MuiSliderBridge.tsx      data-mui-slider → MUI <Slider>
    MuiSelectBridge.tsx      data-mui-select → MUI <Select>
    ProgressBarBridge.tsx    progress bar mount → MUI <LinearProgress>
    SnackbarBridge.tsx       window.mp2Notify(msg) → MUI <Snackbar>
  features/                Domain features
    auth/
      AuthContext.tsx        Auth state/provider
      LoginScreen.tsx        Login page
    media-planner/           Everything specific to the Media Planner
      MomentsGrid/           The moments cards (decomposed):
        index.ts               public entry (re-exports MomentsGridBridge)
        MomentsGrid.tsx        grid + bridge
        MomentCard.tsx         one card
        MomentImage.tsx        card thumbnail (fetch + fallback)
        SupplyChip.tsx         status pills (+ shared pillSx)
        momentImages.ts        image queries / bundled fallbacks / cache
        types.ts               MomentCardData + legacy window globals
      MomentsFilter.tsx        Filters button + panel (data-moments-filter)
      MomentTypeToggle.tsx     Ads/Organic/Live toggle bridge
      RefineModalBridge.tsx    Refine-moment modal bridge
      SaveMediaPlanDialog.tsx  Save-plan dialog bridge
  pages/                   Routed pages (thin; media-planner mounts the legacy app)
  data/navConfig.tsx       Sidebar nav definition
  utils/titleCase.ts       Small shared helpers
  styles/globals.css       Global CSS (legacy classes like .ptitle live here)
```

## Styles & theme

- **Theme / design tokens:** `kerv-one-theme/` (local package, `@kerv-one/theme`) —
  MUI theme, magenta primary `#ED005E`, typography, `glassSection`. Button radius
  (4px) and other component defaults are set here.
- **Global CSS:** `src/styles/globals.css` (React) and `public/legacy/sdt-styles.js`
  (injected for the legacy app — media queries, `.cs-card`, header collapse, etc.).
- **Bundled images:** `public/assets/` (moment thumbnails, logo, FPO placeholder).

## How the legacy ↔ React bridge works

Legacy HTML can't use MUI, so it emits a marker (`data-mui-slider`,
`data-mui-select`, `data-mui-tip`, a mount `<div>`, or calls a `window.fn`), and a
React **bridge** in `src/bridges/` (or a feature folder) finds it via
`useBridgeNodes` and `createPortal`s a real MUI component in. To add UI, prefer a
bridge over hand-rolled HTML — see the `mui-consistency` skill.

## Conventions worth knowing (see `.claude/skills/`)

- **`mui-consistency`** — use MUI / bridges, not hand-rolled controls.
- **`layout-spacing`** — canonical spacing/typography tokens and where they live.
- **`page-layout`** — the two-box (header card + content card) page pattern.
- **`feature-flags`** — `MP2_FEATURES` reversible hide/show (don't delete hidden code).
- **`processing-speed`** — the demo scan-animation speed knob.

## Notes

- The legacy `public/legacy/*.js` files are loaded together in `index.html`;
  `media-planner.js` (v1) and `taxonomy-explorer.js` provide shared data globals
  used by `media-planner-v2.js`, so they aren't dead even though there's no v1 UI.
- Session state (saved plans, current view) persists to `localStorage`
  (`mp2_session_v1`); the header **Reset experience** button clears it.
