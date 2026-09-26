import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  const categories = [
    {
      title: 'Hira',
      subtitle: 'Chants',
      icon: '♪',
      route: '/song/hira',
    },
    {
      title: 'Tantara',
      subtitle: 'Histoires',
      icon: '📖',
      route: '/song/tantara',
    },
    {
      title: 'Fiderana mihetsika',
      subtitle: 'Louanges rythmées',
      icon: '♫',
      route: '/song/fideranaMihetsika',
    },
    {
      title: 'Fiderana milamina',
      subtitle: 'Louanges calmes',
      icon: '♬',
      route: '/song/fideranaMilamina',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* =========================
            HEADER
        ========================= */}

        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.appName}>AMPIFA</Text>
            </View>

            <View style={styles.crossContainer}>
              <Text style={styles.cross}>✝</Text>
            </View>
          </View>

          {/* =========================
              PAROLE DE DIEU
          ========================= */}

          <View style={styles.verseCard}>
            <Text style={styles.quoteMark}>“</Text>

            <Text style={styles.verse}>
              Ny feoko makany amin`Andriamanitra
              ka mihaino ahy Izy
            </Text>

            <View style={styles.verseBottom}>
              <View style={styles.verseLine} />

              <Text style={styles.reference}>
                Sal 77/1a
              </Text>
            </View>
          </View>
        </View>

        {/* =========================
            CATEGORIES
        ========================= */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Hira
          </Text>

          <Text style={styles.sectionSubtitle}>
            Safidio izay tianao hiraina
          </Text>
        </View>

        {/* =========================
            GRID 2 × 2
        ========================= */}

        <View style={styles.grid}>
          {categories.map((category) => (
            <Pressable
              key={category.title}
              style={({ pressed }) => [
                styles.categoryCard,
                pressed && styles.pressed,
              ]}
              onPress={() => router.push(category.route as any)}
            >
              {/* Icône */}

              <View style={styles.iconContainer}>
                <Text style={styles.icon}>
                  {category.icon}
                </Text>
              </View>

              {/* Contenu */}

              <View style={styles.cardContent}>
                <Text
                  style={styles.categoryTitle}
                  numberOfLines={2}
                >
                  {category.title}
                </Text>

                <Text style={styles.categorySubtitle}>
                  {category.subtitle}
                </Text>
              </View>

              {/* Flèche */}

              <View style={styles.arrowContainer}>
                <Text style={styles.arrow}>
                  ›
                </Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* =========================
            FOOTER
        ========================= */}

        <View style={styles.footer}>
          <Text style={styles.footerIcon}>
            ♪
          </Text>

          <Text style={styles.footerText}>
            Mihirà • Hivavaka • Hidera
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

/* =========================
   COLORS
========================= */

const COLORS = {
  /* Fond */
  background: '#FBF8F5',

  /* Marron */
  primary: '#5A3825',
  primaryLight: '#8B6247',

  /* Orange accent */
  accent: '#C87932',
  accentLight: '#E8B07A',
  accentSoft: '#F5E1CE',

  /* Cards */
  card: '#F3ECE6',
  cardLight: '#FFFDFC',

  /* Textes */
  text: '#3D2A1E',
  secondary: '#806F63',

  /* Bordures */
  border: '#E5D8CD',

  white: '#FFFFFF',
};

/* =========================
   STYLES
========================= */

const styles = StyleSheet.create({
  /* =========================
     CONTAINER
  ========================= */

  container: {
    flex: 1,

    backgroundColor: COLORS.background,
  },

  content: {
    paddingTop: 58,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  /* =========================
     HEADER
  ========================= */

  header: {
    marginBottom: 30,
  },

  headerTop: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    marginBottom: 22,
  },

  appName: {
    fontSize: 29,

    fontWeight: '800',

    letterSpacing: 1,

    color: COLORS.primary,
  },

  /* =========================
     CROIX
  ========================= */

  crossContainer: {
    width: 48,
    height: 48,

    borderRadius: 16,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: COLORS.accent,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.12,

    shadowRadius: 6,

    elevation: 3,
  },

  cross: {
    fontSize: 22,

    color: COLORS.white,
  },

  /* =========================
     VERSET
  ========================= */

  verseCard: {
    position: 'relative',

    paddingHorizontal: 22,

    paddingTop: 20,

    paddingBottom: 18,

    borderRadius: 22,

    backgroundColor: COLORS.primary,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 5,
    },

    shadowOpacity: 0.15,

    shadowRadius: 10,

    elevation: 5,
  },

  quoteMark: {
    position: 'absolute',

    top: 4,

    left: 18,

    fontSize: 48,

    fontWeight: '800',

    color: 'rgba(255,255,255,0.15)',
  },

  verse: {
    paddingTop: 8,

    fontSize: 18,

    lineHeight: 28,

    fontWeight: '600',

    color: COLORS.white,
  },

  verseBottom: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop: 17,
  },

  verseLine: {
    width: 30,

    height: 2,

    marginRight: 9,

    backgroundColor: COLORS.accentLight,
  },

  reference: {
    fontSize: 13,

    fontWeight: '600',

    color: COLORS.accentLight,
  },

  /* =========================
     SECTION
  ========================= */

  sectionHeader: {
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 24,

    fontWeight: '800',

    color: COLORS.text,
  },

  sectionSubtitle: {
    marginTop: 4,

    fontSize: 13,

    color: COLORS.secondary,
  },

  /* =========================
     GRID 2 × 2
  ========================= */

  grid: {
    flexDirection: 'row',

    flexWrap: 'wrap',

    justifyContent: 'space-between',

    rowGap: 14,
  },

  /* =========================
     CATEGORY CARD
  ========================= */

  categoryCard: {
    width: '48%',

    height: 155,

    padding: 16,

    borderRadius: 20,

    backgroundColor: COLORS.card,

    borderWidth: 1,

    borderColor: COLORS.border,

    /*
     * Ombre légère
     */

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.05,

    shadowRadius: 5,

    elevation: 2,
  },

  pressed: {
    opacity: 0.75,

    transform: [
      {
        scale: 0.97,
      },
    ],
  },

  /* =========================
     ICON
  ========================= */

  iconContainer: {
    width: 55,

    height: 55,

    borderRadius: 17,

    alignItems: 'center',

    justifyContent: 'center',

    backgroundColor: COLORS.accent,
  },

  icon: {
    fontSize: 28,

    color: COLORS.white,
  },

  /* =========================
     CARD CONTENT
  ========================= */

  cardContent: {
    position: 'absolute',

    left: 16,

    right: 12,

    bottom: 17,
  },

  categoryTitle: {
    fontSize: 16,

    lineHeight: 21,

    fontWeight: '700',

    color: COLORS.text,

    paddingRight: 22,
  },

  categorySubtitle: {
    marginTop: 4,

    fontSize: 12,

    color: COLORS.secondary,
  },

  /* =========================
     ARROW
  ========================= */

  arrowContainer: {
    position: 'absolute',

    right: 12,

    bottom: 12,

    width: 30,

    height: 30,

    borderRadius: 10,

    alignItems: 'center',

    justifyContent: 'center',

    backgroundColor: COLORS.accentSoft,
  },

  arrow: {
    fontSize: 24,

    lineHeight: 27,

    color: COLORS.accent,

    fontWeight: '600',
  },

  /* =========================
     FOOTER
  ========================= */

  footer: {
    alignItems: 'center',

    marginTop: 35,

    paddingTop: 20,

    borderTopWidth: 1,

    borderTopColor: COLORS.border,
  },

  footerIcon: {
    fontSize: 22,

    color: COLORS.accent,
  },

  footerText: {
    marginTop: 6,

    fontSize: 12,

    fontWeight: '500',

    color: COLORS.secondary,
  },
});

