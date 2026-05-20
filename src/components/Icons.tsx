// SVG icons ported from js/icons.js.
// Each component renders a 16×16 SVG using currentColor for stroke.

type IconProps = { className?: string };

export const IconMetadata = (p: IconProps) => (
  <svg className={p.className} width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
    <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
    <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
    <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

export const IconShowcase = (p: IconProps) => (
  <svg className={p.className} width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1.5" y="3" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="M5.5 12.5v1M10.5 12.5v1M3.5 13.5h9"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
    <path d="M4.5 7.5h7M4.5 5.5h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
  </svg>
);

export const IconSdtForm = (p: IconProps) => (
  <svg className={p.className} width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="4" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M11 7l4-2v6l-4-2V7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
);

export const IconTaxonomy = (p: IconProps) => (
  <svg className={p.className} width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="3.5" cy="11" r="1.5" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="12.5" cy="11" r="1.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M8 4.5v2.5M8 7l-4.5 3M8 7l4.5 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

export const IconChevronDown = (p: IconProps) => (
  <svg className={p.className} width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconChevronUp = (p: IconProps) => (
  <svg className={p.className} width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M2 6.5l3-3 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconChevronLeft = (p: IconProps) => (
  <svg className={p.className} width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M6 2L3 5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconChevronRight = (p: IconProps) => (
  <svg className={p.className} width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M4 2l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconLogout = (p: IconProps) => (
  <svg className={p.className} width="15" height="15" viewBox="0 0 16 16" fill="none">
    <path d="M6 3H3v10h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M10 5l3 3-3 3M13 8H6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
