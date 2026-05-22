# Screens — page by page, tab by tab (MVP)

The user journey, every visible region described. Styling refers to
[DESIGN-FOUNDATIONS.md](DESIGN-FOUNDATIONS.md) by token name; components refer to
[COMPONENTS.md](COMPONENTS.md); code locations refer to
[../ARCHITECTURE.md](../ARCHITECTURE.md).

> **MVP scope.** Hidden / future-state elements are omitted: the *Previous
> Analysis* home tab, the *Ad Analysis* and *AI Media Plan* result tabs, and the
> *Export to IO* / *Activate via DSP* buttons on a saved plan. Where one would
> appear, it's noted as "(future state — excluded)".

---

## 0. Global chrome (every authenticated screen)

A fixed two-column shell on the branded **background gradient**.

- **Left — Sidebar rail** (lighter glass, 64px collapsed / 220px expanded):
  a collapse chevron (`»`/`«`) at top, then the nav app-icons (44×44 rounded-8
  buttons, 16px apart, outlined icons in `grey.500`; active = grey rounded
  square). MVP nav items: **Media Planner Demo** (`DocumentScannerOutlined`),
  **Contextual Ad Demos** (`OndemandVideoOutlined`).
- **Top — Header bar** (transparent, 32px padding): brand lockup on the left
  (**K logo** + `| Sales Demo Tool`, 20px/500 @ .87 opacity — clicking it returns
  to *Generate Media Plan*); on the right a **profile** icon (opens a menu →
  Profile drawer / Sign out).
  - *Demo/QA controls also live here but are not MVP product UI:* **Reset
    experience** (returns to first-run defaults) and **Expose future state**
    (reveals the hidden elements above — out of scope for this hand-off).
- **Right — Content area** (32px gutters, scrolls): the routed page.

See COMPONENTS → *AppShell, Sidebar, AppHeader*.

---

## 1. Login

- Centered card on `--bg`: opaque white `.acard` (14px radius, soft shadow,
  350px), KERV lockup, title (21px/500) + subtitle (12px `--muted`), email +
  password fields (`--border-md` border, magenta focus ring), full-width magenta
  CTA, and a tinted "demo credentials" hint box (`--subtle` bg, `--accent-muted`
  border).
- On success the app shell fades in.

See COMPONENTS → *LoginScreen*.

---

## 2. Media Planner Demo

Route `/media-planner-v2`. The core flow: **Generate → (scan) → Build → Save →
Your plans**. Every step uses the **two-box page layout** — a glass **header
card** (back link + title + subtitle, with a collapse chevron) stacked above a
glass **content card**.

> **Collapsible header (all steps):** scrolling down collapses the header card to
> save space; scrolling up expands it. On pages with a back link, collapsed = a
> single row `← Back link | Page Title`. On the back-link-less *Generate* page,
> collapsed = the title shrinks to 16px and the subtitle hides. The chevron also
> toggles it manually (manual collapse re-centers the content card).

### 2a. Generate Media Plan  *(home / upload)*

- **Header card:** title **"Generate Media Plan"**, subtitle *"Upload a video,
  text based brief description or PDF/Doc, or a VAST tag, and our AI-driven tools
  will generate results that best match your criteria."* No back link.
- **Tabs (underline style, magenta active):** **New Plan** · **Media Plans**.
  *(Previous Analysis tab — future state — excluded.)*

#### Tab: New Plan
Two columns inside the content card:

- **Step 1 — Setup your Campaign Details** (left): an eyebrow label then a
  natural-language sentence with **inline editable parameters** rendered as
  dotted-underline links (Select Budget, Select Number [impressions], Select
  Channels, Select Type, Select Brand Safety, Select Score [match], Select
  Dates). Clicking one opens an inline picker/dropdown (multi-select checkboxes,
  date calendar, etc.).
- **Step 2 — Add your creative asset or your creative brief** (right): a
  segmented toggle **Video · Brief · VAST Tag** (`flex:1` each, active = white
  raised segment w/ magenta text), then the matching input:
  - **Video:** a **"Pull from library"** dropdown (real MUI Select — primary
    path), an "or upload a file" divider, then a drop-zone (`MP4, MOV, AVI`).
  - **Brief:** a textarea (paste brief) with an "Upload Doc or PDF" row beneath.
  - **VAST Tag:** a textarea (paste VAST URL/XML) with an "Upload CSV with VAST
    tag" row beneath (tooltip: *Single tag only*).
- Below the columns: **Lookback Window** slider (MUI Slider, 30s–5min, magenta,
  value shown in accent) with an info tooltip.
- Centered **Start Analysis** primary CTA (42px, uppercase, magenta).

See COMPONENTS → *Input toggle, Library Select, Lookback slider, AI param picker*.

#### Tab: Media Plans
- Heading "Media Plans", then a **list of saved plans**. Each row: input-type
  icon (Video=`video-library`, Brief=`description`, VAST=`code`), plan name,
  meta line (date · author · flight dates · impressions · avg CPM · N moments),
  and right-aligned action icon-buttons (refresh, **edit**, **delete**), plus an
  optional DSP/status badge. Empty state: centered hint.
- Clicking a row (or edit) opens **Your Media Plans** (2d).

See COMPONENTS → *Saved-plan list row*.

### 2b. Processing / scan step
- Triggered by **Start Analysis**. The header card hides; the content card shows
  a centered scan visual (file name, animated preview frames, a progress bar +
  %, a scan line, timecode, and step labels "Analyzing metadata… / Detecting
  scenes & objects… / …"). Purely cosmetic; advances to the builder.
  *(Demo note: animation is currently sped up.)*

### 2c. Media Plan Builder  *(results)*

- **Header card:** back link **"← Back to Media Planner"**, title **"Media Plan
  Builder"**, subtitle about selecting parameters from the analyzed content.
- **Left asset rail** (fixed column): a 16:9 **preview** (thumbnail + play
  overlay; a neutral placeholder for unprocessed uploads/briefs), the **file
  name** + type chip, then a **details table** keyed to the asset: Advertiser,
  Domain, Language, Duration, Format, **IAB** (taxonomy + green confidence %),
  **Lookback**, **Flight Dates**. The rail reflects the chosen asset (library
  video / upload / brief / VAST) — briefs show document details and no preview.
- **Right — Moments Match** (the only visible result tab; *Ad Analysis* and *AI
  Media Plan* tabs are future state — excluded):
  - **Supply-type toggle:** **VoD · Organic Pause · Live** (segmented).
  - **Filters** button (outlined, shows active count) → opens the **Filters
    panel** (overlay anchored into the scroll area): Match Score (radios),
    Channel (search + 2-col checkboxes), CPM (range slider), Platform (2-col
    checkboxes), with "Clear all".
  - **Moment cards grid** (responsive auto-fill, ~210px min): each card has a
    media thumbnail with a select checkbox + status chips (supply type,
    High/Standard, Refined), the moment name, three KPIs (Est. Impr. / CPM /
    Inventory), a channels row (first 3 + "+N" tooltip), and a **Refine
    Taxonomies** button + an examples icon. Selecting a card adds it to the plan.
- **Media Plan rail** (appears once a moment is selected): a panel listing the
  selected moments with thumbnails + inv/imp, running **Total Moments** and
  **Est. Impressions**, and a **Save Media Plan** primary CTA (opens the Save
  dialog to name the plan; saving shows a success toast with a "View plan" link).

See COMPONENTS → *Asset rail, Moment type toggle, Filters panel, Moment card,
Refine modal, Media-plan rail, Save dialog, Snackbar*.

### 2d. Your Media Plans  *(saved plan detail)*

- **Header card:** back link **"← Back to Media Plans"**, title **"Your Media
  Plans"**, subtitle *"Export/push or modify your saved media plans below"*.
- **Plan header:** the plan **name** with an always-visible **edit (pencil)** and
  **delete** icon beside it (delete = icon only, magenta on hover; rename = inline
  input + Save), created date + flight dates; right-aligned **stats**: Moments,
  Est. Impressions, Avg CPM (accent).
- **Moments table:** columns Moment · Channels (tags) · Type (chip) · Inventory /
  PODs · Est. Impressions · Est. CPM, with a per-row remove (`×`, tooltip "Remove
  moment") and a **Total** row.
- **Actions:** **Modify moments** — hero magenta CTA (opens the builder with this
  plan's moments + refinements restored; re-saving updates the plan in place).
  *(Export to IO / Activate via DSP — future state — excluded.)*

See COMPONENTS → *Saved-plan detail table*.

---

## 3. Contextual Ad Demos

Route `/contextual-ad-demos`. A **placeholder page**: a single glass card with
the title **"Contextual Ad Demos"** and a full-width screenshot image overlaid
with a large semi-transparent **"FPO"** watermark (For Placement Only). No
interactive content yet.

See COMPONENTS → *Placeholder page*.

---

## Cross-screen behaviors (MVP)

- **Session persistence:** saved plans + the current view + builder state persist
  to `localStorage`; a refresh keeps you in place. **Reset experience** clears it
  back to first-run defaults.
- **Tooltips:** hover hints throughout via a single global tooltip controller.
- **Responsive:** tuned for desktop (≈1800×1169); cards/grids reflow and the
  Refine modal stacks at narrow widths.
