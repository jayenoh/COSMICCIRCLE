import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { CosmicGradient } from '@/components/ui/CosmicGradient';
import { GlowText } from '@/components/ui/GlowText';
import { CosmicCard } from '@/components/ui/CosmicCard';
import { CosmicButton } from '@/components/ui/CosmicButton';
import { CosmicTheme } from '@/constants/theme';
import { useAuth } from '@/store/AuthContext';
import { getSunSign, getZodiacInfo } from '@/utils/zodiac';
import { formatBirthdate } from '@/utils/formatting';
import { ZODIAC_SIGNS } from '@/constants/zodiac';

const DEPTH_LABELS: Record<string, string> = {
  sun_only: '☀️ Sun Signs Only',
  sun_moon_rising: '🌙 Sun + Moon + Rising',
  full_chart: '🌌 Full Chart',
};

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [expandedPlanet, setExpandedPlanet] = useState<string | null>(null);

  const sunSign = user?.birthdate ? getSunSign(user.birthdate) : 'aries';
  const zodiac = getZodiacInfo(sunSign);
  const chart = user?.natal_chart_data;

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  const personalPlanets = chart
    ? ['sun', 'moon', 'rising', 'mercury', 'venus', 'mars']
        .filter((p) => chart[p])
    : [];

  const outerPlanets = chart
    ? ['jupiter', 'saturn', 'uranus', 'neptune', 'pluto']
        .filter((p) => chart[p])
    : [];

  return (
    <CosmicGradient>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarText}>{zodiac.symbol}</Text>
          </View>
          <GlowText size="h2">{user?.name || 'Explorer'}</GlowText>
          <Text style={styles.email}>{user?.email}</Text>
          <Text style={styles.birthdate}>
            {user?.birthdate ? formatBirthdate(user.birthdate) : ''}
          </Text>
        </View>

        <CosmicCard gradient style={styles.depthCard}>
          <Text style={styles.depthLabel}>Destiny Dial</Text>
          <Text style={styles.depthValue}>
            {DEPTH_LABELS[user?.depth_preference || 'sun_only']}
          </Text>
        </CosmicCard>

        {/* Sun sign interpretation */}
        {chart?.sun?.interpretation && (
          <CosmicCard gradient style={styles.sunCard}>
            <Text style={styles.sunEmoji}>{zodiac.symbol}</Text>
            <Text style={styles.sunTitle}>Your {zodiac.name} Sun</Text>
            <Text style={styles.sunRole}>{chart.sun.role}</Text>
            <Text style={styles.sunText}>{chart.sun.interpretation}</Text>
          </CosmicCard>
        )}

        {personalPlanets.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Planets</Text>
            <Text style={styles.sectionSubtitle}>Tap to read your cosmic blueprint</Text>
            <CosmicCard style={styles.chartCard}>
              {personalPlanets.map((p) => {
                const planetData = chart![p];
                const signInfo = ZODIAC_SIGNS[planetData.sign] || ZODIAC_SIGNS.aries;
                const isExpanded = expandedPlanet === p;
                const hasInterpretation = !!planetData.interpretation;
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
                          {planetData.role ? (
                            <Text style={styles.planetRole}>{planetData.role}</Text>
                          ) : null}
                        </View>
                        <View style={styles.planetRight}>
                          <Text style={styles.planetValue}>
                            {signInfo.symbol} {signInfo.name} {planetData.degree}°
                          </Text>
                          {hasInterpretation && (
                            <Text style={styles.expandIcon}>{isExpanded ? '▲' : '▼'}</Text>
                          )}
                        </View>
                      </View>
                      {isExpanded && hasInterpretation && (
                        <Text style={styles.planetInterpretation}>
                          {planetData.interpretation}
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}

              {/* Element & Modality */}
              {chart?.dominant_element && (
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
          </View>
        )}

        {outerPlanets.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Outer Planets</Text>
            <Text style={styles.sectionSubtitle}>Generational influences & deeper patterns</Text>
            <CosmicCard style={styles.chartCard}>
              {outerPlanets.map((p) => {
                const planetData = chart![p];
                const signInfo = ZODIAC_SIGNS[planetData.sign] || ZODIAC_SIGNS.aries;
                const isExpanded = expandedPlanet === p;
                const hasInterpretation = !!planetData.interpretation;
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
                          {planetData.role ? (
                            <Text style={styles.planetRole}>{planetData.role}</Text>
                          ) : null}
                        </View>
                        <View style={styles.planetRight}>
                          <Text style={styles.planetValue}>
                            {signInfo.symbol} {signInfo.name} {planetData.degree}°
                          </Text>
                          {hasInterpretation && (
                            <Text style={styles.expandIcon}>{isExpanded ? '▲' : '▼'}</Text>
                          )}
                        </View>
                      </View>
                      {isExpanded && hasInterpretation && (
                        <Text style={styles.planetInterpretation}>
                          {planetData.interpretation}
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </CosmicCard>
          </View>
        )}

        <View style={styles.actions}>
          <CosmicButton
            title="Edit Profile"
            onPress={() => router.push('/profile/edit')}
            variant="outline"
            size="medium"
          />
          <CosmicButton
            title="Log Out"
            onPress={handleLogout}
            variant="danger"
            size="medium"
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
    paddingBottom: 100,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
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
    marginBottom: 14,
  },
  avatarText: {
    fontSize: 36,
  },
  email: {
    color: CosmicTheme.colors.text.secondary,
    fontSize: 14,
    marginTop: 4,
  },
  birthdate: {
    color: CosmicTheme.colors.text.tertiary,
    fontSize: 13,
    marginTop: 2,
  },
  depthCard: {
    width: '100%',
    maxWidth: 400,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  depthLabel: {
    color: CosmicTheme.colors.text.secondary,
    fontSize: 14,
  },
  depthValue: {
    color: CosmicTheme.colors.text.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  sunCard: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    padding: 20,
    marginBottom: 16,
  },
  sunEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  sunTitle: {
    color: CosmicTheme.colors.text.primary,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  sunRole: {
    color: CosmicTheme.colors.accent.gold,
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sunText: {
    color: CosmicTheme.colors.text.secondary,
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
  section: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 16,
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
  chartCard: {
    padding: 12,
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
    color: CosmicTheme.colors.text.primary,
    fontSize: 14,
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
    gap: 12,
    width: '100%',
    maxWidth: 400,
  },
});
