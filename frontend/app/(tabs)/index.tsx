import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { CosmicGradient } from '@/components/ui/CosmicGradient';
import { GlowText } from '@/components/ui/GlowText';
import { CosmicCard } from '@/components/ui/CosmicCard';
import { CosmicButton } from '@/components/ui/CosmicButton';
import { CosmicTheme } from '@/constants/theme';
import { useAuth } from '@/store/AuthContext';
import { getSunSign, getZodiacInfo } from '@/utils/zodiac';
import { api } from '@/services/api';

interface ContactItem {
  id: string;
  name: string;
  birthdate: string;
  relationship_tag: string;
  soulmate_score?: number;
}

interface CosmicWeather {
  title: string;
  emoji: string;
  description: string;
  advice: string;
}

interface ConnectionSpotlight {
  contact_id: string;
  contact_name: string;
  contact_sign: string;
  relationship_tag: string;
  message: string;
}

interface DailyForecast {
  date: string;
  formatted_date: string;
  sign: string;
  personal_insight: string;
  cosmic_weather: CosmicWeather;
  connection_spotlights: ConnectionSpotlight[];
}

const TAG_EMOJI: Record<string, string> = {
  partner: '\u2764\uFE0F',
  friend: '\uD83D\uDC9C',
  crush: '\uD83D\uDC97',
  family: '\uD83C\uDFE0',
  coworker: '\uD83D\uDCBC',
};

export default function HomeScreen() {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [forecast, setForecast] = useState<DailyForecast | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadContacts = useCallback(async () => {
    try {
      const data = await api.get<ContactItem[]>('/contacts');
      setContacts(data);
    } catch {
      // silently fail
    }
  }, []);

  const loadForecast = useCallback(async () => {
    try {
      const data = await api.get<DailyForecast>('/users/me/daily-forecast');
      setForecast(data);
    } catch {
      // silently fail - use fallback
    }
  }, []);

  useEffect(() => {
    loadContacts();
    loadForecast();
  }, [loadContacts, loadForecast]);

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([loadContacts(), loadForecast()]);
    setRefreshing(false);
  };

  const sunSign = user?.birthdate ? getSunSign(user.birthdate) : 'aries';
  const zodiac = getZodiacInfo(sunSign);
  const topContacts = contacts
    .filter((c) => c.soulmate_score != null)
    .sort((a, b) => (b.soulmate_score || 0) - (a.soulmate_score || 0))
    .slice(0, 3);

  const sunInterpretation = user?.natal_chart_data?.sun?.interpretation;

  return (
    <CosmicGradient>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={CosmicTheme.colors.accent.purple} />}
      >
        {/* Header with date */}
        <View style={styles.header}>
          <Text style={styles.dateText}>
            {forecast?.formatted_date || new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </Text>
          <Text style={styles.greeting}>Welcome back,</Text>
          <GlowText size="h2" center={false}>{user?.name || 'Explorer'}</GlowText>
        </View>

        {/* Cosmic Weather - Today's planetary transit */}
        {forecast?.cosmic_weather && (
          <CosmicCard gradient style={styles.weatherCard}>
            <View style={styles.weatherHeader}>
              <Text style={styles.weatherEmoji}>{forecast.cosmic_weather.emoji}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.weatherTitle}>Today's Cosmic Weather</Text>
                <Text style={styles.weatherTransit}>{forecast.cosmic_weather.title}</Text>
              </View>
            </View>
            <Text style={styles.weatherDesc}>{forecast.cosmic_weather.description}</Text>
            <View style={styles.weatherAdviceBox}>
              <Text style={styles.weatherAdviceLabel}>Today's Guidance</Text>
              <Text style={styles.weatherAdvice}>{forecast.cosmic_weather.advice}</Text>
            </View>
          </CosmicCard>
        )}

        {/* Your Sign Card */}
        <CosmicCard style={styles.signCard}>
          <View style={styles.signRow}>
            <Text style={styles.signSymbol}>{zodiac.symbol}</Text>
            <View>
              <Text style={styles.signName}>{zodiac.name}</Text>
              <Text style={styles.signElement}>{zodiac.element} sign</Text>
            </View>
          </View>
          {user?.natal_chart_data && (
            <View style={styles.chartPreview}>
              <ChartItem label="Sun" value={user.natal_chart_data.sun?.sign} />
              <ChartItem label="Moon" value={user.natal_chart_data.moon?.sign} />
              <ChartItem label="Rising" value={user.natal_chart_data.rising?.sign} />
            </View>
          )}
        </CosmicCard>

        {/* Daily Personal Insight */}
        <CosmicCard style={styles.insightCard}>
          <Text style={styles.insightTitle}>Your Daily Insight</Text>
          <Text style={styles.insightText}>
            {forecast?.personal_insight || sunInterpretation || (
              `As a ${zodiac.name}, your ${zodiac.element} energy is strong today.`
            )}
          </Text>
        </CosmicCard>

        {/* Connection Spotlights - Date-specific */}
        {forecast?.connection_spotlights && forecast.connection_spotlights.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today's Connection Energy</Text>
            <Text style={styles.sectionSubtitle}>How the stars align with your circle today</Text>
            {forecast.connection_spotlights.map((spot) => {
              const contactZodiac = getZodiacInfo(spot.contact_sign);
              const tagEmoji = TAG_EMOJI[spot.relationship_tag.toLowerCase()] || '';
              return (
                <TouchableOpacity
                  key={spot.contact_id}
                  onPress={() => router.push(`/contact/${spot.contact_id}`)}
                  activeOpacity={0.7}
                >
                  <CosmicCard style={styles.spotlightCard}>
                    <View style={styles.spotlightHeader}>
                      <Text style={styles.spotlightSymbol}>{contactZodiac.symbol}</Text>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.spotlightName}>
                          {spot.contact_name} {tagEmoji}
                        </Text>
                        <Text style={styles.spotlightSign}>{contactZodiac.name}</Text>
                      </View>
                    </View>
                    <Text style={styles.spotlightMessage}>{spot.message}</Text>
                  </CosmicCard>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Top Cosmic Connections (scored) */}
        {topContacts.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Top Cosmic Connections</Text>
            {topContacts.map((contact) => {
              const contactSign = getSunSign(contact.birthdate);
              const contactZodiac = getZodiacInfo(contactSign);
              return (
                <TouchableOpacity
                  key={contact.id}
                  onPress={() => router.push(`/compatibility/${contact.id}`)}
                  activeOpacity={0.7}
                >
                  <CosmicCard style={styles.connectionCard}>
                    <View style={styles.connectionRow}>
                      <Text style={styles.connectionSymbol}>{contactZodiac.symbol}</Text>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.connectionName}>{contact.name}</Text>
                        <Text style={styles.connectionSign}>{contactZodiac.name}</Text>
                      </View>
                      <View style={styles.scoreBadge}>
                        <Text style={styles.scoreText}>{contact.soulmate_score}</Text>
                      </View>
                    </View>
                  </CosmicCard>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        <View style={styles.quickActions}>
          <CosmicButton
            title="Add Contact"
            onPress={() => router.push('/contact/add')}
            variant="outline"
            size="medium"
          />
          <CosmicButton
            title="View Circle"
            onPress={() => router.push('/(tabs)/circle')}
            variant="secondary"
            size="medium"
          />
        </View>
      </ScrollView>
    </CosmicGradient>
  );
}

function ChartItem({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  const info = getZodiacInfo(value);
  return (
    <View style={styles.chartItem}>
      <Text style={styles.chartLabel}>{label}</Text>
      <Text style={styles.chartValue}>{info.symbol} {info.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 20,
  },
  dateText: {
    color: CosmicTheme.colors.accent.gold,
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  greeting: {
    color: CosmicTheme.colors.text.secondary,
    fontSize: 16,
    marginBottom: 4,
  },
  // Cosmic Weather
  weatherCard: {
    marginBottom: 16,
    padding: 18,
  },
  weatherHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  weatherEmoji: {
    fontSize: 32,
  },
  weatherTitle: {
    color: CosmicTheme.colors.text.tertiary,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  weatherTransit: {
    color: CosmicTheme.colors.text.primary,
    fontSize: 18,
    fontWeight: '700',
    marginTop: 2,
  },
  weatherDesc: {
    color: CosmicTheme.colors.text.secondary,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 14,
  },
  weatherAdviceBox: {
    backgroundColor: 'rgba(245, 197, 66, 0.08)',
    borderRadius: 10,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: CosmicTheme.colors.accent.gold,
  },
  weatherAdviceLabel: {
    color: CosmicTheme.colors.accent.gold,
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  weatherAdvice: {
    color: CosmicTheme.colors.text.primary,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  // Sign card
  signCard: {
    marginBottom: 16,
  },
  signRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  signSymbol: {
    fontSize: 40,
  },
  signName: {
    color: CosmicTheme.colors.text.primary,
    fontSize: 20,
    fontWeight: '700',
  },
  signElement: {
    color: CosmicTheme.colors.text.secondary,
    fontSize: 13,
    marginTop: 2,
  },
  chartPreview: {
    flexDirection: 'row',
    marginTop: 14,
    gap: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: CosmicTheme.colors.border.subtle,
  },
  chartItem: {
    flex: 1,
    alignItems: 'center',
  },
  chartLabel: {
    color: CosmicTheme.colors.text.tertiary,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  chartValue: {
    color: CosmicTheme.colors.text.accent,
    fontSize: 13,
    fontWeight: '500',
  },
  // Daily insight
  insightCard: {
    marginBottom: 16,
    padding: 18,
  },
  insightTitle: {
    color: CosmicTheme.colors.accent.purple,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  insightText: {
    color: CosmicTheme.colors.text.secondary,
    fontSize: 14,
    lineHeight: 22,
  },
  // Connection spotlights
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: CosmicTheme.colors.text.primary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
  },
  sectionSubtitle: {
    color: CosmicTheme.colors.text.tertiary,
    fontSize: 12,
    marginBottom: 12,
  },
  spotlightCard: {
    marginBottom: 10,
    padding: 14,
  },
  spotlightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  spotlightSymbol: {
    fontSize: 28,
  },
  spotlightName: {
    color: CosmicTheme.colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  spotlightSign: {
    color: CosmicTheme.colors.text.tertiary,
    fontSize: 12,
    marginTop: 1,
  },
  spotlightMessage: {
    color: CosmicTheme.colors.text.secondary,
    fontSize: 13,
    lineHeight: 20,
    fontStyle: 'italic',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: CosmicTheme.colors.border.subtle,
  },
  // Top connections
  connectionCard: {
    marginBottom: 8,
    padding: 14,
  },
  connectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  connectionSymbol: {
    fontSize: 28,
  },
  connectionName: {
    color: CosmicTheme.colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  connectionSign: {
    color: CosmicTheme.colors.text.secondary,
    fontSize: 13,
  },
  scoreBadge: {
    backgroundColor: 'rgba(245, 197, 66, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: CosmicTheme.borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(245, 197, 66, 0.3)',
  },
  scoreText: {
    color: CosmicTheme.colors.accent.gold,
    fontSize: 16,
    fontWeight: '700',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
});
