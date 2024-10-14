import React, { useState, useEffect } from 'react';
import NoteList from './components/NoteList';
import FavoritesList from './components/FavoritesList';
import { Note, Label } from './types';
import { dummyNotesList } from './constants';

export const StickyNotes = () => {
  const [notes, setNotes] = useState(dummyNotesList);
  const [favorites, setFavorites] = useState<string[]>([]);

  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
    isFavorite: false,
  };
  const [createNote, setCreateNote] = useState<Note>(initialNote);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const toggleFavorite = (id: number) => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
      )
    );
  };

  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const newNote = {
      ...createNote,
      id: notes.length + 1,
    };
    setNotes([...notes, newNote]);
    setCreateNote(initialNote);
  };

  const handleNoteSelect = (note: Note) => {
    setSelectedNote(note);
  };

  const handleNoteUpdate = (updatedNote: Note) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === updatedNote.id ? updatedNote : note
      )
    );
    setSelectedNote(null);
  };

  const handleNoteDelete = (id: number) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    if (selectedNote && selectedNote.id === id) {
      setSelectedNote(null);
    }
  };

  useEffect(() => {
    const favoriteTitles = notes.filter(note => note.isFavorite).map(note => note.title);
    setFavorites(favoriteTitles);
  }, [notes]);

  return (
    <>
      <form className="note-form" onSubmit={createNoteHandler}>
        <div>
          <input
            placeholder="Note Title"
            value={createNote.title}
            onChange={(event) =>
              setCreateNote({ ...createNote, title: event.target.value })}
            required
          />
        </div>

        <div>
          <textarea
            placeholder="Note Content"
            value={createNote.content}
            onChange={(event) =>
              setCreateNote({ ...createNote, content: event.target.value })}
            required
          />
        </div>

        <div>
          <select
            value={createNote.label}
            onChange={(event) =>
              setCreateNote({ ...createNote, label: event.target.value as Label })}
            required
          >
            <option value={Label.personal}>Personal</option>
            <option value={Label.study}>Study</option>
            <option value={Label.work}>Work</option>
            <option value={Label.other}>Other</option>
          </select>
        </div>

        <div><button type="submit">Create Note</button></div>
      </form>

      <NoteList 
        notes={notes} 
        onToggleFavorite={toggleFavorite} 
        onNoteSelect={handleNoteSelect}
        selectedNote={selectedNote}
        onNoteUpdate={handleNoteUpdate}
        onNoteDelete={handleNoteDelete}
      />
      <FavoritesList favorites={favorites} />
    </>
  );
};
