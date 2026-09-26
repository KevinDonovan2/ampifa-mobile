import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';


type PlaylistSong = {
  id: string;
  title: string;
  artist: string;
};

type Playlist = {
  id: string;
  name: string;
  songs: PlaylistSong[];
  createdAt: string;
};

const PLAYLISTS_KEY = '@ampifa_playlists';

export default function PlaylistsScreen() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [playlistName, setPlaylistName] = useState('');

  useEffect(() => {
    loadPlaylists();
  }, []);

  const loadPlaylists = async () => {
  try {
    const storedPlaylists =
      await AsyncStorage.getItem(PLAYLISTS_KEY);

    if (!storedPlaylists) {
      setPlaylists([]);
      return;
    }

    const parsedPlaylists: Playlist[] =
      JSON.parse(storedPlaylists);

    const normalizedPlaylists = parsedPlaylists.map(
      (playlist) => ({
        ...playlist,
        songs: Array.isArray(playlist.songs)
          ? playlist.songs
          : [],
      }),
    );

    setPlaylists(normalizedPlaylists);
  } catch (error) {
    console.error(
      'Erreur lors du chargement des playlists:',
      error,
    );
  }
};

  const savePlaylists = async (newPlaylists: Playlist[]) => {
    try {
      await AsyncStorage.setItem(
        PLAYLISTS_KEY,
        JSON.stringify(newPlaylists),
      );

      setPlaylists(newPlaylists);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const createPlaylist = async () => {
    const name = playlistName.trim();

    if (!name) {
      Alert.alert(
        'Nom requis',
        'Donne un nom à ta playlist.',
      );
      return;
    }

    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name,
      songs: [],
      createdAt: new Date().toISOString(),
    };

    const newPlaylists = [
      ...playlists,
      newPlaylist,
    ];

    await savePlaylists(newPlaylists);

    setPlaylistName('');
    setShowCreateModal(false);

    router.push(`/playlist/${newPlaylist.id}`);
  };

  const deletePlaylist = (playlist: Playlist) => {
    Alert.alert(
      'Supprimer la playlist',
      `Voulez-vous supprimer « ${playlist.name} » ?`,
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            const newPlaylists = playlists.filter(
              (item) => item.id !== playlist.id,
            );

            await savePlaylists(newPlaylists);
          },
        },
      ],
    );
  };

  const renderPlaylist = ({
    item,
  }: {
    item: Playlist;
  }) => {
    return (
      <Pressable
        style={styles.playlistCard}
        onPress={() => router.push(`/playlist/${item.id}`)}
      >
        <View style={styles.playlistIcon}>
          <Ionicons
            name="musical-notes"
            size={25}
            color="#8B5E3C"
          />
        </View>

        <View style={styles.playlistInfo}>
          <Text
            style={styles.playlistName}
            numberOfLines={1}
          >
            {item.name}
          </Text>

          <Text style={styles.playlistCount}>
            {item.songs.length}{' '}
            {item.songs.length > 1
              ? 'chants'
              : 'chant'}
          </Text>
        </View>

        <Pressable
          style={styles.moreButton}
          onPress={() => deletePlaylist(item)}
        >
          <Ionicons
            name="trash-outline"
            size={21}
            color="#999"
          />
        </Pressable>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes playlists</Text>

        <Pressable
          style={styles.addButton}
          onPress={() => setShowCreateModal(true)}
        >
          <Ionicons
            name="add"
            size={28}
            color="#fff"
          />
        </Pressable>
      </View>

      {playlists.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconContainer}>
            <Ionicons
              name="musical-notes-outline"
              size={50}
              color="#8B5E3C"
            />
          </View>

          <Text style={styles.emptyTitle}>
            Aucune playlist
          </Text>

          <Text style={styles.emptyText}>
            Crée ta première playlist pour organiser
            tes chants.
          </Text>

          <Pressable
            style={styles.createButton}
            onPress={() => setShowCreateModal(true)}
          >
            <Ionicons
              name="add"
              size={21}
              color="#fff"
            />

            <Text style={styles.createButtonText}>
              Créer une playlist
            </Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={playlists}
          keyExtractor={(item) => item.id}
          renderItem={renderPlaylist}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* MODAL CREATION PLAYLIST */}
      <Modal
        visible={showCreateModal}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setShowCreateModal(false);
        }}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={
            Platform.OS === 'ios'
              ? 'padding'
              : undefined
          }
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Nouvelle playlist
              </Text>

              <Pressable
                onPress={() => {
                  setShowCreateModal(false);
                  setPlaylistName('');
                }}
              >
                <Ionicons
                  name="close"
                  size={26}
                  color="#555"
                />
              </Pressable>
            </View>

            <Text style={styles.inputLabel}>
              Nom de la playlist
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Ex : Chants du dimanche"
              placeholderTextColor="#999"
              value={playlistName}
              onChangeText={setPlaylistName}
              autoFocus
              maxLength={50}
            />

            <Pressable
              style={styles.modalCreateButton}
              onPress={createPlaylist}
            >
              <Text style={styles.modalCreateButtonText}>
                Créer
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#222',
  },

  addButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#8B5E3C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },

  emptyIconContainer: {
    width: 95,
    height: 95,
    borderRadius: 48,
    backgroundColor: '#F5EEE9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  emptyTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: '#222',
  },

  emptyText: {
    marginTop: 8,
    textAlign: 'center',
    color: '#777',
    fontSize: 15,
    lineHeight: 22,
    maxWidth: 300,
  },

  createButton: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B5E3C',
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 10,
  },

  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },

  listContent: {
    paddingBottom: 30,
  },

  playlistCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 14,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },

  playlistIcon: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: '#F5EEE9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  playlistInfo: {
    flex: 1,
    marginLeft: 14,
  },

  playlistName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#222',
  },

  playlistCount: {
    marginTop: 5,
    fontSize: 14,
    color: '#888',
  },

  moreButton: {
    padding: 8,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },

  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 22,
  },

  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  modalTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: '#222',
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#222',
  },

  modalCreateButton: {
    marginTop: 20,
    backgroundColor: '#8B5E3C',
    height: 52,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalCreateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});