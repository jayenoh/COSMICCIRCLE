import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { CosmicGradient } from '@/components/ui/CosmicGradient';
import { CosmicButton } from '@/components/ui/CosmicButton';
import { CosmicTheme } from '@/constants/theme';
import { COMPATIBILITY_CATEGORIES, ZODIAC_SIGNS } from '@/constants/zodiac';
import { api } from '@/services/api';
import { useAuth } from '@/store/AuthContext';
import { getSunSign } from '@/utils/zodiac';

interface CompatibilityData {
  soulmate_score: number;
  compatibility_data: {
    overall_score: number;
    category: string;
    user_sun: string;
    contact_sun: string;
    strengths: string[];
  };
}

interface ContactInfo {
  id: string;
  name: string;
  birthdate: string;
}

export default function CardScreen() {
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
          <ActivityIndicator size="large" color={CosmicTheme.colors.accent.gold} />
        </View>
      </CosmicGradient>
    );
  }

  if (!compat || !contact) {
    return (
      <CosmicGradient>
        <View style={styles.center}>
          <Text style={styles.errorText}>Could not load card data</Text>
        </View>
      </CosmicGradient>
    );
  }

  const data = compat.compatibility_data;
  const catInfo = COMPATIBILITY_CATEGORIES[data.category as keyof typeof COMPATIBILITY_CATEGORIES]
    || COMPATIBILITY_CATEGORIES.platonic_soulmate;
  const userZodiac = ZODIAC_SIGNS[data.user_sun] || ZODIAC_SIGNS.aries;
  const contactZodiac = ZODIAC_SIGNS[data.contact_sun] || ZODIAC_SIGNS.aries;

  return (
    <CosmicGradient>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Shareable Card</Text>

        <View style={styles.cardWrapper}>
          <LinearGradient
            colors={['#1A1040', '#2D1B69', '#0A0E27']}
            style={styles.card}
          >
            <Text style={styles.cardBrand}>✨ CosmicCircle</Text>

            <View style={styles.cardSignsRow}>
              <View style={styles.cardSignBox}>
                <Text style={styles.cardSignSymbol}>{userZodiac.symbol}</Text>
                <Text style={styles.cardSignName}>{user?.name}</Text>
                <Text style={styles.cardSignLabel}>{userZodiac.name}</Text>
              </View>
              <View style={styles.cardScoreCircle}>
                <Text style={styles.cardScore}>{data.overall_score}</Text>
              </View>
              <View style={styles.cardSignBox}>
                <Text style={styles.cardSignSymbol}>{contactZodiac.symbol}</Text>
                <Text style={styles.cardSignName}>{contact.name}</Text>
                <Text style={styles.cardSignLabel}>{contactZodiac.name}</Text>
              </View>
            </View>

            <View style={[styles.cardCategory, { backgroundColor: catInfo.color + '25', borderColor: catInfo.color + '50' }]}>
              <Text style={styles.cardCategoryEmoji}>{catInfo.emoji}</Text>
              <Text style={[styles.cardCategoryText, { color: catInfo.color }]}>{catInfo.label}</Text>
            </View>

            {data.strengths && data.strengths[0] && (
              <Text style={styles.cardInsight}>"{data.strengths[0]}"</Text>
            )}

            <Text style={styles.cardFooter}>cosmicircle.app</Text>
          </LinearGradient>
        </View>

        <View style={styles.actions}>
          <CosmicButton
            title="Share"
            onPress={() => {
              // In a real app, this would capture the card and share
              alert('Sharing would capture this card as an image!');
            }}
            size="large"
            variant="gold"
          />
        </View>
      </View>
    </CosmicGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  title: {
    color: CosmicTheme.colors.text.primary,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  cardWrapper: {
    alignItems: 'center',
    marginBottom: 24,
  },
  card: {
    width: 320,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.3)',
  },
  cardBrand: {
    color: CosmicTheme.colors.accent.purpleLight,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 20,
    letterSpacing: 1,
  },
  cardSignsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  cardSignBox: {
    alignItems: 'center',
    flex: 1,
  },
  cardSignSymbol: {
    fontSize: 36,
  },
  cardSignName: {
    color: CosmicTheme.colors.text.primary,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 6,
  },
  cardSignLabel: {
    color: CosmicTheme.colors.text.tertiary,
    fontSize: 11,
  },
  cardScoreCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: CosmicTheme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
  },
  cardScore: {
    color: CosmicTheme.colors.accent.gold,
    fontSize: 22,
    fontWeight: '700',
  },
  cardCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
    marginBottom: 16,
  },
  cardCategoryEmoji: {
    fontSize: 14,
  },
  cardCategoryText: {
    fontSize: 13,
    fontWeight: '600',
  },
  cardInsight: {
    color: CosmicTheme.colors.text.secondary,
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  cardFooter: {
    color: CosmicTheme.colors.text.tertiary,
    fontSize: 10,
    letterSpacing: 0.5,
  },
  actions: {
    alignItems: 'center',
  },
});
