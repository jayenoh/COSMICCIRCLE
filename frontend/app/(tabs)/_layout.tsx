import React from 'react';
import { Text } from 'react-native';
import { Tabs } from 'expo-router';
import { CosmicTheme } from '@/constants/theme';

function TabIcon({ emoji, size }: { emoji: string; size: number }) {
  return <Text style={{ fontSize: size - 4 }}>{emoji}</Text>;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: CosmicTheme.colors.accent.purpleLight,
        tabBarInactiveTintColor: CosmicTheme.colors.text.tertiary,
        tabBarStyle: {
          backgroundColor: CosmicTheme.colors.background.secondary,
          borderTopColor: CosmicTheme.colors.border.subtle,
          borderTopWidth: 1,
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size }) => <TabIcon emoji="✨" size={size} />,
        }}
      />
      <Tabs.Screen
        name="circle"
        options={{
          title: 'Circle',
          tabBarIcon: ({ size }) => <TabIcon emoji="👥" size={size} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ size }) => <TabIcon emoji="🧭" size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size }) => <TabIcon emoji="👤" size={size} />,
        }}
      />
    </Tabs>
  );
}
