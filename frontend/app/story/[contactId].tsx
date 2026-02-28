import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { CosmicGradient } from '@/components/ui/CosmicGradient';
import { GlowText } from '@/components/ui/GlowText';
import { CosmicCard } from '@/components/ui/CosmicCard';
import { CosmicButton } from '@/components/ui/CosmicButton';
import { StarField } from '@/components/ui/StarField';
import { CosmicTheme } from '@/constants/theme';
import { ZODIAC_SIGNS } from '@/constants/zodiac';
import { api } from '@/services/api';

interface StoryData {
  title: string;
  chapters: Array<{ title: string; body: string }>;
  contact_name: string;
  user_sign: string;
  contact_sign: string;
}

export default function StoryScreen() {
  const { contactId } = useLocalSearchParams<{ contactId: string }>();
  const [story, setStory] = useState<StoryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (contactId) {
      api.get<StoryData>(`/stories/${contactId}`)
        .then(setStory)
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [contactId]);

  if (loading) {
    return (
      <CosmicGradient>
        <StarField />
        <View style={styles.center}>
          <ActivityIndicator size="large" color={CosmicTheme.colors.accent.gold} />
          <Text style={styles.loadingText}>Writing your story...</Text>
        </View>
      </CosmicGradient>
    );
  }

  if (!story) {
    return (
      <CosmicGradient>
        <View style={styles.center}>
          <Text style={styles.errorText}>Could not load story</Text>
        </View>
      </CosmicGradient>
    );
  }

  const userZodiac = ZODIAC_SIGNS[story.user_sign] || ZODIAC_SIGNS.aries;
  const contactZodiac = ZODIAC_SIGNS[story.contact_sign] || ZODIAC_SIGNS.aries;

  return (
    <CosmicGradient>
      <StarField />
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.signs}>
            {userZodiac.symbol} × {contactZodiac.symbol}
          </Text>
          <GlowText size="h1" color={CosmicTheme.colors.accent.gold}>
            {story.title}
          </GlowText>
          <Text style={styles.subtitle}>
            The Story of You & {story.contact_name}
          </Text>
        </View>

        {story.chapters.map((chapter, i) => (
          <CosmicCard key={i} gradient style={styles.chapterCard}>
            <Text style={styles.chapterNumber}>Chapter {i + 1}</Text>
            <Text style={styles.chapterTitle}>{chapter.title}</Text>
            <Text style={styles.chapterBody}>{chapter.body}</Text>
          </CosmicCard>
        ))}

        <View style={styles.footer}>
          <CosmicButton
            title="Share Card"
            onPress={() => router.push(`/card/${contactId}`)}
            variant="gold"
            size="large"
          />
        </View>
      </ScrollView>
    </CosmicGradient>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: CosmicTheme.colors.accent.gold,
    marginTop: 12,
    fontSize: 15,
  },
  errorText: {
    color: CosmicTheme.colors.text.secondary,
    fontSize: 16,
  },
  backButton: {
    marginBottom: 16,
  },
  backText: {
    color: CosmicTheme.colors.accent.purpleLight,
    fontSize: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  signs: {
    fontSize: 36,
    marginBottom: 14,
  },
  subtitle: {
    color: CosmicTheme.colors.text.secondary,
    fontSize: 15,
    marginTop: 8,
  },
  chapterCard: {
    marginBottom: 16,
    padding: 20,
  },
  chapterNumber: {
    color: CosmicTheme.colors.accent.purpleLight,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
  },
  chapterTitle: {
    color: CosmicTheme.colors.accent.gold,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  chapterBody: {
    color: CosmicTheme.colors.text.secondary,
    fontSize: 15,
    lineHeight: 24,
  },
  footer: {
    marginTop: 8,
  },
});
