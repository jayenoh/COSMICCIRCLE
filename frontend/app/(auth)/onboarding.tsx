import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { CosmicGradient } from '@/components/ui/CosmicGradient';
import { GlowText } from '@/components/ui/GlowText';
import { CosmicButton } from '@/components/ui/CosmicButton';
import { CosmicCard } from '@/components/ui/CosmicCard';
import { StarField } from '@/components/ui/StarField';
import { CosmicTheme } from '@/constants/theme';
import { useAuth } from '@/store/AuthContext';

const DEPTH_OPTIONS = [
  {
    key: 'sun_only',
    icon: '☀️',
    title: 'Sun Signs Only',
    description: 'Quick, fun compatibility based on your Sun sign',
  },
  {
    key: 'sun_moon_rising',
    icon: '🌙',
    title: 'Sun + Moon + Rising',
    description: 'Emotional depth with your Big Three',
  },
  {
    key: 'full_chart',
    icon: '🌌',
    title: 'Full Chart',
    description: 'Complete analysis with all planets and aspects',
  },
];

export default function OnboardingScreen() {
  const { updateDepth } = useAuth();
  const [selected, setSelected] = useState('sun_only');
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    setLoading(true);
    try {
      await updateDepth(selected);
      router.replace('/(tabs)');
    } catch {
      router.replace('/(tabs)');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CosmicGradient>
      <StarField />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.emoji}>🎯</Text>
          <GlowText size="h1">Destiny Dial</GlowText>
          <Text style={styles.subtitle}>
            Choose how deep you want to go
          </Text>
        </View>

        <View style={styles.options}>
          {DEPTH_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.key}
              onPress={() => setSelected(opt.key)}
              activeOpacity={0.8}
            >
              <CosmicCard
                style={[
                  styles.optionCard,
                  selected === opt.key && styles.optionSelected,
                ]}
              >
                <View style={styles.optionRow}>
                  <Text style={styles.optionIcon}>{opt.icon}</Text>
                  <View style={styles.optionText}>
                    <Text style={[
                      styles.optionTitle,
                      selected === opt.key && styles.optionTitleSelected,
                    ]}>
                      {opt.title}
                    </Text>
                    <Text style={styles.optionDesc}>{opt.description}</Text>
                  </View>
                  <View style={[
                    styles.radio,
                    selected === opt.key && styles.radioSelected,
                  ]}>
                    {selected === opt.key && <View style={styles.radioDot} />}
                  </View>
                </View>
              </CosmicCard>
            </TouchableOpacity>
          ))}
        </View>

        <CosmicButton
          title="Enter the Circle"
          onPress={handleContinue}
          loading={loading}
          size="large"
          variant="gold"
        />
      </View>
    </CosmicGradient>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  subtitle: {
    color: CosmicTheme.colors.text.secondary,
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  options: {
    gap: 12,
    marginBottom: 32,
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  optionCard: {
    padding: 16,
  },
  optionSelected: {
    borderColor: CosmicTheme.colors.accent.purple,
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    fontSize: 28,
    marginRight: 14,
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    color: CosmicTheme.colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  optionTitleSelected: {
    color: CosmicTheme.colors.accent.purpleLight,
  },
  optionDesc: {
    color: CosmicTheme.colors.text.secondary,
    fontSize: 13,
    marginTop: 2,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: CosmicTheme.colors.border.medium,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  radioSelected: {
    borderColor: CosmicTheme.colors.accent.purple,
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: CosmicTheme.colors.accent.purple,
  },
});
