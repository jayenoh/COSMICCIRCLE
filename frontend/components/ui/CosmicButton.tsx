import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CosmicTheme } from '@/constants/theme';

interface Props {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'gold';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  icon?: React.ReactNode;
}

export function CosmicButton({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  icon,
}: Props) {
  const isDisabled = disabled || loading;

  if (variant === 'primary' || variant === 'gold') {
    const gradientColors = variant === 'gold'
      ? CosmicTheme.colors.gradient.gold
      : CosmicTheme.colors.gradient.accent;

    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        style={[{ opacity: isDisabled ? 0.5 : 1 }, style]}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={gradientColors as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.button, styles[size], styles.gradient]}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              {icon}
              <Text style={[styles.text, styles[`${size}Text`], icon && { marginLeft: 8 }]}>
                {title}
              </Text>
            </>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  const variantStyles = {
    secondary: styles.secondaryButton,
    outline: styles.outlineButton,
    danger: styles.dangerButton,
  };

  const textStyles = {
    secondary: styles.secondaryText,
    outline: styles.outlineText,
    danger: styles.dangerText,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.button,
        styles[size],
        variantStyles[variant],
        { opacity: isDisabled ? 0.5 : 1 },
        style,
      ]}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={CosmicTheme.colors.text.primary} />
      ) : (
        <>
          {icon}
          <Text style={[styles.text, styles[`${size}Text`], textStyles[variant], icon && { marginLeft: 8 }]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    borderRadius: CosmicTheme.borderRadius.lg,
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: CosmicTheme.borderRadius.sm,
  },
  medium: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: CosmicTheme.borderRadius.lg,
  },
  large: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: CosmicTheme.borderRadius.lg,
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  smallText: { fontSize: 14 },
  mediumText: { fontSize: 16 },
  largeText: { fontSize: 18 },
  secondaryButton: {
    backgroundColor: CosmicTheme.colors.background.elevated,
  },
  secondaryText: {
    color: CosmicTheme.colors.text.primary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: CosmicTheme.colors.accent.purple,
  },
  outlineText: {
    color: CosmicTheme.colors.accent.purpleLight,
  },
  dangerButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  dangerText: {
    color: CosmicTheme.colors.status.error,
  },
});
