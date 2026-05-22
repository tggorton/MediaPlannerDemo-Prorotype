# KERV Media Planner — Design & Build Hand-off

This is the **design/style/component delivery** for the KERV Media Planner
(Sales Demo Tool). Think of it as a Figma design-delivery, but authored from the
real, working application — every screen, style token, and component is already
built and is documented here as the source of truth.

It is a **reference package**: it does not run, it describes. Use it to verify
that the production app implements the intended design system correctly, to brief
new engineers/designers, or to drive a Figma reconstruction.

## Scope

- ✅ **MVP / non-hidden elements only.** Everything a user sees in the shipping
  experience.
- ❌ **Hidden / "future state" elements are intentionally excluded** (the
  `MP2_FEATURES`-gated tabs/buttons revealed by the header "Expose future state"
  toggle). They are not part of this hand-off. A skill (`handoff-spec`) exists to
  document those later when they're promoted.

## What's in this delivery

| Item | Where | What it is |
|------|-------|-----------|
| Source code | this git repo | The full working React + MUI app and legacy bridge. |
| Code map | [`../ARCHITECTURE.md`](../ARCHITECTURE.md) | Where every file/component/style lives. |
| **Design foundations** | [`DESIGN-FOUNDATIONS.md`](DESIGN-FOUNDATIONS.md) | The style kit: color, gradient, glass surfaces, type, spacing, radii, shadows, buttons, icons, chips, states. |
| **Screens** | [`SCREENS.md`](SCREENS.md) | Page-by-page, tab-by-tab walkthrough (MVP). Layout regions, components used, behaviors. |
| **Components** | [`COMPONENTS.md`](COMPONENTS.md) | Component catalog — anatomy, styling, states, file location. |
| **UI Kit (starter)** | [`ui-kit/`](ui-kit/README.md) | A robust, standalone code design-system: tokens, an expanded MUI theme, reusable components, and a component **registry** for managing/accessing everything. Extends `kerv-one-theme`; the forward path for a shared kit. |
| **Figma extraction** | [`FIGMA-EXTRACTION.md`](FIGMA-EXTRACTION.md) | Manifest to rebuild the app in Figma 1:1 with the code/docs: screen capture list, componentization plan (+ variants), tokens→Figma styles, and the Code Connect labeling step. |
| **Figma plugin** | [`figma-plugin/`](figma-plugin/README.md) | `KERV Componentizer` — a Figma dev plugin that converts html.to.design imports into named components matching the registry (auto by layer-name + a selection mode), with an optional **auto-layout** pass that infers axis/spacing/padding. |

## How to read it

- **Humans:** start here → DESIGN-FOUNDATIONS (the kit) → SCREENS (the journey) →
  COMPONENTS (the parts). Each screen/component cross-references the foundations
  by token name and the code by file path.
- **AI systems:** every value is given concretely (hex, px, rem, CSS). Tokens are
  named consistently (e.g. `--accent`, `glass card`, `h4 title`) and reused across
  docs so they can be resolved unambiguously. File paths reference real source.

## ⚠️ Production parity — action items for the current eng team

The production app is **missing several foundational visual styles** that define
the KERV look. These must be brought to parity. Exact specs are in
[DESIGN-FOUNDATIONS.md](DESIGN-FOUNDATIONS.md); summarized here as the priority list:

1. **Page background gradient** — the branded pink→lavender gradient is not
   applied. It should paint the full viewport, fixed while content scrolls.
   `linear-gradient(128deg, #FFEDF4 8.6%, #E9EBF7 21.38%, #F6F6F6 40%, #FFEDF4 60%, #E9EBF7 80%, #FFEDF4 100%)`
   (see *Background gradient*).

2. **Glass container boxes** — the cards (`.cs-card` / "glass card") are missing
   their **glass treatment**: semi-transparent white fill, backdrop blur, the
   white "glass edge" border, rounded corners, and soft shadow:
   - `background: rgba(255, 255, 255, 0.5)` ← the **slight transparency**
   - `backdrop-filter: blur(20px)` (+ `-webkit-backdrop-filter`)
   - `border: 2px solid rgba(255, 255, 255, 0.8)` ← the **glass edge**
   - `border-radius: 16px`
   - `box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.05)`
   (see *Glass surfaces*).

3. **Sidebar rail glass** — same family, lighter: `rgba(255,255,255,0.4)` fill,
   `blur(8px)`, `2px solid #fff` right edge, `4px 0 8px rgba(0,0,0,0.05)` shadow.

These three together (gradient behind + transparent/blurred glass cards with
white edges) are what make the UI read as "KERV glass." Without them the app
looks flat/opaque. They are non-negotiable parity items.

## Conventions captured as skills (`.claude/skills/`)

The build's design rules are also encoded as agent skills so future work stays
consistent: `layout-spacing` (spacing/typography tokens), `mui-consistency`
(MUI/bridge usage), `page-layout` (two-box page pattern), `feature-flags`
(reversible hide/show), `handoff-spec` (extending this package, incl. the hidden
elements later).
