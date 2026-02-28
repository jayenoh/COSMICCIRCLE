import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { CosmicGradient } from '@/components/ui/CosmicGradient';
import { GlowText } from '@/components/ui/GlowText';
import { CosmicCard } from '@/components/ui/CosmicCard';
import { CosmicTheme } from '@/constants/theme';
import { useAuth } from '@/store/AuthContext';

const DEPTH_OPTIONS = [
  {
    key: 'sun_only',
    icon: '☀️',
    title: 'Sun Signs',
    shortDesc: 'Fun & casual',
    fullDesc: 'Basic compatibility based on Sun signs — great for quick, lighthearted insights about your connections.',
  },
  {
    key: 'sun_moon_rising',
    icon: '🌙',
    title: 'Big Three',
    shortDesc: 'Emotional depth',
    fullDesc: 'Adds your Moon (emotions) and Rising (social persona) signs for a richer picture of how you relate.',
  },
  {
    key: 'full_chart',
    icon: '🌌',
    title: 'Full Chart',
    shortDesc: 'Complete analysis',
    fullDesc: 'All planetary placements, houses, and aspects. Venus-Mars dynamics, North Node connections, and more.',
  },
];

export default function ExploreScreen() {
  const { user, updateDepth } = useAuth();
  const [updating, setUpdating] = useState(false);
  const currentDepth = user?.depth_preference || 'sun_only';
  const selectedOption = DEPTH_OPTIONS.find((o) => o.key === currentDepth) || DEPTH_OPTIONS[0];

  const handleDepthChange = async (key: string) => {
    if (key === currentDepth || updating) return;
    setUpdating(true);
    try {
      await updateDepth(key);
    } catch {
      // silent
    } finally {
      setUpdating(false);
    }
  };

  return (
    <CosmicGradient>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.emoji}>🎯</Text>
        <GlowText size="h1">Destiny Dial</GlowText>
        <Text style={styles.subtitle}>Control the depth of your cosmic readings</Text>

        <View style={styles.toggle}>
          {DEPTH_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.key}
              onPress={() => handleDepthChange(opt.key)}
              style={[
                styles.toggleOption,
                currentDepth === opt.key && styles.toggleActive,
              ]}
              activeOpacity={0.7}
            >
              <Text style={styles.toggleIcon}>{opt.icon}</Text>
              <Text style={[
                styles.toggleTitle,
                currentDepth === opt.key && styles.toggleTitleActive,
              ]}>
                {opt.title}
              </Text>
              <Text style={styles.toggleShort}>{opt.shortDesc}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <CosmicCard gradient style={styles.descCard}>
          <Text style={styles.descIcon}>{selectedOption.icon}</Text>
          <Text style={styles.descTitle}>{selectedOption.title} Mode</Text>
          <Text style={styles.descText}>{selectedOption.fullDesc}</Text>
        </CosmicCard>

        <Text style={styles.note}>
          Changing your depth will update all compatibility scores and stories to reflect the new level of detail.
        </Text>
      </ScrollView>
    </CosmicGradient>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 100,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  subtitle: {
    color: CosmicTheme.colors.text.secondary,
    fontSize: 15,
    marginTop: 8,
    marginBottom: 32,
    textAlign: 'center',
  },
  toggle: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
    width: '100%',
    maxWidth: 420,
  },
  toggleOption: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: CosmicTheme.borderRadius.lg,
    backgroundColor: CosmicTheme.colors.background.card,
    borderWidth: 1.5,
    borderColor: CosmicTheme.colors.border.subtle,
  },
  toggleActive: {
    borderColor: CosmicTheme.colors.accent.purple,
    backgroundColor: 'rgba(124, 58, 237, 0.12)',
  },
  toggleIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  toggleTitle: {
    color: CosmicTheme.colors.text.secondary,
    fontSize: 14,
    fontWeight: '600',
  },
  toggleTitleActive: {
    color: CosmicTheme.colors.accent.purpleLight,
  },
  toggleShort: {
    color: CosmicTheme.colors.text.tertiary,
    fontSize: 11,
    marginTop: 4,
  },
  descCard: {
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
    padding: 24,
    marginBottom: 16,
  },
  descIcon: {
    fontSize: 36,
    marginBottom: 12,
  },
  descTitle: {
    color: CosmicTheme.colors.text.primary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  descText: {
    color: CosmicTheme.colors.text.secondary,
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
  note: {
    color: CosmicTheme.colors.text.tertiary,
    fontSize: 12,
    textAlign: 'center',
    maxWidth: 300,
  },
});
