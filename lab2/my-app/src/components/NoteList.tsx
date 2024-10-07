import React from 'react';
import { Note } from '../types';
import NoteItem from './NoteItem';

interface NoteListProps {
  notes: Note[];
  onToggleFavorite: (id: number) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onToggleFavorite }) => {
  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} onToggleFavorite={onToggleFavorite} />
      ))}
    </div>
  );
};

export default NoteList;