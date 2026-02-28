import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { CosmicGradient } from '@/components/ui/CosmicGradient';
import { GlowText } from '@/components/ui/GlowText';
import { CosmicCard } from '@/components/ui/CosmicCard';
import { CosmicButton } from '@/components/ui/CosmicButton';
import { TagPill } from '@/components/ui/TagPill';
import { CosmicTheme } from '@/constants/theme';
import { RELATIONSHIP_TAGS, ZODIAC_SIGNS } from '@/constants/zodiac';
import { api } from '@/services/api';
import { getSunSign, getZodiacInfo } from '@/utils/zodiac';
import { formatBirthdate } from '@/utils/formatting';
import { TouchableOpacity } from 'react-native';

interface ContactDetail {
  id: string;
  name: string;
  birthdate: string;
  birth_time?: string;
  birth_location?: string;
  relationship_tag: string;
  natal_chart_data?: Record<string, any>;
  notes?: string;
  soulmate_score?: number;
}

export default function ContactDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [contact, setContact] = useState<ContactDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedPlanet, setExpandedPlanet] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      api.get<ContactDetail>(`/contacts/${id}`)
        .then(setContact)
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <CosmicGradient>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={CosmicTheme.colors.accent.purple} />
        </View>
      </CosmicGradient>
    );
  }

  if (!contact) {
    return (
      <CosmicGradient>
        <View style={styles.center}>
          <Text style={styles.errorText}>Contact not found</Text>
        </View>
      </CosmicGradient>
    );
  }

  const sign = getSunSign(contact.birthdate);
  const zodiac = getZodiacInfo(sign);
  const tagInfo = RELATIONSHIP_TAGS.find((t) => t.key === contact.relationship_tag);
  const chart = contact.natal_chart_data;

  return (
    <CosmicGradient>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarText}>{zodiac.symbol}</Text>
          </View>
          <GlowText size="h2">{contact.name}</GlowText>
          <Text style={styles.signText}>{zodiac.name} • {zodiac.element} sign</Text>
          {tagInfo && (
            <TagPill label={tagInfo.label} emoji={tagInfo.emoji} selected size="small" />
          )}
        </View>

        <CosmicCard style={styles.infoCard}>
          <InfoRow label="Birthday" value={formatBirthdate(contact.birthdate)} />
          {contact.birth_time && <InfoRow label="Birth Time" value={contact.birth_time} />}
          {contact.birth_location && <InfoRow label="Location" value={contact.birth_location} />}
          {contact.notes && <InfoRow label="Notes" value={contact.notes} />}
        </CosmicCard>

        {/* Sun sign interpretation card */}
        {chart?.sun?.interpretation && (
          <CosmicCard gradient style={styles.interpretationCard}>
            <Text style={styles.interpretationEmoji}>{zodiac.symbol}</Text>
            <Text style={styles.interpretationTitle}>
              {contact.name.split(' ')[0]}'s {zodiac.name} Sun
            </Text>
            <Text style={styles.interpretationRole}>{chart.sun.role}</Text>
            <Text style={styles.interpretationText}>{chart.sun.interpretation}</Text>
          </CosmicCard>
        )}

        {chart && (
          <CosmicCard style={styles.chartCard}>
            <Text style={styles.chartTitle}>Natal Placements</Text>
            <Text style={styles.chartSubtitle}>Tap any placement to read its meaning</Text>
            {['sun', 'moon', 'rising', 'mercury', 'venus', 'mars'].map((p) => {
              if (!chart[p]) return null;
              const info = ZODIAC_SIGNS[chart[p].sign] || ZODIAC_SIGNS.aries;
              const isExpanded = expandedPlanet === p;
              const hasInterpretation = !!chart[p].interpretation;
              return (
                <TouchableOpacity
                  key={p}
                  onPress={() => setExpandedPlanet(isExpanded ? null : p)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.planetRow, isExpanded && styles.planetRowExpanded]}>
                    <View style={styles.planetHeader}>
                      <View style={styles.planetLeft}>
                        <Text style={styles.planetName}>
                          {p.charAt(0).toUpperCase() + p.slice(1)}
                        </Text>
                        {chart[p].role ? (
                          <Text style={styles.planetRole}>{chart[p].role}</Text>
                        ) : null}
                      </View>
                      <View style={styles.planetRight}>
                        <Text style={styles.planetValue}>
                          {info.symbol} {info.name} {chart[p].degree}°
                        </Text>
                        {hasInterpretation && (
                          <Text style={styles.expandIcon}>{isExpanded ? '▲' : '▼'}</Text>
                        )}
                      </View>
                    </View>
                    {isExpanded && hasInterpretation && (
                      <Text style={styles.planetInterpretation}>
                        {chart[p].interpretation}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}

            {/* Element & Modality breakdown */}
            {chart.dominant_element && (
              <View style={styles.dominanceRow}>
                <View style={styles.dominancePill}>
                  <Text style={styles.dominanceLabel}>
                    {chart.dominant_element.charAt(0).toUpperCase() + chart.dominant_element.slice(1)} dominant
                  </Text>
                </View>
                {chart.dominant_modality && (
                  <View style={styles.dominancePill}>
                    <Text style={styles.dominanceLabel}>
                      {chart.dominant_modality.charAt(0).toUpperCase() + chart.dominant_modality.slice(1)} energy
                    </Text>
                  </View>
                )}
              </View>
            )}
          </CosmicCard>
        )}

        {/* Outer planets */}
        {chart && (
          <CosmicCard style={styles.chartCard}>
            <Text style={styles.chartTitle}>Outer Planets</Text>
            <Text style={styles.chartSubtitle}>Generational influences & deeper patterns</Text>
            {['jupiter', 'saturn', 'uranus', 'neptune', 'pluto'].map((p) => {
              if (!chart[p]) return null;
              const info = ZODIAC_SIGNS[chart[p].sign] || ZODIAC_SIGNS.aries;
              const isExpanded = expandedPlanet === p;
              const hasInterpretation = !!chart[p].interpretation;
              return (
                <TouchableOpacity
                  key={p}
                  onPress={() => setExpandedPlanet(isExpanded ? null : p)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.planetRow, isExpanded && styles.planetRowExpanded]}>
                    <View style={styles.planetHeader}>
                      <View style={styles.planetLeft}>
                        <Text style={styles.planetName}>
                          {p.charAt(0).toUpperCase() + p.slice(1)}
                        </Text>
                        {chart[p].role ? (
                          <Text style={styles.planetRole}>{chart[p].role}</Text>
                        ) : null}
                      </View>
                      <View style={styles.planetRight}>
                        <Text style={styles.planetValue}>
                          {info.symbol} {info.name} {chart[p].degree}°
                        </Text>
                        {hasInterpretation && (
                          <Text style={styles.expandIcon}>{isExpanded ? '▲' : '▼'}</Text>
                        )}
                      </View>
                    </View>
                    {isExpanded && hasInterpretation && (
                      <Text style={styles.planetInterpretation}>
                        {chart[p].interpretation}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </CosmicCard>
        )}

        <View style={styles.actions}>
          <CosmicButton
            title="Cosmic Mirror"
            onPress={() => router.push(`/compatibility/${contact.id}`)}
            size="large"
            style={{ marginBottom: 10 }}
          />
          <CosmicButton
            title="Read Your Story"
            onPress={() => router.push(`/story/${contact.id}`)}
            variant="outline"
            size="large"
            style={{ marginBottom: 10 }}
          />
          <CosmicButton
            title="Share Card"
            onPress={() => router.push(`/card/${contact.id}`)}
            variant="gold"
            size="medium"
          />
        </View>
      </ScrollView>
    </CosmicGradient>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
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
  errorText: {
    color: CosmicTheme.colors.text.secondary,
    fontSize: 16,
  },
  backButton: {
    marginBottom: 20,
  },
  backText: {
    color: CosmicTheme.colors.accent.purpleLight,
    fontSize: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    gap: 8,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: CosmicTheme.colors.background.elevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: CosmicTheme.colors.accent.purple,
  },
  avatarText: {
    fontSize: 36,
  },
  signText: {
    color: CosmicTheme.colors.text.secondary,
    fontSize: 14,
  },
  infoCard: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: CosmicTheme.colors.border.subtle,
  },
  infoLabel: {
    color: CosmicTheme.colors.text.tertiary,
    fontSize: 14,
  },
  infoValue: {
    color: CosmicTheme.colors.text.primary,
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  interpretationCard: {
    marginBottom: 16,
    alignItems: 'center',
    padding: 20,
  },
  interpretationEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  interpretationTitle: {
    color: CosmicTheme.colors.text.primary,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  interpretationRole: {
    color: CosmicTheme.colors.accent.gold,
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  interpretationText: {
    color: CosmicTheme.colors.text.secondary,
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
  chartCard: {
    marginBottom: 16,
  },
  chartTitle: {
    color: CosmicTheme.colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  chartSubtitle: {
    color: CosmicTheme.colors.text.tertiary,
    fontSize: 12,
    marginBottom: 12,
  },
  planetRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: CosmicTheme.colors.border.subtle,
  },
  planetRowExpanded: {
    backgroundColor: 'rgba(124, 58, 237, 0.05)',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginHorizontal: -8,
  },
  planetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planetLeft: {
    flex: 1,
  },
  planetRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  planetName: {
    color: CosmicTheme.colors.text.secondary,
    fontSize: 13,
    fontWeight: '600',
  },
  planetRole: {
    color: CosmicTheme.colors.text.tertiary,
    fontSize: 11,
    marginTop: 1,
  },
  planetValue: {
    color: CosmicTheme.colors.text.accent,
    fontSize: 13,
    fontWeight: '500',
  },
  expandIcon: {
    color: CosmicTheme.colors.text.tertiary,
    fontSize: 10,
  },
  planetInterpretation: {
    color: CosmicTheme.colors.text.secondary,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: CosmicTheme.colors.border.subtle,
    fontStyle: 'italic',
  },
  dominanceRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
    paddingTop: 10,
  },
  dominancePill: {
    backgroundColor: 'rgba(124, 58, 237, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  dominanceLabel: {
    color: CosmicTheme.colors.accent.purpleLight,
    fontSize: 12,
    fontWeight: '500',
  },
  actions: {
    gap: 4,
    marginTop: 8,
  },
});
