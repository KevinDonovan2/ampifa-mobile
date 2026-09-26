import React, { useState } from 'react';
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

  // =========================
  // TAILLE DE POLICE
  // =========================
  const [fontSize, setFontSize] = useState(18);
  const [showFontSize, setShowFontSize] = useState(false);

  const MIN_FONT_SIZE = 14;
  const MAX_FONT_SIZE = 28;
  const FONT_STEP = 2;

  const decreaseFontSize = () => {
    setFontSize((current) =>
      Math.max(MIN_FONT_SIZE, current - FONT_STEP),
    );
  };

  const increaseFontSize = () => {
    setFontSize((current) =>
      Math.min(MAX_FONT_SIZE, current + FONT_STEP),
    );
  };

  if (!song) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          Chanson introuvable
        </Text>

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

          <Text style={styles.lyricsLabel}>
            PAROLES
          </Text>

          <View style={styles.line} />
        </View>

        {/* Paroles */}
        <View style={styles.lyricsCard}>
          <Text
            style={[
              styles.lyrics,
              {
                fontSize,
                lineHeight: Math.round(fontSize * 1.75),
              },
            ]}
          >
            {song.lyrics}
          </Text>
        </View>

        <Text style={styles.footerText}>
          Chantez avec votre chorale 🎶
        </Text>
      </ScrollView>

      {/* =========================
          CONTROLE FLOTTANT
      ========================= */}

      {showFontSize && (
        <View style={styles.fontPopup}>
          <Text style={styles.fontPopupTitle}>
            Taille du texte
          </Text>

          <View style={styles.fontControls}>
            {/* A- */}
            <Pressable
              style={({ pressed }) => [
                styles.fontButton,
                fontSize <= MIN_FONT_SIZE &&
                  styles.fontButtonDisabled,
                pressed && styles.pressed,
              ]}
              onPress={decreaseFontSize}
              disabled={fontSize <= MIN_FONT_SIZE}
            >
              <Text
                style={[
                  styles.fontButtonTextSmall,
                  fontSize <= MIN_FONT_SIZE &&
                    styles.fontButtonTextDisabled,
                ]}
              >
                A−
              </Text>
            </Pressable>

            {/* Taille actuelle */}
            <View style={styles.fontSizeValue}>
              <Text style={styles.fontSizeValueText}>
                {fontSize}
              </Text>
            </View>

            {/* A+ */}
            <Pressable
              style={({ pressed }) => [
                styles.fontButton,
                fontSize >= MAX_FONT_SIZE &&
                  styles.fontButtonDisabled,
                pressed && styles.pressed,
              ]}
              onPress={increaseFontSize}
              disabled={fontSize >= MAX_FONT_SIZE}
            >
              <Text
                style={[
                  styles.fontButtonTextLarge,
                  fontSize >= MAX_FONT_SIZE &&
                    styles.fontButtonTextDisabled,
                ]}
              >
                A+
              </Text>
            </Pressable>
          </View>
        </View>
      )}

      {/* BOUTON FLOTTANT */}
      <Pressable
        style={({ pressed }) => [
          styles.fontFloatingButton,
          showFontSize && styles.fontFloatingButtonActive,
          pressed && styles.pressed,
        ]}
        onPress={() =>
          setShowFontSize((current) => !current)
        }
      >
        <Text style={styles.fontFloatingText}>
          Aa
        </Text>
      </Pressable>
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

    marginTop: -7,
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
    paddingBottom: 100,
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
     POPUP FLOTTANT
  ========================= */

  fontPopup: {
    position: 'absolute',

    right: 53,
    bottom: 112,

    width: 190,

    backgroundColor: COLORS.card,

    borderRadius: 18,

    paddingHorizontal: 16,
    paddingVertical: 14,

    borderWidth: 1,
    borderColor: COLORS.border,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },

  fontPopupTitle: {
    textAlign: 'center',

    color: COLORS.text,
    fontSize: 13,
    fontWeight: '600',

    marginBottom: 12,
  },

  fontControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    gap: 8,
  },

  fontButton: {
    width: 42,
    height: 38,

    borderRadius: 10,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: COLORS.background,

    borderWidth: 1,
    borderColor: COLORS.border,
  },

  fontButtonDisabled: {
    opacity: 0.4,
  },

  fontButtonTextSmall: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: '700',
  },

  fontButtonTextLarge: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '700',
  },

  fontButtonTextDisabled: {
    color: COLORS.secondaryText,
  },

  fontSizeValue: {
    minWidth: 38,
    height: 38,

    alignItems: 'center',
    justifyContent: 'center',
  },

  fontSizeValueText: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '700',
  },

  /* =========================
     BOUTON FLOTTANT
  ========================= */

  fontFloatingButton: {
    position: 'absolute',

    right: 20,
    bottom: 65,

    width: 54,
    height: 54,

    borderRadius: 27,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: COLORS.primary,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 7,
  },

  fontFloatingButtonActive: {
    backgroundColor: COLORS.primaryDark,
  },

  fontFloatingText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
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