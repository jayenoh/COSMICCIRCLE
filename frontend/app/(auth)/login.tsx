import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { router } from 'expo-router';
import { CosmicGradient } from '@/components/ui/CosmicGradient';
import { GlowText } from '@/components/ui/GlowText';
import { CosmicButton } from '@/components/ui/CosmicButton';
import { CosmicTheme } from '@/constants/theme';
import { useAuth } from '@/store/AuthContext';
import { TextInput } from 'react-native';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      router.replace('/(tabs)');
    } catch (e: any) {
      setError(e.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CosmicGradient>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.logo}>✨</Text>
          <GlowText size="h1">CosmicCircle</GlowText>
          <Text style={styles.subtitle}>Map your relationships against the stars</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="your@email.com"
            placeholderTextColor={CosmicTheme.colors.text.tertiary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoFocus={false}
            showSoftInputOnFocus={true}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor={CosmicTheme.colors.text.tertiary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoFocus={false}
            showSoftInputOnFocus={true}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <CosmicButton
            title="Sign In"
            onPress={handleLogin}
            loading={loading}
            size="large"
            style={{ marginTop: 8 }}
          />

          <CosmicButton
            title="Create Account"
            onPress={() => router.push('/(auth)/signup')}
            variant="outline"
            size="large"
            style={{ marginTop: 12 }}
          />
        </View>

        <Text style={styles.demoHint}>
          Demo: cosmic@test.com / cosmic123
        </Text>
      </View>
    </CosmicGradient>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: 120,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 56,
    marginBottom: 12,
  },
  subtitle: {
    color: CosmicTheme.colors.text.secondary,
    fontSize: 16,
    marginTop: 8,
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
    marginBottom: 16,
  },
  error: {
    color: CosmicTheme.colors.status.error,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
  demoHint: {
    color: CosmicTheme.colors.text.tertiary,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 24,
  },
});
