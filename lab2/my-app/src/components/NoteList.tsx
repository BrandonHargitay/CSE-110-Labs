import React from 'react';
import { Note, Label } from '../types';
import NoteItem from './NoteItem';

interface NoteListProps {
  notes: Note[];
  onToggleFavorite: (id: number) => void;
  onNoteSelect: (note: Note) => void;
  selectedNote: Note | null;
  onNoteUpdate: (note: Note) => void;
  onNoteDelete: (id: number) => void;
}

const NoteList: React.FC<NoteListProps> = ({ 
  notes, 
  onToggleFavorite, 
  onNoteSelect, 
  selectedNote, 
  onNoteUpdate,
  onNoteDelete
}) => {
  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <NoteItem 
          key={note.id} 
          note={note} 
          onToggleFavorite={onToggleFavorite}
          onNoteSelect={onNoteSelect}
          isSelected={selectedNote?.id === note.id}
          onNoteUpdate={onNoteUpdate}
          onNoteDelete={onNoteDelete}
        />
      ))}
    </div>
  );
};

export default NoteList;