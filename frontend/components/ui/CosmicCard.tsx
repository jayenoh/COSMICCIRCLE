import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CosmicTheme } from '@/constants/theme';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  gradient?: boolean;
}

export function CosmicCard({ children, style, gradient = false }: Props) {
  if (gradient) {
    return (
      <LinearGradient
        colors={CosmicTheme.colors.gradient.card as [string, string]}
        style={[styles.card, style]}
      >
        {children}
      </LinearGradient>
    );
  }

  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: CosmicTheme.colors.background.card,
    borderRadius: CosmicTheme.borderRadius.lg,
    padding: CosmicTheme.spacing.md,
    borderWidth: 1,
    borderColor: CosmicTheme.colors.border.subtle,
  },
});
