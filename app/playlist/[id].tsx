import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

import { songs } from '../../data/songs';

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

export default function PlaylistDetailScreen() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const [playlist, setPlaylist] =
    useState<Playlist | null>(null);

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [showNewSongModal, setShowNewSongModal] =
    useState(false);

  const [selectedSongs, setSelectedSongs] =
    useState<string[]>([]);

  const [search, setSearch] = useState('');

  const [newSongTitle, setNewSongTitle] =
    useState('');

  const [newSongArtist, setNewSongArtist] =
    useState('');

  useEffect(() => {
    loadPlaylist();
  }, [id]);

  const loadPlaylist = async () => {
    try {
      const stored =
        await AsyncStorage.getItem(PLAYLISTS_KEY);

      if (!stored) {
        return;
      }

      const allPlaylists: Playlist[] =
        JSON.parse(stored);

      const currentPlaylist = allPlaylists.find(
        (item) => item.id === id,
      );

      if (currentPlaylist) {
        setPlaylist(currentPlaylist);
      }
    } catch (error) {
      console.error(
        'Erreur chargement playlist:',
        error,
      );
    }
  };

  const updatePlaylist = async (
    updatedPlaylist: Playlist,
  ) => {
    try {
      const stored =
        await AsyncStorage.getItem(PLAYLISTS_KEY);

      if (!stored) {
        return;
      }

      const allPlaylists: Playlist[] =
        JSON.parse(stored);

      const updatedPlaylists = allPlaylists.map(
        (item) =>
          item.id === updatedPlaylist.id
            ? updatedPlaylist
            : item,
      );

      await AsyncStorage.setItem(
        PLAYLISTS_KEY,
        JSON.stringify(updatedPlaylists),
      );

      setPlaylist(updatedPlaylist);
    } catch (error) {
      console.error(
        'Erreur sauvegarde playlist:',
        error,
      );
    }
  };

  const availableSongs = useMemo(() => {
    if (!playlist) {
      return [];
    }

    const playlistSongIds = new Set(
      playlist.songs.map((song) => song.id),
    );

    return songs.filter(
      (song) =>
        !playlistSongIds.has(song.id) &&
        (
          song.title
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          song.artist
            .toLowerCase()
            .includes(search.toLowerCase())
        ),
    );
  }, [playlist, search]);

  const toggleSong = (songId: string) => {
    setSelectedSongs((current) => {
      if (current.includes(songId)) {
        return current.filter(
          (id) => id !== songId,
        );
      }

      return [...current, songId];
    });
  };

  const addSelectedSongs = async () => {
    if (!playlist) {
      return;
    }

    if (selectedSongs.length === 0) {
      Alert.alert(
        'Aucun chant sélectionné',
        'Sélectionne au moins un chant.',
      );
      return;
    }

    const songsToAdd: PlaylistSong[] = songs
      .filter((song) =>
        selectedSongs.includes(song.id),
      )
      .map((song) => ({
        id: song.id,
        title: song.title,
        artist: song.artist,
      }));

    const updatedPlaylist: Playlist = {
      ...playlist,
      songs: [
        ...playlist.songs,
        ...songsToAdd,
      ],
    };

    await updatePlaylist(updatedPlaylist);

    setSelectedSongs([]);
    setSearch('');
    setShowAddModal(false);
  };

  const addNewSong = async () => {
    if (!playlist) {
      return;
    }

    const title = newSongTitle.trim();
    const artist = newSongArtist.trim();

    if (!title) {
      Alert.alert(
        'Titre requis',
        'Entre le titre du chant.',
      );
      return;
    }

    const newSong: PlaylistSong = {
      id: `custom-${Date.now()}`,
      title,
      artist: artist || 'Artiste inconnu',
    };

    const updatedPlaylist: Playlist = {
      ...playlist,
      songs: [
        ...playlist.songs,
        newSong,
      ],
    };

    await updatePlaylist(updatedPlaylist);

    setNewSongTitle('');
    setNewSongArtist('');
    setShowNewSongModal(false);
  };

  const removeSong = (song: PlaylistSong) => {
    if (!playlist) {
      return;
    }

    Alert.alert(
      'Retirer le chant',
      `Retirer « ${song.title} » de la playlist ?`,
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Retirer',
          style: 'destructive',
          onPress: async () => {
            const updatedPlaylist: Playlist = {
              ...playlist,
              songs: playlist.songs.filter(
                (item) => item.id !== song.id,
              ),
            };

            await updatePlaylist(updatedPlaylist);
          },
        },
      ],
    );
  };

  if (!playlist) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>
          Chargement...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}

      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={25}
            color="#222"
          />
        </Pressable>

        <View style={styles.headerInfo}>
          <Text
            style={styles.title}
            numberOfLines={1}
          >
            {playlist.name}
          </Text>

          <Text style={styles.subtitle}>
            {playlist.songs.length}{' '}
            {playlist.songs.length > 1
              ? 'chants'
              : 'chant'}
          </Text>
        </View>
      </View>

      {/* CONTENU */}

      {playlist.songs.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Ionicons
              name="musical-notes-outline"
              size={48}
              color="#8B5E3C"
            />
          </View>

          <Text style={styles.emptyTitle}>
            Cette playlist est vide
          </Text>

          <Text style={styles.emptyText}>
            Ajoute des chants provenant de ta
            bibliothèque ou crée un nouveau titre.
          </Text>

          <Pressable
            style={styles.mainAddButton}
            onPress={() => setShowAddModal(true)}
          >
            <Ionicons
              name="add"
              size={21}
              color="#fff"
            />

            <Text style={styles.mainAddButtonText}>
              Ajouter un chant
            </Text>
          </Pressable>
        </View>
      ) : (
        <>
          <FlatList
            data={playlist.songs}
            keyExtractor={(item) => item.id}
            contentContainerStyle={
              styles.songsList
            }
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View style={styles.songCard}>
                <View style={styles.songNumber}>
                  <Text style={styles.songNumberText}>
                    {index + 1}
                  </Text>
                </View>

                <View style={styles.songInfo}>
                  <Text
                    style={styles.songTitle}
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>

                  <Text
                    style={styles.songArtist}
                    numberOfLines={1}
                  >
                    {item.artist}
                  </Text>
                </View>

                <Pressable
                  onPress={() => removeSong(item)}
                  style={styles.deleteSongButton}
                >
                  <Ionicons
                    name="trash-outline"
                    size={20}
                    color="#999"
                  />
                </Pressable>
              </View>
            )}
          />

          <Pressable
            style={styles.bottomAddButton}
            onPress={() => setShowAddModal(true)}
          >
            <Ionicons
              name="add"
              size={21}
              color="#fff"
            />

            <Text style={styles.bottomAddButtonText}>
              Ajouter un chant
            </Text>
          </Pressable>
        </>
      )}

      {/* MODAL AJOUT DEPUIS LA BASE */}

      <Modal
        visible={showAddModal}
        animationType="slide"
        onRequestClose={() => {
          setShowAddModal(false);
          setSelectedSongs([]);
          setSearch('');
        }}
      >
        <View style={styles.modalFullScreen}>
          <View style={styles.modalTop}>
            <Pressable
              onPress={() => {
                setShowAddModal(false);
                setSelectedSongs([]);
                setSearch('');
              }}
            >
              <Ionicons
                name="close"
                size={28}
                color="#222"
              />
            </Pressable>

            <Text style={styles.modalTitle}>
              Ajouter des chants
            </Text>

            <View style={{ width: 28 }} />
          </View>

          <View style={styles.searchContainer}>
            <Ionicons
              name="search-outline"
              size={21}
              color="#999"
            />

            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher un chant..."
              placeholderTextColor="#999"
              value={search}
              onChangeText={setSearch}
            />
          </View>

          <Text style={styles.sectionTitle}>
            Chants disponibles
          </Text>

          <FlatList
            data={availableSongs}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 130,
            }}
            renderItem={({ item }) => {
              const selected =
                selectedSongs.includes(item.id);

              return (
                <Pressable
                  style={[
                    styles.selectSongCard,
                    selected &&
                      styles.selectedSongCard,
                  ]}
                  onPress={() =>
                    toggleSong(item.id)
                  }
                >
                  <View style={styles.selectSongInfo}>
                    <Text
                      style={styles.selectSongTitle}
                      numberOfLines={1}
                    >
                      {item.title}
                    </Text>

                    <Text
                      style={styles.selectSongArtist}
                      numberOfLines={1}
                    >
                      {item.artist}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.checkbox,
                      selected &&
                        styles.checkboxSelected,
                    ]}
                  >
                    {selected && (
                      <Ionicons
                        name="checkmark"
                        size={18}
                        color="#fff"
                      />
                    )}
                  </View>
                </Pressable>
              );
            }}
            ListEmptyComponent={
              <View style={styles.noSongs}>
                <Ionicons
                  name="musical-notes-outline"
                  size={40}
                  color="#aaa"
                />

                <Text style={styles.noSongsText}>
                  Aucun chant disponible
                </Text>
              </View>
            }
          />

          {/* AJOUT MANUEL */}

          <View style={styles.manualContainer}>
            <Pressable
              style={styles.manualButton}
              onPress={() => {
                setShowAddModal(false);
                setShowNewSongModal(true);
              }}
            >
              <Ionicons
                name="create-outline"
                size={21}
                color="#8B5E3C"
              />

              <Text style={styles.manualButtonText}>
                Ajouter un nouveau titre
              </Text>
            </Pressable>
          </View>

          {/* BOUTON CONFIRMER */}

          {selectedSongs.length > 0 && (
            <View style={styles.confirmContainer}>
              <Pressable
                style={styles.confirmButton}
                onPress={addSelectedSongs}
              >
                <Text
                  style={styles.confirmButtonText}
                >
                  Ajouter {selectedSongs.length}{' '}
                  {selectedSongs.length > 1
                    ? 'chants'
                    : 'chant'}
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </Modal>

      {/* MODAL NOUVEAU TITRE */}

      <Modal
        visible={showNewSongModal}
        transparent
        animationType="fade"
        onRequestClose={() =>
          setShowNewSongModal(false)
        }
      >
        <View style={styles.overlay}>
          <View style={styles.newSongModal}>
            <View style={styles.newSongHeader}>
              <Text style={styles.newSongTitle}>
                Nouveau titre
              </Text>

              <Pressable
                onPress={() =>
                  setShowNewSongModal(false)
                }
              >
                <Ionicons
                  name="close"
                  size={26}
                  color="#555"
                />
              </Pressable>
            </View>

            <Text style={styles.inputLabel}>
              Titre
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Nom du chant"
              placeholderTextColor="#999"
              value={newSongTitle}
              onChangeText={setNewSongTitle}
            />

            <Text style={styles.inputLabel}>
              Artiste / auteur
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Nom de l'artiste ou auteur"
              placeholderTextColor="#999"
              value={newSongArtist}
              onChangeText={setNewSongArtist}
            />

            <Pressable
              style={styles.saveNewSongButton}
              onPress={addNewSong}
            >
              <Text
                style={styles.saveNewSongButtonText}
              >
                Ajouter à la playlist
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 55,
    paddingHorizontal: 20,
  },

  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  loadingText: {
    color: '#777',
    fontSize: 16,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },

  backButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  headerInfo: {
    flex: 1,
  },

  title: {
    fontSize: 25,
    fontWeight: '700',
    color: '#222',
  },

  subtitle: {
    marginTop: 3,
    color: '#888',
    fontSize: 14,
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },

  emptyIcon: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#F5EEE9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
  },

  emptyText: {
    textAlign: 'center',
    color: '#777',
    lineHeight: 21,
    marginTop: 8,
    maxWidth: 310,
  },

  mainAddButton: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B5E3C',
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 10,
  },

  mainAddButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },

  songsList: {
    paddingBottom: 100,
  },

  songCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  songNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5EEE9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  songNumberText: {
    color: '#8B5E3C',
    fontWeight: '700',
  },

  songInfo: {
    flex: 1,
    marginLeft: 13,
  },

  songTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },

  songArtist: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },

  deleteSongButton: {
    padding: 10,
  },

  bottomAddButton: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 50,
    height: 52,
    borderRadius: 11,
    backgroundColor: '#8B5E3C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomAddButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 8,
  },

  modalFullScreen: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 55,
    paddingHorizontal: 20,
  },

  modalTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: '#222',
  },

  searchContainer: {
    height: 48,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 20,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: '#222',
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#222',
    marginBottom: 10,
  },

  selectSongCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 7,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },

  selectedSongCard: {
    backgroundColor: '#F9F3EF',
    borderColor: '#8B5E3C',
  },

  selectSongInfo: {
    flex: 1,
  },

  selectSongTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },

  selectSongArtist: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },

  checkbox: {
    width: 25,
    height: 25,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#CCC',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },

  checkboxSelected: {
    backgroundColor: '#8B5E3C',
    borderColor: '#8B5E3C',
  },

  noSongs: {
    alignItems: 'center',
    paddingTop: 60,
  },

  noSongsText: {
    color: '#999',
    marginTop: 10,
  },

  manualContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 75,
  },

  manualButton: {
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#8B5E3C',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  manualButtonText: {
    color: '#8B5E3C',
    fontWeight: '600',
    marginLeft: 8,
  },

  confirmContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 15,
  },

  confirmButton: {
    height: 50,
    borderRadius: 10,
    backgroundColor: '#8B5E3C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  confirmButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  newSongModal: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 22,
  },

  newSongHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  newSongTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: '#222',
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 7,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#222',
    marginBottom: 17,
  },

  saveNewSongButton: {
    height: 50,
    borderRadius: 10,
    backgroundColor: '#8B5E3C',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },

  saveNewSongButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});