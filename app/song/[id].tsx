import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  StatusBar,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { songs } from '@/data/songs';

export default function SongScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const song = songs.find((item) => item.id === id);

  if (!song) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Chanson introuvable</Text>

        <Pressable
          style={styles.backHomeButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backHomeText}>Retour</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.primary}
      />

      {/* HEADER */}
      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [
            styles.iconButton,
            pressed && styles.pressed,
          ]}
          onPress={() => router.back()}
        >
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>

        <View style={styles.headerInfo}>
          <Text
            style={styles.title}
            numberOfLines={1}
          >
            {song.title}
          </Text>

          <Text
            style={styles.artist}
            numberOfLines={1}
          >
            {song.artist}
          </Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.iconButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.favorite}>♡</Text>
        </Pressable>
      </View>

      {/* CONTENT */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.lyricsContainer}
      >
        {/* Petit indicateur */}
        <View style={styles.lyricsHeader}>
          <View style={styles.line} />
          <Text style={styles.lyricsLabel}>PAROLES</Text>
          <View style={styles.line} />
        </View>

        {/* Paroles */}
        <View style={styles.lyricsCard}>
          <Text style={styles.lyrics}>
            {song.lyrics}
          </Text>
        </View>

        <Text style={styles.footerText}>
          Chantez avec votre chorale 🎶
        </Text>
      </ScrollView>
    </View>
  );
}

const COLORS = {
  primary: '#5A3825',
  primaryDark: '#43291B',
  primaryLight: '#8B6247',

  background: '#F8F4F0',
  card: '#FFFDFC',

  text: '#2E2119',
  secondaryText: '#8A7668',

  border: '#E8DED5',
  accent: '#C49A6C',

  white: '#FFFFFF',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  /* =========================
     HEADER
  ========================= */

  header: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingTop: 52,
    paddingHorizontal: 16,
    paddingBottom: 18,

    backgroundColor: COLORS.primary,

    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },

  iconButton: {
    width: 44,
    height: 44,

    borderRadius: 22,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'rgba(255,255,255,0.12)',
  },

  pressed: {
    opacity: 0.6,
    transform: [{ scale: 0.95 }],
  },

  backIcon: {
    color: COLORS.white,
    fontSize: 38,
    fontWeight: '300',

    marginTop: -4,
  },

  headerInfo: {
    flex: 1,
    marginHorizontal: 14,
  },

  title: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '700',
  },

  artist: {
    marginTop: 4,

    color: '#DCCFC5',
    fontSize: 14,
    fontWeight: '500',
  },

  favorite: {
    color: COLORS.white,
    fontSize: 29,

    marginTop: -2,
  },

  /* =========================
     LYRICS
  ========================= */

  lyricsContainer: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 50,
  },

  lyricsHeader: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 20,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },

  lyricsLabel: {
    marginHorizontal: 12,

    color: COLORS.primaryLight,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
  },

  lyricsCard: {
    backgroundColor: COLORS.card,

    borderRadius: 20,

    paddingHorizontal: 22,
    paddingVertical: 24,

    borderWidth: 1,
    borderColor: COLORS.border,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  lyrics: {
    color: COLORS.text,

    fontSize: 18,
    lineHeight: 32,

    fontWeight: '400',
  },

  footerText: {
    textAlign: 'center',

    marginTop: 28,

    color: COLORS.secondaryText,
    fontSize: 13,
    fontStyle: 'italic',
  },

  /* =========================
     ERROR
  ========================= */

  center: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: COLORS.background,
  },

  errorText: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: '600',

    marginBottom: 20,
  },

  backHomeButton: {
    backgroundColor: COLORS.primary,

    paddingHorizontal: 24,
    paddingVertical: 12,

    borderRadius: 12,
  },

  backHomeText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
});