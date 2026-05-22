/**
 * KERV UI Kit — MUI Theme
 * ----------------------------------------------------------------------------
 * A robust, fully-explicit MUI theme built FROM `tokens.ts`. This is the
 * "modified/updated" version of the original `kerv-one-theme` for hand-off:
 * the same visual language, but with every scale/override stated outright and
 * derived from a single token source so it's easy to extend.
 *
 * Drop-in: wrap the app in <ThemeProvider theme={kervTheme}> and render the
 * gradient via <GlassAppBackground/> (see components). Standalone — not wired
 * into this project's build.
 */
import { createTheme, type Theme } from '@mui/material/styles';
import { color, gradient, glass, typography, radius, shadow, zIndex } from './tokens';

declare module '@mui/material/styles' {
  interface Theme {
    customBackground: { gradient: string };
    glass: { card: object; rail: object; dialog: object; subtle: object };
  }
  interface ThemeOptions {
    customBackground?: { gradient?: string };
    glass?: { card?: object; rail?: object; dialog?: object; subtle?: object };
  }
  interface PaletteColor {
    lightest?: string;
    darkest?: string;
    hover?: string;
  }
  interface SimplePaletteColorOptions {
    lightest?: string;
    darkest?: string;
    hover?: string;
  }
}

export const kervTheme: Theme = createTheme({
  customBackground: { gradient },
  glass,
  zIndex: { appBar: zIndex.appBar, drawer: zIndex.drawer, modal: zIndex.dialog, tooltip: zIndex.tooltip },

  palette: {
    primary: {
      light: color.primary.light,
      main: color.primary.main,
      dark: color.primary.dark,
      darkest: color.primary.darkest,
      hover: color.primary.hover,
      contrastText: '#fff',
    },
    secondary: { main: color.primary.main },
    success: { main: color.success.main, light: color.success.border },
    warning: { main: color.warning.main },
    error: { main: color.error.main, light: color.error.light, dark: color.error.dark },
    info: { main: color.info.ui },
    grey: color.grey,
    text: { primary: color.text.primary, secondary: color.text.secondary, disabled: color.text.faint },
    background: { default: color.bg, paper: color.surface },
    divider: color.border.control,
    action: { selected: color.actionSelected, hover: color.primary.hover },
  },

  shape: { borderRadius: radius.button }, // 4px default

  typography: {
    fontFamily: typography.fontFamily,
    h1: typography.h1,
    h2: typography.h2,
    h3: typography.h3,
    h4: typography.h4,
    h5: typography.h5,
    h6: typography.h6,
    body1: typography.body1,
    body2: typography.body2,
    button: typography.button,
    caption: typography.caption,
    overline: typography.overline,
  },

  components: {
    // Buttons — 4px radius, flat (no elevation). Variants map to the kit roles.
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: radius.button, textTransform: 'none', '&:hover': { boxShadow: 'none' } },
        contained: { boxShadow: 'none' },
        outlined: ({ theme }) => ({ boxShadow: 'none', '&:hover': { backgroundColor: theme.palette.primary.hover } }),
        text: ({ theme }) => ({ fontWeight: 600, '&:hover': { backgroundColor: theme.palette.primary.hover } }),
        sizeLarge: { height: 42, textTransform: 'uppercase', letterSpacing: '0.0286em' },
      },
    },

    // Glass surfaces.
    MuiPaper: { defaultProps: { elevation: 0 } },
    MuiCard: { styleOverrides: { root: { ...glass.card } } },
    MuiDialog: { styleOverrides: { paper: { ...glass.dialog } } },

    // Chips → fully-rounded pills.
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: radius.pill, fontWeight: 700, fontSize: 10 },
        sizeSmall: { height: 18 },
      },
    },

    // Inputs — magenta focus ring.
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: radius.input,
          backgroundColor: color.surface,
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.main },
        }),
      },
    },

    // Tabs — magenta underline indicator, non-uppercase labels, magenta active.
    MuiTabs: { styleOverrides: { indicator: { backgroundColor: color.primary.main, height: 2 } } },
    MuiTab: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 500, fontSize: 14, minHeight: 44, '&.Mui-selected': { color: color.primary.main } },
      },
    },

    MuiAlert: { styleOverrides: { root: { borderRadius: radius.alert, padding: '12px 20px', fontSize: 14 } } },
    MuiTooltip: {
      styleOverrides: {
        tooltip: { backgroundColor: 'rgba(60,60,60,0.94)', fontSize: 11, fontWeight: 500, borderRadius: 6, padding: '6px 10px' },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: { color: color.text.primary, WebkitFontSmoothing: 'antialiased' },
      },
    },
  },
});

export const shadows = shadow;
export default kervTheme;
