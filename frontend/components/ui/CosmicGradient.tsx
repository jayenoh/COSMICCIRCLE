import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CosmicTheme } from '@/constants/theme';

interface Props {
  children: React.ReactNode;
  colors?: readonly string[];
  style?: ViewStyle;
}

export function CosmicGradient({ children, colors, style }: Props) {
  return (
    <LinearGradient
      colors={(colors || CosmicTheme.colors.gradient.cosmic) as [string, string, ...string[]]}
      style={[styles.gradient, style]}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});
