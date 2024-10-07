import { useState, useEffect } from 'react';
import { Note } from '../types';
import { dummyNotesList } from '../constants';

export const useNotes = () => {
  const [notes, setNotes] = useState(dummyNotesList);
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: number) => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
      )
    );
  };

  useEffect(() => {
    const favoriteTitles = notes.filter(note => note.isFavorite).map(note => note.title);
    setFavorites(favoriteTitles);
    console.log("Favorites updated:", favoriteTitles);
  }, [notes]);

  return { notes, favorites, toggleFavorite };
};