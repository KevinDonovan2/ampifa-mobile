import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function PlaylistsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes playlists</Text>

      <View style={styles.emptyContainer}>
        <Text style={styles.icon}>♫</Text>

        <Text style={styles.emptyTitle}>
          Aucune playlist
        </Text>

        <Text style={styles.emptyText}>
          Crée ta première playlist pour organiser tes chants.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },

  icon: {
    fontSize: 60,
    marginBottom: 20,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
  },

  emptyText: {
    marginTop: 8,
    textAlign: 'center',
    color: '#777',
    fontSize: 15,
  },
});