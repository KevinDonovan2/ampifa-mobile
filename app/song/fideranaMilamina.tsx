import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { songs } from '@/data/songs';

export default function FideranaMilaminaScreen() {
  // Récupérer uniquement les chants de la catégorie Hira Milamina
  const filteredSongs = songs.filter(
    (song) => song.category === 'Hira Milamina'
  );

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={COLORS.primary}
            />
          </Pressable>

          <View style={styles.headerText}>
            <Text style={styles.title}>Fiderana Milamina</Text>

            <Text style={styles.subtitle}>
              Hira fiderana milamina sy mampitony
            </Text>
          </View>
        </View>

        {/* INFORMATIONS */}
        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Text style={styles.emoji}>🕊️</Text>
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>
              Hira Milamina
            </Text>

            <Text style={styles.infoText}>
              {filteredSongs.length}{' '}
              {filteredSongs.length > 1
                ? 'chants disponibles'
                : 'chant disponible'}
            </Text>
          </View>
        </View>

        {/* LISTE DES CHANTS */}
        <View style={styles.section}>
          {filteredSongs.length > 0 ? (
            filteredSongs.map((song) => (
              <Pressable
                key={song.id}
                style={({ pressed }) => [
                  styles.songCard,
                  pressed && styles.pressed,
                ]}
                onPress={() =>
                  router.push(`/song/${song.id}` as any)
                }
              >
                {/* ICÔNE */}
                <View style={styles.songIcon}>
                  <Ionicons
                    name="musical-notes"
                    size={22}
                    color={COLORS.primary}
                  />
                </View>

                {/* INFORMATIONS DU CHANT */}
                <View style={styles.songInfo}>
                  <Text
                    style={styles.songTitle}
                    numberOfLines={2}
                  >
                    {song.title}
                  </Text>

                  {song.artist ? (
                    <Text
                      style={styles.songArtist}
                      numberOfLines={1}
                    >
                      {song.artist}
                    </Text>
                  ) : null}
                </View>

                {/* FLÈCHE */}
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={COLORS.secondary}
                />
              </Pressable>
            ))
          ) : (
            <View style={styles.emptyCard}>
              <Ionicons
                name="musical-notes-outline"
                size={30}
                color={COLORS.secondary}
              />

              <Text style={styles.emptyTitle}>
                Aucun chant disponible
              </Text>

              <Text style={styles.emptyText}>
                Aucun chant de la catégorie Hira Milamina
                n`est disponible pour le moment.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const COLORS = {
  background: '#FBF8F5',
  primary: '#5A3825',
  accent: '#C87932',
  accentSoft: '#F5E1CE',
  card: '#F3ECE6',
  white: '#FFFFFF',
  text: '#3D2A1E',
  secondary: '#806F63',
  border: '#E5D8CD',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    paddingTop: 58,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 14,
  },

  backButton: {
    width: 46,
    height: 46,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  headerText: {
    flex: 1,
  },

  title: {
    fontSize: 25,
    fontWeight: '800',
    color: COLORS.primary,
  },

  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: COLORS.secondary,
    lineHeight: 19,
  },

  /* INFO CARD */
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 24,
    borderRadius: 20,
    backgroundColor: COLORS.accentSoft,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 14,
  },

  infoIcon: {
    width: 52,
    height: 52,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },

  emoji: {
    fontSize: 25,
  },

  infoContent: {
    flex: 1,
  },

  infoTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.text,
  },

  infoText: {
    marginTop: 4,
    fontSize: 12,
    color: COLORS.secondary,
  },

  /* SECTION */
  section: {
    marginBottom: 20,
  },

  /* SONG CARD */
  songCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginBottom: 10,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 12,
  },

  songIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: COLORS.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  songInfo: {
    flex: 1,
  },

  songTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },

  songArtist: {
    marginTop: 5,
    fontSize: 12,
    color: COLORS.secondary,
  },

  /* EMPTY */
  emptyCard: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 24,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  emptyTitle: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
  },

  emptyText: {
    marginTop: 6,
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.secondary,
  },

  /* PRESSED */
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
});