import { Box, Link, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { GlassCard } from './GlassCard';
import { color, spacing, typography } from '../tokens';

export interface PageHeaderProps {
  /** Page title (rendered as h4 / `.ptitle`). */
  title: string;
  /** Optional subtitle line. */
  subtitle?: string;
  /** Optional back link label; renders the uppercase magenta back link. */
  backLabel?: string;
  onBack?: () => void;
}

/**
 * The two-box page-header card: an optional back link above a title + subtitle,
 * inside a glass card. Pair it above a content <GlassCard> with a 16px gap.
 * (The app additionally collapses this on scroll — see SCREENS.md; omitted here
 * to keep the kit primitive simple.)
 */
export function PageHeader({ title, subtitle, backLabel, onBack }: PageHeaderProps) {
  return (
    <GlassCard sx={{ p: spacing.headerCardPad, mb: `${spacing.twoBoxGap}px` }}>
      {backLabel && (
        <Link
          component="button"
          onClick={onBack}
          underline="none"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            mb: '14px',
            color: color.primary.main,
            ...typography.button,
            letterSpacing: '0.4px',
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 16 }} />
          {backLabel}
        </Link>
      )}
      <Typography variant="h4" sx={{ color: color.text.primary }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography sx={{ ...typography.subtitle, color: color.text.muted, mt: '5px' }}>
          {subtitle}
        </Typography>
      )}
    </GlassCard>
  );
}
