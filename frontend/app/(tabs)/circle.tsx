import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { CosmicGradient } from '@/components/ui/CosmicGradient';
import { GlowText } from '@/components/ui/GlowText';
import { CosmicCard } from '@/components/ui/CosmicCard';
import { TagPill } from '@/components/ui/TagPill';
import { CosmicTheme } from '@/constants/theme';
import { RELATIONSHIP_TAGS } from '@/constants/zodiac';
import { api } from '@/services/api';
import { getSunSign, getZodiacInfo } from '@/utils/zodiac';

interface ContactItem {
  id: string;
  name: string;
  birthdate: string;
  relationship_tag: string;
  soulmate_score?: number;
  notes?: string;
}

export default function CircleScreen() {
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [filter, setFilter] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadContacts = useCallback(async () => {
    try {
      const path = filter ? `/contacts?tag=${filter}` : '/contacts';
      const data = await api.get<ContactItem[]>(path);
      setContacts(data);
    } catch {
      // silently fail
    }
  }, [filter]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadContacts();
    setRefreshing(false);
  };

  return (
    <CosmicGradient>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={CosmicTheme.colors.accent.purple} />}
      >
        <View style={styles.header}>
          <GlowText size="h2" center={false}>Your Circle</GlowText>
          <Text style={styles.count}>{contacts.length} connections</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
          <TagPill
            label="All"
            selected={filter === null}
            onPress={() => setFilter(null)}
          />
          {RELATIONSHIP_TAGS.map((tag) => (
            <TagPill
              key={tag.key}
              label={tag.label}
              emoji={tag.emoji}
              selected={filter === tag.key}
              onPress={() => setFilter(filter === tag.key ? null : tag.key)}
              size="medium"
            />
          ))}
        </ScrollView>

        {contacts.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🌌</Text>
            <Text style={styles.emptyTitle}>Your circle is empty</Text>
            <Text style={styles.emptyText}>
              Add your first contact to start exploring cosmic connections
            </Text>
          </View>
        ) : (
          <View style={styles.list}>
            {contacts.map((contact) => {
              const sign = getSunSign(contact.birthdate);
              const zodiac = getZodiacInfo(sign);
              const tagInfo = RELATIONSHIP_TAGS.find((t) => t.key === contact.relationship_tag);
              return (
                <TouchableOpacity
                  key={contact.id}
                  onPress={() => router.push(`/contact/${contact.id}`)}
                  activeOpacity={0.7}
                >
                  <CosmicCard style={styles.contactCard}>
                    <View style={styles.contactRow}>
                      <View style={[styles.avatar, { borderColor: getElementBorderColor(zodiac.element) }]}>
                        <Text style={styles.avatarSymbol}>{zodiac.symbol}</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.contactName}>{contact.name}</Text>
                        <View style={styles.contactMeta}>
                          <Text style={styles.contactSign}>{zodiac.name}</Text>
                          {tagInfo && (
                            <Text style={styles.contactTag}>
                              {tagInfo.emoji} {tagInfo.label}
                            </Text>
                          )}
                        </View>
                      </View>
                      {contact.soulmate_score != null && (
                        <View style={styles.miniScore}>
                          <Text style={styles.miniScoreText}>{contact.soulmate_score}</Text>
                        </View>
                      )}
                    </View>
                  </CosmicCard>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/contact/add')}
        activeOpacity={0.8}
      >
        <Text style={{ fontSize: 24, color: '#fff', fontWeight: '700' }}>+</Text>
      </TouchableOpacity>
    </CosmicGradient>
  );
}

function getElementBorderColor(element: string): string {
  const colors: Record<string, string> = {
    fire: '#F43F5E',
    earth: '#10B981',
    air: '#22D3EE',
    water: '#6366F1',
  };
  return colors[element] || '#7C3AED';
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 60,
    paddingBottom: 100,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  count: {
    color: CosmicTheme.colors.text.tertiary,
    fontSize: 14,
  },
  filters: {
    marginBottom: 20,
    flexDirection: 'row',
    gap: 8,
  },
  list: {
    gap: 10,
  },
  contactCard: {
    padding: 14,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: CosmicTheme.colors.background.elevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  avatarSymbol: {
    fontSize: 22,
  },
  contactName: {
    color: CosmicTheme.colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  contactMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 3,
  },
  contactSign: {
    color: CosmicTheme.colors.text.secondary,
    fontSize: 13,
  },
  contactTag: {
    color: CosmicTheme.colors.text.tertiary,
    fontSize: 12,
  },
  miniScore: {
    backgroundColor: 'rgba(245, 197, 66, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: CosmicTheme.borderRadius.full,
  },
  miniScoreText: {
    color: CosmicTheme.colors.accent.gold,
    fontSize: 15,
    fontWeight: '700',
  },
  empty: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    color: CosmicTheme.colors.text.primary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyText: {
    color: CosmicTheme.colors.text.secondary,
    fontSize: 14,
    textAlign: 'center',
    maxWidth: 260,
  },
  fab: {
    position: 'absolute',
    bottom: 85,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: CosmicTheme.colors.accent.purple,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: CosmicTheme.colors.accent.purple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
});
