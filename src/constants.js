/**
 * App is based in Seattle — default map center and location hints.
 */
export const SEATTLE = {
  name: 'Seattle',
  state: 'Washington',
  center: [47.6061, -122.3328], // [lat, lng]
  zoom: 10,
  defaultZip: '98101',
};

/**
 * Preset tags for filtering gardens (used in host garden form and user search).
 */
export const GARDEN_TAGS = [
  'Vegetables',
  'Fruits',
  'Herbs',
  'Flowers',
  'Kid-friendly',
  'Wheelchair accessible',
  'Organic',
  'Composting',
  'Education / workshops',
];

/**
 * Suggested search/filter chips for the User Portal.
 * type: 'tag' | 'event' | 'search' — applies tag filter, event type, or search text.
 */
export const SUGGESTED_SEARCHES = [
  { type: 'tag', value: 'Vegetables', label: 'Vegetables' },
  { type: 'tag', value: 'Herbs', label: 'Herbs' },
  { type: 'tag', value: 'Kid-friendly', label: 'Kid-friendly' },
  { type: 'tag', value: 'Organic', label: 'Organic' },
  { type: 'event', value: 'volunteer', label: 'Volunteer times' },
  { type: 'event', value: 'harvest', label: 'Harvest times' },
  { type: 'search', value: 'community', label: 'Community' },
  { type: 'tag', value: 'Wheelchair accessible', label: 'Accessible' },
  { type: 'tag', value: 'Education / workshops', label: 'Workshops' },
];
