import { create } from 'zustand'
import { mockSongs } from '../data/mockSongs'
import type { Song } from '../types/music'

type LibraryState = {
  savedIds: string[]
  addToLibrary: (songId: string) => void
  removeFromLibrary: (songId: string) => void
  toggleLibrary: (songId: string) => void
  isSaved: (songId: string) => boolean
  getSavedSongs: () => Song[]
}

const initialSaved = mockSongs.slice(0, 4).map((song) => song.id)

export const useLibraryStore = create<LibraryState>((set, get) => ({
  savedIds: initialSaved,

  addToLibrary: (songId) =>
    set((state) =>
      state.savedIds.includes(songId)
        ? state
        : { savedIds: [...state.savedIds, songId] },
    ),

  removeFromLibrary: (songId) =>
    set((state) => ({
      savedIds: state.savedIds.filter((id) => id !== songId),
    })),

  toggleLibrary: (songId) => {
    const { savedIds, addToLibrary, removeFromLibrary } = get()
    if (savedIds.includes(songId)) removeFromLibrary(songId)
    else addToLibrary(songId)
  },

  isSaved: (songId) => get().savedIds.includes(songId),

  getSavedSongs: () => {
    const { savedIds } = get()
    return savedIds
      .map((id) => mockSongs.find((song) => song.id === id))
      .filter((song): song is Song => Boolean(song))
  },
}))
