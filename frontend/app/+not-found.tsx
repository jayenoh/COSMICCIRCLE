import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import { CosmicGradient } from '@/components/ui/CosmicGradient';
import { CosmicTheme } from '@/constants/theme';

export default function NotFoundScreen() {
  return (
    <CosmicGradient>
      <Stack.Screen options={{ title: 'Lost in Space' }} />
      <View style={styles.container}>
        <Text style={styles.emoji}>🌌</Text>
        <Text style={styles.title}>Lost in the cosmos</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Return to your circle</Text>
        </Link>
      </View>
    </CosmicGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: CosmicTheme.colors.text.primary,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: CosmicTheme.colors.accent.purpleLight,
  },
});
