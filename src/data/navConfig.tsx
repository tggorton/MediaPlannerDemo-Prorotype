import type { ReactNode } from 'react';
import DocumentScannerIcon from '@mui/icons-material/DocumentScannerOutlined';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideoOutlined';

export type NavItem = {
  id: string;
  label: string;
  path: string;
  icon: ReactNode;
  disabled?: boolean;
};

export type NavSection = {
  section: string;
  items: NavItem[];
};

// Scoped to Media Planner (v2) only for now.
// Other features (Metadata Analysis, Taxonomy Explorer, etc.) remain in
// src/pages/ as stubs and can be re-enabled by adding them back here.
export const NAV_CONFIG: NavSection[] = [
  {
    section: 'Live Prototypes',
    items: [
      { id: 'media-planner-v2', label: 'Media Planner Demo', path: '/media-planner-v2', icon: <DocumentScannerIcon fontSize="small" /> },
      { id: 'contextual-ad-demos', label: 'Contextual Ad Demos', path: '/contextual-ad-demos', icon: <OndemandVideoIcon fontSize="small" /> },
    ],
  },
];

export function findNavItemByPath(pathname: string): NavItem | null {
  const path = pathname.replace(/^\//, '').replace(/\/$/, '') || 'media-planner-v2';
  for (const section of NAV_CONFIG) {
    for (const item of section.items) {
      if (item.id === path) return item;
    }
  }
  return null;
}
