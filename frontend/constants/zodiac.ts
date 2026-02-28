export interface ZodiacSign {
  name: string;
  symbol: string;
  element: 'fire' | 'earth' | 'air' | 'water';
  modality: 'cardinal' | 'fixed' | 'mutable';
  dateRange: string;
  icon: string;
}

export const ZODIAC_SIGNS: Record<string, ZodiacSign> = {
  aries: {
    name: 'Aries',
    symbol: '\u2648',
    element: 'fire',
    modality: 'cardinal',
    dateRange: 'Mar 21 - Apr 19',
    icon: 'zodiac-aries',
  },
  taurus: {
    name: 'Taurus',
    symbol: '\u2649',
    element: 'earth',
    modality: 'fixed',
    dateRange: 'Apr 20 - May 20',
    icon: 'zodiac-taurus',
  },
  gemini: {
    name: 'Gemini',
    symbol: '\u264A',
    element: 'air',
    modality: 'mutable',
    dateRange: 'May 21 - Jun 20',
    icon: 'zodiac-gemini',
  },
  cancer: {
    name: 'Cancer',
    symbol: '\u264B',
    element: 'water',
    modality: 'cardinal',
    dateRange: 'Jun 21 - Jul 22',
    icon: 'zodiac-cancer',
  },
  leo: {
    name: 'Leo',
    symbol: '\u264C',
    element: 'fire',
    modality: 'fixed',
    dateRange: 'Jul 23 - Aug 22',
    icon: 'zodiac-leo',
  },
  virgo: {
    name: 'Virgo',
    symbol: '\u264D',
    element: 'earth',
    modality: 'mutable',
    dateRange: 'Aug 23 - Sep 22',
    icon: 'zodiac-virgo',
  },
  libra: {
    name: 'Libra',
    symbol: '\u264E',
    element: 'air',
    modality: 'cardinal',
    dateRange: 'Sep 23 - Oct 22',
    icon: 'zodiac-libra',
  },
  scorpio: {
    name: 'Scorpio',
    symbol: '\u264F',
    element: 'water',
    modality: 'fixed',
    dateRange: 'Oct 23 - Nov 21',
    icon: 'zodiac-scorpio',
  },
  sagittarius: {
    name: 'Sagittarius',
    symbol: '\u2650',
    element: 'fire',
    modality: 'mutable',
    dateRange: 'Nov 22 - Dec 21',
    icon: 'zodiac-sagittarius',
  },
  capricorn: {
    name: 'Capricorn',
    symbol: '\u2651',
    element: 'earth',
    modality: 'cardinal',
    dateRange: 'Dec 22 - Jan 19',
    icon: 'zodiac-capricorn',
  },
  aquarius: {
    name: 'Aquarius',
    symbol: '\u2652',
    element: 'air',
    modality: 'fixed',
    dateRange: 'Jan 20 - Feb 18',
    icon: 'zodiac-aquarius',
  },
  pisces: {
    name: 'Pisces',
    symbol: '\u2653',
    element: 'water',
    modality: 'mutable',
    dateRange: 'Feb 19 - Mar 20',
    icon: 'zodiac-pisces',
  },
};

export const ELEMENTS = {
  fire: { color: '#F43F5E', gradient: ['#F43F5E', '#F59E0B'] as const, label: 'Fire' },
  earth: { color: '#10B981', gradient: ['#10B981', '#065F46'] as const, label: 'Earth' },
  air: { color: '#22D3EE', gradient: ['#22D3EE', '#3B82F6'] as const, label: 'Air' },
  water: { color: '#6366F1', gradient: ['#6366F1', '#8B5CF6'] as const, label: 'Water' },
} as const;

export const RELATIONSHIP_TAGS = [
  { key: 'friend', label: 'Friend', emoji: '👋' },
  { key: 'partner', label: 'Partner', emoji: '💕' },
  { key: 'family', label: 'Family', emoji: '🏠' },
  { key: 'coworker', label: 'Coworker', emoji: '💼' },
  { key: 'crush', label: 'Crush', emoji: '🦋' },
  { key: 'ex', label: 'Ex', emoji: '🌙' },
] as const;

export const COMPATIBILITY_CATEGORIES = {
  twin_flame: { label: 'Twin Flame', color: '#F5C542', emoji: '🔥' },
  romantic_soulmate: { label: 'Romantic Soulmate', color: '#EC4899', emoji: '💫' },
  platonic_soulmate: { label: 'Platonic Soulmate', color: '#8B5CF6', emoji: '✨' },
  karmic_teacher: { label: 'Karmic Teacher', color: '#22D3EE', emoji: '🌀' },
  cosmic_challenger: { label: 'Cosmic Challenger', color: '#F59E0B', emoji: '⚡' },
} as const;
