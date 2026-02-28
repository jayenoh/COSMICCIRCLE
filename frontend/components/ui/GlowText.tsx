import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { CosmicTheme } from '@/constants/theme';

interface Props {
  children: React.ReactNode;
  size?: 'h1' | 'h2' | 'h3';
  color?: string;
  style?: TextStyle;
  center?: boolean;
}

export function GlowText({ children, size = 'h2', color, style, center = true }: Props) {
  const glowColor = color || CosmicTheme.colors.accent.purpleLight;

  return (
    <Text
      style={[
        styles.base,
        styles[size],
        {
          color: glowColor,
          textShadowColor: glowColor + '80',
          textAlign: center ? 'center' : 'left',
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    fontWeight: '700',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  h1: {
    fontSize: 32,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    lineHeight: 28,
  },
});
