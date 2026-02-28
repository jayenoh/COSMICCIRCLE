export const CosmicTheme = {
  colors: {
    background: {
      primary: '#0A0E27',
      secondary: '#141937',
      card: '#1A1F3D',
      elevated: '#222750',
    },
    accent: {
      purple: '#7C3AED',
      purpleLight: '#A78BFA',
      violet: '#8B5CF6',
      gold: '#F5C542',
      goldLight: '#FDE68A',
      cyan: '#22D3EE',
      pink: '#EC4899',
      rose: '#F43F5E',
    },
    gradient: {
      cosmic: ['#0A0E27', '#1A1040', '#2D1B69'] as const,
      card: ['#1A1F3D', '#252B5C'] as const,
      accent: ['#7C3AED', '#3B82F6'] as const,
      gold: ['#F5C542', '#F59E0B'] as const,
      romantic: ['#EC4899', '#8B5CF6'] as const,
      fire: ['#F43F5E', '#F59E0B'] as const,
      earth: ['#10B981', '#065F46'] as const,
      air: ['#22D3EE', '#3B82F6'] as const,
      water: ['#6366F1', '#8B5CF6'] as const,
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#A0AEC0',
      tertiary: '#64748B',
      accent: '#A78BFA',
      gold: '#F5C542',
    },
    border: {
      subtle: 'rgba(124, 58, 237, 0.2)',
      medium: 'rgba(124, 58, 237, 0.4)',
      bright: 'rgba(124, 58, 237, 0.8)',
    },
    status: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  typography: {
    heading: {
      h1: { fontSize: 32, lineHeight: 40 },
      h2: { fontSize: 24, lineHeight: 32 },
      h3: { fontSize: 20, lineHeight: 28 },
    },
    body: {
      large: { fontSize: 18, lineHeight: 28 },
      medium: { fontSize: 16, lineHeight: 24 },
      small: { fontSize: 14, lineHeight: 20 },
    },
    caption: { fontSize: 12, lineHeight: 16 },
  },
} as const;

export type CosmicThemeType = typeof CosmicTheme;
