import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps, Platform } from 'react-native';
import { CosmicTheme } from '@/constants/theme';

interface Props extends TextInputProps {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export function CosmicInput({ label, error, icon, style, ...props }: Props) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={CosmicTheme.colors.text.tertiary}
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: CosmicTheme.spacing.md,
  },
  label: {
    color: CosmicTheme.colors.text.secondary,
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    color: CosmicTheme.colors.text.primary,
    fontSize: 16,
    paddingVertical: 14,
    paddingHorizontal: CosmicTheme.spacing.md,
    backgroundColor: CosmicTheme.colors.background.elevated,
    borderRadius: CosmicTheme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: CosmicTheme.colors.border.subtle,
  },
  error: {
    color: CosmicTheme.colors.status.error,
    fontSize: 12,
    marginTop: 4,
  },
});
