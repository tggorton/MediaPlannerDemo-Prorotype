# KERV Componentizer (Figma plugin)

Turns the html.to.design imports into **named Figma components** that match the
hand-off (`../FIGMA-EXTRACTION.md`, `../ui-kit/registry.ts`). Runs **inside
Figma** (Claude/MCP can't create Figma nodes, so this is the automation that
does it on your side).

## Load it (one time, ~30s)

1. **Figma desktop app** → top menu → **Plugins → Development → Import plugin from manifest…**
2. Select `handoff/figma-plugin/manifest.json`.
3. It now appears under **Plugins → Development → KERV Componentizer**. Run it
   with your MediaPlanner-Demo file open.

## Use it

Open the imported screen, then:

### 1 · Auto-componentize (by layer name)
html.to.design preserved your code's ids/classes as layer names, so the plugin
finds them and converts the first match of each into a named component. The map
is editable in the panel (`"layer name": "ComponentName"`). Defaults:

| Layer name (in import) | → Component |
|------------------------|-------------|
| `header.MuiBox-root` | `AppHeader` |
| `div#mp2-header-card` | `PageHeader` |
| `div.cs-card` | `GlassCard` |
| `div#tx2-home-panel-new-plan` | `NewPlanPanel` |
| `div.tx2-upload-zone` | `UploadDropzone` |
| `div.tx2-lib-row` | `SavedPlanRow` |
| `div.mp2-results-rail` | `AssetRail` |
| `div#inv-media-plan` | `MediaPlanRail` |

> Tip: select the screen frame first to scope it. Use **Scan layer names** to see
> what names exist in the current import and extend the map (names can vary by
> screen/import).

### 2 · Componentize selection as…
For pieces with generic names (plain MUI `Box`es, so no distinctive class), select
the layer in Figma, type the name, and run. Use this for:

| Select this (in the import) | Name it |
|-----------------------------|---------|
| one moment card (Builder screen) | `MomentCard` |
| the 64px sidebar rail box | `Sidebar` |
| the Filters panel | `MomentsFilter` |
| the VoD/Organic/Live toggle | `MomentTypeToggle` |
| a primary button (e.g. Start Analysis) | `Button` |
| the moments type segmented control / input toggle | `SegmentedToggle` |
| a status pill | `StatusChip` |

Names should match `../ui-kit/registry.ts` so Figma ↔ code ↔ docs line up.

### 3 · Auto-layout
html.to.design imports come in as **absolutely-positioned** layers, and
`createComponentFromNode` preserves that as-is — it does **not** add Figma
auto-layout. Two checkboxes at the top of the panel turn it on:

- **Apply auto-layout to converted components** — after each component is made,
  it's converted to auto-layout. The plugin **infers the axis** (vertical vs.
  horizontal) from where the children sit, re-orders children to match their
  visual order, and **carries over the spacing and padding** so the result looks
  like the import. Size is kept fixed (no hug), so nothing jumps.
- **…and to nested frames too (recursive)** — also lays out the frames *inside*
  the component, deepest-first. More thorough, but more aggressive — review the
  result.

There's also a standalone **"3 · Auto-layout selection only"** button: select
components/frames you already made and lay them out without re-componentizing
(honors the recursive toggle).

> It's a **best guess.** Axis/spacing/padding are inferred from geometry;
> alignment and hug-vs-fill decisions may still need a manual touch-up. Leave the
> toggles off if you'd rather keep the imported structure untouched. (Alternative:
> enable html.to.design's own "Auto layout" import setting, or press **Shift+A**
> on a frame in Figma.)

## Notes / limits

- Converts a node **in place** (it becomes a main component where it sits). Move
  components onto a `04 · Components` page afterward if you want them grouped.
- It converts the **first** match of each auto-rule (one clean main component per
  type). Turn other occurrences into instances manually if desired.
- Can't convert a node that's already a component or **inside** another
  component/instance — those are reported as skipped (re-select a standalone copy).
- Network access is disabled; the plugin only touches the open file.

## After componentizing → Code Connect
Send the component **node IDs** (right-click → *Copy link*) with their names and
I'll push the Figma↔code mappings via the MCP, so each shows its source path +
hand-off anchor in Dev Mode.
