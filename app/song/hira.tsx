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

const categories = [
  {
    title: 'Hira Milamina',
    subtitle: 'Hira fiderana milamina sy mampitony',
    icon: '🕊️',
  },
  {
    title: 'Hira Mihetsika',
    subtitle: 'Hira fiderana mihetsika sy feno hafaliana',
    icon: '🙌',
  },
];

export default function HiraScreen() {
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
            <Text style={styles.title}>Hira</Text>

            <Text style={styles.subtitle}>
              Hira Milamina sy Hira Mihetsika
            </Text>
          </View>
        </View>

        {/* SOUS-CATÉGORIES */}
        {categories.map((category) => {
          const filteredSongs = songs.filter(
            (song) => song.category === category.title
          );

          return (
            <View
              key={category.title}
              style={styles.section}
            >
              {/* HEADER CATÉGORIE */}
              <View style={styles.categoryHeader}>
                <View style={styles.categoryIcon}>
                  <Text style={styles.categoryEmoji}>
                    {category.icon}
                  </Text>
                </View>

                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryTitle}>
                    {category.title}
                  </Text>

                  <Text style={styles.categorySubtitle}>
                    {category.subtitle}
                  </Text>
                </View>

                <View style={styles.countBadge}>
                  <Text style={styles.countText}>
                    {filteredSongs.length}
                  </Text>
                </View>
              </View>

              {/* LISTE DES CHANTS */}
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

                    {/* INFORMATIONS */}
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
                /* AUCUN CHANT */
                <View style={styles.emptyCard}>
                  <Ionicons
                    name="musical-notes-outline"
                    size={26}
                    color={COLORS.secondary}
                  />

                  <Text style={styles.emptyText}>
                    Aucun chant dans cette catégorie pour le moment.
                  </Text>
                </View>
              )}
            </View>
          );
        })}
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
    marginBottom: 30,
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
    fontSize: 27,
    fontWeight: '800',
    color: COLORS.primary,
  },

  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: COLORS.secondary,
  },

  /* SECTION */
  section: {
    marginBottom: 30,
  },

  /* HEADER CATÉGORIE */
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 12,
  },

  categoryIcon: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: COLORS.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  categoryEmoji: {
    fontSize: 25,
  },

  categoryInfo: {
    flex: 1,
  },

  categoryTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: COLORS.text,
  },

  categorySubtitle: {
    fontSize: 12,
    color: COLORS.secondary,
    marginTop: 4,
  },

  /* COMPTEUR */
  countBadge: {
    minWidth: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },

  countText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },

  /* CHANSON */
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
    padding: 22,
    borderRadius: 18,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 10,
  },

  emptyText: {
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