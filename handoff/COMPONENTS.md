# Components — catalog (MVP)

Every reusable piece in the shipping experience: its anatomy, styling (by token —
see [DESIGN-FOUNDATIONS.md](DESIGN-FOUNDATIONS.md)), states, and where it lives in
code ([../ARCHITECTURE.md](../ARCHITECTURE.md)). Hidden/future-state components
are omitted.

> **Implementation note.** React/MUI components live in `src/`. The media-planner
> screens are rendered by a legacy vanilla-JS file (`public/legacy/media-planner-v2.js`)
> that emits HTML; real MUI controls are **bridged** into it (a marker attribute or
> `window.fn` → a React portal). Either way the *design* is identical and is what
> this catalog specifies. Bridges live in `src/bridges/` and `src/features/`.

---

## Primitives

### Glass card
The container surface for every box. Spec under Foundations → *Glass surfaces →
Glass card*. Padding 32px (content) or 18px 32px (header card). `.cs-card` /
MUI `glassSection`.

### Buttons
Foundations → *Buttons*. Primary (hero magenta), Outlined (magenta), Text, Dark.
4px radius, no elevation.

### Chips / badges / pills
Foundations → *Chips*. Supply (VoD/Live/Organic), match (High/Standard), Refined,
channel tags, confidence %.

### Tooltip
Global hover tooltip — dark pill, 11px white. Legacy elements opt in with
`data-mui-tip="…"`; React uses MUI `<Tooltip>`. `src/bridges/MuiTipController.tsx`.

---

## Layout & chrome

### AppShell
Two-column flex layout on the fixed gradient. Left column animates 64↔220px.
Mounts the global tooltip controller. `src/layouts/AppShell.tsx`.

### Sidebar
Collapsible nav rail (lighter glass). Collapse chevron row (top), then per-section
nav items as 44×44 rounded-8 icon buttons (16px apart). Icons: outlined, `grey.500`;
**active** = grey rounded square (`action.selected`). Tooltip on hover when
collapsed. `src/layouts/Sidebar.tsx`; items from `src/data/navConfig.tsx`.

### AppHeader
Transparent top bar (32px padding). **Brand lockup** (36px K logo + `| Sales Demo
Tool` 20px/500) — clickable → Generate home. **Profile** icon → MUI Menu (name +
email, Profile, Sign out) and a right **Profile drawer** (edit display name).
`src/layouts/AppHeader.tsx`.
*(Also hosts the demo-only Reset / Expose-future-state controls — not MVP product.)*

### Header card (two-box page header)
Glass card holding: an absolutely-positioned **collapse chevron** (top-right), a
**back link** (when present; 14px uppercase magenta with arrow), and the **title +
subtitle** (`.ptitle` 34px / `.psub` 13px). Collapses on scroll (see SCREENS →
collapsible header). Legacy `#mp2-header-card`; filled via `mp2SetTitle` /
`mp2SetBackLink`.

### LoginScreen
Centered opaque card (not glass) on `--bg`. Lockup, title/subtitle, two fields
(magenta focus ring), full-width magenta CTA, demo-credentials hint box.
`src/features/auth/LoginScreen.tsx`.

---

## Generate Media Plan

### Home tabs
Underline tabs (New Plan · Media Plans), magenta active underline + magenta active
label. Legacy `.tx2-home-tab`.

### Input toggle (Video · Brief · VAST Tag)
Segmented control inside a `--bg` track (3px padding, 8px radius). Each segment
`flex:1`, icon + label, 30px tall; **active** = white raised segment (`--surface`,
soft shadow) with magenta text. Icons: `video-library`, `description`, `code`.

### Library Select ("Pull from library")
Real **MUI `<Select>`** bridged into the legacy video input: `--surface` bg, 4px
radius, 13px, placeholder in `--faint`, MUI menu popover (8px radius). Selecting a
video sets it as the asset. `src/bridges/MuiSelectBridge.tsx` via
`[data-mui-select]`.

### Upload drop-zone
Dashed-ish bordered box: centered icon (28–32px `--faint`), "Drop … here" (13px),
format hint (11px `--faint`). Click opens the file picker.

### Brief / VAST input
Bordered glass-inner box (`--surface`): a borderless textarea (160px min) over a
hairline divider and an upload row (icon + label, hover bg). VAST adds a "Single
tag only" tooltip and accepts `.csv`.

### Lookback slider
MUI `<Slider>` (magenta), 30–300s, step 15; label shows minutes/seconds in accent;
info tooltip. `src/bridges/MuiSliderBridge.tsx` via `[data-mui-slider]`.

### AI parameter picker (Step 1)
Inline natural-language sentence with **dotted-underline editable params**. Click a
param → an inline picker (multi-select checkbox lists, a date calendar, numeric
choices). Selected values render in `--text`; unset show "Select …" in muted.

### Saved-plan list row
Row: input-type icon · name (13px/500) · meta (11px `--faint`, dot-separated) ·
right action icon-buttons (**edit / delete** — 26px bordered, hover tint). Whole
row (icon/name) is clickable → detail.

> **Future-state (hidden):** the **Refresh DSP** icon-button, the **status pill**
> (Live / Pending / Error), and the **DSP platform badge** (DV360 / The Trade Desk
> / Xandr) are DSP-tied and hidden for the demo
> (`MP2_FEATURES.savedPlanDspControls`). Not part of the MVP hand-off; revealed by
> "Expose future state". See the `feature-flags` skill.

---

## Media Plan Builder (results)

### Asset detail rail
Left column: 16:9 **preview** (image + circular play overlay; neutral icon
placeholder when unprocessed), file name (12px/600) + type chip, then a key/value
**details table** (10px labels in `--faint`, values in `--text`, hairline rows):
Advertiser, Domain, Language, Duration, Format, **IAB** (name + green % pill),
**Lookback**, **Flight Dates**. Content adapts per asset type (video / VAST keep a
preview; brief shows a document placeholder + doc fields). Legacy `mp2AssetMeta()`.

### Moment type toggle
Segmented **VoD · Organic Pause · Live**, same segment styling as the input
toggle. `src/features/media-planner/MomentTypeToggle.tsx`.

### Filters panel
Trigger: outlined **Filters** button with an active-count badge. Panel is an
overlay anchored into the content scroll area (380px, glass-ish white, 8px radius,
elevated): header (title + "Clear all" + close), then accordions — **Match Score**
(radios, row), **Channel** (search field + 2-column checkboxes, "All"), **CPM**
(range slider $0–$50), **Platform** (2-column checkboxes). Live-applies to the grid.
`src/features/media-planner/MomentsFilter.tsx`.

### Moment card
The flagship card. Anatomy:
- **Media** (`pt:44%`): thumbnail (`MomentImage` — runtime image w/ bundled
  fallback to `/assets/moments/*`), a select **checkbox** (top-left, white chip),
  **status chips** (top-right: Refined, supply type, High/Standard), bottom
  gradient scrim.
- **Body** (9–11px padding): name (11px/600); a 3-up **KPI grid** (Est. Impr. /
  CPM / Inventory — 9px labels, 12px/700 values); a **channels** row (first 3 +
  "+N" tooltip pill); actions — **Refine Taxonomies** (outlined, full-width) + an
  **examples** icon button.
- **States:** hover = shadow lift; **selected** = 2px `primary.main` border;
  refined = magenta "Refined" chip + a reset icon.
`src/features/media-planner/MomentsGrid/` — `MomentCard`, `MomentImage`,
`SupplyChip`, `momentImages`, `types`, `MomentsGrid` (grid + bridge).

### Refine Taxonomy modal
Opened from a card's "Refine Taxonomies". Glass dialog: header (moment name +
JSON `{ }` toggle + close), a left **scatter/bubble chart** (Highcharts) of
taxonomy fit, and a right **panel** of taxonomy rows grouped by tab (Emotion /
Location / Objects / IAB …) with thumb-up/down **vote** controls (26px rounded-4
buttons) and "Refined" chips; an Apply/Save action. Votes persist per moment and
adjust the card's KPIs. Bridged: `src/features/media-planner/RefineModalBridge.tsx`.

### Media-plan rail
Right panel shown once a moment is selected: "Media Plan" + count + "Clear all",
a list of selected moments (thumbnail + name + inv·imp + remove `×`), running
**Total Moments** / **Est. Impressions**, and a **Save Media Plan** hero CTA.

### Save Media Plan dialog
MUI `<Dialog>` (glass): a name `TextField` (prefilled "Media Plan N") + Cancel /
Save. On save → success **Snackbar**. Bridged:
`src/features/media-planner/SaveMediaPlanDialog.tsx`.

### Snackbar toast
Bottom-center light card: green check-circle icon, message, optional **link**
(e.g. "View plan" → opens the saved plan), close `×`. `src/bridges/SnackbarBridge.tsx`
via `window.mp2Notify(msg, opts)`.

---

## Your Media Plans (detail)

### Saved-plan detail header
Editable plan **name** (18px/600) with always-visible **edit pencil** + **delete**
icon (icon-only, `--faint` → `--accent` on hover; rename swaps to an inline input +
Save). Created/flight dates beneath; right-aligned **stats** (Moments / Est.
Impressions / Avg CPM-in-accent).

### Saved-plan moments table
Columns: Moment · Channels (tags) · Type (chip) · Inventory/PODs · Est.
Impressions · Est. CPM · remove (`×`, tooltip "Remove moment"). Sticky **Total**
row. Below: **Modify moments** hero CTA.

---

## Contextual Ad Demos

### Placeholder page
Glass card with the page title and a full-width image bearing a large
semi-transparent **FPO** watermark (centered, bold, non-selectable).
`src/pages/ContextualAdDemos.tsx`.
