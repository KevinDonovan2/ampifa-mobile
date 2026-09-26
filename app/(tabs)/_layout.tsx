
import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HapticTab } from '@/components/haptic-tab';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        // Couleurs fixes
        tabBarActiveTintColor: '#6F4E37',
        tabBarInactiveTintColor: '#A67B5B',

        // Barre de navigation adaptative
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5D8CD',

          // Hauteur adaptative selon le téléphone
          height: 60 + insets.bottom,

          // Espace réservé à la barre système
          paddingBottom: insets.bottom + 6,
          paddingTop: 6,
        },

        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: 'Recherche',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'search' : 'search-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="playlists"
        options={{
          title: 'Playlists',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={
                focused
                  ? 'musical-notes'
                  : 'musical-notes-outline'
              }
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}