import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { CosmicGradient } from '@/components/ui/CosmicGradient';
import { GlowText } from '@/components/ui/GlowText';
import { CosmicInput } from '@/components/ui/CosmicInput';
import { CosmicButton } from '@/components/ui/CosmicButton';
import { TagPill } from '@/components/ui/TagPill';
import { CosmicTheme } from '@/constants/theme';
import { RELATIONSHIP_TAGS } from '@/constants/zodiac';
import { api } from '@/services/api';

export default function AddContactScreen() {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthLocation, setBirthLocation] = useState('');
  const [tag, setTag] = useState('friend');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAdd = async () => {
    if (!name || !birthdate) {
      setError('Name and birthdate are required');
      return;
    }
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(birthdate)) {
      setError('Birthdate must be in YYYY-MM-DD format');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await api.post('/contacts', {
        name,
        birthdate,
        birth_time: birthTime || undefined,
        birth_location: birthLocation || undefined,
        relationship_tag: tag,
        notes: notes || undefined,
      });
      router.back();
    } catch (e: any) {
      setError(e.message || 'Failed to add contact');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CosmicGradient>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>

          <GlowText size="h2" style={{ marginBottom: 24 }}>Add to Your Circle</GlowText>

          <View style={styles.form}>
            <CosmicInput
              label="Name *"
              placeholder="Their name"
              value={name}
              onChangeText={setName}
            />
            <CosmicInput
              label="Birthdate *"
              placeholder="YYYY-MM-DD"
              value={birthdate}
              onChangeText={setBirthdate}
            />
            <CosmicInput
              label="Birth Time (optional)"
              placeholder="HH:MM (24h format)"
              value={birthTime}
              onChangeText={setBirthTime}
            />
            <CosmicInput
              label="Birth Location (optional)"
              placeholder="City, State/Country"
              value={birthLocation}
              onChangeText={setBirthLocation}
            />

            <Text style={styles.tagLabel}>Relationship</Text>
            <View style={styles.tags}>
              {RELATIONSHIP_TAGS.map((t) => (
                <TagPill
                  key={t.key}
                  label={t.label}
                  emoji={t.emoji}
                  selected={tag === t.key}
                  onPress={() => setTag(t.key)}
                />
              ))}
            </View>

            <CosmicInput
              label="Notes (optional)"
              placeholder="Anything about this person..."
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={3}
              style={{ minHeight: 80, textAlignVertical: 'top' }}
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <CosmicButton
              title="Add to Circle"
              onPress={handleAdd}
              loading={loading}
              size="large"
              variant="gold"
              style={{ marginTop: 8 }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </CosmicGradient>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  backButton: {
    marginBottom: 20,
  },
  backText: {
    color: CosmicTheme.colors.accent.purpleLight,
    fontSize: 16,
  },
  form: {
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  tagLabel: {
    color: CosmicTheme.colors.text.secondary,
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  error: {
    color: CosmicTheme.colors.status.error,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
});
