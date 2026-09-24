import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { songs } from '@/data/songs';

export default function SearchScreen() {
  const [search, setSearch] = useState('');

  const results = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) {
      return songs;
    }

    return songs.filter(
      (song) =>
        song.title.toLowerCase().includes(value) ||
        song.artist.toLowerCase().includes(value) ||
        song.lyrics.toLowerCase().includes(value)
    );
  }, [search]);

  return (
    <View style={styles.container}>
      {/* Titre */}
      <Text style={styles.title}>
        Recherche
      </Text>

      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={22}
          color="#6F4E37"
        />

        <TextInput
          style={styles.input}
          placeholder="Rechercher un chant..."
          placeholderTextColor="#A08D80"
          value={search}
          onChangeText={setSearch}
        />

        {search.length > 0 && (
          <Pressable onPress={() => setSearch('')}>
            <Ionicons
              name="close-circle"
              size={21}
              color="#A67B5B"
            />
          </Pressable>
        )}
      </View>

      {/* Nombre de résultats */}
      <Text style={styles.resultCount}>
        {results.length}{' '}
        {results.length > 1 ? 'chants' : 'chant'}
      </Text>

      {/* Liste */}
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            style={styles.song}
            onPress={() => router.push(`/song/${item.id}`)}
          >
            <View style={styles.songIcon}>
              <Ionicons
                name="musical-note"
                size={20}
                color="#FFFFFF"
              />
            </View>

            <View style={styles.songInfo}>
              <Text style={styles.songTitle}>
                {item.title}
              </Text>

              <Text style={styles.artist}>
                {item.artist}
              </Text>
            </View>

            <Text style={styles.arrow}>
              ›
            </Text>
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="musical-notes-outline"
              size={48}
              color="#A67B5B"
            />

            <Text style={styles.empty}>
              Aucun chant trouvé
            </Text>

            <Text style={styles.emptySubtitle}>
              Essayez avec un autre titre ou artiste.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,

    backgroundColor: '#FBF8F5',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,

    color: '#4A3224',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    height: 54,
    paddingHorizontal: 16,

    borderRadius: 16,

    backgroundColor: '#F3ECE6',

    borderWidth: 1,
    borderColor: '#E5D8CD',
  },

  input: {
    flex: 1,

    marginLeft: 10,

    fontSize: 16,

    color: '#4A3224',
  },

  resultCount: {
    marginTop: 18,
    marginBottom: 4,

    fontSize: 14,
    fontWeight: '600',

    color: '#806F63',
  },

  list: {
    paddingTop: 8,
    paddingBottom: 30,
  },

  song: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: 14,

    borderBottomWidth: 1,
    borderBottomColor: '#E5D8CD',
  },

  songIcon: {
    width: 42,
    height: 42,

    borderRadius: 12,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#6F4E37',
  },

  songInfo: {
    flex: 1,
    marginLeft: 14,
  },

  songTitle: {
    fontSize: 17,
    fontWeight: '600',

    color: '#4A3224',
  },

  artist: {
    marginTop: 4,

    fontSize: 14,

    color: '#806F63',
  },

  arrow: {
    fontSize: 28,

    color: '#6F4E37',
  },

  emptyContainer: {
    alignItems: 'center',

    marginTop: 70,
  },

  empty: {
    marginTop: 15,

    fontSize: 17,
    fontWeight: '600',

    color: '#4A3224',
  },

  emptySubtitle: {
    marginTop: 6,

    textAlign: 'center',

    fontSize: 14,

    color: '#806F63',
  },
});