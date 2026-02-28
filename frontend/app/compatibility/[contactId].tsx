import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { CosmicGradient } from '@/components/ui/CosmicGradient';
import { GlowText } from '@/components/ui/GlowText';
import { CosmicCard } from '@/components/ui/CosmicCard';
import { CosmicButton } from '@/components/ui/CosmicButton';
import { ScoreRing } from '@/components/ui/ScoreRing';
import { CosmicTheme } from '@/constants/theme';
import { COMPATIBILITY_CATEGORIES, ZODIAC_SIGNS } from '@/constants/zodiac';
import { api } from '@/services/api';
import { useAuth } from '@/store/AuthContext';
import { getSunSign, getZodiacInfo } from '@/utils/zodiac';

interface CompatibilityData {
  id: string;
  soulmate_score: number;
  compatibility_category: string;
  compatibility_data: {
    overall_score: number;
    category: string;
    sub_scores: Record<string, number>;
    key_aspects: Array<{ planet1: string; planet2: string; sign1: string; sign2: string; aspect: string; description: string }>;
    strengths: string[];
    challenges: string[];
    sun_aspect: string;
    user_sun: string;
    contact_sun: string;
  };
}

interface ContactInfo {
  id: string;
  name: string;
  birthdate: string;
}

export default function CompatibilityScreen() {
  const { contactId } = useLocalSearchParams<{ contactId: string }>();
  const { user } = useAuth();
  const [compat, setCompat] = useState<CompatibilityData | null>(null);
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (contactId) {
      Promise.all([
        api.get<CompatibilityData>(`/compatibility/${contactId}`),
        api.get<ContactInfo>(`/contacts/${contactId}`),
      ])
        .then(([c, ct]) => {
          setCompat(c);
          setContact(ct);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [contactId]);

  if (loading) {
    return (
      <CosmicGradient>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={CosmicTheme.colors.accent.purple} />
          <Text style={styles.loadingText}>Aligning the stars...</Text>
        </View>
      </CosmicGradient>
    );
  }

  if (!compat || !contact) {
    return (
      <CosmicGradient>
        <View style={styles.center}>
          <Text style={styles.errorText}>Could not load compatibility</Text>
        </View>
      </CosmicGradient>
    );
  }

  const data = compat.compatibility_data;
  const catInfo = COMPATIBILITY_CATEGORIES[data.category as keyof typeof COMPATIBILITY_CATEGORIES]
    || COMPATIBILITY_CATEGORIES.platonic_soulmate;
  const userSign = user?.birthdate ? getSunSign(user.birthdate) : 'aries';
  const userZodiac = getZodiacInfo(userSign);
  const contactSign = getSunSign(contact.birthdate);
  const contactZodiac = getZodiacInfo(contactSign);

  return (
    <CosmicGradient>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.signsRow}>
          <View style={styles.signBox}>
            <Text style={styles.signSymbol}>{userZodiac.symbol}</Text>
            <Text style={styles.signLabel}>{user?.name}</Text>
            <Text style={styles.signName}>{userZodiac.name}</Text>
          </View>
          <Text style={styles.vsText}>×</Text>
          <View style={styles.signBox}>
            <Text style={styles.signSymbol}>{contactZodiac.symbol}</Text>
            <Text style={styles.signLabel}>{contact.name}</Text>
            <Text style={styles.signName}>{contactZodiac.name}</Text>
          </View>
        </View>

        <View style={styles.scoreSection}>
          <ScoreRing score={data.overall_score} size={180} />
          <View style={[styles.categoryBadge, { backgroundColor: catInfo.color + '20', borderColor: catInfo.color + '60' }]}>
            <Text style={styles.categoryEmoji}>{catInfo.emoji}</Text>
            <Text style={[styles.categoryText, { color: catInfo.color }]}>{catInfo.label}</Text>
          </View>
        </View>

        <CosmicCard style={styles.breakdownCard}>
          <Text style={styles.cardTitle}>Compatibility Breakdown</Text>
          {Object.entries(data.sub_scores || {}).map(([key, value]) => (
            <View key={key} style={styles.barRow}>
              <Text style={styles.barLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: `${value}%` }]} />
              </View>
              <Text style={styles.barValue}>{value}</Text>
            </View>
          ))}
        </CosmicCard>

        {data.key_aspects && data.key_aspects.length > 0 && (
          <CosmicCard style={styles.aspectsCard}>
            <Text style={styles.cardTitle}>Key Aspects</Text>
            {data.key_aspects.map((asp, i) => {
              const s1 = ZODIAC_SIGNS[asp.sign1];
              const s2 = ZODIAC_SIGNS[asp.sign2];
              return (
                <View key={i} style={styles.aspectRow}>
                  <Text style={styles.aspectLabel}>
                    {s1?.symbol} {asp.planet1.charAt(0).toUpperCase() + asp.planet1.slice(1)} {asp.aspect} {s2?.symbol} {asp.planet2.charAt(0).toUpperCase() + asp.planet2.slice(1)}
                  </Text>
                  <Text style={styles.aspectDesc}>{asp.description}</Text>
                </View>
              );
            })}
          </CosmicCard>
        )}

        <CosmicCard style={styles.listCard}>
          <Text style={[styles.cardTitle, { color: CosmicTheme.colors.status.success }]}>Strengths</Text>
          {(data.strengths || []).map((s, i) => (
            <Text key={i} style={styles.listItem}>• {s}</Text>
          ))}
        </CosmicCard>

        <CosmicCard style={styles.listCard}>
          <Text style={[styles.cardTitle, { color: CosmicTheme.colors.accent.gold }]}>Growth Areas</Text>
          {(data.challenges || []).map((c, i) => (
            <Text key={i} style={styles.listItem}>• {c}</Text>
          ))}
        </CosmicCard>

        <View style={styles.actions}>
          <CosmicButton
            title="Read Your Story"
            onPress={() => router.push(`/story/${contactId}`)}
            size="large"
          />
          <CosmicButton
            title="Share Card"
            onPress={() => router.push(`/card/${contactId}`)}
            variant="gold"
            size="large"
            style={{ marginTop: 10 }}
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
    color: CosmicTheme.colors.text.secondary,
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
  signsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginBottom: 24,
  },
  signBox: {
    alignItems: 'center',
  },
  signSymbol: {
    fontSize: 40,
  },
  signLabel: {
    color: CosmicTheme.colors.text.primary,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 6,
  },
  signName: {
    color: CosmicTheme.colors.text.tertiary,
    fontSize: 12,
  },
  vsText: {
    color: CosmicTheme.colors.accent.purpleLight,
    fontSize: 28,
    fontWeight: '300',
  },
  scoreSection: {
    alignItems: 'center',
    marginBottom: 24,
    gap: 16,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: CosmicTheme.borderRadius.full,
    borderWidth: 1,
    gap: 8,
  },
  categoryEmoji: {
    fontSize: 18,
  },
  categoryText: {
    fontSize: 15,
    fontWeight: '600',
  },
  breakdownCard: {
    marginBottom: 16,
  },
  cardTitle: {
    color: CosmicTheme.colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 14,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  barLabel: {
    color: CosmicTheme.colors.text.secondary,
    fontSize: 13,
    width: 100,
  },
  barTrack: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(124, 58, 237, 0.12)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: CosmicTheme.colors.accent.purple,
    borderRadius: 4,
  },
  barValue: {
    color: CosmicTheme.colors.accent.purpleLight,
    fontSize: 13,
    fontWeight: '600',
    width: 30,
    textAlign: 'right',
  },
  aspectsCard: {
    marginBottom: 16,
  },
  aspectRow: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: CosmicTheme.colors.border.subtle,
  },
  aspectLabel: {
    color: CosmicTheme.colors.text.accent,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  aspectDesc: {
    color: CosmicTheme.colors.text.secondary,
    fontSize: 13,
    lineHeight: 20,
  },
  listCard: {
    marginBottom: 16,
  },
  listItem: {
    color: CosmicTheme.colors.text.secondary,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 6,
  },
  actions: {
    marginTop: 8,
  },
});
