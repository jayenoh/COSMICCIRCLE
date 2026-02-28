import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { CosmicGradient } from '@/components/ui/CosmicGradient';
import { GlowText } from '@/components/ui/GlowText';
import { CosmicInput } from '@/components/ui/CosmicInput';
import { CosmicButton } from '@/components/ui/CosmicButton';
import { StarField } from '@/components/ui/StarField';
import { CosmicTheme } from '@/constants/theme';
import { useAuth } from '@/store/AuthContext';

export default function SignupScreen() {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthLocation, setBirthLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async () => {
    if (!name || !email || !password || !birthdate) {
      setError('Please fill in all required fields');
      return;
    }
    // Basic date validation
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(birthdate)) {
      setError('Birthdate must be in YYYY-MM-DD format');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await signup({
        name,
        email,
        password,
        birthdate,
        birth_time: birthTime || undefined,
        birth_location: birthLocation || undefined,
      });
      router.replace('/(auth)/onboarding');
    } catch (e: any) {
      setError(e.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CosmicGradient>
      <StarField />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>

          <GlowText size="h1" style={{ marginBottom: 8 }}>Join the Circle</GlowText>
          <Text style={styles.subtitle}>Enter your cosmic coordinates</Text>

          <View style={styles.form}>
            <CosmicInput
              label="Name *"
              placeholder="Your name"
              value={name}
              onChangeText={setName}
            />
            <CosmicInput
              label="Email *"
              placeholder="your@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <CosmicInput
              label="Password *"
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
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

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <CosmicButton
              title="Create Account"
              onPress={handleSignup}
              loading={loading}
              size="large"
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
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  backButton: {
    marginBottom: 20,
  },
  backText: {
    color: CosmicTheme.colors.accent.purpleLight,
    fontSize: 16,
  },
  subtitle: {
    color: CosmicTheme.colors.text.secondary,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  error: {
    color: CosmicTheme.colors.status.error,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
});
