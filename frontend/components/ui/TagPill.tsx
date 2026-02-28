import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CosmicTheme } from '@/constants/theme';

interface Props {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  color?: string;
  emoji?: string;
  size?: 'small' | 'medium';
}

export function TagPill({ label, selected, onPress, color, emoji, size = 'medium' }: Props) {
  const bgColor = selected
    ? (color || CosmicTheme.colors.accent.purple)
    : CosmicTheme.colors.background.elevated;
  const textColor = selected
    ? '#FFFFFF'
    : CosmicTheme.colors.text.secondary;
  const borderColor = selected
    ? (color || CosmicTheme.colors.accent.purple)
    : CosmicTheme.colors.border.subtle;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.pill,
        size === 'small' && styles.pillSmall,
        {
          backgroundColor: selected ? bgColor + '30' : bgColor,
          borderColor,
        },
      ]}
      activeOpacity={0.7}
    >
      {emoji && <Text style={styles.emoji}>{emoji}</Text>}
      <Text style={[styles.text, size === 'small' && styles.textSmall, { color: textColor }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: CosmicTheme.borderRadius.full,
    borderWidth: 1,
  },
  pillSmall: {
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  emoji: {
    marginRight: 6,
    fontSize: 14,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
  textSmall: {
    fontSize: 12,
  },
});
