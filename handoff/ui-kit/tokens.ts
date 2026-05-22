/**
 * KERV UI Kit — Design Tokens
 * ----------------------------------------------------------------------------
 * The single source of truth for the kit. Everything else (theme, components)
 * derives from these values. This is a more robust, fully-explicit expansion of
 * the original `kerv-one-theme` tokens — authored for hand-off so the design
 * system can grow without spelunking the app.
 *
 * Standalone reference: this folder is NOT wired into the app build. Lift it into
 * a real package (e.g. `@kerv/ui-kit`) to consume it.
 */

// ─── Color ───────────────────────────────────────────────────────────────────

export const color = {
  // Brand / primary (magenta)
  primary: {
    light: '#F24C91',
    main: '#ED005E',
    dark: '#DC005C',
    darkest: '#C60057',
    hover: 'rgba(237, 0, 94, 0.08)',
    tintBg: '#FDF0F4', // --accent-light / --subtle
    tintBorder: '#F8C0D4', // --accent-muted
    softHover: 'rgba(237, 0, 94, 0.06)', // outlined-button hover fill
  },

  // Neutral surfaces & text
  surface: '#FFFFFF', // --surface (opaque content surfaces)
  bg: '#F5F4F0', // --bg
  text: {
    primary: '#0D1E36', // --text (near-navy)
    secondary: 'rgba(0, 0, 0, 0.6)',
    muted: '#6B6B65', // --muted
    faint: '#A8A8A0', // --faint (placeholders, disabled)
    onAccent: '#FFFFFF',
  },
  border: {
    hairline: 'rgba(0, 0, 0, 0.08)', // --border
    control: 'rgba(0, 0, 0, 0.12)', // --border-md / divider
  },
  actionSelected: '#E7E7E7', // selected nav item bg

  grey: { 300: '#A1A1A1', 400: '#7F7F7F', 500: '#585858', 600: '#464646', 700: '#292929' },

  // Extended brand scales (from the original kit)
  indigo: { lightest: '#C3C9E6', light: '#9DA6D4', main: '#7683C3', dark: '#5968B7', darkest: '#3B4EAB' },
  amber: { lightest: '#FFF8E1', light: '#FFECB3', main: '#FFC107', dark: '#FF8F00', darkest: '#FF6F00' },

  // Semantic
  success: { main: '#0EB367', ui: '#16A34A', bg: '#F0FDF4', border: '#BBF7D0' },
  warning: { main: '#D97706', bg: '#FFFBEB', border: '#FDE68A' },
  error: { main: '#F44336', ui: '#DC2626', dot: '#EF4444', light: '#FFCDD2', dark: '#D32F2F', bg: '#FEF2F2', border: '#FECACA' },
  info: { ui: '#1D4ED8', bg: '#EFF6FF', border: '#BFDBFE' },
  teal: { ui: '#0F766E', bg: '#F0FDFA', border: '#99F6E4' }, // "Organic Pause"
} as const;

/** Status palettes for chips/badges (text / background / border). */
export const statusPalette = {
  vod: { text: color.info.ui, bg: color.info.bg, border: color.info.border },
  live: { text: color.error.ui, bg: color.error.bg, border: color.error.border, dot: color.error.dot },
  organic: { text: color.teal.ui, bg: color.teal.bg, border: color.teal.border },
  high: { text: color.success.ui, bg: color.success.bg, border: color.success.border },
  standard: { text: color.warning.main, bg: color.warning.bg, border: color.warning.border },
  refined: { text: '#FFFFFF', bg: 'rgba(237, 0, 94, 0.9)', border: 'rgba(237, 0, 94, 0.9)' },
} as const;

// ─── Background gradient (full-viewport, fixed) ──────────────────────────────

export const gradient =
  'linear-gradient(128deg, #FFEDF4 8.6%, #E9EBF7 21.38%, #F6F6F6 40%, #FFEDF4 60%, #E9EBF7 80%, #FFEDF4 100%)';

// ─── Glass surfaces ──────────────────────────────────────────────────────────
// The defining KERV treatment. Each variant returns a ready-to-spread CSS object.

export const glass = {
  /** Content & header cards (`.cs-card` / glassSection). */
  card: {
    background: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '2px solid rgba(255, 255, 255, 0.8)',
    borderRadius: '16px',
    boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.05)',
  },
  /** Sidebar rail — lighter glass. */
  rail: {
    background: 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    borderRight: '2px solid #ffffff',
    boxShadow: '4px 0px 8px 0px rgba(0, 0, 0, 0.05)',
  },
  /** Dialog / modal surface. */
  dialog: {
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '2px solid rgba(255, 255, 255, 1)',
    borderRadius: '16px',
    boxShadow:
      '0px 9px 46px 8px rgba(0,0,0,0.12), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 11px 15px -7px rgba(0,0,0,0.2)',
  },
  /** Subtle overlay glass (chips/overlays). */
  subtle: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
} as const;

// ─── Typography ──────────────────────────────────────────────────────────────

export const typography = {
  fontFamily: "'Open Sans', sans-serif",
  // Display / headings
  h1: { fontSize: '96px', fontWeight: 300, lineHeight: 1.167 },
  h2: { fontSize: '60px', fontWeight: 300, lineHeight: 1.2 },
  h3: { fontSize: '48px', fontWeight: 400, lineHeight: 1.167 },
  /** Page titles (`.ptitle`). */
  h4: { fontSize: '34px', fontWeight: 400, lineHeight: 1.235, letterSpacing: '0.0074em' },
  h5: { fontSize: '24px', fontWeight: 400, lineHeight: 1.6, letterSpacing: '0.0075em' },
  h6: { fontSize: '20px', fontWeight: 600, lineHeight: 1.6 },
  // Body
  body1: { fontSize: '16px', fontWeight: 400, lineHeight: 1.5, letterSpacing: '0.0094em' },
  body2: { fontSize: '14px', fontWeight: 400, lineHeight: 1.43 },
  // Controls / meta
  button: { fontSize: '14px', fontWeight: 600, lineHeight: 1.71, letterSpacing: '0.0286em', textTransform: 'uppercase' as const },
  subtitle: { fontSize: '13px', fontWeight: 400, lineHeight: 1.5 }, // `.psub`
  caption: { fontSize: '12px', fontWeight: 400, lineHeight: 1.4 },
  /** Eyebrow / labels ("STEP 1", column headers). */
  overline: { fontSize: '10px', fontWeight: 600, lineHeight: 1.4, letterSpacing: '0.05em', textTransform: 'uppercase' as const },
  kpiValue: { fontSize: '12px', fontWeight: 700, lineHeight: 1.2 },
  /** Collapsed page-title size on back-link-less pages. */
  titleCollapsed: { fontSize: '16px', fontWeight: 500 },
} as const;

// ─── Spacing & layout ────────────────────────────────────────────────────────

export const spacing = {
  base: 8, // MUI spacing unit
  contentGutterX: 32, // sidebar↔card == card↔edge (≥md)
  contentGutterY: 16,
  headerPad: 32, // top bar
  cardPad: 32, // content card
  headerCardPad: '18px 32px',
  twoBoxGap: 16, // header card → content card
} as const;

export const sidebar = {
  widthCollapsed: 64,
  widthExpanded: 220,
  iconButton: 44, // app-icon button (distinct class)
  iconButtonRadius: 8,
  iconGap: 16,
  togglePadTop: 24,
} as const;

// ─── Radii ───────────────────────────────────────────────────────────────────

export const radius = {
  button: 4, // kit standard
  input: 8,
  sidebarIcon: 8,
  alert: 8,
  card: 16,
  dialog: 16,
  pill: 20, // chips/badges (fully rounded)
} as const;

// ─── Shadows ─────────────────────────────────────────────────────────────────

export const shadow = {
  card: '0px 4px 8px 0px rgba(0,0,0,0.05)',
  rail: '4px 0px 8px 0px rgba(0,0,0,0.05)',
  cardHover: '0 2px 10px rgba(0,0,0,.07)',
  popover: '0 6px 24px rgba(0,0,0,0.14)',
  dialog: glass.dialog.boxShadow,
} as const;

// ─── Motion ──────────────────────────────────────────────────────────────────

export const motion = {
  fast: '0.12s ease',
  base: '0.15s ease',
  shell: 'width 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
  focusRing: '0 0 0 3px rgba(237,0,94,.1)',
} as const;

// ─── Breakpoints & z-index ───────────────────────────────────────────────────

export const breakpoints = { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536, designTarget: '1800×1169 (MacBook "More Space")' } as const;

export const zIndex = { appBar: 1100, drawer: 1200, dialog: 1300, popover: 1400, tooltip: 13000 } as const;

export const tokens = {
  color, statusPalette, gradient, glass, typography, spacing, sidebar, radius, shadow, motion, breakpoints, zIndex,
} as const;

export default tokens;
