// Image sourcing for moment cards. The primary, "accurate" source is the
// runtime lookup (/api/unsplash) keyed by TV_QUERIES; if that fails we fall
// back to one of the 6 bundled images in /public/assets/moments/ so a live demo
// never shows a blank card. imageCache is module-level so images survive grid
// remounts (type change / reset). See also MuiSelectBridge / vite.config dev stub.

// Per-moment search query for the runtime image lookup.
export const TV_QUERIES: Record<string, string> = {
  'Family Dinner Time': 'family dinner tv show scene',
  'Grocery Shopping': 'cooking show food network television host',
  'Healthy Eating': 'cooking show kitchen television chef healthy',
  'Meal Prep & Cooking': 'cooking show chef kitchen television',
  'Fresh Produce': 'cooking show vegetables chef television',
  'Weekend BBQ': 'outdoor cooking show bbq television',
  'Quick & Easy Meals': 'cooking show recipe television host',
  'Home Cooking': 'home cooking television show chef',
  'Family Life': 'family television sitcom show scene',
  'Snack & Entertaining': 'television show party entertaining scene',
  'Budget Living': 'reality tv show home lifestyle',
  'Lifestyle & Wellness': 'wellness lifestyle television show host',
  'Food Discovery': 'food travel television show chef',
  'Kids & Family': 'kids family television show scene',
  'Community & Local': 'community television show neighborhood',
  'Seasonal Celebrations': 'holiday television show celebration family',
};

// Bundled fallback only: maps a moment to one of the 6 images in
// /public/assets/moments/.
const MOMENT_IMAGES: Record<string, string> = {
  'Family Dinner Time': 'family',
  'Grocery Shopping': 'shopping',
  'Healthy Eating': 'produce',
  'Meal Prep & Cooking': 'cooking',
  'Fresh Produce': 'produce',
  'Weekend BBQ': 'meat',
  'Quick & Easy Meals': 'cooking',
  'Home Cooking': 'cooking',
  'Family Life': 'family',
  'Snack & Entertaining': 'shopping',
  'Budget Living': 'grocery',
  'Lifestyle & Wellness': 'produce',
  'Food Discovery': 'grocery',
  'Kids & Family': 'family',
  'Community & Local': 'grocery',
  'Seasonal Celebrations': 'family',
};

export function momentFallbackSrc(name: string): string {
  return `/assets/moments/${MOMENT_IMAGES[name] || 'cooking'}.jpg`;
}

// Survives grid remounts so we don't refetch on every re-render.
export const imageCache = new Map<string, string>();
