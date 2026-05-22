# Design Foundations — the style kit

The atomic design tokens and primitives every screen is built from. Source of
truth in code: the MUI theme [`kerv-one-theme/src/theme.ts`](../kerv-one-theme/src/theme.ts),
the CSS variables in [`src/styles/globals.css`](../src/styles/globals.css), and
the legacy injected styles in [`public/legacy/sdt-styles.js`](../public/legacy/sdt-styles.js).

> Two token systems exist and are kept in sync: **MUI theme tokens** (React
> components) and **CSS custom properties** (`--accent`, etc., used by the legacy
> media-planner HTML). They resolve to the same values.

---

## 1. Color

### Brand / primary (magenta)
| Token | Hex | Use |
|-------|-----|-----|
| `primary.light` | `#F24C91` | hover tints |
| **`primary.main` / `--accent`** | **`#ED005E`** | primary actions, links, active states, accents |
| `primary.dark` | `#DC005C` | hover on filled primary |
| `primary.darkest` | `#C60057` | pressed |
| `primary.hover` | `rgba(237,0,94,0.08)` | hover background on text/ghost |
| `--accent-light` / `--subtle` | `#FDF0F4` | tinted backgrounds |
| `--accent-muted` | `#F8C0D4` | tinted borders |

### Neutrals / surface (CSS variables)
| Token | Value | Use |
|-------|-------|-----|
| `--surface` | `#FFFFFF` | opaque surfaces inside cards (tables, inputs) |
| `--bg` | `#F5F4F0` | app base / subtle fills |
| `--text` | `#0D1E36` | primary text (near-navy, not pure black) |
| `--muted` | `#6B6B65` | secondary text |
| `--faint` | `#A8A8A0` | tertiary text, placeholders, disabled |
| `--border` | `rgba(0,0,0,0.08)` | hairline dividers |
| `--border-md` | `rgba(0,0,0,0.12)` | input/control borders |
| `text.secondary` (MUI) | `rgba(0,0,0,0.6)` | MUI secondary text |
| `action.selected` (MUI) | `#E7E7E7` | selected nav item background |
| `divider` (MUI) | `rgba(0,0,0,0.12)` | MUI dividers |

### Status
| Status | Text | Bg | Border |
|--------|------|----|--------|
| Success / High | `#16A34A` (MUI `success.main` `#0EB367`) | `#F0FDF4` | `#BBF7D0` |
| Warning / Standard | `#D97706` | `#FFFBEB` | `#FDE68A` |
| Error / Live | `#DC2626` (dot `#EF4444`) | `#FEF2F2` | `#FECACA` |
| Info / VoD | `#1D4ED8` | `#EFF6FF` | `#BFDBFE` |
| Organic Pause | `#0F766E` | `#F0FDFA` | `#99F6E4` |

---

## 2. Background gradient  ⚠️ prod parity

The full-viewport branded gradient. Painted by the kit `AppShell` wrapper,
`background-attachment: fixed` so it stays put while content scrolls.

```css
background: linear-gradient(128deg,
  #FFEDF4 8.6%, #E9EBF7 21.38%, #F6F6F6 40%,
  #FFEDF4 60%, #E9EBF7 80%, #FFEDF4 100%);
background-attachment: fixed;
```
Pink (`#FFEDF4`) → lavender (`#E9EBF7`) → near-white, repeating. Everything else
(glass cards, sidebar) sits on top of this and lets it bleed through.

---

## 3. Glass surfaces  ⚠️ prod parity

The defining KERV treatment: semi-transparent white + backdrop blur + a bright
white "glass edge" border + rounded corners + soft shadow. Three variants:

### Glass card (`.cs-card`, MUI `glassSection`) — every content/header box
```css
background: rgba(255, 255, 255, 0.5);     /* slight transparency — gradient shows through */
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
border: 2px solid rgba(255, 255, 255, 0.8); /* the glass edge */
border-radius: 16px;
box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.05);
```

### Sidebar rail (lighter glass)
```css
background: rgba(255, 255, 255, 0.4);
backdrop-filter: blur(8px);
border-right: 2px solid #ffffff;
box-shadow: 4px 0px 8px 0px rgba(0, 0, 0, 0.05);
```

### Dialog / modal surface (MUI `MuiDialog`)
```css
background: rgba(255, 255, 255, 0.8);
backdrop-filter: blur(10px);
border: 2px solid rgba(255, 255, 255, 1);
border-radius: 16px;
box-shadow: 0px 9px 46px 8px rgba(0,0,0,0.12),
            0px 24px 38px 3px rgba(0,0,0,0.14),
            0px 11px 15px -7px rgba(0,0,0,0.2);
```

> Opaque surfaces (`--surface` `#fff`) are used **inside** glass cards for
> tables, inputs, and inner panels so content stays legible over the blur.

---

## 4. Typography

Font family: **Open Sans** (`theme.typography.fontFamily`), antialiased.

| Role | Token | Size / line-height / weight | Notes |
|------|-------|------------------------------|-------|
| Page title | `h4` (MUI default) / `.ptitle` | **34px / 1.235 / 400**, letter-spacing `.0074em` | Top of each page's header card. |
| Section heading | `h5` | 24px / 1.6 / 400 | |
| Sub-heading | `h6` | 20px / 600 | |
| Body | `body1` | 16px / 1.5 / 400 | |
| Page subtitle | `.psub` | 13px / `--muted` | Under the page title. |
| Button / link label | `button` / back-link | **14px / 1.71 / 600**, UPPERCASE, letter-spacing `.4px` | Back links use this. |
| Eyebrow / label | — | 10–11px / 600 / UPPERCASE, letter-spacing `.5px`, `--faint` | "STEP 1", column headers, KPI labels. |
| KPI value | — | 12px / 700 / `--text` | Card stats. |
| Brand lockup | — | 20px / 500 / `text.primary` @ 0.87 opacity | "| Sales Demo Tool". |

When collapsed on a back-link-less page, the page title shrinks to **16px / 500**
(matches the collapsed inline-title size on back-link pages).

---

## 5. Spacing & layout

| Token | Value | Where |
|-------|-------|-------|
| Sidebar rail width (collapsed) | **64px** | matches Figma node 16954-255703 |
| Sidebar rail width (expanded) | 220px | |
| Sidebar icon button | **44×44**, 8px radius, **16px** gap between | app icons are a distinct class (8px), not "buttons" |
| Content gutter (horizontal) | **32px** (≥`md`) | symmetric: sidebar↔card == card↔right-edge; 12/16px at xs/sm |
| Content gutter (vertical) | 16px (≥`md`) | |
| Header bar padding | **32px** | aligns brand lockup with card edges |
| Content card padding | **32px** | |
| Header card padding | **18px 32px** | |
| Gap between header card & content card | **16px** | two-box page pattern |

Tuned for a MacBook Pro at the "more space" resolution (≈1800×1169); applies at
the MUI `md` breakpoint and up.

---

## 6. Corner radii

| Element | Radius |
|---------|--------|
| Buttons | **4px** (kit standard — explicit on `MuiButton.root`) |
| Sidebar app-icon buttons | 8px (deliberate exception) |
| Alert / snackbar | 8px |
| Glass cards & dialogs | 16px |
| Pills / chips / badges | 20px (fully rounded) |
| Inputs / small controls | 4–8px |

---

## 7. Shadows

| Use | Value |
|-----|-------|
| Glass card | `0px 4px 8px 0px rgba(0,0,0,0.05)` |
| Sidebar rail | `4px 0px 8px 0px rgba(0,0,0,0.05)` |
| Dialog | layered (see Glass surfaces) |
| Snackbar / popover | `0 6px 24px rgba(0,0,0,0.14)` |
| Card hover | `0 2px 10px rgba(0,0,0,.07)` |

---

## 8. Buttons

All buttons use **4px** radius and **no elevation** (`boxShadow: none`).

| Variant | Fill | Text | Border | Use |
|---------|------|------|--------|-----|
| **Primary / hero** | `--accent` `#ED005E` | `#fff` | none | The one main action per view (Start Analysis, Save Media Plan, Modify moments). Hover → `primary.dark` or opacity .88. |
| **Outlined** | transparent | `--accent` | `1px solid --accent` | Secondary actions; hover bg `rgba(237,0,94,.06)`. |
| **Text** | transparent | `--accent` (600) | none | Tertiary; hover bg `primary.hover`. Back links. |
| **Dark** | `#0F172A` | `#fff` | none | Reserved alt action (future-state Activate-via-DSP). |

Heights: primary CTAs ~40–42px; inline/secondary ~26–34px; uppercase labels on
the largest CTAs and back links.

---

## 9. Icons

Material UI icons (`@mui/icons-material`), rendered in React directly and in the
legacy HTML via the `mp2Icon('name')` helper (embeds the exact MUI `<path d>`).
Common sizes: 14–16px inline, 20–22px nav/controls, 28–32px empty-state.
Default color follows text (`currentColor`); active/accent uses `--accent`.
Key icons in the MVP: `DocumentScannerOutlined`, `OndemandVideoOutlined`
(sidebar), `FilterList`, `VideoLibrary`, `Refresh`, `Edit`, `DeleteOutline`,
`Add`/`Code`/`Description` (input types), `CalendarToday`, `ExpandLess/More`,
`Close`, `DataObject` (`{ }`), `RestartAlt`.

---

## 10. Chips, badges & pills

Fully-rounded (20px), tiny (9–10px / 700, height ~18px). See *Color → Status*
for palettes.
- **Supply type:** `VoD` (blue), `Live` (red + glowing dot), `Organic Pause` (teal).
- **Match quality:** `High` (green), `Standard` (amber).
- **Refined:** solid magenta `rgba(237,0,94,.9)` / white text.
- **Channel tags:** `--muted` text on `--bg`, `1px solid --border`, 4px radius.
- **Confidence %:** green success pill next to taxonomy names.

---

## 11. Interaction states

- **Hover:** subtle bg tint or shadow lift; magenta tint for primary-adjacent.
- **Focus (inputs):** border → `--accent` + `0 0 0 3px rgba(237,0,94,.1)` ring.
- **Selected (nav):** grey rounded square (`action.selected` `#E7E7E7`).
- **Selected (moment card):** 2px `primary.main` border.
- **Transitions:** ~0.12–0.22s ease; sidebar width `0.22s cubic-bezier(.4,0,.2,1)`.
- **Tooltips:** dark pill (`rgba(60,60,60,0.94)`, white, 11px), via the global
  hover-tooltip controller (`data-mui-tip` in legacy).
