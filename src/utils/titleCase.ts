// Title-case a string while preserving common acronyms (AI, KERV, CPM, …).
// Mirror of `mp2TitleCase` in public/legacy/media-planner-v2.js — keep the two
// in sync if either changes. The legacy file can't import ES modules, so the
// logic is intentionally duplicated rather than re-exported.

const DEFAULT_ACRONYMS = [
  'AI', 'KERV', 'API', 'TV', 'OS', 'UI', 'UX',
  'CPM', 'CPP', 'KPI', 'ROI', 'DSP', 'CTV', 'OTT', 'IAB', 'VoD',
];

export function titleCase(text: string, acronyms: string[] = DEFAULT_ACRONYMS): string {
  const lookup = new Map(acronyms.map((a) => [a.toLowerCase(), a]));
  return String(text)
    .split(/(\s+)/)
    .map((token) => {
      if (/^\s+$/.test(token) || token === '') return token;
      const lower = token.toLowerCase();
      const acronym = lookup.get(lower);
      if (acronym) return acronym;
      return token.charAt(0).toUpperCase() + token.slice(1).toLowerCase();
    })
    .join('');
}
