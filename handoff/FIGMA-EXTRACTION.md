# Figma Extraction Manifest

A precise plan for reconstructing the app in Figma so it lines up 1:1 with the
code and the hand-off docs. Use it with a **web→Figma import** (the MCP can't
create Figma nodes — it reads Figma and does Code Connect; see `HANDOFF.md`).

- **Target file:** MediaPlanner-Demo — `https://www.figma.com/design/Vs0080FHzuseEeIQcK2XmH/MediaPlanner-Demo`
- **Naming rule:** match the **component registry** names exactly
  (`ui-kit/registry.ts`) so Figma ↔ code ↔ docs resolve unambiguously. Screens
  use the `SCREENS.md` titles; components use `COMPONENTS.md` / registry names.
- **Capture width:** the design target ≈ **1800×1169** ("More Space"). Capture
  desktop frames at ~1800px wide.

---

## Step 1 — Import the screens

The app runs at `http://localhost:3000` (dev) or your Vercel URL. Use the
**html.to.design browser extension** to capture each rendered screen (it works on
localhost; the server-side URL import does not).

> **Import budget — you only need ~8 (≤10 free is plenty).** Each import brings the
> **whole screen in as editable layers**, so every component on that screen comes
> with it. You **harvest components from inside the imported screens** (select →
> Create Component) — you do NOT import per component. Variations (collapsed
> sidebar, Brief/VAST input, filters closed, profile menu, etc.) are **rebuilt in
> Figma by editing the imported layers**, not re-imported.

Organize into Figma **pages**: `01 · Auth`, `02 · Media Planner`,
`03 · Contextual Ad`, `04 · Components`, `05 · Foundations`. Each import → its own
named frame.

### The 8-import plan (covers every screen + component)

| # | Import (set this state, then capture) | Components it yields |
|---|----------------------------------------|----------------------|
| 1 | **Login** (signed out) | Login |
| 2 | **Generate · New Plan**, Video option, **library dropdown open** | Sidebar, AppHeader, PageHeader, GlassCard, home tabs, SegmentedToggle, LibrarySelect, upload zone, LookbackSlider, AI param picker, Button |
| 3 | **Generate · Media Plans** tab | SavedPlanRow (edit/delete actions only — DSP/status badges are hidden future-state) |
| 4 | **Builder**, 1 moment **selected** + **Filters panel open** | AssetRail, MomentTypeToggle, MomentCard (default+selected), MomentImage, MomentsFilter, MediaPlanRail, StatusChip, KpiStat |
| 5 | **Builder · Refine modal open** (on a refined card) | RefineModal, MomentCard (refined) |
| 6 | **Builder · Save dialog open** (or capture the post-save toast) | SaveMediaPlanDialog, Snackbar |
| 7 | **Your Media Plans** (open a saved plan) | SavedPlanTable, plan-detail header, DetailList |
| 8 | **Contextual Ad Demos** | FpoPlaceholder |

**2 reserve imports** — use only if you want pixel-exact rather than rebuilt:
*Generate · New Plan · Brief* and *· VAST* input states. (Otherwise duplicate
frame 2 and swap just the Step-2 input area.)

> Exclude future-state UI when capturing (don't expose it).

---

## Step 2 — Full screen inventory  (MVP only)

The complete set of MVP screens and their target frame names. **Import** the ones
covered by the 8-import plan above; **rebuild** the rest in Figma by editing an
imported frame (no extra import). The `Source` column ties to the plan.

| Figma frame name | How to reach it | Spec | Source |
|------------------|-----------------|------|--------|
| `Screen / Login` | Load app, signed out | SCREENS §1 | **import 1** |
| `Screen / Generate · New Plan · Video` | `/media-planner-v2`, New Plan tab, Video (default), dropdown open | SCREENS §2a | **import 2** |
| `Screen / Generate · New Plan · Brief` | click **Brief** segment | SCREENS §2a | rebuild from import 2 (or reserve) |
| `Screen / Generate · New Plan · VAST` | click **VAST Tag** segment | SCREENS §2a | rebuild from import 2 (or reserve) |
| `Screen / Generate · Media Plans` | Generate page, **Media Plans** tab | SCREENS §2a | **import 3** |
| `Screen / Processing` | click **Start Analysis** (capture mid-scan) | SCREENS §2b | rebuild (transient) — optional |
| `Screen / Builder · Moments Match` | Builder, 1 moment selected + Filters open | SCREENS §2c | **import 4** |
| `Screen / Builder · Refine modal` | a card → **Refine Taxonomies** | SCREENS §2c | **import 5** |
| `Screen / Builder · Save dialog` | Plan rail → **Save Media Plan** (or post-save toast) | SCREENS §2c | **import 6** |
| `Screen / Your Media Plans` | open a saved plan from Media Plans tab | SCREENS §2d | **import 7** |
| `Screen / Contextual Ad Demos` | `/contextual-ad-demos` | SCREENS §3 | **import 8** |

**Chrome states — all rebuilt in Figma from the imports above (no extra imports):**
| Figma frame name | State |
|------------------|-------|
| `Chrome / Sidebar · expanded` / `· collapsed` | edit the rail width on an import |
| `Chrome / Header · default` / `· profile menu` / `· profile drawer` | rebuild the menu/drawer |
| `Chrome / PageHeader · expanded` / `· collapsed` | duplicate + shrink the header on an import |

> Exclude future-state UI (Previous Analysis tab, Ad Analysis / AI Media Plan
> tabs, Export to IO / Activate via DSP, and the saved-plan **Refresh DSP** button
> / **status pill** / **DSP platform badge**) — do **not** expose it for capture.

---

## Step 3 — Componentize  (turn imports into Figma components)

**Fastest path: the `KERV Componentizer` plugin** (`figma-plugin/` — see its
README). It auto-converts the distinctively-named nodes (header card, glass card,
asset rail, saved-plan row…) and gives a "componentize selection as…" mode for the
generically-named ones (moment card, sidebar, buttons). Then refine variants by
hand.

Either way, name each component exactly as shown and add the listed **variants**
(Figma component properties). Place them on the `04 · Components` page. Names match
`ui-kit/registry.ts`.

| Figma component | Variants / props | Code source | Spec |
|-----------------|------------------|-------------|------|
| `GlassCard` | variant = card · dialog · subtle | `ui-kit/components/GlassCard.tsx` | FOUNDATIONS §3 |
| `PageHeader` | hasBack = true·false; state = expanded·collapsed | `ui-kit/components/PageHeader.tsx` | COMPONENTS · Header card |
| `Sidebar` | state = expanded·collapsed | `src/layouts/Sidebar.tsx` | COMPONENTS · Sidebar |
| `AppHeader` | — | `src/layouts/AppHeader.tsx` | COMPONENTS · AppHeader |
| `SegmentedToggle` | options = 2·3; active index | `ui-kit/components/SegmentedToggle.tsx` | COMPONENTS · Input toggle |
| `StatusChip` | kind = vod·live·organic·high·standard·refined | `ui-kit/components/StatusChip.tsx` | FOUNDATIONS §10 |
| `KpiStat` | accent = true·false; align = left·right | `ui-kit/components/KpiStat.tsx` | FOUNDATIONS |
| `DetailList` (row) | — | `ui-kit/components/DetailList.tsx` | COMPONENTS · Asset rail |
| `Button` | variant = primary·outlined·text·dark; size = sm·md·lg | `ui-kit/theme.ts (MuiButton)` | FOUNDATIONS §8 |
| **`MomentCard`** | state = default·selected·refined; supply = vod·live·organic; match = high·standard | `src/features/media-planner/MomentsGrid/MomentCard.tsx` | COMPONENTS · Moment card |
| `MomentImage` | state = image·fallback·placeholder | `…/MomentsGrid/MomentImage.tsx` | — |
| `MomentsFilter` (panel) | open | `src/features/media-planner/MomentsFilter.tsx` | COMPONENTS · Filters panel |
| `MomentTypeToggle` | active = vod·organic·live | `src/features/media-planner/MomentTypeToggle.tsx` | — |
| `RefineModal` | tab = emotion·location·objects·iab; json = closed·open | `src/features/media-planner/RefineModalBridge.tsx` | COMPONENTS · Refine modal |
| `SaveMediaPlanDialog` | — | `src/features/media-planner/SaveMediaPlanDialog.tsx` | COMPONENTS |
| `Snackbar` | hasAction = true·false | `src/bridges/SnackbarBridge.tsx` | COMPONENTS · Snackbar |
| `LibrarySelect` | state = closed·open | `src/bridges/MuiSelectBridge.tsx` | COMPONENTS · Library Select |
| `LookbackSlider` | — | `src/bridges/MuiSliderBridge.tsx` | COMPONENTS |
| `AssetRail` | kind = video·vast·brief·upload | `mp2AssetMeta()` in media-planner-v2.js | COMPONENTS · Asset rail |
| `SavedPlanRow` | type = video·brief·vast | `mp2ShowUpload` plansRows | COMPONENTS · Saved-plan list row |
| `SavedPlanTable` | — | `mp2ShowMediaPlanDetail` | COMPONENTS · Saved-plan table |
| `FpoPlaceholder` | — | `src/pages/ContextualAdDemos.tsx` | COMPONENTS · Placeholder |

`MomentCard` is the flagship — build it as a true component with the state matrix
above so the whole grid is instances of one component.

---

## Step 4 — Foundations as Figma styles/variables

Recreate the tokens as Figma **variables** + **styles** so components inherit them.
All values are in `DESIGN-FOUNDATIONS.md` and `ui-kit/tokens.ts`.

- **Color variables:** brand (`primary.*`), neutrals (`--surface/bg/text/muted/faint/border*`), status palettes (vod/live/organic/high/standard/refined). → Figma color variables under `color/…`.
- **Text styles:** h4 page title, h5/h6, body1, button, subtitle, eyebrow/overline, kpi. → `text/…`.
- **Effect styles:** card shadow, rail shadow, dialog shadow, popover, card-hover, focus ring. → `effect/…`.
- **The glass treatment** (card/rail/dialog): fill `rgba(255,255,255,.5/.4/.8)`, 2px white border, blur, 16px radius — recreate as a style or a base `GlassCard` component (Figma can approximate `backdrop-filter` with a blurred background layer).
- **Background gradient:** the 128° pink→lavender stops as a frame fill on the page (FOUNDATIONS §2).

---

## Step 5 — Label / link Figma ↔ code (Code Connect, via MCP)

Once the components exist in Figma, I can run **Code Connect** through the MCP to
formally link each Figma component to its code component + hand-off anchor — the
"label them to align" goal. To do that I'll need, per component:
- the **Figma node ID** (right-click component → Copy link, or Dev Mode),
- the **code source** (from the table above / `registry.ts`).

Send me the node IDs (or share Dev Mode access) and I'll generate and push the
mappings. After that, opening any component in Figma Dev Mode shows its real code
path + hand-off reference.

---

## Quick reference

- Screen specs → [`SCREENS.md`](SCREENS.md)
- Component anatomy → [`COMPONENTS.md`](COMPONENTS.md)
- Tokens/values → [`DESIGN-FOUNDATIONS.md`](DESIGN-FOUNDATIONS.md) · [`ui-kit/tokens.ts`](ui-kit/tokens.ts)
- Component index → [`ui-kit/registry.ts`](ui-kit/registry.ts)
