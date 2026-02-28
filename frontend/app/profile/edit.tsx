import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TextInput } from 'react-native';
import { router } from 'expo-router';
import { CosmicGradient } from '@/components/ui/CosmicGradient';
import { GlowText } from '@/components/ui/GlowText';
import { CosmicButton } from '@/components/ui/CosmicButton';
import { CosmicTheme } from '@/constants/theme';
import { useAuth } from '@/store/AuthContext';
import { api } from '@/services/api';
import { TouchableOpacity } from 'react-native';

export default function EditProfileScreen() {
  const { user, refreshUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [birthTime, setBirthTime] = useState(user?.birth_time || '');
  const [birthLocation, setBirthLocation] = useState(user?.birth_location || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put('/users/me', {
        name: name || undefined,
        birth_time: birthTime || undefined,
        birth_location: birthLocation || undefined,
      });
      await refreshUser();
      router.back();
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <CosmicGradient>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <GlowText size="h2" style={{ marginBottom: 24 }}>Edit Profile</GlowText>

        <View style={styles.form}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholderTextColor={CosmicTheme.colors.text.tertiary}
            placeholder="Your name"
          />

          <Text style={styles.label}>Birth Time</Text>
          <TextInput
            style={styles.input}
            value={birthTime}
            onChangeText={setBirthTime}
            placeholderTextColor={CosmicTheme.colors.text.tertiary}
            placeholder="e.g. 10:30"
          />
          <Text style={styles.hint}>
            Adding birth time improves Moon & Rising accuracy
          </Text>

          <Text style={styles.label}>Birth Location</Text>
          <TextInput
            style={styles.input}
            value={birthLocation}
            onChangeText={setBirthLocation}
            placeholderTextColor={CosmicTheme.colors.text.tertiary}
            placeholder="e.g. New York, NY"
          />
          <Text style={styles.hint}>
            Birth location refines house placements
          </Text>

          <Text style={styles.readOnly}>
            Birthdate: {user?.birthdate || 'Not set'} (cannot be changed)
          </Text>

          <CosmicButton
            title="Save Changes"
            onPress={handleSave}
            loading={saving}
            size="large"
            style={{ marginTop: 24 }}
          />

          <CosmicButton
            title="Cancel"
            onPress={() => router.back()}
            variant="outline"
            size="medium"
            style={{ marginTop: 12 }}
          />
        </View>
      </ScrollView>
    </CosmicGradient>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 60,
    paddingHorizontal: 24,
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
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  label: {
    color: CosmicTheme.colors.text.secondary,
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    color: CosmicTheme.colors.text.primary,
    fontSize: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: CosmicTheme.colors.background.elevated,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: CosmicTheme.colors.border.subtle,
    marginBottom: 6,
  },
  hint: {
    color: CosmicTheme.colors.text.tertiary,
    fontSize: 12,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  readOnly: {
    color: CosmicTheme.colors.text.tertiary,
    fontSize: 13,
    marginTop: 8,
    textAlign: 'center',
  },
});
