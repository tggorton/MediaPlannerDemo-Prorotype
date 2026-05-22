# KERV UI Kit (starter)

A **robust, standalone UI kit** that extends the original `kerv-one-theme` into a
managed design system — authored for hand-off and meant to grow. It is the
"how it's built" companion to the design specs (`../DESIGN-FOUNDATIONS.md`,
`../COMPONENTS.md`).

> **Standalone.** This folder is intentionally NOT wired into the app build
> (`tsconfig` `include` is `src/` only). It's reference/starter code: lift it into
> a real package (`@kerv/ui-kit`) when you're ready to consume it app-wide. The
> app keeps using its current `kerv-one-theme` until then — nothing here changes
> the running app.

## What's here

```
ui-kit/
  tokens.ts        Single source of truth — every design token, fully explicit.
  theme.ts         MUI theme built from tokens (palette, full type scale,
                   component overrides, glass + gradient extensions).
  components/       Reusable kit primitives (generalized from the app):
    GlassAppBackground   full-viewport branded gradient (prod-parity bg)
    GlassCard            the glass surface (card / dialog / subtle)
    PageHeader           two-box header card (back + title + subtitle)
    StatusChip           vod/live/organic/high/standard/refined pills
    KpiStat              labelled metric
    index.ts             barrel
  registry.ts      Manifest of EVERY component (kit + app) — the access index.
  index.ts         Public entry (tokens + theme + components + registry).
  README.md        This file.
```

## Coverage (what a "standard system" needs)

| Area | Status | Where |
|------|--------|-------|
| **Color** (brand, neutral, semantic, status palettes) | ✅ complete | `tokens.color`, `tokens.statusPalette` |
| **Typography** (h1–h6, body, button, caption, overline, eyebrow, kpi) | ✅ complete | `tokens.typography`, `theme.typography` |
| **Spacing / layout** (gutters, sidebar, two-box) | ✅ complete | `tokens.spacing`, `tokens.sidebar` |
| **Radii / shadows / motion / z-index / breakpoints** | ✅ complete | `tokens.*` |
| **Gradient + glass surfaces** (the prod-parity look) | ✅ complete | `tokens.gradient`, `tokens.glass`, `GlassAppBackground`, `GlassCard` |
| **Buttons / inputs / chips / dialogs / tooltips / tabs / alerts** | ✅ themed | use MUI directly — styled by `theme.ts` (registered in `registry.ts`) |
| **Sliders / selects / snackbars** | ✅ themed | MUI in React; the app also bridges these into legacy |
| **Kit primitives** (GlassCard, PageHeader, StatusChip, KpiStat, SegmentedToggle, DetailList) | ✅ built | `components/` |
| **Page header pattern** (two-box) | ✅ built | `PageHeader` |
| **Menus / drawers / accordions** | ◑ MUI default + theme palette | use MUI; no bespoke override yet |
| **Avatar, badge, breadcrumb, stepper, pagination, table, skeleton, checkbox/radio/switch presets** | ○ roadmap | not yet specced as kit components — use MUI with the theme; promote as needed |
| **Component registry / discovery** | ✅ complete | `registry.ts` |

**Philosophy:** the kit is **theme-first** — most "standard" controls are plain
MUI components styled by `theme.ts` (so you get the whole MUI library themed for
free), plus a small set of **bespoke primitives** for the KERV-specific patterns
(glass, status pills, the two-box header, segmented toggle, detail list). The
registry indexes both. The roadmap row is the honest gap list — none of it
blocks use, since MUI + the theme cover it; build bespoke versions only when a
pattern recurs.

## Using it

```tsx
import { ThemeProvider, CssBaseline } from '@mui/material';
import { kervTheme, GlassAppBackground, GlassCard, PageHeader, StatusChip, KpiStat } from './ui-kit';

<ThemeProvider theme={kervTheme}>
  <CssBaseline />
  <GlassAppBackground>
    <PageHeader title="Generate Media Plan" subtitle="Upload a video, brief, or VAST tag…" />
    <GlassCard sx={{ p: 4 }}>
      <StatusChip kind="vod" />
      <KpiStat label="Avg CPM" value="$25" accent />
    </GlassCard>
  </GlassAppBackground>
</ThemeProvider>
```

Tokens are also importable directly for ad-hoc styling:
`import { color, glass, spacing } from './ui-kit';`

## Managing & accessing components — the registry

`registry.ts` is the **index of everything** — every kit primitive AND every app
component/bridge — each with `name`, `kind`, `status`, `source` path, `description`,
what it `uses`, and a `spec` anchor. This is how a human or AI answers "what
exists and where does it live?" without searching the codebase.

```ts
import { componentRegistry, byStatus, byKind, find, promotionCandidates } from './ui-kit';

kitComponents();            // generalized, reusable today
byKind('control');          // every input/toggle/slider/select
byStatus('app-bridge');     // every legacy↔React bridge
find('MomentCard');         // one entry (source, deps, spec link)
promotionCandidates();      // app components worth generalizing next
```

**`status` ladder** (how a component matures into the kit):
`app-bridge` / `app-component` → (generalize) → `kit-ready`. `planned` is for
future-state pieces not yet built.

## Adding a component

1. Build/generalize it under `components/` (depend on `tokens`, not hard-coded
   values).
2. Export it from `components/index.ts`.
3. **Add a `registry.ts` entry** (name, kind, status `kit-ready`, source,
   description, `uses`, `spec`). This is required — the registry is the contract.
4. If it documents a screen/part, link it from `../COMPONENTS.md` / `../SCREENS.md`.

To **promote** an existing app component (e.g. generalize `MomentCard`'s pieces):
move/refactor the reusable part into `components/`, swap hard-coded values for
tokens, flip its registry `status` to `kit-ready`, and point the app at the kit.
Use `promotionCandidates()` to see the shortlist.

## Relationship to the running app

- The app's live theme: `../kerv-one-theme` (don't change for this hand-off).
- This kit mirrors that visual language but is **more complete and explicit**, and
  is the intended forward path for a robust, shared system.
- Foundations parity items the prod app is missing (gradient, glass, transparency)
  are encoded here as `GlassAppBackground` + `GlassCard` + the `glass`/`gradient`
  tokens — copy those values to bring prod to parity (see `../HANDOFF.md`).
